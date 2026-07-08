import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Award, Medal, Star } from "lucide-react";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";
import { achievements } from "@/lib/site-data";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Barkhongia Higher Secondary School" },
      { name: "description", content: "Board results, sports titles, science fair wins and awards earned by the students of Barkhongia Higher Secondary School, Khangia, Jorhat." },
      { property: "og:title", content: "Achievements — Barkhongia HS" },
      { property: "og:description", content: "Board results, sports, science fair and awards at Barkhongia Higher Secondary School." },
      { property: "og:url", content: "/achievements" },
    ],
    links: [{ rel: "canonical", href: "/achievements" }],
  }),
  component: Achievements,
});

const highlights = [
  { icon: Star, value: 97, suffix: "%", label: "HSLC pass rate, 2025" },
  { icon: Medal, value: 14, suffix: "", label: "First divisions, 2025" },
  { icon: Trophy, value: 9, suffix: "", label: "District & zonal titles" },
  { icon: Award, value: 30, suffix: "+", label: "Years of results" },
];

function Achievements() {
  return (
    <>
      <PageHeader
        eyebrow="Achievements"
        title="Results that speak for our students"
        intro="Every trophy and every board result belongs to the students who earned it — and the teachers and families who stood beside them."
      />

      {/* Highlights */}
      <section className="border-b border-border bg-card">
        <div className="container-editorial grid grid-cols-2 gap-px divide-border sm:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.07} className="px-2 py-10 text-center">
              <h.icon className="mx-auto size-6 text-saffron" />
              <div className="mt-3 font-display text-4xl font-semibold text-primary">
                <CountUp to={h.value} suffix={h.suffix} />
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {h.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-editorial py-20">
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-0 left-4 top-2 w-px bg-border sm:left-1/2" aria-hidden />
          <ul className="space-y-10">
            {achievements.map((a, i) => (
              <Reveal key={a.year} delay={0.05}>
                <li className={`relative pl-12 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"}`}>
                  <span
                    className={`absolute left-[9px] top-1.5 grid size-3.5 place-items-center rounded-full border-2 border-primary bg-background sm:left-auto ${i % 2 === 0 ? "sm:-right-[7px]" : "sm:-left-[7px]"}`}
                    aria-hidden
                  />
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <span className="font-display text-sm font-bold uppercase tracking-widest text-saffron-foreground">
                      {a.year}
                    </span>
                    <h3 className="mt-1.5 font-display text-xl font-semibold">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
