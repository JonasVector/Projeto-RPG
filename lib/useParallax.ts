import { useEffect, useRef } from "react";

/**
 * Aplica parallax suave ao elemento referenciado.
 * O elemento se move `scrollY * factor` pixels no eixo Y.
 * Use `factor` baixo (0.25–0.4) para efeito sutil.
 */
export function useParallax(factor = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = () => {
      el.style.transform = `translateY(${window.scrollY * factor}px)`;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [factor]);

  return ref;
}
