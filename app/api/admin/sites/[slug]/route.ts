import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const site = await prisma.site.findUnique({
    where: { slug: params.slug },
    include: {
      snapshots: {
        orderBy: { fetchedAt: "desc" },
        take: 1
      }
    }
  });

  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const latestSnapshot = site.snapshots[0] ?? null;

  return NextResponse.json({
    site: {
      id: site.id,
      slug: site.slug,
      sheetId: site.sheetId,
      createdAt: site.createdAt,
      updatedAt: site.updatedAt
    },
    snapshot: latestSnapshot
      ? {
          id: latestSnapshot.id,
          fetchedAt: latestSnapshot.fetchedAt,
          expiresAt: latestSnapshot.expiresAt
        }
      : null
  });
}