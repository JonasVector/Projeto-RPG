#!/usr/bin/env python3
"""
Gera fichas HTML padronizadas D&D 5e para todos os personagens.
Baseado no template Nahida/Klein como referência.
"""
import json, os, shutil

BASE = "C:/ProjetosVSCODE/Projeto-RPG-AntigravityClaude/projeto-rpg"
LEGACY = f"{BASE}/legacy/characters"
PUBLIC = f"{BASE}/public/fichas"

# ──────────────────────────────────────────────
#  TEMAS POR PERSONAGEM
# ──────────────────────────────────────────────
THEMES = {
    "camellya": {
        "primary":"#8b0000","mid":"#c0392b","bright":"#e74c3c",
        "pale":"#ffe8e8","dark":"#080202","darker":"#050101",
        "card":"#160808","card_light":"#241010",
        "text":"#e0c0c0","text_dim":"#8a4040","mist":"#4a0a0a",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(139,0,0,0.35)","border_bright":"rgba(231,76,60,0.5)",
        "glow":"rgba(139,0,0,0.15)",
        "particles":"🌹🌺🍁",
        "symbol":"🌹",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(139,0,0,0.12)","bg_grad2":"rgba(231,76,60,0.06)",
    },
    "cantarella": {
        "primary":"#6b21a8","mid":"#a855f7","bright":"#d8b4fe",
        "pale":"#f5f0ff","dark":"#060210","darker":"#040108",
        "card":"#0f0520","card_light":"#1a0835",
        "text":"#d0b8f0","text_dim":"#7a5aac","mist":"#3a1460",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(107,33,168,0.35)","border_bright":"rgba(168,85,247,0.5)",
        "glow":"rgba(107,33,168,0.15)",
        "particles":"✦✧❋",
        "symbol":"💜",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(107,33,168,0.12)","bg_grad2":"rgba(168,85,247,0.06)",
    },
    "elysia": {
        "primary":"#c2185b","mid":"#e91e63","bright":"#f48fb1",
        "pale":"#fce4ec","dark":"#0d0508","darker":"#080304",
        "card":"#140810","card_light":"#1e0c18",
        "text":"#f0d0e0","text_dim":"#9a5870","mist":"#5a2048",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(194,24,91,0.35)","border_bright":"rgba(233,30,99,0.5)",
        "glow":"rgba(194,24,91,0.15)",
        "particles":"⭐✨💫",
        "symbol":"🌸",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(194,24,91,0.10)","bg_grad2":"rgba(244,143,177,0.06)",
    },
    "furina": {
        "primary":"#1565c0","mid":"#1e88e5","bright":"#64b5f6",
        "pale":"#e3f2fd","dark":"#020810","darker":"#010508",
        "card":"#051020","card_light":"#0a1a30",
        "text":"#c0d8f8","text_dim":"#4a6888","mist":"#0a2248",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(21,101,192,0.35)","border_bright":"rgba(100,181,246,0.5)",
        "glow":"rgba(21,101,192,0.15)",
        "particles":"💧🫧❄️",
        "symbol":"⚖️",
        "portrait_ext":"png",
        "bg_grad1":"rgba(21,101,192,0.12)","bg_grad2":"rgba(100,181,246,0.06)",
    },
    "kafka": {
        "primary":"#4a0e8f","mid":"#7c3aed","bright":"#c084fc",
        "pale":"#f3e8ff","dark":"#050010","darker":"#030008",
        "card":"#0e0528","card_light":"#160840",
        "text":"#d8c0f8","text_dim":"#6a40a0","mist":"#2a0860",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(74,14,143,0.40)","border_bright":"rgba(192,132,252,0.5)",
        "glow":"rgba(74,14,143,0.15)",
        "particles":"⭐✦🌌",
        "symbol":"🌌",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(74,14,143,0.15)","bg_grad2":"rgba(124,58,237,0.06)",
    },
    "mordekaiser": {
        "primary":"#2e7d32","mid":"#4caf50","bright":"#81c784",
        "pale":"#f1f8e9","dark":"#020802","darker":"#010501",
        "card":"#071008","card_light":"#0e1a0f",
        "text":"#c8dcc8","text_dim":"#507050","mist":"#1a3a1a",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(46,125,50,0.40)","border_bright":"rgba(129,199,132,0.5)",
        "glow":"rgba(46,125,50,0.12)",
        "particles":"⚔️🛡️💀",
        "symbol":"☠️",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(46,125,50,0.10)","bg_grad2":"rgba(76,175,80,0.05)",
    },
    "morgana": {
        "primary":"#4a1080","mid":"#7b1fa2","bright":"#ce93d8",
        "pale":"#f3e5f5","dark":"#060108","darker":"#040106",
        "card":"#120520","card_light":"#1a0830",
        "text":"#e0c8f0","text_dim":"#7a4a8a","mist":"#2a0840",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(74,16,128,0.40)","border_bright":"rgba(206,147,216,0.5)",
        "glow":"rgba(74,16,128,0.15)",
        "particles":"🌑🖤✦",
        "symbol":"🦋",
        "portrait_ext":"png",
        "bg_grad1":"rgba(74,16,128,0.12)","bg_grad2":"rgba(123,31,162,0.06)",
    },
    "nasus": {
        "primary":"#8b6914","mid":"#c9a227","bright":"#e8c85a",
        "pale":"#faf5e4","dark":"#080602","darker":"#060401",
        "card":"#180f04","card_light":"#241608",
        "text":"#f0e0b0","text_dim":"#8a7030","mist":"#4a3008",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(139,105,20,0.40)","border_bright":"rgba(232,200,90,0.5)",
        "glow":"rgba(139,105,20,0.15)",
        "particles":"📜⚖️🌙",
        "symbol":"🐺",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(139,105,20,0.12)","bg_grad2":"rgba(201,162,39,0.06)",
    },
    "neuvillette": {
        "primary":"#0d47a1","mid":"#1976d2","bright":"#64b5f6",
        "pale":"#e8f4ff","dark":"#010408","darker":"#010306",
        "card":"#040c1c","card_light":"#081428",
        "text":"#b8d8f8","text_dim":"#385870","mist":"#0a1e3c",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(13,71,161,0.40)","border_bright":"rgba(100,181,246,0.5)",
        "glow":"rgba(13,71,161,0.15)",
        "particles":"💧🌊❄️",
        "symbol":"🐉",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(13,71,161,0.15)","bg_grad2":"rgba(100,181,246,0.06)",
    },
    "phrolova": {
        "primary":"#6a1b9a","mid":"#9c27b0","bright":"#ce93d8",
        "pale":"#f8f0ff","dark":"#060108","darker":"#040106",
        "card":"#120420","card_light":"#1c0830",
        "text":"#e0c8f8","text_dim":"#7850a8","mist":"#2a1050",
        "gold":"#ff8f00","gold_light":"#ffc107",
        "border":"rgba(106,27,154,0.40)","border_bright":"rgba(206,147,216,0.5)",
        "glow":"rgba(106,27,154,0.15)",
        "particles":"🌅🌄✦",
        "symbol":"🦅",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(106,27,154,0.12)","bg_grad2":"rgba(255,143,0,0.06)",
    },
    "sett": {
        "primary":"#b71c1c","mid":"#e53935","bright":"#ef9a9a",
        "pale":"#ffebee","dark":"#080100","darker":"#050100",
        "card":"#180404","card_light":"#280808",
        "text":"#f0c8c8","text_dim":"#8a4040","mist":"#5a1010",
        "gold":"#ff8f00","gold_light":"#ffc107",
        "border":"rgba(183,28,28,0.40)","border_bright":"rgba(239,154,154,0.5)",
        "glow":"rgba(183,28,28,0.15)",
        "particles":"👊💥⚡",
        "symbol":"👊",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(183,28,28,0.15)","bg_grad2":"rgba(229,57,53,0.06)",
    },
    "viego": {
        "primary":"#263238","mid":"#546e7a","bright":"#90a4ae",
        "pale":"#e0e8f0","dark":"#010408","darker":"#010306",
        "card":"#050d14","card_light":"#0a1820",
        "text":"#b0c8d8","text_dim":"#405870","mist":"#0a1828",
        "gold":"#c9a227","gold_light":"#e8c85a",
        "border":"rgba(38,50,56,0.50)","border_bright":"rgba(144,164,174,0.5)",
        "glow":"rgba(38,50,56,0.20)",
        "particles":"🌫️👁️💙",
        "symbol":"👑",
        "portrait_ext":"jpg",
        "bg_grad1":"rgba(38,50,56,0.15)","bg_grad2":"rgba(84,110,122,0.08)",
    },
}

