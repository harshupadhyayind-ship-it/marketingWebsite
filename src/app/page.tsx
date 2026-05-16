import type { Metadata } from "next";
import ImmersiveHome from "@/components/sections/ImmersiveHome";
import SinglePageSections from "@/components/sections/SinglePageSections";
import { getContent } from "@/lib/content";
import servicesJson from "@/data/services.json";
import aboutJson from "@/data/about.json";
import settingsJson from "@/data/settings.json";
import projectsJson from "@/data/projects.json";

export const metadata: Metadata = {
  title: "BRANDD-AID — Premium Marketing Agency",
  description:
    "BRANDD-AID is a premium marketing agency delivering cinematic brand experiences, growth strategies, and digital presence that commands attention.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [servicesRaw, about, settings, projectsRaw] = await Promise.all([
    getContent("services").catch(() => null),
    getContent("about").catch(() => null),
    getContent("settings").catch(() => null),
    getContent("projects").catch(() => null),
  ]);

  const services = (servicesRaw as any)?.items ?? servicesJson;
  const projects = (projectsRaw as any)?.items ?? projectsJson;

  return (
    <>
      <ImmersiveHome />
      <SinglePageSections
        services={services as any}
        about={(about ?? aboutJson) as any}
        settings={(settings ?? settingsJson) as any}
        projects={projects as any}
      />
    </>
  );
}
