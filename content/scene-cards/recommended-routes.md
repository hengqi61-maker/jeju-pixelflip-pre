# Scene Card: recommended-routes

## Scene Role

Fourth mainline scene. This page converts the visual atlas into travel-planning logic. It should help the speaker move from "what exists in Jeju" to "how a visitor should move through Jeju."

## Core Point

Jeju rewards route design and pacing more than checklist accumulation.

## Audience Takeaway

The audience should understand that a good Jeju trip is shaped by distance, coastal movement, regional grouping, weather, and energy management.

## Visual Intent

A premium pixel travel-atlas route scene showing Jeju as a navigable island system. It should feel like a prepared planning map layered over the same pixel world, not a transit diagram or itinerary poster.

## Composition

Use a 16:9 isometric or slightly angled island view with clear route arcs and day-group logic. Keep the island recognizable, but simplify dense landmark detail so paths, timing zones, and route choices are readable. Leave a calm UI safe zone on the right or upper-right.

## Must Include

- Jeju island mass with central Hallasan still recognizable
- A one-day route option that feels intentionally focused
- A three-day route option with balanced east, central, south, and city/coastal rhythm
- Road or coastal movement cues
- Small cars, route markers, rest points, or ferry hints for scale
- Visual distinction between short-stay and multi-day pacing
- Subtle clock, sunrise/sunset, or day-segment cues without embedded text

## Avoid

- Generic subway-map style
- Overly literal numbered itinerary labels baked into the art
- Route lines that overpower the island world
- Too many stops that make the page feel like a checklist
- Photorealistic navigation map
- Mobile game quest-map style
- Text, labels, UI buttons, or legend blocks inside the image

## Hotspot Plan

Planned hotspots:

- One-day Route
- Three-day Route
- Best Seasons

The hotspots should map to visible route clusters or planning zones, not floating buttons. The route regions must be large and legible enough for SVG overlay shapes.

## UI Safe Zones

- Content panel safe zone: upper-right or right side over ocean or low-detail terrain
- Breadcrumb safe zone: top edge away from route arcs
- Keep the central island and main route traces visible when the collapsed panel is present
- Avoid putting essential route intersections under the right-side panel

## Art Prompt

Premium medium-resolution pixel art route-planning atlas scene of Jeju Island, 16:9 isometric 2.5D miniature world, same cohesive Jeju visual universe as the overview map, recognizable Hallasan center and coastal island shape, elegant route arcs and road movement cues, one-day focused route cluster, three-day balanced route cluster, subtle day-segment rhythm, small cars and ferry hints for scale, polished professional presentation background, information-friendly pixel art, clear hotspot regions for one-day route three-day route and best seasons, calm right-side UI safe zone, no text, no labels, no UI chrome.

## Negative Prompt

Subway diagram, flat GPS map, tourism brochure, poster layout, mobile game quest map, excessive numbered stops, baked-in route labels, text legend, photorealistic satellite map, chaotic lines, childish icons, fantasy map, crude 8-bit graphics, cluttered pins, UI overlay.

## Acceptance Criteria

- Scores at least 40/50 using `ART_DIRECTION_QA.md`
- Route logic is readable from presentation distance
- One-day and three-day choices feel visually distinct
- Island world continuity matches existing Jeju scenes
- Hotspot regions can be drawn for the three planned branches
- UI panel does not cover the route decision structure

## Asset Path

`public/assets/scenes/recommended-routes/background.webp`

