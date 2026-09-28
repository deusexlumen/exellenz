import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/SectionHeading";
import { CountUp } from "@/components/CountUp";

const BENTO_CELLS = [
  { area: "a", title: "CSS Grid", note: "grid-template-areas platziert jede Zelle exakt", big: true },
  { area: "b", title: "6–9 Zellen", note: "Expertenempfehlung für maximale Klarheit" },
  { area: "c", title: "Apple-Effekt", note: "Promoted in Mac-Keynotes weltweit" },
  { area: "d", title: "Asymmetrie", note: "löst das starre Zwölfsäulen-Raster auf" },
  { area: "e", title: "Grid Lanes", note: "fluid statt DOM-Neuaufbau auf Mobile", accent: true },
  { area: "f", title: "Lunchbox", note: "inspiriert von japanischen Bentō" },
];

const TRENDS = [
  {
    name: "Neubrutalismus",
    traits: "border-radius: 0 · harte Schatten 5px · flache Farbfelder · exzentrische Typo",
    tech: "CSS Borders, Box-Shadow, Custom Properties",
    use: "Markenportraits, Start-up-Rebrands, CTAs",
  },
  {
    name: "Bento Grid",
    traits: "Modulare, variabel dimensionierte Zellen · hohe Informationsdichte",
    tech: "CSS Grid, grid-template-areas",
    use: "Feature-Übersichten, Case Studies, Portfolios",
  },
  {
    name: "Glassmorphism 2.0",
    traits: "backdrop-filter: blur() · dynamischer Blur · strategische Transparenz",
    tech: "CSS, Gradienten, Z-Index",
    use: "Navbars, Modals, Dashboards",
  },
  {
    name: "3D / WebGL",
    traits: "Interaktive Modelle · immersive Heroes · Micro-Animationen",
    tech: "Three.js, Spline, React Three Fiber",
    use: "Kreative Portfolios, Konfiguratoren",
  },
  {
    name: "Variable Fonts",
    traits: "Gewicht, Breite & Neigung in einer Datei · responsive Typo",
    tech: "OpenType, font-variation-settings",
    use: "Dynamische Brand-Systeme, Performance",
  },
];

const TOKENS = [
  { label: "border-radius: 0", desc: "Schachtel-Optik ohne Abrundung" },
  { label: "box-shadow: 5px 5px 0", desc: "Hartes Licht, dreistufig standardisiert" },
  { label: "2–3 Hauptfarben", desc: "Kategorische Palette, keine Gradienten" },
  { label: "Große Display-Type", desc: "Kühne Headlines, ruhiger Fließtext" },
];

