"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroParticles from "@/components/home/HeroParticles";
import CreatePlayerModal from "@/components/players/CreatePlayerModal";
import SystemIcon from "@/components/ui/SystemIcon";

interface SheetPreview {
  id: string;
  name: string;
  system: string;
  systemLabel: string;
  systemAccent: string;
  class: string;
  race: string;
  level: number;
  href: string;
}

interface SystemData {
  id: string;
  label: string;
  icon: string;
  accent: string;
  glow: string;
  count: number;
}

interface PlayerData {
  id: string;
  displayName: string;
  role: string;
  totalCharacters: number;
  primarySystem: string;
  activeSince: string;
}

interface DashboardProps {
  stats: {
    totalSheets: number;
    totalPlayers: number;
    totalSystems: number;
  };
  recentSheets: SheetPreview[];
  systems: SystemData[];
  players: PlayerData[];
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: EASE },
  }),
};

function StatCard({
  label,
  value,
  accent,
  index,
}: {
  label: string;
  value: string | number;
  accent: string;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="show"
      variants={fadeUp}
      className="relative overflow-hidden border p-5"
      style={{
        background: "rgba(20,16,12,0.85)",
        borderColor: `${accent}30`,
        borderTop: `2px solid ${accent}`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 100% 0%, ${accent}12 0%, transparent 65%)`,
        }}
      />
      <span
        className="font-display font-black text-3xl block"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span
        className="font-mono text-[10px] uppercase tracking-widest block mt-1"
        style={{ color: "var(--color-rpg-text-muted)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function RecentSheetCard({ sheet, index }: { sheet: SheetPreview; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="show"
      variants={fadeUp}
    >
      <Link href={sheet.href} className="block group">
        <div
          className="border p-4 transition-all duration-200 flex items-center gap-4 group-hover:-translate-y-0.5"
          style={{
            background: "rgba(15,10,8,0.9)",
            borderColor: `${sheet.systemAccent}28`,
            borderLeft: `3px solid ${sheet.systemAccent}`,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = `${sheet.systemAccent}60`;
            el.style.boxShadow = `0 4px 20px ${sheet.systemAccent}18`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = `${sheet.systemAccent}28`;
            el.style.boxShadow = "none";
          }}
        >
          <div
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center font-display border"
            style={{
              background: `${sheet.systemAccent}12`,
              borderColor: `${sheet.systemAccent}35`,
            }}
          >
            <SystemIcon systemId={sheet.system} size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="font-display font-semibold text-sm tracking-wide truncate"
              style={{ color: "var(--color-rpg-text)" }}
            >
              {sheet.name}
            </div>
            <div
              className="font-mono text-[9px] uppercase tracking-widest mt-0.5 truncate"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              {sheet.systemLabel} · {sheet.class || "—"} · Nv {sheet.level}
            </div>
          </div>
          <span
            className="font-mono text-xs opacity-30 group-hover:opacity-70 transition-opacity flex-shrink-0"
            style={{ color: sheet.systemAccent }}
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function SystemPill({ sys, index }: { sys: SystemData; index: number }) {
  return (
    <motion.div custom={index} initial="hidden" animate="show" variants={fadeUp}>
      <Link
        href={`/sistemas-de-rpg/${sys.id}/jogadores`}
        className="group flex items-center gap-3 border p-3 transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: "rgba(15,10,8,0.9)",
          borderColor: `${sys.accent}28`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = `${sys.accent}55`;
          el.style.boxShadow = `0 6px 24px ${sys.glow}`;
          el.style.background = `radial-gradient(ellipse at 50% 0%, ${sys.accent}14 0%, rgba(15,10,8,0.9) 70%)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = `${sys.accent}28`;
          el.style.boxShadow = "none";
          el.style.background = "rgba(15,10,8,0.9)";
        }}
      >
        <div
          className="w-8 h-8 flex items-center justify-center flex-shrink-0"
          style={{ filter: `drop-shadow(0 0 6px ${sys.accent}88)` }}
        >
          <SystemIcon systemId={sys.id} size={32} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="font-display font-semibold text-sm truncate"
            style={{ color: "var(--color-rpg-gold-light)" }}
          >
            {sys.label}
          </div>
          <div
            className="font-mono text-[9px] uppercase tracking-widest"
            style={{ color: "var(--color-rpg-text-muted)" }}
          >
            {sys.count} {sys.count === 1 ? "personagem" : "personagens"}
          </div>
        </div>
        <span
          className="font-mono text-xs opacity-30 group-hover:opacity-60 transition-opacity"
          style={{ color: sys.accent }}
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}

