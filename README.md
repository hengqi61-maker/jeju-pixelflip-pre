# Jeju PixelFlip Pre

Prepared visual browser demo for a 17-scene Jeju Island presentation prototype. The app is a static Vite + React build with precomputed scene artwork, hotspot branching, presenter mode, and URL-restorable scene state.

Live demo target: https://hengqi61-maker.github.io/jeju-pixelflip-pre/

## Demo Route

Recommended rehearsal path:

1. `cover-overview`
2. `spatial-structure`
3. `core-sight-map`
4. `ext-seongsan`
5. browser Back / Forward
6. app Back
7. `recommended-routes`
8. `travel-advice-summary`

Deep links use the `scene` query parameter:

```text
/?scene=core-sight-map
/?scene=core-sight-map&qa=1
```

`qa=1` enables visual QA overlays for rehearsal. It is not shown by default to audience users.

## Local Development

```bash
pnpm install
pnpm qa:dev
```

The fixed QA port is `http://127.0.0.1:5173`.

Useful commands:

```bash
pnpm test
pnpm lint
pnpm assets:check
pnpm e2e
pnpm build
```

Generate scene thumbnails after background changes:

```bash
pnpm thumbnails:generate
```

## Deployment

GitHub Actions runs unit tests, lint, asset checks, Playwright rehearsal, and a GitHub Pages build. The Pages build uses Vite base path `/jeju-pixelflip-pre/`, while local development uses `/`.

## Current Status

This repository is suitable for draft/demo rehearsal. Promotion to `reviewed` requires a complete 17-scene browser QA pass and anchor-continuity retest. See `QA_REHEARSAL_REPORT.md` and `TASKS.md`.
