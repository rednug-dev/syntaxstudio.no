'use server';

import nodemailer from 'nodemailer';
import { createContactInquirySchema } from '@/lib/schemas';
import { headers } from 'next/headers';

export type FormState = {
  message: string;
  errors: Record<string, string[]> | null;
  success: boolean;
};

async function detectLocale(): Promise<'no' | 'en'> {
  try {
    const requestHeaders = await headers();
    return /^(no|nb|nn)/i.test(requestHeaders.get('accept-language') || '') ? 'no' : 'en';
  } catch {
    return 'no';
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character]!));
}

export async function handleContactInquiry(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const localeInput = formData.get('locale');
  const locale = localeInput === 'no' || localeInput === 'en' ? localeInput : await detectLocale();
  const no = locale === 'no';
  const deliveryError: FormState = {
    message: no
      ? 'Meldingen ble ikke sendt. Prøv igjen, eller skriv til info@syntaxstudio.no.'
      : 'Your message was not sent. Try again, or email info@syntaxstudio.no.',
    errors: null,
    success: false,
  };

  // This field is hidden from visitors and must remain empty.
  if (formData.get('website')) return deliveryError;

  const validated = createContactInquirySchema(locale).safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    practice: formData.get('practice') ?? undefined,
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: no ? 'Se over de markerte feltene.' : 'Check the highlighted fields.',
      success: false,
    };
  }

  const zohoEmail = process.env.ZOHO_EMAIL;
  const zohoPassword = process.env.ZOHO_APP_PASSWORD;
  if (!zohoEmail || !zohoPassword) {
    return {
      ...deliveryError,
      message: no
        ? 'Kontaktskjemaet er ikke tilgjengelig akkurat nå. Send meldingen til info@syntaxstudio.no.'
        : 'The contact form is unavailable right now. Send your message to info@syntaxstudio.no.',
    };
  }

  const {name, email, message, practice} = validated.data;
  const practiceName = practice ? {iso400: 'ISO400', '35mm': '35mm', nyfane: 'Nyfane'}[practice] : 'Syntax';
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    auth: {user: zohoEmail, pass: zohoPassword},
  });

  try {
    await transporter.sendMail({
      from: {name: process.env.MAIL_FROM_NAME || 'Syntax', address: zohoEmail},
      replyTo: {name, address: email},
      to: process.env.SALES_INBOX || 'info@syntaxstudio.no',
      subject: `${practiceName}: Ny henvendelse fra ${name}`,
      text: `Navn: ${name}\nE-post: ${email}\nSpråk: ${locale}\nFagretning: ${practiceName}\n\n${message}`,
      html: `<p><b>Navn:</b> ${escapeHtml(name)}</p>
        <p><b>E-post:</b> ${escapeHtml(email)}</p>
        <p><b>Språk:</b> ${locale}</p>
        <p><b>Fagretning:</b> ${practiceName}</p>
        <hr><p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>`,
    });
    return {
      message: no
        ? 'Takk. Meldingen din er sendt, og vi tar kontakt på e-post.'
        : 'Thank you. Your message has been sent. We will reply by email.',
      errors: null,
      success: true,
    };
  } catch {
    // Do not log customer messages or SMTP credentials with transport errors.
    console.error('Contact inquiry delivery failed.');
    return deliveryError;
  } finally {
    transporter.close();
  }
}
