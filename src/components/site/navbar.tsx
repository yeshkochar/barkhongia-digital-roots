import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { SearchCommand } from "./search-command";
import { nav, school } from "@/lib/site-data";
import crest from "@/assets/school-crest.png";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-background",
      )}
    >
      <div className="container-editorial flex h-16 items-center gap-4 lg:h-[4.5rem]">
        <Link to="/" className="flex items-center gap-3" aria-label={`${school.name} home`}>
          <img src={crest} alt="" width={44} height={44} className="size-10 lg:size-11" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[0.98rem] font-semibold tracking-tight text-foreground lg:text-lg">
              Barkhongia
            </span>
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Higher Secondary School
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 xl:flex">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-[0.86rem] font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 xl:ml-2">
          <SearchCommand />
          <ThemeToggle />
          <Button asChild variant="default" className="ml-1 hidden rounded-full sm:inline-flex">
            <Link to="/contact">Admissions</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[19rem] p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center gap-3 border-b border-border p-5">
                <img src={crest} alt="" width={36} height={36} className="size-9" />
                <span className="font-display text-base font-semibold">Barkhongia HS</span>
              </div>
              <nav className="flex flex-col p-2">
                {nav.map((item) => {
                  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium",
                        active ? "bg-secondary text-primary" : "text-foreground/80 hover:bg-secondary",
                      )}
                    >
                      {item.label}
                      <ChevronRight className="size-4 opacity-40" />
                    </Link>
                  );
                })}
                <Button asChild className="mt-3 rounded-full">
                  <Link to="/contact" onClick={() => setOpen(false)}>Admissions Enquiry</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
