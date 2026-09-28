import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Chapter header: mono eyebrow + huge display title revealed line by line. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  dark = false,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.from(".sh-line", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
      gsap.from(".sh-eyebrow", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      <div
        className={`sh-eyebrow mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] ${
          dark ? "text-black/60" : "text-white/50"
        }`}
      >
        <span className="text-signal">{index}</span>
        <span className={`h-px w-12 ${dark ? "bg-black/30" : "bg-white/25"}`} />
        <span>{eyebrow}</span>
      </div>
      <h2
        className={`font-var-display text-[13vw] leading-[0.92] tracking-tight md:text-[7.5vw] ${
          dark ? "text-black" : "text-white"
        }`}
      >
        <span className="block overflow-hidden pb-1">
          <span className="sh-line block">{title}</span>
        </span>
      </h2>
    </div>
  );
}
