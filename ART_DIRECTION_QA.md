# ART_DIRECTION_QA.md

## Purpose

This document defines the art acceptance criteria for the first three core background scenes of Jeju PixelFlip Pre:

- `cover-overview`
- `spatial-structure`
- `core-sight-map`

The goal is to prevent attractive images that fail the product format. These scenes must work as prepared visual-browser backgrounds: navigable, readable, annotatable, and presentation-friendly.

## 1. Project Art Positioning

Jeju PixelFlip Pre should feel like a **premium pixel travel atlas**.

Primary art identity:

- medium-resolution pixel art
- isometric 2.5D miniature world
- coastal volcanic island
- explorable visual map
- charming but professional
- polished, information-friendly, and presentation-ready

The image should not feel like a normal tourism poster, a mobile game level map, or a decorative hero illustration. It must support clickable hotspots, speaker-led explanation, and visual orientation across a prepared scene graph.

Art should communicate:

- Jeju as an island world with recognizable geography
- volcanic terrain and coastal identity
- clear landmark clusters
- enough detail to invite exploration
- enough visual calm to support UI overlays and narration

## 2. Core Scene Acceptance Standards

## Scene: `cover-overview`

### Scene Role

Opening scene and visual identity anchor for the whole product. This is the first impression of Jeju PixelFlip Pre and should communicate that the audience is entering an explorable atlas world.

### Visual Goal

Show Jeju Island as a complete miniature world in 16:9, with clear island silhouette, strong central geography, coastal variety, and multiple discoverable regions.

### Must Include

- Full Jeju Island outline or clearly readable island mass
- Central Hallasan mountain as the dominant spatial anchor
- East-side Seongsan Ilchulbong cue
- Udo as a small offshore island
- Coastline variety: beaches, cliffs, ports, or surf edges
- At least one waterfall zone or lush south-coast cue
- Jeju City / Dongmun Market urban hint
- Food/culture details such as black pork, citrus, dol hareubang, stone walls, or market lights
- Roads, small vehicles, boats, or travelers to create explorable scale

### Avoid

- Flat icon-map look with no world depth
- Tourism poster composition focused on one big landmark
- Mobile game resource-map style
- Overly cute toy-like buildings or characters
- Dense labels baked into the image
- Hallasan hidden, tiny, or visually ambiguous
- Generic tropical island that does not read as Jeju

### Hotspot Readiness

The image must allow clear hotspot regions for:

- Hallasan
- Seongsan Ilchulbong
- Udo
- Waterfalls
- Dongmun Market
- Food / culture district

Each hotspot region should have a recognizable visual object or cluster. Clickable areas should be visually separable without needing text labels inside the image.

### UI Safe Zone Requirement

Leave a calm overlay region on the right side or upper-right quadrant for the content panel. Avoid placing the most important landmark directly under the expected panel area.

Minimum safe area:

- One readable panel area around 25-30% of the canvas width
- One breadcrumb-safe strip near the top edge
- Bottom-left or bottom-center should remain calm enough for dev asset/status overlays during QA

### Acceptance Score Checklist

| Criterion | Max | Notes |
|---|---:|---|
| Jeju recognizability | 10 | Island shape, Hallasan, east landmark, Udo, volcanic/coastal cues |
| Pixel art quality | 10 | Medium-resolution polish, consistent pixel language, not crude 8-bit |
| Explorable world feeling | 10 | Many meaningful visual regions, small-world density, navigable logic |
| Presentation readability | 10 | Clear focal hierarchy, UI-safe space, not visually noisy |
| Hotspot annotation readiness | 10 | Landmark regions are separable and clickable |
| **Total** | **50** | Minimum recommended acceptance: 40 |

## Scene: `spatial-structure`

### Scene Role

Geography explanation scene. It should help the speaker explain why Jeju travel logic is shaped by Hallasan, ring-road movement, coastal regions, and east/south/west differences.

### Visual Goal

Present Jeju as a structured spatial system rather than a scenic postcard. The audience should understand center, coast, regions, and movement logic at a glance.

### Must Include

- Hallasan as a strong central mass
- Island-wide layout with clear center-periphery relationship
- Coastal circulation or road/ring logic
- East coast zone with Seongsan/Udo relationship
- South scenic belt cue, including waterfall or lush zone
- Geological coast cue for cliffs or basalt terrain
- Visual region separation through terrain, color, route lines, or landscape clusters

### Avoid

- Too much decorative detail that hides the structure
- Pure infographic map with no pixel-world atmosphere
- Random attraction collage with no spatial logic
- Route lines so dominant they overpower the world
- Overly realistic satellite-map feeling
- Baked-in long text or labels

### Hotspot Readiness

The image must support region-based hotspots:

- central mountain core
- east coast
- Udo link
- geological coast
- south scenic belt

Regions should be visually distinct enough that hotspot shapes can follow terrain or zone boundaries.

### UI Safe Zone Requirement

Keep a panel-safe area on the right or lower-right side. The central mountain must remain visible even when UI is present.

Minimum safe area:

- Content panel area should not cover Hallasan
- Breadcrumb strip should not cover route or region labels
- If route lines are included, they should remain readable under the hotspot layer

### Acceptance Score Checklist

