'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Loader2, FileText, Clock, DollarSign, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateProposal, type FormState } from '@/app/actions';

const ProposalRequestSchema = z.object({
  businessNeedsSummary: z.string().min(50, "Please provide a detailed summary of at least 50 characters."),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-5 w-5" />
          Generate Instant Proposal
        </>
      )}
    </Button>
  );
}

export default function ProposalSection() {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);

  const initialState: FormState = { data: null, error: null, message: '' };
  const [state, formAction] = useFormState(handleGenerateProposal, initialState);

  const form = useForm<z.infer<typeof ProposalRequestSchema>>({
    resolver: zodResolver(ProposalRequestSchema),
    defaultValues: { businessNeedsSummary: '' },
  });

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
    if (state.data) {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state, toast]);

  const onFormSubmit = (data: z.infer<typeof ProposalRequestSchema>) => {
    const formData = new FormData();
    formData.append('businessNeedsSummary', data.businessNeedsSummary);
    formAction(formData);
  };
  
  return (
    <section id="proposal" className="container mx-auto px-4 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold font-headline">AI-Powered Project Proposal</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe your business needs, and our AI will generate a tailored project proposal with time and cost estimates in seconds.
          </p>
        </div>

        <Card className="p-6 md:p-8 animate-fade-in-up">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessNeedsSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Your Business Needs</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'We are a startup in the sustainable fashion space. We need a modern e-commerce website with a strong brand identity to showcase our products, manage inventory, and process payments. We'd also like a blog to share our story...'"
                        className="min-h-[150px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <SubmitButton />
              </div>
            </form>
          </Form>
        </Card>

        <div ref={resultRef} className="mt-12">
          {state.data && (
            <div className="space-y-8 animate-fade-in-up">
              <h3 className="text-3xl font-bold text-center font-headline">Your Custom Proposal</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline">Estimated Time</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-2xl font-semibold">{state.data.estimatedTime}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-3">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline">Estimated Cost</CardTitle>
                  </CardHeader>
                  <CardContent><p className="text-2xl font-semibold">{state.data.estimatedCost}</p></CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <CardTitle className="font-headline">Project Proposal</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none text-foreground/90">
                    <p>{state.data.proposal}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  <CardTitle className="font-headline">Suggested Features</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none text-foreground/90">
                    <p>{state.data.suggestedFeatures}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
