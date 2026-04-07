# Projeto RPG — Site de Fichas

## Stack
- Next.js 16.2.2 (App Router) + TypeScript + Tailwind v4
- Dados locais em JSON (`content/sistemas-de-rpg/[system]/characters/*.json`)
- API Routes para leitura/escrita (`/app/api/characters/[sistema]/[slug]/route.ts`)
- Obsidian vault em `C:\ProjetosVSCODE\Projeto-RPG-Cerebro-Organizado`

## Comandos
- `npm run dev` — Dev server (Turbopack)
- `npm run build` — Build de produção (verifica types)
- `npm run lint` — ESLint

## Arquitetura
- Rotas: `/`, `/sistemas-de-rpg`, `/sistemas-de-rpg/[sistema]`, `/sistemas-de-rpg/[sistema]/personagens/[slug]`, `/.../[slug]/edit`
- JSON Schema varia por personagem. `FichaView` é resiliente (null guards).
- Next.js 16: `params` é Promise — usar `await params` ou `use(params)` no client.
- Dados em `content/`, não `data/`.

## Legado
- HTMLs de referência em `legacy/html/` — não apagar.
