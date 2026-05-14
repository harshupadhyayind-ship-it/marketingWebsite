import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore BRANDD-AID's full suite of marketing services: brand strategy, web design, digital marketing, content creation, and more.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
