"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ScrollOverlay, { type HomepageData } from "@/components/ui/ScrollOverlay";

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
      className="absolute top-6 left-6 z-50 text-white hover:text-[#D64545] transition-colors duration-200 cursor-pointer"
      style={{ fontSize: "2.5rem", lineHeight: 1, fontWeight: 300 }}
      aria-label="Close menu"
    >
      ×
    </button>
  );
}

export default function ImmersiveHome({ data }: { data: HomepageData }) {
  return (
    <div id="scroll-container" style={{ height: "800vh" }}>
      <div
        className="sticky top-0 overflow-hidden relative"
        style={{ height: "100vh", background: "#0D0F1C" }}
      >
        {/* Floating orbs — HTML reference design */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Orb 1 — red, top-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: 520, height: 520,
              right: "8%", top: "8%",
              background: "radial-gradient(circle, rgba(214,69,69,0.22) 0%, transparent 70%)",
              filter: "blur(80px)",
              animation: "orbFloat 8s ease-in-out infinite",
            }}
          />
          {/* Orb 2 — purple, center-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: 360, height: 360,
              right: "28%", bottom: "18%",
              background: "radial-gradient(circle, rgba(107,78,255,0.18) 0%, transparent 70%)",
              filter: "blur(80px)",
              animation: "orbFloat 8s ease-in-out infinite",
              animationDelay: "-3s",
            }}
          />
          {/* Orb 3 — red dim, left */}
          <div
            className="absolute rounded-full"
            style={{
              width: 220, height: 220,
              left: "4%", top: "38%",
              background: "radial-gradient(circle, rgba(214,69,69,0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
              animation: "orbFloat 8s ease-in-out infinite",
              animationDelay: "-5s",
            }}
          />
        </div>

        <style>{`
          @keyframes orbFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-28px) scale(1.04); }
          }
        `}</style>

        <WorldCanvas />
        <ScrollOverlay data={data} />
        <NavCloseButton />
      </div>
    </div>
  );
}
