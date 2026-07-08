import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Users, ClipboardCheck, Microscope, PencilRuler } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { subjects } from "@/lib/site-data";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — Barkhongia Higher Secondary School" },
      { name: "description", content: "Academic programme at Barkhongia HS: Classes IX and X, core subjects including Science and Mathematics, and our learning methodology in Assamese medium." },
      { property: "og:title", content: "Academics — Barkhongia HS" },
      { property: "og:description", content: "Classes IX–X, core subjects and our learning methodology." },
      { property: "og:url", content: "/academics" },
    ],
    links: [{ rel: "canonical", href: "/academics" }],
  }),
  component: Academics,
});

const classes = [
  { name: "Class IX", focus: "Foundation year", body: "Students build the conceptual base across all subjects and adapt to secondary-level rigour, guided closely by subject teachers." },
  { name: "Class X", focus: "Board year (HSLC)", body: "An intensive year of revision, practice examinations and mentoring, preparing students for the Assam HSLC board examination." },
];

const methodology = [
  { icon: BookOpen, title: "Concept-first teaching", body: "Lessons begin with understanding, not memorisation, so knowledge lasts beyond the exam hall." },
  { icon: Microscope, title: "Practical science", body: "Hands-on experiments and demonstrations turn the science syllabus into lived discovery." },
  { icon: PencilRuler, title: "Regular assessment", body: "Unit tests, half-yearly and pre-board examinations track progress and catch gaps early." },
  { icon: Users, title: "Personal mentoring", body: "Small classes let teachers guide each student individually, especially in the board year." },
];

function Academics() {
  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="A focused programme for Classes IX & X"
        intro="Taught in Assamese with English as a core language, our curriculum builds strong fundamentals and prepares students for the Assam HSLC board examination and life beyond it."
      />

      {/* Classes */}
      <section className="container-editorial py-20">
        <SectionHeading eyebrow="Classes offered" title="Two years that shape a future" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {classes.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8">
                <span className="absolute right-6 top-4 font-display text-7xl font-semibold text-primary/10">
                  {c.name.split(" ")[1]}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-saffron-foreground">
                  {c.focus}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold">{c.name}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="bg-secondary/40 py-20">
        <div className="container-editorial">
          <SectionHeading eyebrow="Curriculum" title="Subjects we teach" intro="A balanced set of subjects covering language, sciences and the humanities." />
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
            {subjects.map((s, i) => (
              <Reveal key={s.name}>
                <div className={`flex items-center gap-6 p-6 ${i !== 0 ? "border-t border-border" : ""}`}>
                  <span className="font-display text-2xl font-semibold text-primary/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="container-editorial py-20">
        <SectionHeading align="center" eyebrow="How we teach" title="Our learning methodology" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <m.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <ClipboardCheck className="size-8 shrink-0 text-primary" />
            <div>
              <h3 className="font-display text-lg font-semibold">Looking for the syllabus or timetable?</h3>
              <p className="text-sm text-muted-foreground">Download the latest academic documents from our Download Center.</p>
            </div>
          </div>
          <Button asChild className="rounded-full">
            <Link to="/downloads">Downloads <ArrowRight className="size-4" /></Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
