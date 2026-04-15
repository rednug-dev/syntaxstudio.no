/**
 * Blog posts. Norwegian only. Each entry produces a /no/blog/[slug] route.
 */

export type RichSegment =
  | string
  | { text: string; href: string; external?: boolean };

export type Block =
  | { type: "p"; text: string }
  | { type: "pRich"; segments: RichSegment[] }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title?: string; body: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      /** e.g. "16/9", "4/3" — when set, image is cropped to this ratio */
      aspectRatio?: string;
      /** CSS object-position, e.g. "center 70%" to show more of the bottom */
      objectPosition?: string;
    };

export type Post = {
  slug: string;
  title: string;
  /** Short summary shown on the index page and in meta description */
  excerpt: string;
  /** ISO date strings */
  publishedAt: string;
  updatedAt: string;
  /** H1 lead paragraph */
  lead: string;
  blocks: Block[];
};

export const POSTS: Post[] = [
  // ============================================================
  // MILEPÆL: AS-stiftelse (i dag)
  // ============================================================
  {
    slug: "syntax-studio-as-stiftet",
    title: "Syntax Studio er nå offisielt et AS",
    excerpt:
      "15. april 2026 ble Syntax Studio AS stiftet. Her er hva som ligger bak, og hva det betyr for kundene våre framover.",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    lead:
      "I dag, 15. april 2026, ble Syntax Studio AS offisielt registrert. Et naturlig steg etter snart et år med drift, og en milepæl vi har gledet oss til.",
    blocks: [
      { type: "h2", text: "Hvorfor AS nå?" },
      {
        type: "p",
        text: "Vi startet smått i mai 2025, først som enkeltpersonforetak. Det var den riktige formen den gangen: lav terskel, raskt i gang, fokus på å levere de første prosjektene. Ett år senere er bildet annerledes: vi har faste kunder, større prosjekter, og et behov for en selskapsform som matcher hvor vi er på vei.",
      },
      {
        type: "p",
        text: "Et AS gir oss tre konkrete fordeler:",
      },
      {
        type: "ul",
        items: [
          "Tydeligere skille mellom selskap og person, viktig når kontraktene blir større",
          "Enklere å ta inn samarbeidspartnere og ansatte når tiden er moden",
          "Mer profesjonell ramme rundt det vi allerede leverer",
        ],
      },
      { type: "h2", text: "Hva endrer seg for kundene?" },
      {
        type: "p",
        text: "Kort svar: ingenting i den daglige leveransen. Samme team, samme tilnærming, samme kvalitet. Det som endrer seg er fakturadetaljene: nytt org.nummer kommer på alle nye fakturaer fra og med i dag.",
      },
      { type: "h2", text: "Veien videre" },
      {
        type: "p",
        text: "Vi har en god pipeline med prosjekter inn mot sommeren, og vi planlegger å vokse forsiktig, ett til to nye samarbeid før høsten. Hvis du har et prosjekt på gang, er dette et fint tidspunkt å ta kontakt.",
      },
    ],
  },

  // ============================================================
  // MILEPÆL: Østbanehallen-event 11–18 april
  // ============================================================
  {
    slug: "ostbanehallen-westerlin-bjorndalen",
    title: "Vi dekker Oskar Westerlin og Mathea Bjørndalen på Østbanehallen",
    excerpt:
      "Fra 11. til 18. april 2026 dekker vi Oskar Westerlin og Mathea Bjørndalen sitt arrangement på Østbanehallen, med foto, video og innhold for sosiale medier.",
    publishedAt: "2026-04-10",
    updatedAt: "2026-04-10",
    lead:
      "Fra 11. til 18. april 2026 er vi på plass på Østbanehallen for å dekke arrangementet til Oskar Westerlin og Mathea Bjørndalen. En uke med foto, video og live innhold.",
    blocks: [
      {
        type: "image",
        src: "/blogg/Øhallen.webp",
        alt: "Østbanehallen i Oslo, hvor arrangementet holdes",
        caption: "Østbanehallen, Oslo S",
        aspectRatio: "4/3",
        objectPosition: "center 60%",
      },
      { type: "h2", text: "Hva vi gjør" },
      {
        type: "p",
        text: "Et arrangement over en hel uke gir helt andre muligheter enn et tradisjonelt eventopptak. Vi følger oppsettet fra rigging til siste dag, og leverer innhold underveis, ikke bare en pakke etter at alt er over.",
      },
      {
        type: "ul",
        items: [
          "Daglig foto og video som klippes og leveres samme kveld",
          "Reels og kortform-innhold til Instagram og TikTok",
          "Lengre dokumentasjonsfilm som oppsummerer hele uka",
          "Pressebilder klare for distribusjon",
        ],
      },
      { type: "h2", text: "Hvorfor Østbanehallen" },
      {
        type: "p",
        text: "Lokalet er en av Oslos mest visuelt interessante eventflater, med høyt under taket, naturlig lys gjennom buevinduene, og en arkitektur som gir bilder tyngde uten at vi må jobbe hardt for det. Det betyr at vi kan bruke mer tid på øyeblikkene og mindre på å kompensere for omgivelsene.",
      },
      { type: "h2", text: "Følg med" },
      {
        type: "pRich",
        segments: [
          "Vi legger ut bilder og klipp underveis på Instagram (",
          {
            text: "@syntaxstudio.no",
            href: "https://www.instagram.com/syntaxstudio.no/",
            external: true,
          },
          "). Hvis du skal innom Østbanehallen i løpet av uka, kom og si hei.",
        ],
      },
    ],
  },

  // ============================================================
  // VELKOMMEN
  // ============================================================
  {
    slug: "velkommen-til-bloggen",
    title: "Velkommen til bloggen",
    excerpt:
      "Første innlegg. Vi starter en blogg for å dele hvordan vi tenker om webdesign, utvikling og det å drive byrå i Norge.",
    publishedAt: "2025-05-10",
    updatedAt: "2025-05-10",
    lead:
      "Velkommen. Dette er første innlegg på bloggen, et sted hvor vi skriver ned det vi lærer underveis om webdesign, utvikling, og det å drive byrå i Norge.",
    blocks: [
      { type: "h2", text: "Hvorfor en blogg?" },
      {
        type: "p",
        text: "Vi tror på å skrive ned ting. Ikke for å pushe SEO-innhold, men fordi det tvinger oss til å tenke klart om det vi gjør. Og fordi det av og til er nyttig for andre å lese.",
      },
      { type: "h2", text: "Hva du kan forvente" },
      {
        type: "ul",
        items: [
          "Konkrete tips fra prosjekter vi har levert",
          "Tanker om verktøy, rammeverk og prosess",
          "Kortere innlegg om ting vi ser i bransjen",
        ],
      },
      { type: "p", text: "Mer kommer snart." },
    ],
  },

  // ============================================================
  // SEO 2026
  // ============================================================
  {
    slug: "seo-grunnleggende-2026",
    title: "SEO i 2026: hva som faktisk fungerer for små bedrifter",
    excerpt:
      "Glem hacks og hemmelige triks. SEO i 2026 handler om tre ting: rask side, ærlig innhold, og at folk faktisk lenker til deg.",
    publishedAt: "2026-03-22",
    updatedAt: "2026-03-22",
    lead:
      "SEO-bransjen elsker å gjøre faget mer komplisert enn det er. Sannheten i 2026 er mer kjedelig: Google har blitt veldig flink til å belønne sider som er raske, ærlige, og nyttige. Her er hva som faktisk flytter nålen for små norske bedrifter.",
    blocks: [
      { type: "h2", text: "1. Teknisk grunnlag" },
      {
        type: "p",
        text: "Hvis siden din er treg, mobilfiendtlig eller bygd på et CMS som spruter ut tung HTML, start her. Ingen mengde innholdsarbeid kompenserer for at sidene tar 5 sekunder å laste.",
      },
      {
        type: "ul",
        items: [
          "Last under 2 sekunder på 4G",
          "Mobilvennlig layout (Google rangerer mobil først)",
          "Riktig HTML-struktur: én H1, logiske H2-er, alt-tekst på bilder",
          "Sitemap og robots.txt på plass",
        ],
      },
      { type: "h2", text: "2. Innhold som svarer på reelle spørsmål" },
      {
        type: "p",
        text: "Ikke skriv «10 grunner til å velge oss». Skriv «hva koster en ny nettside i Norge», «hvordan velger jeg leverandør», «hva bør være med i en kontrakt». Folk søker etter problemer, ikke etter selvskryt.",
      },
      { type: "h2", text: "3. Lokal SEO" },
      {
        type: "p",
        text: "For en norsk bedrift som leverer i Oslo eller Bergen er Google Business Profile ofte viktigere enn selve nettsiden. Sett den opp, fyll ut alt, og be fornøyde kunder om anmeldelser. Det er gratis og undervurdert.",
      },
      { type: "h2", text: "Det du kan ignorere" },
      {
        type: "ul",
        items: [
          "Keyword density og andre 2010-trikser",
          "Lenkekjøp.Google ser det og straffer det",
          "AI-generert masseinnhold uten redaksjonell kontroll",
          "«SEO-pakker» som lover #1-plassering på 30 dager",
        ],
      },
    ],
  },

  // ============================================================
  // JØNK (mars 2026)
  // ============================================================
  {
    slug: "samarbeid-med-jonk",
    title: "Vi har startet samarbeid med Jønk",
    excerpt:
      "Fra 24. mars 2026 har vi tatt over hele markedsføringen til Jønk, fra pressekontakt til innhold på sosiale medier, med fokus på synlighet, konvertering og rapportering.",
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-24",
    lead:
      "Vi har offisielt startet samarbeidet med Jønk. En total markedsføringsavtale hvor vi tar ansvar for alt fra pressekontakt til daglig drift av sosiale medier, med synlighet og konvertering som målbare mål.",
    blocks: [
      {
        type: "image",
        src: "/blogg/JØNK.webp",
        alt: "Jønk, visuelt innhold fra samarbeidet",
      },
      { type: "h2", text: "Om samarbeidet" },
      {
        type: "p",
        text: "Jønk har en tydelig identitet og et klart bilde av hvor de vil. Det vi tilfører er en målrettet markedsføringsplan som omsetter den identiteten til faktisk synlighet og flere konverteringer, ikke bare flere likes.",
      },
      { type: "h2", text: "Hva vi leverer" },
      {
        type: "ul",
        items: [
          "Markedsføringsstrategi: konkrete mål for synlighet og konvertering",
          "Pressekontakt og PR: pitch til relevante medier og oppfølging",
          "Sosiale medier: full daglig drift som SoMe managers",
          "Foto og video som matcher den visuelle retningen",
          "Annonsering og kampanjer på tvers av kanaler",
          "Tett oppfølging og månedlig rapportering på tallene som faktisk betyr noe",
        ],
      },
      { type: "h2", text: "Hvorfor det funker" },
      {
        type: "p",
        text: "De beste samarbeidene er de der begge sider vet hva de er gode på. Jønk vet hva merkevaren deres skal være; vi vet hvordan vi gjør den synlig og målbar. Når én leverandør håndterer hele markedsføringen, slipper kunden å koordinere mellom fire forskjellige aktører som drar i hver sin retning.",
      },
    ],
  },

  // ============================================================
  // 5 TEGN PÅ NY NETTSIDE
  // ============================================================
  {
    slug: "naar-trenger-du-ny-nettside",
    title: "5 tegn på at det er på tide med ny nettside",
    excerpt:
      "Ikke alle nettsider trenger å byttes ut. Men hvis du kjenner deg igjen i to eller flere av disse, er det sannsynligvis tid for en oppfriskning.",
    publishedAt: "2026-02-14",
    updatedAt: "2026-02-14",
    lead:
      "En nettside trenger ikke byttes ut hvert annet år. Men noen ganger har den faktisk gjort jobben sin ferdig. Her er fem tegn vi ser igjen og igjen hos kunder som tar kontakt.",
    blocks: [
      { type: "h2", text: "1. Den er treg på mobil" },
      {
        type: "p",
        text: "Over 70 prosent av besøkende kommer fra mobil. Hvis siden tar 5+ sekunder å laste på en gjennomsnittlig 4G-tilkobling, mister du folk før de har sett forsiden. Test selv på pagespeed.web.dev.",
      },
      { type: "h2", text: "2. Du tør ikke vise den til nye kunder" },
      {
        type: "p",
        text: "Hvis du sender folk Google Drive-PDF-er i stedet for å lenke til siden, har siden et problem. En nettside skal være et salgsverktøy, ikke noe du må unnskylde.",
      },
      { type: "h2", text: "3. Du kan ikke endre innhold selv" },
      {
        type: "p",
        text: "Må du ringe utvikleren for å bytte et bilde eller en pris? Det er en sikker indikator på at plattformen er feil for behovet ditt.",
      },
      { type: "h2", text: "4. Designet ser ut som 2018" },
      {
        type: "p",
        text: "Skygger overalt, fire forskjellige fonter, stockbilder med folk som håndhilser foran et vindu. Smaken endrer seg, og en utdatert side signaliserer at bedriften også står stille.",
      },
      { type: "h2", text: "5. Den konverterer ikke" },
      {
        type: "p",
        text: "Hvis du har trafikk men ingen henvendelser, er det noe galt med hva siden kommuniserer eller hvordan den ber folk om å ta kontakt. Ofte er det enkle ting som løser dette, men ikke alltid.",
      },
    ],
  },

  // ============================================================
  // PRODUKTFOTO
  // ============================================================
  {
    slug: "produktfoto-som-selger",
    title: "Hvorfor produktfoto avgjør om folk klikker «kjøp»",
    excerpt:
      "Folk leser knapt produkttekst. De ser på bildet. Her er hva som skiller et produktbilde som selger fra ett som blir scrollet forbi.",
    publishedAt: "2026-01-20",
    updatedAt: "2026-01-20",
    lead:
      "Du har 1,5 sekunder på å overbevise noen om å stoppe å scrolle. I den tiden rekker de ikke å lese produktbeskrivelsen. De ser på bildet, og bestemmer seg.",
    blocks: [
      { type: "h2", text: "Hva som skiller et bra produktbilde" },
      {
        type: "ul",
        items: [
          "Konsistent bakgrunn og lyssetting på tvers av alle produkter",
          "Skarpt fokus der det betyr noe (etiketten, materialet, detaljen)",
          "Riktig størrelse: ikke for tett, ikke for langt unna",
          "Naturlig fargereturering, ikke overkokt",
        ],
      },
      { type: "h2", text: "Vanlige feil" },
      {
        type: "ul",
        items: [
          "Mobilbilder med blits gir flatt og glansete bilder",
          "Forskjellig bakgrunn på hvert bilde, så siden ser rotete ut",
          "For mye redigering i Photoshop, så produkter ser uekte ut",
          "Manglende kontekstbilder (hvordan ser produktet ut i bruk?)",
        ],
      },
      { type: "h2", text: "Investering vs. avkastning" },
      {
        type: "p",
        text: "En time med profesjonelt produktfoto koster typisk 1500 til 3000 kr per produkt for en full pakke (hvitt, livsstil, detalj). Hvis det produktet selges for 500 kr og foto øker konvertering med selv noen prosent, er det tjent inn etter noen dusin salg.",
      },
    ],
  },

  // ============================================================
  // VIPPS ELLER STRIPE
  // ============================================================
  {
    slug: "vipps-eller-stripe",
    title: "Vipps eller Stripe? Slik velger du betalingsløsning",
    excerpt:
      "Begge er gode. Spørsmålet er hva du selger, til hvem, og hvor. Her er en konkret guide for norske nettbutikker.",
    publishedAt: "2025-11-08",
    updatedAt: "2025-11-08",
    lead:
      "Vi blir ofte spurt: skal jeg bruke Vipps eller Stripe? Begge er gode tjenester med ulike styrker. Her er hva som faktisk avgjør valget.",
    blocks: [
      { type: "h2", text: "Vipps" },
      {
        type: "p",
        text: "Vipps er den klart enkleste betalingsmåten for norske kunder. Ett klikk, ferdig. Konverteringsraten på checkout er typisk 10 til 20 prosent høyere enn med kortbetaling alene.",
      },
      {
        type: "callout",
        title: "Velg Vipps hvis",
        body:
          "Du selger primært til norske privatkunder, snittordren er under 5000 kr, og du vil ha lavest mulig friksjon i checkout.",
      },
      { type: "h2", text: "Stripe" },
      {
        type: "p",
        text: "Stripe er bygget for utviklere og skalerer enklere internasjonalt. Du får tilgang til kort, Apple Pay, Google Pay, Klarna, og en rekke andre metoder gjennom én integrasjon.",
      },
      {
        type: "callout",
        title: "Velg Stripe hvis",
        body:
          "Du selger til kunder utenfor Norge, har abonnement eller faste betalinger, eller trenger fleksibilitet i hvordan betalinger håndteres.",
      },
      { type: "h2", text: "Det åpenbare svaret" },
      {
        type: "p",
        text: "I de fleste tilfeller: begge. Vipps som standardvalg for norske kunder, Stripe som backup for kort og internasjonale betalinger. Det koster litt mer i integrasjonstid, men gir best dekning.",
      },
    ],
  },

  // ============================================================
  // TIKTOK
  // ============================================================
  {
    slug: "tiktok-for-norske-bedrifter",
    title: "TikTok for norske bedrifter: verdt tiden?",
    excerpt:
      "Kort svar: kommer an på hvem du selger til. Lengre svar: sannsynligvis ja, men ikke på den måten du tror.",
    publishedAt: "2025-09-30",
    updatedAt: "2025-09-30",
    lead:
      "TikTok har sluttet å være «bare for tenåringer» for lenge siden. Spørsmålet er ikke om plattformen er stor nok i Norge (den er det), men om innsatsen lønner seg for din type bedrift.",
    blocks: [
      { type: "h2", text: "Hvem TikTok funker for" },
      {
        type: "ul",
        items: [
          "Bedrifter med visuelle produkter (mat, mote, interiør, skjønnhet)",
          "Tjenester der kompetansen kan vises i kortform (advokat, regnskap, fysio)",
          "Lokale virksomheter som vil bygge gjenkjenning i nærområdet",
        ],
      },
      { type: "h2", text: "Hvem det ikke funker for" },
      {
        type: "p",
        text: "Hvis du selger B2B-programvare til 500 000 kr per kontrakt, er TikTok feil kanal. Beslutningstakerne dine bruker LinkedIn, ikke FYP. Bruk pengene der.",
      },
      { type: "h2", text: "Det vanligste feilgrepet" },
      {
        type: "p",
        text: "Bedrifter behandler TikTok som Instagram. Polerte produktbilder, perfekte tekstoppsett, profesjonell stemmekommentar. Det funker ikke. TikTok belønner råhet, autentisitet, og innhold som ikke ser ut som reklame.",
      },
      { type: "h2", text: "Realistisk forventning" },
      {
        type: "p",
        text: "Regn med 3 til 6 måneder med jevn posting (3 til 5 ganger i uka) før algoritmen forstår hvem som skal se innholdet ditt. Mange gir opp etter 3 uker. Det er som å gå på treningssenter to ganger og bli skuffet over at ingenting skjedde.",
      },
    ],
  },

  // ============================================================
  // STIFTELSEN AV BEDRIFTEN (mai 2025)
  // ============================================================
  {
    slug: "syntax-studio-stiftet",
    title: "Vi har stiftet Syntax Studio",
    excerpt:
      "I mai 2025 startet vi Syntax Studio. Et byrå for bedrifter som vil ha web, foto, video og innhold som henger sammen, uten å måtte snakke med fem ulike leverandører.",
    publishedAt: "2025-05-15",
    updatedAt: "2025-05-15",
    lead:
      "Vi har offisielt startet Syntax Studio. Et byrå bygd på den enkle ideen at web, foto, video og sosiale medier ikke burde være fire separate samtaler med fire forskjellige leverandører.",
    blocks: [
      { type: "h2", text: "Hvorfor vi starter dette" },
      {
        type: "p",
        text: "Vi har sett det fra begge sider, både som kunder hos andre byråer, og som folk som har levert tjenester på frilansbasis. Mønsteret går igjen: bedrifter har én leverandør for nettside, en annen for foto, en tredje for video, og noen som «hjelper litt med Instagram». Ingen ser helheten. Innholdet drar i ulike retninger, og kunden bruker mer tid på å koordinere enn på å bygge.",
      },
      {
        type: "p",
        text: "Vi tror det går an å gjøre dette annerledes.",
      },
      { type: "h2", text: "Hva vi gjør" },
      {
        type: "ul",
        items: [
          "Web: design og utvikling av nettsider og nettbutikker",
          "Foto: produkt-, mat- og merkevarefotografering",
          "Video: reklamefilm og kortform-innhold",
          "Sosiale medier: fast leveransekadens med innhold som matcher resten",
          "Markedsføring: tracking og optimalisering av det som faktisk virker",
        ],
      },
      { type: "h2", text: "Hvordan vi jobber" },
      {
        type: "p",
        text: "Vi tror på fast pris, klare leveranser, og at kunden eier alt som blir laget: domene, kode, råfiler. Ingen lock-in, ingen overraskelser i etterkant.",
      },
      { type: "h2", text: "Veien videre" },
      {
        type: "p",
        text: "Vi starter smått, og vil heller bygge sakte med riktige kunder enn fort med feil. Hvis du har et prosjekt der dette resonnerer, ta kontakt.",
      },
    ],
  },

  // ============================================================
  // REKLAMEFILM PRIS
  // ============================================================
  {
    slug: "hva-koster-en-reklamefilm",
    title: "Hva koster en reklamefilm i Norge?",
    excerpt:
      "Fra 15 000 til 500 000+. Her er hva som faktisk driver kostnaden, og hva du bør spørre om før du signerer.",
    publishedAt: "2025-07-12",
    updatedAt: "2025-07-12",
    lead:
      "Spørsmålet «hva koster en reklamefilm» har omtrent like mye mening som «hva koster en bil». Svaret avhenger av størrelse, ambisjon og hvor lenge den skal vare. Her er hva du faktisk får for pengene i forskjellige prisklasser.",
    blocks: [
      { type: "h2", text: "15 000 til 40 000 kr" },
      {
        type: "p",
        text: "Korte sosiale-medier-filmer, intervjuer, enkel produktfilm. Én kameramann, naturlig lys, opptak på én dag, klipp innen en uke. Bra for bedrifter som trenger jevn flyt av innhold.",
      },
      { type: "h2", text: "40 000 til 150 000 kr" },
      {
        type: "p",
        text: "Mer ambisiøse produksjoner. Crew på 2 til 4 personer, profesjonell lys og lyd, manus, regi, fargegradering. Typisk leveranse: hovedfilm pluss 2 til 4 kortere klipp for sosiale medier. Dette er sweet spot for de fleste norske bedrifter.",
      },
      { type: "h2", text: "150 000 til 500 000+ kr" },
      {
        type: "p",
        text: "Større produksjoner med skuespillere, location-scouting, flere opptaksdager, og et team som inkluderer produsent og art director. Reklamefilm for TV eller kinodistribusjon havner her.",
      },
      { type: "h2", text: "Det folk glemmer å spørre om" },
      {
        type: "ul",
        items: [
          "Musikk: lisensiert musikk koster (eller dere må bruke royalty-fri)",
          "Stemmespor: profesjonell voice-over er typisk 3000 til 10 000 kr",
          "Bruksrettigheter: skal filmen brukes på TV? Det koster ekstra",
          "Versjonering: trenger dere 9:16, 1:1, og 16:9? Hver versjon tar tid",
        ],
      },
      { type: "h2", text: "Hva du bør prioritere hvis budsjettet er stramt" },
      {
        type: "p",
        text: "Skip de fancy droneklippene. Bruk pengene på godt manus, god lyd, og en god klipper. En enkel film med tydelig budskap slår alltid en avansert film uten retning.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}
