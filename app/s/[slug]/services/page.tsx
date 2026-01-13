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

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Services
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Services for {settings.businessName}
        </h1>
        <p className="text-base text-slate-600">
          Explore our full list of offerings and let us know how we can help.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {service.name}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {service.description}
                </p>
              </div>
              {service.featured && (
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: settings.accentColor }}
                >
                  Featured
                </span>
              )}
            </div>
            {service.price && (
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {service.price}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}