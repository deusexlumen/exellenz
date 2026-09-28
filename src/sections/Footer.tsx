import { Marquee } from "@/components/Marquee";

const WORDS = [
  "Exzellenz",
  "Visuelle Rebellion",
  "Funktionale Effizienz",
  "Handwerk",
  "Gegen-Signal gegen KI",
  "Choreografierte Motion",
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink text-white" aria-label="Epilog">
      <div className="py-14">
        <Marquee duration={36}>
          {WORDS.map((w, i) => (
            <span key={i} className="flex items-center">
              <span
                className={`px-6 font-var-display text-[10vw] leading-none tracking-tight md:px-10 md:text-[6vw] ${
                  i % 2 === 0 ? "text-white" : "text-outline"
                }`}
              >
                {w}
              </span>
              <span className="text-signal text-3xl md:text-5xl" aria-hidden="true">
                ✳
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="grid gap-12 border-t border-line px-6 py-16 md:grid-cols-12 md:px-24">
        <div className="md:col-span-5">
          <div className="font-var-display text-3xl leading-tight tracking-tight md:text-4xl">
            DAS FUNDAMENT
            <br />
            <span className="font-serif italic tracking-normal text-white/70">der Exzellenz</span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
            Eine immersive Ausstellung des Forschungsdossiers über visuelle, technologische
            und strategische Spitzenleistung im modernen Webdesign — MMXXVI.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Kapitel
            </div>
            <ul className="space-y-2 text-sm text-white/65">
              <li>01 — Ästhetik</li>
              <li>02 — Technologie</li>
              <li>03 — Prämierte Werke</li>
              <li>04 — Leitlinien</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Prinzipien
            </div>
            <ul className="space-y-2 text-sm text-white/65">
              <li>Art Direction</li>
              <li>Gerichtete Motion</li>
              <li>60 fps, immer</li>
              <li>WCAG-Konformität</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Colophon
            </div>
            <ul className="space-y-2 text-sm text-white/65">
              <li>32 Quellen · 4 Kapitel</li>
              <li>React · Vite · Tailwind</li>
              <li>GSAP · Lenis</li>
              <li>Variable Fonts (Archivo)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-line px-6 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 md:flex-row md:items-center md:px-24">
        <span>© MMXXVI — Digitales Atelier</span>
        <span>
          Diese Seite ist <span className="text-signal">selbst das Exponat</span>
        </span>
      </div>
    </footer>
  );
}
