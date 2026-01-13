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

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          About
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          {buildAboutHeadline(settings)}
        </h1>
        <p className="mt-4 text-base text-slate-600">
          {buildAboutCopy(settings)}
        </p>
      </div>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">FAQs</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq) => (
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
  );
}