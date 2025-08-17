'use server';

import nodemailer from 'nodemailer';
import { ContactInquirySchema, PricingOrderSchema } from '@/lib/schemas';
import OrderConfirmationEmail from '@/emails/order-confirmation';
import { render } from '@react-email/render';

/** Shared form-state type for server actions */
export type FormState = {
  message: string;
  errors: Record<string, string[]> | null;
  success: boolean;
};

/* ---------- Formatters ---------- */
const fmtUSD = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(v);

const fmtNOK = (v: number) =>
  new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 }).format(v) + ' kr';

/* ---------- SMTP transport (Zoho) ---------- */
function createTransport() {
  return nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_APP_PASSWORD,
    },
  });
}

/* =========================================================
   1) Contact form (unchanged, with generic FormState)
   ========================================================= */
export async function handleContactInquiry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validated = ContactInquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validated.success) {
    const errs = validated.error.flatten().fieldErrors as Record<string, string[]>;
    return {
      errors: errs,
      message: 'Validering feilet. Vennligst sjekk det du har skrevet inn.',
      success: false,
    };
  }

  const { name, email, message } = validated.data;
  const transporter = createTransport();

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.ZOHO_EMAIL}>`,
      replyTo: email,
      to: process.env.SALES_INBOX || 'sales@syntaxstudio.no',
      subject: `Ny henvendelse fra ${name} via nettsiden`,
      html: `<p>Du har mottatt en ny henvendelse fra:</p>
             <p><b>Navn:</b> ${name}</p>
             <p><b>E-post:</b> ${email}</p>
             <hr>
             <p><b>Melding:</b></p>
             <p>${String(message).replace(/\n/g, '<br>')}</p>`,
    });

    return {
      message: 'Takk for din henvendelse! Vi kommer tilbake til deg snart.',
      errors: null,
      success: true,
    };
  } catch (error) {
    console.error('Email sending error (contact):', error);
    return {
      message: 'En feil oppstod under sending av e-post. Vennligst prøv igjen senere.',
      errors: null,
      success: false,
    };
  }
}

/* =========================================================
   2) Pricing / Order (NEW) — used with useActionState
   ========================================================= */
export async function handlePricingOrder(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    plan: String(formData.get('plan') || ''),
    email: String(formData.get('email') || ''),
    project: String(formData.get('project') || ''),
    included: (formData.get('included') as string | null) ?? null, // standard only
    addons: formData.getAll('addons').map(String),
    currency: String(formData.get('currency') || 'USD'),
    conversionRate: formData.get('conversionRate'),
    baseUSD: formData.get('baseUSD'),
    totalUSD: formData.get('totalUSD'),
    locale: String(formData.get('locale') || 'en'),
    honey: String(formData.get('website') || ''), // honeypot
  };

  if (raw.honey) {
    return { success: true, message: 'OK', errors: null };
  }

  const parsed = PricingOrderSchema.safeParse(raw);
  if (!parsed.success) {
    const errs: Record<string, string[]> = {};
    parsed.error.issues.forEach((i) => {
      const k = (i.path[0] as string) || 'form';
      (errs[k] ||= []).push(i.message);
    });
    return {
      success: false,
      message: 'Validation error',
      errors: errs,
    };
  }

  const data = parsed.data;
  const locale = data.locale ?? 'en'; // <<< ensure defined

  // Add-on labels & prices from client (for i18n in emails)
  const addonsLabels = formData.getAll('addonsLabel').map(String);
  const addonsUSD = formData.getAll('addonsUSD').map((x) => Number(x));

  const usd = data.totalUSD ?? data.baseUSD ?? 0;
  const nok = Math.round(usd * (data.conversionRate || 10));
  const display = (xUSD: number) =>
    data.currency === 'USD'
      ? fmtUSD(xUSD)
      : fmtNOK(Math.round(xUSD * (data.conversionRate || 10)));

  const addonsList =
    addonsLabels.length > 0
      ? addonsLabels
          .map((label, idx) => `• ${label}: ${display(Number(addonsUSD[idx] || 0))}`)
          .join('\n')
      : '';

  const totalStr = data.currency === 'USD' ? fmtUSD(usd) : fmtNOK(nok);

  const includedLine =
    data.plan === 'standard' && data.included
      ? data.included === 'booking'
        ? 'Included: Booking'
        : 'Included: E-commerce (≤10 products)'
      : null;

  const subjectSales = `[Lead] ${data.plan.toUpperCase()} – ${data.email}`;
  const subjectCustomer = locale.startsWith('no')
    ? `Vi har mottatt forespørselen din (${data.plan})`
    : `We received your request (${data.plan})`;

  const htmlSales = `
    <h2>New ${data.plan} lead</h2>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Currency:</b> ${data.currency} &middot; <b>Rate:</b> ${data.conversionRate}</p>
    ${includedLine ? `<p><b>${includedLine}</b></p>` : ''}
    <h3>Project</h3>
    <pre style="white-space:pre-wrap">${data.project}</pre>
    ${addonsList ? `<h3>Add-ons</h3><pre style="white-space:pre-wrap">${addonsList}</pre>` : ''}
    ${data.plan !== 'premium' ? `<h3>Total</h3><p><b>${totalStr}</b></p>` : ''}
  `;

  const textSales = `
New ${data.plan} lead
Email: ${data.email}
Currency: ${data.currency}  Rate: ${data.conversionRate}
${includedLine ? `${includedLine}\n` : ''}

Project:
${data.project}

${addonsList ? `Add-ons:\n${addonsList}\n` : ''}${
    data.plan !== 'premium' ? `Total: ${totalStr}\n` : ''
  }
  `.trim();

  const addonsForEmail = addonsLabels.map((label, idx) => ({
    label,
    price: display(Number(addonsUSD[idx] || 0)),
  }));

  const htmlCustomer = await render(
    <OrderConfirmationEmail
      plan={data.plan}
      included={includedLine}
      addons={addonsForEmail}
      total={totalStr}
      locale={locale}
    />
  );

  const transporter = createTransport();
  const from = process.env.MAIL_FROM || `Syntax Studio <${process.env.ZOHO_EMAIL}>`;
  const toSales = process.env.SALES_INBOX || 'sales@syntaxstudio.no';

  try {
    await transporter.sendMail({
      from,
      to: toSales,
      replyTo: data.email,
      subject: subjectSales,
      text: textSales,
      html: htmlSales,
    });

    await transporter.sendMail({
      from,
      to: data.email,
      subject: subjectCustomer,
      text: locale.startsWith('no')
        ? `Takk! Vi har mottatt forespørselen din (${data.plan}).`
        : `Thanks! We received your request (${data.plan}).`,
      html: htmlCustomer,
    });

    return {
      success: true,
      message: locale.startsWith('no')
        ? 'Takk! Vi tar kontakt på e-post.'
        : 'Thanks! We’ll reach out by email.',
      errors: null,
    };
  } catch (err: any) {
    console.error('Email sending error (pricing):', err);
    return {
      success: false,
      message: locale.startsWith('no')
        ? 'En feil oppstod under sending av e-post. Vennligst prøv igjen.'
        : 'Something went wrong while sending the email. Please try again.',
      errors: { form: [err?.message || 'Unknown error'] },
    };
  }
}
