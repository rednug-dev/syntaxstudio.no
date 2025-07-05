'use server';

/**
 * @fileOverview An AI agent that generates project proposals based on client needs.
 *
 * - generateProjectProposal - A function that generates a project proposal.
 * - GenerateProjectProposalInput - The input type for the generateProjectProposal function.
 * - GenerateProjectProposalOutput - The return type for the generateProjectProposal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectProposalInputSchema = z.object({
  businessNeedsSummary: z
    .string()
    .describe('A summary of the prospective client\'s business needs.'),
});

export type GenerateProjectProposalInput = z.infer<
  typeof GenerateProjectProposalInputSchema
>;

const GenerateProjectProposalOutputSchema = z.object({
  proposal: z.string().describe('The generated project proposal.'),
  estimatedTime: z.string().describe('Realistic time estimate for project completion.'),
  estimatedCost: z.string().describe('Realistic cost estimate for the project.'),
  suggestedFeatures: z
    .string()
    .describe('Specific feature suggestions to meet the client\'s stated goals.'),
});

export type GenerateProjectProposalOutput = z.infer<
  typeof GenerateProjectProposalOutputSchema
>;

export async function generateProjectProposal(
  input: GenerateProjectProposalInput
): Promise<GenerateProjectProposalOutput> {
  return generateProjectProposalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectProposalPrompt',
  input: {schema: GenerateProjectProposalInputSchema},
  output: {schema: GenerateProjectProposalOutputSchema},
  prompt: `You are an AI assistant designed to generate project proposals for Syntax Studio Digital, a web design, branding, and automation company.

  Based on the summary of business needs provided by the prospective client, you will generate a unique project proposal with realistic time and cost estimates, as well as specific feature suggestions to meet the client's goals.

  Summary of Business Needs: {{{businessNeedsSummary}}}

  Here's how to format your output:

  Proposal: [Generated project proposal]
  Estimated Time: [Realistic time estimate for project completion]
  Estimated Cost: [Realistic cost estimate for the project]
  Suggested Features: [Specific feature suggestions to meet the client\'s stated goals]`,
});

const generateProjectProposalFlow = ai.defineFlow(
  {
    name: 'generateProjectProposalFlow',
    inputSchema: GenerateProjectProposalInputSchema,
    outputSchema: GenerateProjectProposalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
