import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Buttery smooth scroll wired into GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.09, duration: 1.15, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
