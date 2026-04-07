# Akasharium — Redesign Visual Completo

**Data:** 2026-04-07  
**Escopo:** Home, página de sistemas, páginas por sistema (D&D, Daggerheart, Vampiro)  
**Abordagem técnica:** CSS-first + Vanilla JS pontual (parallax). Sem novas dependências.

---

## 1. Renomeação Global

- "Forge RPG" → **Akasharium** em todo o site
- Arquivos afetados: `app/layout.tsx` (metadata title/description), `components/layout/Header.tsx`, `app/page.tsx` (título h1 e qualquer texto fixo)

---

## 2. Home Page (`app/page.tsx`)

### 2.1 Hero — Viewport Completo

**Background:**
- Camada base: `#050305` (quase preto com toque roxo)
- SVG noise texture como `background-image` data URI (opacidade 4%)
- Gradiente radial animado em loop lento (20s): pulsa entre roxo-escuro (`rgba(80,0,120,0.15)`), bordeaux (`rgba(120,0,40,0.12)`) e transparente
- Parallax via Vanilla JS: listener de `scroll`, fundo se desloca `scrollY * 0.3` no eixo Y

**Conteúdo (centralizado verticalmente):**
- Ornamento SVG inline: linha fina horizontal com losango no centro, dourado (`#c9a227`, 40% opacity)
- Eyebrow: `CENTRAL DE FICHAS · MULTI-SISTEMA` em Share Tech Mono, 10px, tracking 0.4em, dourado 50% opacity
- Título `AKASHARIUM` em Cinzel 900, `clamp(3.5rem, 8vw, 9rem)`, cor `#e8c85a`
  - text-shadow: `0 0 80px rgba(201,162,39,0.5), 0 0 160px rgba(201,162,39,0.2)`
  - Animação de entrada: `fadeRise` 0.8s ease-out (opacity 0→1, translateY 20px→0)
  - Animação contínua: `glowPulse` 4s ease-in-out infinite (text-shadow oscila suavemente)
- Subtítulo em Crimson Pro italic, 1.2rem, `#8a7a60`, fade-in com delay 0.3s
- Ornamento inferior (espelho do superior)
- CTAs:
  - **Primário** "Explorar Sistemas": borda `#c9a227`, bg `rgba(201,162,39,0.1)`, hover com shimmer sweep (pseudo-elemento `::after` translucido que varre da esquerda para direita)
  - **Secundário** "Ver Personagens (N)": ghost border `rgba(255,255,255,0.15)`, hover border dourada

**Partículas:**
- Ativar ember particles na home também, usando o mesmo mecanismo do `SystemThemeProvider`, mas com cores douradas/âmbar (`#c9a227`, `#b87333`)
- 15 partículas, tamanhos 1–3px, duração 10–18s

### 2.2 Seção Sistemas

- Título de seção ornamentado: linha decorativa nas duas pontas com texto centralizado
- Grid `sm:grid-cols-3`, cards maiores (padding 1.5rem)
- Cada card:
  - Background `var(--color-rpg-surface-raised)` base
  - Borda top 2px sólida na cor do sistema (vermelho D&D, laranja Daggerheart, bordeaux Vampiro)
  - Ícone centralizado, 2.5rem, com `filter: drop-shadow` na cor temática
  - Nome em Cinzel, subtítulo mono com contagem
  - Hover: `translateY(-4px)`, `box-shadow` com cor temática, bg com gradiente sutil temático
  - Animação de entrada escalonada: `animation-delay: calc(var(--i) * 0.1s)` via CSS custom property

### 2.3 Seção Personagens

- Título com ornamentos laterais (linhas finas)
- Cards com `border-left: 3px solid` na cor do sistema do personagem
- Sem alterações estruturais nos cards existentes

---

## 3. Página de Sistemas (`app/sistemas-de-rpg/page.tsx`)

### 3.1 Hero Compacto (~40vh)

- Mesmo background noise + gradiente animado da home (reutiliza classes CSS)
- Partículas ember douradas ativas
- Título com ornamento decorativo
- Parallax leve (mesmo JS da home, extraído para hook/utility)

### 3.2 Grid de Sistemas

- Troca lista vertical por grid responsivo: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Cards grandes com:
  - Ícone centralizado grande (3rem) com glow
  - Nome em Cinzel
  - Contagem em mono
  - Borda top 3px colorida por sistema
  - Hover: scale(1.02) + glow temático
  - Entrada escalonada via CSS delay

---

## 4. Páginas por Sistema (`app/sistemas-de-rpg/[sistema]/page.tsx`)

O `SystemThemeProvider` já aplica `data-system-theme` e partículas. As mudanças adicionam hero temático e elementos decorativos únicos por sistema.

### 4.1 Hero por Sistema

