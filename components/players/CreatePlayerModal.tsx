"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface CreatePlayerModalProps {
  trigger: ReactNode;
}

export default function CreatePlayerModal({ trigger }: CreatePlayerModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("Jogador");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!displayName.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName.trim(),
          displayName: displayName.trim(),
          role: role.trim() || "Jogador",
          bio: bio.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Erro ao criar jogador.");
        return;
      }

      setOpen(false);
      setDisplayName("");
      setRole("Jogador");
      setBio("");
      router.refresh();
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (!val) {
      setError("");
      setDisplayName("");
      setRole("Jogador");
      setBio("");
    }
  }

  const accent = "#c9a227";
  const border = "rgba(201,162,39,0.28)";
  const bg = "#0e0c08";

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ background: "rgba(4,2,4,0.82)", backdropFilter: "blur(4px)" }}
              />
            </Dialog.Overlay>

            {/* Panel */}
            <Dialog.Content asChild>
              <motion.div
                className="fixed z-50 top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border p-8 focus:outline-none"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: bg,
                  borderColor: border,
                  borderTop: `2px solid ${accent}`,
                  boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(201,162,39,0.08)`,
                }}
              >
                {/* Subtle corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top right, ${accent}15, transparent 70%)`,
                  }}
                />

                <Dialog.Title
                  className="font-display font-bold text-xl tracking-wider mb-1"
                  style={{ color: accent }}
                >
                  Novo Jogador
                </Dialog.Title>
                <Dialog.Description
                  className="font-mono text-[10px] uppercase tracking-widest mb-6"
                  style={{ color: "var(--color-rpg-text-muted)" }}
                >
                  Adicionar jogador ao Akasharium
                </Dialog.Description>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field label="Nome / Apelido *" accent={accent}>
                    <input
                      autoFocus
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Ex: JonasVector"
                      className="w-full px-3 py-2.5 font-mono text-sm bg-transparent border focus:outline-none transition-colors"
                      style={{
                        borderColor: border,
                        color: "var(--color-rpg-text)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = border)}
                    />
                  </Field>

                  <Field label="Função" accent={accent}>
                    <input
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ex: Jogador & Mestre"
                      className="w-full px-3 py-2.5 font-mono text-sm bg-transparent border focus:outline-none transition-colors"
                      style={{
                        borderColor: border,
                        color: "var(--color-rpg-text)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = border)}
                    />
                  </Field>

                  <Field label="Bio" accent={accent}>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Descrição opcional do jogador…"
                      rows={3}
                      className="w-full px-3 py-2.5 font-mono text-sm bg-transparent border focus:outline-none transition-colors resize-none"
                      style={{
                        borderColor: border,
                        color: "var(--color-rpg-text)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = border)}
                    />
                  </Field>

                  {error && (
                    <p
                      className="font-mono text-[11px] px-3 py-2 border"
                      style={{
                        color: "#e05050",
                        borderColor: "rgba(224,80,80,0.3)",
                        background: "rgba(224,80,80,0.06)",
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading || !displayName.trim()}
                      className="shimmer-btn flex-1 font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2.5 border transition-all disabled:opacity-40"
                      style={{
                        borderColor: accent,
                        color: accent,
                        background: `rgba(201,162,39,0.08)`,
                        cursor: loading || !displayName.trim() ? "not-allowed" : "pointer",
                      }}
                    >
                      {loading ? "Criando…" : "Criar Jogador"}
                    </button>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 border transition-all"
                        style={{
                          borderColor: "rgba(255,255,255,0.1)",
                          color: "var(--color-rpg-text-muted)",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        Cancelar
                      </button>
                    </Dialog.Close>
                  </div>
                </form>

                <Dialog.Close asChild>
                  <button
                    aria-label="Fechar"
                    className="absolute top-4 right-4 font-mono text-sm transition-opacity hover:opacity-60"
                    style={{ color: "var(--color-rpg-text-muted)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Field({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        className="font-mono text-[10px] uppercase tracking-widest block mb-1.5"
        style={{ color: accent, opacity: 0.8 }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
