import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const GREETING = "DAS FUNDAMENT";

export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setGone(true);
      onDone();
      return;
    }
    document.documentElement.style.overflow = "hidden";

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        onDone();
        setGone(true);
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current)
          counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
      },
    })
      .to(".pre-letter", {
        yPercent: -120,
        stagger: 0.035,
        duration: 0.6,
        ease: "power3.in",
      }, "-=0.5")
      .to(rootRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      }, "-=0.1");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex flex-col justify-between bg-ink px-6 py-8 md:px-12"
      role="status"
      aria-label="Lädt"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
        <span>Forschungsdossier — MMXXVI</span>
        <span className="text-signal">Visuelle Rebellion × Funktionale Effizienz</span>
      </div>

      <div className="overflow-hidden self-center">
        <h1 className="flex flex-wrap justify-center" aria-label={GREETING}>
          {GREETING.split("").map((c, i) => (
            <span
              key={i}
              className="pre-letter inline-block font-var-display text-[11vw] leading-none tracking-tight text-white md:text-[7vw]"
              style={{ transform: "translateY(0%)" }}
            >
              {c === " " ? " " : c}
            </span>
          ))}
        </h1>
      </div>

      <div className="flex items-end justify-between">
        <div className="w-40 md:w-64">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
            Exzellenz wird geladen
          </div>
          <div className="h-px w-full bg-white/15">
            <div ref={barRef} className="h-px origin-left scale-x-0 bg-signal" />
          </div>
        </div>
        <span
          ref={counterRef}
          className="tabular font-var-display text-6xl leading-none text-white md:text-8xl"
        >
          000
        </span>
      </div>
    </div>
  );
}
