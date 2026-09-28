import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/SectionHeading";
import { CountUp } from "@/components/CountUp";

const GUIDELINES = [
  {
    num: "I",
    title: "Restraint & Intentionality",
    body: "Nie alle Trends gleichzeitig. Ein bis zwei Muster, mit großer Überbzeugung und konsistenter Ausführung — die Auswahl folgt Zielgruppe, Markenkern und Kommunikationsziel.",
  },
  {
    num: "II",
    title: "Performance als Zwang",
    body: "WebP/AVIF statt JPEG, WOFF2 (−30 % Dateigröße), Lazy Loading als Standard. Kernfunktionalität muss ohne WebGL bestehen — progressive Verbesserung.",
  },
  {
    num: "III",
    title: "Zugänglichkeit von Tag eins",
    body: "WCAG ist Pflicht — besonders beim Neubrutalismus (Kontraste!). prefers-reduced-motion implementieren, Tastatur-Fokus sichtbar halten.",
  },
  {
    num: "IV",
    title: "Design Tokens als System",
    body: "Farben, Typo-Achsen, Timing, Komponenten: in Figma definiert, via Style Dictionary als CSS Custom Properties übersetzt. Eine Quelle der Wahrheit.",
  },
  {
    num: "V",
    title: "Nachhaltiges Webdesign",
    body: "Dunkelmodus als Standard, leane Schriften, grünes Hosting, reduziertes JavaScript — ökologischer Fußabdruck ist messbarer Branchenstandard.",
  },
];

const IMPACT = [
  { value: 0.5, decimals: 1, suffix: " g", label: "CO₂ erzeugt eine durchschnittliche Seite pro Betrachtung" },
  { value: 47, prefix: "−", suffix: " %", label: "Batterieleistung auf OLED im echten Dunkelmodus (#000000)" },
  { value: 100, suffix: "/100", label: "Lighthouse-Score — erreichbar mit Astro und null JavaScript" },
  { value: 60, suffix: " fps", label: "stabile Bildrate — auch bei 4× CPU-Drosselung und schnellem 3G" },
];

export function ChapterPractice() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.from(".gp-card", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gp-grid", start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="leitlinien" ref={ref} className="relative bg-ink text-white" aria-label="Kapitel 4: Leitlinien">
      <div className="px-6 py-24 md:px-24 md:py-36">
        <SectionHeading index="04" eyebrow="Best Practices & Umsetzung" title={<>LEITLINIEN</>} />

        <div className="gp-grid mt-16 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {GUIDELINES.map((g) => (
            <article key={g.num} data-hover className="gp-card group bg-ink p-8 transition-colors duration-300 hover:bg-coal md:p-10">
              <div className="font-serif text-3xl italic text-signal">{g.num}</div>
              <h3 className="mt-6 font-var-display text-2xl leading-tight tracking-tight">
                {g.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55">{g.body}</p>
            </article>
          ))}
          <article className="gp-card group flex flex-col justify-between bg-signal p-8 text-black md:p-10">
            <div className="font-serif text-3xl italic">VI</div>
            <div>
              <h3 className="font-var-display text-2xl leading-tight tracking-tight">
                Diese Seite ist das Exponat
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-black/70">
                Dunkelmodus als Standard, variable Schriften, GSAP-Choreografie, Bento und
                Neubrutalismus als bewusste, begrenzte Auswahl — das Dossier, demonstriert
                an sich selbst.
              </p>
            </div>
          </article>
        </div>

        {/* Impact numbers */}
        <div className="mt-24 grid gap-10 border-t border-line pt-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
              Zahlen, die verpflichten
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Nachhaltigkeit und Performance sind keine Gegensätze — fast jede Maßnahme
              für den ökologischen Fußabdruck beschleunigt die Seite zugleich.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:col-span-8">
            {IMPACT.map((s, i) => (
              <div key={i}>
                <div className="tabular font-var-display text-5xl leading-none text-signal md:text-7xl">
                  <CountUp
                    value={s.value}
                    decimals={s.decimals ?? 0}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix}
                  />
                </div>
                <p className="mt-3 max-w-xs text-xs leading-relaxed text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