export default function DashboardClient({
  stats,
  recentSheets,
  systems,
  players,
}: DashboardProps) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <HeroParticles />

      {/* ── Compact masthead ── */}
      <header
        className="relative overflow-hidden border-b"
        style={{
          background: "linear-gradient(165deg, #060404 0%, #100a08 55%, #060404 100%)",
          borderColor: "rgba(184,115,51,0.18)",
          minHeight: "38vh",
        }}
      >
        {/* noise + glow layers */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
              radial-gradient(ellipse at 30% 50%, rgba(80,0,120,0.10) 0%, transparent 55%),
              radial-gradient(ellipse at 75% 30%, rgba(184,115,51,0.08) 0%, transparent 55%)
            `,
            backgroundSize: "300px 300px, 100% 100%, 100% 100%",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center py-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.35em] block mb-3"
              style={{ color: "var(--color-rpg-text-muted)" }}
            >
              Central de Fichas · Multi-Sistema
            </span>
            <h1
              className="font-display font-black leading-none tracking-wider glow-pulse-gold"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 6rem)",
                color: "#e8c85a",
              }}
            >
              AKASHARIUM
            </h1>
            <p
              className="font-body italic mt-3 max-w-md"
              style={{ color: "var(--color-rpg-text-muted)", fontSize: "1rem" }}
            >
              Gerencie fichas de personagens de múltiplos sistemas em um único lugar.
            </p>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Link
              href="/jogadores"
              className="shimmer-btn font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-2.5 border transition-colors"
              style={{
                borderColor: "#c9a227",
                color: "#c9a227",
                background: "rgba(201,162,39,0.07)",
              }}
            >
              Ver Jogadores
            </Link>
            <Link
              href="/sistemas-de-rpg"
              className="font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-2.5 border transition-all hover:border-[rgba(201,162,39,0.4)]"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                color: "var(--color-rpg-text-muted)",
              }}
            >
              Explorar Sistemas
            </Link>
            <CreatePlayerModal
              trigger={
                <button
                  className="font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-2.5 border transition-all hover:border-[rgba(201,162,39,0.4)]"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "var(--color-rpg-text-muted)",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  + Novo Jogador
                </button>
              }
            />
          </motion.div>
        </div>
      </header>

      {/* ── Dashboard grid ── */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* Summary stats */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Fichas Totais" value={stats.totalSheets} accent="#c9a227" index={0} />
            <StatCard label="Jogadores" value={stats.totalPlayers} accent="#b87333" index={1} />
            <StatCard label="Sistemas" value={stats.totalSystems} accent="#4a7fa8" index={2} />
          </div>
        </section>

        {/* Main columns - Reorganized layout */}
        <section className="grid md:grid-cols-2 gap-8">

          {/* Players */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex items-center justify-between mb-4"
            >
              <h2 className="section-title-ornate" style={{ flex: "none", fontSize: "0.65rem" }}>
                Jogadores
              </h2>
              <Link
                href="/jogadores"
                className="font-mono text-[10px] uppercase tracking-widest transition-opacity hover:opacity-80 ml-4"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                Ver todos →
              </Link>
            </motion.div>

            {players.length === 0 ? (
              <EmptyState message="Nenhum jogador cadastrado." />
            ) : (
              <div className="space-y-2">
                {players.map((p, i) => (
                  <motion.div
                    key={p.id}
                    custom={i + 4}
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                  >
                    <Link
                      href={`/jogadores/${p.id}`}
                      className="flex items-center gap-3 border p-3 transition-all duration-200 group hover:-translate-y-0.5"
                      style={{
                        background: "rgba(15,10,8,0.9)",
                        borderColor: "rgba(184,115,51,0.2)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = "rgba(184,115,51,0.45)";
                        el.style.boxShadow = "0 4px 16px rgba(184,115,51,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = "rgba(184,115,51,0.2)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <div
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center font-display font-bold border text-sm"
                        style={{
                          background: "rgba(184,115,51,0.08)",
                          borderColor: "rgba(184,115,51,0.35)",
                          color: "var(--color-rpg-bronze)",
                        }}
                      >
                        {p.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="font-display font-semibold text-sm truncate"
                          style={{ color: "var(--color-rpg-gold-light)" }}
                        >
                          {p.displayName}
                        </div>
                        <div
                          className="font-mono text-[9px] uppercase tracking-widest"
                          style={{ color: "var(--color-rpg-text-muted)" }}
                        >
                          {p.role} · {p.totalCharacters} personagens
                        </div>
                      </div>
                      <span
                        className="font-mono text-xs opacity-30 group-hover:opacity-60 transition-opacity"
                        style={{ color: "var(--color-rpg-bronze)" }}
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Systems overview */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center justify-between mb-4"
            >
              <h2 className="section-title-ornate" style={{ flex: "none", fontSize: "0.65rem" }}>
                Sistemas
              </h2>
              <Link
                href="/sistemas-de-rpg"
                className="font-mono text-[10px] uppercase tracking-widest transition-opacity hover:opacity-80 ml-4"
                style={{ color: "var(--color-rpg-text-muted)" }}
              >
                Ver todos →
              </Link>
            </motion.div>
            <div className="space-y-2">
              {systems.map((s, i) => (
                <SystemPill key={s.id} sys={s} index={i + 6} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div
      className="border p-8 text-center"
      style={{
        borderColor: "rgba(184,115,51,0.15)",
        background: "rgba(15,10,8,0.5)",
      }}
    >
      <span
        className="font-display text-3xl block mb-3 opacity-15"
        style={{ color: "var(--color-rpg-bronze)" }}
      >
        ✦
      </span>
      <p
        className="font-mono text-[11px] uppercase tracking-widest"
        style={{ color: "var(--color-rpg-text-muted)" }}
      >
        {message}
      </p>
    </div>
  );
}
