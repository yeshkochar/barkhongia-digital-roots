import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ClipboardList, Clock, FileText, MessagesSquare, Send } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { faqs } from "@/lib/site-data";

export const Route = createFileRoute("/parent-corner")({
  head: () => ({
    meta: [
      { title: "Parent Corner — Barkhongia Higher Secondary School" },
      { name: "description", content: "Admission information, circulars, school timing, FAQs and a feedback form for parents of Barkhongia Higher Secondary School, Khangia, Jorhat." },
      { property: "og:title", content: "Parent Corner — Barkhongia HS" },
      { property: "og:description", content: "Admission info, circulars, timings, FAQs and feedback for parents." },
      { property: "og:url", content: "/parent-corner" },
    ],
    links: [{ rel: "canonical", href: "/parent-corner" }],
  }),
  component: ParentCorner,
});

const cards = [
  { icon: ClipboardList, title: "Admission", body: "Class IX admissions open ahead of the April session. Education is free as a government school." },
  { icon: FileText, title: "Circulars", body: "Official circulars and announcements are posted regularly to the Notice Board." },
  { icon: Clock, title: "School timing", body: "Regular hours are 9:30 AM to 3:00 PM, Monday to Saturday, with a revised summer schedule." },
  { icon: MessagesSquare, title: "PTM", body: "Parent-Teacher Meetings are held each term to discuss each child's progress." },
];

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Please write a little more"),
});
type FormValues = z.infer<typeof schema>;

function ParentCorner() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thank you for your feedback!");
    reset();
  };

  return (
    <>
      <PageHeader
        eyebrow="Parent corner"
        title="Partners in your child's education"
        intro="The information parents ask for most — admissions, timings, circulars and answers to common questions."
      />

      <section className="container-editorial py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="FAQs" title="Questions parents ask" />
            <Reveal className="mt-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          <div>
            <SectionHeading eyebrow="Feedback" title="Share your thoughts" intro="Your suggestions help us serve your child better." />
            <Reveal delay={0.1} className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <div>
                  <Label htmlFor="pname">Name</Label>
                  <Input id="pname" {...register("name")} className="mt-1.5" aria-invalid={!!errors.name} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="pemail">Email</Label>
                  <Input id="pemail" type="email" {...register("email")} className="mt-1.5" aria-invalid={!!errors.email} />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="pmsg">Feedback</Label>
                  <Textarea id="pmsg" rows={4} {...register("message")} className="mt-1.5" aria-invalid={!!errors.message} />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="rounded-full">
                  {isSubmitting ? "Sending..." : (<>Submit feedback <Send className="size-4" /></>)}
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