# ──────────────────────────────────────────────
#  FUNÇÕES AUXILIARES
# ──────────────────────────────────────────────
def mod_str(m):
    return f"+{m}" if m >= 0 else str(m)

def score_label(s):
    return "peak" if s >= 18 else ""

def render_attrs(attrs, t):
    NAMES = {"str":"FOR","dex":"DES","con":"CON","int":"INT","wis":"SAB","cha":"CAR"}
    html = '<div class="attr-grid">'
    for key, label in NAMES.items():
        a = attrs.get(key, {"score":10,"mod":0})
        peak = "peak" if a["score"] >= 18 else ""
        html += f'''
        <div class="attr-box">
          <span class="attr-label">{label}</span>
          <span class="attr-value {peak}">{a["score"]}</span>
          <span class="attr-mod">{mod_str(a["mod"])}</span>
        </div>'''
    html += '</div>'
    return html

def render_saving_throws(saves, t):
    if not saves:
        return ""
    html = '<ul class="save-list">'
    for s in saves:
        dot = "filled" if s.get("proficient") else ""
        html += f'<li class="save-item"><span class="prof-dot {dot}"></span><span class="save-name">{s["name"]}</span><span class="save-score {dot}">{mod_str(s["value"])}</span></li>'
    html += '</ul>'
    return html

