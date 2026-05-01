# QA Rehearsal Report

Date: 2026-05-01

## Verdict

Current project status: `draft/demo rehearsal`

The P0 URL/store synchronization defect has been fixed locally and covered by automated tests. The project should not be marked `reviewed` until the deployed GitHub Pages build completes a full 17-scene browser QA pass and anchor-continuity retest.

## Core Rehearsal Path

| Check | Result | Notes |
| --- | --- | --- |
| `core-sight-map -> ext-seongsan` hotspot click | PASS_FOR_DEMO | URL, DOM title, and visible scene title align. |
| browser Back to `core-sight-map` | PASS_FOR_DEMO | Store now subscribes to URL changes through `popstate`. |
| browser Forward to `ext-seongsan` | PASS_FOR_DEMO | Extension entry restores app Back stack. |
| app Back to parent | PASS_FOR_DEMO | Uses store history and replaces URL without dropping `qa=1`. |
| `qa=1` query retention | PASS_FOR_DEMO | Query params survive push/replace navigation. |

## Scene Classification

| Scene | Rehearsal Status | Notes |
| --- | --- | --- |
| `cover-overview` | NEEDS_TUNING | Needs full visual browser QA after deployment. |
| `spatial-structure` | NEEDS_TUNING | Anchor continuity to extensions needs retest. |
| `core-sight-map` | NEEDS_TUNING | Core navigation passes; hotspot density still needs final comfort QA. |
| `recommended-routes` | NEEDS_TUNING | Branch hub needs full browser pass. |
| `travel-advice-summary` | NEEDS_TUNING | Long-title UI improved; final browser pass pending. |
| `ext-hallasan` | NEEDS_TUNING | Extension continuity pending. |
| `ext-seongsan` | PASS_FOR_DEMO | Verified through the core branch/back path. |
| `ext-food` | NEEDS_TUNING | Needs hotspot and visual hierarchy pass. |
| `ext-udo` | PASS_FOR_DEMO | Background and card present; final deployed visual QA pending. |
| `ext-jusangjeolli` | PASS_FOR_DEMO | Background and card present; final deployed visual QA pending. |
| `ext-waterfalls` | PASS_FOR_DEMO | Background and card present; final deployed visual QA pending. |
| `ext-dongmun-market` | PASS_FOR_DEMO | Background and card present; final deployed visual QA pending. |
| `ext-jeju-culture` | PASS_FOR_DEMO | Content extension present; final deployed visual QA pending. |
| `ext-one-day-route` | PASS_FOR_DEMO | Route extension present; final deployed visual QA pending. |
| `ext-three-day-route` | PASS_FOR_DEMO | Route extension present; final deployed visual QA pending. |
| `ext-best-seasons` | PASS_FOR_DEMO | Advice extension present; final deployed visual QA pending. |
| `ext-travel-tips` | PASS_FOR_DEMO | Advice extension present; final deployed visual QA pending. |

## Manual QA Checklist

1. Start the fixed local QA server:

   ```bash
   pnpm qa:dev
   ```

2. Open:

   ```text
   http://127.0.0.1:5173/?scene=core-sight-map&qa=1
   ```

3. Click `Seongsan Ilchulbong`.
4. Confirm URL, DOM scene label, and visible title are `ext-seongsan` / `Seongsan Ilchulbong`.
5. Use browser Back and confirm all three return to `core-sight-map` / `Core Sight Map`.
6. Use browser Forward and confirm all three return to `ext-seongsan` / `Seongsan Ilchulbong`.
7. Use app Back and confirm all three return to `core-sight-map` / `Core Sight Map`.
8. Repeat direct-load checks for every scene with `?scene={sceneId}&qa=1`.

## Reviewed Blockers

- Full 17-scene browser QA is not yet complete.
- Anchor-continuity QA needs to be rerun after deployment.
- `core-sight-map` hotspot density needs a final hover/click comfort pass.
- GitHub Pages production URL must be checked after Actions deploys.
