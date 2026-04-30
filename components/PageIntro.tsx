import { Badge } from "./Badge";

export function PageIntro({
  eyebrow,
  title,
  body,
  meta
}: {
  eyebrow: string;
  title: string;
  body: string;
  meta?: string;
}) {
  return (
    <section className="rounded-2xl bg-navy p-6 text-white shadow-xl md:p-8">
      <div className="max-w-4xl">
        <Badge className="border-white/20 bg-white/10 text-white">{eyebrow}</Badge>
        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">{body}</p>
        {meta && <p className="mt-5 text-sm font-semibold text-mint">{meta}</p>}
      </div>
    </section>
  );
}