def render_skills(skills, t):
    if not skills:
        return ""
    html = '<ul class="skill-list">'
    for s in skills:
        dot_class = "filled expertise" if s.get("expertise") else ("filled" if s.get("proficient") else "")
        peak = "peak" if s.get("proficient") or s.get("expertise") else ""
        html += f'<li class="skill-item"><span class="prof-dot {dot_class}"></span><span class="skill-name">{s["name"]}</span><span class="skill-attr">{s.get("attr","")}</span><span class="skill-score {peak}">{mod_str(s["value"])}</span></li>'
    html += '</ul>'
    return html

def render_attacks(attacks, t):
    if not attacks:
        return ""
    html = '''<table class="attack-table">
    <thead><tr>
      <th>Ataque</th><th>Bônus</th><th>Dano</th><th>Notas</th>
    </tr></thead><tbody>'''
    for a in attacks:
        html += f'''<tr>
      <td class="attack-name">{a["name"]}</td>
      <td class="attack-bonus">{a.get("bonus","—")}</td>
      <td class="attack-damage">{a.get("damage","—")}</td>
      <td class="attack-notes">{a.get("notes","—")}</td>
    </tr>'''
    html += '</tbody></table>'
    return html

def render_features(features, t):
    sections = [
        ("subclass","Habilidades de Subclasse"),
        ("class","Habilidades de Classe"),
        ("race","Habilidades Raciais"),
        ("feats","Talentos (Feats)"),
        ("invocations","Invocações Místicas"),
        ("metamagic","Metamagia"),
    ]
    html = ""
    for key, label in sections:
        items = features.get(key, [])
        if not items:
            continue
        accent = "gold-accent" if key in ("feats","metamagic") else ("dim-accent" if key == "race" else "")
        html += f'<div class="feat-section"><div class="feat-section-label">{label}</div><div class="feature-grid">'
        for feat in items:
            name = feat.get("name","")
            desc = feat.get("description","")
            lv = feat.get("level","")
            cost = feat.get("cost","")
            badge = f'<span class="feat-level">Nív.{lv}</span>' if lv else ""
            badge = f'<span class="feat-level">{cost}</span>' if cost else badge
            html += f'''<div class="trait-block {accent}">
              <div class="trait-name">{name} {badge}</div>
              <div class="trait-desc">{desc}</div>
            </div>'''
        html += '</div></div>'
    return html

def render_spells(spells, t):
    if not spells:
        return ""
    dc = spells.get("dc","—")
    atk = spells.get("attack","—")
    ability = spells.get("ability","—")
    slots = spells.get("slots","")

    html = f'''<div class="spell-meta">
      <span class="spell-tag">CD {dc}</span>
      <span class="spell-tag">Ataque {atk}</span>
      <span class="spell-tag">{ability}</span>
      {f'<span class="spell-tag gold">{slots}</span>' if slots else ""}
    </div>'''

    # Cantrips
    cantrips = spells.get("cantrips", [])
    if cantrips:
        html += '<div class="spell-section-label">Truques (Cantrips)</div><div class="spell-grid">'
        for s in cantrips:
            html += f'<div class="sc cantrip"><span class="sc-type">Truque</span><span class="sc-name">{s["name"]}</span><span class="sc-desc">{s.get("notes","")}</span></div>'
        html += '</div>'

    # Known / prepared spells
    known = spells.get("known", spells.get("prepared", []))
    if known:
        html += '<div class="spell-section-label">Magias</div><div class="spell-grid">'
        for s in known:
            lv = s.get("level","")
            lv_label = f"{lv}°" if lv else ""
            src = s.get("source","") or s.get("notes","")
            html += f'<div class="sc"><span class="sc-type">{lv_label} {s.get("school","")}</span><span class="sc-name">{s["name"]}</span><span class="sc-desc">{src}</span></div>'
        html += '</div>'

    # Domain spells
    domain = spells.get("domainSpells",[])
    if domain:
        html += '<div class="spell-section-label">Magias de Domínio</div><div class="spell-grid">'
        for s in domain:
            lv = s.get("level","")
            html += f'<div class="sc expanded"><span class="sc-type">{lv}° Círculo</span><span class="sc-name">{s["name"]}</span></div>'
        html += '</div>'

    # Secret Spells
    secret = spells.get("secretSpells",[])
    if secret:
        html += '<div class="spell-section-label">Segredos Mágicos</div><div class="spell-grid">'
        for s in secret:
            lv = s.get("level","")
            html += f'<div class="sc expanded"><span class="sc-type">{lv}° Círculo</span><span class="sc-name">{s["name"]}</span><span class="sc-desc">{s.get("notes","")}</span></div>'
        html += '</div>'

    # Mystic Arcanum
    arcanum = spells.get("mysticArcanum",[])
    if arcanum:
        html += '<div class="spell-section-label">Arcanum Místico</div><div class="spell-grid">'
        for s in arcanum:
            lv = s.get("level","")
            html += f'<div class="sc expanded"><span class="sc-type">{lv}° Círculo</span><span class="sc-name">{s["name"]}</span><span class="sc-desc">{s.get("notes","")}</span></div>'
        html += '</div>'

    return html

