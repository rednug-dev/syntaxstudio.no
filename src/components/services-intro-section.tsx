"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Code, Bot } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function ServicesIntroSection() {
    const services = [
        {
            icon: <Code className="w-8 h-8 text-primary" />,
            title: "Webutvikling & Design",
            description: "Vi bygger lynraske, responsive og fete nettsider som fanger oppmerksomhet og konverterer."
        },
        {
            icon: <Briefcase className="w-8 h-8 text-primary" />,
            title: "Merkevarebygging & Identitet",
            description: "Fra logo til visuell profil. Vi skaper en unik merkevareidentitet som treffer målgruppa di."
        },
        {
            icon: <Bot className="w-8 h-8 text-primary" />,
            title: "AI & Automatisering",
            description: "Vi booster produktiviteten din med custom automatiseringsløsninger og AI-integrasjoner."
        }
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section id="services" className="py-20 sm:py-28 bg-muted/50" ref={ref}>
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold font-headline">Våre Tjenester</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        En komplett pakke med digitale tjenester som transformerer din online tilstedeværelse.
                    </p>
                </motion.div>
                <motion.div 
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="h-full"
                        >
                            <Card className="flex flex-col text-center items-center h-full">
                                <CardHeader className="flex flex-col items-center">
                                    {service.icon}
                                    <CardTitle className="font-headline text-2xl mt-4">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
