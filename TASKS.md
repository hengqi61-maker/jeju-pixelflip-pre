# Jeju PixelFlip Pre Tasks

## Current Stage

The project is being landed as a stable prepared visual browser demo. The 17 existing scenes are the full first public scope; do not add new scenes for this release.

The immediate standard is `draft/demo rehearsal`: stable navigation, reproducible QA, online static deployment, and no blockers on the core presentation path.

## Completed For Demo Rehearsal

- 17 scene graph nodes and scene cards are present.
- Background artwork exists for every scene.
- URL/query scene restore is wired to the Zustand navigation store.
- Browser Back/Forward and app Back stay aligned for the core `core-sight-map -> ext-seongsan` branch path.
- `qa=1` is preserved during scene navigation.
- Presenter metrics and suggested-next labels are audience-readable.
- QA missing-assets status is restricted to QA/presenter/dev context.
- Scene thumbnails are generated from existing background assets.
- GitHub Pages deployment workflow is configured.

## Remaining Before Reviewed

1. Run a full 17-scene browser QA pass with `?qa=1`.
2. Re-run anchor-continuity QA for parent-to-extension chains from `spatial-structure`, `core-sight-map`, `recommended-routes`, and `travel-advice-summary`.
3. Confirm `core-sight-map` hotspot hover/click comfort on desktop and mobile widths.
4. Confirm right-top breadcrumb/content pill behavior on long-title scenes.
5. Confirm GitHub Pages production URL loads backgrounds and preserves Back/Forward scene state.

## Scene Status

| Scene | Background | Thumbnail | Status | Notes |
| --- | --- | --- | --- | --- |
| `cover-overview` | present | present | draft | Opening route is usable; needs full-browser pass. |
| `spatial-structure` | present | present | draft | Geography logic scene; anchor continuity pending. |
| `core-sight-map` | present | present | draft | Primary branch hub; hotspot density needs final comfort QA. |
| `recommended-routes` | present | present | draft | Route-planning branch hub; browser QA pending. |
| `travel-advice-summary` | present | present | draft | Long title handled, final browser QA pending. |
| `ext-hallasan` | present | present | draft | Parent continuity pending. |
| `ext-seongsan` | present | present | draft | Core Back/Forward path verified locally. |
| `ext-food` | present | present | draft | Needs final branch comfort QA. |
| `ext-udo` | present | present | draft | Browser QA pending. |
| `ext-jusangjeolli` | present | present | draft | Browser QA pending. |
| `ext-waterfalls` | present | present | draft | Browser QA pending. |
| `ext-dongmun-market` | present | present | draft | Browser QA pending. |
| `ext-jeju-culture` | present | present | draft | Browser QA pending. |
| `ext-one-day-route` | present | present | draft | Browser QA pending. |
| `ext-three-day-route` | present | present | draft | Browser QA pending. |
| `ext-best-seasons` | present | present | draft | Browser QA pending. |
| `ext-travel-tips` | present | present | draft | Browser QA pending. |

## Reviewed Standard

A scene can move to `reviewed` only after browser QA confirms:

- background loads from the deployed URL
- title and content are readable
- hotspots are hoverable and clickable without accidental overlap
- Back/Forward and app navigation return to the expected scene
- QA overlay does not block the main visual
- parent-anchor continuity is acceptable for extension scenes
