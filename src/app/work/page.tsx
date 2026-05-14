import type { Metadata } from "next";
import WorkPageContent from "./WorkPageContent";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies from BRANDD-AID — brand strategy, web design, digital campaigns, and growth projects that delivered measurable results.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
