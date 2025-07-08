"use client";

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { ImageSlider } from "@/components/ui/image-slider";

interface CaseStudy {
    customer: string;
    title: string;
    intro: string;
    thumbnail: string;
    details: string;
    gallery?: string[];
    logoComparison?: {
        before: string;
        after: string;
    }
}

interface CaseStudyCardProps {
    caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    React.useEffect(() => {
        if (!api) return;
        
        const updateScrollability = () => {
            setCanScrollPrev(api.canScrollPrev())
            setCanScrollNext(api.canScrollNext())
        }

        updateScrollability()
        api.on("select", updateScrollability)
        api.on("reInit", updateScrollability)

        return () => {
            api.off("select", updateScrollability)
            api.off("reInit", updateScrollability)
        }
    }, [api])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer group h-full">
                    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative w-full h-48 flex items-center justify-center overflow-hidden bg-muted/20">
                            <div className="relative w-3/4 h-full">
                                <Image
                                    src={caseStudy.thumbnail}
                                    alt={caseStudy.title}
                                    layout="fill"
                                    objectFit="contain"
                                    className="transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    quality={75}
                                />
                            </div>
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
            <DialogContent className="max-w-[90vw] md:max-w-[80vw] p-0 max-h-[90vh] overflow-y-auto">
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
                    <div className="bg-muted flex flex-col items-center justify-center p-8 order-1 md:order-2 relative gap-4">
                        {caseStudy.logoComparison && (
                            <div className="w-full">
                                <h3 className="text-lg font-semibold mb-4 text-center">Logo Redesign</h3>
                                <ImageSlider
                                    beforeImage={caseStudy.logoComparison.before}
                                    afterImage={caseStudy.logoComparison.after}
                                />
                            </div>
                        )}
                        {caseStudy.gallery && (
                            <div className="w-full">
                                <h3 className="text-lg font-semibold mb-4 text-center">Nettside</h3>
                                <Carousel setApi={setApi} className="w-full max-w-md mx-auto">
                                    <CarouselContent>
                                        {caseStudy.gallery.map((image, i) => (
                                            <CarouselItem key={i}>
                                                <div className="relative w-full aspect-video">
                                                    <Image
                                                        src={image}
                                                        alt={`${caseStudy.title} gallery image ${i + 1}`}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        quality={75}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    {canScrollPrev && <CarouselPrevious />}
                                    {canScrollNext && <CarouselNext />}
                                </Carousel>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
