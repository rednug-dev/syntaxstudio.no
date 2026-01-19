import { z } from 'zod';

export const ContactInquirySchema = z.object({
  name: z.string().min(2, { message: 'Navn må være minst 2 tegn.' }),
  email: z.string().email({ message: 'Vennligst oppgi en gyldig e-postadresse.' }),
  message: z.string().min(10, { message: 'Meldingen må være minst 10 tegn.' }),
});

export const PricingOrderSchema = z.object({
  plan: z.enum(["basic", "standard", "premium"]),
  email: z.string().email(),
  project: z.string().min(10, "Please provide a bit more detail."),
  included: z.enum(["booking", "ecommerce"]).optional().nullable(),
  addons: z.array(z.string()).optional(),
  currency: z.enum(["USD", "NOK"]),
  conversionRate: z.coerce.number().positive(),
  baseUSD: z.coerce.number().optional(),
  totalUSD: z.coerce.number().optional(),
  locale: z.string().optional(),
  honey: z.string().optional(), // honeypot (should be empty)
});