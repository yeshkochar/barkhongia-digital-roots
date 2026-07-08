import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && <span className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</span>}
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="tricolour h-1 w-full" />
      <div className="container-editorial py-16 lg:py-20">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
