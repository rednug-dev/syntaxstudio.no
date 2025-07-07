"use client"
import CaseStudyCard from './case-study-card';

const caseStudies = [
    {
        customer: "RiseUp",
        title: "Styrket Digital Tilstedeværelse for Økt Impact",
        intro: "Ny branding og nettside for å booste RiseUps digitale profil og styrke søknadene deres om midler.",
        thumbnail: "/riseup/riseupnewlogo-2.webp",
        details: `RiseUp, en organisasjon for ungdom med minoritetsbakgrunn, trengte en digital oppgradering for å matche sitt viktige arbeid og styrke søknadsprosesser for finansiering.
        
        Vår løsning var en total-makeover av merkevaren og en ny, proff nettside:
        - Ny visuell identitet og logo som utstråler profesjonalitet og varme.
        - Moderne, brukervennlig nettside som kommuniserer deres misjon og resultater.
        - Fremheving av arrangementer og suksesshistorier for å bygge tillit.
        
        Med en styrket digital plattform fremstår RiseUp nå som en mer seriøs aktør, noe som har økt deres troverdighet og sjanser i kampen om viktige midler.`,
        gallery: ["/riseup/riseup1.webp", "/riseup/riseup2.webp", "/riseup/riseup3.webp"]
    },
    {
        customer: "Bites",
        title: "Fra Pop-Up til Proff Aktør",
        intro: "Fra pop-up til proft. Vi ga Bites den digitale plattformen de trengte for å lande større festivaler og events.",
        thumbnail: "/bites/biteslogo.webp",
        details: `Bites startet som et kult pop-up konsept, men manglet en proff plattform for bestillinger og merkevarebygging. 
        
        Vi utviklet en stilren og mobilvennlig nettside med en smooth bestillingsprosess:
        - Intuitiv bestillingsflyt for rask service.
        - Sikker og enkel online betaling.
        - Et proft design som bygger tillit og gjenkjennelse.
        
        Med sin nye digitale plattform ble Bites en seriøs aktør. Dette åpnet dører til store festivaler og events, og la grunnlaget for videre vekst.`,
        gallery: ["/bites/bites1.jpg", "/bites/bites2.webp", "/bites/bites3.webp"]
    },
    {
        customer: "DataSec",
        title: "Innovativ Sikkerhetstech for Vekterbransjen",
        intro: "Ny identitet, ny nettside og custom tech for DataSec. Vi leverer sanntidsdata som forbedrer sikkerheten.",
        thumbnail: "/datasec/DataSec-Logo.webp",
        details: `DataSec utfordrer vekterbransjen med innovativ teknologi. Vi ga dem en ny visuell identitet og en proff nettside som matcher deres moderne tilnærming.

En sentral del av samarbeidet er utviklingen av skreddersydd teknologi, som en sanntidsteller for utesteder. Systemet gir full oversikt over antall gjester via et dashbord, som lar kundene optimalisere bemanning og forbedre sikkerheten. Dette gir også verdifull data for smartere, datadrevne beslutninger.`,
        gallery: ["/datasec/datasec1.webp"]
    }
];

export default function CaseStudiesSection() {
    return (
        <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Våre Caser</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((caseStudy, index) => (
                        <CaseStudyCard key={index} caseStudy={caseStudy} />
                    ))}
                </div>
            </div>
        </section>
    );
}
