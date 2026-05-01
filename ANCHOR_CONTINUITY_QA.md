# Anchor Continuity QA

Date: 2026-05-02

## Verdict

Anchor continuity status: `reviewed`

All parent-to-extension hotspot chains currently defined in the scene graph pass automated rehearsal. Each chain validates that the parent scene loads, the hotspot can be clicked without UI interception, the child scene URL/title/DOM state match, the child background image loads, and app Back returns to the parent scene.

## Automated Chains

| Parent | Hotspot | Child | Verdict |
| --- | --- | --- | --- |
| `cover-overview` | Hallasan | `ext-hallasan` | PASS |
| `cover-overview` | Seongsan Ilchulbong | `ext-seongsan` | PASS |
| `cover-overview` | Udo | `ext-udo` | PASS |
| `cover-overview` | Waterfalls | `ext-waterfalls` | PASS |
| `cover-overview` | Dongmun Market | `ext-dongmun-market` | PASS |
| `cover-overview` | Food | `ext-food` | PASS |
| `spatial-structure` | Central Mountain Core | `ext-hallasan` | PASS |
| `spatial-structure` | East Coast | `ext-seongsan` | PASS |
| `spatial-structure` | Udo Link | `ext-udo` | PASS |
| `spatial-structure` | Geological Coast | `ext-jusangjeolli` | PASS |
| `spatial-structure` | South Scenic Belt | `ext-waterfalls` | PASS |
| `core-sight-map` | Hallasan | `ext-hallasan` | PASS |
| `core-sight-map` | Seongsan Ilchulbong | `ext-seongsan` | PASS |
| `core-sight-map` | Udo | `ext-udo` | PASS |
| `core-sight-map` | Jusangjeolli Cliffs | `ext-jusangjeolli` | PASS |
| `core-sight-map` | Waterfalls | `ext-waterfalls` | PASS |
| `core-sight-map` | Jeju Culture | `ext-jeju-culture` | PASS |
| `core-sight-map` | Food | `ext-food` | PASS |
| `core-sight-map` | Dongmun Market | `ext-dongmun-market` | PASS |
| `recommended-routes` | One-day Route | `ext-one-day-route` | PASS |
| `recommended-routes` | Three-day Route | `ext-three-day-route` | PASS |
| `recommended-routes` | Best Seasons | `ext-best-seasons` | PASS |
| `travel-advice-summary` | Best Seasons | `ext-best-seasons` | PASS |
| `travel-advice-summary` | Travel Tips | `ext-travel-tips` | PASS |

## Notes

- The previous `spatial-structure -> ext-hallasan -> back` mismatch is resolved by the URL/store synchronization fix and covered by E2E.
- The previous `cover-overview` Hallasan click issue was caused by hotspot overlap with Waterfalls and has been corrected.
- The previous `recommended-routes` Best Seasons issue was caused by QA panel interception and has been corrected.
- This pass verifies interaction continuity and deployed-demo readiness, not fine-art perfection of every zoom crop.
