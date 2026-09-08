import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProjectStory, { projectMetadata } from "@/components/house/project-story";
import { getProject, projects } from "@/lib/house-content";
import { routing } from "@/i18n/routing";

// Existing commissioned cases and the Tokyo holding page keep their own routes.
const dedicatedSlugs = new Set(["burger", "snatched", "tokyo"]);

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => !dedicatedSlugs.has(project.slug))
    .flatMap((project) => routing.locales.map((locale) => ({ locale, slug: project.slug })));
}

type ProjectPageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return projectMetadata(project, locale);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <>
    <Header />
    <ProjectStory project={project} locale={locale} />
    <Footer />
  </>;
}
