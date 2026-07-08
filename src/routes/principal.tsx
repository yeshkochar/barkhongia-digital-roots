import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/principal")({
  head: () => ({
    meta: [
      { title: "Principal's Message — Barkhongia Higher Secondary School" },
      { name: "description", content: "A message from Dr. Nabajyoti Bora, Principal of Barkhongia Higher Secondary School, Khangia, Jorhat, Assam." },
      { property: "og:title", content: "Principal's Message — Barkhongia HS" },
      { property: "og:description", content: "A message from the Principal of Barkhongia Higher Secondary School." },
      { property: "og:url", content: "/principal" },
    ],
    links: [{ rel: "canonical", href: "/principal" }],
  }),
  component: Principal,
});

function Principal() {
  return (
    <>
      <PageHeader eyebrow="From the desk of the Principal" title="A message of welcome" />

      <section className="container-editorial py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
          <Reveal>
            <div className="sticky top-28">
              <div className="grid aspect-[4/5] place-items-center rounded-2xl border border-border bg-gradient-to-br from-primary/12 to-saffron/12">
                <span className="font-display text-7xl font-semibold text-primary">NB</span>
              </div>
              <div className="mt-5">
                <p className="font-display text-xl font-semibold">Dr. Nabajyoti Bora</p>
                <p className="text-sm text-muted-foreground">Principal, M.Sc., Ph.D. (Physics)</p>
                <p className="mt-1 text-sm text-muted-foreground">27 years in education</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Quote className="size-10 text-saffron" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground">
              <p className="text-pretty font-display text-2xl leading-snug">
                Dear students, parents and well-wishers — welcome to Barkhongia Higher Secondary
                School.
              </p>
              <p className="text-base text-muted-foreground">
                A school is not measured by its buildings, but by the character of the students who
                walk out of its gates. For nearly four decades, we have held to a simple promise: to
                give every child of Khangia an education that is rigorous, humane and free.
              </p>
              <p className="text-base text-muted-foreground">
                In our classrooms, discipline is not fear — it is the quiet habit of doing good work
                well. We teach mathematics and science, language and history, but we also teach
                patience, honesty and the courage to ask questions. Our teachers know their students
                by name, and often by family, and they carry that responsibility with pride.
              </p>
              <p className="text-base text-muted-foreground">
                To our parents: thank you for trusting us with your children. To our students: read
                widely, work sincerely, and never forget the village that raised you. And to those
                considering our school — come, meet us, and see the difference care makes.
              </p>
              <p className="text-base text-muted-foreground">
                Let us continue to move, together, from darkness towards light.
              </p>
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <p className="font-display text-2xl italic text-primary">Nabajyoti Bora</p>
              <p className="text-sm text-muted-foreground">Principal, Barkhongia Higher Secondary School</p>
            </div>

            <Button asChild className="mt-8 rounded-full">
              <Link to="/faculty">Meet our faculty <ArrowRight className="size-4" /></Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
