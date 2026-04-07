"use client";

import OrnamentLine from "@/components/ui/OrnamentLine";
import HeroParticles from "@/components/home/HeroParticles";
import { useParallax } from "@/lib/useParallax";

export default function SistemasHero() {
  const bgRef = useParallax(0.22);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden border-b"
      style={{
        minHeight: "38vh",
        borderColor: "var(--color-rpg-border)",
        background: "#050305",
      }}
    >
      <div
        ref={bgRef}
        className="hero-bg absolute"
        style={{ inset: "-15% -5%", zIndex: 0 }}
      />
      <HeroParticles />

      <div className="relative z-10 text-center px-6 py-14 w-full max-w-3xl mx-auto">
        <div className="animate-fade-rise">
          <OrnamentLine color="#c9a227" opacity={0.35} />
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-4 mt-2 animate-fade-rise-d1"
          style={{ color: "var(--color-rpg-bronze)", opacity: 0.6 }}
        >
          Multiverso de RPG
        </span>
        <h1
          className="font-display font-extrabold text-4xl md:text-5xl tracking-wider glow-pulse-gold animate-fade-rise-d2"
          style={{ color: "var(--color-rpg-gold-light)" }}
        >
          Sistemas de RPG
        </h1>
        <p
          className="text-lg mt-3 animate-fade-rise-d3"
          style={{ color: "var(--color-rpg-text-muted)" }}
        >
          Selecione um sistema para explorar seus personagens
        </p>
        <div className="animate-fade-rise-d3 mt-2">
          <OrnamentLine color="#c9a227" opacity={0.2} />
        </div>
      </div>
    </section>
  );
}
