"use client";

interface MarqueeStripProps {
  items?: string[];
  dark?: boolean;
  speed?: "normal" | "slow";
}

const defaultItems = [
  "Brand Strategy",
  "Web Design",
  "Digital Marketing",
  "Content Creation",
  "Performance Analytics",
  "Creative Direction",
  "Growth Marketing",
  "UI / UX Design",
];

export default function MarqueeStrip({
  items = defaultItems,
  dark = false,
  speed = "normal",
}: MarqueeStripProps) {
  // duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden border-y py-4 ${
        dark
          ? "bg-white border-[#3D3222]"
          : "bg-white border-[#0A0A0F]/8"
      }`}
    >
      <div
        className={`flex gap-0 whitespace-nowrap ${
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-6 px-6 text-label ${
              dark ? "text-[#8B7E6E]" : "text-[#0A0A0F]/45"
            }`}
          >
            {item}
            <span className={`inline-block w-1 h-1 rounded-full ${dark ? "bg-[#4D4232]" : "bg-[#D4CAB8]"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
