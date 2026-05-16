import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFE6] px-6">
      <div className="text-center max-w-md">
        <div className="font-heading text-[120px] font-bold text-[#D64545]/20 leading-none mb-4">
          404
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-[#1C1C1C]/45 leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#D64545] text-white font-semibold  hover:bg-[#8B3232] transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