def render_personality(p, t):
    if not p:
        return ""
    fields = [
        ("traits","Traços de Personalidade"),
        ("ideals","Ideais"),
        ("bonds","Vínculos"),
        ("flaws","Fraquezas"),
    ]
    html = ""
    for key, label in fields:
        v = p.get(key,"")
        if v:
            html += f'<div class="trait-block"><div class="trait-name">{label}</div><div class="trait-desc">{v}</div></div>'
    return html

def render_equipment(equip, t):
    if not equip:
        return ""
    html = '<ul class="trait-list">'
    for item in equip:
        html += f'<li>{item}</li>'
    html += '</ul>'
    return html

# ──────────────────────────────────────────────
#  GERADOR PRINCIPAL
# ──────────────────────────────────────────────
def generate_sheet(slug, data):
    t = THEMES[slug]
    meta = data.get("metadata", {})
    ident = data.get("identity", {})
    attrs = data.get("attributes", {})
    combat = data.get("combat", {})
    features = data.get("features", {})
    spells = data.get("spells", None)
    attacks = data.get("attacks", [])
    personality = data.get("personality", {})
    equipment = data.get("equipment", [])
    saves = data.get("savingThrows", [])
    skills = data.get("skills", [])

    name = meta.get("name","")
    title = meta.get("title","")
    origin = meta.get("origin","")
    level = meta.get("level","")
    race = ident.get("race","")
    cls = ident.get("class","")
    subcls = ident.get("subclass","")
    background = ident.get("background","")
    alignment = ident.get("alignment","")
    languages = ", ".join(ident.get("languages",[]))
    portrait_ext = t["portrait_ext"]
    portrait_src = f"/portraits/{slug}.{portrait_ext}"

    # Tags
    tags_html = ""
    for tag in [race, cls, subcls, origin]:
        if tag:
            tags_html += f'<span class="tag hi">{tag}</span>'
    if background:
        tags_html += f'<span class="tag">Antecedente: {background}</span>'
    tags_html += f'<span class="tag">Nív. {level}</span>'

    # Combat stats bar
    combat_items = [
        ("CA","ac"), ("PV","hp"), ("Deslocamento","speed"),
        ("Iniciativa","initiative"), ("Prof. Bônus","proficiencyBonus"),
    ]
    stats_html = ""
    for label, key in combat_items:
        val = combat.get(key,"—")
        stats_html += f'<div class="stat-item"><span class="stat-label">{label}</span><span class="stat-value">{val}</span></div>'
    # Spell info
    spell_dc = combat.get("spellDC") or (spells.get("dc") if spells else None)
    spell_atk = combat.get("spellAttack") or (spells.get("attack") if spells else None)
    if spell_dc:
        stats_html += f'<div class="stat-item"><span class="stat-label">CD de Magia</span><span class="stat-value">{spell_dc}</span></div>'
    if spell_atk:
        stats_html += f'<div class="stat-item"><span class="stat-label">Atq. Mágico</span><span class="stat-value">{spell_atk}</span></div>'

    # Special combat notes
    special_notes = []
    for k in ["sneakAttack","divineSmite","layOnHands","pactMagic","actionSurge","rageUses","rageBonus","sorceryPoints","channelDivinity","extraAttack"]:
        v = combat.get(k)
        if v:
            special_notes.append(f"<span class='tag hi'>{k.replace('_',' ')}: {v}</span>")

    # Sections
    attr_html = render_attrs(attrs, t)
    save_html = render_saving_throws(saves, t)
    skill_html = render_skills(skills, t)
    atk_html = render_attacks(attacks, t)
    feat_html = render_features(features, t)
    spell_html = render_spells(spells, t) if spells else ""
    pers_html = render_personality(personality, t)
    equip_html = render_equipment(equipment, t)

    ac_desc = combat.get("acDescription","")
    hit_dice = combat.get("hitDice","")
    spell_ability = combat.get("spellAbility") or (spells.get("ability") if spells else "")

    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name} — {title} · Ficha D&amp;D 5e</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Share+Tech+Mono&display=swap" rel="stylesheet">
