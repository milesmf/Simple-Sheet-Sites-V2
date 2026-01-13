import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin";
import { refreshSnapshot } from "@/lib/snapshot";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const site = await prisma.site.findUnique({ where: { slug: params.slug } });

  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const result = await refreshSnapshot(site);

  return NextResponse.json({
    status: result.content ? "refreshed" : "error",
    error: result.error
  });
}