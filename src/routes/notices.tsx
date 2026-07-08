import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Pin, FileDown, Filter } from "lucide-react";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { notices } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "Notice Board — Barkhongia Higher Secondary School" },
      { name: "description", content: "Official notices, examination schedules, admission announcements and circulars from Barkhongia Higher Secondary School, Khangia, Jorhat." },
      { property: "og:title", content: "Notice Board — Barkhongia HS" },
      { property: "og:description", content: "Latest official notices and circulars from Barkhongia Higher Secondary School." },
      { property: "og:url", content: "/notices" },
    ],
    links: [{ rel: "canonical", href: "/notices" }],
  }),
  component: Notices,
});

const categories = ["All", "Admissions", "Examinations", "Events", "Scholarships", "General"];

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function Notices() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const results = useMemo(() => {
    return notices
      .filter((n) => (cat === "All" ? true : n.category === cat))
      .filter((n) => n.title.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned) || +new Date(b.date) - +new Date(a.date));
  }, [q, cat]);

  return (
    <>
      <PageHeader
        eyebrow="Notice board"
        title="Stay up to date"
        intro="All official notices, schedules and circulars — pinned announcements always appear first."
      />

      <section className="container-editorial py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search notices..."
              className="pl-9"
              aria-label="Search notices"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="size-4 shrink-0 text-muted-foreground" />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {results.map((n, i) => (
            <Reveal key={n.id} delay={(i % 6) * 0.04}>
              <article
                className={cn(
                  "flex flex-col gap-3 rounded-xl border bg-card p-5 sm:flex-row sm:items-center",
                  n.pinned ? "border-saffron/40 bg-saffron/5" : "border-border",
                )}
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                  {n.pdf ? <FileDown className="size-5" /> : <Pin className="size-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {n.pinned && (
                      <span className="rounded-full bg-saffron/20 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-saffron-foreground">
                        Pinned
                      </span>
                    )}
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-muted-foreground">
                      {n.category}
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-medium text-foreground">{n.title}</h3>
                  <p className="text-xs text-muted-foreground">{fmt(n.date)}</p>
                </div>
                {n.pdf && (
                  <Button variant="outline" size="sm" className="shrink-0 rounded-full">
                    <FileDown className="size-4" /> PDF
                  </Button>
                )}
              </article>
            </Reveal>
          ))}
          {results.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">No notices match your search.</p>
          )}
        </div>
      </section>
    </>
  );
}
