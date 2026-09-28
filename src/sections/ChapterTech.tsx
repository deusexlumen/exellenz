import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/SectionHeading";
import { CountUp } from "@/components/CountUp";

const AI_STATS = [
  { value: 30, suffix: " s", label: "Framer AI baut aus einem Prompt eine Landing Page mit sauberem React-Code" },
  { value: 80, prefix: "−", suffix: " %", label: "manuelle Breakpoint-Anpassungen durch Responsive AI (Wix Studio, interne Berichte)" },
  { value: 15, prefix: "+", suffix: " %", label: "durchschnittlich höhere Konversionsrate durch KI-getriebene Layout-Optimierung" },
  { value: 81, suffix: " %", label: "der professionellen Webdesigner: KI ergänzt die Arbeit bis 2026 — ersetzt sie nicht" },
];

const FRAMEWORKS = [
  {
    name: "Astro",
    tag: "Content-first",
    claim: "Zero JavaScript by default",
    body: "Islands Architecture: nur interaktive Komponenten werden hydratisiert, der Rest bleibt statisches HTML. Blog-Kerne erreichen Lighthouse 100/100 mit null JavaScript.",
    fit: "Marketingseiten · Blogs · Docs · Shops",
  },
  {
    name: "Next.js",
    tag: "App-Dominator",
    claim: "60–75 % der Produktionssysteme",
    body: "React-basiertes Meta-Framework mit Server Components und flexiblen Rendering-Strategien (SSR, SSG). Das reife Ökosystem für komplex-interaktive Anwendungen.",
    fit: "SaaS-Dashboards · E-Commerce · Enterprise",
  },
  {
    name: "SvelteKit",
    tag: "Kompiliert schnell",
    claim: "Kein virtuelles DOM",
    body: "Kompilierung in extrem kleine, effiziente Bundles. Herausragende Performance und reibungslose Interaktionen für maximal anspruchsvolle Frontends.",
    fit: "Hochinteraktive Dashboards · PWAs",
  },
  {
    name: "Nuxt",
    tag: "Vue-Ökosystem",
    claim: "Full-Stack für Vue",
    body: "Die äquivalente Wahl für Vue-Entwickler: dieselbe Full-Stack-Erfahrung mit SSR, SSG und automatischen Imports aus dem Vue-Universum.",
    fit: "Vue-Teams · Content-Apps",
  },
];

const MOTION_TOOLS = [
  { name: "GSAP + ScrollTrigger", role: "Komplexe Sequenzen & scroll-gebundene Choreografien" },
  { name: "Framer Motion", role: "De-facto-Standard für deklarative React-Animationen" },
  { name: "CSS scroll-timeline", role: "Scroll-Driven Animations ganz ohne JavaScript" },
  { name: "View Transitions API", role: "Native Zustandsübergänge zwischen DOM-Ansichten" },
];

const STACK_LAYERS = [
  { name: "Meta-Framework", detail: "Astro · Next.js · SvelteKit · Nuxt" },
  { name: "Utility CSS", detail: "Tailwind — JIT erzeugt nur benötigte Klassen" },
  { name: "Komponenten", detail: "shadcn/ui — kopierbare Bausteine auf Radix UI" },
];

export function ChapterTech() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(1);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.from(".tech-stat", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tech-stats", start: "top 80%" },
      });
      gsap.from(".tech-layer", {
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tech-stack", start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="technologie" ref={ref} className="relative bg-ink text-white" aria-label="Kapitel 2: Technologie">
      <div className="px-6 py-24 md:px-24 md:py-36">
        <SectionHeading index="02" eyebrow="Technologische Innovation" title={<>TECHNOLOGIE</>} />

        {/* Agentic AI */}
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h3 className="font-var-display text-3xl leading-tight tracking-tight md:text-4xl">
              Agentic AI —<br />
              <span className="font-serif italic tracking-normal text-white/80">Gestaltung lernt zu handeln</span>
            </h3>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Der Paradigmenwechsel: von statischer Codegenerierung zu Agenten, die im
              Benutzerumfeld agieren, Projektkontext verstehen — etwa eine
              WordPress-Themenstruktur — und nahtlos integrierten Code schreiben.
            </p>
          </div>
          <div className="tech-stats grid grid-cols-2 gap-px bg-white/10 md:col-span-8">
            {AI_STATS.map((s, i) => (
              <div key={i} className="tech-stat bg-ink p-6 md:p-8">
                <div className="tabular font-var-display text-4xl leading-none text-signal md:text-6xl">
                  <CountUp value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix} />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Frameworks accordion */}
        <div className="mt-28">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
            Die Meta-Frameworks — wählen Sie einen Kandidaten
          </div>
          <div className="border-t border-line">
            {FRAMEWORKS.map((f, i) => {
              const active = open === i;
              return (
                <div key={f.name} className="border-b border-line">
                  <button
                    data-hover
                    onClick={() => setOpen(active ? -1 : i)}
                    className="flex w-full items-baseline justify-between gap-6 py-6 text-left md:py-8"
                    aria-expanded={active}
                  >
                    <span className="flex items-baseline gap-5 md:gap-8">
                      <span className="font-mono text-xs text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-var-display text-4xl tracking-tight transition-colors md:text-6xl ${
                          active ? "text-white" : "text-white/35"
                        }`}
                      >
                        {f.name}
                      </span>
                    </span>
                    <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 md:block">
                      {f.tag}
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500"
                    style={{
                      gridTemplateRows: active ? "1fr" : "0fr",
                      transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-6 pb-10 md:grid-cols-12 md:pl-[4.5rem]">
                        <p className="max-w-xl text-sm leading-relaxed text-white/65 md:col-span-7">
                          <span className="mb-2 block font-var-display text-xl text-signal">
                            {f.claim}
                          </span>
                          {f.body}
                        </p>
                        <div className="font-mono text-[11px] uppercase leading-loose tracking-[0.15em] text-white/40 md:col-span-4 md:col-start-9">
                          {f.fit}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motion toolbox + stack layers */}
        <div className="mt-28 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
              Werkzeuge der Bewegung
            </div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-2">
              {MOTION_TOOLS.map((m) => (
                <div key={m.name} data-hover className="group bg-ink p-6 transition-colors duration-200 hover:bg-signal">
                  <div className="font-var-display text-xl tracking-tight group-hover:text-black">
                    {m.name}
                  </div>
                  <div className="mt-2 text-xs leading-relaxed text-white/50 group-hover:text-black/70">
                    {m.role}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-lg text-xs leading-relaxed text-white/45">
              Die Faustregel: Mikro-Interaktionen in reinem CSS, komplexe Sequenzen mit GSAP,
              scroll-getriebene Effekte mit nativen APIs. Animation ist Funktion — sie führt,
              gibt Feedback, verbessert Usability.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
              Die Standard-Ausrüstung
            </div>
            <div className="tech-stack flex flex-col gap-3">
              {STACK_LAYERS.map((l, i) => (
                <div
                  key={l.name}
                  className={`tech-layer border border-line p-5 ${
                    i === 2 ? "bg-signal text-black" : i === 1 ? "bg-coal" : "bg-ink"
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                    Schicht {i + 1}
                  </div>
                  <div className="mt-2 font-var-display text-2xl tracking-tight">{l.name}</div>
                  <div className="mt-1 text-xs opacity-70">{l.detail}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/45">
              Meta-Framework + Tailwind CSS + shadcn/ui: die moderne Standard-Ausrüstung der
              meisten anspruchsvollen Webprojekte.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