<style>
:root{{
  --primary:    {t["primary"]};
  --mid:        {t["mid"]};
  --bright:     {t["bright"]};
  --pale:       {t["pale"]};
  --dark:       {t["dark"]};
  --darker:     {t["darker"]};
  --card:       {t["card"]};
  --card-light: {t["card_light"]};
  --text:       {t["text"]};
  --text-dim:   {t["text_dim"]};
  --mist:       {t["mist"]};
  --gold:       {t["gold"]};
  --gold-light: {t["gold_light"]};
  --border:     {t["border"]};
  --border-bright:{t["border_bright"]};
  --glow:       {t["glow"]};
}}
*{{margin:0;padding:0;box-sizing:border-box;}}
body{{background:var(--darker);background-image:radial-gradient(ellipse at 15% 15%,{t["bg_grad1"]} 0%,transparent 50%),radial-gradient(ellipse at 80% 80%,{t["bg_grad2"]} 0%,transparent 45%);font-family:'EB Garamond',Georgia,serif;color:var(--text);line-height:1.75;}}
.page{{max-width:960px;margin:0 auto;padding:0 0 80px;}}

/* FLOATING PARTICLES */
.particle-bg{{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;}}
.particle{{position:absolute;font-size:11px;opacity:0;animation:floatP ease-in-out infinite;filter:blur(0.4px);color:var(--bright);}}
@keyframes floatP{{0%{{transform:translateY(108vh) translateX(0) rotate(0deg) scale(0.5);opacity:0;}}8%{{opacity:0.25;}}50%{{transform:translateY(50vh) translateX(35px) rotate(180deg) scale(0.75);opacity:0.15;}}92%{{opacity:0.06;}}100%{{transform:translateY(-8vh) translateX(-20px) rotate(340deg) scale(0.4);opacity:0;}}}}

/* HEADER */
.header{{background:linear-gradient(165deg,{t["dark"]} 0%,{t["card"]} 50%,{t["dark"]} 100%);border-bottom:2px solid var(--primary);position:relative;overflow:hidden;z-index:1;}}
.header::before{{content:'';position:absolute;inset:0;background:repeating-linear-gradient(55deg,transparent,transparent 64px,{t["bg_grad1"]} 64px,{t["bg_grad1"]} 65px);}}
.header::after{{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--mid),var(--bright),var(--mid),transparent);opacity:0.55;}}
.header-inner{{display:flex;align-items:stretch;position:relative;z-index:1;}}

/* PORTRAIT */
.header-portrait{{width:220px;flex-shrink:0;background:{t["dark"]};border-right:2px solid var(--primary);display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;}}
.portrait-inner{{width:100%;height:290px;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;}}
.portrait-photo{{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:transform 0.4s ease;}}
.portrait-photo:hover{{transform:scale(1.04);}}
.portrait-overlay{{position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,{t["darker"]}aa 100%);pointer-events:none;}}
.portrait-label{{position:absolute;bottom:12px;left:0;right:0;text-align:center;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:3px;color:var(--bright);opacity:0.6;text-transform:uppercase;text-shadow:0 0 8px var(--primary);}}

/* HEADER TEXT */
.header-text{{flex:1;padding:34px 44px;}}
.header-eyebrow{{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:4px;color:var(--mid);opacity:0.85;text-transform:uppercase;margin-bottom:10px;}}
.header-name{{font-family:'Cinzel',serif;font-size:42px;font-weight:900;color:var(--pale);text-shadow:0 0 50px {t["glow"].replace("0.15","0.5")},0 0 15px {t["glow"].replace("0.15","0.3")};letter-spacing:2px;line-height:1;margin-bottom:4px;}}
.header-sub{{font-family:'EB Garamond',serif;font-style:italic;font-size:16px;color:var(--gold);margin-bottom:20px;letter-spacing:1.5px;opacity:0.95;}}
.header-tags{{display:flex;gap:7px;flex-wrap:wrap;}}
.tag{{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:2px;padding:3px 11px;border:1px solid var(--border);color:var(--text-dim);text-transform:uppercase;background:{t["bg_grad1"]};}}
.tag.hi{{background:{t["glow"]};border-color:var(--mid);color:var(--bright);}}
.tag.gold{{background:rgba(201,162,39,0.10);border-color:rgba(201,162,39,0.4);color:var(--gold-light);}}

/* STATS BAR */
.stats-bar{{background:var(--card);border-bottom:1px solid var(--border);padding:13px 40px;display:flex;flex-wrap:wrap;position:relative;z-index:1;gap:0;}}
.stat-item{{flex:1;border-right:1px solid var(--border);padding:0 18px;text-align:center;min-width:90px;}}
.stat-item:first-child{{padding-left:0;}}.stat-item:last-child{{border-right:none;padding-right:0;}}
.stat-label{{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:3px;color:var(--text-dim);text-transform:uppercase;display:block;margin-bottom:2px;}}
.stat-value{{font-family:'Cinzel',serif;font-size:13px;color:var(--bright);font-weight:600;}}

