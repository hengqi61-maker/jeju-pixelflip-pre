# Scene Card: ext-food

## Scene Role

Primary warmth-and-atmosphere branch. This page should prove that the atlas can zoom not only into scenery, but also into sensory place experience without becoming a menu graphic or tourism poster.

## Parent Scene

`core-sight-map`

## Source Hotspot

`hs-food-core`

## Parent Anchor Description

In the parent `core-sight-map` scene, the food region appears on the lower-right side as a circular dining and market cluster near the coast, with warm table colors, clustered dishes, and a lively island-edge atmosphere. It is not a single dish, but a compact social food district.

## Core Point

Food should read as place experience, not menu enumeration.

## Audience Takeaway

The audience should feel that Jeju food is remembered through atmosphere, ingredients, and regional identity, not just through a list of dishes.

## Visual Intent

A warm premium medium-resolution pixel-art dining scene with grill glow, seafood textures, citrus accents, market energy, and a sense of inviting local atmosphere.

## Visual Continuity Requirements

- Preserve the lower-right coastal placement and clustered dining identity from the parent scene
- Preserve the same Jeju atlas perspective and bright outdoor world
- Preserve food-as-atmosphere rather than switching to labels or menu layout
- Preserve the feeling that this is the same food district enlarged from the parent map

## Composition

Use a 16:9 isometric or slightly angled 2.5D composition centered on a food district or dining cluster. The scene should feel dense enough to be lively but still readable enough for hotspot-safe explanation. Keep one side calmer for the collapsed panel, and avoid turning the frame into a flat top-down menu spread.

## Must Include

- Jeju food atmosphere rather than isolated dish icons
- Black pork and seafood cues
- Citrus or local produce accent
- Dining cluster, market table, grill, or stall logic
- Tiny people, tables, or pathways for scale and energy
- Warm local light or evening dining glow
- Continuity with the same Jeju visual world

## Avoid

- Flat menu collage
- Equal-sized bowls scattered like stickers
- Poster-like food advertisement
- Generic restaurant interior with no Jeju identity
- Embedded text or labels
- Overcrowding that makes hotspot-safe reading impossible
- Painterly blur or over-soft textures

## Hotspot Plan

No nested hotspots required for this phase. The scene should mainly support:

- clean parent entry from the food hotspot
- stable back return
- possible future annotation around black pork, seafood, or market atmosphere

## Child Expansion Plan

- Expand the circular food cluster into a readable dining world with black pork, seafood, citrus, tables, and pathways
- Keep social energy stronger than individual dish cataloging
- Use tiny visitors, serving areas, and circulation paths for scale
- Preserve a calm edge for the collapsed panel

## UI Safe Zones

- Reserve a calmer edge for the collapsed panel
- Keep the most inviting food cluster unobstructed
- Avoid placing the brightest grill or focal table directly under breadcrumb or panel
- Leave enough breathing room for future tooltip placement

## Art Prompt

Generate a zoomed-in child scene for the Jeju Food branch in a cohesive Jeju PixelFlip visual atlas. This must feel like the camera has zoomed into the food hotspot from the parent `core-sight-map` scene, not like a new standalone menu illustration. Preserve the parent scene's lower-right coastal placement, circular dining cluster feeling, warm color rhythm, and medium-resolution pixel-art atlas style. Expand that compact food district into a readable social scene with black pork, seafood, citrus accents, tables, stalls, pathways, and tiny visitors for scale. Keep the scene outdoors and place-specific, with a calm edge for the collapsed panel. No text, no labels, no game HUD.

## Negative Prompt

Flat menu graphic, food poster, photoreal cuisine photo, sticker collage, generic restaurant ad, painterly blur, mobile game café scene, excessive labels, UI overlay, messy equal-sized dishes, crude 8-bit style, oversaturated promo colors.

## Acceptance Criteria

- Scores at least 40/50 using `ART_DIRECTION_QA.md`
- The scene feels warm and place-specific rather than menu-like
- Black pork, seafood, and citrus cues are legible without labels
- The composition remains readable for presentation and runtime overlay
- The branch clearly feels derived from the circular lower-right food district in the parent scene
- The collapsed panel does not cover the main dining cluster
- The branch feels like a sensory extension of the Jeju world

## Image Reference Plan

Use anchor crop:

`public/assets/anchor-crops/core-sight-map/hs-food-core.png`

## Anchor QA Questions

- Can we still identify this as the same food district seen in the parent map?
- Does the cluster feel expanded rather than replaced by a new food illustration?
- Does the coastal placement and outdoor atmosphere remain consistent?
- Would the audience feel this is the same Jeju world when returning to the parent?

## Asset Path

`public/assets/scenes/ext-food/background.webp`
