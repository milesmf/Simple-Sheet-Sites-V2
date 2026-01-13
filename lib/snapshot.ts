import { cache } from "react";
import type { Site, ContentSnapshot } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { fetchSheetContent } from "@/lib/sheets";
import { normalizeContent, type SiteContent } from "@/lib/content";

export type SnapshotResult = {
  site: Site;
  content: SiteContent | null;
  snapshot: ContentSnapshot | null;
  stale: boolean;
  error?: string;
};

type CachedEntry = {
  content: SiteContent;
  snapshot: ContentSnapshot;
  expiresAt: number;
};

const snapshotCache = new Map<string, CachedEntry>();
const refreshLocks = new Map<string, Promise<SnapshotResult>>();

const now = () => new Date();

const buildSnapshot = async (site: Site): Promise<SnapshotResult> => {
  try {
    const raw = await fetchSheetContent(site.sheetId);
    const content = normalizeContent(raw);
    const fetchedAt = now();
    const expiresAt = new Date(
      fetchedAt.getTime() + env.CACHE_TTL_SECONDS * 1000
    );

    const snapshot = await prisma.contentSnapshot.create({
      data: {
        siteId: site.id,
        dataJson: JSON.stringify(content),
        fetchedAt,
        expiresAt
      }
    });

    snapshotCache.set(site.slug, {
      content,
      snapshot,
      expiresAt: expiresAt.getTime()
    });

    return { site, content, snapshot, stale: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { site, content: null, snapshot: null, stale: true, error: message };
  }
};

const loadSnapshotFromDb = async (
  siteId: string
): Promise<ContentSnapshot | null> =>
  prisma.contentSnapshot.findFirst({
    where: { siteId },
    orderBy: { fetchedAt: "desc" }
  });

export const refreshSnapshot = async (site: Site): Promise<SnapshotResult> => {
  const existingLock = refreshLocks.get(site.slug);
  if (existingLock) {
    return existingLock;
  }

  const lock = buildSnapshot(site).finally(() => {
    refreshLocks.delete(site.slug);
  });

  refreshLocks.set(site.slug, lock);
  return lock;
};

export const getSiteSnapshot = cache(async (slug: string): Promise<SnapshotResult | null> => {
  const site = await prisma.site.findUnique({ where: { slug } });
  if (!site) return null;

  const cached = snapshotCache.get(slug);
  if (cached && cached.expiresAt > Date.now()) {
    return {
      site,
      content: cached.content,
      snapshot: cached.snapshot,
      stale: false
    };
  }

  const snapshot = await loadSnapshotFromDb(site.id);
  const isFresh = snapshot ? snapshot.expiresAt.getTime() > Date.now() : false;

  if (snapshot && isFresh) {
    const content = JSON.parse(snapshot.dataJson) as SiteContent;
    snapshotCache.set(slug, {
      content,
      snapshot,
      expiresAt: snapshot.expiresAt.getTime()
    });
    return { site, content, snapshot, stale: false };
  }

  const refresh = await refreshSnapshot(site);

  if (refresh.content) {
    return refresh;
  }

  if (snapshot) {
    const content = JSON.parse(snapshot.dataJson) as SiteContent;
    snapshotCache.set(slug, {
      content,
      snapshot,
      expiresAt: snapshot.expiresAt.getTime()
    });
    return { site, content, snapshot, stale: true, error: refresh.error };
  }

  return { site, content: null, snapshot: null, stale: true, error: refresh.error };
});