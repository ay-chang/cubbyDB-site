# CubbyDB site

Marketing site for [CubbyDB](https://github.com/ay-chang/cubbyDB), the desktop
Postgres client. Standalone project: Next.js 16 (App Router), Tailwind v4,
Motion, deployed as a static prerender.

```bash
npm run dev
```

## Scope

The live page is hero and footer only. Every comparable site (DataGrip,
DBeaver, TablePlus, Beekeeper Studio) fills its lower half with company logos,
testimonials, database-support grids and eight-to-twelve feature blocks, all of
which take years to earn. At v0.1 the honest features are table stakes for a
SQL client, and listing them beside those products advertises how short the
list is.

`Capabilities`, `QuerySection`, `FeatureCarousel`, `ThemesSection`,
`Statement` and `ShortcutsSection` are built, styled and working. They are
unmounted from `src/app/page.tsx`, not deleted. Mount them back as real
content arrives, and repopulate `SECTIONS` in `nav.tsx` at the same time.

## Screenshots

The page is built around three real captures of the app. They live in
`public/shots/` and go through `src/components/ui/shot.tsx`:

| File                        | Where it appears | Status                                                          |
| --------------------------- | ---------------- | --------------------------------------------------------------- |
| `shots/app-workspace.png`   | Hero             | Real capture, 2880x1708                                          |
| `shots/command-palette.png` | "Find the table" | **Placeholder.** Wants the Cmd+K palette open over the grid      |
| `shots/appearance.png`      | "Eight themes"   | **Placeholder.** Wants Settings, Appearance tab                  |

Capture the remaining two around **2000px wide or more** on a light theme.
`Shot` defaults to a 2880x1708 intrinsic size to reserve layout space; if a
capture uses a different aspect ratio, pass matching `width`/`height` at that
call site so nothing is squashed and CLS stays at zero.

Next's image optimizer and the browser both cache aggressively by URL. If you
replace a file in place and the old one keeps rendering, change the filename
rather than hunting for the cache.

## Design language

Cool grey canvas, film grain, mono micro-labels, and Playfair numerals against
Geist. The accent is CubbyDB's own green (`#0f7a37`, the app's `green` preset
stepped down for AA), used sparingly.

Nothing is outlined that does not need to be: no viewport frame, no border on
the screenshots. Depth comes from a single canvas-tinted shadow, and the only
bordered element in the header is the primary action.

Four things worth not undoing:

- **`@theme`, not `@theme inline`.** The `inline` variant resolves tokens to
  static hex at build time, which silently breaks any media-query token swap.
- **Both muted text tiers are set against `--canvas`,** the darkest surface they
  sit on, not the brightest. The obvious `#767c85` measures 3.5:1 and fails AA.
- **The grain is `position: fixed` and `pointer-events: none`.** Inside the
  scroll flow it forces a full GPU repaint per frame.
- **No `var()` inside an inline `transform` or `transition` value.** A custom
  property that fails to resolve there takes the whole declaration with it and
  reports nothing.

## Motion

- `reveal.tsx` is the scroll-entry primitive: fade plus a 12px rise, 500ms on a
  strong ease-out, staggered 50ms, fired once.
- `hero-shot.tsx` is scroll-linked rather than time-based, via `useScroll` +
  `useTransform`. Both offset edges must be valid tokens; an unparsed edge
  collapses the range and pins progress at 0.
- `feature-carousel.tsx` rides native scroll-snap, so it gets touch swiping and
  keyboard scrolling for free and keeps the work on the compositor. The active
  slide comes from an IntersectionObserver, never a scroll handler.

Everything degrades under `prefers-reduced-motion`: reveals keep the opacity
fade and drop the movement, the carousel jumps with `behavior: "auto"`, and the
statistics render their final value with no count.
