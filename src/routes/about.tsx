import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Target, HeartHandshake, BookOpenCheck } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { school } from "@/lib/site-data";
import campus from "@/assets/unnamed.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Barkhongia Higher Secondary School" },
      { name: "description", content: "The history, vision, mission and values of Barkhongia Higher Secondary School, Khangia, Jorhat — a government school serving Assam since 1986." },
      { property: "og:title", content: "About — Barkhongia Higher Secondary School" },
      { property: "og:description", content: "History, vision, mission and values of a government school in Khangia, Jorhat, serving Assam since 1986." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: Compass, title: "Integrity", body: "Honesty and fairness in the classroom, on the field and in every decision we make." },
  { icon: Target, title: "Discipline", body: "Structure and routine that turn potential into steady, lasting achievement." },
  { icon: HeartHandshake, title: "Community", body: "A school woven into the life of Khangia, where families and teachers work as one." },
  { icon: BookOpenCheck, title: "Curiosity", body: "A love of learning that reaches past the syllabus into the wider world." },
];

const facts = [
  ["Established", String(school.established)],
  ["Managed by", "Govt. of Assam"],
  ["School type", "Higher Secondary"],
  ["Medium", school.medium],
  ["Classes", "IX – X"],
  ["Session begins", school.session],
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About the school"
        title="Rooted in Khangia, reaching for excellence"
        intro="Barkhongia Higher Secondary School has quietly shaped generations of students from Khangia and its neighbouring villages. This is the story of a government school that treats every child as its own."
      />

      {/* History */}
      <section className="container-editorial py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">Our history</span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">From a modest beginning in 1986</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Founded in {school.established} under the Department of Education, Government of
                Assam, Barkhongia Higher Secondary School began with a simple conviction: that no
                child in Khangia should have to travel far to receive a good education.
              </p>
              <p>
                What started as a handful of classrooms has grown into a trusted higher secondary
                school with a qualified faculty, a computer laboratory, science facilities and a
                thriving culture of sport and celebration — all while remaining free and open to the
                community it serves.
              </p>
              <p>
                Nearly four decades on, our alumni carry the school's name into colleges,
                professions and public service across Assam and beyond. Their achievements are the
                truest measure of our work.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:pt-10">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <h3 className="font-display text-lg font-semibold">At a glance</h3>
              <dl className="mt-4 divide-y divide-border">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-3 text-sm">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 font-display italic text-primary">{school.motto}</p>
              <p className="text-xs text-muted-foreground">{school.mottoEn}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission band */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-editorial grid gap-10 py-16 md:grid-cols-2 lg:gap-16 lg:py-20">
          <Reveal>
            <span className="eyebrow text-saffron">Vision</span>
            <p className="mt-4 text-pretty font-display text-2xl leading-snug sm:text-3xl">
              To be a model rural higher secondary school where every child is equipped to think,
              contribute and lead.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow text-saffron">Mission</span>
            <p className="mt-4 text-pretty font-display text-2xl leading-snug sm:text-3xl">
              To deliver rigorous, values-driven education that blends strong fundamentals with
              digital and scientific literacy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container-editorial py-20">
        <SectionHeading align="center" eyebrow="What we stand for" title="Our values" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <v.icon className="size-7 text-primary" />
                <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Overview image + CTA */}
      <section className="container-editorial pb-24">
        <div className="overflow-hidden rounded-3xl border border-border">
          <div className="relative">
            <img src={campus.url} alt="Barkhongia school campus overview" className="aspect-[21/9] w-full object-cover" loading="lazy" width={1366} height={585} />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[oklch(0.2_0.05_262/0.85)] to-transparent p-8 lg:p-12">
              <div className="max-w-lg text-primary-foreground">
                <h2 className="text-2xl font-semibold sm:text-3xl">Come see the campus for yourself</h2>
                <p className="mt-2 text-primary-foreground/85">Meet our teachers and walk the grounds our students call a second home.</p>
                <Button asChild variant="secondary" className="mt-5 rounded-full">
                  <Link to="/contact">Plan a visit <ArrowRight className="size-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
