import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import SiteChrome from "@/components/layout/SiteChrome";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  title: {
    default: "BRANDD-AID — Marketing That Elevates",
    template: "%s | BRANDD-AID",
  },
  description:
    "BRANDD-AID is a premium marketing agency delivering cinematic brand experiences, high-impact campaigns, and digital presence that commands attention.",
  keywords: ["marketing agency", "brand strategy", "digital marketing", "web design", "growth"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://branddaid.com",
    siteName: "BRANDD-AID",
    title: "BRANDD-AID — Marketing Agency",
    description:
      "Premium marketing agency delivering cinematic brand experiences and high-impact campaigns.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRANDD-AID — Marketing Agency",
    description: "Premium marketing agency delivering cinematic brand experiences.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased ">
        <SiteChrome>
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
        </SiteChrome>
      </body>
    </html>
  );
}
