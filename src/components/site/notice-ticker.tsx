import { ticker } from "@/lib/site-data";
import { Megaphone } from "lucide-react";

export function NoticeTicker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="border-y border-border bg-primary text-primary-foreground">
      <div className="flex items-stretch">
        <div className="hidden shrink-0 items-center gap-2 bg-saffron px-4 text-saffron-foreground sm:flex">
          <Megaphone className="size-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Latest</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="animate-ticker flex w-max gap-10 whitespace-nowrap py-2.5 pl-5">
            {items.map((t, i) => (
              <span key={i} className="flex items-center gap-3 text-sm">
                <span className="inline-block size-1.5 rounded-full bg-saffron" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
