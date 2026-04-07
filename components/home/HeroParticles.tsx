"use client";

import { useMemo } from "react";

export default function HeroParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => {
        const s = (i + 1) * 137;
        return {
          id: i,
          left: (s * 7) % 100,
          size: 1 + ((s * 13) % 20) / 10,
          duration: 10 + ((s * 19) % 8),
          delay: (s * 23) % 10,
          color: i % 2 === 0 ? "#c9a227" : "#b87333",
        };
      }),
    []
  );

  return (
    <div className="ember-bg" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ember"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}
