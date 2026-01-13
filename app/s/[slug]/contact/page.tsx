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
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Contact
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            Let’s talk about your project
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Reach out by phone, email, or stop by our office. We are here to
            help.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Phone:</span>{" "}
              {settings.phone}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Email:</span>{" "}
              {settings.email}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Address:</span>{" "}
              {settings.address}, {settings.city}, {settings.state} {settings.zip}
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}