| Criterion | Max | Notes |
|---|---:|---|
| Jeju recognizability | 10 | Hallasan-centered Jeju structure is immediately readable |
| Pixel art quality | 10 | Atlas-like pixel detail with coherent terrain treatment |
| Explorable world feeling | 10 | Regions feel enterable, not just diagrammed |
| Presentation readability | 10 | Spatial logic is clear from a distance |
| Hotspot annotation readiness | 10 | Region hotspots can be drawn without ambiguity |
| **Total** | **50** | Minimum recommended acceptance: 40 |

## Scene: `core-sight-map`

### Scene Role

Primary branch hub for landmark, culture, food, and market exploration. This page should be the strongest demonstration of the prepared visual browser model.

### Visual Goal

Show Jeju's signature experiences as an integrated network of visual clusters. The image should invite the speaker to branch into multiple topics without feeling like a checklist.

### Must Include

- Hallasan marker or central mountain reference
- Seongsan Ilchulbong
- Udo
- Jusangjeolli / basalt cliff cue
- Waterfall cue
- Jeju culture cue such as dol hareubang, stone walls, haenyeo reference, or village texture
- Food cluster with black pork, seafood, citrus, or dining atmosphere
- Dongmun Market / urban market cluster
- Visual balance between nature, culture, and food

### Avoid

- Equal-sized icons scattered across a flat map
- Overcrowded attraction collage
- Food/market details so large they dominate the island
- Natural landmarks that are too vague to identify
- Visual clutter that makes hover outlines hard to see
- Text labels baked into the background

### Hotspot Readiness

The image must support at least eight hotspots:

- Hallasan
- Seongsan Ilchulbong
- Udo
- Jusangjeolli Cliffs
- Waterfalls
- Jeju Culture
- Food
- Dongmun Market

Each hotspot should have an obvious visual target with enough spacing for SVG overlay shapes.

### UI Safe Zone Requirement

Because this page has many hotspots, keep the UI panel area especially calm. Avoid placing a critical hotspot under the content panel.

Minimum safe area:

- One side panel area with low-detail background
- Breadcrumb strip should not cross dense hotspot clusters
- Hover tooltip should have room near major hotspots without covering too many other targets

### Acceptance Score Checklist

| Criterion | Max | Notes |
|---|---:|---|
| Jeju recognizability | 10 | Signature sights and culture/food identity are visible |
| Pixel art quality | 10 | Polished clusters, consistent scale, refined detail |
| Explorable world feeling | 10 | Multiple regions invite branching and inspection |
| Presentation readability | 10 | Clusters are legible during a talk |
| Hotspot annotation readiness | 10 | Eight target regions can be annotated cleanly |
| **Total** | **50** | Minimum recommended acceptance: 40 |

## 3. Score Sheet

Use this score sheet for each candidate image.

| Criterion | Max Score | Evaluation Question |
|---|---:|---|
| Jeju recognizability | 10 | Does the image clearly read as Jeju, not a generic island? |
| Pixel art quality | 10 | Is the pixel style polished, medium-resolution, and consistent? |
| Explorable world feeling | 10 | Does it feel like a miniature world with meaningful places to enter? |
| Presentation readability | 10 | Can an audience understand the scene from a distance while UI is present? |
| Hotspot annotation readiness | 10 | Can hotspots be drawn around objects or regions without ambiguity? |
| **Total** | **50** | Recommended accept threshold: 40 |

Suggested interpretation:

- 45-50: strong candidate, likely ready for runtime QA
- 40-44: acceptable with minor edits or careful hotspot placement
- 35-39: promising but needs revision before app integration
- under 35: reject or regenerate

## 4. Reject Criteria

Reject the image if any of the following are true:

- Looks like a mobile game map
- Looks like a generic travel poster
- Looks like a tourism brochure illustration rather than a navigable world
- Contains too much baked-in text
- Uses labels that cannot be edited or controlled in HTML/SVG
- Feels too childish, toy-like, or mascot-driven
- Feels too realistic, painterly, photographic, or satellite-like
- Uses crude 8-bit styling instead of medium-resolution pixel art
- Landmarks are unclear or visually interchangeable
- Hallasan is missing or not dominant in overview/structure scenes
- Udo or Seongsan are missing from overview/core sight scenes
- Has no usable safe zone for UI
- Is impossible to annotate with clean hotspot regions
- Important landmarks would sit directly under the content panel
- Visual noise makes hover outlines or tooltips hard to read
- The scene feels like a standalone image instead of part of a prepared visual browser

## 5. Runtime QA Checklist

After placing an image into the app, check the following before accepting it:

| Check | Pass Requirement |
|---|---|
| 16:9 display | Image fills the scene frame without distortion |
| No important crop | Hallasan, Udo, Seongsan, and major clusters remain visible |
| Hotspot alignment | SVG hotspot shapes align with actual visual targets |
| Content panel obstruction | Panel does not cover the scene's core landmark or key route logic |
| Breadcrumb readability | Breadcrumb remains readable against the image |
| Hover visibility | Hotspot outline/glow remains visible over the image |
| Tooltip readability | Tooltip does not disappear into bright or busy areas |
| Presenter mode readability | Presenter panel and scene still remain usable together |
| Asset fallback not triggered | Dev status should show the intended layer as loaded, not fallback |
| Image scale | Pixel detail looks intentional at presentation size |
| Safe zone validity | UI-safe areas still work on desktop and mobile layouts |

Minimum runtime acceptance:

- No asset fallback for required `background.webp`
- No critical crop in 16:9
- Hotspots can be aligned without covering unrelated objects
- Content panel and breadcrumb remain readable
- Scene still feels like a visual browser background, not a poster
