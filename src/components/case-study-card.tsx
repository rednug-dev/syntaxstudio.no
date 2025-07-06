"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

interface CaseStudy {
    customer: string;
    title: string;
    intro: string;
    imageUrl: string;
    details: string;
    gallery: string[];
}

interface CaseStudyCardProps {
    caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer group h-full">
                    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative w-full h-48 overflow-hidden">
                            <Image
                                src={caseStudy.imageUrl}
                                alt={caseStudy.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <CardHeader>
                            <p className="text-sm font-semibold text-primary">{caseStudy.customer}</p>
                            <CardTitle>{caseStudy.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{caseStudy.intro}</p>
                        </CardContent>
                    </Card>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80vw] p-0 max-h-[90vh] overflow-y-auto">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 flex flex-col justify-center order-2 md:order-1">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-headline mb-4">{caseStudy.title}</DialogTitle>
                        </DialogHeader>
                        <div>
                            <p className="font-semibold text-primary mb-4">{caseStudy.customer}</p>
                            <p className="text-base text-muted-foreground whitespace-pre-line">{caseStudy.details}</p>
                        </div>
                    </div>
                    <div className="bg-muted flex items-center justify-center p-8 order-1 md:order-2">
                        <Carousel className="w-full max-w-md">
                            <CarouselContent>
                                {caseStudy.gallery.map((image, i) => (
                                    <CarouselItem key={i}>
                                        <div className="relative w-full h-96">
                                            <Image src={image} alt={`${caseStudy.title} gallery image ${i + 1}`} layout="fill" objectFit="contain" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
