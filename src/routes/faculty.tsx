import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Clock } from "lucide-react";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { faculty } from "@/lib/site-data";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Barkhongia Higher Secondary School" },
      { name: "description", content: "Meet the qualified, dedicated teachers of Barkhongia Higher Secondary School, Khangia, Jorhat — their subjects, qualifications and experience." },
      { property: "og:title", content: "Faculty — Barkhongia HS" },
      { property: "og:description", content: "Meet the qualified, dedicated teachers of Barkhongia Higher Secondary School." },
      { property: "og:url", content: "/faculty" },
    ],
    links: [{ rel: "canonical", href: "/faculty" }],
  }),
  component: Faculty,
});

function initials(name: string) {
  return name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join("");
}

function Faculty() {
  return (
    <>
      <PageHeader
        eyebrow="Our people"
        title="The teachers behind every result"
        intro="A qualified, TET-trained faculty who know their students by name — and often by family. Their commitment is the heart of Barkhongia."
      />

      <section className="container-editorial py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((f, i) => (
            <Reveal key={f.name} delay={(i % 3) * 0.07}>
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[var(--shadow-lift)]">
                <div className="flex items-center justify-center bg-gradient-to-br from-primary/10 to-saffron/10 py-10">
                  <div className="grid size-24 place-items-center rounded-full bg-card font-display text-3xl font-semibold text-primary shadow-[var(--shadow-soft)]">
                    {initials(f.name)}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-saffron-foreground">
                    {f.role}
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-semibold">{f.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{f.subject}</p>
                  <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><GraduationCap className="size-4 text-muted-foreground" /> {f.qual}</p>
                    <p className="flex items-center gap-2"><Clock className="size-4 text-muted-foreground" /> {f.exp} of experience</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
