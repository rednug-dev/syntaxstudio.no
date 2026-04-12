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

