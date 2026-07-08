import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { nav, school } from "@/lib/site-data";
import crest from "@/assets/school-crest.png";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { language, t } = useLanguage();
  const quickLinks = nav.slice(1, 7);

  const resourceLinks = [
    { label: language === "as" ? "জাননী ফলক" : "Notice Board", to: "/notices" },
    { label: language === "as" ? "ডাউনলোড" : "Downloads", to: "/downloads" },
    { label: language === "as" ? "ছাত্ৰ-ছাত্ৰী কোণ" : "Student Corner", to: "/student-corner" },
    { label: language === "as" ? "অভিভাৱক কোণ" : "Parent Corner", to: "/parent-corner" },
    { label: language === "as" ? "অধ্যক্ষৰ বাণী" : "Principal's Message", to: "/principal" },
    { label: language === "as" ? "এডমিন বোৰ্ড" : "Admin Portal", to: "/admin" },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="tricolour h-1 w-full" />
      <div className="container-editorial grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <img src={crest} alt="" width={48} height={48} className="size-12" loading="lazy" />
            <span className="font-display text-lg font-semibold leading-tight">
              {school.shortName}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {language === "as"
              ? `খঙীয়া, যোৰহাটৰ এখন চৰকাৰী উচ্চতৰ মাধ্যমিক বিদ্যালয় — ${school.established} চনৰে পৰা জ্ঞান, শৃংখলা আৰু উৎকৰ্ষতা বিকাশ কৰাত ব্ৰতী।`
              : `A government higher secondary school in Khangia, Jorhat — nurturing knowledge, discipline and excellence since ${school.established}.`}
          </p>
          <p className="mt-4 font-display text-sm italic text-primary">
            {school.motto}
          </p>
        </div>

        <nav aria-label="School" className="text-sm">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
            {language === "as" ? "বিদ্যালয়" : "School"}
          </h3>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Resources" className="text-sm">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
            {language === "as" ? "সমলসমূহ" : "Resources"}
          </h3>
          <ul className="space-y-2.5">
            {resourceLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
            {language === "as" ? "যোগাযোগ" : "Contact"}
          </h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{school.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`tel:${school.phone}`} className="hover:text-primary">{school.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${school.email}`} className="hover:text-primary">{school.email}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {language === "as"
                  ? "সোমবাৰ – শনিবাৰ, ৯:৩০ বজা – ৩:০০ বজা"
                  : "Mon – Sat, 9:30 AM – 3:00 PM"}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-editorial flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            {language === "as"
              ? `© ${new Date().getFullYear()} ${school.name}। সৰ্বস্বত্ব সংৰক্ষিত।`
              : `© ${new Date().getFullYear()} ${school.name}. All rights reserved.`}
          </p>
          <p>
            {language === "as"
              ? `${school.managedBy}ৰ অধীনত পৰিচালিত।`
              : `Managed by the ${school.managedBy}.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
