"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/jogadores", label: "Jogadores" },
  { href: "/sistemas-de-rpg", label: "Sistemas" },
];

export default function HeaderMobile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="md:hidden flex flex-col gap-1.5 p-2 transition-opacity hover:opacity-70"
      >
        <span
          className="block h-px w-5 transition-all duration-200"
          style={{
            background: "var(--color-rpg-text-muted)",
            transform: open ? "translateY(5px) rotate(45deg)" : "none",
          }}
        />
        <span
          className="block h-px w-5 transition-all duration-200"
          style={{
            background: "var(--color-rpg-text-muted)",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block h-px w-5 transition-all duration-200"
          style={{
            background: "var(--color-rpg-text-muted)",
            transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* Slide-out overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(5,3,5,0.6)" }}
            onClick={() => setOpen(false)}
          />

          {/* Menu panel */}
          <nav
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col pt-16 px-8 gap-6 font-mono text-xs tracking-widest uppercase border-l"
            style={{
              width: "220px",
              background: "rgba(5,3,5,0.97)",
              borderColor: "var(--color-rpg-border)",
            }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-[var(--color-rpg-gold-light)]"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </>
  );
}