Cada sistema ganha um hero de ~35vh com:
- Background temático próprio (detalhado abaixo)
- Ornamento decorativo único (SVG watermark, 5–8% opacity)
- Título com glow temático
- Breadcrumb integrado no hero

### D&D 5e — "Grimório Carmesim"

**Background hero:**
- `#0d0505` base
- SVG noise sépia + gradiente radial crimson (`rgba(139,0,0,0.25)` no centro)
- Watermark SVG: cruz/ornamento medieval, 8% opacity, posição central

**Elementos:**
- Borda decorativa dupla ao redor do hero (frame estilo manuscrito medieval): linhas concêntricas finas em `rgba(139,0,0,0.3)`
- Título `D&D 5e` com glow `rgba(139,0,0,0.8)` e cor `#e8ddd0`
- Separadores de seção: linha horizontal com padrão de runa (3 traços + símbolo central)
- Cards de personagem: border-left crimson via `var(--color-theme-brand)` já aplicado pelo `SystemThemeProvider` — sem modificar `CharacterCard`

### Daggerheart — "Esperança Forjada"

**Background hero:**
- `#1a1208` base
- Gradiente laranja-jade: `rgba(194,77,44,0.2)` canto superior + `rgba(50,120,80,0.1)` canto inferior
- Watermark SVG: losango/hexágono geométrico, 6% opacity

**Elementos:**
- Visual mais aberto, espaçamento generoso (menos claustrofóbico que D&D/Vampiro)
- Ornamento geométrico (losangos encadeados) como separador de seção
- Título com glow `rgba(194,77,44,0.7)`, cor `#f2e8de`
- Cards com accent verde-jade (`#3d8b5e`) no border-left

### Vampiro: A Máscara — "Noite Eterna"

**Background hero:**
- `#080305` base (o mais escuro)
- Gradiente "mancha de sangue": radial bordeaux `rgba(120,0,20,0.3)` partindo do topo
- SVG noise marble texture + gradiente vampírico
- Watermark SVG: rosa gótica estilizada (5 pétalas angulosas), 7% opacity

**Elementos:**
- Título com glow bordeaux pulsante lento `rgba(139,0,0,0.9)`, cor `#e8ddd0`
- Separadores: linha horizontal com 3 "gotas" (SVG inline) espaçadas
- Cards com border-left bordeaux escuro
- Animação de texto: shimmer muito sutil vermelho-sangue no hover do título

---

## 5. CSS Global — Adições em `globals.css`

Novos keyframes:
```css
@keyframes fadeRise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes glowPulse { 0%, 100% { text-shadow: 0 0 80px rgba(201,162,39,0.5); } 50% { text-shadow: 0 0 120px rgba(201,162,39,0.8), 0 0 40px rgba(201,162,39,0.3); } }
@keyframes shimmerSweep { from { transform: translateX(-100%); } to { transform: translateX(200%); } }
@keyframes bgPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
```

Novas classes utilitárias:
- `.hero-noise-bg` — noise SVG data URI como background-image
- `.hero-gradient-animated` — gradiente radial com `bgPulse` animation
- `.ornament-line` — ornamento de linha com losango centralizado
- `.section-title-ornate` — título de seção com linhas laterais decorativas
- `.system-card-themed` — card com variáveis temáticas via CSS custom props
- `.card-enter` — animação de entrada com `fadeRise` + delay via `--i`

---

## 6. Parallax Utility (`lib/useParallax.ts`)

Hook client-side simples:
```ts
// Atualiza CSS custom property --parallax-y no elemento
// Usado no hero da home e da página de sistemas
useEffect(() => {
  const handler = () => el.style.setProperty('--parallax-y', `${window.scrollY * factor}px`);
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}, []);
```

---

## 7. Arquivos a Criar/Modificar

| Arquivo | Ação |
|---|---|
| `app/layout.tsx` | Atualizar metadata (título, descrição) |
| `app/page.tsx` | Redesign completo (hero, sistemas, personagens) |
| `app/sistemas-de-rpg/page.tsx` | Redesign completo |
| `app/sistemas-de-rpg/[sistema]/page.tsx` | Hero temático por sistema |
| `components/layout/Header.tsx` | "Forge RPG" → "Akasharium" |
| `app/globals.css` | Novos keyframes + classes utilitárias |
| `lib/useParallax.ts` | Novo — hook de parallax |
| `components/ui/OrnamentLine.tsx` | Novo — ornamento SVG reutilizável |
| `components/home/HeroParticles.tsx` | Novo — partículas âmbar leves para home (independente do SystemThemeProvider) |

---

## 8. Não está no escopo

- Alteração de fichas de personagem (FichaView, DnDFichaSheet, FichaIframe)
- Página de edição (`/edit`)
- Alteração de dados/JSON
- Adição de novas funcionalidades (busca, filtros, etc.)