export function ChapterAesthetics() {
  const ref = useRef<HTMLElement>(null);
  const [token, setToken] = useState<number | null>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.from(".ae-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".ae-grid", start: "top 78%" },
      });
      gsap.from(".ae-bento-cell", {
        scale: 0.92,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".ae-bento", start: "top 75%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="aesthetik" ref={ref} className="relative bg-signal text-black" aria-label="Kapitel 1: Ästhetik">
      <div className="px-6 py-24 md:px-24 md:py-36">
        <SectionHeading
          index="01"
          eyebrow="Visuelle Spitzenleistung"
          title={<>ÄSTHETIK</>}
          dark
        />

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <p className="ae-reveal text-xl leading-snug md:col-span-5 md:text-2xl">
            Das visuelle Terrain von 2026 ist eine bewusste Spannung:{" "}
            <em className="font-serif italic">emotionale Rebellion</em> gegen sterile
            KI-Perfektion — und <em className="font-serif italic">funktionale Effizienz</em>,
            die komplexe Information klar strukturiert.
          </p>
          <p className="ae-reveal max-w-xl text-sm leading-relaxed text-black/70 md:col-span-5 md:col-start-8">
            Der Neubrutalismus ist die prominenteste Gegenbewegung: sichtbares menschliches
            Handwerk als kommerziell nutzbare Gestaltungsgrammatik. Anti-Design und Digital
            Scrapbooking setzen absichtliche Unvollkommenheit als Authentizitäts-Signal. Dem
            stehen Bento Grids und 3D-Immersion als strukturelle Antworten gegenüber.
          </p>
        </div>

        {/* ---- Neubrutalism live specimen + token inspector ---------------- */}
        <div className="ae-grid mt-24 grid gap-10 md:grid-cols-12 md:items-stretch">
          <div className="md:col-span-6">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-black/60">
              Lebendes Exponat — Neubrutalismus
            </div>
            <div className="group border-2 border-black bg-ink p-8 text-white shadow-[8px_8px_0_0_#000] transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] md:p-12">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">
                Gumroad · Kreative Plattform
              </div>
              <div className="mt-6 font-var-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
                INDIVIDUALITÄT
                <br />
                <span className="text-outline">STATT</span>
                <br />
                TEMPLATE
              </div>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
                Hoher Kontrast, blockige Layouts, dicke Rahmen — rebellische Energie,
                übersetzt in eine marktfähige Ästhetik. Rebellion als System, nicht als Zufall.
              </p>
              <div className="mt-8 inline-block border-2 border-white bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors duration-0 group-hover:bg-white group-hover:text-black">
                Rebellion ist handwerklich
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-6">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-black/60">
              Gestaltungs-Tokens — berühren Sie sie
            </div>
            <div className="flex flex-1 flex-col border-2 border-black">
              {TOKENS.map((t, i) => (
                <button
                  key={i}
                  data-hover
                  onMouseEnter={() => setToken(i)}
                  onMouseLeave={() => setToken(null)}
                  onFocus={() => setToken(i)}
                  onBlur={() => setToken(null)}
                  className={`flex flex-1 items-center justify-between gap-6 border-b-2 border-black px-6 py-5 text-left transition-colors duration-150 last:border-b-0 md:px-8 ${
                    token === i ? "bg-black text-signal" : "bg-transparent"
                  }`}
                >
                  <span className="font-mono text-sm md:text-base">{t.label}</span>
                  <span
                    className={`hidden text-right text-xs md:block ${
                      token === i ? "text-white/70" : "text-black/50"
                    }`}
                  >
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-black/60">
              {token !== null
                ? TOKENS[token].desc + "."
                : "Jede Regel ist ein Token — standardisiert für Konsistenz und Hierarchie."}
            </p>
          </div>
        </div>

        {/* ---- Bento Grid — self-demonstrating ------------------------------ */}
        <div className="ae-bento mt-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-black/60">
                Lebendes Exponat — Bento Grid
              </div>
              <h3 className="font-var-display text-4xl leading-none tracking-tight md:text-6xl">
                DIE LUNCHBOX
                <br />
                <span className="font-serif italic tracking-normal">des Informationsdesigns</span>
              </h3>
            </div>
            <div className="tabular font-var-display text-6xl leading-none text-black/90 md:text-8xl">
              <CountUp value={23} suffix="%" />
            </div>
          </div>
          <p className="mb-10 max-w-lg text-sm leading-relaxed text-black/70">
            Seiten mit Bento-Grids erreichen im Schnitt{" "}
            <strong className="text-black">23&nbsp;% mehr Bildschirmtiefe</strong> — die flexible
            Anordnung führt das Auge. Diese Zelle hier ist selbst ein Bento: asymmetrisch,
            modular, per grid-template-areas gesetzt.
          </p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 [&>*]:min-h-[130px] md:[&>*]:min-h-[170px]">
            {BENTO_CELLS.map((c) => (
              <div
                key={c.area}
                className={`ae-bento-cell flex flex-col justify-between border-2 p-5 transition-transform duration-300 hover:-translate-y-1 md:p-6 ${
                  c.accent
                    ? "border-black bg-black text-signal"
                    : c.big
                      ? "border-black bg-ink text-white md:col-span-2 md:row-span-2"
                      : "border-black bg-paper text-black"
                }`}
                style={{ gridArea: undefined }}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                    c.accent ? "text-white/50" : c.big ? "text-white/40" : "text-black/50"
                  }`}
                >
                  {String(BENTO_CELLS.indexOf(c) + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-var-display text-2xl leading-none tracking-tight md:text-3xl">
                    {c.title}
                  </div>
                  <div
                    className={`mt-2 text-xs leading-snug ${
                      c.accent ? "text-white/60" : c.big ? "text-white/50" : "text-black/60"
                    }`}
                  >
                    {c.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Trend matrix -------------------------------------------------- */}
        <div className="mt-28">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-black/60">
            Trend-Matrix 2026
          </div>
          <div className="border-t-2 border-black">
            {TRENDS.map((t) => (
              <div
                key={t.name}
                data-hover
                className="group grid gap-2 border-b-2 border-black py-6 transition-colors duration-200 hover:bg-black hover:text-signal md:grid-cols-12 md:items-baseline md:gap-6 md:px-4"
              >
                <div className="font-var-display text-2xl tracking-tight md:col-span-3 md:text-3xl">
                  {t.name}
                </div>
                <div className="text-xs leading-relaxed opacity-70 md:col-span-4 md:text-sm">
                  {t.traits}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider opacity-60 md:col-span-3">
                  {t.tech}
                </div>
                <div className="text-xs opacity-60 md:col-span-2 md:text-right">
                  {t.use}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
