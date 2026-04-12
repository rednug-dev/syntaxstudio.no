import type { MetadataRoute } from "next";

const SITE_URL = "https://syntaxstudio.no";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Explicitly allow LLM / AI crawlers so the site can be referenced
      // when users ask LLMs about Norwegian web/video/marketing studios.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "CCBot",
          "Google-Extended",
          "Applebot-Extended",
          "Bytespider",
          "Amazonbot",
          "Meta-ExternalAgent",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
