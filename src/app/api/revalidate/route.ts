import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export const runtime = "nodejs";

// Called by the admin after a write to refresh cached public pages immediately.
// Only the fixed public tags can be revalidated (no arbitrary cache busting),
// and the action is harmless (it just re-reads published content from Firestore).
const ALLOWED = new Set(["projects", "posts"]);

export async function POST(req: Request) {
  let tags: string[] = [];
  try {
    const body = await req.json();
    if (Array.isArray(body?.tags)) tags = body.tags;
  } catch {
    /* empty / invalid body — nothing to do */
  }

  const valid = tags.filter((t) => ALLOWED.has(t));
  valid.forEach((t) => revalidateTag(t));
  revalidatePath("/");
  revalidatePath("/blog");

  return NextResponse.json({ revalidated: valid });
}
