import type { Metadata } from "next";
import ImmersiveHome from "@/components/sections/ImmersiveHome";
import SinglePageSections from "@/components/sections/SinglePageSections";
import servicesData from "@/data/services.json";
import aboutData from "@/data/about.json";
import settingsData from "@/data/settings.json";

export const metadata: Metadata = {
  title: "BRANDD-AID — Premium Marketing Agency",
  description:
    "BRANDD-AID is a premium marketing agency delivering cinematic brand experiences, growth strategies, and digital presence that commands attention.",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomePage() {
  return (
    <>
      <ImmersiveHome />
      <SinglePageSections
        services={servicesData as any}
        about={aboutData as any}
        settings={settingsData as any}
      />
    </>
  );
}
