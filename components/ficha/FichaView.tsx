import FichaHeader from "@/components/ficha/FichaHeader";
import AtributosBlock from "@/components/ficha/AtributosBlock";
import type { ReactNode } from "react";

interface FichaViewProps {
  ficha: Record<string, any>;
  system?: string;
}

export default function FichaView({ ficha, system }: FichaViewProps) {
  const personagem = ficha.personagem || {};
  const atributos = ficha.atributos || ficha.atributos_iniciais || null;
  const combate = ficha.combate || null;
  const salvaguardas = ficha.salvaguardas || ficha.testes_resistencia || null;
  const pericias = ficha.pericias || null;
  const passiva = ficha.passiva || null;
  const ataques = ficha.ataques || null;
  const habRaciais = ficha.habilidades_raciais || null;
  const habClasse = ficha.habilidades_classe || null;
  const infusoes = ficha.infusoes_ativas || null;
  const magias = ficha.magias || null;
  const equipamento = ficha.equipamento || null;
  const personalidade = ficha.personalidade || null;
  const historia = ficha.historia || null;

  const attrData = atributos as Record<string, { valor: number; mod: number }>;

  // Theme system detection
  const isVampiro = system === "vampiro";
  const themeVars = isVampiro
    ? {
        accent: "var(--color-theme-brand-bright, #d63031)",
        accentLight: "var(--color-theme-glow, rgba(139,0,0,0.12))",
        border: "var(--color-theme-border, rgba(139,0,0,0.35))",
        bg: "var(--color-theme-card, #120a0a)",
        textDim: "var(--color-theme-text-dim, #6a5e52)",
        bone: "var(--color-theme-bone, #e8ddd0)",
        boneDim: "var(--color-theme-bone-dim, #7a6868)",
      }
    : {
        accent: "var(--color-rpg-bronze)",
        accentLight: "rgba(184,115,51,0.1)",
        border: "var(--color-rpg-border)",
        bg: "var(--color-rpg-surface-raised)",
        textDim: "var(--color-rpg-text-muted)",
        bone: "var(--color-rpg-gold-light)",
        boneDim: "var(--color-rpg-text-muted)",
      };

  return (
    <div className="space-y-10">
      <FichaHeader
        nome={personagem.nome || "Sem nome"}
        titulo={personagem.titulo}
        raca={personagem.raca || "Desconhecido"}
        classe={personagem.classe || "Desconhecido"}
        nivel={personagem.nivel || 1}
        subclasse={personagem.subclasse || personagem.multiclasse}
        system={system}
      />

      {/* Meta bar */}
      {personagem.raca && (
        <div className="border-b px-6 py-3 flex flex-wrap gap-6 font-mono text-xs" style={{ borderColor: themeVars.border, background: themeVars.bg }}>
          {personagem.raca && (
            <div>
              <span className="uppercase tracking-widest block" style={{ color: themeVars.textDim }}>Raça</span>
              <span className="font-semibold" style={{ color: themeVars.accent }}>{personagem.raca}</span>
            </div>
          )}
          {personagem.classe && (
            <div>
              <span className="uppercase tracking-widest block" style={{ color: themeVars.textDim }}>Classe</span>
              <span className="font-semibold" style={{ color: themeVars.accent }}>{personagem.classe}</span>
            </div>
          )}
          {personagem.subclasse && (
            <div>
              <span className="uppercase tracking-widest block" style={{ color: themeVars.textDim }}>Subclasse</span>
              <span className="font-semibold" style={{ color: themeVars.accent }}>{personagem.subclasse}</span>
            </div>
          )}
          {personagem.nivel != null && (
            <div>
              <span className="uppercase tracking-widest block" style={{ color: themeVars.textDim }}>Nível</span>
              <span className="font-semibold" style={{ color: themeVars.accent }}>{personagem.nivel}</span>
            </div>
          )}
          {personagem.antecedente && (
            <div>
              <span className="uppercase tracking-widest block" style={{ color: themeVars.textDim }}>Antecedente</span>
              <span className="font-semibold" style={{ color: themeVars.accent }}>{personagem.antecedente}</span>
            </div>
          )}
          {personagem.tendencia && (
            <div>
              <span className="uppercase tracking-widest block" style={{ color: themeVars.textDim }}>Tendência</span>
              <span className="font-semibold" style={{ color: themeVars.accent }}>{personagem.tendencia}</span>
            </div>
          )}
        </div>
      )}

      {/* Attributes */}
      {attrData && Object.keys(attrData).length > 0 && typeof attrData[Object.keys(attrData)[0]]?.valor === "number" && (
        <AtributosBlock atributos={attrData} accent={themeVars.accent} border={themeVars.border} />
      )}

      {/* Combat Stats */}
      {combate && (
        <ThemeSection title="Estatísticas de Combate" accent={themeVars.accent} border={themeVars.border}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {combate.classe_armadura != null && (
              <CombatStat label="Classe de Armadura" value={combate.classe_armadura} highlight accent={themeVars.accent} border={themeVars.border} bg={themeVars.bg} />
            )}
            {combate.pv_totais != null && (
              <CombatStat label="Pontos de Vida" value={combate.pv_totais} highlight accent={themeVars.accent} border={themeVars.border} bg={themeVars.bg} />
            )}
            {combate.iniciativa != null && (
              <CombatStat label="Iniciativa" value={combatValue(combate.iniciativa)} accent={themeVars.accent} border={themeVars.border} bg={themeVars.bg} />
            )}
            {combate.deslocamento != null && (
              <CombatStat label="Deslocamento" value={combate.deslocamento} accent={themeVars.accent} border={themeVars.border} bg={themeVars.bg} />
            )}
            {combate.bonus_proficiencia != null && (
              <CombatStat label="Bônus Prof." value={`+${combate.bonus_proficiencia}`} accent={themeVars.accent} border={themeVars.border} bg={themeVars.bg} />
            )}
            {combate.cd_magia != null && (
              <CombatStat label="CD Magias" value={combate.cd_magia} highlight accent={themeVars.accent} border={themeVars.border} bg={themeVars.bg} />
            )}
            {combate.ataque_magico != null && (
              <CombatStat label="Ataque Mágico" value={combatValue(combate.ataque_magico)} highlight accent={themeVars.accent} border={themeVars.border} bg={themeVars.bg} />
            )}
          </div>
        </ThemeSection>
      )}

      {/* Saving Throws + Skills */}
      {(salvaguardas || pericias) && (
        <div className="grid md:grid-cols-2 gap-8">
          {salvaguardas && (
            <ThemeSection title="Salvaguardas" accent={themeVars.accent} border={themeVars.border}>
              <ul className="space-y-1">
                {Object.entries(salvaguardas).map(([key, sv]: [string, any]) => (
                  <li key={key} className="flex items-center gap-2 py-1 text-sm" style={{ borderBottom: `${themeVars.border}60` }}>
                    {sv.proficiente
                      ? <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: themeVars.accent }} />
                      : <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ border: `1.5px solid ${themeVars.border}` }} />
                    }
                    <span className="font-mono min-w-8 text-right text-xs" style={{ color: sv.proficiente ? themeVars.accent : themeVars.bone }}>
                      {sv.valor >= 0 ? `+${sv.valor}` : sv.valor}
                    </span>
                    <span className="capitalize flex-1" style={{ color: "var(--color-rpg-text)" }}>{key}</span>
                  </li>
                ))}
              </ul>
              {passiva && (
                <div className="mt-4 text-center rounded p-4 border" style={{ background: themeVars.accentLight, borderColor: themeVars.accent }}>
                  <span className="font-display font-extrabold text-2xl block" style={{ color: themeVars.bone }}>
                    {passiva.sabedoria_passiva}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: themeVars.textDim }}>
                    Sabedoria Passiva
                  </span>
                </div>
              )}
            </ThemeSection>
          )}

          {pericias && (
            <ThemeSection title="Perícias" accent={themeVars.accent} border={themeVars.border}>
              <ul className="space-y-1">
                {Object.entries(pericias)
                  .sort((a, b) => ((b as any)[1]?.valor ?? 0) - ((a as any)[1]?.valor ?? 0))
                  .map(([key, sk]: [string, any]) => (
                    <li key={key} className="flex items-center gap-2 py-1 text-sm" style={{ borderBottom: `${themeVars.border}60` }}>
                      {sk.proficiente
                        ? <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: themeVars.accent, boxShadow: `0 0 5px ${themeVars.accent}40` }} />
                        : <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ border: `1.5px solid ${themeVars.border}` }} />
                      }
                      <span className="font-mono min-w-8 text-right text-xs" style={{ color: sk.proficiente ? themeVars.bone : themeVars.accent }}>
                        {sk.valor >= 0 ? `+${sk.valor}` : sk.valor}
                      </span>
                      <span className="capitalize flex-1" style={{ color: "var(--color-rpg-text)" }}>{key.replace(/_/g, " ")}</span>
                      {sk.atributo && <span className="font-mono text-xs" style={{ color: themeVars.textDim, opacity: 0.6 }}>{sk.atributo}</span>}
                    </li>
                  ))}
              </ul>
            </ThemeSection>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="text-center flex items-center gap-4" style={{ color: `${themeVars.accent}40` }}>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${themeVars.accent}60, transparent)` }} />
        <span className="text-lg">{isVampiro ? "\u2715 \u2715 \u2715" : "\u2699 \u2726 \u2699"}</span>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${themeVars.accent}60, transparent)` }} />
      </div>

      {/* Attacks */}
      {ataques && ataques.length > 0 && (
        <ThemeSection title="Ataques" accent={themeVars.accent} border={themeVars.border}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: themeVars.border }}>
                  <th className="font-mono text-xs uppercase tracking-widest py-2 text-left" style={{ color: themeVars.textDim }}>Arma / Ataque</th>
                  <th className="font-mono text-xs uppercase tracking-widest py-2 text-left" style={{ color: themeVars.textDim }}>Bônus</th>
                  <th className="font-mono text-xs uppercase tracking-widest py-2 text-left" style={{ color: themeVars.textDim }}>Dano / Tipo</th>
                  <th className="font-mono text-xs uppercase tracking-widest py-2 text-left" style={{ color: themeVars.textDim }}>Alcance</th>
                  <th className="font-mono text-xs uppercase tracking-widest py-2 text-left hidden lg:table-cell" style={{ color: themeVars.textDim }}>Notas</th>
                </tr>
              </thead>
              <tbody>
                {ataques.map((atk: any, i: number) => (
                  <tr key={i} className="border-b hover:bg-rpg-bronze/5 transition-colors" style={{ borderColor: `${themeVars.border}40` }}>
                    <td className="py-3 font-display text-sm" style={{ color: themeVars.bone }}>{atk.nome || "—"}</td>
                    <td className="py-3 font-mono font-bold" style={{ color: themeVars.accent }}>{atk.bonus != null ? (atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus) : "—"}</td>
                    <td className="py-3 font-mono text-xs" style={{ color: isVampiro ? "var(--color-theme-ember, #ff6b35)" : "var(--color-rpg-copper)" }}>{atk.dano || "—"}</td>
                    <td className="py-3 font-mono text-xs" style={{ color: themeVars.textDim }}>{atk.alcance || "—"}</td>
                    <td className="py-3 text-xs hidden lg:table-cell" style={{ color: themeVars.textDim }}>{atk.notas || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ThemeSection>
      )}

      {/* Racial Features */}
      {habRaciais && habRaciais.length > 0 && (
        <ThemeSection title="Habilidades Raciais" accent={themeVars.accent} border={themeVars.border}>
          <div className="grid md:grid-cols-2 gap-3">
            {habRaciais.map((h: any, i: number) => (
              <div key={i} className="rounded p-4 border" style={{ background: themeVars.bg, borderColor: themeVars.border, borderLeftWidth: "3px", borderLeftColor: themeVars.accent }}>
                <h3 className="font-display text-sm font-semibold mb-1" style={{ color: themeVars.accent }}>{h.nome}</h3>
                <p className="text-sm leading-relaxed" style={{ color: isVampiro ? "var(--color-theme-text, #d4c8c0)" : "var(--color-rpg-text-muted)" }}>{h.descricao}</p>
              </div>
            ))}
          </div>
        </ThemeSection>
      )}

      {/* Class Features */}
      {habClasse && habClasse.length > 0 && (
        <ThemeSection title="Habilidades de Classe" accent={themeVars.accent} border={themeVars.border}>
          <div className="grid md:grid-cols-2 gap-3">
            {habClasse.map((h: any, i: number) => (
              <div key={i} className="rounded p-4 border" style={{
                background: themeVars.bg,
                borderColor: themeVars.border,
                borderLeftWidth: "3px",
                borderLeftColor: h.fonte?.includes("Ativo") ? (isVampiro ? "var(--color-theme-brand-bright, #d63031)" : "var(--color-rpg-teal)") : themeVars.accent,
              }}>
                <h3 className="font-display text-sm font-semibold mb-1" style={{ color: themeVars.bone }}>{h.nome}</h3>
                {h.fonte && <span className="font-mono text-xs uppercase tracking-wider block mb-2" style={{ color: themeVars.textDim }}>{h.fonte}</span>}
                <p className="text-sm leading-relaxed" style={{ color: isVampiro ? "var(--color-theme-text, #d4c8c0)" : "var(--color-rpg-text-muted)" }}>{h.descricao}</p>
              </div>
            ))}
          </div>
        </ThemeSection>
      )}

      {/* Infusions */}
      {infusoes && infusoes.infusoes && (
        <ThemeSection title={`Infusões Ativas (${infusoes.total_ativas} / ${infusoes.total_conhecidas})`} accent={themeVars.accent} border={themeVars.border}>
          <div className="grid md:grid-cols-2 gap-3">
            {infusoes.infusoes.map((inf: any, i: number) => (
              <div key={i} className="rounded p-4 border" style={{ background: themeVars.bg, borderColor: isVampiro ? "var(--color-theme-border, rgba(139,0,0,0.35))" : "var(--color-rpg-accent)/25", borderLeftWidth: "3px", borderLeftColor: isVampiro ? "var(--color-theme-brand-mid, #b22222)" : "var(--color-rpg-accent)" }}>
                <h3 className="font-display text-sm font-semibold mb-1" style={{ color: isVampiro ? themeVars.bone : "var(--color-rpg-teal)" }}>{inf.nome}</h3>
                <span className="font-mono text-xs uppercase tracking-wider block mb-2" style={{ color: isVampiro ? "var(--color-theme-brand-bright)" : "var(--color-rpg-accent)" }}>{inf.status}</span>
                <p className="text-sm leading-relaxed" style={{ color: isVampiro ? "var(--color-theme-text-dim, #6a5e52)" : "var(--color-rpg-text-muted)" }}>{inf.descricao}</p>
              </div>
            ))}
          </div>
        </ThemeSection>
      )}

      {/* Spells */}
      {magias && (
        <ThemeSection title="Grimório" accent={themeVars.accent} border={themeVars.border}>
          <div className="flex gap-4 mb-4 font-mono text-xs">
            {magias.atributo_conjurador && (
              <span style={{ color: themeVars.textDim }}>Atributo: <span style={{ color: themeVars.accent }}>{magias.atributo_conjurador}</span></span>
            )}
            {magias.cd_magia && (
              <span style={{ color: themeVars.textDim }}>CD: <span style={{ color: themeVars.accent }}>{magias.cd_magia}</span></span>
            )}
          </div>

          {magias.truques && magias.truques.length > 0 && (
            <SpellList spells={magias.truques} level="Truques — Ilimitados" accent={themeVars.accent} border={themeVars.border} textDim={themeVars.textDim} bone={themeVars.bone} isVampiro={isVampiro} />
          )}
          {magias.circulo_1 && magias.circulo_1.length > 0 && (
            <SpellList spells={magias.circulo_1} level="1° Círculo" accent={themeVars.accent} border={themeVars.border} textDim={themeVars.textDim} bone={themeVars.bone} isVampiro={isVampiro} />
          )}
          {magias.circulo_2 && magias.circulo_2.length > 0 && (
            <SpellList spells={magias.circulo_2} level="2° Círculo" accent={themeVars.accent} border={themeVars.border} textDim={themeVars.textDim} bone={themeVars.bone} isVampiro={isVampiro} />
          )}
        </ThemeSection>
      )}

      {/* Equipment */}
      {equipamento && (
        <ThemeSection title="Equipamento" accent={themeVars.accent} border={themeVars.border}>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(equipamento).map(([key, items]) => (
              <div key={key} className="rounded p-4 border" style={{ background: themeVars.bg, borderColor: themeVars.border }}>
                <h3 className="font-display text-xs uppercase tracking-widest mb-2" style={{ color: themeVars.accent }}>
                  {key.replace(/_/g, " ")}
                </h3>
                <ul className="space-y-1">
                  {Array.isArray(items) && items.map((item, i) => (
                    <li key={i} className="text-sm" style={{ color: isVampiro ? "var(--color-theme-text, #d4c8c0)" : "var(--color-rpg-text-muted)" }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ThemeSection>
      )}

      {/* Personality */}
      {personalidade && (
        <ThemeSection title="Personalidade" accent={themeVars.accent} border={themeVars.border}>
          <div className="grid md:grid-cols-3 gap-4">
            {personalidade.tracos && (
              <div className="rounded p-5 border" style={{ background: themeVars.bg, borderColor: themeVars.border }}>
                <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: themeVars.accent }}>Traços</span>
                <p className="text-sm italic leading-relaxed" style={{ color: isVampiro ? "var(--color-theme-text, #d4c8c0)" : "var(--color-rpg-text-muted)" }}>{personalidade.tracos}</p>
              </div>
            )}
            {personalidade.ideal_vinculo && (
              <div className="rounded p-5 border" style={{ background: themeVars.bg, borderColor: themeVars.border }}>
                <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: themeVars.accent }}>Ideal & Vínculo</span>
                <p className="text-sm italic leading-relaxed" style={{ color: isVampiro ? "var(--color-theme-text, #d4c8c0)" : "var(--color-rpg-text-muted)" }}>{personalidade.ideal_vinculo}</p>
              </div>
            )}
            {personalidade.defeito && (
              <div className="rounded p-5 border" style={{ background: themeVars.bg, borderColor: themeVars.border }}>
                <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: themeVars.accent }}>Defeito</span>
                <p className="text-sm italic leading-relaxed" style={{ color: isVampiro ? "var(--color-theme-text, #d4c8c0)" : "var(--color-rpg-text-muted)" }}>{personalidade.defeito}</p>
              </div>
            )}
          </div>
        </ThemeSection>
      )}

      {/* History/Lore */}
      {historia && (
        <ThemeSection title="História" accent={themeVars.accent} border={themeVars.border}>
          <div className="rounded p-6 border prose prose-invert max-w-none" style={{ background: themeVars.bg, borderColor: themeVars.border, borderTopWidth: "3px", borderTopColor: themeVars.accent }}>
            {historia.split("\n\n").map((paragraph: string, i: number) => (
              <p key={i} className="text-base leading-relaxed mb-3 last:mb-0" style={{ color: isVampiro ? "var(--color-theme-text, #d4c8c0)" : "var(--color-rpg-text-muted)" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </ThemeSection>
      )}
    </div>
  );
}

/* ── Helper Components ── */

function ThemeSection({ title, children, accent, border }: { title: string; children: ReactNode; accent: string; border: string }) {
  return (
    <section>
      <h2 className="section-title" style={{ color: accent, borderColor: border }}>{title}</h2>
      {children}
    </section>
  );
}

function combatValue(val: number | string): string {
  if (typeof val === "number") return val >= 0 ? `+${val}` : String(val);
  return String(val);
}

function CombatStat({ label, value, highlight, accent, border, bg }: { label: string; value: number | string; highlight?: boolean; accent: string; border: string; bg: string }) {
  return (
    <div className="text-center p-4 rounded border" style={{ background: highlight ? `${accent}08` : bg, borderColor: highlight ? accent : border }}>
      <span className="font-mono text-xs uppercase tracking-wider block mb-1" style={{ color: "var(--color-rpg-text-muted)" }}>
        {label}
      </span>
      <span className="font-display font-bold text-xl block" style={{ color: highlight ? "var(--color-rpg-gold-light)" : "var(--color-rpg-text)" }}>
        {value}
      </span>
    </div>
  );
}

function SpellList({ spells, level, accent, border, textDim, bone, isVampiro }: { spells: Array<{ nome: string; tags?: string[]; descricao?: string; mecanica?: string }>; level: string; accent: string; border: string; textDim: string; bone: string; isVampiro: boolean }) {
  return (
    <div className="mt-6">
      <h3 className="font-display text-xs uppercase tracking-widest border-b pb-2 mb-3" style={{ color: accent, borderColor: border }}>
        {level}
      </h3>
      <div className="space-y-3">
        {spells.map((spell, i) => (
          <div key={i} className="rounded p-4 border" style={{ background: isVampiro ? "var(--color-theme-card, #120a0a)" : "var(--color-rpg-surface-raised)", borderColor: border }}>
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <span className="font-display font-semibold text-sm" style={{ color: bone }}>{spell.nome}</span>
              {spell.tags && spell.tags.length > 0 && (
                <div className="flex gap-1">
                  {spell.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs px-2 py-0.5 uppercase" style={{ border: `1px solid ${border}`, color: textDim }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {spell.descricao && <p className="text-sm leading-relaxed mb-2" style={{ color: isVampiro ? "var(--color-theme-text-dim, #6a5e52)" : "var(--color-rpg-text-muted)" }}>{spell.descricao}</p>}
            {spell.mecanica && <span className="font-mono text-xs block" style={{ color: accent }}>{spell.mecanica}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
