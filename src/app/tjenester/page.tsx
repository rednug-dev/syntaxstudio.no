"use client";

import Footer from '@/components/footer';
import Header from '@/components/header';
import { services, testimonials } from '@/lib/case-studies';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProjectsShowcase from '@/components/project-showcase';


const serviceIllustrations = [
    "/services/design.webp",
    "/services/identity.webp",
    "/services/ai.webp"
];

export default function TjenesterPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <Header />
            <main className="flex-grow">
                <ProjectsShowcase />
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold font-headline">Hva våre kunder sier</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start">
                                            <Avatar className="w-12 h-12 mr-4">
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <blockquote className="text-lg italic border-l-4 pl-4">
                                                    {testimonial.testimonial}
                                                </blockquote>
                                                <p className="mt-4 font-bold">{testimonial.name}</p>
                                                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
