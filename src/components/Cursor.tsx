import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");
    return () => document.body.classList.remove("custom-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const pos = { x: -100, y: -100, rx: -100, ry: -100 };
    let hover = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hover = !!t.closest("a, button, [data-hover]");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    const tick = () => {
      pos.rx += (pos.x - pos.rx) * 0.16;
      pos.ry += (pos.y - pos.ry) * 0.16;
      if (dotRef.current)
        gsap.set(dotRef.current, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 });
      if (ringRef.current) {
        gsap.set(ringRef.current, {
          x: pos.rx,
          y: pos.ry,
          xPercent: -50,
          yPercent: -50,
          scale: hover ? 2.4 : 1,
        });
      }
    };
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      gsap.ticker.remove(tick);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-white mix-blend-difference pointer-events-none will-change-transform"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference pointer-events-none will-change-transform"
        aria-hidden="true"
      />
    </>
  );
}
