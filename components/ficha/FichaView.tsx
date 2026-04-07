import FichaHeader from "@/components/ficha/FichaHeader";
import AtributosBlock from "@/components/ficha/AtributosBlock";

interface FichaViewProps {
  ficha: Record<string, any>;
}

export default function FichaView({ ficha }: FichaViewProps) {
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

  // Determine attributes shape for AtributosBlock
  const attrData = atributos as Record<string, { valor: number; mod: number }>;

  return (
    <div className="space-y-10">
      <FichaHeader
        nome={personagem.nome || "Sem nome"}
        titulo={personagem.titulo}
        raca={personagem.raca || "Desconhecido"}
        classe={personagem.classe || "Desconhecido"}
        nivel={personagem.nivel || 1}
        subclasse={personagem.subclasse || personagem.multiclasse}
      />

      {/* Meta bar */}
      <div className="border-b border-rpg-border bg-rpg-surface-raised px-6 py-3 flex flex-wrap gap-6 font-mono text-xs">
        {personagem.raca && (
          <div>
            <span className="text-rpg-text-muted uppercase tracking-widest block">Raça</span>
            <span className="text-rpg-copper font-semibold">{personagem.raca}</span>
          </div>
        )}
        {personagem.classe && (
          <div>
            <span className="text-rpg-text-muted uppercase tracking-widest block">Classe</span>
            <span className="text-rpg-copper font-semibold">{personagem.classe}</span>
          </div>
        )}
        {personagem.subclasse && (
          <div>
            <span className="text-rpg-text-muted uppercase tracking-widest block">Subclasse</span>
            <span className="text-rpg-copper font-semibold">{personagem.subclasse}</span>
          </div>
        )}
        {personagem.nivel != null && (
          <div>
            <span className="text-rpg-text-muted uppercase tracking-widest block">Nível</span>
            <span className="text-rpg-copper font-semibold">{personagem.nivel}</span>
          </div>
        )}
        {personagem.antecedente && (
          <div>
            <span className="text-rpg-text-muted uppercase tracking-widest block">Antecedente</span>
            <span className="text-rpg-copper font-semibold">{personagem.antecedente}</span>
          </div>
        )}
      </div>

      {/* Attributes */}
      {attrData && Object.keys(attrData).length > 0 && typeof attrData[Object.keys(attrData)[0]]?.valor === "number" && (
        <AtributosBlock atributos={attrData} />
      )}

      {/* Combat Stats */}
      {combate && (
        <section>
          <h2 className="section-title">Estatísticas de Combate</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {combate.classe_armadura != null && (
              <CombatStat label="Classe de Armadura" value={combate.classe_armadura} highlight />
            )}
            {combate.pv_totais != null && (
              <CombatStat label="Pontos de Vida" value={combate.pv_totais} highlight />
            )}
            {combate.iniciativa != null && (
              <CombatStat label="Iniciativa" value={combatValue(combate.iniciativa)} />
            )}
            {combate.deslocamento != null && (
              <CombatStat label="Deslocamento" value={combate.deslocamento} />
            )}
            {combate.bonus_proficiencia != null && (
              <CombatStat label="Bônus Prof." value={`+${combate.bonus_proficiencia}`} />
            )}
            {combate.cd_magia != null && (
              <CombatStat label="CD Magias" value={combate.cd_magia} highlight />
            )}
            {combate.ataque_magico != null && (
              <CombatStat label="Ataque Mágico" value={combatValue(combate.ataque_magico)} highlight />
            )}
          </div>
        </section>
      )}

      {/* Saving Throws + Skills */}
      {(salvaguardas || pericias) && (
        <div className="grid md:grid-cols-2 gap-8">
          {salvaguardas && (
            <section>
              <h2 className="section-title">Salvaguardas</h2>
              <ul className="space-y-1">
                {Object.entries(salvaguardas).map(([key, sv]: [string, any]) => (
                  <li key={key} className="flex items-center gap-2 py-1 border-b border-rpg-border/50 text-sm">
                    {sv.proficiente ? <span className="w-2 h-2 rounded-full bg-rpg-bronze flex-shrink-0" /> : <span className="w-2 h-2 rounded-full border border-rpg-border flex-shrink-0" />}
                    <span className="font-mono text-rpg-bronze min-w-8 text-right text-xs">{sv.valor >= 0 ? `+${sv.valor}` : sv.valor}</span>
                    <span className="text-rpg-text capitalize flex-1">{key}</span>
                  </li>
                ))}
              </ul>
              {passiva && (
                <div className="mt-4 bg-rpg-bronze/10 border border-rpg-bronze p-4 text-center rounded">
                  <span className="font-display font-extrabold text-2xl text-rpg-gold-light block">
                    {passiva.sabedoria_passiva}
                  </span>
                  <span className="font-mono text-xs text-rpg-text-muted uppercase tracking-widest">
                    Sabedoria Passiva
                  </span>
                </div>
              )}
            </section>
          )}

          {pericias && (
            <section>
              <h2 className="section-title">Perícias</h2>
              <ul className="space-y-1">
                {Object.entries(pericias)
                  .sort((a, b) => {
                    const av = (a as any)[1]?.valor ?? 0;
                    const bv = (b as any)[1]?.valor ?? 0;
                    return bv - av;
                  })
                  .map(([key, sk]: [string, any]) => (
                    <li key={key} className="flex items-center gap-2 py-1 border-b border-rpg-border/50 text-sm">
                      {sk.proficiente ? <span className="w-2 h-2 rounded-full bg-rpg-bronze flex-shrink-0" /> : <span className="w-2 h-2 rounded-full border border-rpg-border flex-shrink-0" />}
                      <span className={`font-mono min-w-8 text-right text-xs ${sk.proficiente ? "text-rpg-gold-light" : "text-rpg-bronze"}`}>
                        {sk.valor >= 0 ? `+${sk.valor}` : sk.valor}
                      </span>
                      <span className="text-rpg-text capitalize flex-1">{key.replace(/_/g, " ")}</span>
                      {sk.atributo && <span className="font-mono text-xs text-rpg-text-muted/50">{sk.atributo}</span>}
                    </li>
                  ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="text-center flex items-center gap-4 text-rpg-gold/40">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rpg-bronze/40 to-transparent" />
        <span className="text-lg">⚙ ✦ ⚙</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rpg-bronze/40 to-transparent" />
      </div>

      {/* Attacks */}
      {ataques && ataques.length > 0 && (
        <section>
          <h2 className="section-title">Ataques</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rpg-border">
                  <th className="font-mono text-xs uppercase tracking-widest text-rpg-text-muted py-2 text-left">Arma / Ataque</th>
                  <th className="font-mono text-xs uppercase tracking-widest text-rpg-text-muted py-2 text-left">Bônus</th>
                  <th className="font-mono text-xs uppercase tracking-widest text-rpg-text-muted py-2 text-left">Dano / Tipo</th>
                  <th className="font-mono text-xs uppercase tracking-widest text-rpg-text-muted py-2 text-left">Alcance</th>
                  <th className="font-mono text-xs uppercase tracking-widest text-rpg-text-muted py-2 text-left hidden lg:table-cell">Notas</th>
                </tr>
              </thead>
              <tbody>
                {ataques.map((atk: any, i: number) => (
                  <tr key={i} className="border-b border-rpg-border/40 hover:bg-rpg-bronze/5 transition-colors">
                    <td className="py-3 font-display text-rpg-gold-light text-sm">{atk.nome || "—"}</td>
                    <td className="py-3 font-mono text-rpg-bronze font-bold">{atk.bonus != null ? (atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus) : "—"}</td>
                    <td className="py-3 font-mono text-rpg-copper text-xs">{atk.dano || "—"}</td>
                    <td className="py-3 font-mono text-rpg-text-muted text-xs">{atk.alcance || "—"}</td>
                    <td className="py-3 text-rpg-text-muted text-xs hidden lg:table-cell">{atk.notas || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Racial Features */}
      {habRaciais && habRaciais.length > 0 && (
        <section>
          <h2 className="section-title">Habilidades Raciais</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {habRaciais.map((h: any, i: number) => (
              <div key={i} className="bg-rpg-surface-raised border border-rpg-border border-l-3 border-l-rpg-gold p-4 rounded">
                <h3 className="font-display text-sm text-rpg-gold font-semibold uppercase tracking-wide mb-1">{h.nome}</h3>
                <p className="text-rpg-text-muted text-sm leading-relaxed">{h.descricao}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Class Features */}
      {habClasse && habClasse.length > 0 && (
        <section>
          <h2 className="section-title">Habilidades de Classe</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {habClasse.map((h: any, i: number) => (
              <div key={i} className={`bg-rpg-surface-raised border border-rpg-border p-4 rounded ${h.fonte?.includes("Ativo") ? "border-l-rpg-teal border-l-3" : "border-l-rpg-bronze border-l-3"}`}>
                <h3 className="font-display text-sm text-rpg-gold-light font-semibold mb-1">{h.nome}</h3>
                {h.fonte && <span className="font-mono text-xs text-rpg-text-muted uppercase tracking-wider block mb-2">{h.fonte}</span>}
                <p className="text-rpg-text-muted text-sm leading-relaxed">{h.descricao}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Infusions */}
      {infusoes && infusoes.infusoes && (
        <section>
          <h2 className="section-title">Infusões Ativas ({infusoes.total_ativas} / {infusoes.total_conhecidas})</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {infusoes.infusoes.map((inf: any, i: number) => (
              <div key={i} className="bg-rpg-surface-raised border border-rpg-accent/25 border-l-3 border-l-rpg-accent p-4 rounded">
                <h3 className="font-display text-sm text-rpg-teal font-semibold mb-1">{inf.nome}</h3>
                <span className="font-mono text-xs text-rpg-accent uppercase tracking-wider block mb-2">{inf.status}</span>
                <p className="text-rpg-text-muted text-sm leading-relaxed">{inf.descricao}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Spells */}
      {magias && (
        <section>
          <h2 className="section-title">Grimório</h2>
          <div className="flex gap-4 mb-4 font-mono text-xs">
            {magias.atributo_conjurador && (
              <span className="text-rpg-text-muted">Atributo: <span className="text-rpg-bronze">{magias.atributo_conjurador}</span></span>
            )}
            {magias.cd_magia && (
              <span className="text-rpg-text-muted">CD: <span className="text-rpg-bronze">{magias.cd_magia}</span></span>
            )}
          </div>

          {magias.truques && magias.truques.length > 0 && (
            <SpellList spells={magias.truques} level="Truques — Ilimitados" levelClass="gold" />
          )}
          {magias.circulo_1 && magias.circulo_1.length > 0 && (
            <SpellList spells={magias.circulo_1} level="1° Círculo" levelClass="teal" />
          )}
          {magias.circulo_2 && magias.circulo_2.length > 0 && (
            <SpellList spells={magias.circulo_2} level="2° Círculo" levelClass="teal" />
          )}
        </section>
      )}

      {/* Equipment */}
      {equipamento && (
        <section>
          <h2 className="section-title">Equipamento</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(equipamento).map(([key, items]) => (
              <div key={key} className="bg-rpg-surface-raised border border-rpg-border p-4 rounded">
                <h3 className="font-display text-xs uppercase tracking-widest text-rpg-bronze mb-2">
                  {key.replace(/_/g, " ")}
                </h3>
                <ul className="space-y-1">
                  {Array.isArray(items) && items.map((item, i) => (
                    <li key={i} className="text-sm text-rpg-text-muted">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Personality */}
      {personalidade && (
        <section>
          <h2 className="section-title">Personalidade</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {personalidade.tracos && (
              <div className="bg-rpg-surface-raised border border-rpg-border p-5 rounded">
                <span className="font-mono text-xs uppercase tracking-widest text-rpg-bronze block mb-2">Traços</span>
                <p className="text-sm text-rpg-text-muted italic leading-relaxed">{personalidade.tracos}</p>
              </div>
            )}
            {personalidade.ideal_vinculo && (
              <div className="bg-rpg-surface-raised border border-rpg-border p-5 rounded">
                <span className="font-mono text-xs uppercase tracking-widest text-rpg-bronze block mb-2">Ideal & Vínculo</span>
                <p className="text-sm text-rpg-text-muted italic leading-relaxed">{personalidade.ideal_vinculo}</p>
              </div>
            )}
            {personalidade.defeito && (
              <div className="bg-rpg-surface-raised border border-rpg-border p-5 rounded">
                <span className="font-mono text-xs uppercase tracking-widest text-rpg-bronze block mb-2">Defeito</span>
                <p className="text-sm text-rpg-text-muted italic leading-relaxed">{personalidade.defeito}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* History/Lore */}
      {historia && (
        <section>
          <h2 className="section-title">História</h2>
          <div className="bg-rpg-surface-raised border border-rpg-border border-t-3 border-t-rpg-bronze p-6 rounded prose prose-invert max-w-none">
            {historia.split("\n\n").map((paragraph: string, i: number) => (
              <p key={i} className="text-rpg-text-muted text-base leading-relaxed mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function combatValue(val: number | string): string {
  if (typeof val === "number") return val >= 0 ? `+${val}` : String(val);
  return String(val);
}

function CombatStat({ label, value, highlight }: { label: string; value: number | string; highlight?: boolean }) {
  return (
    <div className={`text-center p-4 rounded border ${highlight ? "border-rpg-bronze bg-rpg-bronze/5" : "border-rpg-border bg-rpg-surface-raised"}`}>
      <span className="font-mono text-xs uppercase tracking-wider text-rpg-text-muted block mb-1">
        {label}
      </span>
      <span className={`font-display font-bold text-xl ${highlight ? "text-rpg-gold-light" : "text-rpg-text"}`}>
        {value}
      </span>
    </div>
  );
}

function SpellList({ spells, level, levelClass }: { spells: Array<{ nome: string; tags?: string[]; descricao?: string; mecanica?: string }>; level: string; levelClass: string }) {
  const colorMap: Record<string, string> = {
    gold: "text-rpg-gold-light border-rpg-gold",
    teal: "text-rpg-teal border-rpg-teal",
  };
  const color = colorMap[levelClass] || "text-rpg-gold-light border-rpg-gold";

  return (
    <div className="mt-6">
      <h3 className={`font-display text-xs uppercase tracking-widest ${color.split(" ")[0]} border-b border-rpg-border pb-2 mb-3`}>
        {level}
      </h3>
      <div className="space-y-3">
        {spells.map((spell, i) => (
          <div key={i} className="bg-rpg-surface-raised border border-rpg-border p-4 rounded">
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <span className="font-display text-rpg-gold-light font-semibold text-sm">{spell.nome}</span>
              {spell.tags && spell.tags.length > 0 && (
                <div className="flex gap-1">
                  {spell.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs px-2 py-0.5 border border-rpg-border text-rpg-text-muted uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {spell.descricao && <p className="text-sm text-rpg-text-muted leading-relaxed mb-2">{spell.descricao}</p>}
            {spell.mecanica && <span className="font-mono text-xs text-rpg-bronze block">{spell.mecanica}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
