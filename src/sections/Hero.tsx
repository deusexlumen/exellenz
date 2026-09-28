import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Star-like particle field on canvas; particles drift and shy away from the cursor. */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; tw: number };
    let particles: P[] = [];

    const seed = () => {
      const count = Math.min(160, Math.floor((w * h) / 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.4,
        c: Math.random() < 0.14 ? "#FF1841" : "rgba(255,255,255,0.9)",
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const step = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          const d = Math.sqrt(d2) || 1;
          p.vx += (dx / d) * 0.06;
          p.vy += (dy / d) * 0.06;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        const twinkle = 0.55 + 0.45 * Math.sin(t / 700 + p.tw);
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    };

    resize();
    if (reduced) {
      // Static constellation for reduced motion
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
      raf = requestAnimationFrame(step);
    }
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!started) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".hero-line", {
        yPercent: 115,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.14,
      })
        .from(".hero-meta", { opacity: 0, y: 14, duration: 0.7, stagger: 0.08 }, "-=0.6")
        .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.3");

      gsap.to(".hero-inner", {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [started] }
  );

  return (
    <section
      id="prolog"
      ref={ref}
      className="relative flex min-h-screen flex-col overflow-hidden"
      aria-label="Prolog"
    >
      <ParticleField />

      {/* faint oversized watermark */}
      <div
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-var-display text-[38vw] leading-none text-outline opacity-[0.07]"
        aria-hidden="true"
      >
        E
      </div>

      <div className="hero-inner relative z-10 flex flex-1 flex-col justify-between px-6 pb-10 pt-24 md:px-24 md:pt-28">
        <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
          <span className="hero-meta">Forschungsdossier — 2026</span>
          <span className="hero-meta hidden md:block">4 Kapitel · 32 Quellen</span>
        </div>

        <div className="mt-10 md:mt-0">
          <div className="hero-meta mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-signal">
            Visuelle Rebellion × Funktionale Effizienz
          </div>
          <h1 className="font-var-display text-[13.5vw] leading-[0.9] tracking-tight md:text-[9.5vw]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">DAS FUNDAMENT</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">
                <em className="font-serif font-normal italic tracking-normal text-white/90">der</em>{" "}
                <span className="text-signal">EXZELLENZ</span>
              </span>
            </span>
          </h1>
          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <p className="hero-meta max-w-md text-sm leading-relaxed text-white/60 md:col-span-5 md:text-base">
              Strategien für visuelle, technologische und strategische Spitzenleistung im
              modernen Webdesign — als immersive Ausstellung. Jede These wird hier nicht
              beschrieben, sondern lebendig demonstriert.
            </p>
            <div className="hero-meta flex gap-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:col-span-7 md:justify-end">
              <span>Neubrutalismus</span>
              <span>Bento Grid</span>
              <span>WebGL</span>
              <span className="hidden lg:inline">Variable Fonts</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll flex flex-col gap-3 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 md:flex-row md:items-center md:justify-between">
          <span className="flex items-center gap-3">
            <span className="inline-block h-8 w-px bg-signal" />
            Scrollen Sie hinab
          </span>
          <span className="tabular">N 52°31′ — Digitales Atelier</span>
        </div>
      </div>
    </section>
  );
}
