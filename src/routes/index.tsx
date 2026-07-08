import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { ArrowRight, Quote, Pin, CalendarDays, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";
import { SectionHeading } from "@/components/site/section";
import { Testimonials } from "@/components/site/testimonials";
import {
  school,
  stats,
  whyChooseUs,
  facilities,
  notices,
  events,
  subjects,
} from "@/lib/site-data";
import crest from "@/assets/school-crest.png";
import gate from "@/assets/unnamed-2.jpg.asset.json";
import campus from "@/assets/unnamed.jpg.asset.json";
import campus2 from "@/assets/unnamed-3.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
});

const pinned = notices.filter((n) => n.pinned);
const upcoming = events.slice(0, 3);

function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={gate.url}
            alt="The main entrance toran of Barkhongia Higher Secondary School"
            className="size-full object-cover"
            width={1366}
            height={620}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.2_0.05_262/0.92)] via-[oklch(0.2_0.05_262/0.72)] to-[oklch(0.2_0.05_262/0.35)]" />
        </div>

        <div className="container-editorial relative py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-primary-foreground"
          >
            <div className="mb-6 flex items-center gap-3">
              <img src={crest} alt="" width={56} height={56} className="size-14 drop-shadow" />
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
                Est. {school.established} · Govt. of Assam
              </div>
            </div>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-6xl">
              Barkhongia Higher Secondary School
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/85">
              {school.location}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium tracking-wide backdrop-blur">
              {school.tagline}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link to="/about">
                  Explore School <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-saffron text-saffron-foreground hover:bg-saffron/90"
              >
                <Link to="/contact">Admissions</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/gallery">Virtual Tour</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="border-b border-border bg-card">
        <div className="container-editorial grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="px-2 py-8 text-center sm:py-10">
              <div className="font-display text-4xl font-semibold text-primary sm:text-5xl">
                {"display" in s && s.display ? (
                  s.display
                ) : (
                  <CountUp to={s.value} suffix={"suffix" in s ? (s.suffix ?? "") : ""} />
                )}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- ABOUT / INTRO ---------- */}
      <section className="container-editorial py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)]">
              <img
                src={campus.url}
                alt="The school campus at Barkhongia"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                width={1366}
                height={1024}
              />
            </div>
            <div className="absolute -bottom-6 -right-3 hidden rounded-xl border border-border bg-card px-6 py-4 shadow-[var(--shadow-lift)] sm:block">
              <div className="font-display text-3xl font-semibold text-primary">39</div>
              <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Years of service
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="A neighbourhood school with district-wide ambition"
              intro="For nearly four decades, Barkhongia Higher Secondary School has been the learning home of Khangia and its surrounding villages. As a government institution under the Department of Education, we combine free, dependable schooling with a genuine culture of care."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To be a model rural higher secondary school where every child, regardless of
                  background, is equipped to think, contribute and lead.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To deliver rigorous, values-driven education in Assamese, blending strong
                  fundamentals with digital and scientific literacy.
                </p>
              </div>
            </div>
            <Button asChild variant="link" className="mt-6 h-auto p-0 text-primary">
              <Link to="/about">
                Read our full story <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE US ---------- */}
      <section className="bg-secondary/40 py-20 lg:py-28">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Why families choose us"
            title="Eight reasons parents trust Barkhongia"
            intro="Not a list of promises — a description of what happens here every day."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((f, i) => {
              const Icon = (Icons[f.icon as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.Star;
              return (
                <Reveal key={f.title} delay={(i % 4) * 0.06}>
                  <div className="group h-full bg-card p-6 transition-colors hover:bg-accent/40">
                    <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- PRINCIPAL MESSAGE ---------- */}
      <section className="container-editorial py-20 lg:py-28">
        <div className="grid gap-10 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] lg:grid-cols-[1fr_1.6fr] lg:gap-14 lg:p-12">
          <Reveal className="flex flex-col justify-center">
            <div className="mx-auto grid size-40 place-items-center rounded-full bg-gradient-to-br from-primary/15 to-saffron/15 lg:mx-0">
              <span className="font-display text-5xl font-semibold text-primary">NB</span>
            </div>
            <div className="mt-5 text-center lg:text-left">
              <p className="font-display text-xl font-semibold">Dr. Nabajyoti Bora</p>
              <p className="text-sm text-muted-foreground">Principal</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Principal's message</span>
            <Quote className="mt-4 size-8 text-saffron" />
            <blockquote className="mt-3 text-pretty font-display text-xl leading-relaxed text-foreground sm:text-2xl">
              "A school is not measured by its buildings, but by the character of the students who
              walk out of its gates. Here at Barkhongia, we teach our children to read the world
              with clarity and to serve it with courage."
            </blockquote>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              We invite you to know our teachers, our results and, most of all, our students.
            </p>
            <Button asChild variant="link" className="mt-4 h-auto p-0 text-primary">
              <Link to="/principal">
                Read the full message <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------- ACADEMICS + FACILITIES SPLIT ---------- */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-editorial grid gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <Reveal>
            <span className="eyebrow text-saffron">Academics</span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              A focused curriculum for Classes IX & X
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Taught in Assamese with English as a core language, our programme builds the
              fundamentals that carry students into higher study and life.
            </p>
            <ul className="mt-8 space-y-3">
              {subjects.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-4 border-b border-primary-foreground/15 pb-3">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-right text-sm text-primary-foreground/70">{s.note}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="secondary" className="mt-8 rounded-full">
              <Link to="/academics">
                View academics <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow text-saffron">Facilities</span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Everything a learner needs</h2>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {facilities.map((f) => {
                const Icon = (Icons[f.icon as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.Check;
                return (
                  <div
                    key={f.title}
                    className="flex items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 py-3"
                  >
                    <Icon className="size-5 shrink-0 text-saffron" />
                    <span className="text-sm font-medium">{f.title}</span>
                  </div>
                );
              })}
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-8 rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/facilities">
                Tour facilities <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------- NOTICES + EVENTS ---------- */}
      <section className="container-editorial py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-end justify-between">
              <SectionHeading eyebrow="Notice board" title="Latest notices" />
              <Button asChild variant="link" className="h-auto p-0 text-primary">
                <Link to="/notices">All notices</Link>
              </Button>
            </div>
            <ul className="mt-8 space-y-2">
              {[...pinned, ...notices.filter((n) => !n.pinned)].slice(0, 5).map((n, i) => (
                <Reveal key={n.id} delay={i * 0.05}>
                  <Link
                    to="/notices"
                    className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                      {n.pdf ? <FileText className="size-4" /> : <Pin className="size-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(n.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        {" · "}
                        {n.category}
                      </p>
                    </div>
                    {n.pinned && (
                      <span className="rounded-full bg-saffron/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-saffron-foreground">
                        Pinned
                      </span>
                    )}
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <SectionHeading eyebrow="What's on" title="Upcoming events" />
              <Button asChild variant="link" className="h-auto p-0 text-primary">
                <Link to="/events">Full calendar</Link>
              </Button>
            </div>
            <div className="mt-8 space-y-4">
              {upcoming.map((e, i) => {
                const d = new Date(e.date);
                return (
                  <Reveal key={e.title} delay={i * 0.05}>
                    <div className="flex gap-4 rounded-lg border border-border bg-card p-4">
                      <div className="grid w-16 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
                        <span className="text-xl font-semibold">{d.getDate()}</span>
                        <span className="text-[0.65rem] font-semibold uppercase tracking-widest">
                          {d.toLocaleString("en-IN", { month: "short" })}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="size-3.5 text-saffron" />
                          <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                            {e.type}
                          </span>
                        </div>
                        <p className="mt-1 font-display text-lg font-semibold leading-tight">{e.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{e.body}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY PREVIEW ---------- */}
      <section className="bg-secondary/40 py-20 lg:py-28">
        <div className="container-editorial">
          <div className="flex items-end justify-between">
            <SectionHeading eyebrow="Campus life" title="A glimpse of Barkhongia" />
            <Button asChild variant="link" className="h-auto p-0 text-primary">
              <Link to="/gallery">Open gallery</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[gate, campus, campus2].map((img, i) => (
              <Reveal key={i} delay={i * 0.08} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <Link to="/gallery" className="group block overflow-hidden rounded-xl border border-border">
                  <img
                    src={img.url}
                    alt="Barkhongia school campus"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={1366}
                    height={1024}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="container-editorial py-20 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="In their words"
          title="Voices from our community"
        />
        <div className="mt-12">
          <Testimonials />
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="container-editorial pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground lg:px-16 lg:py-20">
          <div className="tricolour absolute inset-x-0 top-0 h-1" />
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold sm:text-4xl">
              Give your child a start rooted in knowledge and character
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Admissions for the {school.session} session are open. Talk to our office or send an
              enquiry — we'd love to welcome your family.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link to="/contact">Enquire about admissions</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/downloads">Download forms</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
