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

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Pricing
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Simple, transparent pricing
        </h1>
        <p className="text-base text-slate-600">
          Choose a plan that fits your needs. No hidden fees.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {pricing.map((plan) => (
          <div
            key={plan.planName}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {plan.planName}
            </h2>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {plan.price}
            </p>
            {plan.billingPeriod && (
              <p className="text-sm text-slate-500">{plan.billingPeriod}</p>
            )}
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Link
              href={plan.ctaLink ?? settings.primaryCtaLink}
              className="mt-6 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: settings.accentColor }}
            >
              {plan.ctaText ?? settings.primaryCtaText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}