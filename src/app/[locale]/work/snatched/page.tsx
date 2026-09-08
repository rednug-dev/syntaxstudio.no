import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProjectStory, { projectMetadata } from "@/components/house/project-story";
import { getProject } from "@/lib/house-content";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const project = getProject("snatched");
  return project ? projectMetadata(project, locale) : {};
}

export default async function SnatchedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const project = getProject("snatched");
  if (!project) notFound();
  return (
    <>
      <Header />
      <ProjectStory project={project} locale={locale} />
      <Footer />
    </>
  );
}
