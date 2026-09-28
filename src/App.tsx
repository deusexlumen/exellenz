import { useCallback, useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Grain } from "@/components/Grain";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { KineticStatement } from "@/components/KineticStatement";
import { Hero } from "@/sections/Hero";
import { ChapterAesthetics } from "@/sections/ChapterAesthetics";
import { ChapterTech } from "@/sections/ChapterTech";
import { ChapterAwards } from "@/sections/ChapterAwards";
import { ChapterPractice } from "@/sections/ChapterPractice";
import { Footer } from "@/sections/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const onLoaded = useCallback(() => setLoaded(true), []);

  return (
    <SmoothScroll>
      <Preloader onDone={onLoaded} />
      <Cursor />
      <Grain />
      <Nav visible={loaded} />

      <main>
        <Hero started={loaded} />

        {/* Transition — kinetic manifesto */}
        <section className="relative bg-ink px-6 py-32 md:px-24 md:py-48" aria-label="Manifest">
          <div className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
            <span className="text-signal">Manifest</span> — gelesen wird mit dem Scrollen
          </div>
          <KineticStatement text="Gutes Design ist keine Ansammlung von Effekten. Es ist eine kohärente Vision, in der jedes Element eine Absicht verfolgt — Technologie im Dienst der Geschichte, Motion mit einer Richtung, Perfektion bewusst dem Charakter geopfert." />
        </section>

        <ChapterAesthetics />
        <ChapterTech />
        <ChapterAwards />
        <ChapterPractice />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
