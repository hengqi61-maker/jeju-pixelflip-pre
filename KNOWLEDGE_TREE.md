# KNOWLEDGE_TREE.md

## Content Tree

The content structure should behave like a guided atlas with branchable depth. Mainline pages provide orientation and narrative progression. Extension pages provide focused depth and always return clearly to the mainline context.

## Mainline Spine

1. Cover / Jeju Overview
2. Spatial Structure
3. Core Sight Map
4. Recommended Routes
5. Travel Advice Summary

## Knowledge Domains

### Geography and Landscape

- Hallasan
- Seongsan Ilchulbong
- Udo
- Jusangjeolli Cliffs
- Waterfalls

### Culture and Identity

- Jeju Culture
- Dongmun Market
- Food

### Planning and Itinerary

- One-day Route
- Three-day Route
- Best Seasons
- Travel Tips

## Hotspot-to-Extension Mapping

### From Cover / Jeju Overview

- Hallasan hotspot -> Hallasan
- East volcanic cone hotspot -> Seongsan Ilchulbong
- Udo island hotspot -> Udo
- Cliff coast hotspot -> Jusangjeolli Cliffs
- Waterfall zone hotspot -> Waterfalls
- Market/city hotspot -> Dongmun Market
- Food district hotspot -> Food
- Culture symbol hotspot -> Jeju Culture

### From Spatial Structure

- Central mountain zone -> Hallasan
- East coast zone -> Seongsan Ilchulbong
- Satellite island zone -> Udo
- South coast scenic zone -> Waterfalls
- Southwest/west geological coast zone -> Jusangjeolli Cliffs

### From Core Sight Map

- Hallasan marker -> Hallasan
- Seongsan marker -> Seongsan Ilchulbong
- Udo marker -> Udo
- Geological coast marker -> Jusangjeolli Cliffs
- Waterfall marker -> Waterfalls
- Culture marker -> Jeju Culture
- Food marker -> Food
- Market marker -> Dongmun Market

### From Recommended Routes

- One-day path hotspot -> One-day Route
- Three-day path hotspot -> Three-day Route
- Seasonal timing note hotspot -> Best Seasons

### From Travel Advice Summary

- Seasonal guidance hotspot -> Best Seasons
- Logistics guidance hotspot -> Travel Tips

## Return Logic

Return behavior should be simple and predictable.

Rules:

- Every extension page has a primary return target to its source mainline topic.
- Every extension page also has a secondary return target to the Cover / Jeju Overview page.
- Breadcrumbs should show the current mainline context.
- If a user enters an extension from multiple possible parents, default the visible back action to the immediate parent and provide a quiet option for back to overview.

## Suggested Parent Relationships

- Hallasan -> parent: Spatial Structure
- Seongsan Ilchulbong -> parent: Core Sight Map
- Udo -> parent: Core Sight Map
- Jusangjeolli Cliffs -> parent: Core Sight Map
- Waterfalls -> parent: Core Sight Map
- Jeju Culture -> parent: Core Sight Map
- Food -> parent: Core Sight Map
- Dongmun Market -> parent: Core Sight Map
- One-day Route -> parent: Recommended Routes
- Three-day Route -> parent: Recommended Routes
- Best Seasons -> parent: Travel Advice Summary
- Travel Tips -> parent: Travel Advice Summary

## Navigation Pattern

- Mainline pages progress linearly for presenter control.
- Mainline pages also expose selective branch hotspots.
- Extension pages do not branch too deeply into sub-sub-pages in phase one.
- The system should feel like one layer of depth below the mainline, not an infinite maze.

## Phase-One Scope Discipline

- Keep page depth shallow.
- Keep one clear topic per extension page.
- Prefer breadth of landmark coverage over encyclopedic detail.
- Preserve presentability over completeness.
