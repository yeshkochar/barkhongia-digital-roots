import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, GraduationCap, Users, ClipboardList, Trophy, Palmtree } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { events } from "@/lib/site-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Calendar — Barkhongia Higher Secondary School" },
      { name: "description", content: "School events, national festivals, sports meet, science exhibition and the academic calendar of Barkhongia Higher Secondary School, Khangia, Jorhat." },
      { property: "og:title", content: "Events & Calendar — Barkhongia HS" },
      { property: "og:description", content: "Events, festivals and the academic calendar at Barkhongia Higher Secondary School." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: Events,
});

const calendar = [
  { icon: GraduationCap, month: "April", title: "Admissions & session begins", body: "New academic session opens; Class IX admissions confirmed." },
  { icon: ClipboardList, month: "July", title: "Half-yearly examinations", body: "Mid-term assessment for Classes IX and X." },
  { icon: Users, month: "July", title: "Parent-Teacher Meeting", body: "Progress review and one-to-one discussion with teachers." },
  { icon: Trophy, month: "February", title: "Sports Week", body: "Annual athletics, football and cultural march-past." },
  { icon: Palmtree, month: "Oct–Nov", title: "Festival & winter break", body: "Holidays for Durga Puja, Diwali and the winter recess." },
];

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function Events() {
  return (
    <>
      <PageHeader
        eyebrow="Events & calendar"
        title="A year full of learning and celebration"
        intro="From Saraswati Puja to the Annual Function, our calendar balances rigour with the festivals and gatherings that bind our community."
      />

      {/* Featured events */}
      <section className="container-editorial py-20">
        <SectionHeading eyebrow="Highlights" title="Signature events" />
        <div className="mt-12 space-y-4">
          {events.map((e, i) => {
            const d = new Date(e.date);
            return (
              <Reveal key={e.title} delay={(i % 5) * 0.05}>
                <article className="grid items-center gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-[auto_1fr_auto]">
                  <div className="grid w-20 place-items-center rounded-xl bg-primary py-3 text-primary-foreground">
                    <span className="text-2xl font-semibold">{d.getDate()}</span>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-widest">
                      {d.toLocaleString("en-IN", { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-saffron-foreground">
                      {e.type}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-semibold">{e.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.body}</p>
                  </div>
                  <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                    <CalendarDays className="size-4" /> {fmt(e.date)}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Academic calendar */}
      <section className="bg-secondary/40 py-20">
        <div className="container-editorial">
          <SectionHeading align="center" eyebrow="Academic calendar" title="The rhythm of our year" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {calendar.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
                  <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <c.icon className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.month}</span>
                    <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
