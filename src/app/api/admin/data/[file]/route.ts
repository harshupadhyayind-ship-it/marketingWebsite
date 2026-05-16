import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, setContent } from "@/lib/content";
import homepageJson from "@/data/homepage.json";
import aboutJson from "@/data/about.json";
import settingsJson from "@/data/settings.json";
import projectsJson from "@/data/projects.json";
import servicesJson from "@/data/services.json";

const AUTH_COOKIE = "admin_auth";
const ALLOWED_FILES = ["projects", "services", "settings", "about", "homepage"];
// These keys store their data wrapped as { items: [...] }
const ARRAY_KEYS = ["projects", "services"];

const JSON_FALLBACKS: Record<string, unknown> = {
  homepage: homepageJson,
  about: aboutJson,
  settings: settingsJson,
  projects: projectsJson,
  services: servicesJson,
};

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "1";
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { file } = await params;
  if (!ALLOWED_FILES.includes(file)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const data = await getContent(file);
    if (!data) {
      // Nothing seeded yet — return JSON fallback
      const fallback = JSON_FALLBACKS[file];
      if (ARRAY_KEYS.includes(file)) return NextResponse.json(Array.isArray(fallback) ? fallback : []);
      return NextResponse.json(fallback ?? {});
    }

    // Strip the items wrapper for array keys so admin UI gets plain arrays
    if (ARRAY_KEYS.includes(file)) {
      return NextResponse.json((data as any).items ?? []);
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(`[admin/data/${file}] GET error:`, err);
    // Fall back to JSON files so the admin UI stays usable
    const fallback = JSON_FALLBACKS[file];
    if (ARRAY_KEYS.includes(file)) return NextResponse.json(Array.isArray(fallback) ? fallback : []);
    return NextResponse.json(fallback ?? {});
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { file } = await params;
  if (!ALLOWED_FILES.includes(file)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = await req.json();

    // Wrap arrays back into { items: [...] } for storage
    if (ARRAY_KEYS.includes(file)) {
      await setContent(file, { items: body });
    } else {
      await setContent(file, body);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[admin/data/${file}] POST error:`, err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
