"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Link from "next/link";

export default function EditPage({ params }: { params: Promise<{ sistema: string; slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { sistema, slug } = resolvedParams;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/characters/${sistema}/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [sistema, slug]);

  const handleChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => {
      if (!prev) return prev;
      const updated = { ...prev };
      if (section === "personagem") {
        updated.ficha.personagem = { ...updated.ficha.personagem, [field]: value };
      } else if (section === "combate") {
        updated.ficha.combate = { ...updated.ficha.combate, [field]: value };
      } else if (section === "personalidade") {
        updated.ficha.personalidade = { ...updated.ficha.personalidade, [field]: value };
      }
      return updated;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/characters/${sistema}/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      router.push(`/sistemas-de-rpg/${sistema}/personagens/${slug}`);
    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-rpg-bg flex items-center justify-center">
        <span className="font-mono text-rpg-bronze animate-pulse">Carregando ficha...</span>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-rpg-bg flex items-center justify-center">
        <span className="font-mono text-rpg-text-muted">Ficha não encontrada.</span>
      </div>
    );
  }

  const p = formData.ficha.personagem;
  const c = formData.ficha.combate;
  const pers = formData.ficha.personalidade;

  return (
    <div className="min-h-screen bg-rpg-bg">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Sistemas", href: "/sistemas-de-rpg" },
            { label: p.classe, href: `/sistemas-de-rpg/${sistema}` },
            { label: p.nome, href: `/sistemas-de-rpg/${sistema}/personagens/${slug}` },
            { label: "Editar" },
          ]}
        />

        <h1 className="font-display font-bold text-2xl text-rpg-gold-light mb-8">
          Editar: {p.nome}
        </h1>

        {/* Identity */}
        <section className="mb-8 bg-rpg-surface-raised border border-rpg-border p-6 rounded">
          <h2 className="section-title mb-4">Identidade</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {p && (
              <>
                <Field label="Nome" value={p.nome} onChange={(v: string) => handleChange("personagem", "nome", v)} />
                <Field label="Raça" value={p.raca} onChange={(v: string) => handleChange("personagem", "raca", v)} />
                <Field label="Classe" value={p.classe} onChange={(v: string) => handleChange("personagem", "classe", v)} />
                <Field label="Subclasse" value={p.subclasse} onChange={(v: string) => handleChange("personagem", "subclasse", v)} />
                <Field label="Nível" type="number" value={p.nivel} onChange={(v: string) => handleChange("personagem", "nivel", parseInt(v) || 1)} />
              </>
            )}
          </div>
        </section>

        {/* Combat */}
        {c && (
          <section className="mb-8 bg-rpg-surface-raised border border-rpg-border p-6 rounded">
            <h2 className="section-title mb-4">Combate</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="CA" type="number" value={c.classe_armadura} onChange={(v: string) => handleChange("combate", "classe_armadura", parseInt(v) || 0)} />
              <Field label="PV Total" type="number" value={c.pv_totais} onChange={(v: string) => handleChange("combate", "pv_totais", parseInt(v) || 0)} />
              <Field label="Iniciativa" type="number" value={c.iniciativa} onChange={(v: string) => handleChange("combate", "iniciativa", parseInt(v) || 0)} />
              <Field label="CD Magia" type="number" value={c.cd_magia} onChange={(v: string) => handleChange("combate", "cd_magia", parseInt(v) || 0)} />
              <Field label="Ataque Mágico" type="number" value={c.ataque_magico} onChange={(v: string) => handleChange("combate", "ataque_magico", parseInt(v) || 0)} />
            </div>
          </section>
        )}

        {/* Personality */}
        {pers && (
          <section className="mb-8 bg-rpg-surface-raised border border-rpg-border p-6 rounded">
            <h2 className="section-title mb-4">Personalidade</h2>
            <div className="space-y-4">
              <TextArea label="Traços" value={pers.tracos} onChange={(v: string) => handleChange("personalidade", "tracos", v)} />
              <TextArea label="Ideal & Vínculo" value={pers.ideal_vinculo} onChange={(v: string) => handleChange("personalidade", "ideal_vinculo", v)} />
              <TextArea label="Defeito" value={pers.defeito} onChange={(v: string) => handleChange("personalidade", "defeito", v)} />
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Link
            href={`/sistemas-de-rpg/${sistema}/personagens/${slug}`}
            className="font-mono text-xs uppercase tracking-widest px-6 py-2 border border-rpg-border text-rpg-text-muted hover:bg-rpg-surface-raised transition-colors rounded"
          >
            Cancelar
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="font-mono text-xs uppercase tracking-widest px-6 py-2 bg-rpg-bronze/20 border border-rpg-bronze text-rpg-bronze hover:bg-rpg-bronze/30 transition-colors rounded disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: any; onChange: (v: any) => void; type?: string }) {
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-widest text-rpg-text-muted block mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(type === "number" ? e.target.value : e.target.value)}
        className="w-full bg-rpg-bg border border-rpg-border rounded px-3 py-2 text-rpg-text font-body focus:border-rpg-bronze focus:outline-none transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-widest text-rpg-text-muted block mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-rpg-bg border border-rpg-border rounded px-3 py-2 text-rpg-text font-body focus:border-rpg-bronze focus:outline-none transition-colors resize-none"
      />
    </div>
  );
}
