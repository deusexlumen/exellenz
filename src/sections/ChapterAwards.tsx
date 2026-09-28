import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/SectionHeading";

const CASES = [
  {
    name: "Bruno Simon",
    kind: "3D-Umgebung · Three.js/WebGL",
    why: "Die gesamte Website ist eine browserbasierte 3D-Welt: ein steuerbares Fahrzeug, räumliches Audio, interaktive Objekte. Vollständige Immersion als Navigation.",
    honor: "Paradebeispiel Technik × Vision",
  },
  {
    name: "Messenger",
    kind: "Miniatur-Planet · WebGL",
    why: "Ein winziger Planet, auf dem ein Charakter navigiert — planetarische Simulation mit physikalisch basiertem Rendering. Ein Konsolenspiel im Browser.",
    honor: "Site of the Year 2025",
  },
  {
    name: "Lando Norris",
    kind: "Neo-Brutalismus · Kinetische Typo · 3D",
    why: "Auffälliges Lime-Green, scrollreaktive kinetische Typografie und ein rotierender 3D-Helm als Herzstück — mehrere Trends, eine kohärente Marke.",
    honor: "Awwwards SOTY-Finalist 2025",
  },
  {
    name: "The Octopus",
    kind: "Schwarz-Weiß · Piano · Illustration",
    why: "IDEOs Designblog: kohärente Schwarz-Weiß-Thematik, Octopus-Zeichnungen auf der Startseite, sanfte Klaviermusik. Audiovisuelle Immersion im Dienst des Storytellings.",
    honor: "Webby Award 2019",
  },
];

const AGENCIES = ["Active Theory", "Uncommon Studio", "Obys Agency", "Mat Voyce"];
const CRAFTS = [
  "Echtzeit-WebGL in großem Maßstab",
  "Fein austariertes typografisches Motion Design",
  "Narrative trifft editoriale Dynamik",
  "Kinetische Typografie als Deconstruction",
];

export function ChapterAwards() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>(".aw-case").forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: (i % 2) * 0.12,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.from(".aw-score", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".aw-scores", start: "top 85%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="preise" ref={ref} className="relative bg-paper text-black" aria-label="Kapitel 3: Prämierte Werke">
      <div className="px-6 py-24 md:px-24 md:py-36">
        <SectionHeading
          index="03"
          eyebrow="Analyse preisgekrönter Websites"
          title={
            <>
              PRÄMIERTE
              <br />
              <span className="text-outline-ink">WERKE</span>
            </>
          }
          dark
        />

        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <p className="max-w-md text-lg leading-snug md:col-span-5 md:text-xl">
            Die höchsten Auszeichnungen vergeben Juries nicht für die neueste Technologie —
            sondern für die{" "}
            <em className="font-serif italic">harmonische Integration</em> von Design,
            Geschichte und technischer Meisterschaft.
          </p>
          <div className="md:col-span-6 md:col-start-7">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-black/50">
              Was Jury-Checklisten prüfen
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-black/70">
              <li className="flex gap-4">
                <span className="text-signal">—</span>
                Klare Art Direction: jedes visuelle Element verfolgt eine Absicht
              </li>
              <li className="flex gap-4">
                <span className="text-signal">—</span>
                Gerichtete Motion: Übergänge choreografiert, nie harte Sprünge
              </li>
              <li className="flex gap-4">
                <span className="text-signal">—</span>
                60 fps unter realen Bedingungen — gedrosselte CPU, schnelles 3G
              </li>
            </ul>
          </div>
        </div>

        {/* Case studies — asymmetric editorial */}
        <div className="mt-24 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {CASES.map((c, i) => (
            <article
              key={c.name}
              className={`aw-case border-t-2 border-black pt-6 ${
                i % 2 === 1 ? "md:mt-20" : ""
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/50">
                  {c.honor}
                </span>
              </div>
              <h3 className="mt-4 font-var-display text-4xl leading-none tracking-tight md:text-5xl">
                {c.name}
              </h3>
              <div className="mt-2 font-serif text-lg italic text-black/60">{c.kind}</div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-black/70">{c.why}</p>
            </article>
          ))}
        </div>

        {/* Score range */}
        <div className="aw-scores mt-24 border-y-2 border-black py-10">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/50">
                Perfektion ist nicht das Ziel
              </div>
              <div className="mt-4 font-var-display text-3xl leading-tight tracking-tight md:text-4xl">
                Gewinner treffen bewusste
                <br />
                <span className="font-serif italic tracking-normal">Abwägungen.</span>
              </div>
            </div>
            <div className="space-y-6 md:col-span-7">
              {[
                { label: "Awwwards SOTY — Spanne der Gewinner", from: 74.5, to: 86.5 },
                { label: "CSS Design Awards — Kategorieschnitt", from: 80.7, to: 81.1 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-black/50">
                    <span>{s.label}</span>
                    <span>
                      {s.from.toFixed(2).replace(".", ",")} – {s.to.toFixed(2).replace(".", ",")} / 10
                    </span>
                  </div>
                  <div className="relative h-3 w-full border border-black">
                    <div
                      className="aw-score absolute inset-y-0 left-0 bg-signal"
                      style={{
                        left: `${s.from}%`,
                        width: `${s.to - s.from}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs leading-relaxed text-black/55">
                Preisträger punkten dort, wo es zählt — anstatt in jeder Hinsicht perfekt zu sein.
              </p>
            </div>
          </div>
        </div>

        {/* Agencies */}
        <div className="mt-20 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {AGENCIES.map((a, i) => (
            <div key={a} data-hover className="group bg-paper p-6 transition-colors duration-200 hover:bg-black">
              <div className="font-var-display text-xl tracking-tight group-hover:text-paper">{a}</div>
              <div className="mt-2 text-xs leading-relaxed text-black/55 group-hover:text-paper/60">
                {CRAFTS[i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
