"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ScrollOverlay from "@/components/ui/ScrollOverlay";

const WorldCanvas = dynamic(() => import("@/components/three/WorldCanvas"), {
  ssr: false,
  loading: () => null,
});

function NavCloseButton() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setNavOpen(document.body.classList.contains("nav-open"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!navOpen) return null;

  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("navClose"))}
      className="absolute top-6 left-6 z-50 text-[#1C1C1C] hover:text-[#D64545] transition-colors duration-200 cursor-pointer"
      style={{ fontSize: "2.5rem", lineHeight: 1, fontWeight: 300 }}
      aria-label="Close menu"
    >
      ×
    </button>
  );
}

export default function ImmersiveHome() {
  return (
    <div id="scroll-container" style={{ height: "800vh" }}>
      <div
        className="sticky top-0 overflow-hidden relative"
        style={{ height: "100vh", background: "#F5EFE6" }}
      >
        <WorldCanvas />
        <ScrollOverlay />
        <NavCloseButton />
      </div>
    </div>
  );
}
