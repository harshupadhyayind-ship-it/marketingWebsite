import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

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
  title: {
    default: "ChronoGrowth — Marketing Agency",
    template: "%s | ChronoGrowth",
  },
  description:
    "ChronoGrowth is a premium marketing agency delivering cinematic brand experiences, high-impact campaigns, and digital presence that commands attention.",
  keywords: ["marketing agency", "brand strategy", "digital marketing", "web design", "growth"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://chronogrowth.in",
    siteName: "ChronoGrowth",
    title: "ChronoGrowth — Marketing Agency",
    description:
      "Premium marketing agency delivering cinematic brand experiences and high-impact campaigns.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChronoGrowth — Marketing Agency",
    description: "Premium marketing agency delivering cinematic brand experiences.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-beige">
        <Navbar />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
