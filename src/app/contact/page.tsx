import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with ChronoGrowth. Get in touch to discuss your brand, website, or marketing needs.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
