import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import homepageJson from "@/data/homepage.json";

export async function GET() {
  try {
    const data = await getContent("homepage");
    return NextResponse.json(data ?? homepageJson);
  } catch {
    return NextResponse.json(homepageJson);
  }
}
