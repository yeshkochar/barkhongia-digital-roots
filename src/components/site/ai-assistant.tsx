import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { school, faqs, subjects } from "@/lib/site-data";

type Msg = { role: "bot" | "user"; text: string };

const suggestions = ["Admissions", "Subjects", "School timings", "Facilities", "Downloads"];

function answer(q: string): string {
  const t = q.toLowerCase();
  if (/(admission|apply|enrol|join)/.test(t))
    return "Class IX admissions usually open in late March, ahead of the April session. As a government school, education is free. Check the Notice Board for the current schedule, or use the Admissions Enquiry form on the Contact page.";
  if (/(subject|stream|course|syllabus)/.test(t))
    return `We offer: ${subjects.map((s) => s.name).join(", ")}. The medium of instruction is ${school.medium}, with English as a core language.`;
  if (/(time|timing|hour|open|close)/.test(t))
    return "The school runs Monday to Saturday, 9:30 AM to 3:00 PM, with a revised timing during the summer term.";
  if (/(facilit|lab|computer|playground|water|toilet|electric)/.test(t))
    return "Our campus has a government building, computer lab, science facilities, playground, safe drinking water, electricity and separate toilets. See the Facilities page for details.";
  if (/(download|form|prospectus|question paper|circular|timetable)/.test(t))
    return "You can download admission forms, the prospectus, syllabus, question papers, timetable and circulars from the Downloads page.";
  if (/(event|festival|function|sport|exhibition)/.test(t))
    return "We celebrate Saraswati Puja, the Annual Sports Meet, Science Exhibition, Independence Day and the Annual Function. See the Events page for the calendar.";
  if (/(contact|phone|email|address|location|where)/.test(t))
    return `Reach us at ${school.phone} or ${school.email}. Address: ${school.address}.`;
  if (/(class|grade)/.test(t))
    return "The school currently offers Classes IX and X under the Assam board curriculum.";
  const match = faqs.find((f) => t.split(" ").some((w) => w.length > 3 && f.q.toLowerCase().includes(w)));
  if (match) return match.a;
  return "I can help with admissions, subjects, timings, facilities, events, downloads and contact details. Try one of the suggestions below, or ask in your own words.";
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: `Namaskar! I'm the ${school.shortName} assistant. How can I help you today?` },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { role: "bot", text: answer(clean) }]), 350);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open school assistant"}
        className="fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex h-[30rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center gap-2 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <Sparkles className="size-4" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">School Assistant</p>
                <p className="text-[0.68rem] opacity-80">Typically replies instantly</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2 text-sm text-secondary-foreground"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="border-t border-border p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="h-9"
                  aria-label="Message the school assistant"
                />
                <Button type="submit" size="icon" className="size-9 shrink-0" aria-label="Send">
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
