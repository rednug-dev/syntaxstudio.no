'use server';

import { ContactInquirySchema } from '@/lib/schemas';
import nodemailer from 'nodemailer';

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
  success: boolean;
};

export async function handleContactInquiry(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = ContactInquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validering feilet. Vennligst sjekk det du har skrevet inn.',
      success: false,
    };
  }

  const { name, email, message } = validatedFields.data;

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.ZOHO_EMAIL}>`,
      replyTo: email,
      to: 'sales@syntaxstudio.no',
      subject: `Ny henvendelse fra ${name} via nettsiden`,
      html: `<p>Du har mottatt en ny henvendelse fra:</p>
             <p><b>Navn:</b> ${name}</p>
             <p><b>E-post:</b> ${email}</p>
             <hr>
             <p><b>Melding:</b></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    return {
      message: 'Takk for din henvendelse! Vi kommer tilbake til deg snart.',
      errors: null,
      success: true,
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      message:
        'En feil oppstod under sending av e-post. Vennligst prøv igjen senere.',
      errors: null,
      success: false,
    };
  }
}
