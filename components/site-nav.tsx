"use client";

import Link from "next/link";
import { useState } from "react";
import type { SiteSettings } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-provider";

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

export const SiteNav = ({ slug, settings }: SiteNavProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border-primary">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <Link
            href={`/s/${slug}`}
            className="flex items-center gap-3 group"
          >
            {settings.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.logoUrl}
                alt={`${settings.businessName} logo`}
                className="h-10 w-10 md:h-12 md:w-12 rounded-xl object-contain shadow-sm transition-transform group-hover:scale-105"
              />
            ) : (
              <div
                className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl text-lg md:text-xl font-bold text-white shadow-sm transition-transform group-hover:scale-105"
                style={{ backgroundColor: settings.accentColor }}
              >
                {settings.businessName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="hidden sm:block">
              <p className="text-base md:text-lg font-semibold text-text-primary transition-colors">
                {settings.businessName}
              </p>
              <p className="text-xs md:text-sm text-text-muted">
                Local service experts
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={`/s/${slug}${item.path}`}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href={settings.primaryCtaLink}
              className="hidden sm:inline-flex btn btn-primary"
              style={{ backgroundColor: settings.accentColor }}
            >
              {settings.primaryCtaText}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden theme-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-primary mobile-menu">
          <nav className="container-wide py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={`/s/${slug}${item.path}`}
                className="nav-link py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={settings.primaryCtaLink}
              className="btn btn-primary mt-4 w-full"
              style={{ backgroundColor: settings.accentColor }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {settings.primaryCtaText}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
