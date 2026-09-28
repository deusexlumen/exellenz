import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Kinetic manifesto: each word scrubs from dim to full brightness
 * while the variable font weight swells with scroll progress.
 */
export function KineticStatement({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(".ks-word", { opacity: 1 });
        return;
      }
      gsap.fromTo(
        ".ks-word",
        { opacity: 0.12, fontVariationSettings: '"wdth" 75, "wght" 300' },
        {
          opacity: 1,
          fontVariationSettings: '"wdth" 75, "wght" 700',
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <p
      ref={ref}
      className={`font-var-display text-[7.2vw] leading-[1.04] tracking-tight text-white md:text-[4.2vw] ${className}`}
    >
      {words.map((w, i) => (
        <span key={i} className="ks-word inline-block mr-[0.28em]">
          {w}
        </span>
      ))}
    </p>
  );
}
