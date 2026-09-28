import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const CHAPTERS = [
  { id: "prolog", num: "00", label: "Prolog" },
  { id: "aesthetik", num: "01", label: "Ästhetik" },
  { id: "technologie", num: "02", label: "Technologie" },
  { id: "preise", num: "03", label: "Prämierte Werke" },
  { id: "leitlinien", num: "04", label: "Leitlinien" },
];

export function Nav({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const triggers: ScrollTrigger[] = [];
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            document
              .querySelectorAll(`[data-chapter="${c.id}"]`)
              .forEach((n) => n.classList.toggle("is-active", self.isActive));
          },
        })
      );
    });
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleY(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("scroll", onScroll);
    };
  }, [visible]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  };

  return (
    <nav
      ref={ref}
      className={`fixed left-0 top-0 z-[9000] mix-blend-difference transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Kapitelnavigation"
    >
      {/* Left rail — desktop */}
      <div className="hidden md:flex h-screen w-16 flex-col items-center justify-between border-r border-white/10 py-6">
        <button
          onClick={() => jump("prolog")}
          className="font-var-display text-sm tracking-tight text-white"
          data-hover
          aria-label="Zum Anfang"
        >
          E—26
        </button>
        <ul className="flex flex-col gap-5">
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <button
                data-chapter={c.id}
                onClick={() => jump(c.id)}
                data-hover
                className="group flex flex-col items-center gap-1"
                aria-label={`Kapitel ${c.num}: ${c.label}`}
              >
                <span className="font-mono text-[9px] tracking-widest text-white/40 transition-colors group-[.is-active]:text-signal">
                  {c.num}
                </span>
                <span className="block h-6 w-px bg-white/25 transition-all duration-300 group-[.is-active]:h-10 group-[.is-active]:bg-signal" />
              </button>
            </li>
          ))}
        </ul>
        <span className="writing-vertical font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
          Exzellenz · Webdesign 2026
        </span>
      </div>

      {/* Progress line */}
      <div className="fixed right-0 top-0 z-[9000] h-screen w-px bg-white/10">
        <div ref={progressRef} className="h-full w-full origin-top bg-signal" style={{ transform: "scaleY(0)" }} />
      </div>

      {/* Mobile top bar */}
      <div className="fixed left-0 top-0 flex w-full items-center justify-between border-b border-white/10 bg-ink/0 px-5 py-4 md:hidden">
        <span className="font-var-display text-sm text-white">E—26</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
          Das Fundament der Exzellenz
        </span>
      </div>
    </nav>
  );
}
