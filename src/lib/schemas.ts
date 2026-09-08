import { z } from 'zod';

export function createContactInquirySchema(locale: 'no' | 'en' = 'no') {
  const no = locale === 'no';
  return z.object({
    name: z.string({invalid_type_error: no ? 'Skriv navnet ditt.' : 'Enter your name.', required_error: no ? 'Skriv navnet ditt.' : 'Enter your name.'}).trim()
      .min(2, no ? 'Skriv navnet ditt, minst 2 tegn.' : 'Enter your name, at least 2 characters.')
      .max(100, no ? 'Navnet kan ha maks 100 tegn.' : 'Keep your name to 100 characters.')
      .refine((value) => !/[\r\n]/.test(value), no ? 'Skriv navnet på én linje.' : 'Enter your name on one line.'),
    email: z.string({invalid_type_error: no ? 'Skriv e-postadressen din.' : 'Enter your email address.', required_error: no ? 'Skriv e-postadressen din.' : 'Enter your email address.'}).trim()
      .email(no ? 'Skriv en gyldig e-postadresse.' : 'Enter a valid email address.')
      .max(254, no ? 'E-postadressen er for lang.' : 'This email address is too long.'),
    message: z.string({invalid_type_error: no ? 'Skriv en kort melding.' : 'Write a short message.', required_error: no ? 'Skriv en kort melding.' : 'Write a short message.'}).trim()
      .min(3, no ? 'Skriv en kort melding, minst 3 tegn.' : 'Write a short message, at least 3 characters.')
      .max(5000, no ? 'Meldingen kan ha maks 5000 tegn.' : 'Keep your message to 5,000 characters.'),
    practice: z.enum(['', 'iso400', '35mm', 'nyfane'], {
      errorMap: () => ({message: no ? 'Velg en av fagretningene i listen.' : 'Choose a practice from the list.'}),
    }).optional(),
  });
}

export const ContactInquirySchema = createContactInquirySchema();
