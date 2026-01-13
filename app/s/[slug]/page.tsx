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
    <div className="space-y-16 py-12">
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            {settings.city}, {settings.state}
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">
            {settings.heroHeadline}
          </h1>
          <p className="mt-4 text-base text-slate-600">
            {settings.heroSubheadline}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={settings.primaryCtaLink}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow"
              style={{ backgroundColor: settings.accentColor }}
            >
              {settings.primaryCtaText}
            </Link>
            <Link
              href={`/s/${params.slug}/services`}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
            >
              View all services
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Featured services
          </h2>
          <div className="mt-4 space-y-4">
            {heroServices.map((service) => (
              <div
                key={service.name}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {service.description}
                </p>
                {service.price && (
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {service.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Hours</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {hours.map((item) => (
                <div key={item.day} className="flex items-center justify-between">
                  <span>{item.day}</span>
                  <span>
                    {item.closed
                      ? "Closed"
                      : `${item.open ?? ""} - ${item.close ?? ""}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Request service
            </h2>
            <p className="mt-4 text-sm text-slate-600">
              Call {settings.phone} or send an email to {settings.email}. We
              respond quickly during business hours.
            </p>
            <Link
              href={`/s/${params.slug}/contact`}
              className="mt-6 inline-flex rounded-full px-5 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: settings.accentColor }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">FAQs</h2>
            <Link
              href={`/s/${params.slug}/about`}
              className="text-sm font-semibold"
              style={{ color: settings.accentColor }}
            >
              Learn more
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {faqs.slice(0, 3).map((faq) => (
              <div key={faq.question}>
                <p className="text-sm font-semibold text-slate-900">
                  {faq.question}
                </p>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}