# QA Rehearsal Report

Date: 2026-05-02

## Verdict

Current project status: `reviewed`

The demo now meets the reviewed standard for this release scope: all 17 scenes load directly with URL state, title state, DOM scene id, and background image verified; all parent-to-extension hotspot chains used in the current scene graph enter the expected child scene and return to the parent scene; the core browser Back/Forward path remains covered.

Foreground and ambient layers are still optional future enhancements. They are not reviewed blockers for this prepared visual browser release.

## Automated Coverage

| Coverage Area | Result | Notes |
| --- | --- | --- |
| 17 direct scene loads | PASS | `?scene={id}&qa=1` restores every scene and loads the background image. |
| Core Back/Forward route | PASS | `core-sight-map -> ext-seongsan -> browser Back -> browser Forward -> app Back`. |
| Parent hotspot chains | PASS | 24 parent-to-extension chains pass app Back return checks. |
| Query retention | PASS | `qa=1` survives push/replace navigation. |
| GitHub Pages deployment | PASS | Actions build/deploy completed successfully. |

## Scene Classification

| Scene | Rehearsal Status | Notes |
| --- | --- | --- |
| `cover-overview` | PASS_REVIEWED | Direct load and all six outgoing hotspot chains pass. |
| `spatial-structure` | PASS_REVIEWED | Direct load and five outgoing hotspot chains pass. |
| `core-sight-map` | PASS_REVIEWED | Direct load and eight outgoing hotspot chains pass; hotspot blockers found by E2E were fixed. |
| `recommended-routes` | PASS_REVIEWED | Direct load and three outgoing route/advice chains pass. |
| `travel-advice-summary` | PASS_REVIEWED | Direct load and two outgoing advice chains pass. |
| `ext-hallasan` | PASS_REVIEWED | Direct load and parent return chains pass. |
| `ext-seongsan` | PASS_REVIEWED | Direct load, parent return, and browser Back/Forward chain pass. |
| `ext-udo` | PASS_REVIEWED | Direct load and parent return chains pass. |
| `ext-jusangjeolli` | PASS_REVIEWED | Direct load and parent return chains pass. |
| `ext-waterfalls` | PASS_REVIEWED | Direct load and parent return chains pass. |
| `ext-jeju-culture` | PASS_REVIEWED | Direct load and parent return chain pass. |
| `ext-food` | PASS_REVIEWED | Direct load and parent return chains pass. |
| `ext-dongmun-market` | PASS_REVIEWED | Direct load and parent return chains pass. |
| `ext-one-day-route` | PASS_REVIEWED | Direct load and parent return chain pass. |
| `ext-three-day-route` | PASS_REVIEWED | Direct load and parent return chain pass. |
| `ext-best-seasons` | PASS_REVIEWED | Direct load and parent return chains pass. |
| `ext-travel-tips` | PASS_REVIEWED | Direct load and parent return chain pass. |

## Fixes From Final QA

- Moved the `cover-overview` Waterfalls hotspot so it no longer intercepts the Hallasan hotspot.
- Moved the `recommended-routes` Best Seasons hotspot away from the QA visual-intent panel.
- Made QA/debug panels non-intercepting so they cannot block hotspot clicks.
- Added a stable rehearsal wait in E2E before hotspot activation, matching a real presenter click cadence after scene entry animation.

## Validation Commands

```bash
pnpm test
pnpm lint
pnpm assets:check
pnpm build
GITHUB_PAGES=true pnpm build
pnpm e2e
```
