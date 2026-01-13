import Link from "next/link";
import type { SiteSettings } from "@/lib/content";

const navItems = [
  { label: "Home", path: "" },
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" }
];

type SiteNavProps = {
  slug: string;
  settings: SiteSettings;
};

export const SiteNav = ({ slug, settings }: SiteNavProps) => (
  <header className="border-b border-slate-200 bg-white">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <Link href={`/s/${slug}`} className="flex items-center gap-3">
        {settings.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={settings.logoUrl}
            alt={`${settings.businessName} logo`}
            className="h-10 w-10 rounded-full object-contain"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-700">
            {settings.businessName.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {settings.businessName}
          </p>
          <p className="text-sm text-slate-500">Local service experts</p>
        </div>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={`/s/${slug}${item.path}`}
            className="transition hover:text-slate-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        href={settings.primaryCtaLink}
        className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm"
        style={{ backgroundColor: settings.accentColor }}
      >
        {settings.primaryCtaText}
      </Link>
    </div>
    <nav className="flex flex-wrap items-center justify-center gap-4 border-t border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 md:hidden">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={`/s/${slug}${item.path}`}
          className="transition hover:text-slate-900"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  </header>
);