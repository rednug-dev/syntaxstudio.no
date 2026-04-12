/**
 * Source of truth for service detail pages.
 * Each service produces a /services/[slug] route in both locales.
 */

export type Locale = "en" | "no";

export type ServiceContent = {
  /** Hero H1 (page title) */
  title: string;
  /** Short subline under H1 */
  tagline: string;
  /** Opening paragraph (1-2 sentences) */
  intro: string;
  /** What we actually do, plain bullets */
  whatWeDo: string[];
  /** Differentiator section: heading + body */
  edge: { heading: string; body: string };
  /** Process / methodology, ordered steps */
  process: { title: string; desc: string }[];
  /** Who it fits, plain bullets */
  whoFor: string[];
  /** Pricing line, optional */
  pricing?: string;
  /** Optional case study link to show the work in action */
  caseLink?: { href: string; label: string };
  /** Specific CTA copy */
  cta: string;
  /** FAQ for this service */
  faq: { q: string; a: string }[];
};

export type Service = {
  slug: string;
  /** Lucide icon name (rendered on landing card) */
  icon: "TrendingUp" | "Camera" | "Video" | "Globe" | "Megaphone";
  /** Meta tags */
  meta: Record<Locale, { title: string; description: string }>;
  /** Page body content */
  content: Record<Locale, ServiceContent>;
  /** JSON-LD service offer text (price range or custom string) */
  offer?: { priceRange?: string; priceCurrency?: string };
  /** Slugs of services to suggest as related (rendered as cross-links) */
  related?: string[];
};

