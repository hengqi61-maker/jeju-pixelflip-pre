# Scene Card: ext-seongsan

## Scene Role

Primary landmark branch for Jeju's eastern identity. This page should show how the atlas can zoom into a single iconic landform while keeping the prepared visual browser feeling intact.

## Parent Scene

`core-sight-map`

## Source Hotspot

`hs-seongsan-core`

## Parent Anchor Description

In the parent `core-sight-map` scene, Seongsan Ilchulbong appears on the right side as a distinct tuff-cone crater beside bright coastal water and a narrow shoreline edge. It reads as an eastern volcanic cone with a clear bowl shape, sea contact, and open sky around it.

## Core Point

Seongsan works because its silhouette instantly communicates place.

## Audience Takeaway

The audience should understand why Seongsan Ilchulbong is memorable at a glance and why it anchors Jeju's east coast so strongly.

## Visual Intent

A premium medium-resolution pixel-art coastal tuff-cone world with sea edge, crater form, stair or path logic, and strong sunrise-facing atmosphere.

## Visual Continuity Requirements

- Preserve the same crater silhouette visible in the parent scene
- Preserve the eastern coast placement and sea contact
- Preserve the same bright daylight, blue-water palette, and Jeju atlas perspective
- Preserve the feeling that this is the exact same cone enlarged, not a different scenic hill

## Composition

Use a 16:9 isometric or slightly angled 2.5D composition focused on Seongsan's crater rim and coastal setting. The cone silhouette must stay clear from a distance. Include surrounding sea, shoreline, and approach path without cluttering the central form. Leave a side region calm enough for the collapsed panel.

## Must Include

- Seongsan Ilchulbong as the unmistakable dominant landform
- Clear crater or rim structure
- Visible sea edge and shoreline relationship
- Stair, path, or ascent logic
- Small visitors, boats, or approach details for scale
- East-coast sunrise or bright-edge atmosphere
- Continuity with Jeju's wider palette and lighting

## Avoid

- Generic seaside hill
- Flat round crater with no identity
- Overly dramatic cinematic sky that steals focus
- Dense clutter around the base
- Text or labels in the image
- Theme-park postcard feeling
- Painterly blur

## Hotspot Plan

No nested hotspots required for this phase. The scene mainly needs:

- a clean target for the parent branch entry
- a stable return to parent scene
- space for future annotation around rim, climb, or sunrise viewpoint if needed

## Child Expansion Plan

- Expand the crater rim into a readable ascent and summit world
- Reveal path logic, rim texture, and small visitor-scale details
- Keep the surrounding sea edge present so the landmark still reads as coastal
- Preserve enough calm side space for the collapsed panel

## UI Safe Zones

- Keep the crater silhouette unobstructed
- Reserve a low-detail edge or water zone for the collapsed panel
- Keep breadcrumb away from the brightest sky detail
- Preserve enough open space for tooltip placement if future sub-annotation is added

## Art Prompt

Generate a zoomed-in child scene for Seongsan Ilchulbong in a cohesive Jeju PixelFlip visual atlas. This must feel like the camera has zoomed into the Seongsan hotspot from the parent `core-sight-map` scene, not like a new standalone illustration. Preserve the parent scene's crater silhouette, right-side east-coast placement, coastal water relationship, daylight direction, and medium-resolution pixel-art atlas style. Expand the cone into a readable tuff-cone world with clear rim structure, visible shoreline, stair or ascent logic, small visitors or boats for scale, and calm side space for the collapsed panel. No text, no labels, no game HUD.

## Negative Prompt

Generic coastal hill, travel poster, photoreal render, painterly blur, mobile game map, flat icon crater, excessive crowds, embedded labels, UI overlay, dramatic fantasy lighting, cluttered souvenir illustration, crude 8-bit style.

## Acceptance Criteria

- Scores at least 40/50 using `ART_DIRECTION_QA.md`
- Seongsan is recognizable from silhouette alone
- Crater, coast, and ascent logic are visually clear
- The scene feels like an eastern-coast zoom-in from the parent `core-sight-map` hotspot
- The collapsed panel does not cover the main cone
- Entry and return transitions preserve a strong sense of place

## Image Reference Plan

Use anchor crop:

`public/assets/anchor-crops/core-sight-map/hs-seongsan-core.png`

## Anchor QA Questions

- Can we still identify this as the same crater cone seen in the parent scene?
- Does the shoreline orientation match the parent scene?
- Does this feel like an enlargement rather than a replacement?
- Would returning to the parent scene feel visually coherent?

## Asset Path

`public/assets/scenes/ext-seongsan/background.webp`
