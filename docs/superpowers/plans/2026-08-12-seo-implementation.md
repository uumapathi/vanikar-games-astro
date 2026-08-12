# SEO Recommendations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the high-priority SEO recommendations from `vanikar-games-seo-recommendations.md` on the Vanikar.Games Astro site.

**Architecture:** Static Astro 5 site. SEO is delivered through: (a) technical foundation (canonical URLs, sitemap, robots.txt, OG tags), (b) keyword-optimized titles/descriptions/H1s, (c) new long-tail sections + FAQs on every game page driven by `src/data/games.ts`, (d) six feature landing pages built from one shared component, (e) JSON-LD structured data (Organization, SoftwareApplication, VideoGame, FAQPage, BreadcrumbList).

**Tech Stack:** Astro 5 (static output), @astrojs/sitemap, TypeScript data files.

**Scope notes (from the spec, prioritized per its §18):**
- P1 Homepage keywords/title/meta — IN SCOPE
- P2/P3 Game pages: "Play [Game] Online" pattern + against computer / with friends / offline sections + FAQ — IN SCOPE (template-driven; every game already has a page, coming-soon included, satisfying §8)
- P6 Feature landing pages (§11) — IN SCOPE (6 pages)
- §13 "Real stakes" wording — IN SCOPE
- §16 Structured data — IN SCOPE
- §17 Technical checklist (canonical, sitemap, robots, OG) — IN SCOPE
- §9/§10 rules/strategy article clusters (`/games/hearts/rules/` etc.) — OUT OF SCOPE for this pass (large content effort; game pages already contain rules/scoring/strategy sections on one URL). Future work.
- §7 authority building / §12 tournament keywords — not a code task.

---

### Task 1: Technical foundation — site URL, sitemap, robots.txt

**Files:**
- Modify: `astro.config.mjs`
- Create: `public/robots.txt`
- Modify: `package.json` (via `npm install @astrojs/sitemap`)

- [ ] Step 1: `npm install @astrojs/sitemap`
- [ ] Step 2: In `astro.config.mjs` add `site: 'https://vanikar.games'` and `integrations: [sitemap()]`
- [ ] Step 3: Create `public/robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://vanikar.games/sitemap-index.xml
```

- [ ] Step 4: `npm run build` — verify `dist/sitemap-index.xml` exists
- [ ] Step 5: Commit

### Task 2: BaseLayout — canonical, OG url/site_name, head slot, new default title/meta

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] Step 1: Default title → `Online Card Games – Hearts, Spades, Rummy & More | Vanikar` (spec §2)
- [ ] Step 2: Default description → `Play classic card games online or offline with Vanikar. Enjoy Hearts, Spades, Gin Rummy, Cribbage, Big Two, Indian Rummy and more against AI, friends or online players.` (spec §3)
- [ ] Step 3: Add `<link rel="canonical" href={canonicalURL} />` using `new URL(Astro.url.pathname, Astro.site)`, plus `og:url` and `og:site_name`
- [ ] Step 4: Add `<slot name="head" />` so pages can inject JSON-LD
- [ ] Step 5: Build, commit

### Task 3: Replace "real stakes" wording (spec §13)

**Files:**
- Modify: `src/components/StatsSection.astro:27` — `Real players, real stakes` → `Real players, real competition`

- [ ] Step 1: Edit, build, commit

### Task 4: Game page SEO overhaul (spec §4, §7, §16)

**Files:**
- Modify: `src/pages/games/[slug].astro`

- [ ] Step 1: Title pattern — available games: `Play {name} Online – Rules, Scoring & Strategy | Vanikar`; coming soon: `{name} Card Game – Rules, How to Play & Strategy | Vanikar`
- [ ] Step 2: Meta description template targeting `[game] + online/against computer/with friends`: e.g. `Play {name} online with Vanikar — with friends at private tables, against real players, or vs smart AI. Learn {name} rules, scoring, and strategy. {players}.`
- [ ] Step 3: H1 → `Play {name} Online` for available games; keep `{name}` for coming-soon (page truthfully positions as "coming to Vanikar", per §8)
- [ ] Step 4: Add "Ways to Play" section with H2s (long-tail targets, §7/§18-P3):
  - `Play {name} Online` — live tables vs real players
  - `Play {name} With Friends` — private tables/rooms
  - `Play {name} Against the Computer` — AI difficulty levels
  - `Play {name} Offline` — no-internet play
  (coming-soon games get future-tense copy)
- [ ] Step 5: Add visible FAQ section (5 Q&As generated from game data: player count, vs computer, with friends, offline, free) + matching `FAQPage` JSON-LD
- [ ] Step 6: Add `BreadcrumbList` + `VideoGame` JSON-LD via head slot
- [ ] Step 7: Build, spot-check one available + one coming-soon page, commit

### Task 5: Feature landing pages (spec §11)

**Files:**
- Create: `src/components/FeatureLanding.astro` (shared template: hero H1, intro, benefit sections, game grid linking to `/games/{slug}`, FAQ, CTA)
- Create: `src/pages/online-card-games.astro`
- Create: `src/pages/multiplayer-card-games.astro`
- Create: `src/pages/card-games-with-friends.astro`
- Create: `src/pages/card-games-against-computer.astro`
- Create: `src/pages/offline-card-games.astro`
- Create: `src/pages/classic-card-games.astro`

Each page: unique title/meta/H1/intro copy targeting its keyword (§1), unique section copy (NOT homepage copy, per §11), links to all supporting games, FAQPage JSON-LD.

- [ ] Step 1: Build shared component
- [ ] Step 2: Create the six pages with unique copy
- [ ] Step 3: Build, verify pages render, commit

### Task 6: Internal linking (spec §14)

**Files:**
- Modify: `src/components/Footer.astro` — "Game Modes" column links point to the new feature pages instead of `/#features`

- [ ] Step 1: Update footer links (Play Online → /online-card-games, Practice with CPU → /card-games-against-computer, Join Friends & Family → /card-games-with-friends, plus Multiplayer, Offline, Classic)
- [ ] Step 2: Build, commit

### Task 7: Homepage structured data (spec §16)

**Files:**
- Modify: `src/pages/index.astro` — inject `Organization` + `SoftwareApplication` (MobileApplication) JSON-LD via head slot

- [ ] Step 1: Add JSON-LD, build, commit

### Task 8: Final verification (spec §17 checklist)

- [ ] `npm run build` clean
- [ ] Every page has unique title/description/one H1
- [ ] Canonicals present; sitemap includes new pages; robots.txt valid
- [ ] Preview site locally and spot-check key pages
