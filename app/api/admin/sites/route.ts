import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin";
import { refreshSnapshot } from "@/lib/snapshot";

const CreateSiteSchema = z.object({
  slug: z.string().min(2),
  sheetId: z.string().min(1)
});

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = CreateSiteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.site.findUnique({
    where: { slug: parsed.data.slug }
  });

  if (existing) {
    return NextResponse.json(
      { error: "Slug already exists" },
      { status: 409 }
    );
  }

  const site = await prisma.site.create({
    data: {
      slug: parsed.data.slug,
      sheetId: parsed.data.sheetId
    }
  });

  const snapshot = await refreshSnapshot(site);

  return NextResponse.json({
    site,
    snapshotStatus: snapshot.content ? "ready" : "error",
    error: snapshot.error
  });
}