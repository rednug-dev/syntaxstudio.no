"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import ProjectsShowcase from "@/components/project-showcase";
import type { Metadata } from "next";


export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ProjectsShowcase />
      </main>
      <Footer />
    </>
  );
}
