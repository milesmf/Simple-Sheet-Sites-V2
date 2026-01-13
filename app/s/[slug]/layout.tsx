import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getSiteSnapshot } from "@/lib/snapshot";

export default async function SiteLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const snapshot = await getSiteSnapshot(params.slug);

  if (!snapshot?.content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            Site is provisioning
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            We are fetching content from Google Sheets. Please refresh in a
            minute or check that the sheet ID is correct and shared with the
            service account.
          </p>
          {snapshot?.error && (
            <p className="mt-4 text-xs text-rose-500">{snapshot.error}</p>
          )}
        </div>
      </div>
    );
  }

  const { settings, hours } = snapshot.content;

  return (
    <div
      className="flex min-h-screen flex-col bg-slate-50"
      style={{
        ["--accent-color" as string]: settings.accentColor
      }}
    >
      <SiteNav slug={params.slug} settings={settings} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} hours={hours} />
    </div>
  );
}