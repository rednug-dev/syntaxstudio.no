'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleContactInquiry, type FormState } from '@/app/actions';
import { ContactInquirySchema } from '@/lib/schemas';
import { Input } from '@/components/ui/input';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <MessageSquare className="mr-2 h-5 w-5" />
          Send Message
        </>
      )}
    </Button>
  );
}

export default function ProposalSection() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: FormState = { message: '', errors: null, success: false };
  const [state, formAction] = useActionState(handleContactInquiry, initialState);

  const form = useForm<z.infer<typeof ContactInquirySchema>>({
    resolver: zodResolver(ContactInquirySchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  useEffect(() => {
    if (state.message && !state.success) {
      let description = state.message;
      if (state.errors) {
        const errorMessages = Object.values(state.errors).flat().join(' ');
        if (errorMessages) {
          description = errorMessages;
        }
      }
      toast({
        variant: "destructive",
        title: "Feil",
        description: description,
      });
    }
    if (state.success) {
      form.reset();
    }
  }, [state, toast, form]);

  return (
    <section id="proposal" className="container mx-auto px-4 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold font-headline">Lets work together!</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Let us know what you want to build, and we will be in touch!
          </p>
        </div>

        {state.success ? (
          <Card className="p-6 md:p-8 text-center animate-fade-in-up">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
            <h3 className="text-2xl font-bold font-headline mt-4">Thanks for your message!</h3>
            <p className="mt-2 text-muted-foreground">{state.message}</p>
          </Card>
        ) : (
          <Card className="p-6 md:p-8 animate-fade-in-up">
            <Form {...form}>
              <form
                ref={formRef}
                action={formAction}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What do you have in mind?"
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
        )}
      </div>
    </section>
  );
}
