import { ContactForm } from "@/components/contact-form";
import { getSiteSnapshot } from "@/lib/snapshot";

export default async function ContactPage({
  params
}: {
  params: { slug: string };
}) {
  const snapshot = await getSiteSnapshot(params.slug);

  if (!snapshot?.content) {
    return null;
  }

  const { settings } = snapshot.content;

  return (
    <section className="container-wide py-12 md:py-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="section-label mb-3">Contact Us</p>
        <h1 className="section-title mb-4">
          Let&apos;s talk about your project
        </h1>
        <p className="section-subtitle mx-auto">
          Reach out by phone, email, or fill out the form. We&apos;re here to help
          and typically respond within 24 hours.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Methods */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-6">
              Get in touch
            </h2>
            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
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
                <div>
                  <p className="text-sm font-medium text-text-muted">Phone</p>
                  <p className="text-base font-semibold text-text-primary">
                    {settings.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-muted">Email</p>
                  <p className="text-base font-semibold text-text-primary">
                    {settings.email}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-muted">Address</p>
                  <p className="text-base font-semibold text-text-primary">
                    {settings.address}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {settings.city}, {settings.state} {settings.zip}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="card p-6 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20"
              style={{ backgroundColor: settings.accentColor }}
            />
            <div className="relative flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${settings.accentColor}20` }}
              >
                <svg
                  className="w-6 h-6"
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
              <div>
                <p className="font-semibold text-text-primary">Fast Response</p>
                <p className="text-sm text-text-secondary">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
