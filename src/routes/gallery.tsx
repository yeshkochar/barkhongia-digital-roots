import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import gate from "@/assets/unnamed-2.jpg.asset.json";
import campus from "@/assets/unnamed.jpg.asset.json";
import campus2 from "@/assets/unnamed-3.jpg.asset.json";
import assembly from "@/assets/gallery-assembly.jpg";
import lab from "@/assets/gallery-lab.jpg";
import sports from "@/assets/gallery-sports.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Barkhongia Higher Secondary School" },
      { name: "description", content: "Photo gallery of Barkhongia Higher Secondary School — campus, students, sports, morning assembly and celebrations in Khangia, Jorhat, Assam." },
      { property: "og:title", content: "Gallery — Barkhongia HS" },
      { property: "og:description", content: "A visual tour of campus life at Barkhongia Higher Secondary School." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

type Item = { src: string; alt: string; category: string };

const items: Item[] = [
  { src: gate.url, alt: "The main entrance toran of the school", category: "Campus" },
  { src: campus.url, alt: "School campus building", category: "Campus" },
  { src: campus2.url, alt: "School grounds and gate", category: "Campus" },
  { src: assembly, alt: "Students at the morning assembly", category: "Morning Assembly" },
  { src: assembly, alt: "Students gathered in the courtyard", category: "Students" },
  { src: lab, alt: "Students in the computer lab", category: "Students" },
  { src: sports, alt: "Football on the school playground", category: "Sports" },
  { src: sports, alt: "Students playing on the field", category: "Celebrations" },
  { src: lab, alt: "Computer-aided learning session", category: "Campus" },
];

const categories = ["All", "Campus", "Students", "Sports", "Morning Assembly", "Celebrations"];

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  const step = (d: number) => {
    if (active === null) return;
    setActive((active + d + filtered.length) % filtered.length);
  };

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Campus life, in pictures"
        intro="From the morning assembly to the football field — moments that capture the spirit of Barkhongia."
      />

      <section className="container-editorial py-16">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3">
          {filtered.map((it, i) => (
            <Reveal
              key={`${it.src}-${i}`}
              delay={(i % 3) * 0.05}
              className={cn(i % 5 === 0 && "md:row-span-2 md:h-full")}
            >
              <button
                onClick={() => setActive(i)}
                className="group relative size-full overflow-hidden rounded-xl border border-border"
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[oklch(0.2_0.05_262/0.7)] to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium text-primary-foreground">{it.category}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-[oklch(0.15_0.02_262/0.92)] p-4"
            onClick={() => setActive(null)}
          >
            <button className="absolute right-5 top-5 text-primary-foreground/80 hover:text-primary-foreground" aria-label="Close" onClick={() => setActive(null)}>
              <X className="size-7" />
            </button>
            <button
              className="absolute left-4 text-primary-foreground/80 hover:text-primary-foreground sm:left-8"
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
            >
              <ChevronLeft className="size-9" />
            </button>
            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={filtered[active].src} alt={filtered[active].alt} className="max-h-[80vh] rounded-xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-primary-foreground/80">
                {filtered[active].alt}
              </figcaption>
            </motion.figure>
            <button
              className="absolute right-4 text-primary-foreground/80 hover:text-primary-foreground sm:right-8"
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); step(1); }}
            >
              <ChevronRight className="size-9" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
