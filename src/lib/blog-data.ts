/**
 * Blog posts. Norwegian only. Each entry produces a /no/blog/[slug] route.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title?: string; body: string }
  | { type: "table"; headers: string[]; rows: string[][] };

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
  {
    slug: "velkommen-til-bloggen",
    title: "Velkommen til bloggen",
    excerpt:
      "Vi starter en blogg for å dele hvordan vi tenker om webdesign, utvikling og det å drive byrå i Norge.",
    publishedAt: "2026-04-14",
    updatedAt: "2026-04-14",
    lead:
      "Vi starter en blogg. Ikke for å pushe SEO-innhold, men for å skrive ned det vi lærer underveis — om webdesign, utvikling, og det å drive byrå i Norge.",
    blocks: [
      { type: "h2", text: "Hvorfor nå?" },
      {
        type: "p",
        text: "Vi har lenge hatt guider på siden, men guider er statiske — de oppdateres sjelden og dekker store temaer. En blogg gir oss et sted å skrive kortere, mer aktuelle ting: hva vi jobber med, hva som fungerer, og hva som ikke gjør det.",
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
      {
        type: "p",
        text: "Mer kommer snart.",
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
