import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";
import aboutData from "@/data/about.json";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind BRANDD-AID — a premium marketing agency founded on the belief that great marketing feels like art.",
};

export default function AboutPage() {
  return <AboutPageContent data={aboutData} />;
}
