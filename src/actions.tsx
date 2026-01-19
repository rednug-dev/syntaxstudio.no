'use server';

import nodemailer from 'nodemailer';
import { ContactInquirySchema } from '@/lib/schemas';
import { headers } from 'next/headers';

/** Shared form-state type for server actions */
export type FormState = {
  message: string;
  errors: Record<string, string[]> | null;
  success: boolean;
};

/* ---------- SMTP transport (Zoho) ---------- */
function createTransport() {
  return nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,        // e.g. noreply@syntaxstudio.no
      pass: process.env.ZOHO_APP_PASSWORD, // App password
    },
  });
}

/* ---------- Locale helper (async: headers() must be awaited) ---------- */
async function detectLocale(): Promise<'no' | 'en'> {
  try {
    const h = await headers();
    const al = h.get('accept-language') || '';
    if (/^(no|nb|nn)/i.test(al)) return 'no';
    return 'en';
  } catch {
    return 'no';
  }
}

/* =========================================================
   1) Contact form (unchanged validation)
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
      // Viktig: FROM må være den autentiserte Zoho-kontoen
      from: `"${process.env.MAIL_FROM_NAME || 'Syntax Studio'}" <${process.env.ZOHO_EMAIL}>`,
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
   2) Pricing / Order — minimal felt: plan, email, project
   ========================================================= */
type SimplePricingPayload = {
  plan: 'kickstart' | 'growth' | 'scale' | '';
  email: string;
  project: string;
  honey: string; // honeypot
};

function validatePricingPayload(raw: SimplePricingPayload): Record<string, string[]> | null {
  const errors: Record<string, string[]> = {};

  if (!raw.plan || !['kickstart', 'growth', 'scale'].includes(raw.plan)) {
    (errors.plan ||= []).push('Ugyldig plan.');
  }
  if (!raw.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.email)) {
    (errors.email ||= []).push('Oppgi en gyldig e-postadresse.');
  }
  if (!raw.project || raw.project.trim().length < 10) {
    (errors.project ||= []).push('Beskriv prosjektet (minst 10 tegn).');
  }

  return Object.keys(errors).length ? errors : null;
}

export async function handlePricingOrder(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw: SimplePricingPayload = {
    plan: String(formData.get('plan') || '') as SimplePricingPayload['plan'],
    email: String(formData.get('email') || ''),
    project: String(formData.get('project') || ''),
    honey: String(formData.get('website') || ''),
  };

  // Honeypot → pretend OK, do nothing
  if (raw.honey) {
    return { success: true, message: 'OK', errors: null };
  }

  const errors = validatePricingPayload(raw);
  if (errors) {
    return { success: false, message: 'Validation error', errors };
  }

  const locale = await detectLocale();
  const transporter = createTransport();

  // FROM må **alltid** være den autentiserte kontoen for å unngå "Relaying disallowed"
  const fromAddress = `${process.env.MAIL_FROM_NAME || 'Syntax Studio'} <${process.env.ZOHO_EMAIL}>`;
  const toSales = process.env.SALES_INBOX || 'sales@syntaxstudio.no';

  const planLabel =
    raw.plan === 'kickstart' ? 'Kickstart'
    : raw.plan === 'growth' ? 'Vekstpakka'
    : 'Skaler';

  const subjectSales = `[Lead] ${planLabel} – ${raw.email}`;
  const subjectCustomer =
    locale === 'no'
      ? `Vi har mottatt forespørselen din (${planLabel})`
      : `We received your request (${planLabel})`;

  const htmlSales = `
    <h2>Ny pricing-forespørsel — ${planLabel}</h2>
    <p><b>E-post:</b> ${raw.email}</p>
    <h3>Prosjekt</h3>
    <pre style="white-space:pre-wrap">${raw.project}</pre>
  `;

  const textSales = `
Ny pricing-forespørsel — ${planLabel}
E-post: ${raw.email}

Prosjekt:
${raw.project}
  `.trim();

  const htmlCustomer =
    locale === 'no'
      ? `
  <div style="font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;font-size:14px;line-height:1.6;color:#111">
    <p>Hei!</p>
    <p>Takk for forespørselen din om <b>${planLabel}</b>. Vi ser over informasjonen og kommer tilbake til deg på e-post.</p>
    <p><b>Oppsummert:</b></p>
    <ul>
      <li><b>E-post:</b> ${raw.email}</li>
      <li><b>Plan:</b> ${planLabel}</li>
    </ul>
    <p><b>Prosjektbeskrivelse:</b></p>
    <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${raw.project}</pre>
    <p>Vi tar bare betalt når du får betalt. Ingen resultater = ingen kostnad.</p>
    <p>– Syntax Studio</p>
  </div>
  `
      : `
  <div style="font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;font-size:14px;line-height:1.6;color:#111">
    <p>Hello!</p>
    <p>Thanks for your request for <b>${planLabel}</b>. We’ll review and get back to you by email.</p>
    <p><b>Summary:</b></p>
    <ul>
      <li><b>Email:</b> ${raw.email}</li>
      <li><b>Plan:</b> ${planLabel}</li>
    </ul>
    <p><b>Project description:</b></p>
    <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${raw.project}</pre>
    <p>We only get paid when you get paid. No results = no cost.</p>
    <p>– Syntax Studio</p>
  </div>
  `;

  try {
    // Send til sales
    await transporter.sendMail({
      from: fromAddress,
      to: toSales,
      replyTo: raw.email,
      subject: subjectSales,
      text: textSales,
      html: htmlSales,
    });

    // Bekreftelse til kunde
    await transporter.sendMail({
      from: fromAddress,          // Må være samme verifiserte adresse
      to: raw.email,
      subject: subjectCustomer,
      text:
        locale === 'no'
          ? `Takk! Vi har mottatt forespørselen din (${planLabel}). Vi svarer så snart vi kan.`
          : `Thanks! We received your request (${planLabel}). We'll get back to you shortly.`,
      html: htmlCustomer,
    });

    return {
      success: true,
      message: locale === 'no' ? 'Takk! Vi tar kontakt på e-post.' : 'Thanks! We’ll reach out by email.',
      errors: null,
    };
  } catch (err: any) {
    console.error('Email sending error (pricing):', err);
    return {
      success: false,
      message:
        locale === 'no'
          ? 'En feil oppstod under sending av e-post. Vennligst prøv igjen.'
          : 'Something went wrong while sending the email. Please try again.',
      errors: { form: [err?.message || 'Unknown error'] },
    };
  }
}
