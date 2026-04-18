# Schema vs PDF dump reconcile — session 2

Scope: dnd, vampiro, daggerheart only. Avatar/candela/sacramento deferred (no semantic source — PDF dump field names are anonymous, no vault docs).

## Slug rename (executed)

Canonical slug per `lib/systems.ts`: `dnd`. Aligned outliers:

- `schemas/dnd5e.json` → `schemas/dnd.json` (+ `system: "dnd5e"` → `"dnd"`)
- `components/templates/index.tsx` registry key `dnd5e` → `dnd`
- `components/ficha/CharacterImageUpload.tsx` switch case `'dnd5e'` → `'dnd'`
- 4 test files: all `dnd5e` strings → `dnd`

Side effect: fixes runtime fallback bug. Pages pass `sistema='dnd'` (URL slug) to `TemplateRenderer`; previously hit `getSystemTemplate('dnd')` → undefined → "Unknown System" fallback. Now resolves to `DnDTemplate`.

## Field-count gap

| system | schema atomic fields | PDF AcroForm fields | ratio | notes |
|---|---|---|---|---|
| dnd | 65 | 335 | 5.2× | PDF includes per-row attack slots, spell-list grids, skill checkbox pairs (proficient/expertise) — schema collapses these into arrays. |
| vampiro | 61 | 363 | 6.0× | PDF dot trackers (5 checkboxes per attribute/skill) explode the count; schema uses `valor: 0..5`. |
| daggerheart | 36 | 0 | n/a | Source PDF (`Character-Sheets-and-Guides-Daggerheart-May212025.pdf`, 22pp) has **no AcroForm** — guide/scan, not fillable. Cannot reconcile field-by-field. |

**Verdict:** count delta is structural (different abstraction levels), not a defect. Per-field name matching impossible without visual inspection — PDF field names are anonymous (`text_2gdrn`, `checkbox_14ucix`).

## Structural notes (semantics NOT changed)

Logged for future sessions. No edits applied per directive ("do not infer semantic schemas").

### dnd
- Mixed key language: `strength`, `acrobatics` (EN) vs `nivel`, `classe_armadura` (PT). Vampiro/daggerheart use full PT. Inconsistent convention.
- `combat.cd_magia` (number) duplicates `magic.cd_magia` (string). Same field, different sections + types.
- `magic.circulo_1`, `circulo_2` only — D&D 5e has 9 spell levels. Schema truncated.

### vampiro
- `abilities` 3-group (talentos/pericias/conhecimentos) × 9 subfields each — matches V5 sheet structure.
- `social.contatos` is array but `recursos`/`influencia`/`estatus` are scalars — V20/V5 has these as 0..5 dot-rated like backgrounds. Possible model drift.

### daggerheart
- `combat` section uses D&D model: `classe_armadura`, `pv_maximos`, `dados_vida`. Vault doc (`daggerheart-base.md`) explicitly defines system as Estresse + Defesa, no CA/HP. Schema inherited from D&D template, doesn't match system mechanics.
- `stats` mixes group-pool resources (`aspiracao`, `desespero`) with character attributes (`graca`, `sangue`, `espirito`, `sabedoria`, `meia_noite`, `valentia`, `esplendor`). Per vault, aspiração/desespero are shared group resources, not per-character stats.
- Source PDF has no fillable form. Future reconcile needs either fan-made fillable PDF or visual mapping session.

## Deferred

- Authoring schemas for **avatar**, **candela**, **sacramento** — blocked on semantic source. Options for next session: (a) WebFetch system rule references in PT-BR, (b) visual PDF inspection with user-dictated field labels, (c) wait for vault docs.
- Daggerheart schema **semantic rewrite** to match Estresse/Defesa model — needs explicit user sign-off, touches existing template (`components/templates/daggerheart/layout`).
- dnd schema key-language normalization (EN→PT) — touches existing `DnDTemplate` reads.
