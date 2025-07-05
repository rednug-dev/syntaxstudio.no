'use server';

import {
  generateProjectProposal,
  type GenerateProjectProposalInput,
  type GenerateProjectProposalOutput,
} from '@/ai/flows/generate-project-proposal';
import { z } from 'zod';

const ProposalRequestSchema = z.object({
  businessNeedsSummary: z.string().min(50, {
    message: "Please provide a summary of at least 50 characters.",
  }),
});

export type FormState = {
  data: GenerateProjectProposalOutput | null;
  error: string | null;
  message: string;
};

export async function handleGenerateProposal(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = ProposalRequestSchema.safeParse({
    businessNeedsSummary: formData.get('businessNeedsSummary'),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.businessNeedsSummary?.[0] ?? "Validation error",
      message: "Validation failed.",
    };
  }

  try {
    const input: GenerateProjectProposalInput = {
      businessNeedsSummary: validatedFields.data.businessNeedsSummary,
    };
    const result = await generateProjectProposal(input);
    return {
      data: result,
      error: null,
      message: "Proposal generated successfully."
    };
  } catch (error) {
    console.error("Error generating proposal:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return {
      data: null,
      error: `Failed to generate proposal. ${errorMessage}`,
      message: "Proposal generation failed.",
    };
  }
}
