import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, CalendarClock, GraduationCap, Award, FileDown, ArrowRight } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/student-corner")({
  head: () => ({
    meta: [
      { title: "Student Corner — Barkhongia Higher Secondary School" },
      { name: "description", content: "Homework, results, timetable, scholarships and downloads for students of Barkhongia Higher Secondary School, Khangia, Jorhat." },
      { property: "og:title", content: "Student Corner — Barkhongia HS" },
      { property: "og:description", content: "Homework, results, timetable and scholarships for students." },
      { property: "og:url", content: "/student-corner" },
    ],
    links: [{ rel: "canonical", href: "/student-corner" }],
  }),
  component: StudentCorner,
});

const tools = [
  { icon: BookMarked, title: "Homework & assignments", body: "Class-wise daily homework and submission dates, updated by subject teachers.", to: "/notices" },
  { icon: GraduationCap, title: "Examination results", body: "Unit test, half-yearly and board result announcements as they are declared.", to: "/notices" },
  { icon: CalendarClock, title: "Class timetable", body: "The current period-wise timetable for Classes IX and X.", to: "/downloads" },
  { icon: Award, title: "Scholarships", body: "Government scholarship schemes, eligibility and application windows.", to: "/notices" },
  { icon: FileDown, title: "Study downloads", body: "Syllabus, previous-year question papers and reference material.", to: "/downloads" },
];

const timetable = [
  ["1", "9:30 – 10:15", "Assembly & first period"],
  ["2", "10:15 – 11:00", "Core subject"],
  ["3", "11:00 – 11:45", "Core subject"],
  ["—", "11:45 – 12:15", "Recess"],
  ["4", "12:15 – 1:00", "Science / Computer"],
  ["5", "1:00 – 1:45", "Language"],
  ["6", "1:45 – 2:30", "Social Science"],
  ["7", "2:30 – 3:00", "Games / library"],
];

function StudentCorner() {
  return (
    <>
      <PageHeader
        eyebrow="Student corner"
        title="Everything students need, in one place"
        intro="Homework, results, timetable, scholarships and study material — your daily starting point."
      />

      <section className="container-editorial py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.06}>
              <Link to={t.to} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-lift)]">
                <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <t.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="container-editorial">
          <SectionHeading eyebrow="Daily schedule" title="A typical school day" />
          <Reveal className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/60 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Period</th>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">Activity</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((row) => (
                  <tr key={row[1]} className="border-t border-border">
                    <td className="px-5 py-3 font-medium text-primary">{row[0]}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row[1]}</td>
                    <td className="px-5 py-3">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
    </>
  );
}