/* SECTION */
.sec{{padding:0 40px;margin-top:32px;position:relative;z-index:1;}}
.sec-title{{font-family:'Cinzel',serif;font-size:11px;font-weight:700;letter-spacing:5px;text-transform:uppercase;color:var(--mid);border-bottom:1px solid var(--border);padding-bottom:8px;margin-bottom:18px;display:flex;align-items:center;gap:10px;}}
.sec-title::before{{content:'✦';font-size:11px;color:var(--gold);}}

/* ATTRIBUTES */
.attr-grid{{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-bottom:18px;}}
.attr-box{{background:var(--card);border:1px solid var(--border);text-align:center;padding:12px 4px 10px;position:relative;}}
.attr-box::after{{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--primary);opacity:0.45;}}
.attr-label{{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:var(--text-dim);display:block;margin-bottom:4px;}}
.attr-value{{font-family:'Cinzel',serif;font-size:26px;font-weight:900;color:var(--text);display:block;line-height:1;}}
.attr-value.peak{{color:var(--bright);text-shadow:0 0 14px {t["glow"].replace("0.15","0.45")};}}
.attr-mod{{font-family:'Share Tech Mono',monospace;font-size:12px;color:var(--mid);display:block;margin-top:3px;}}

/* COMBAT NOTES */
.special-notes{{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;}}

/* SAVES & SKILLS */
.two-col{{display:grid;grid-template-columns:230px 1fr;gap:16px;}}
.save-list,.skill-list{{list-style:none;padding:0;}}
.save-item,.skill-item{{display:flex;align-items:center;gap:7px;padding:3px 0;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.04);}}
.save-item:last-child,.skill-item:last-child{{border-bottom:none;}}
.prof-dot{{width:10px;height:10px;border-radius:50%;border:1.5px solid var(--text-dim);flex-shrink:0;}}
.prof-dot.filled{{background:var(--mid);border-color:var(--bright);box-shadow:0 0 6px {t["glow"].replace("0.15","0.5")};}}
.prof-dot.expertise{{background:var(--gold);border-color:var(--gold-light);}}
.save-name,.skill-name{{flex:1;color:var(--text);}}
.skill-attr{{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-dim);width:28px;}}
.save-score,.skill-score{{font-family:'Share Tech Mono',monospace;font-size:12px;color:var(--text-dim);width:28px;text-align:right;}}
.save-score.filled,.skill-score.filled,.skill-score.peak{{color:var(--bright);}}

/* ATTACKS */
.attack-table{{width:100%;border-collapse:collapse;font-size:13px;}}
.attack-table th{{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--text-dim);padding:6px 10px;text-align:left;border-bottom:1px solid var(--border);background:{t["bg_grad1"]};}}
.attack-table td{{padding:8px 10px;border-bottom:1px solid {t["border"]};color:var(--text);vertical-align:top;}}
.attack-table tr:hover td{{background:{t["glow"]};}}
.attack-name{{font-family:'Cinzel',serif;font-size:12px;color:var(--pale);}}
.attack-bonus{{font-family:'Share Tech Mono',monospace;font-size:13px;color:var(--bright);font-weight:700;}}
.attack-damage{{font-family:'Share Tech Mono',monospace;font-size:12px;color:var(--gold-light);}}
.attack-notes{{font-size:12px;color:var(--text-dim);font-style:italic;}}

/* FEATURES */
.feat-section{{margin-bottom:10px;}}
.feat-section-label{{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.5px;color:var(--bright);font-weight:700;display:block;margin:12px 0 8px;}}
.feature-grid{{display:grid;grid-template-columns:1fr 1fr;gap:10px;}}
.trait-block{{background:var(--card);border:1px solid var(--border);border-left:3px solid var(--primary);padding:12px 14px;}}
.trait-block.gold-accent{{border-left-color:var(--gold);}}
.trait-block.dim-accent{{border-left-color:var(--mist);}}
.trait-name{{font-family:'Cinzel',serif;font-size:11px;color:var(--bright);letter-spacing:0.5px;margin-bottom:5px;text-transform:uppercase;display:flex;align-items:center;gap:8px;}}
.trait-block.gold-accent .trait-name{{color:var(--gold-light);}}
.trait-block.dim-accent .trait-name{{color:var(--text-dim);}}
.trait-desc{{font-size:13.5px;color:var(--text-dim);line-height:1.6;}}
.trait-desc em{{font-style:italic;color:var(--bright);}}
.trait-desc strong{{color:var(--text);}}
.feat-level{{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:2px;background:{t["glow"]};color:var(--mid);padding:1px 6px;}}

