# Scene Card: cover-overview

## Scene Role

Opening scene and visual identity anchor for Jeju PixelFlip Pre. This scene introduces Jeju as an explorable prepared visual browser, not as a linear slide or tourism poster.

## Core Point

Jeju should be introduced as a navigable island world first, then explained through prepared visual branches.

## Audience Takeaway

The audience should immediately understand that Jeju is a compact island with distinct geography, landmarks, culture, food, and routes that can be explored visually.

## Visual Intent

A premium medium-resolution pixel-art travel atlas view of Jeju Island as a 2.5D miniature world. The scene should feel polished, coastal, volcanic, charming, professional, and presentation-ready.

## Composition

Use a 16:9 isometric or near-isometric island overview. Hallasan should anchor the center. The coastline should wrap the world clearly, with Udo visible offshore and the east coast readable. Keep the right side or upper-right quadrant calm enough for the content panel.

## Must Include

- Full Jeju Island outline or clearly readable island mass
- Central Hallasan mountain
- Seongsan Ilchulbong on the east side
- Udo offshore
- Varied coastline with beaches, cliffs, ports, or surf
- Waterfall or lush south-coast cue
- Jeju City / Dongmun Market cue
- Food or culture zone with black pork, seafood, citrus, dol hareubang, or stone walls
- Roads, boats, small cars, travelers, or village details

## Avoid

- Mobile game map feeling
- Generic tropical island
- Tourism poster layout
- Crude 8-bit style
- Overly cute toy-like characters
- Dense baked-in labels or long text
- Hallasan hidden or visually weak
- Visual clutter that blocks hotspot readability

## Hotspot Plan

Planned hotspots:

- Hallasan
- Seongsan Ilchulbong
- Udo
- Waterfalls
- Dongmun Market
- Food / culture district

Each hotspot must have a clear visual target or region that can be annotated with an SVG polygon or ellipse.

## UI Safe Zones

- Primary content panel safe zone: right side or upper-right quadrant, about 25-30% of canvas width
- Breadcrumb safe zone: top edge, away from dense landmarks
- QA status safe zone: lower-left or lower-center should not contain the most important landmark

## Art Prompt

Premium medium-resolution pixel art travel atlas of Jeju Island, South Korea, 16:9 isometric 2.5D miniature world, complete island overview, central Hallasan volcanic mountain, Seongsan Ilchulbong on the east coast, Udo offshore, varied coastline with basalt cliffs, beaches, ports and surf, lush waterfall zone, Jeju City and Dongmun Market hint, black pork and seafood food district, tangerine orchards, dol hareubang stone statues, stone walls, small roads, tiny cars, boats and travelers, polished and professional, charming but not childish, coastal volcanic island identity, explorable visual map, presentation-friendly, clear UI safe area on the right side, no text, no labels, no game HUD.

## Negative Prompt

Mobile game map, generic travel poster, tourism brochure, crude 8-bit, childish mascot style, photorealistic, satellite map, fantasy RPG map, excessive labels, baked-in text, cluttered icons, flat infographic, unreadable landmarks, over-saturated candy colors, UI elements, buttons, title text.

## Acceptance Criteria

- Scores at least 40/50 using `ART_DIRECTION_QA.md`
- Jeju is recognizable without text labels
- Hallasan, Seongsan, and Udo are visually readable
- At least six planned hotspots can be annotated cleanly
- Content panel does not cover the core geography
- Image remains readable in the 16:9 runtime frame

## Asset Path

`public/assets/scenes/cover-overview/background.webp`
