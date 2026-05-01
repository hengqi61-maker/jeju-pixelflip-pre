# Jeju PixelFlip Pre Tasks

## Current Stage

The project is now `reviewed` for the first public prepared visual browser demo.

The release scope remains the existing 17 scenes. Do not add new scenes to this version.

## Completed

- 17 scene graph nodes and scene cards are present.
- Background artwork and generated thumbnails exist for every scene.
- URL/query scene restore is synchronized with the Zustand navigation store.
- Browser Back/Forward and app Back stay aligned on the core branch path.
- `qa=1` is preserved during scene navigation.
- Presenter metrics and suggested-next labels are audience-readable.
- QA/debug panels do not intercept hotspot clicks.
- GitHub Pages deployment is configured and passing.
- Full Playwright rehearsal covers 17 direct scene loads and 24 parent hotspot chains.

## Reviewed Criteria

The current release passes:

- every scene loads from `?scene={sceneId}&qa=1`
- visible scene title, URL scene, and DOM scene id match
- every background image loads
- every parent hotspot enters the expected child scene
- app Back returns to the expected parent scene
- browser Back/Forward works on the core demo route
- GitHub Pages Actions build/deploy is green

## Future Enhancements

These are not blockers for the reviewed demo:

1. Add foreground and ambient layers where visual depth is worth the asset cost.
2. Add screenshot diff baselines after the visual language stabilizes further.
3. Add mobile-specific hotspot comfort thresholds.
4. Improve route narration and presenter notes for a longer public talk.
5. Revisit motion design only after the static browser demo has been used in rehearsal.

## Scene Status

| Scene | Background | Thumbnail | Status | Notes |
| --- | --- | --- | --- | --- |
| `cover-overview` | present | present | reviewed | All outgoing hotspot chains pass. |
| `spatial-structure` | present | present | reviewed | All outgoing hotspot chains pass. |
| `core-sight-map` | present | present | reviewed | Primary branch hub; all outgoing hotspot chains pass. |
| `recommended-routes` | present | present | reviewed | Route branch hub passes. |
| `travel-advice-summary` | present | present | reviewed | Advice branch hub passes. |
| `ext-hallasan` | present | present | reviewed | Direct load and parent return pass. |
| `ext-seongsan` | present | present | reviewed | Direct load, parent return, and browser Back/Forward pass. |
| `ext-food` | present | present | reviewed | Direct load and parent return pass. |
| `ext-udo` | present | present | reviewed | Direct load and parent return pass. |
| `ext-jusangjeolli` | present | present | reviewed | Direct load and parent return pass. |
| `ext-waterfalls` | present | present | reviewed | Direct load and parent return pass. |
| `ext-dongmun-market` | present | present | reviewed | Direct load and parent return pass. |
| `ext-jeju-culture` | present | present | reviewed | Direct load and parent return pass. |
| `ext-one-day-route` | present | present | reviewed | Direct load and parent return pass. |
| `ext-three-day-route` | present | present | reviewed | Direct load and parent return pass. |
| `ext-best-seasons` | present | present | reviewed | Direct load and parent return pass. |
| `ext-travel-tips` | present | present | reviewed | Direct load and parent return pass. |
