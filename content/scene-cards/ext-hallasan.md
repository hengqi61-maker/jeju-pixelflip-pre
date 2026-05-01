# Scene Card: ext-hallasan

## Scene Role

Primary nature branch from the mainline atlas. This is the first extension that should prove the product can zoom from a world map into a deeper prepared scene without breaking visual continuity.

## Parent Scene

`spatial-structure`

## Source Hotspot

`hs-hallasan-structure`

## Parent Anchor Description

In the parent `spatial-structure` scene, Hallasan appears as the dominant central mountain mass with a broad volcanic silhouette, a bright summit zone, a crater-like crown, and descending green belts that organize the whole island around it. The surrounding routes and terrain imply that the island radiates outward from this elevated core.

## Core Point

Hallasan explains both the map logic and the emotional identity of Jeju.

## Audience Takeaway

The audience should feel that Jeju is vertically dramatic and geographically organized around a mountain core, not just a flat coastal destination.

## Visual Intent

A close-up premium medium-resolution pixel-art mountain world with crater cues, trail logic, cloud bands, forest density, and clear altitude storytelling.

## Visual Continuity Requirements

- Preserve Hallasan as a central volcanic mass, not a generic alpine mountain
- Preserve the same warm daylight palette and 2.5D atlas perspective
- Preserve the summit-crater identity and descending terrain belts
- Preserve the feeling that this is the same central mountain object enlarged from the parent scene

## Composition

Use a 16:9 isometric or slightly angled 2.5D composition centered on Hallasan. The summit mass should dominate clearly, but the scene should also include readable lower-elevation trails, tree belts, and a sense of scale. Reserve a calm side zone for the collapsed panel without covering the mountain form.

## Must Include

- Hallasan as a dominant central volcanic mountain
- Crater or summit basin cue
- Elevation change through terrain bands, forest texture, or trail layering
- Trail or movement logic that feels walkable and readable
- Cloud or weather layers that reinforce altitude
- Tiny hikers, shelters, or mountain details for scale
- Continuity with the wider Jeju world in lighting and palette

## Avoid

- Generic alpine mountain
- Snowy fantasy peak
- Painterly blur or muddy foliage
- Flat diagram-style terrain
- Dense labels or embedded text
- Overcrowding the summit with too many micro-details
- Overly dramatic fantasy lighting

## Hotspot Plan

No nested hotspots required for this phase. The page should mainly support:

- clean entry from parent hotspot
- stable return to parent
- optional future annotation around summit, trail commitment, or weather logic

## Child Expansion Plan

- Expand the crater basin into a readable summit destination
- Reveal trail logic, shelters, hikers, and altitude transitions
- Preserve the relationship between upper rock, middle forest, and lower routes
- Leave a calm side zone so the collapsed panel does not cover the summit form

## UI Safe Zones

- Keep the mountain mass unobstructed
- Reserve a lower-detail side zone for the collapsed content panel
- Avoid putting key summit or crater information directly under the breadcrumb
- Ensure any future tooltip can sit above trail areas without covering the summit

## Art Prompt

Generate a zoomed-in child scene for Hallasan in a cohesive Jeju PixelFlip visual atlas. This must feel like the camera has zoomed into the central Hallasan hotspot from the parent `spatial-structure` scene, not like a new standalone mountain illustration. Preserve the parent scene's summit-crater identity, dominant central mountain mass, descending green belts, warm daylight, and medium-resolution pixel-art atlas style. Expand the summit into a readable mountain world with crater basin cues, layered hiking trails, altitude bands, cloud shifts, and small hikers or shelters for scale. Leave a calm side area for the collapsed panel. No text, no labels, no game HUD.

## Negative Prompt

Fantasy mountain, snowy RPG peak, photoreal landscape, painterly blur, muddy foliage, satellite image, mobile game screenshot, poster composition, excessive text, baked-in labels, UI chrome, crude 8-bit style, over-detailed clutter.

## Acceptance Criteria

- Scores at least 40/50 using `ART_DIRECTION_QA.md`
- Hallasan reads instantly as the scene subject
- Crater, altitude, and trail logic are visually legible
- The page feels like a deeper view of the same Jeju world
- The page clearly feels derived from the Hallasan object visible in the parent `spatial-structure` scene
- The collapsed panel does not cover the main mountain form
- Entry and return transitions feel natural against the composition

## Image Reference Plan

Use anchor crop:

`public/assets/anchor-crops/spatial-structure/hs-hallasan-structure.png`

## Anchor QA Questions

- Is this still recognizably the same Hallasan mass seen in the parent scene?
- Do summit, crater, and terrain belts feel inherited rather than reinvented?
- Does it read as a camera move inward instead of a new mountain painting?
- Would the visual path still make sense when returning to the parent?

## Asset Path

`public/assets/scenes/ext-hallasan/background.webp`
