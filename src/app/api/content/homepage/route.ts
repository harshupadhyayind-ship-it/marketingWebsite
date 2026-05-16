import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import homepageJson from "@/data/homepage.json";

// Never cache — always serve fresh MongoDB data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await getContent("homepage");
    return NextResponse.json(data ?? homepageJson, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch {
    return NextResponse.json(homepageJson, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  }
}
