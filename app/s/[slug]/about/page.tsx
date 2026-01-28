import Link from "next/link";
import { getSiteSnapshot } from "@/lib/snapshot";
import { buildAboutCopy, buildAboutHeadline } from "@/lib/content";

export default async function AboutPage({
  params
}: {
  params: { slug: string };
}) {
  const snapshot = await getSiteSnapshot(params.slug);

  if (!snapshot?.content) {
    return null;
  }

  const { settings, faqs } = snapshot.content;

  const values = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
      title: "Trusted & Insured",
      description: "Fully licensed and insured for your peace of mind."
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      title: "Transparent Pricing",
      description: "No hidden fees. We quote upfront so you know what to expect."
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ),
      title: "Locally Owned",
      description: "We're your neighbors, invested in our community."
    }
  ];

  return (
    <section className="container-wide py-12 md:py-16">
      {/* Hero Section */}
      <div className="card p-8 md:p-12 mb-12 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: settings.accentColor }}
        />
        <div className="relative max-w-3xl">
          <p className="section-label mb-3">About Us</p>
          <h1 className="section-title mb-6">
            {buildAboutHeadline(settings)}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {buildAboutCopy(settings)}
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {values.map((value, index) => (
          <div key={value.title} className="card card-interactive p-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${settings.accentColor}20` }}
            >
              <svg
                className="w-6 h-6"
                style={{ color: settings.accentColor }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {value.icon}
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {value.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      {/* FAQs Section */}
      <div className="card p-8 md:p-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="section-label mb-2">Have Questions?</p>
            <h2 className="text-2xl font-semibold text-text-primary">
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="grid gap-0 md:grid-cols-2 md:gap-x-12">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="faq-item">
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                  style={{ backgroundColor: settings.accentColor }}
                >
                  {index + 1}
                </div>
                <div>
                  <p className="faq-question">{faq.question}</p>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Ready to work with us?
        </h2>
        <p className="text-text-secondary mb-8 max-w-lg mx-auto">
          Get in touch today and let us show you why our customers keep coming back.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={settings.primaryCtaLink}
            className="btn btn-primary"
            style={{ backgroundColor: settings.accentColor }}
          >
            {settings.primaryCtaText}
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
          <Link
            href={`/s/${params.slug}/contact`}
            className="btn btn-secondary"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
