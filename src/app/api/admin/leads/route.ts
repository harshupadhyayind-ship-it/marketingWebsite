import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "1";
}

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const client = await clientPromise;
    const db = client.db("branddaid");
    const leads = await db
      .collection("leads")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Serialize _id as string
    const serialized = leads.map((l) => ({ ...l, _id: l._id.toString() }));
    return NextResponse.json(serialized);
  } catch (err) {
    console.error("[admin/leads] GET error:", err);
    return NextResponse.json([], { status: 200 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, status } = await req.json();
    const { ObjectId } = await import("mongodb");
    const client = await clientPromise;
    const db = client.db("branddaid");
    await db.collection("leads").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/leads] PATCH error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    const { ObjectId } = await import("mongodb");
    const client = await clientPromise;
    const db = client.db("branddaid");
    await db.collection("leads").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/leads] DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