/* SPELLS */
.spell-meta{{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}}
.spell-tag{{background:var(--card-light);color:var(--bright);font-family:'Cinzel',serif;font-size:10px;padding:3px 9px;letter-spacing:1px;border:1px solid var(--border);display:inline-block;}}
.spell-tag.gold{{background:rgba(201,162,39,0.08);color:var(--gold-light);border-color:rgba(201,162,39,0.28);}}
.spell-section-label{{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.5px;color:var(--bright);font-weight:700;display:block;margin:13px 0 8px;}}
.spell-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:7px;}}
.sc{{background:var(--card-light);border:1px solid var(--border);border-top:2px solid var(--mist);padding:9px 12px 10px;display:flex;flex-direction:column;gap:3px;}}
.sc.cantrip{{border-top-color:{t["border"]};}}
.sc.expanded{{border-top-color:var(--gold);}}
.sc-type{{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-dim);opacity:0.65;}}
.sc-name{{font-family:'Cinzel',serif;font-size:11.5px;font-weight:600;color:var(--bright);letter-spacing:0.4px;}}
.sc.cantrip .sc-name{{color:var(--text-dim);}}
.sc.expanded .sc-name{{color:var(--gold-light);}}
.sc-desc{{font-size:12px;color:var(--text-dim);line-height:1.5;margin-top:1px;}}

/* TRAIT LIST (equipment) */
ul.trait-list{{list-style:none;padding:0;}}
ul.trait-list li{{padding:3px 0 3px 18px;position:relative;font-size:14px;line-height:1.65;color:var(--text-dim);}}
ul.trait-list li::before{{content:'◆';position:absolute;left:0;color:var(--gold);font-size:7px;top:7px;}}

/* DIVIDER */
.divider{{text-align:center;margin:24px 0;color:var(--mist);font-size:14px;letter-spacing:14px;opacity:0.5;}}

/* INFO PILLS */
.info-pills{{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;}}
.info-pill{{background:var(--card);border:1px solid var(--border);padding:8px 14px;font-size:13px;color:var(--text-dim);}}
.info-pill strong{{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:3px;color:var(--mid);text-transform:uppercase;display:block;margin-bottom:3px;}}

/* FOOTER */
.footer{{margin-top:50px;padding:22px 40px;text-align:center;border-top:1px solid var(--border);background:linear-gradient(180deg,transparent 0%,{t["darker"]}99 100%);position:relative;z-index:1;}}
.footer p{{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:2px;color:var(--text-dim);opacity:0.5;text-transform:uppercase;margin-bottom:4px;}}

/* RESPONSIVE */
@media(max-width:680px){{
  .header-inner{{flex-direction:column;}}
  .header-portrait{{width:100%;height:200px;}}
  .portrait-inner{{height:200px;}}
  .attr-grid{{grid-template-columns:repeat(3,1fr);}}
  .feature-grid{{grid-template-columns:1fr;}}
  .spell-grid{{grid-template-columns:1fr;}}
  .stats-bar{{flex-wrap:wrap;gap:4px;}}
  .stat-item{{flex:none;width:48%;border-right:none;border-bottom:1px solid var(--border);padding:6px 0;}}
  .two-col{{grid-template-columns:1fr;}}
  .sec{{padding:0 16px;}}
  .header-text{{padding:20px 24px;}}
  .stats-bar{{padding:10px 16px;}}
}}
</style>
</head>
<body>

<!-- Floating Particles -->
<div class="particle-bg" id="particleBg"></div>

<div class="page">

<!-- ── HEADER ─────────────────────────────────── -->
<div class="header">
  <div class="header-inner">
    <div class="header-portrait">
      <div class="portrait-inner">
        <img class="portrait-photo" src="{portrait_src}" alt="{name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div style="display:none;flex-direction:column;align-items:center;justify-content:center;height:100%;font-size:64px;opacity:0.15;filter:drop-shadow(0 0 20px var(--bright));">{t["symbol"]}</div>
        <div class="portrait-overlay"></div>
      </div>
      <div class="portrait-label">{name}</div>
    </div>
    <div class="header-text">
      <div class="header-eyebrow">Ficha · D&amp;D 5e · {origin}</div>
      <div class="header-name">{name}</div>
      <div class="header-sub">{title}</div>
      <div class="header-tags">
        {tags_html}
      </div>
    </div>
  </div>
</div>

<!-- ── STATS BAR ──────────────────────────────── -->
<div class="stats-bar">
{stats_html}
</div>

