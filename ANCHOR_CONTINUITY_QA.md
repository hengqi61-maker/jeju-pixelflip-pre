# Anchor Continuity QA

This QA pass checks whether extension scenes feel like they are entered from a parent-scene visual object, rather than appearing as unrelated new images.

Test context:
- Browser QA used fixed scene URLs with `?scene=...&qa=1`.
- Computer Use verified the `spatial-structure -> ext-hallasan` chain in Chrome.
- Local anchor crop and child asset inspection was used to support `core-sight-map -> ext-seongsan` and `core-sight-map -> ext-food` continuity checks when the multi-port dev environment became unstable.

| Chain | Parent Anchor Clarity | Child Continuity | Zoom Feel | Return Path | Verdict |
|---|---|---|---|---|---|
| `spatial-structure -> ext-hallasan -> back` | Strong. The Hallasan parent hotspot clearly frames the central volcanic mountain mass. | Strong. The child scene reads as a close-up mountain/crater world with consistent volcanic cliffs, trails, clouds, and atlas lighting. | Good. Computer Use showed a visible zoom toward the mountain anchor before entering `ext-hallasan`. | NEEDS_TUNING. Back updated the URL toward `spatial-structure`, but the visible scene briefly remained on Hallasan during QA, so return-path confidence is not yet production-safe. | NEEDS_TUNING |
| `core-sight-map -> ext-seongsan -> back` | Strong. The parent crop has a clear coastal tuff cone rim, beach edge, harbor/boat context, and isolated landmark boundary. | Strong. The child preserves the crater rim, coastal water, paths, tourists, and boat context. It feels like a credible zoomed-in version of the parent landmark. | Not fully browser-verified in this pass because Chrome/Vite ports became unstable, but the existing `transitionHint` focus and anchor crop support the intended zoom path. | Not fully browser-verified in this pass. Needs retest after dev-server cleanup. | NEEDS_TUNING |
| `core-sight-map -> ext-food -> back` | Medium-strong. The parent food cluster is visually obvious, but it sits near other dense landmarks and can read as a themed zone rather than one exact object. | Medium. The child keeps food tables, coastal context, crowds, and Jeju greenery, but it expands into a more independent food plaza. It is acceptable as an experience-zone deep dive, less exact than Seongsan. | Not fully browser-verified in this pass because Chrome/Vite ports became unstable. Motion should still work if the hotspot `transitionHint` is used. | Not fully browser-verified in this pass. Needs retest after dev-server cleanup. | NEEDS_TUNING |
| `core-sight-map -> ext-udo -> back` | Strong enough for draft. Udo is a distinct satellite-island anchor in the parent map. | Strong. The child scene preserves satellite island scale, ring road, ferry cue, coastal water, and slow island rhythm. | Direct scene QA confirmed the child loads cleanly; full parent-click zoom still needs retest from `core-sight-map`. | Direct URL QA only in this pass; parent-click return path remains to be rehearsed. | NEEDS_TUNING |
| `core-sight-map -> ext-jusangjeolli -> back` | Strong. The parent geology/coast anchor is visually compatible with this branch. | Strong. The child has unmistakable basalt-column geometry, surf, viewing path, and ocean safe zone. | Direct scene QA confirmed strong visual readiness; full parent-click zoom still needs retest from `core-sight-map`. | Direct URL QA only in this pass; parent-click return path remains to be rehearsed. | NEEDS_TUNING |
| `core-sight-map -> ext-waterfalls -> back` | Medium-strong. The parent waterfall/scenic belt anchor is readable but more thematic than a single object. | Strong. The child clearly communicates waterfalls, basalt, lush greenery, mist, and scenic walking paths. | Direct scene QA confirmed strong visual readiness; full parent-click zoom still needs retest from `core-sight-map`. | Direct URL QA only in this pass; parent-click return path remains to be rehearsed. | NEEDS_TUNING |
| `core-sight-map -> ext-dongmun-market -> back` | Medium. The parent market/food area is dense and overlaps thematically with the Food branch. | Medium-strong. The child is a strong market scene with Jeju coastal/city context, but needs parent-click rehearsal to confirm it feels like entering the exact map anchor. | Direct scene QA confirmed background load and safe-zone viability; full parent-click zoom still needs retest from `core-sight-map`. | Direct URL QA only in this pass; parent-click return path remains to be rehearsed. | NEEDS_TUNING |

## Findings

### P0

- Multiple Vite dev servers were listening at the same time (`5173`, `5175`, `5176`), and Chrome sometimes showed a blank page or an older app state after direct URL changes. This makes Computer Use QA less reliable until the dev-server environment is cleaned up to a single port.
- The `spatial-structure -> ext-hallasan -> back` chain showed a return-path mismatch: the URL changed back to `spatial-structure`, but the visible scene remained on Hallasan during the observed QA moment. This should be retested and fixed before marking the chain as PASS.

### P1

- Seongsan continuity is the strongest of the three anchor-driven extension scenes and should be the reference quality bar for future detailed scenes.
- Food continuity is good thematically, but less structurally exact than Seongsan. Future food prompts should preserve the parent crop's circular table cluster, nearby road, shoreline, and surrounding scale cues more strictly.
- Hallasan works well visually, but its return transition needs a cleaner visual retreat back to the parent mountain region.
- New high-value extension backgrounds are visually usable as draft assets, but each still needs a parent-click rehearsal from `core-sight-map` before it can be considered continuity-safe.
- Udo, Jusangjeolli, and Waterfalls have the strongest immediate visual readability from the new batch.
- Dongmun Market is atmospheric and useful, but should be checked carefully against the parent map because it can read as a complete independent city-market page.

### P2

- Add a repeatable QA browser script or a single-port dev command to avoid manual confusion between old Vite instances.
- Add screenshots to this document once the dev-server environment is stable.
- Consider a future annotation mode that hides debug labels and shows normalized cursor coordinates for anchor QA.
