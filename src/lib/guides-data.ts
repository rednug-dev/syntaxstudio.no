/**
 * Long-form cornerstone guides. Each entry produces a /guides/[slug] route.
 * Block-based content lets us mix paragraphs, headings, lists, callouts and tables
 * without needing MDX.
 */

export type Locale = "en" | "no";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title?: string; body: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type GuideContent = {
  /** H1 */
  title: string;
  /** TL;DR opening paragraph under H1 */
  lead: string;
  /** Body content blocks */
  blocks: Block[];
  /** FAQ rendered with FAQPage schema */
  faq: { q: string; a: string }[];
  /** CTA box at the bottom */
  cta: { title: string; body: string; primary: string; secondary: string };
};

export type Guide = {
  slug: string;
  /** ISO date strings */
  publishedAt: string;
  updatedAt: string;
  /** Where the secondary CTA points (typically the most relevant service) */
  serviceLink: string;
  meta: Record<Locale, { title: string; description: string }>;
  content: Record<Locale, GuideContent>;
};

export const GUIDES: Guide[] = [
  // ============================================================
  // WEBSITE COST IN NORWAY 2026
  // ============================================================
  {
    slug: "hva-koster-nettside-norge",
    publishedAt: "2026-04-12",
    updatedAt: "2026-04-12",
    serviceLink: "/services/web",
    meta: {
      no: {
        title: "Hva koster en nettside i Norge i 2026?",
        description:
          "En ærlig gjennomgang av hva en nettside faktisk koster i Norge i 2026, hvilke prisspenn som finnes, og hva du bør spørre om før du signerer.",
      },
      en: {
        title: "What does a website cost in Norway in 2026?",
        description:
          "An honest breakdown of what a website actually costs in Norway in 2026, what each price bracket gets you, and what to ask before you sign.",
      },
    },
    content: {
      no: {
        title: "Hva koster en nettside i Norge i 2026?",
        lead:
          "Det korte svaret: en seriøs bedriftsnettside i Norge ligger typisk mellom 15 000 og 150 000 kroner. Det lange svaret avhenger av hva siden faktisk skal gjøre. Her er hva du får for pengene, hva som driver kostnaden, og hva du bør spørre om før du signerer.",
        blocks: [
          { type: "h2", text: "Hvorfor prisene varierer så mye" },
          {
            type: "p",
            text: "En statisk landingsside og en full nettbutikk har ingenting med hverandre å gjøre, selv om begge kalles 'nettside'. Forskjellen er like stor som mellom en folder og et magasin. Når et byrå sier 'vi lager nettsider fra 10 000', spør hva de faktisk leverer for den prisen. Ofte er svaret en mal med byttet logo. Det er ikke nødvendigvis dårlig, men det er ikke det samme som en nettside bygget for din bedrift.",
          },
          {
            type: "p",
            text: "Tre faktorer styrer prisen mer enn alt annet:",
          },
          {
            type: "ul",
            items: [
              "Hvor mye må bygges fra bunnen av (mal vs. skreddersøm)",
              "Hvor mye funksjonalitet siden trenger (statisk innhold vs. brukerlogikk)",
              "Hvor mye design-arbeid som kreves (ferdig komponentbibliotek vs. egen visuell identitet)",
            ],
          },

          { type: "h2", text: "Prisspenn: hva du faktisk får" },
          { type: "h3", text: "10 000 til 30 000 kr" },
          {
            type: "p",
            text: "Dette er et sted å starte for små bedrifter, frilansere og prosjekter som først og fremst trenger å eksistere på nettet.",
          },
          {
            type: "p",
            text: "Du får typisk:",
          },
          {
            type: "ul",
            items: [
              "En til tre statiske sider",
              "Standard layout, ofte basert på en mal eller komponentsett",
              "Kontaktskjema",
              "Mobilvennlig design",
              "Hosting-oppsett",
            ],
          },
          {
            type: "p",
            text: "For en lokal håndverker, frisør eller liten konsulentvirksomhet kan dette være helt tilstrekkelig.",
          },

          { type: "h3", text: "30 000 til 80 000 kr" },
          {
            type: "p",
            text: "Her begynner det å bli mer interessant. Du beveger deg fra 'vi har en nettside' til 'vi har en nettside som faktisk gjør jobben sin'.",
          },
          {
            type: "p",
            text: "Du får typisk:",
          },
          {
            type: "ul",
            items: [
              "5 til 15 sider",
              "Skreddersydd design som matcher merkevaren din",
              "Kontaktskjema med integrasjon mot CRM eller e-post",
              "Bloggsystem eller nyhetsfunksjon",
              "Optimalisering for søkemotorer (SEO)",
              "Analyseoppsett (Google Analytics, tracking)",
            ],
          },
          {
            type: "p",
            text: "Dette er det vanlige prisspennet for bedrifter som trenger en seriøs digital tilstedeværelse uten avanserte funksjoner.",
          },

          { type: "h3", text: "80 000 til 150 000 kr" },
          {
            type: "p",
            text: "Nå snakker vi om en nettside som ikke bare presenterer, men leverer.",
          },
          {
            type: "p",
            text: "Du får typisk:",
          },
          {
            type: "ul",
            items: [
              "Full nettbutikk med betaling (Stripe, Vipps, Klarna)",
              "Produktkatalog og varelagerstyring",
              "Kundekontoer og innloggingsfunksjon",
              "Integrasjoner mot eksterne systemer (CRM, e-post, regnskap)",
              "Mer avansert design og animasjoner",
            ],
          },
          {
            type: "p",
            text: "Hvis du selger noe online, eller hvis nettsiden er en sentral del av forretningsmodellen din, er det her du bør ligge.",
          },

          { type: "h3", text: "150 000 til 300 000+ kr" },
          {
            type: "p",
            text: "På dette nivået snakker vi om webapplikasjoner mer enn nettsider.",
          },
          {
            type: "p",
            text: "Du får typisk:",
          },
          {
            type: "ul",
            items: [
              "Skreddersydde kundedashbord",
              "Live statistikk og rapporteringsverktøy",
              "Komplekse integrasjoner mot flere systemer",
              "API-utvikling og backend-logikk",
              "Multi-bruker-løsninger",
            ],
          },
          {
            type: "p",
            text: "Dette er ikke for de fleste bedrifter, men hvis du bygger et SaaS-produkt eller et internt verktøy, er det her du havner.",
          },

          { type: "h2", text: "Hva som faktisk driver kostnaden" },
          {
            type: "p",
            text: "De fleste byråer prater i grove pakker. Her er det som faktisk gjør at en nettside koster mer:",
          },
          {
            type: "ul",
            items: [
              "Skreddersydd design: hvis du vil ha noe som ikke ser ut som alle andre, kreves det design-arbeid. Det tar tid, og tid koster penger.",
              "Funksjonalitet utover statisk innhold: søkefunksjon, filter, brukerinnlogging, betaling. Hver av disse legger til timer.",
              "Integrasjoner: hver eksterne tjeneste du kobler til (CRM, e-post, regnskap, lagersystem) er en egen liten utviklingsjobb.",
              "Innhold: hvis byrået skal skrive teksten og ta bildene selv, koster det. Hvis du leverer alt klart, sparer du penger.",
              "Animasjoner og mikrointeraksjoner: de fine detaljene som gjør at siden føles levende. Nice to have, men ikke gratis.",
              "Tilgjengelighet (WCAG): hvis du selger til offentlig sektor eller har strenge krav, må siden være tilgjengelig. Det krever ekstra testing.",
            ],
          },

          { type: "h2", text: "Skjulte kostnader du bør spørre om" },
          {
            type: "p",
            text: "Prisen byrået oppgir er sjelden den endelige kostnaden. Spør spesifikt om:",
          },
          {
            type: "ul",
            items: [
              "Hosting: hvor er siden hostet, hva koster det per måned eller år, og er det inkludert i prisen?",
              "Vedlikehold: hva koster det å oppdatere innhold etter lansering? Månedlig avtale eller per time?",
              "Domene: eier du domenet selv, eller står byrået oppført som eier? (Du bør eie det selv.)",
              "Eierskap til kildekoden: eier du koden, eller er du låst til byrået? Viktig hvis du noen gang vil bytte.",
              "SSL-sertifikat: er det inkludert? (Ja, det burde være gratis i 2026.)",
              "Backup: hvem tar backup, og hvor ofte?",
              "Sikkerhetsoppdateringer: hvis siden er bygget på WordPress eller en annen plattform med plugins, må disse oppdateres. Hvem gjør det?",
            ],
          },

          { type: "h2", text: "Maler vs. skreddersøm: hva du faktisk trenger" },
          {
            type: "p",
            text: "Det er en myte at skreddersøm alltid er bedre. Det er også en myte at maler alltid er billigere på sikt. Sannheten ligger et sted mellom.",
          },
          {
            type: "callout",
            title: "Maler er bra hvis",
            body:
              "Du er en liten bedrift med begrenset budsjett, du har ikke sterke meninger om design, innholdet er relativt enkelt, og du er komfortabel med at siden ligner andre sider.",
          },
          {
            type: "callout",
            title: "Skreddersøm er bra hvis",
            body:
              "Du har en sterk visuell identitet du vil reflektere, du trenger funksjonalitet som ikke finnes i ferdige maler, siden er en sentral del av salgsprosessen din, eller du tenker langsiktig og vil bygge noe som skalerer.",
          },
          {
            type: "p",
            text: "Vi bruker ikke maler selv, men vi anbefaler det noen ganger til kunder hvor det åpenbart passer bedre. Det er ikke alle prosjekter som rettferdiggjør skreddersøm.",
          },

          { type: "h2", text: "WordPress, Wix, Squarespace eller skreddersydd?" },
          {
            type: "p",
            text: "Dette er et stort spørsmål. Kort versjon:",
          },
          {
            type: "ul",
            items: [
              "WordPress: den mest brukte plattformen i verden. Kraftig, men krever vedlikehold. Plugins blir utdaterte, sikkerhetshull oppstår, og siden blir tregere over tid. Bra for blogger og enklere bedriftssider.",
              "Wix og Squarespace: drag-and-drop-byggere. Veldig enkle å bruke, men begrenset fleksibilitet. Du eier ikke koden, og du kan ikke flytte siden senere. Bra for prosjekter som ikke trenger å vokse.",
              "Skreddersydd (Next.js, React): mer arbeid å bygge, men mye raskere, mer fleksibelt, og lettere å vedlikeholde på sikt. Bra for bedrifter som tar nettsiden seriøst.",
            ],
          },
          {
            type: "p",
            text: "Det finnes ikke ett riktig svar. Vi bygger på Next.js fordi det gir oss kontroll og ytelse, men vi sier helt ærlig: hvis du trenger en enkel statisk side og ikke har budsjett til skreddersøm, er Squarespace et fint sted å starte.",
          },

          { type: "h2", text: "Slik tenker du om budsjett" },
          {
            type: "ol",
            items: [
              "Tenk på nettsiden som en investering, ikke en kostnad. Hvis siden tjener inn 100 000 kroner i nye kunder det første året, er det helt OK at den kostet 50 000 å bygge.",
              "Sett av 10 til 20 prosent ekstra til vedlikehold første året. Det dukker alltid opp ting du vil endre etter lansering.",
              "Ikke betal for funksjonalitet du ikke trenger ennå. Det er bedre å bygge noe enkelt nå og utvide senere, enn å betale for et komplisert system du ikke utnytter.",
            ],
          },

          { type: "h2", text: "Hva som skiller et godt byrå fra et dårlig" },
          {
            type: "p",
            text: "Røde flagg:",
          },
          {
            type: "ul",
            items: [
              "De gir deg et tilbud uten å først spørre hva siden skal gjøre",
              "De vil ikke fortelle deg hva som faktisk er inkludert i prisen",
              "De vil låse deg inn i en månedsavtale du ikke kan komme ut av",
              "De eier domenet og koden, ikke du",
              "De har ingen referansekunder å vise",
            ],
          },
          {
            type: "p",
            text: "Grønne flagg:",
          },
          {
            type: "ul",
            items: [
              "De stiller spørsmål før de svarer",
              "De gir deg fast pris med klar beskrivelse av hva som er inkludert",
              "De forklarer tekniske valg på en måte du forstår",
              "De viser deg arbeidet underveis",
              "De er åpne om hva som ikke er inkludert",
            ],
          },
        ],
        faq: [
          {
            q: "Hva er minimum jeg kan betale for en seriøs nettside?",
            a: "Realistisk sett, rundt 10 000 kr for noe som ikke er en gratis Wix-side. Under det er du på maler eller en frilanser uten erfaring. Det kan gå bra, men risikoen er høyere.",
          },
          {
            q: "Trenger jeg å oppdatere siden ofte?",
            a: "Ja, men det betyr ikke nødvendigvis dyrt. Innhold (tekst, bilder, nyheter) kan du oppdatere selv hvis siden har et CMS. Tekniske oppdateringer (sikkerhet, plugins) bør et byrå håndtere.",
          },
          {
            q: "Hva med søkemotoroptimalisering (SEO)?",
            a: "SEO er delvis en del av selve byggingen (rask side, riktig HTML, mobil-vennlig) og delvis en pågående jobb (innhold, lenker, optimalisering). Et byrå som bygger nettsider bør levere de tekniske grunnlagene. Resten er ditt arbeid eller en separat tjeneste.",
          },
          {
            q: "Hvor lang tid tar det å lage en nettside?",
            a: "1 til 2 uker for enkle prosjekter. 6 til 12 uker for større prosjekter med nettbutikk eller dashbord. Hvis et byrå lover ferdig på en uke uten å se prosjektet, er det et rødt flagg.",
          },
          {
            q: "Hva hvis jeg bytter byrå senere?",
            a: "Hvis du eier domenet, koden, og hostingen, kan du flytte siden hvor som helst. Hvis byrået eier noe av dette, må du forhandle frem en overlevering eller bygge på nytt. Spør om dette før du signerer.",
          },
          {
            q: "Bør jeg betale alt på forhånd?",
            a: "Nei. Vanlig praksis er 30 til 50 prosent ved oppstart, og resten ved leveranse. Hvis et byrå krever alt på forhånd, går du videre.",
          },
        ],
        cta: {
          title: "Vil du ha en konkret pris på din nettside?",
          body: "Vi gir deg et detaljert tilbud med fast pris og tidslinje innen 48 timer etter en samtale. Ingen forpliktelser, ingen overraskelser.",
          primary: "Book et møte",
          secondary: "Se webdesign-tjenesten",
        },
      },

      en: {
        title: "What does a website cost in Norway in 2026?",
        lead:
          "Short answer: a serious business website in Norway typically costs between 15,000 and 150,000 NOK. The long answer depends on what the site actually has to do. Here's what you get for the money, what drives the cost, and what to ask before you sign.",
        blocks: [
          { type: "h2", text: "Why prices vary so much" },
          {
            type: "p",
            text: "A static landing page and a full webshop have nothing to do with each other, even though both are called 'a website'. The gap is like the gap between a leaflet and a magazine. When an agency says 'we build websites from 10,000 NOK', ask what they actually deliver for that price. Often the answer is a template with a swapped logo. That isn't necessarily bad, but it isn't the same as a website built for your business.",
          },
          {
            type: "p",
            text: "Three factors drive price more than anything else:",
          },
          {
            type: "ul",
            items: [
              "How much has to be built from scratch (template vs. custom)",
              "How much functionality the site needs (static content vs. user logic)",
              "How much design work it requires (off-the-shelf component library vs. unique visual identity)",
            ],
          },

          { type: "h2", text: "Price brackets: what you actually get" },
          { type: "h3", text: "10,000 to 30,000 NOK" },
          {
            type: "p",
            text: "A starting point for small businesses, freelancers and projects that mainly need to exist online.",
          },
          { type: "p", text: "You typically get:" },
          {
            type: "ul",
            items: [
              "One to three static pages",
              "Standard layout, often based on a template or component set",
              "Contact form",
              "Mobile-friendly design",
              "Hosting setup",
            ],
          },
          {
            type: "p",
            text: "For a local tradesperson, hairdresser or small consultancy this can be entirely sufficient.",
          },

          { type: "h3", text: "30,000 to 80,000 NOK" },
          {
            type: "p",
            text: "Now it gets more interesting. You move from 'we have a website' to 'we have a website that does its job'.",
          },
          { type: "p", text: "You typically get:" },
          {
            type: "ul",
            items: [
              "5 to 15 pages",
              "Custom design that matches your brand",
              "Contact form integrated with CRM or email",
              "Blog or news functionality",
              "Search engine optimization",
              "Analytics setup (Google Analytics, tracking)",
            ],
          },
          {
            type: "p",
            text: "This is the standard range for businesses that need a serious digital presence without advanced features.",
          },

          { type: "h3", text: "80,000 to 150,000 NOK" },
          {
            type: "p",
            text: "Now we're talking about a website that doesn't just present, it delivers.",
          },
          { type: "p", text: "You typically get:" },
          {
            type: "ul",
            items: [
              "Full webshop with payment (Stripe, Vipps, Klarna)",
              "Product catalog and inventory management",
              "Customer accounts and login",
              "Integrations with external systems (CRM, email marketing, accounting)",
              "More advanced design and animation",
            ],
          },
          {
            type: "p",
            text: "If you sell something online, or if the website is a central part of your business model, this is where you should be.",
          },

          { type: "h3", text: "150,000 to 300,000+ NOK" },
          {
            type: "p",
            text: "At this level we're talking about web applications more than websites.",
          },
          { type: "p", text: "You typically get:" },
          {
            type: "ul",
            items: [
              "Custom customer dashboards",
              "Live statistics and reporting tools",
              "Complex integrations across multiple systems",
              "API development and backend logic",
              "Multi-user solutions",
            ],
          },
          {
            type: "p",
            text: "This isn't for most businesses, but if you're building a SaaS product or an internal tool, this is where you end up.",
          },

          { type: "h2", text: "What actually drives the cost" },
          {
            type: "p",
            text: "Most agencies talk in rough packages. Here's what actually makes a website cost more:",
          },
          {
            type: "ul",
            items: [
              "Custom design: if you want something that doesn't look like everyone else, design work is required. It takes time, and time costs money.",
              "Functionality beyond static content: search, filtering, user login, payment. Each adds hours.",
              "Integrations: every external service you connect (CRM, email, accounting, inventory) is its own small development job.",
              "Content: if the agency has to write copy and shoot photos, it costs. If you supply everything ready, you save.",
              "Animation and microinteractions: the polish that makes a site feel alive. Nice to have, not free.",
              "Accessibility (WCAG): if you sell to public sector or have strict requirements, the site needs to be accessible. That takes extra testing.",
            ],
          },

          { type: "h2", text: "Hidden costs to ask about" },
          {
            type: "p",
            text: "The price an agency quotes is rarely the final cost. Ask specifically about:",
          },
          {
            type: "ul",
            items: [
              "Hosting: where is the site hosted, what does it cost per month or year, and is it included in the price?",
              "Maintenance: what does it cost to update content after launch? Monthly retainer or hourly?",
              "Domain: do you own the domain, or is the agency listed as the owner? (You should own it.)",
              "Code ownership: do you own the code, or are you locked to the agency? Important if you ever want to switch.",
              "SSL certificate: is it included? (Yes, it should be free in 2026.)",
              "Backup: who handles backups, and how often?",
              "Security updates: if the site is built on WordPress or another platform with plugins, those need updating. Who does it?",
            ],
          },

          { type: "h2", text: "Templates vs. custom: what you actually need" },
          {
            type: "p",
            text: "It's a myth that custom is always better. It's also a myth that templates are always cheaper in the long run. The truth sits somewhere in between.",
          },
          {
            type: "callout",
            title: "Templates work if",
            body:
              "You're a small business with a limited budget, you don't have strong design opinions, your content is relatively simple, and you're comfortable with looking similar to other sites.",
          },
          {
            type: "callout",
            title: "Custom works if",
            body:
              "You have a strong visual identity to reflect, you need functionality not found in off-the-shelf templates, the site is central to your sales process, or you're thinking long-term and want something that scales.",
          },
          {
            type: "p",
            text: "We don't use templates ourselves, but we sometimes recommend them to clients where it obviously fits better. Not every project justifies custom work.",
          },

          { type: "h2", text: "WordPress, Wix, Squarespace, or custom?" },
          {
            type: "p",
            text: "Big question. Short version:",
          },
          {
            type: "ul",
            items: [
              "WordPress: the most-used platform in the world. Powerful, but needs maintenance. Plugins go stale, security holes appear, and the site slows down over time. Good for blogs and simpler business sites.",
              "Wix and Squarespace: drag-and-drop builders. Very easy to use, but limited flexibility. You don't own the code, and you can't move the site later. Good for projects that don't need to grow.",
              "Custom (Next.js, React): more work to build, but much faster, more flexible, and easier to maintain over time. Good for businesses that take their website seriously.",
            ],
          },
          {
            type: "p",
            text: "There isn't one right answer. We build on Next.js because it gives us control and performance, but we'll say it straight: if you need a simple static page and don't have the budget for custom, Squarespace is a fine place to start.",
          },

          { type: "h2", text: "How to think about budget" },
          {
            type: "ol",
            items: [
              "Treat the website as an investment, not a cost. If the site brings in 100,000 NOK in new customers in year one, it's fine that it cost 50,000 to build.",
              "Set aside 10 to 20 percent extra for maintenance in year one. Things you want to change always come up after launch.",
              "Don't pay for functionality you don't need yet. Build something simple now and extend later, rather than paying for a complex system you don't use.",
            ],
          },

          { type: "h2", text: "What separates a good agency from a bad one" },
          { type: "p", text: "Red flags:" },
          {
            type: "ul",
            items: [
              "They give you a quote without asking what the site is supposed to do",
              "They won't tell you what's actually included in the price",
              "They want to lock you into a monthly retainer you can't exit",
              "They own the domain and code, not you",
              "They have no client references to show",
            ],
          },
          { type: "p", text: "Green flags:" },
          {
            type: "ul",
            items: [
              "They ask questions before giving answers",
              "They give you a fixed price with a clear scope",
              "They explain technical choices in a way you understand",
              "They show you the work as it progresses",
              "They're upfront about what isn't included",
            ],
          },
        ],
        faq: [
          {
            q: "What's the minimum I can pay for a serious website?",
            a: "Realistically, around 10,000 NOK for something that isn't a free Wix page. Below that you're on templates or a freelancer with no track record. It can work, but the risk is higher.",
          },
          {
            q: "Do I need to update the site often?",
            a: "Yes, but it doesn't have to be expensive. You can update content (text, images, news) yourself if the site has a CMS. Technical updates (security, plugins) should be handled by an agency.",
          },
          {
            q: "What about SEO?",
            a: "SEO is partly part of the build itself (fast site, correct HTML, mobile-friendly) and partly an ongoing job (content, links, optimization). An agency that builds websites should deliver the technical foundations. The rest is your work or a separate service.",
          },
          {
            q: "How long does it take to build a website?",
            a: "1 to 2 weeks for simple projects. 6 to 12 weeks for larger projects with a webshop or dashboard. If an agency promises a finished site in a week without seeing the project, that's a red flag.",
          },
          {
            q: "What if I switch agencies later?",
            a: "If you own the domain, code, and hosting, you can move the site anywhere. If the agency owns any of that, you have to negotiate a handover or rebuild. Ask about this before you sign.",
          },
          {
            q: "Should I pay everything upfront?",
            a: "No. Standard practice is 30 to 50 percent at start, the rest at delivery. If an agency requires everything upfront, walk away.",
          },
        ],
        cta: {
          title: "Want a concrete price for your website?",
          body: "We give you a detailed quote with fixed price and timeline within 48 hours of a conversation. No commitments, no surprises.",
          primary: "Book a meeting",
          secondary: "See our web service",
        },
      },
    },
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