export const SERVICES: Service[] = [
  // ============================================================
  // MARKETING
  // ============================================================
  {
    slug: "marketing",
    icon: "TrendingUp",
    meta: {
      en: {
        title: "Data-driven marketing",
        description:
          "ICP modeling, geomapping and campaigns measured at every step. Built by a data engineer, fine-tuned per customer.",
      },
      no: {
        title: "Datadrevet markedsføring",
        description:
          "ICP-modellering, geomapping og kampanjer målt i hvert ledd. Bygget av en dataingeniør, finjustert per kunde.",
      },
    },
    content: {
      no: {
        title: "Markedsføring som er målbar i hvert ledd",
        tagline:
          "Vi finner ut hvem kundene dine faktisk er, og bruker pengene dine på å nå flere som ligner dem.",
        intro:
          "De fleste byråer setter opp kampanjer og krysser fingrene. Vi gjør ting annerledes. Før vi rører en eneste annonse, kartlegger vi hvem dine beste eksisterende kunder er og hvor de finnes. Så bygger vi kampanjene rundt det. Vår sjefsarkitekt Rasul er dataingeniør, og det er derfor vi kan fortelle deg nøyaktig hva som funker, og hva som ikke gjør det.",
        whatWeDo: [
          "ICP-rangering og kundeprofilering basert på dine reelle data",
          "Geomapping for å finne hvor kjøperne dine faktisk er",
          "Annonser på Google, Meta, LinkedIn og TikTok",
          "Tracking-oppsett i alle ledd: pixel, server-side, attribusjon",
          "Månedlige rapporter med tall som faktisk betyr noe",
        ],
        edge: {
          heading: "Hvorfor vi er annerledes",
          body:
            "Vi bruker data, ikke magefølelse. Når kampanjen først er i gang måler vi alt fra første klikk til sluttkjøp, og justerer ukentlig basert på det vi faktisk ser. Det betyr at du får vite hva som fungerer, hva som ikke gjør det, og hvorfor.",
        },
        process: [
          {
            title: "1. Datainnsamling",
            desc: "Vi henter inn dine eksisterende kunde- og salgsdata, kombinert med åpne datakilder.",
          },
          {
            title: "2. ICP-modellering",
            desc: "Vi rangerer hvilke kundeprofiler som er mest verdifulle og hvor de finnes geografisk.",
          },
          {
            title: "3. Kampanje-oppsett",
            desc: "Annonser og målgrupper bygges rundt ICP-modellen, med full tracking fra klikk til kjøp.",
          },
          {
            title: "4. Optimalisering",
            desc: "Ukentlige justeringer basert på faktiske resultater. Det som ikke leverer skrus av.",
          },
        ],
        whoFor: [
          "Bedrifter med eksisterende kundedata vi kan jobbe ut fra",
          "B2B og B2C med en gjennomsnittlig kundeverdi over noen tusen kroner",
          "De som er lei av byråer som ikke kan vise tall",
        ],
        cta: "Book et møte og få en gratis ICP-vurdering av dine eksisterende kunder",
        faq: [
          {
            q: "Trenger jeg eksisterende kundedata for å starte?",
            a: "Ikke nødvendigvis, men det hjelper. Har du salgshistorikk eller en e-postliste, kan vi modellere ICP fra det. Hvis ikke, starter vi med antakelser og justerer raskt basert på de første kampanjedataene.",
          },
          {
            q: "Hvor lang tid tar det før vi ser resultater?",
            a: "Første konkrete data har vi innen 14 dager. Reelle resultater på konvertering tar typisk 4-8 uker, avhengig av salgssyklusen din.",
          },
          {
            q: "Hva slags annonseplattformer jobber dere med?",
            a: "Google Ads, Meta (Facebook/Instagram), LinkedIn, TikTok og YouTube. Vi velger plattform ut fra hvor ICP-en din faktisk befinner seg, ikke ut fra hva som er trendy.",
          },
        ],
      },
      en: {
        title: "Marketing you can measure at every step",
        tagline:
          "We figure out who your customers actually are, then spend your budget reaching more people like them.",
        intro:
          "Most agencies set up campaigns and cross their fingers. We do it differently. Before we touch a single ad, we map out who your best existing customers are and where to find more like them. Then we build the campaigns around that. Our chief architect Rasul is a data engineer, and that's why we can tell you exactly what's working and what isn't.",
        whatWeDo: [
          "ICP scoring and customer profiling from your real data",
          "Geomapping to find where your buyers actually are",
          "Ads on Google, Meta, LinkedIn and TikTok",
          "Tracking in every step: pixel, server-side, attribution",
          "Monthly reports with numbers that actually matter",
        ],
        edge: {
          heading: "Why we're different",
          body:
            "We use data, not gut feeling. Once a campaign runs we measure everything from first click to final purchase, and tune it weekly based on what we actually see. So you find out what's working, what isn't, and why.",
        },
        process: [
          {
            title: "1. Data collection",
            desc: "We pull in your existing customer and sales data, combined with open data sources.",
          },
          {
            title: "2. ICP modeling",
            desc: "We rank which customer profiles are most valuable and where they sit geographically.",
          },
          {
            title: "3. Campaign setup",
            desc: "Ads and audiences are built around the ICP model, with full tracking from click to purchase.",
          },
          {
            title: "4. Optimization",
            desc: "Weekly adjustments based on actual results. What doesn't perform gets killed.",
          },
        ],
        whoFor: [
          "Businesses with existing customer data we can work from",
          "B2B and B2C with average customer value above a few thousand NOK",
          "Companies tired of agencies that can't show numbers",
        ],
        cta: "Book a meeting and get a free ICP assessment of your existing customers",
        faq: [
          {
            q: "Do I need existing customer data to start?",
            a: "Not strictly, but it helps. If you have sales history or an email list we can model ICP from that. If not, we start with assumptions and adjust quickly based on the first campaign data.",
          },
          {
            q: "How long until we see results?",
            a: "First concrete data within 14 days. Real conversion results typically take 4-8 weeks, depending on your sales cycle.",
          },
          {
            q: "What ad platforms do you work with?",
            a: "Google Ads, Meta (Facebook/Instagram), LinkedIn, TikTok and YouTube. We choose based on where your ICP actually lives, not on what's trendy.",
          },
        ],
      },
    },
    related: ["social-media", "web", "video"],
  },
  // ============================================================
  // PHOTO
  // ============================================================
  {
    slug: "photo",
    icon: "Camera",
    meta: {
      en: {
        title: "Photography",
        description:
          "Product, food and corporate photography shot on Sony A7V. Specialized in food photography for restaurants and food brands.",
      },
      no: {
        title: "Fotografering",
        description:
          "Produktfoto, matfoto og bedriftsfoto tatt på Sony A7V. Spesialiserte på matfoto for restauranter og matmerker.",
      },
    },
    content: {
      no: {
        title: "Fotografering med utstyr og erfaring som synes",
        tagline:
          "Sony A7V, lang erfaring og en spesialitet på matfoto. Bilder som faktisk får produktene dine til å selge.",
        intro:
          "Vi fotograferer på Sony A7V, et kamera fra proffsegmentet, og har bygget oss opp en spesialitet innenfor matfotografi. Det betyr at om du er en restaurant, et matmerke, eller selger noe som skal se appetittvekkende ut, vet vi nøyaktig hvordan vi skal sette det opp.",
        whatWeDo: [
          "Produktfotografi (white background eller styled scene)",
          "Matfoto for menyer, sosiale medier og emballasje",
          "Bedriftsfoto: portretter, ansattbilder, lokaler",
          "Bilder klare for både print, web og sosiale medier",
          "Etterbehandling og fargebehandling inkludert",
        ],
        edge: {
          heading: "Hvorfor utstyret betyr noe",
          body:
            "Sony A7V er ikke bare 'et bra kamera'. Det er det proff-fotografer bruker for kommersielt arbeid. Kombinert med riktige objektiver og styrt belysning gir det bilder med detaljnivå og dynamikk du ikke får fra et standard speilreflekskamera. På matbilder ser du forskjellen umiddelbart.",
        },
        process: [
          {
            title: "1. Planlegging",
            desc: "Vi avklarer hva bildene skal brukes til så vi kan velge riktig stil, format og oppløsning.",
          },
          {
            title: "2. Opptak",
            desc: "Studio eller på lokasjon. Vi tar med utstyret som trengs og styrer lys, oppsett og styling.",
          },
          {
            title: "3. Etterbehandling",
            desc: "Fargebehandling, retusjering og leveranse i de formatene du trenger.",
          },
        ],
        whoFor: [
          "Restauranter som trenger menyer og sosiale medier-innhold",
          "Matmerker og emballasje som skal selge fra hyllen",
          "Bedrifter som trenger ekte ansattbilder, ikke stockfotos",
          "Nettbutikker som trenger ekte produktbilder",
        ],
        cta: "Fortell oss hva som skal fotograferes, så får du et tilbud",
        caseLink: { href: "/work/jonk", label: "Se hvordan vi gjorde det for Jønk" },
        faq: [
          {
            q: "Har dere eget studio?",
            a: "Vi tar opptak både i studio og på lokasjon. For matfoto er det ofte best å komme til ditt sted så vi kan jobbe med ferske produkter rett fra kjøkkenet.",
          },
          {
            q: "Hvor mange bilder får jeg?",
            a: "Det avhenger av prosjektet. Et typisk produktshoot leverer 15-30 ferdigredigerte bilder. Vi avtaler antall i forkant så det aldri er overraskelser.",
          },
          {
            q: "Hvor lang tid tar etterbehandlingen?",
            a: "1-2 uker fra opptak til ferdige bilder for de fleste prosjekter. Større shoots kan ta lengre tid.",
          },
        ],
      },
      en: {
        title: "Photography with the gear and experience that shows",
        tagline:
          "Sony A7V, deep experience, and a specialty in food photography. Images that actually sell your product.",
        intro:
          "We shoot on the Sony A7V, a pro-segment camera, and have built a specialty in food photography. So if you're a restaurant, food brand, or selling anything that needs to look appetizing, we know exactly how to set it up.",
        whatWeDo: [
          "Product photography (white background or styled scene)",
          "Food photography for menus, social media and packaging",
          "Corporate: portraits, team shots, premises",
          "Images delivered for print, web and social",
          "Editing and color grading included",
        ],
        edge: {
          heading: "Why the gear matters",
          body:
            "The Sony A7V isn't just 'a good camera'. It's what pro photographers use for commercial work. Combined with the right lenses and controlled lighting it produces detail and dynamic range you don't get from a standard DSLR. On food photography you see the difference immediately.",
        },
        process: [
          {
            title: "1. Planning",
            desc: "We clarify what the images will be used for so we can pick the right style, format and resolution.",
          },
          {
            title: "2. Shoot",
            desc: "Studio or on location. We bring the gear and handle lighting, setup and styling.",
          },
          {
            title: "3. Post",
            desc: "Color grading, retouching and delivery in the formats you need.",
          },
        ],
        whoFor: [
          "Restaurants that need menu and social media content",
          "Food brands and packaging that has to sell off the shelf",
          "Companies that need real team photos, not stock",
          "Online stores that need real product images, not stock",
        ],
        cta: "Tell us what needs shooting and you'll get a quote",
        caseLink: { href: "/work/jonk", label: "See how we did it for Jønk" },
        faq: [
          {
            q: "Do you have your own studio?",
            a: "We shoot both in studio and on location. For food photography it's often best to come to you so we can work with fresh product straight from the kitchen.",
          },
          {
            q: "How many images do I get?",
            a: "Depends on the project. A typical product shoot delivers 15-30 finished images. We agree on the number upfront so there are never surprises.",
          },
          {
            q: "How long does editing take?",
            a: "1-2 weeks from shoot to finished images for most projects. Larger shoots can take longer.",
          },
        ],
      },
    },
    related: ["video", "marketing"],
  },
  // ============================================================
  // VIDEO
  // ============================================================
  {
    slug: "video",
    icon: "Video",
    meta: {
      en: {
        title: "Video production",
        description:
          "4K commercials, social ads and music-video grade production. Led by a videographer with deep roots in the Norwegian music video scene.",
      },
      no: {
        title: "Videoproduksjon",
        description:
          "4K-reklamefilmer, sosiale annonser og produksjon på musikkvideo-nivå. Ledet av en videograf med dype røtter i det norske musikkvideo-miljøet.",
      },
    },
    content: {
      no: {
        title: "Video som faktisk får oppmerksomhet",
        tagline:
          "Reklamefilm, sosiale annonser og produktvideo levert av en av Norges mest erfarne musikkvideo-folk.",
        intro:
          "Vår partner og markedssjef Khamzat har lang fartstid fra norsk musikkvideo og var i en periode blant de mest ettertraktede i bransjen. Den erfaringen legger vi inn i alt vi lager, fra 4K-reklamefilmer til 15-sekunders sosiale annonser. Vi filmer på Sony FX30, et kamera bygget for kommersiell videoproduksjon, og resultatet er video som folk faktisk stopper for å se på.",
        whatWeDo: [
          "Reklamefilm i 4K til TV, kino og web",
          "Sosiale annonser og kortform til Instagram, TikTok og Reels",
          "Produktvideo og demonstrasjonsfilmer",
          "Motion graphics og animasjon",
          "Color grading og lyd inkludert",
        ],
        edge: {
          heading: "Hvor erfaringen kommer fra",
          body:
            "Musikkvideo-miljøet er blant de tøffeste arenaene for film. Du har stramme budsjetter, urealistiske tidsfrister, og publikum som dropper videoen etter to sekunder hvis den ikke griper. Khamzat har levert i den verdenen i årevis. Nå bruker vi den disiplinen til å lage reklamefilmer som ikke ser ut som reklamefilmer.",
        },
        process: [
          {
            title: "1. Konsept",
            desc: "Vi utvikler ideen sammen med deg. Hva skal videoen si, til hvem, og hvor skal den brukes.",
          },
          {
            title: "2. Pre-produksjon",
            desc: "Storyboard, casting, lokasjon, utstyr. Alt avtalt før vi går på opptak.",
          },
          {
            title: "3. Opptak",
            desc: "Filming med profesjonelt utstyr. Vi kommer til deg eller jobber fra studio.",
          },
          {
            title: "4. Post-produksjon",
            desc: "Klipping, color grading, lydmiks, motion graphics og leveranse i alle formater.",
          },
        ],
        whoFor: [
          "Bedrifter som trenger reklamefilm til TV eller web",
          "Restauranter og merker som trenger fast strøm av sosialt innhold",
          "Produkter som er enklere å vise enn å forklare",
          "Brands som vil ha noe som faktisk skiller seg ut i feeden",
        ],
        cta: "Beskriv prosjektet, så lager vi et tilbud",
        caseLink: { href: "/work/jonk", label: "Se reklamefilmene vi lagde for Jønk" },
        faq: [
          {
            q: "Hva slags utstyr filmer dere på?",
            a: "Sony FX30 er hovedkameraet vårt, sammen med riktig lyssetting og lydutstyr. Vi velger hva vi tar med ut fra hva prosjektet faktisk trenger. Ikke alt krever det største oppsettet.",
          },
          {
            q: "Kan dere lage musikkvideo?",
            a: "Ja. Det er der vi har røttene våre. Hvis du er artist eller representerer en, ta kontakt så snakker vi.",
          },
          {
            q: "Hvor lang tid tar en reklamefilm?",
            a: "Fra første samtale til ferdig film: typisk 3-6 uker for en fullstendig produksjon. Kortere for enklere ting.",
          },
        ],
      },
      en: {
        title: "Video that actually gets attention",
        tagline:
          "Commercials, social ads and product video delivered by one of Norway's most experienced music video directors.",
        intro:
          "Our partner and marketing director Khamzat has years in Norwegian music video, where he was among the most sought-after in the scene. We carry that experience into everything we make, from 4K commercials to 15-second social ads. We shoot on the Sony FX30, a camera built for commercial video, and the result is footage people actually stop to watch.",
        whatWeDo: [
          "4K commercials for TV, cinema and web",
          "Social ads and short-form for Instagram, TikTok and Reels",
          "Product video and demonstration films",
          "Motion graphics and animation",
          "Color grading and sound included",
        ],
        edge: {
          heading: "Where the experience comes from",
          body:
            "Music video is one of the toughest arenas in film. Tight budgets, impossible deadlines, and audiences who drop the video after two seconds if it doesn't grab them. Khamzat delivered in that world for years. Now we apply that discipline to commercials that don't look like commercials.",
        },
        process: [
          {
            title: "1. Concept",
            desc: "We develop the idea with you. What should the video say, to whom, and where will it run.",
          },
          {
            title: "2. Pre-production",
            desc: "Storyboard, casting, location, gear. Everything agreed before we shoot.",
          },
          {
            title: "3. Shoot",
            desc: "Filming with professional gear. We come to you or work from studio.",
          },
          {
            title: "4. Post",
            desc: "Editing, color grading, sound mix, motion graphics and delivery in every format.",
          },
        ],
        whoFor: [
          "Businesses that need a commercial for TV or web",
          "Restaurants and brands that need a steady stream of social content",
          "Products that are easier to show than explain",
          "Brands that want something that actually stands out in the feed",
        ],
        cta: "Describe the project and we'll send you a quote",
        caseLink: { href: "/work/jonk", label: "See the commercials we made for Jønk" },
        faq: [
          {
            q: "What gear do you shoot on?",
            a: "The Sony FX30 is our main camera, paired with proper lighting and audio. We pick what to bring based on what the project actually needs. Not everything requires the biggest setup.",
          },
          {
            q: "Can you make music videos?",
            a: "Yes. That's where our roots are. If you're an artist or represent one, get in touch.",
          },
          {
            q: "How long does a commercial take?",
            a: "From first call to finished film: typically 3-6 weeks for a full production. Less for simpler pieces.",
          },
        ],
      },
    },
    related: ["photo", "marketing", "social-media"],
  },
  // ============================================================
  // WEB
  // ============================================================
  {
    slug: "web",
    icon: "Globe",
    meta: {
      en: {
        title: "Web design and development",
        description:
          "Custom-built websites from 10 000 to 200 000 NOK. No templates. Webshops, dashboards, live tracking, all delivered fast.",
      },
      no: {
        title: "Webdesign og utvikling",
        description:
          "Skreddersydde nettsider fra 10 000 til 200 000 kr. Aldri maler. Nettbutikk, dashbord, livestatistikk, levert raskt.",
      },
    },
    content: {
      no: {
        title: "Skreddersydde nettsider, fra enkle til avanserte",
        tagline:
          "Aldri maler. Bygget på en moderne stack vi kjenner ut og inn. Fra 10 000 til 200 000 kr.",
        intro:
          "Vi bruker aldri maler. Hver nettside vi leverer er bygget fra bunnen av rundt det din bedrift faktisk trenger. Stacken vi jobber på (Next.js, React, TypeScript, Tailwind) er den samme moderne teknologien som store techselskaper bruker, bare tilpasset prosjekter på din størrelse.",
        whatWeDo: [
          "Bedriftsnettsider og landingssider",
          "Nettbutikker med Stripe eller Vipps",
          "Kundedashbord og admin-paneler",
          "Live statistikk og tracking-løsninger",
          "Integrasjoner med eksterne systemer (CRM, e-post, betalingsleverandører)",
          "Hosting og vedlikehold",
        ],
        edge: {
          heading: "Hvorfor prisspennet er så bredt",
          body:
            "En enkel statisk landingsside kan vi levere fra 10 000 kr. En full nettbutikk eller et skreddersydd kundedashbord med integrasjoner kan komme opp i 200 000 kr. Vi sier prisene rett ut fordi vi vet at de fleste byråer ikke gjør det. Du får alltid et tilbud med fast pris før vi starter, så det er aldri overraskelser.",
        },
        process: [
          {
            title: "1. Samtale",
            desc: "Vi avklarer hva siden skal gjøre, hvem den er til, og hvilken funksjonalitet du trenger.",
          },
          {
            title: "2. Tilbud",
            desc: "Du får et detaljert tilbud med fast pris, tidslinje og hva som er inkludert.",
          },
          {
            title: "3. Design og bygging",
            desc: "Vi designer og bygger parallelt. Du ser arbeidet underveis og kan komme med innspill.",
          },
          {
            title: "4. Lansering og overlevering",
            desc: "Siden går live, vi setter opp hosting og analytics, og du får dokumentasjon på hvordan du oppdaterer innholdet.",
          },
        ],
        whoFor: [
          "Bedrifter som trenger en seriøs nettside, ikke en mal-løsning",
          "Nettbutikker med spesielle krav",
          "Selskaper som trenger interne verktøy eller dashbord",
          "Alle som er lei av WordPress og trege sider",
        ],
        pricing: "Fra 10 000 kr (statisk landingsside) til 200 000 kr (avansert nettbutikk eller dashbord)",
        cta: "Beskriv hva du trenger, så får du et tilbud innen 48 timer",
        faq: [
          {
            q: "Hva mener dere med 'aldri maler'?",
            a: "Vi bruker ikke ferdige WordPress-temaer eller dra-og-slipp-byggere. Hver linje kode skrives for ditt prosjekt. Det er derfor sidene våre laster raskere og ser annerledes ut enn 90% av norske bedriftssider.",
          },
          {
            q: "Hva er forskjellen på en side til 10 000 og en til 200 000?",
            a: "10 000-spennet er typisk én eller noen få landingssider, statisk innhold, kontaktskjema. 200 000-spennet kan være full nettbutikk med produktkatalog, betaling, kundedashbord, integrasjoner mot lagersystem og live statistikk.",
          },
          {
            q: "Hvor lang tid tar det å bygge en nettside?",
            a: "1-2 uker for de enkleste sidene. 6-12 uker for større prosjekter med nettbutikk eller dashbord. Vi gir deg en konkret tidslinje i tilbudet.",
          },
          {
            q: "Tar dere over hosting og vedlikehold?",
            a: "Ja, hvis du vil. Vi setter opp moderne hosting (Vercel eller tilsvarende) og kan tilby vedlikeholdsavtale for oppdateringer og support.",
          },
        ],
      },
      en: {
        title: "Custom websites, from simple to advanced",
        tagline:
          "No templates. Built on a modern stack we know inside out. From 10 000 to 200 000 NOK.",
        intro:
          "We never use templates. Every site we deliver is built from scratch around what your business actually needs. The stack we work on (Next.js, React, TypeScript, Tailwind) is the same modern technology big tech companies use, just sized for projects like yours.",
        whatWeDo: [
          "Business websites and landing pages",
          "Webshops with Stripe or Vipps",
          "Customer dashboards and admin panels",
          "Live statistics and tracking solutions",
          "Integrations with external systems (CRM, email, payment providers)",
          "Hosting and maintenance",
        ],
        edge: {
          heading: "Why the price range is so wide",
          body:
            "A simple static landing page we can deliver from 10 000 NOK. A full webshop or custom customer dashboard with integrations can reach 200 000 NOK. We say the numbers out loud because most agencies don't. You always get a fixed-price quote before we start, so there are no surprises.",
        },
        process: [
          {
            title: "1. Conversation",
            desc: "We clarify what the site should do, who it's for, and what functionality you need.",
          },
          {
            title: "2. Quote",
            desc: "You get a detailed quote with fixed price, timeline and scope.",
          },
          {
            title: "3. Design and build",
            desc: "We design and build in parallel. You see the work as it progresses and can give feedback.",
          },
          {
            title: "4. Launch and handover",
            desc: "Site goes live, we set up hosting and analytics, and you get documentation for updating content.",
          },
        ],
        whoFor: [
          "Companies that need a serious website, not a template",
          "Webshops with special requirements",
          "Companies that need internal tools or dashboards",
          "Anyone tired of WordPress and slow sites",
        ],
        pricing: "From 10 000 NOK (static landing page) to 200 000 NOK (advanced webshop or dashboard)",
        cta: "Describe what you need and get a quote within 48 hours",
        faq: [
          {
            q: "What do you mean by 'never templates'?",
            a: "We don't use prebuilt WordPress themes or drag-and-drop builders. Every line of code is written for your project. That's why our sites load faster and look different from 90% of Norwegian business sites.",
          },
          {
            q: "What's the difference between a 10 000 site and a 200 000 site?",
            a: "10 000 range is typically one or a few landing pages, static content, contact form. 200 000 range can be a full webshop with product catalog, payment, customer dashboard, inventory integrations and live statistics.",
          },
          {
            q: "How long does it take to build a website?",
            a: "1-2 weeks for the simplest sites. 6-12 weeks for larger projects with webshop or dashboard. We give you a concrete timeline in the quote.",
          },
          {
            q: "Do you handle hosting and maintenance?",
            a: "Yes, if you want. We set up modern hosting (Vercel or equivalent) and can offer a maintenance agreement for updates and support.",
          },
        ],
      },
    },
    offer: { priceRange: "10000-200000", priceCurrency: "NOK" },
    related: ["marketing", "social-media"],
  },
  // ============================================================
  // SOCIAL MEDIA
  // ============================================================
  {
    slug: "social-media",
    icon: "Megaphone",
    meta: {
      en: {
        title: "Social media management",
        description:
          "We take over your social channels and grow them with content built for the algorithm. If we don't grow your traffic in 30 days, you pay nothing.",
      },
      no: {
        title: "Sosiale medier-administrasjon",
        description:
          "Vi tar over kanalene dine og bygger dem med innhold tilpasset algoritmen. Hvis vi ikke øker trafikken på 30 dager, betaler du ingenting.",
      },
    },
    content: {
      no: {
        title: "Sosiale medier som faktisk vokser",
        tagline:
          "Vi tar over kanalene dine, lager innhold tilpasset hver plattform, og garanterer vekst.",
        intro:
          "Vi har brukt tusenvis av timer på å forstå hvordan algoritmene faktisk fungerer på Instagram, TikTok, Facebook og LinkedIn. Når vi tar over en kanal lager vi innhold som er bygget for algoritmen, ikke bare 'fine bilder'. Resultatet er målbar vekst i trafikk, følgere og engasjement.",
        whatWeDo: [
          "Full overtakelse av Instagram, TikTok, Facebook, LinkedIn eller YouTube",
          "Innholdsproduksjon (foto, video, tekst) tilpasset hver plattform",
          "Posting, planlegging og community management",
          "Analyse og rapportering hver måned",
          "Influencer-kampanjer og samarbeid",
        ],
        edge: {
          heading: "Vår 30-dagers garanti",
          body:
            "Hvis vi ikke har økt trafikken på dine sosiale kanaler innen 30 dager etter oppstart, pakker vi sakene og du betaler ingenting. Vi tør å gi denne garantien fordi vi vet hva som skal til. De fleste byråer låser deg inn i 6-måneders kontrakter og håper det går bra. Vi gir deg en månedlig prøveperiode først.",
        },
        process: [
          {
            title: "1. Audit",
            desc: "Vi går gjennom dine eksisterende kanaler og finner hva som funker, hva som ikke funker, og hvor potensialet ligger.",
          },
          {
            title: "2. Innholdsstrategi",
            desc: "Vi lager en plan for hvilket innhold som skal produseres, hvor ofte, og på hvilke plattformer.",
          },
          {
            title: "3. Produksjon og publisering",
            desc: "Vi lager og publiserer innholdet. Du godkjenner i forkant hvis du vil, eller bare lar oss kjøre.",
          },
          {
            title: "4. Måling og finjustering",
            desc: "Hva som funker dobler vi opp på. Hva som ikke funker dropper vi. Månedlig rapport viser alt.",
          },
        ],
        whoFor: [
          "Bedrifter som vet de burde gjøre mer på sosiale medier, men ikke har tid",
          "Restauranter og fysiske butikker som trenger lokal oppmerksomhet",
          "Merker som vil bygge en faktisk følgerbase, ikke kjøpe likes",
          "De som er lei av byråer med vage rapporter",
        ],
        cta: "30-dagers garanti, ingen risiko for å prøve oss",
        faq: [
          {
            q: "Hvordan fungerer 30-dagers garantien praktisk?",
            a: "Du betaler vanlig månedspris ved oppstart. Hvis vi etter 30 dager ikke har økt trafikken på dine kanaler målbart, refunderer vi hele beløpet og avslutter samarbeidet. Ingen lange kontrakter.",
          },
          {
            q: "Hvilke kanaler jobber dere mest med?",
            a: "Instagram og TikTok er der vi er sterkest, fordi det er der visuelt innhold leverer best. Vi jobber også med Facebook, LinkedIn og YouTube avhengig av hvor målgruppen din er.",
          },
          {
            q: "Tar dere over kontoer fra andre byråer?",
            a: "Ja, ofte. Vi gjør en grundig audit og bygger fra det vi har, så du ikke mister momentum.",
          },
          {
            q: "Lager dere alt innhold selv?",
            a: "Ja. Vi har egne kameraer, egne videografer og egne innholdsplanleggere. Det er derfor vi kan garantere både kvalitet og hastighet.",
          },
        ],
      },
      en: {
        title: "Social media that actually grows",
        tagline:
          "We take over your channels, build content tailored to each platform, and guarantee growth.",
        intro:
          "We've spent thousands of hours understanding how the algorithms actually work on Instagram, TikTok, Facebook and LinkedIn. When we take over a channel we build content for the algorithm, not just 'nice pictures'. The result is measurable growth in traffic, followers and engagement.",
        whatWeDo: [
          "Full takeover of Instagram, TikTok, Facebook, LinkedIn or YouTube",
          "Content production (photo, video, copy) tailored to each platform",
          "Posting, scheduling and community management",
          "Analytics and reporting every month",
          "Influencer campaigns and collaborations",
        ],
        edge: {
          heading: "Our 30-day guarantee",
          body:
            "If we haven't grown your social traffic within 30 days of starting, we pack up and you pay nothing. We dare to give this guarantee because we know what it takes. Most agencies lock you into 6-month contracts and hope. We give you a monthly trial first.",
        },
        process: [
          {
            title: "1. Audit",
            desc: "We go through your existing channels and find what's working, what isn't, and where the potential sits.",
          },
          {
            title: "2. Content strategy",
            desc: "We build a plan for what content gets produced, how often, and on which platforms.",
          },
          {
            title: "3. Production and publishing",
            desc: "We make and publish the content. You approve upfront if you want, or just let us run.",
          },
          {
            title: "4. Measure and tune",
            desc: "What works we double down on. What doesn't we kill. Monthly report shows everything.",
          },
        ],
        whoFor: [
          "Businesses that know they should do more on social, but don't have time",
          "Restaurants and physical stores that need local attention",
          "Brands that want a real follower base, not bought likes",
          "Companies tired of agencies with vague reports",
        ],
        cta: "30-day guarantee, no risk to try us",
        faq: [
          {
            q: "How does the 30-day guarantee work?",
            a: "You pay the normal monthly fee at start. If after 30 days we haven't measurably grown your traffic, we refund the full amount and end the engagement. No long contracts.",
          },
          {
            q: "What channels do you focus on?",
            a: "Instagram and TikTok are our strongest because that's where visual content delivers best. We also work on Facebook, LinkedIn and YouTube depending on where your audience is.",
          },
          {
            q: "Do you take over accounts from other agencies?",
            a: "Yes, often. We do a thorough audit and build from what's there so you don't lose momentum.",
          },
          {
            q: "Do you produce all the content yourselves?",
            a: "Yes. We have our own cameras, videographers and content planners. That's why we can guarantee both quality and speed.",
          },
        ],
      },
    },
    related: ["marketing", "video", "photo"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
