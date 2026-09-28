import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Animated statistic that counts up when it enters the viewport. */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const obj = { v: 0 };
      const render = () => {
        el.textContent = `${prefix}${obj.v.toFixed(decimals).replace(".", ",")}${suffix}`;
      };
      if (reduced) {
        obj.v = value;
        render();
        return;
      }
      gsap.to(obj, {
        v: value,
        duration: 1.8,
        ease: "power3.out",
        onUpdate: render,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}
