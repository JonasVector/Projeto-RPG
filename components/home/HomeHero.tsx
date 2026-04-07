"use client";

import Link from "next/link";
import OrnamentLine from "@/components/ui/OrnamentLine";
import HeroParticles from "@/components/home/HeroParticles";
import { useParallax } from "@/lib/useParallax";

interface HomeHeroProps {
  characterCount: number;
}

export default function HomeHero({ characterCount }: HomeHeroProps) {
  const bgRef = useParallax(0.28);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden border-b"
      style={{
        minHeight: "100svh",
        borderColor: "var(--color-rpg-border)",
        background: "#050305",
      }}
    >
      {/* Parallax background layer */}
      <div
        ref={bgRef}
        className="hero-bg absolute"
        style={{ inset: "-15% -5%", zIndex: 0 }}
      />

      {/* Amber particles — fixed position, renders over full page */}
      <HeroParticles />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 py-24 md:py-32 max-w-4xl mx-auto w-full">
        <div className="animate-fade-rise">
          <OrnamentLine color="#c9a227" opacity={0.4} />
        </div>

        <span
          className="font-mono text-[10px] uppercase tracking-[0.4em] block mb-5 mt-2 animate-fade-rise-d1"
          style={{ color: "var(--color-rpg-gold)", opacity: 0.55 }}
        >
          Central de Fichas &middot; Multi-Sistema
        </span>

        <h1
          className="font-display font-black leading-none tracking-wider glow-pulse-gold animate-fade-rise-d1"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 9rem)",
            color: "#e8c85a",
          }}
        >
          AKASHARIUM
        </h1>

        <p
          className="font-body italic text-xl mt-6 max-w-lg mx-auto leading-relaxed animate-fade-rise-d2"
          style={{ color: "var(--color-rpg-text-muted)" }}
        >
          Gerencie fichas de personagens de múltiplos sistemas de RPG em um único lugar.
          Visualize, edite e organize suas aventuras.
        </p>

        <div className="animate-fade-rise-d2">
          <OrnamentLine color="#c9a227" opacity={0.25} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-rise-d3">
          <Link
            href="/sistemas-de-rpg"
            className="shimmer-btn font-mono text-xs uppercase tracking-[0.2em] px-10 py-3 border transition-colors"
            style={{
              borderColor: "#c9a227",
              color: "#c9a227",
              background: "rgba(201,162,39,0.08)",
            }}
          >
            <span className="relative z-10">Explorar Sistemas</span>
          </Link>

          {characterCount > 0 && (
            <a
              href="#personagens"
              className="font-mono text-xs uppercase tracking-[0.2em] px-10 py-3 border transition-colors hover:border-[rgba(201,162,39,0.4)]"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                color: "var(--color-rpg-text-muted)",
              }}
            >
              Ver Personagens ({characterCount})
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
