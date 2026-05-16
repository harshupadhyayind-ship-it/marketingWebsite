import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { password } = await req.json();
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "branddaid2025";
  if (password === ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_auth", "1", { httpOnly: true, maxAge: 86400 * 7, path: "/" });
    return res;
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
