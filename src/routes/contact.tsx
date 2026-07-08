import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { school } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Admissions — Barkhongia Higher Secondary School" },
      { name: "description", content: "Contact Barkhongia Higher Secondary School, Khangia, Jorhat, Assam. Address, phone, email and an admissions enquiry form." },
      { property: "og:title", content: "Contact — Barkhongia HS" },
      { property: "og:description", content: "Get in touch with Barkhongia Higher Secondary School — address, phone, email and enquiry form." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  subject: z.string().min(1, "Please choose a subject"),
  message: z.string().min(10, "Please write a little more"),
});
type FormValues = z.infer<typeof schema>;

const contactInfo = [
  { icon: MapPin, label: "Address", value: school.address },
  { icon: Phone, label: "Phone", value: school.phone, href: `tel:${school.phone}` },
  { icon: Mail, label: "Email", value: school.email, href: `mailto:${school.email}` },
  { icon: Clock, label: "Office hours", value: "Mon – Sat, 9:30 AM – 3:00 PM" },
];

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { subject: "" } });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Thank you! We've received your enquiry.", {
      description: `We'll reach out to ${values.name} shortly.`,
    });
    reset();
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact & admissions"
        title="We'd love to hear from you"
        intro="Whether you're enquiring about admissions or simply want to visit, our office is happy to help."
      />

      <section className="container-editorial py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Info */}
          <Reveal>
            <div className="space-y-5">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <c.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-0.5 block font-medium text-foreground hover:text-primary">{c.value}</a>
                    ) : (
                      <p className="mt-0.5 font-medium text-foreground">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Map to Barkhongia Higher Secondary School"
                src="https://www.google.com/maps?q=Jorhat,Assam&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <h2 className="font-display text-2xl font-semibold">Send an enquiry</h2>
              <p className="mt-1 text-sm text-muted-foreground">Fill in the form and our office will respond soon.</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" {...register("name")} className="mt-1.5" aria-invalid={!!errors.name} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="sm:col-span-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...register("phone")} className="mt-1.5" aria-invalid={!!errors.phone} />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} className="mt-1.5" aria-invalid={!!errors.email} />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={watch("subject")} onValueChange={(v) => setValue("subject", v, { shouldValidate: true })}>
                    <SelectTrigger id="subject" className="mt-1.5 w-full" aria-invalid={!!errors.subject}>
                      <SelectValue placeholder="Choose a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admissions">Admissions</SelectItem>
                      <SelectItem value="General enquiry">General enquiry</SelectItem>
                      <SelectItem value="Documents / certificates">Documents / certificates</SelectItem>
                      <SelectItem value="Feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} {...register("message")} className="mt-1.5" aria-invalid={!!errors.message} />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="mt-6 rounded-full">
                {isSubmitting ? "Sending..." : (<>Send enquiry <Send className="size-4" /></>)}
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
