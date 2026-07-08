import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { nav, downloads, notices } from "@/lib/site-data";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate({ to });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search the site"
        onClick={() => setOpen(true)}
        className="rounded-full text-foreground/70 hover:text-foreground"
      >
        <Search className="size-[1.1rem]" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, notices, downloads..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {nav.map((n) => (
              <CommandItem key={n.to} value={n.label} onSelect={() => go(n.to)}>
                {n.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Notices">
            {notices.slice(0, 5).map((n) => (
              <CommandItem key={n.id} value={n.title} onSelect={() => go("/notices")}>
                {n.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Downloads">
            {downloads.map((d) => (
              <CommandItem key={d.title} value={d.title} onSelect={() => go("/downloads")}>
                {d.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