<!-- ── IDENTIDADE ────────────────────────────── -->
<div class="sec">
  <div class="sec-title">Identidade</div>
  <div class="info-pills">
    <div class="info-pill"><strong>Raça</strong>{race}</div>
    <div class="info-pill"><strong>Classe</strong>{cls}</div>
    <div class="info-pill"><strong>Subclasse</strong>{subcls}</div>
    <div class="info-pill"><strong>Antecedente</strong>{background}</div>
    <div class="info-pill"><strong>Tendência</strong>{alignment}</div>
    <div class="info-pill"><strong>Idiomas</strong>{languages}</div>
    {f'<div class="info-pill"><strong>Dado de Vida</strong>{hit_dice}</div>' if hit_dice else ""}
    {f'<div class="info-pill"><strong>Magia</strong>{spell_ability}</div>' if spell_ability else ""}
  </div>
  {f'<div class="info-pills">{" ".join(special_notes)}</div>' if special_notes else ""}
</div>

<!-- ── ATRIBUTOS ──────────────────────────────── -->
<div class="sec">
  <div class="sec-title">Atributos</div>
  {attr_html}
  {f'<p style="font-size:12px;color:var(--text-dim);font-style:italic;">{ac_desc}</p>' if ac_desc else ""}
</div>

{'<!-- ── SALVAGUARDAS & PERÍCIAS ─────────────── -->' if (saves or skills) else ""}
{f"""<div class="sec">
  <div class="sec-title">Salvaguardas &amp; Perícias</div>
  <div class="two-col">
    <div>
      <div class="feat-section-label">Salvaguardas</div>
      {save_html}
    </div>
    <div>
      <div class="feat-section-label">Perícias</div>
      {skill_html}
    </div>
  </div>
</div>""" if (saves or skills) else ""}

{'<!-- ── ATAQUES ──────────────────────────────── -->' if atk_html else ""}
{f"""<div class="sec">
  <div class="sec-title">Ataques</div>
  {atk_html}
</div>""" if atk_html else ""}

<!-- ── HABILIDADES ───────────────────────────── -->
<div class="sec">
  <div class="sec-title">Habilidades</div>
  {feat_html}
</div>

{'<!-- ── MAGIAS ───────────────────────────────── -->' if spell_html else ""}
{f"""<div class="sec">
  <div class="sec-title">Magia</div>
  {spell_html}
</div>""" if spell_html else ""}

{'<!-- ── EQUIPAMENTO ──────────────────────────── -->' if equip_html else ""}
{f"""<div class="sec">
  <div class="sec-title">Equipamento</div>
  {equip_html}
</div>""" if equip_html else ""}

<!-- ── PERSONALIDADE ─────────────────────────── -->
<div class="sec">
  <div class="sec-title">Personalidade</div>
  {pers_html}
</div>

<div class="divider">✦ ✧ ✦</div>

<!-- ── FOOTER ────────────────────────────────── -->
<div class="footer">
  <p>{name} · {cls} {subcls} · Nível {level}</p>
  <p>D&amp;D 5e · {origin} · Sistema de Fichas RPG</p>
</div>

</div><!-- /page -->

<script>
(function() {{
  const particles = "{t["particles"]}".split("");
  const container = document.getElementById('particleBg');
  for (let i = 0; i < 20; i++) {{
    const p = document.createElement('span');
    p.className = 'particle';
    p.textContent = particles[i % particles.length];
    p.style.left = (Math.random() * 100) + '%';
    p.style.animationDuration = (12 + Math.random() * 18) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    p.style.fontSize = (9 + Math.random() * 6) + 'px';
    container.appendChild(p);
  }}
}})();
</script>

</body>
</html>"""
    return html

# ──────────────────────────────────────────────
#  MAIN
# ──────────────────────────────────────────────
def main():
    os.makedirs(f"{BASE}/scripts", exist_ok=True)
    generated = []
    failed = []

    for slug in THEMES:
        data_path = f"{LEGACY}/{slug}/data.json"
        if not os.path.exists(data_path):
            print(f"[SKIP] {slug}: data.json not found")
            continue

        with open(data_path, encoding="utf-8") as f:
            data = json.load(f)

        try:
            html = generate_sheet(slug, data)

            # Save to legacy/characters/*/sheet.html
            out_legacy = f"{LEGACY}/{slug}/sheet.html"
            with open(out_legacy, "w", encoding="utf-8") as f:
                f.write(html)

            # Save to public/fichas/*.html
            out_public = f"{PUBLIC}/{slug}.html"
            with open(out_public, "w", encoding="utf-8") as f:
                f.write(html)

            generated.append(slug)
            print(f"[OK] {slug}")
        except Exception as e:
            failed.append((slug, str(e)))
            print(f"[ERR] {slug}: {e}")
            import traceback; traceback.print_exc()

    print(f"\n✓ Generated: {generated}")
    if failed:
        print(f"✗ Failed: {failed}")

if __name__ == "__main__":
    main()
