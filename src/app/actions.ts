'use server';

import { ContactInquirySchema } from '@/lib/schemas';

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

  // Here you would typically send an email, save to a database, etc.
  // For this prototype, we'll just simulate a success response.
  console.log('Ny henvendelse:', validatedFields.data);

  return {
    message: "Takk for din henvendelse! Vi kommer tilbake til deg snart.",
    errors: null,
    success: true,
  };
}
