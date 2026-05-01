# DESIGN.md

## Visual Direction

Jeju PixelFlip Pre should look like a polished pixel travel atlas rendered as a miniature world. The tone is charming, informed, and presentation-grade.

Primary visual keywords:

- medium-resolution pixel art
- isometric 2.5D miniature world
- travel atlas feeling
- charming but professional
- coastal volcanic island
- explorable visual map
- polished, not childish
- information-friendly pixel art

This means the art should sit between editorial illustration, game environment art, and atlas design. It should feel crafted and scenic, but never noisy or toy-like.

## Style Definition

The scene language should communicate Jeju as a volcanic island with coastal variety, cultural markers, and route logic. Landmarks should be recognizable at a glance without requiring photorealism.

Style traits:

- Medium-resolution pixel density rather than chunky 8-bit blocks
- Clean silhouette readability for landmarks and terrain
- Controlled texture detail with selective highlights
- Soft atmospheric depth, especially for ocean, mountain, and distant coastline
- Decorative micro-details such as boats, roads, cars, groves, markets, walls, and walking figures
- Worldbuilding density high enough to invite exploration, but calm enough for speaking over

## Perspective Rules

Preferred perspective is isometric or near-isometric 2.5D.

Rules:

- Use a stable camera angle across the system so pages feel related.
- Avoid dramatic perspective shifts between mainline pages and extension pages.
- Terrain massing should read clearly before object detail.
- Mountain, crater, cliff, cone, coast, and village forms should be simplified into readable volumes.
- Expansion pages may zoom in, but they should still feel like the same world camera.
- Avoid pure top-down cartography and avoid side-view platformer composition.

## Pixel Resolution Guidance

Target a medium-resolution pixel look suitable for large-screen presentation.

Recommended approach:

- Background scenes should feel crisp on modern displays, not intentionally low fidelity.
- Use pixel clusters and selective anti-aliasing only if consistent with the art pipeline.
- Do not exaggerate nearest-neighbor roughness for nostalgia.
- Preserve enough resolution for landmarks, paths, water edges, vegetation masses, and human-scale accents.

## Color System

The palette should reflect Jeju's identity: sea blues, volcanic stone, spring greens, citrus orange, blossom accents, and warm built details.

Suggested palette groups:

- Ocean: deep cobalt, clear teal, shallow turquoise, foam white
- Volcanic terrain: basalt charcoal, warm gray, muted brown-black
- Land greens: moss green, field green, grove green, wind-swept olive
- Floral accents: canola yellow, cherry blossom pink used sparingly
- Citrus accents: tangerine orange, leaf green
- Architecture and markets: clay red, muted tile blue, warm wood brown
- UI neutrals: off-white, slate, sea-navy, muted sand

Color rules:

- Prefer restrained, curated saturation over candy-like color.
- Use warm-cool contrast to separate coast, settlement, and mountain zones.
- Keep landmark accents identifiable without turning each hotspot into a bright icon.
- Use atmospheric desaturation for distant or secondary elements.

## Composition Rules

Each page should read in three passes:

1. Big geography or subject silhouette
2. Landmark cluster or route logic
3. Fine detail that rewards closer attention

Composition guidelines:

- Establish a strong focal landmark per page.
- Maintain 16:9 presentation-safe composition.
- Keep at least one clear text-safe region for overlay content.
- Avoid covering the entire scene with labels.
- Use roads, coastlines, ridges, or rivers as natural directional guides.
- Let eye flow suggest where interaction lives before explicit UI appears.
- Mainline pages should feel broad and orienting.
- Extension pages should feel like deeper entry into a specific district, theme, or route.

## Landmark Depiction Rules

Landmarks should be visually distinctive but stylistically unified.

Examples:

- Hallasan: central mass, crater logic, alpine trail mood
- Seongsan Ilchulbong: volcanic tuff cone silhouette near sea edge
- Udo: small satellite island with bikes, coast ring, open fields
- Jusangjeolli: geometric cliff edge meeting surf
- Waterfalls: vertical white flow against rock and subtropical greenery
- Dongmun Market: dense roof rhythm, stall pattern, food energy
- Food district: black pork grills, seafood tables, citrus motifs, warm evening glow
- Jeju culture symbols: dol hareubang, haenyeo references, stone walls, thatch cues

## Hotspot Design Rules

Hotspots should be layered above the art, not baked into it.

Rules:

- Use HTML/SVG overlay zones aligned to visual regions.
- Hotspots should follow real object shapes or meaningful regional boundaries.
- The default state should be subtle, not game HUD-like.
- Hover or focus state may use outline, glow, lift, or soft tint.
- Click targets should be slightly more generous than the visible object footprint.
- Each hotspot needs a short external text label or accompanying UI caption, not text embedded in the image.
- Use consistent hotspot affordances across all pages.
- Preserve immersion by limiting simultaneous visible hotspot clutter.

## UI Overlay Rules

UI should feel editorial and supportive, never dominant.

Recommended overlay components:

- Page title
- Short summary
- Speaker-support note area if needed in presenter mode
- Back to overview or back to mainline action
- Minimal page index or breadcrumb
- Contextual caption for hovered hotspot

UI rules:

- Use text panels, chips, or cards outside key art landmarks.
- Favor translucent dark-slate or warm off-white panels over hard black boxes.
- Typography should be clean and contemporary, contrasting the pixel environment.
- UI should not mimic fantasy RPG interfaces.
- Motion should be gentle and directional, such as fade, pan, or zoom transitions.

## Information Design Rules

- Keep the image as the world layer and text as the explanation layer.
- Put dense information in controlled side panels or caption zones.
- Treat each extension page as one topic cluster, not a dumping ground.
- Allow the speaker to summarize quickly from the mainline pages and dive deeper only when needed.
- Preserve scanability for both audience and presenter.

## Page Types

Mainline page types:

- Overview world page
- Spatial structure page
- Landmark cluster page
- Route planning page
- Summary/advice page

Extension page types:

- Landmark deep dive
- Culture/theme deep dive
- Route scenario page
- Seasonal or advice page

## Motion and Transition Rules

- Transitions should imply navigation through one connected atlas.
- Prefer zoom-in, pan-across, and soft crossfade.
- Avoid flashy game transitions, card flips, or arcade effects.
- Return transitions should help users remember where they came from.

## What To Avoid

- No realtime image generation expectations
- No text baked deeply into background art
- No generic tourism website hero layouts
- No childish mascot tone
- No crude 8-bit nostalgia filters
- No copied Zain Shah UI, scene composition, or signature look
- No flat infographic-only maps that lose world depth
- No overstuffed hotspot clutter
- No dominant game HUD chrome
- No photoreal rendering mixed with pixel environments
- No random page-by-page camera language

## Non-Negotiable Quality Bar

If a scene feels like a game screenshot, a retro novelty asset, or a simple illustrated map, it is not yet correct. The target is a presentation-quality pixel atlas world that supports navigation, explanation, and memory.
