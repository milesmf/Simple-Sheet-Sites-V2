import { getSiteSnapshot } from "@/lib/snapshot";

export default async function ServicesPage({
  params
}: {
  params: { slug: string };
}) {
  const snapshot = await getSiteSnapshot(params.slug);

  if (!snapshot?.content) {
    return null;
  }

  const { services, settings } = snapshot.content;
  const featuredServices = services.filter((s) => s.featured);
  const regularServices = services.filter((s) => !s.featured);

  return (
    <section className="container-wide py-12 md:py-16">
      {/* Page Header */}
      <div className="max-w-2xl mb-12">
        <p className="section-label mb-3">Our Services</p>
        <h1 className="section-title mb-4">
          Services for {settings.businessName}
        </h1>
        <p className="section-subtitle">
          Explore our full list of offerings and let us know how we can help.
          Quality work, fair prices, and satisfaction guaranteed.
        </p>
      </div>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: settings.accentColor }}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-text-primary">
              Featured Services
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <div
                key={service.name}
                className="service-card card card-interactive p-6 relative"
              >
                <div
                  className="absolute top-4 right-4"
                  style={{ color: settings.accentColor }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="pr-8">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
                {service.price && (
                  <div className="mt-4 pt-4 border-t border-border-primary">
                    <p
                      className="text-xl font-bold"
                      style={{ color: settings.accentColor }}
                    >
                      {service.price}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Services */}
      <div>
        {featuredServices.length > 0 && (
          <h2 className="text-lg font-semibold text-text-primary mb-6">
            All Services
          </h2>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {(featuredServices.length > 0 ? regularServices : services).map(
            (service) => (
              <div
                key={service.name}
                className="service-card card card-interactive p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  {service.featured && (
                    <span
                      className="badge badge-accent flex-shrink-0"
                      style={{ backgroundColor: settings.accentColor }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                {service.price && (
                  <div className="mt-4 pt-4 border-t border-border-primary flex items-center justify-between">
                    <span className="text-sm text-text-muted">Starting at</span>
                    <p
                      className="text-xl font-bold"
                      style={{ color: settings.accentColor }}
                    >
                      {service.price}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 card p-8 md:p-12 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at center, ${settings.accentColor}, transparent 70%)`
          }}
        />
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Ready to get started?
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            Contact us today for a free consultation and quote. We&apos;re here to help
            with all your service needs.
          </p>
          <a
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
          </a>
        </div>
      </div>
    </section>
  );
}
