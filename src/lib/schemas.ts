import { z } from 'zod';

export const ContactInquirySchema = z.object({
  name: z.string().min(2, { message: 'Navn må være minst 2 tegn.' }),
  email: z.string().email({ message: 'Vennligst oppgi en gyldig e-postadresse.' }),
  message: z.string().min(10, { message: 'Meldingen må være minst 10 tegn.' }),
});
