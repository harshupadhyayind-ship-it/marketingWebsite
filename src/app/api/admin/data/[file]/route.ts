import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";

const AUTH_COOKIE = "admin_auth";
const DATA_DIR = path.join(process.cwd(), "src", "data");
const ALLOWED_FILES = ["projects", "services", "settings", "about", "homepage"];

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "1";
}

export async function GET(
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
  const content = await fs.readFile(path.join(DATA_DIR, `${file}.json`), "utf8");
  return NextResponse.json(JSON.parse(content));
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
  const body = await req.json();
  await fs.writeFile(
    path.join(DATA_DIR, `${file}.json`),
    JSON.stringify(body, null, 2),
    "utf8"
  );
  return NextResponse.json({ ok: true });
}
