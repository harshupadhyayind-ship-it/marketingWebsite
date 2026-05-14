import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <div className="font-heading text-[120px] font-bold text-[#E63327]/20 leading-none mb-4">
          404
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-[#0A0A0F]/45 leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E63327] text-white font-semibold  hover:bg-[#B5261B] transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
