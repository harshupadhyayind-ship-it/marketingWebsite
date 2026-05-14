import type { Metadata } from "next";
import ImmersiveHome from "@/components/sections/ImmersiveHome";

export const metadata: Metadata = {
  title: "BRANDD-AID — Premium Marketing Agency",
  description:
    "BRANDD-AID is a premium marketing agency delivering cinematic brand experiences, growth strategies, and digital presence that commands attention.",
};

export default function HomePage() {
  return <ImmersiveHome />;
}
