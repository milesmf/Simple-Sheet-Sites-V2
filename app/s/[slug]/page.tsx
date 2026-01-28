import Link from "next/link";
import { getSiteSnapshot } from "@/lib/snapshot";

export default async function SiteHomePage({
  params
}: {
  params: { slug: string };
}) {
  const snapshot = await getSiteSnapshot(params.slug);

  if (!snapshot?.content) {
    return null;
  }

  const { settings, services, hours, faqs } = snapshot.content;
  const featuredServices = services
    .filter((service) => service.featured)
    .slice(0, 3);
  const heroServices =
    featuredServices.length > 0 ? featuredServices : services.slice(0, 3);

  return (
    <div className="space-y-20 py-12 md:py-16">
      {/* Hero Section */}
      <section className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Hero Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-bg-tertiary text-text-secondary mb-6">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {settings.city}, {settings.state}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
              {settings.heroHeadline}
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              {settings.heroSubheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={settings.primaryCtaLink}
                className="btn btn-primary text-base px-8 py-4"
                style={{ backgroundColor: settings.accentColor }}
              >
                {settings.primaryCtaText}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href={`/s/${params.slug}/services`}
                className="btn btn-secondary text-base px-8 py-4"
              >
                View all services
              </Link>
            </div>
          </div>

          {/* Featured Services Card */}
          <div className="card p-8 lg:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text-primary">
                Featured Services
              </h2>
              <span
                className="badge badge-accent"
                style={{ backgroundColor: settings.accentColor }}
              >
                Popular
              </span>
            </div>
            <div className="space-y-4">
              {heroServices.map((service, index) => (
                <div
                  key={service.name}
                  className="service-card card card-interactive p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-text-primary">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                    {service.price && (
                      <div className="text-right flex-shrink-0">
                        <p
                          className="text-lg font-bold"
                          style={{ color: settings.accentColor }}
                        >
                          {service.price}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={`/s/${params.slug}/services`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: settings.accentColor }}
            >
              See all services
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Hours & Contact Section */}
      <section className="container-wide">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Hours Card */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${settings.accentColor}20` }}
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: settings.accentColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-text-primary">
                Business Hours
              </h2>
            </div>
            <div className="space-y-1">
              {hours.map((item) => (
                <div key={item.day} className="hours-row">
                  <span className="hours-day">{item.day}</span>
                  <span className="hours-time">
                    {item.closed
                      ? "Closed"
                      : `${item.open ?? ""} - ${item.close ?? ""}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div className="card p-8 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: settings.accentColor }}
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${settings.accentColor}20` }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: settings.accentColor }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-text-primary">
                  Request Service
                </h2>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Call <span className="font-semibold text-text-primary">{settings.phone}</span> or
                send an email to <span className="font-semibold text-text-primary">{settings.email}</span>.
                We respond quickly during business hours.
              </p>
              <Link
                href={`/s/${params.slug}/contact`}
                className="btn btn-primary mt-6"
                style={{ backgroundColor: settings.accentColor }}
              >
                Contact us
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container-wide pb-8">
        <div className="card p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="section-label mb-2">Common Questions</p>
              <h2 className="text-2xl font-semibold text-text-primary">
                Frequently Asked Questions
              </h2>
            </div>
            <Link
              href={`/s/${params.slug}/about`}
              className="btn btn-secondary"
            >
              Learn more
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {faqs.slice(0, 3).map((faq, index) => (
              <div key={faq.question} className="faq-item border-b-0 pt-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white mb-4"
                  style={{ backgroundColor: settings.accentColor }}
                >
                  {index + 1}
                </div>
                <p className="faq-question">{faq.question}</p>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
