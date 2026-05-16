import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PAGE_SIZE = 10;

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "1";
}

export async function GET(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const page   = Math.max(1, parseInt(searchParams.get("page")   ?? "1", 10));
    const status = searchParams.get("status") ?? "all";
    const counts = searchParams.get("counts") === "1";

    const client = await clientPromise;
    const db = client.db("branddaid");
    const col = db.collection("leads");

    // counts-only request (for the summary bar)
    if (counts) {
      const [all, newC, contacted, converted, archived] = await Promise.all([
        col.countDocuments({}),
        col.countDocuments({ status: "new" }),
        col.countDocuments({ status: "contacted" }),
        col.countDocuments({ status: "converted" }),
        col.countDocuments({ status: "archived" }),
      ]);
      return NextResponse.json({ all, new: newC, contacted, converted, archived });
    }

    const filter = status === "all" ? {} : { status };
    const total  = await col.countDocuments(filter);
    const leads  = await col
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .toArray();

    const serialized = leads.map((l) => ({ ...l, _id: l._id.toString() }));
    return NextResponse.json({
      leads: serialized,
      page,
      hasMore: page * PAGE_SIZE < total,
      total,
    });
  } catch (err) {
    console.error("[admin/leads] GET error:", err);
    return NextResponse.json({ leads: [], page: 1, hasMore: false, total: 0 });
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
