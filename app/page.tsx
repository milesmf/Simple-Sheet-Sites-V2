import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
        Simple Sheet Sites
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
        Multi-page business websites driven by Google Sheets
      </h1>
      <p className="mt-4 max-w-2xl text-base text-slate-600">
        Create a new site via the admin API, connect a Google Sheet, and publish
        a complete multi-page website in minutes.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/s/demo"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
        >
          View demo site
        </Link>
        <Link
          href="https://developers.google.com/sheets/api"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
        >
          Sheets API docs
        </Link>
      </div>
    </main>
  );
}