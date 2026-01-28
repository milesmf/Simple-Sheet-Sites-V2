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
      <div
        className="flex min-h-screen items-center justify-center px-6"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className="card max-w-md p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-text-muted animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-text-primary">
            Site is provisioning
          </h1>
          <p className="mt-3 text-sm text-text-secondary">
            We are fetching content from Google Sheets. Please refresh in a
            minute or check that the sheet ID is correct and shared with the
            service account.
          </p>
          {snapshot?.error && (
            <div className="mt-6 p-4 rounded-lg bg-bg-tertiary">
              <p className="text-xs text-red-500 font-mono">{snapshot.error}</p>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary mt-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh page
          </button>
        </div>
      </div>
    );
  }

  const { settings, hours } = snapshot.content;

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        ["--accent-color" as string]: settings.accentColor,
        backgroundColor: "var(--color-bg-secondary)"
      }}
    >
      <SiteNav slug={params.slug} settings={settings} />
      <main className="flex-1 page-transition">{children}</main>
      <SiteFooter settings={settings} hours={hours} />
    </div>
  );
}
