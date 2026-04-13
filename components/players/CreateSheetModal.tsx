"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SYSTEMS } from "@/lib/systems";

interface CreateSheetModalProps {
  trigger: ReactNode;
  playerId: string;
  playerName: string;
  /** If set, pre-selects this system and locks the step. */
  lockedSystem?: string;
}

type Step = "system" | "name";

export default function CreateSheetModal({
  trigger,
  playerId,
  playerName,
  lockedSystem,
}: CreateSheetModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(lockedSystem ? "name" : "system");
  const [selectedSystem, setSelectedSystem] = useState(lockedSystem ?? "");
  const [characterName, setCharacterName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setStep(lockedSystem ? "name" : "system");
    setSelectedSystem(lockedSystem ?? "");
    setCharacterName("");
    setError("");
    setLoading(false);
  }

  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (!val) reset();
  }

  function selectSystem(id: string) {
    setSelectedSystem(id);
    setStep("name");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!characterName.trim() || !selectedSystem) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/characters/${selectedSystem}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterName: characterName.trim(),
          playerId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Erro ao criar ficha.");
        return;
      }

      const data = await res.json();
      setOpen(false);
      reset();
      // Navigate to the new sheet
      router.push(`/sistemas-de-rpg/${selectedSystem}/personagens/${data.slug}`);
      router.refresh();
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const sys = selectedSystem ? SYSTEMS[selectedSystem] : null;
  const accent = sys?.accent ?? "#c9a227";
  const bg = "#0e0c08";

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ background: "rgba(4,2,4,0.85)", backdropFilter: "blur(4px)" }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed z-50 top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border focus:outline-none"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: bg,
                  borderColor: `${accent}35`,
                  borderTop: `2px solid ${accent}`,
                  boxShadow: `0 24px 80px rgba(0,0,0,0.75), 0 0 40px ${accent}10`,
                }}
              >
                {/* Progress strip */}
                <div className="flex border-b" style={{ borderColor: `${accent}20` }}>
                  {(["system", "name"] as Step[]).map((s, i) => (
                    <div
                      key={s}
                      className="flex-1 py-2.5 text-center font-mono text-[9px] uppercase tracking-widest transition-colors"
                      style={{
                        color: step === s ? accent : "var(--color-rpg-text-muted)",
                        background: step === s ? `${accent}08` : "transparent",
                        borderBottom: step === s ? `2px solid ${accent}` : "2px solid transparent",
                        cursor: i === 0 && step === "name" && !lockedSystem ? "pointer" : "default",
                      }}
                      onClick={() => {
                        if (i === 0 && step === "name" && !lockedSystem) setStep("system");
                      }}
                    >
                      {i + 1}. {s === "system" ? "Sistema" : "Personagem"}
                    </div>
                  ))}
                </div>

                <div className="p-8">
                  <Dialog.Title
                    className="font-display font-bold text-xl tracking-wider mb-1"
                    style={{ color: accent }}
                  >
                    {step === "system" ? "Nova Ficha" : sys?.label ?? "Nova Ficha"}
                  </Dialog.Title>
                  <Dialog.Description
                    className="font-mono text-[10px] uppercase tracking-widest mb-6"
                    style={{ color: "var(--color-rpg-text-muted)" }}
                  >
                    {step === "system"
                      ? `Criando ficha para ${playerName} — escolha o sistema`
                      : `Definindo personagem para ${playerName}`}
                  </Dialog.Description>

                  <AnimatePresence mode="wait">
                    {step === "system" && (
                      <motion.div
                        key="system"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 gap-2"
                      >
                        {Object.values(SYSTEMS).map((s) => (
                          <button
                            key={s.id}
                            onClick={() => selectSystem(s.id)}
                            className="border p-4 text-left transition-all duration-150 group hover:-translate-y-0.5"
                            style={{
                              background: "rgba(15,10,8,0.8)",
                              borderColor: `${s.accent}28`,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget;
                              el.style.borderColor = s.accent;
                              el.style.boxShadow = `0 4px 16px ${s.glow}`;
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget;
                              el.style.borderColor = `${s.accent}28`;
                              el.style.boxShadow = "none";
                            }}
                          >
                            <span
                              className="text-xl block mb-2"
                              style={{
                                color: s.accent,
                                filter: `drop-shadow(0 0 5px ${s.accent}88)`,
                              }}
                            >
                              {s.icon}
                            </span>
                            <div
                              className="font-display font-semibold text-sm leading-tight"
                              style={{ color: "var(--color-rpg-gold-light)" }}
                            >
                              {s.label}
                            </div>
                            <div
                              className="font-mono text-[9px] uppercase tracking-wider mt-1 leading-tight"
                              style={{ color: "var(--color-rpg-text-muted)" }}
                            >
                              {s.genre}
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {step === "name" && (
                      <motion.form
                        key="name"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        {/* Selected system badge */}
                        {sys && (
                          <div
                            className="flex items-center gap-3 border p-3"
                            style={{
                              borderColor: `${sys.accent}30`,
                              background: `${sys.accent}08`,
                              borderLeft: `3px solid ${sys.accent}`,
                            }}
                          >
                            <span style={{ color: sys.accent, fontSize: "1.1rem" }}>{sys.icon}</span>
                            <div>
                              <div
                                className="font-display font-semibold text-sm"
                                style={{ color: "var(--color-rpg-gold-light)" }}
                              >
                                {sys.label}
                              </div>
                              <div
                                className="font-mono text-[9px] uppercase tracking-wider"
                                style={{ color: "var(--color-rpg-text-muted)" }}
                              >
                                {sys.genre}
                              </div>
                            </div>
                          </div>
                        )}

                        <div>
                          <label
                            className="font-mono text-[10px] uppercase tracking-widest block mb-1.5"
                            style={{ color: accent, opacity: 0.8 }}
                          >
                            Nome do Personagem *
                          </label>
                          <input
                            autoFocus
                            required
                            value={characterName}
                            onChange={(e) => setCharacterName(e.target.value)}
                            placeholder="Ex: Elysia, Viego, Kahoot…"
                            className="w-full px-3 py-2.5 font-mono text-sm bg-transparent border focus:outline-none transition-colors"
                            style={{
                              borderColor: `${accent}35`,
                              color: "var(--color-rpg-text)",
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = `${accent}35`)}
                          />
                        </div>

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

                        <div className="flex gap-3 pt-1">
                          {!lockedSystem && (
                            <button
                              type="button"
                              onClick={() => setStep("system")}
                              className="font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 border transition-all"
                              style={{
                                borderColor: "rgba(255,255,255,0.1)",
                                color: "var(--color-rpg-text-muted)",
                                background: "transparent",
                                cursor: "pointer",
                              }}
                            >
                              ← Voltar
                            </button>
                          )}
                          <button
                            type="submit"
                            disabled={loading || !characterName.trim()}
                            className="shimmer-btn flex-1 font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2.5 border transition-all disabled:opacity-40"
                            style={{
                              borderColor: accent,
                              color: accent,
                              background: `${accent}0d`,
                              cursor: loading || !characterName.trim() ? "not-allowed" : "pointer",
                            }}
                          >
                            {loading ? "Criando…" : "Criar Ficha"}
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                <Dialog.Close asChild>
                  <button
                    aria-label="Fechar"
                    className="absolute top-4 right-4 font-mono text-sm transition-opacity hover:opacity-60"
                    style={{
                      color: "var(--color-rpg-text-muted)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
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
