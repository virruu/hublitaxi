import { NextResponse } from "next/server";
import { z } from "zod";
import { updateReviewStatus } from "@/lib/reviews/store";
import { isAdminRequest } from "@/lib/reviews/admin-auth";

const bodySchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) {
    return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const ok = await updateReviewStatus(id, parsed.data.status);
  if (!ok) {
    return NextResponse.json({ error: "Could not update review" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
