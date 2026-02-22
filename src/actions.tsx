'use server';

import nodemailer from 'nodemailer';
import { ContactInquirySchema } from '@/lib/schemas';
import { headers } from 'next/headers';
import { render } from '@react-email/render';
import OrderConfirmationEmail from './emails/order-confirmation';

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
  const localeInput = String(formData.get('locale') || '');
  const locale = (localeInput === 'no' || localeInput === 'en' ? localeInput : await detectLocale()) as 'no' | 'en';

  const validated = ContactInquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validated.success) {
    const errs = validated.error.flatten().fieldErrors as Record<string, string[]>;
    return {
      errors: errs,
      message: locale === 'no' 
        ? 'Validering feilet. Vennligst sjekk det du har skrevet inn.' 
        : 'Validation failed. Please check your input.',
      success: false,
    };
  }

  const { name, email, message } = validated.data;
  const transporter = createTransport();
  const zohoEmail = process.env.ZOHO_EMAIL || '';

  try {
    await transporter.sendMail({
      // Viktig: FROM må være den autentiserte Zoho-kontoen
      from: `"${process.env.MAIL_FROM_NAME || 'Syntax Studio'}" <${zohoEmail}>`,
      replyTo: email,
      to: process.env.SALES_INBOX || zohoEmail || 'sales@syntaxstudio.no',
      subject: `Ny henvendelse fra ${name} via nettsiden`,
      html: `<p>Du har mottatt en ny henvendelse fra:</p>
             <p><b>Navn:</b> ${name}</p>
             <p><b>E-post:</b> ${email}</p>
             <p><b>Språk:</b> ${locale}</p>
             <hr>
             <p><b>Melding:</b></p>
             <p>${String(message).replace(/\n/g, '<br>')}</p>`,
    });

    return {
      message: locale === 'no'
        ? 'Takk for din henvendelse! Vi kommer tilbake til deg snart.'
        : 'Thanks for your inquiry! We will get back to you soon.',
      errors: null,
      success: true,
    };
  } catch (error) {
    console.error('Email sending error (contact):', error);
    return {
      message: locale === 'no'
        ? 'En feil oppstod under sending av e-post. Vennligst prøv igjen senere.'
        : 'An error occurred while sending the email. Please try again later.',
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
  locale: 'no' | 'en' | string;
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
    locale: String(formData.get('locale') || ''),
  };

  // Honeypot → pretend OK, do nothing
  if (raw.honey) {
    return { success: true, message: 'OK', errors: null };
  }

  const errors = validatePricingPayload(raw);
  if (errors) {
    return { success: false, message: 'Validation error', errors };
  }

  // Use passed-in locale or detect from headers
  const locale = (raw.locale === 'no' || raw.locale === 'en' ? raw.locale : await detectLocale()) as 'no' | 'en';
  const transporter = createTransport();
  const zohoEmail = process.env.ZOHO_EMAIL || '';

  // FROM må **alltid** være den autentiserte kontoen for å unngå "Relaying disallowed"
  const fromAddress = `${process.env.MAIL_FROM_NAME || 'Syntax Studio'} <${zohoEmail}>`;
  const toSales = process.env.SALES_INBOX || zohoEmail || 'sales@syntaxstudio.no';

  // Align labels with Pricing.tsx (which matches no.json keys)
  // kickstart -> Skreddersydd (Card 1)
  // growth    -> Kickstart (Card 2)
  // scale     -> Bedriftspakka (Card 3)
  const planLabel =
    raw.plan === 'kickstart' ? (locale === 'no' ? 'Skreddersydd' : 'Custom')
    : raw.plan === 'growth' ? 'Kickstart'
    : (locale === 'no' ? 'Bedriftspakka' : 'Business Package');

  const subjectSales = `[Lead] ${planLabel} – ${raw.email}`;
  const subjectCustomer =
    locale === 'no'
      ? `Vi har mottatt forespørselen din (${planLabel})`
      : `We received your request (${planLabel})`;

  const htmlSales = `
    <h2>Ny pricing-forespørsel — ${planLabel}</h2>
    <p><b>E-post:</b> ${raw.email}</p>
    <p><b>Språk:</b> ${locale}</p>
    <h3>Prosjekt</h3>
    <pre style="white-space:pre-wrap">${raw.project}</pre>
  `;

  const textSales = `
Ny pricing-forespørsel — ${planLabel}
E-post: ${raw.email}
Språk: ${locale}

Prosjekt:
${raw.project}
  `.trim();

  // Price labels for the email
  const planPrice =
    raw.plan === 'kickstart'
      ? (locale === 'no' ? 'Etter behov' : 'Tailored pricing')
      : raw.plan === 'growth'
      ? (locale === 'no' ? 'Fra 999 kr' : 'From $100')
      : (locale === 'no' ? 'Fra 14 999 kr' : 'From $1,500');

  // Generate pretty HTML with @react-email/render
  const htmlCustomer = await render(
    <OrderConfirmationEmail
      plan={planLabel}
      included={null}
      addons={[]}
      total={planPrice}
      locale={locale}
      project={raw.project}
    />
  );

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
          ? `Takk! Vi har mottatt forespørselen din om ${planLabel}. Vi svarer så snart vi kan.`
          : `Thanks! We received your request for ${planLabel}. We'll get back to you shortly.`,
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
