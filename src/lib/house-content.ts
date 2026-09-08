/** Shared, source-controlled content for Syntax and its specialist practices. */
export type HouseLocale = "no" | "en";
export type LocalizedText = { no: string; en: string };
export type PracticeId = "iso400" | "35mm" | "nyfane";
export type ProjectPracticeId = PracticeId | "syntax";

export function localText(value: LocalizedText, locale: string): string {
  return value[locale === "en" ? "en" : "no"];
}

export type Practice = {
  id: PracticeId;
  name: string;
  number: string;
  discipline: LocalizedText;
  description: LocalizedText;
  founder: string;
  capabilities: LocalizedText[];
  website: string | null;
  contactHref: string;
};

function practiceWebsite(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export const practices: Practice[] = [
  {
    id: "iso400",
    name: "ISO400",
    number: "01",
    discipline: { no: "Bilde & design", en: "Image & Design" },
    description: {
      no: "Bilder med en egen stemme. Identiteter som henger sammen, fra det første fotografiet til den siste trykksaken.",
      en: "Images with a point of view. Identities that hold together, from the first photograph to the final printed piece.",
    },
    founder: "Gunder Rollufson",
    capabilities: [
      { no: "Fotografi", en: "Photography" },
      { no: "Art direction", en: "Art direction" },
      { no: "Visuell identitet", en: "Visual identity" },
      { no: "Grafisk design", en: "Graphic design" },
      { no: "Trykk & emballasje", en: "Print & packaging" },
    ],
    website: practiceWebsite(process.env.NEXT_PUBLIC_ISO400_URL),
    contactHref: "/contact?practice=iso400",
  },
  {
    id: "35mm",
    name: "35mm",
    number: "02",
    discipline: { no: "Film & VFX", en: "Film & VFX" },
    description: {
      no: "Fra første bildeidé til siste klipp. Film, bevegelse og visuelle effekter med kontroll på hver detalj.",
      en: "From the first frame imagined to the final cut. Film, motion and visual effects, with attention to every detail.",
    },
    founder: "Khamzat Dudaev",
    capabilities: [
      { no: "Film & regi", en: "Film & direction" },
      { no: "VFX & CGI", en: "VFX & CGI" },
      { no: "Motion design", en: "Motion design" },
      { no: "Klipp & farge", en: "Editing & colour" },
      { no: "Postproduksjon", en: "Post-production" },
    ],
    website: practiceWebsite(process.env.NEXT_PUBLIC_35MM_URL),
    contactHref: "/contact?practice=35mm",
  },
  {
    id: "nyfane",
    name: "Nyfane",
    number: "03",
    discipline: { no: "Teknologi", en: "Technology" },
    description: {
      no: "Ideer du kan bruke. Nettsider, digitale produkter og interaktive opplevelser, formet gjennom design og kode.",
      en: "Ideas you can use. Websites, digital products and interactive experiences, shaped through design and code.",
    },
    founder: "Rasul Uzdijev",
    capabilities: [
      { no: "Nettsider", en: "Websites" },
      { no: "Digitale opplevelser", en: "Digital experiences" },
      { no: "Kreativ utvikling", en: "Creative development" },
      { no: "Digitale produkter", en: "Digital products" },
      { no: "Programvare", en: "Software" },
    ],
    website: practiceWebsite(process.env.NEXT_PUBLIC_NYFANE_URL),
    contactHref: "/contact?practice=nyfane",
  },
];

type MediaBase = {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
};

export type ProjectSource = { label: LocalizedText; href?: string };

export type ProjectMedia = MediaBase & (
  | { kind: "image" | "logo"; poster?: never }
  | { kind: "film"; poster: string }
  | { kind: "capture"; poster?: never; destination?: ProjectSource }
);

export type ProjectBlock =
  | { kind: "text"; heading: LocalizedText; body: LocalizedText }
  | { kind: "media"; media: ProjectMedia; caption?: LocalizedText }
  | {
      kind: "pair";
      media: [ProjectMedia, ProjectMedia];
      caption?: LocalizedText;
    }
  | { kind: "quote"; quote: LocalizedText; attribution: LocalizedText; source: ProjectSource };

export type ProjectKind = "commission" | "portfolio-selection" | "studio-study";

export type HouseProject = {
  slug: string;
  title: LocalizedText;
  kind: ProjectKind;
  /** Actual credited creator; separate from discipline relevance below. */
  creatorPractice: ProjectPracticeId;
  client?: LocalizedText;
  status?: "in-development";
  /** Public editorial provenance. Original file paths stay in the asset audit. */
  provenance: LocalizedText;
  year?: number;
  location?: LocalizedText;
  /** Discipline relevance under today's practice model, not historic credits. */
  practices: ProjectPracticeId[];
  disciplines: LocalizedText[];
  summary: LocalizedText;
  description: LocalizedText;
  hero: ProjectMedia;
  mediaBlocks: ProjectBlock[];
  credits: { role: LocalizedText; name: string }[];
  results?: { statement: LocalizedText; source: ProjectSource }[];
  related: string[];
  seo: { title: LocalizedText; description: LocalizedText; image: string };
};

export const projects: HouseProject[] = [
  {
    slug: "burger",
    title: { no: "Høy varme. Eget uttrykk.", en: "High heat. Full flavour." },
    kind: "commission",
    creatorPractice: "syntax",
    client: { no: "Et norsk burgermerke", en: "A Norwegian burger brand" },
    provenance: {
      no: "Kunden er anonymisert. Materialet er produsert av Syntax Studio og vises som arbeidsprøver.",
      en: "The client is anonymised. The material was produced by Syntax Studio and is shown as work samples.",
    },
    location: { no: "Norge", en: "Norway" },
    practices: ["iso400", "35mm"],
    disciplines: [
      { no: "Fotografi", en: "Photography" },
      { no: "Film", en: "Film" },
      { no: "Grafisk design", en: "Graphic design" },
    ],
    summary: {
      no: "Film, produktfoto og kampanjemateriell. Den samme energien, i flere formater.",
      en: "Film, product photography and campaign artwork. The same energy, in different forms.",
    },
    description: {
      no: "Vi ble hentet inn som produksjonspartner for et norsk burgermerke. Oppgaven var å ta energien fra kjøkkenet ut i bildene: varme, tekstur og mat du får lyst på. Film og fotografi ble grunnlaget for materiell til sosiale medier, trykk og digitale flater.",
      en: "A Norwegian burger brand brought us in as a production partner. The idea was to carry the energy of the kitchen into the images: heat, texture and food you want to reach for. Film and photography became the foundation for social, print and digital campaign material.",
    },
    hero: {
      kind: "image",
      src: "/webmat/burgercrop.webp",
      alt: {
        no: "Nærbilde av en cheeseburger med smeltet ost, fotografert for kampanjen.",
        en: "Close-up of a cheeseburger with melted cheese, photographed for the campaign.",
      },
      width: 2528,
      height: 1271,
    },
    mediaBlocks: [
      {
        kind: "pair",
        media: [
          {
            kind: "film",
            src: "/burger/hero-build.mp4",
            poster: "/burger/hero-build-poster.webp",
            alt: {
              no: "Se kampanjefilmen: burgeren blir til",
              en: "Watch the campaign film: building the burger",
            },
            width: 720,
            height: 1280,
          },
          {
            kind: "image",
            src: "/burger/prophoto_vertical.webp",
            alt: {
              no: "En burger settes sammen lag for lag med stekespader og en hånd i sort hanske.",
              en: "A burger being assembled layer by layer with spatulas and a black-gloved hand.",
            },
            width: 1080,
            height: 1620,
          },
        ],
        caption: {
          no: "Bevegelse og stillbilde. To måter å bygge appetitt på.",
          en: "Motion and stills. Two ways to build an appetite.",
        },
      },
      {
        kind: "text",
        heading: { no: "Fra kjøkken til kampanje.", en: "From kitchen to campaign." },
        body: {
          no: "Tette utsnitt og tydelige farger holder produktet i sentrum. Fotografiene lever videre i plakater og kampanjeflater, mens filmene fanger tempoet og detaljene i tilberedningen.",
          en: "Close crops and clear colour keep the product at the centre. The photographs carry through to posters and campaign artwork, while the films capture the pace and detail of preparation.",
        },
      },
      {
        kind: "pair",
        media: [
          {
            kind: "image",
            src: "/burger/p1_5.webp",
            alt: {
              no: "Grønn kampanjeplakat med burger, pommes frites, drikke og teksten «Lunsj deal».",
              en: "Green campaign poster with burger, fries, a drink and the headline “Lunsj deal”.",
            },
            width: 4128,
            height: 6192,
          },
          {
            kind: "image",
            src: "/burger/p3_1.webp",
            alt: {
              no: "Lys turkis kampanjeplakat med glaserte kyllingvinger og teksten «Nyhet».",
              en: "Pale turquoise campaign poster with glazed chicken wings and the headline “Nyhet”.",
            },
            width: 4128,
            height: 6192,
          },
        ],
        caption: {
          no: "Produktfoto og grafisk design for trykk og digitale flater.",
          en: "Product photography and graphic design for print and digital use.",
        },
      },
      {
        kind: "pair",
        media: [
          {
            kind: "film",
            src: "/burger/kitchen-film.mp4",
            poster: "/burger/kitchen-film-poster.webp",
            alt: { no: "Se filmen fra kjøkkenet", en: "Watch the kitchen film" },
            width: 720,
            height: 1280,
          },
          {
            kind: "image",
            src: "/burger/chicken-fries.webp",
            alt: {
              no: "Lys gul kampanjeplakat med pommes frites, kylling, dressing og vårløk.",
              en: "Pale yellow campaign poster with loaded fries, chicken, dressing and spring onions.",
            },
            width: 4128,
            height: 6192,
          },
        ],
        caption: {
          no: "En felles visuell retning, fra den første opptaksdagen til ferdig materiell.",
          en: "One visual direction, from the first shoot to finished artwork.",
        },
      },
    ],
    credits: [{ role: { no: "Produksjon", en: "Production" }, name: "Syntax Studio" }],
    related: ["snatched"],
    seo: {
      title: {
        no: "Burgerkampanje — foto, film og grafisk design",
        en: "Burger campaign — photography, film and graphic design",
      },
      description: {
        no: "En visuell kampanje for et anonymisert norsk burgermerke. Produktfoto, film og grafisk materiell produsert av Syntax Studio.",
        en: "A visual campaign for an anonymised Norwegian burger brand. Product photography, film and graphic material produced by Syntax Studio.",
      },
      image: "/webmat/burgercrop.webp",
    },
  },
  {
    slug: "snatched",
    title: { no: "Størrelse, gjort synlig.", en: "Making scale visible." },
    kind: "commission",
    creatorPractice: "syntax",
    client: { no: "Snatched", en: "Snatched" },
    provenance: {
      no: "Prosjektomtalen beskriver Syntax Studios pitchfilm for Snatched. Filmen vises ikke her; kundens logo følger omtalen.",
      en: "This account describes Syntax Studio’s pitch film for Snatched. The film is not shown here; the client’s logo accompanies the story.",
    },
    practices: ["35mm"],
    disciplines: [
      { no: "3D-modellering", en: "3D modelling" },
      { no: "Motion design", en: "Motion design" },
      { no: "Pitchfilm", en: "Pitch film" },
    ],
    summary: {
      no: "En pitchfilm der salgstall tar fysisk form gjennom 3D og animert infografikk.",
      en: "A pitch film that gives sales figures physical form through 3D and animated infographics.",
    },
    description: {
      no: "Snatched trengte en film til en investorpresentasjon. Oppgaven var å gjøre omfanget av virksomheten forståelig på få minutter. Vi tok utgangspunkt i noe konkret: et lager som fylles opp med esker, paller og pakker.",
      en: "Snatched needed a film for an investor presentation. The task was to make the scale of the business understandable in a few minutes. We started with something tangible: a warehouse filling with boxes, pallets and packages.",
    },
    hero: {
      kind: "logo",
      src: "/logos/Snatched.svg",
      alt: { no: "Snatched", en: "Snatched" },
      width: 2878,
      height: 360,
    },
    mediaBlocks: [
      {
        kind: "text",
        heading: { no: "Tall som tar plass.", en: "Numbers that take up space." },
        body: {
          no: "3D-modellerte esker og paller bygger seg opp i takt med tallene. Animert infografikk knytter bildene til historien. Filmens idé er enkel: se størrelsen, i stedet for bare å lese den.",
          en: "3D-modelled boxes and pallets build up alongside the figures. Animated infographics connect the images to the story. The idea is simple: see the scale, rather than only reading it.",
        },
      },
      {
        kind: "text",
        heading: { no: "En presis fortelling.", en: "A precise narrative." },
        body: {
          no: "Arbeidet omfattet konsept og manus, 3D-modellering, motion graphics, fargearbeid og lyddesign. Gjennom tett dialog og flere revisjoner med Snatched ble hver scene tilpasset den ferdige presentasjonen.",
          en: "The work covered concept and scripting, 3D modelling, motion graphics, colour and sound design. Close dialogue and several rounds of revisions with Snatched shaped every scene for the finished presentation.",
        },
      },
    ],
    credits: [{ role: { no: "Produksjon", en: "Production" }, name: "Syntax Studio" }],
    related: ["burger"],
    seo: {
      title: {
        no: "Snatched — pitchfilm med 3D og motion design",
        en: "Snatched — pitch film with 3D and motion design",
      },
      description: {
        no: "Syntax Studio laget en pitchfilm for Snatched med et 3D-modellert lager og animert infografikk som gjør virksomhetens størrelse synlig.",
        en: "Syntax Studio created a pitch film for Snatched with a 3D-modelled warehouse and animated infographics to make the scale of the business visible.",
      },
      // A real studio image, until an approved frame from the film is supplied.
      image: "/logos/syntax-studio-logo.png",
    },
  },
  {
    slug: "iso400-street-portraits",
    title: { no: "Street portraits", en: "Street portraits" },
    kind: "portfolio-selection",
    creatorPractice: "iso400",
    practices: ["iso400"],
    disciplines: [{ no: "Portrettfotografi", en: "Portrait photography" }],
    summary: {
      no: "To portretter. Små skift i blikk, lys og avstand.",
      en: "Two portraits. Small shifts in gaze, light and distance.",
    },
    description: {
      no: "Et bildeutvalg fra ISO400. De to fotografiene lar ansiktet tre frem mot gatens myke bakgrunn. Et sidestilt blikk i det første bildet møter et direkte blikk i det neste.",
      en: "A photographic selection from ISO400. The two photographs bring a face forward against the street’s soft background. A gaze to one side in the first image meets a direct gaze in the next.",
    },
    provenance: {
      no: "Bilder fra ISO400s portefølje, presentert som et bildestudium.",
      en: "Photographs from ISO400’s portfolio, presented as an image study.",
    },
    hero: {
      kind: "image",
      src: "/work/iso400/street-portrait-01.webp",
      alt: {
        no: "Portrett av en mann med solbriller og grønn jakke, med blikket til siden foran en uskarp gatebakgrunn.",
        en: "Portrait of a man in sunglasses and a green jacket, looking to one side against a softly blurred street.",
      },
      width: 1600,
      height: 2400,
    },
    mediaBlocks: [
      {
        kind: "media",
        media: {
          kind: "image",
          src: "/work/iso400/street-portrait-02.webp",
          alt: {
            no: "Portrett av den samme mannen med solbriller og åpen grønn jakke, vendt rett mot kameraet.",
            en: "Portrait of the same man in sunglasses and an open green jacket, facing the camera directly.",
          },
          width: 1600,
          height: 2400,
        },
        caption: {
          no: "Street portraits — det andre bildet i utvalget.",
          en: "Street portraits — the second image in the selection.",
        },
      },
    ],
    credits: [{ role: { no: "Fotografi", en: "Photography" }, name: "ISO400" }],
    related: ["burger", "nyfane-website-study"],
    seo: {
      title: { no: "Street portraits — et bildestudium fra ISO400", en: "Street portraits — an image study by ISO400" },
      description: {
        no: "To portretter fra ISO400s portefølje. Et fotografisk bildestudium presentert av Syntax Studio.",
        en: "Two portraits from ISO400’s portfolio. A photographic image study presented by Syntax Studio.",
      },
      image: "/work/iso400/street-portrait-01.webp",
    },
  },
  {
    slug: "nyfane-website-study",
    title: { no: "Nyfane — nettsidestudium", en: "Nyfane — website study" },
    kind: "studio-study",
    creatorPractice: "nyfane",
    status: "in-development",
    practices: ["nyfane"],
    disciplines: [
      { no: "Digital design", en: "Digital design" },
      { no: "Kreativ utvikling", en: "Creative development" },
      { no: "Interaksjonsdesign", en: "Interaction design" },
    ],
    summary: {
      no: "Nyfanes egen nettside. Et egeninitiert arbeid med grensesnitt, bevegelse og systemer du kan bruke.",
      en: "Nyfane’s own website. A self-initiated study of interfaces, motion and usable systems.",
    },
    description: {
      no: "Nyfanes nettside under utvikling er et sted å vise hvordan teknologipraksisen tenker. Typografi, faner og en interaktiv demonstrasjon gir form til ideen om å se en digital tjeneste fra flere sider.",
      en: "Nyfane’s website in development is a place to show how the technology practice thinks. Typography, tabs and an interactive demonstration give form to the idea of seeing a digital service from different sides.",
    },
    provenance: {
      no: "Skjermbildet viser Nyfanes egen nettside under utvikling. Dette er et egeninitiert studioprosjekt.",
      en: "The capture shows Nyfane’s own website in development. This is a self-initiated studio project.",
    },
    hero: {
      kind: "capture",
      src: "/work/nyfane/website-study.webp",
      alt: {
        no: "Skjermbilde av Nyfanes nettside med plommefarget bakgrunn, korallfargede knapper og lagdelte faner for en digital tjeneste.",
        en: "Capture of Nyfane’s website with a plum background, coral buttons and layered tabs for a digital service.",
      },
      width: 1666,
      height: 734,
    },
    mediaBlocks: [
      {
        kind: "text",
        heading: { no: "Et grensesnitt med flere sider.", en: "An interface with more than one side." },
        body: {
          no: "Fanene skiller mellom kundens opplevelse og teamets arbeidsflate. Demonstrasjonen er laget for å utforskes. Den viser en tenkt arbeidsflyt som del av Nyfanes egen presentasjon.",
          en: "The tabs distinguish the customer’s experience from the team’s workspace. The demonstration is made to be explored. It shows an illustrative workflow as part of Nyfane’s own presentation.",
        },
      },
    ],
    credits: [{ role: { no: "Design & utvikling", en: "Design & development" }, name: "Nyfane" }],
    related: ["iso400-street-portraits", "burger"],
    seo: {
      title: { no: "Nyfane — egeninitiert nettsidestudium", en: "Nyfane — self-initiated website study" },
      description: {
        no: "Et innblikk i Nyfanes egen nettside under utvikling. Et egeninitiert studioprosjekt innen digital design, interaksjon og kreativ utvikling.",
        en: "A look at Nyfane’s own website in development. A self-initiated studio project in digital design, interaction and creative development.",
      },
      image: "/work/nyfane/website-study.webp",
    },
  },
];

/** Safe image source for index thumbnails, related work and social previews. */
export function getMediaPreview(media: ProjectMedia): string {
  return media.kind === "film" ? media.poster : media.src;
}

export function getProjectDisplayName(project: HouseProject, locale: string): string {
  return localText(project.client ?? project.title, locale);
}

export function getProjectKindLabel(project: HouseProject, locale: string): string {
  const labels: Record<ProjectKind, LocalizedText> = {
    commission: { no: "Oppdrag", en: "Commission" },
    "portfolio-selection": { no: "Bildestudium", en: "Image study" },
    "studio-study": { no: "Egeninitiert studioprosjekt", en: "Self-initiated studio project" },
  };
  return localText(labels[project.kind], locale);
}

export function getProjectCreator(project: HouseProject): {
  name: string; contactHref: string; website: string | null;
} {
  const practice = getPractice(project.creatorPractice);
  return practice ?? { name: "Syntax Studio", contactHref: "/contact", website: null };
}

export function getProject(slug: string): HouseProject | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getPractice(id: string): Practice | undefined {
  return practices.find((practice) => practice.id === id);
}
