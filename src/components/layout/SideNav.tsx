"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// anchor: "" = top of home, string = section id, href: page route for dedicated pages
const NAV_ITEMS = [
  { label: "Home",     anchor: "",         href: "/"       },
  { label: "Services", anchor: "services", href: ""        },
  { label: "Work",     anchor: "work",     href: ""        },
  { label: "About",    anchor: "about",     href: ""        },
  { label: "Contact",  anchor: "contact",  href: ""        },
];

export default function SideNav() {
  const [active, setActive] = useState("");
  const router = useRouter();

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.anchor).filter(Boolean);

    const onScroll = () => {
      // If near the very top, highlight Home
      if (window.scrollY < window.innerHeight * 0.5) {
        setActive("");
        return;
      }

      // Find the section whose top edge is closest to (but above) 30% down the viewport
      const trigger = window.innerHeight * 0.3;
      let current = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= trigger) current = id;
      }

      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount so initial state is correct
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (anchor: string, href: string) => {
    // Dedicated page
    if (href && href !== "/") {
      router.push(href);
      return;
    }
    // Home top
    if (!anchor) {
      if (window.location.pathname !== "/") { router.push("/"); return; }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Anchor section — navigate home first if needed
    if (window.location.pathname !== "/") {
      router.push(`/#${anchor}`);
      return;
    }
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-4 select-none">
      {NAV_ITEMS.map(({ label, anchor, href }) => {
        const isActive =
          label === "Home" ? active === "" :
          active === anchor;

        return (
          <button
            key={label}
            onClick={() => handleClick(anchor, href)}
            className="group flex items-center gap-2.5 cursor-pointer"
            aria-label={`Go to ${label}`}
          >
            {/* Label */}
            <span
              className="text-[9px] font-mono uppercase tracking-[0.22em] transition-all duration-300"
              style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.35)" }}
            >
              {label}
            </span>

            {/* Line + dot */}
            <span className="flex items-center gap-1">
              <span
                className="block h-px transition-all duration-300 rounded-full"
                style={{
                  width: isActive ? 20 : 10,
                  background: isActive ? "#D64545" : "rgba(255,255,255,0.25)",
                }}
              />
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width:  isActive ? 6 : 4,
                  height: isActive ? 6 : 4,
                  background: isActive ? "#D64545" : "rgba(255,255,255,0.25)",
                  boxShadow: isActive ? "0 0 6px rgba(214,69,69,0.7)" : "none",
                }}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
