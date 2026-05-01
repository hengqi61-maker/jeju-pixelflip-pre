# Scene Card: core-sight-map

## Scene Role

Primary branch hub for core attractions, culture, food, and market exploration. This scene should demonstrate the product's prepared visual browser model most clearly.

## Core Point

Jeju is best understood as a network of experiences rather than one iconic stop.

## Audience Takeaway

The audience should see that Jeju's value comes from connected clusters of landscape, geology, culture, food, market energy, and route decisions.

## Visual Intent

A dense but readable premium pixel-art atlas scene showing Jeju's signature experiences as visually distinct clusters. It should invite branching without becoming a checklist map.

## Composition

Use a 16:9 isometric or near-isometric island map with balanced clusters. The central mountain should remain visible, but this scene should emphasize multiple clickable destinations. Maintain a calm side area for UI and avoid placing key hotspots under the content panel.

## Must Include

- Hallasan reference or central mountain marker
- Seongsan Ilchulbong
- Udo
- Jusangjeolli / basalt cliff cue
- Waterfall cue
- Jeju culture cue such as dol hareubang, stone walls, haenyeo reference, or village texture
- Food cluster with black pork, seafood, citrus, or dining atmosphere
- Dongmun Market / urban market cluster
- Balanced visual relationship between nature, culture, and food

## Avoid

- Equal-sized icons scattered across a flat map
- Overcrowded attraction collage
- Food or market zone dominating the whole island
- Vague landmarks that cannot be identified visually
- Dense visual noise that makes hover outlines hard to see
- Baked-in labels or long text
- Generic tourism map style

## Hotspot Plan

Planned hotspots:

- Hallasan
- Seongsan Ilchulbong
- Udo
- Jusangjeolli Cliffs
- Waterfalls
- Jeju Culture
- Food
- Dongmun Market

Each hotspot should have an obvious target region with enough spacing for SVG overlay shapes and hover tooltip placement.

## UI Safe Zones

- Primary content panel safe zone: right side or upper-right side with low-detail background
- Breadcrumb safe zone: top edge, away from dense hotspot clusters
- Tooltip areas should not cover too many neighboring hotspots
- Avoid placing any critical hotspot directly under the panel

## Art Prompt

Premium medium-resolution pixel art core sights map of Jeju Island, 16:9 isometric 2.5D miniature travel atlas, integrated visual clusters for Hallasan, Seongsan Ilchulbong, Udo, Jusangjeolli basalt cliffs, waterfalls, Jeju culture symbols, food district with black pork seafood and citrus, Dongmun Market urban cluster, roads and coastal movement, polished professional presentation background, charming but not childish, explorable visual map, clear hotspot regions, balanced nature culture food composition, calm UI safe zone on one side, no text, no labels, no game HUD.

## Negative Prompt

Flat icon map, attraction checklist, mobile game level map, tourism poster, crowded pins, childish stickers, photorealistic render, satellite map, fantasy RPG map, excessive text, baked-in labels, UI chrome, illegible landmarks, over-detailed clutter, crude 8-bit style.

## Acceptance Criteria

- Scores at least 40/50 using `ART_DIRECTION_QA.md`
- At least eight planned hotspot targets are visually distinct
- Natural, cultural, food, and market clusters feel integrated
- UI panel does not cover a critical hotspot
- Hover outlines and tooltip placement should remain readable
- Scene feels like a branch hub in a prepared visual browser

## Asset Path

`public/assets/scenes/core-sight-map/background.webp`
