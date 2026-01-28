import Link from "next/link";
import { getSiteSnapshot } from "@/lib/snapshot";

export default async function PricingPage({
  params
}: {
  params: { slug: string };
}) {
  const snapshot = await getSiteSnapshot(params.slug);

  if (!snapshot?.content) {
    return null;
  }

  const { pricing, settings } = snapshot.content;
  const middleIndex = Math.floor(pricing.length / 2);

  return (
    <section className="container-wide py-12 md:py-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <p className="section-label mb-3">Pricing</p>
        <h1 className="section-title mb-4">
          Simple, transparent pricing
        </h1>
        <p className="section-subtitle mx-auto">
          Choose a plan that fits your needs. No hidden fees, no surprises.
          Just honest pricing for quality service.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {pricing.map((plan, index) => {
          const isPopular = index === middleIndex && pricing.length >= 3;

          return (
            <div
              key={plan.planName}
              className={`pricing-card card p-8 ${isPopular ? "featured lg:scale-105" : ""}`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span
                    className="badge badge-accent px-4 py-1.5"
                    style={{ backgroundColor: settings.accentColor }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  {plan.planName}
                </h2>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className="text-4xl md:text-5xl font-bold"
                    style={{ color: isPopular ? settings.accentColor : "var(--color-text-primary)" }}
                  >
                    {plan.price}
                  </span>
                </div>
                {plan.billingPeriod && (
                  <p className="text-sm text-text-muted mt-1">
                    {plan.billingPeriod}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="divider mb-6" />

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${settings.accentColor}20` }}
                    >
                      <svg
                        className="w-3 h-3"
                        style={{ color: settings.accentColor }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={plan.ctaLink ?? settings.primaryCtaLink}
                className={`btn w-full ${isPopular ? "btn-primary" : "btn-secondary"}`}
                style={isPopular ? { backgroundColor: settings.accentColor } : {}}
              >
                {plan.ctaText ?? settings.primaryCtaText}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-16 text-center">
        <div className="card inline-flex items-center gap-4 px-6 py-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-semibold text-text-primary">Need a custom quote?</p>
            <p className="text-sm text-text-secondary">
              Contact us for personalized pricing tailored to your needs.
            </p>
          </div>
          <Link
            href={`/s/${params.slug}/contact`}
            className="btn btn-secondary ml-4"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
