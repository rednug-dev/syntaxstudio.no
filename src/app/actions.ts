'use server';

import { z } from 'zod';

const ContactInquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

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
      message: 'Validation failed. Please check your input.',
      success: false,
    };
  }

  // Here you would typically send an email, save to a database, etc.
  // For this prototype, we'll just simulate a success response.
  console.log('New inquiry:', validatedFields.data);

  return {
    message: "Thank you for your inquiry! We'll get back to you soon.",
    errors: null,
    success: true,
  };
}
