import { createFileRoute } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { facilities } from "@/lib/site-data";
import campus from "@/assets/unnamed.jpg.asset.json";
import campus2 from "@/assets/unnamed-3.jpg.asset.json";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities — Barkhongia Higher Secondary School" },
      { name: "description", content: "Facilities at Barkhongia HS: government building, computer lab, science education, playground, drinking water, electricity and separate toilets." },
      { property: "og:title", content: "Facilities — Barkhongia HS" },
      { property: "og:description", content: "Computer lab, science education, playground and more at Barkhongia Higher Secondary School." },
      { property: "og:url", content: "/facilities" },
    ],
    links: [{ rel: "canonical", href: "/facilities" }],
  }),
  component: Facilities,
});

function Facilities() {
  const [first, ...rest] = facilities;
  const Lead = (Icons[first.icon as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.Building2;
  return (
    <>
      <PageHeader
        eyebrow="Campus & facilities"
        title="A campus built for learning"
        intro="Everything a student needs to study, play and grow — maintained under state education infrastructure and cared for by our staff."
      />

      {/* Feature facility */}
      <section className="container-editorial py-20">
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] lg:grid-cols-2 lg:p-10">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <img src={campus.url} alt="Barkhongia government school building" className="aspect-[4/3] w-full object-cover" loading="lazy" width={1366} height={1024} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
              <Lead className="size-6" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold">{first.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{first.body}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our permanent, purpose-built campus provides safe, well-lit classrooms and dedicated
              spaces for administration, science and computing — the backbone of daily school life.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid of facilities */}
      <section className="bg-secondary/40 py-20">
        <div className="container-editorial">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((f, i) => {
              const Icon = (Icons[f.icon as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.Check;
              return (
                <Reveal key={f.title} delay={(i % 3) * 0.06}>
                  <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6">
                    <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campus strip */}
      <section className="container-editorial py-20">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border">
            <img src={campus2.url} alt="The Barkhongia school campus and grounds" className="aspect-[21/9] w-full object-cover" loading="lazy" width={1366} height={585} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
