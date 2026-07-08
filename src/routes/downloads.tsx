import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileDown, FileText } from "lucide-react";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { downloads } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Download Center — Barkhongia Higher Secondary School" },
      { name: "description", content: "Download admission forms, prospectus, syllabus, question papers, timetable, circulars and annual reports from Barkhongia Higher Secondary School." },
      { property: "og:title", content: "Download Center — Barkhongia HS" },
      { property: "og:description", content: "Forms, prospectus, syllabus, question papers and more." },
      { property: "og:url", content: "/downloads" },
    ],
    links: [{ rel: "canonical", href: "/downloads" }],
  }),
  component: Downloads,
});

const cats = ["All", "Admissions", "Prospectus", "Syllabus", "Question Papers", "Timetable", "Circulars", "Reports"];

function Downloads() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? downloads : downloads.filter((d) => d.category === cat);

  return (
    <>
      <PageHeader
        eyebrow="Download center"
        title="Forms & documents, all in one place"
        intro="Everything you might need — from admission forms to the latest circulars — ready to download."
      />

      <section className="container-editorial py-16">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {list.map((d, i) => (
            <Reveal key={d.title} delay={(i % 4) * 0.05}>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                  <FileText className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-foreground">{d.title}</h3>
                  <p className="text-xs text-muted-foreground">{d.category} · PDF · {d.size}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0 rounded-full"
                  onClick={() => toast.info("Document will be available soon", { description: d.title })}
                >
                  <FileDown className="size-4" /> Download
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
