import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/site-data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative min-h-[16rem] rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)] sm:p-12">
        <Quote className="mx-auto size-9 text-saffron" />
        <AnimatePresence mode="wait" custom={dir}>
          <motion.blockquote
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5"
          >
            <p className="text-pretty font-display text-xl leading-relaxed text-foreground sm:text-2xl">
              "{t.quote}"
            </p>
            <footer className="mt-6">
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full" onClick={() => go(-1)} aria-label="Previous testimonial">
          <ChevronLeft className="size-4" />
        </Button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={
                i === index
                  ? "h-2 w-6 rounded-full bg-primary transition-all"
                  : "size-2 rounded-full bg-border transition-all hover:bg-muted-foreground"
              }
            />
          ))}
        </div>
        <Button variant="outline" size="icon" className="rounded-full" onClick={() => go(1)} aria-label="Next testimonial">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
