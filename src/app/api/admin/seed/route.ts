import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setContent } from "@/lib/content";
import homepageJson from "@/data/homepage.json";
import servicesJson from "@/data/services.json";
import aboutJson from "@/data/about.json";
import settingsJson from "@/data/settings.json";
import projectsJson from "@/data/projects.json";

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "1";
}

export async function POST() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await setContent("homepage", homepageJson);
    await setContent("services", { items: servicesJson });
    await setContent("about", aboutJson);
    await setContent("settings", settingsJson);
    await setContent("projects", { items: projectsJson });

    return NextResponse.json({
      ok: true,
      seeded: ["homepage", "services", "about", "settings", "projects"],
    });
  } catch (err) {
    console.error("[seed] error:", err);
    return NextResponse.json({ error: "Seed failed — check MONGODB_URI" }, { status: 500 });
  }
}
