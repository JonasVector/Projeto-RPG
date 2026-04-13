# Projeto RPG — Site de Fichas (Akasharium)

## Stack
- Next.js 16.2.2 (App Router) + TypeScript + Tailwind v4
- Framer Motion — micro-interactions, modals, staggered entrance animations
- Radix UI — accessible Dialog primitives (CreatePlayerModal, CreateSheetModal)
- Dados locais em JSON (`content/sistemas-de-rpg/[system]/characters/*.json`)
- API Routes: `/app/api/characters/[sistema]/[slug]/route.ts` (GET/PUT), `/app/api/characters/[sistema]/route.ts` (POST — create), `/app/api/players/route.ts` (POST — create player)
- Obsidian vault em `C:\ProjetosVSCODE\Projeto-RPG-Cerebro-Organizado`

## Comandos
- `npm run dev` — Dev server (webpack, NOT Turbopack — see next.config.ts)
- `npm run build` — Build de produção (verifica types)
- `npm run lint` — ESLint

## Arquitetura de Rotas
- `/` — Dashboard home (stats, recent sheets, players, systems overview)
- `/jogadores` — Lista de jogadores + botão Create Player
- `/jogadores/[slug]` — Perfil do jogador + Create Sheet modal
- `/jogadores/[slug]/[sistema]` — Fichas do jogador naquele sistema
- `/sistemas-de-rpg` — Grid de todos os sistemas
- `/sistemas-de-rpg/[sistema]` — Sistema → Players naquele sistema → Fichas (hierarquia invertida)
- `/sistemas-de-rpg/[sistema]/personagens/[slug]` — Visualização da ficha
- `/sistemas-de-rpg/[sistema]/personagens/[slug]/edit` — Edição da ficha

## Arquitetura de Componentes
- `lib/systems.ts` — **Fonte única de verdade** para metadata de sistemas (accent, glow, icon, label, etc.)
- `lib/system-labels.ts` — Re-exporta de `lib/systems.ts` para compatibilidade
- `components/home/DashboardClient.tsx` — Dashboard principal (Client Component)
- `components/players/CreatePlayerModal.tsx` — Modal de criação de jogador (Radix Dialog)
- `components/players/CreateSheetModal.tsx` — Modal de criação de ficha (2 steps: sistema → nome)
- `components/sistemas/SystemPlayerCard.tsx` — Cards de jogadores na página de sistema (Client Component)
- `components/theme/` — ThemeProvider, SystemWatermark, SystemSeparator, theme-config

## Regras de Dados
- JSON Schema varia por sistema. `FichaView` é resiliente (null guards).
- Next.js 16: `params` é Promise — usar `await params` no server component.
- Dados em `content/`, não `data/`.
- JonasVector (`content/jogadores/jonasvector.json`) é o único jogador existente.
- Todos os 16 personagens D&D estão vinculados a JonasVector — não desanexar.

## Legado
- HTMLs de referência em `legacy/html/` — não apagar.
