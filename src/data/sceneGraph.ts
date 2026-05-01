import type { Hotspot, SceneGraph, SceneNode, SafeZone } from '../types/scene'
import { getSceneAssetPaths } from '../utils/sceneAssets'
import { parseSceneGraph } from '../utils/sceneGraphValidation'

const defaultSafeZones: SafeZone[] = [
  {
    id: 'breadcrumb-top',
    purpose: 'breadcrumb',
    x: 0.04,
    y: 0.05,
    w: 0.34,
    h: 0.07,
  },
  {
    id: 'content-right',
    purpose: 'content-panel',
    x: 0.7,
    y: 0.12,
    w: 0.25,
    h: 0.58,
  },
  {
    id: 'speaker-bottom',
    purpose: 'speaker-notes',
    x: 0.04,
    y: 0.76,
    w: 0.45,
    h: 0.16,
  },
]

function withContentPanelSafeZone(
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
): SafeZone[] {
  return [
    ...defaultSafeZones.filter(
      (safeZone) => safeZone.purpose !== 'content-panel',
    ),
    {
      id,
      purpose: 'content-panel',
      x,
      y,
      w,
      h,
    },
  ]
}

function ellipseHotspot(
  id: string,
  label: string,
  targetSceneId: string,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  tooltip: string,
  focus: [number, number],
): Hotspot {
  return {
    id,
    label,
    targetSceneId,
    shape: 'ellipse',
    ellipse: { cx, cy, rx, ry },
    tooltip,
    hoverStyle: 'glow',
    presenterHint: `Use ${label} to branch deeper into the atlas.`,
    transitionHint: {
      type: 'zoom-in-to-hotspot',
      focus,
      scale: 1.65,
      duration: 650,
      targetEntry: 'soft-reveal',
    },
  }
}

function polygonHotspot(
  id: string,
  label: string,
  targetSceneId: string,
  points: [number, number][],
  tooltip: string,
  focus: [number, number],
): Hotspot {
  return {
    id,
    label,
    targetSceneId,
    shape: 'polygon',
    points,
    tooltip,
    hoverStyle: 'outline',
    presenterHint: `Branch from the world view into ${label}.`,
    transitionHint: {
      type: 'zoom-in-to-hotspot',
      focus,
      scale: 1.8,
      duration: 700,
      targetEntry: 'focus-reveal',
    },
  }
}

function createScene(config: {
  id: string
  title: string
  type: SceneNode['type']
  mainlineIndex?: number
  parentSceneId?: string
  path: string[]
  summary: string
  corePoint: string
  visualIntent: string
  presenterNotes: string
  talkingPoints: string[]
  hotspots?: Hotspot[]
  nextMainlineId?: string
  previousMainlineId?: string
  primaryReturnId?: string
  overviewReturnId?: string
  recommendedNextIds?: string[]
  safeZones?: SafeZone[]
  enter?: SceneNode['transition']['enter']
  exit?: SceneNode['transition']['exit']
  parentAnchor?: SceneNode['parentAnchor']
}): SceneNode {
  const assetPaths = getSceneAssetPaths(config.id)

  return {
    id: config.id,
    title: config.title,
    type: config.type,
    mainlineIndex: config.mainlineIndex,
    parentSceneId: config.parentSceneId,
    path: config.path,
    summary: config.summary,
    corePoint: config.corePoint,
    visual: {
      background: assetPaths.background,
	      foreground: assetPaths.foreground,
	      ambient: assetPaths.ambient,
	      thumbnail: assetPaths.thumbnail,
	      safeZones: config.safeZones ?? defaultSafeZones,
	      visualIntent: config.visualIntent,
	    },
    content: {
      audienceTitle: config.title,
      audienceSummary: config.summary,
      presenterNotes: config.presenterNotes,
      talkingPoints: config.talkingPoints,
      transitionLine:
        config.type === 'extension'
          ? `We are entering ${config.title} as a prepared branch from the wider Jeju atlas.`
          : `This scene advances the mainline atlas from ${config.title}.`,
    },
    hotspots: config.hotspots ?? [],
    navigation: {
      nextMainlineId: config.nextMainlineId,
      previousMainlineId: config.previousMainlineId,
      primaryReturnId: config.primaryReturnId,
      overviewReturnId: config.overviewReturnId,
      recommendedNextIds: config.recommendedNextIds ?? [],
    },
    transition: {
      enter: config.enter ?? 'soft-crossfade',
      exit: config.exit ?? 'zoom-out-to-parent',
    },
    parentAnchor: config.parentAnchor,
    metadata: {
      status: 'draft',
      version: '0.1.0',
      lastUpdated: '2026-04-27',
    },
  }
}

const overviewHotspots = [
  polygonHotspot(
    'hs-hallasan-overview',
    'Hallasan',
    'ext-hallasan',
	    [
	      [0.39, 0.34],
	      [0.48, 0.25],
	      [0.57, 0.42],
	      [0.46, 0.55],
	      [0.34, 0.46],
	    ],
	    'Central volcanic mountain and spatial anchor of Jeju.',
	    [0.46, 0.4],
	  ),
  ellipseHotspot(
    'hs-seongsan-overview',
    'Seongsan Ilchulbong',
    'ext-seongsan',
	    0.79,
	    0.47,
	    0.09,
	    0.1,
	    'Eastern sunrise landmark and iconic coastal volcanic cone.',
	    [0.79, 0.47],
	  ),
  ellipseHotspot(
    'hs-udo-overview',
    'Udo',
    'ext-udo',
	    0.78,
	    0.31,
	    0.05,
	    0.04,
	    'Satellite island with a slower coastal rhythm.',
	    [0.78, 0.31],
	  ),
  ellipseHotspot(
    'hs-waterfalls-overview',
    'Waterfalls',
    'ext-waterfalls',
	    0.48,
	    0.45,
	    0.06,
	    0.09,
	    'Lush south-coast waterfall belt and subtropical scenery.',
	    [0.48, 0.45],
	  ),
  ellipseHotspot(
    'hs-market-overview',
    'Dongmun Market',
    'ext-dongmun-market',
    0.17,
    0.48,
    0.09,
    0.08,
    'Jeju City market node for urban food energy.',
    [0.17, 0.48],
  ),
  ellipseHotspot(
    'hs-food-overview',
    'Food',
    'ext-food',
    0.72,
    0.7,
    0.1,
    0.08,
    'Black pork, seafood, citrus, and memorable dining atmosphere.',
    [0.72, 0.7],
  ),
]

const scenes: SceneNode[] = [
  createScene({
    id: 'cover-overview',
    title: 'Jeju Overview',
    type: 'mainline',
    mainlineIndex: 1,
    path: ['Jeju Atlas', 'Overview'],
    summary:
      'Opening atlas scene that frames Jeju as one connected, explorable miniature world.',
    corePoint:
      'Jeju should be introduced as a navigable world first, then explained through branches.',
    visualIntent:
      'A premium pixel-art world view of Jeju with volcanic center, coastal edges, market hints, and route-ready landmarks.',
    presenterNotes:
      'Open by inviting the audience to read the island visually before speaking through any itinerary.',
	    talkingPoints: [
	      'Jeju is compact, but it contains multiple landscape logics.',
	      'This prototype behaves like a visual browser rather than a slide deck.',
	      'Use hotspots to branch into the parts the audience cares about most.',
	    ],
	    hotspots: overviewHotspots,
	    safeZones: withContentPanelSafeZone(
	      'content-panel-cover-ocean',
	      0.76,
	      0.11,
	      0.2,
	      0.36,
	    ),
	    nextMainlineId: 'spatial-structure',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['spatial-structure', 'ext-hallasan', 'ext-seongsan'],
    enter: 'soft-crossfade',
    exit: 'zoom-out-to-parent',
  }),
  createScene({
    id: 'spatial-structure',
    title: 'Spatial Structure',
    type: 'mainline',
    mainlineIndex: 2,
    path: ['Jeju Atlas', 'Spatial Structure'],
    summary:
      'Geography-led scene showing how mountain center, coastal edges, and ring-road logic shape the island.',
    corePoint:
      'Jeju travel makes sense once the audience understands the island as a center-periphery system.',
    visualIntent:
      'Simplified but atmospheric regional atlas view with Hallasan massing and directional movement logic.',
    presenterNotes:
      'Use this scene to explain why travel time, region clustering, and route discipline matter.',
    talkingPoints: [
      'Hallasan anchors the entire island.',
      'Coastal circulation is easier to explain than inland traversal.',
      'Geography naturally produces itinerary clusters.',
    ],
    hotspots: [
      ellipseHotspot(
        'hs-hallasan-structure',
        'Central Mountain Core',
        'ext-hallasan',
	        0.46,
	        0.33,
	        0.13,
	        0.16,
	        'Mountain-centered structure that shapes movement and identity.',
	        [0.46, 0.33],
	      ),
      ellipseHotspot(
        'hs-east-structure',
        'East Coast',
        'ext-seongsan',
	        0.79,
	        0.51,
	        0.1,
	        0.11,
	        'Eastern coastline clustered around sunrise and volcanic forms.',
	        [0.79, 0.51],
	      ),
      ellipseHotspot(
        'hs-udo-structure',
        'Udo Link',
        'ext-udo',
	        0.85,
	        0.29,
	        0.05,
	        0.05,
	        'Satellite island link for ferry-based detours.',
	        [0.85, 0.29],
	      ),
      ellipseHotspot(
        'hs-cliffs-structure',
        'Geological Coast',
        'ext-jusangjeolli',
        0.18,
        0.65,
        0.12,
        0.12,
        'Coastal geology where volcanic structure becomes visible.',
        [0.18, 0.65],
      ),
      ellipseHotspot(
        'hs-waterfalls-structure',
        'South Scenic Belt',
        'ext-waterfalls',
        0.5,
        0.78,
        0.1,
        0.08,
        'Southern scenic belt with lush waterfall pockets.',
        [0.5, 0.78],
      ),
	    ],
	    safeZones: withContentPanelSafeZone(
	      'content-panel-structure-east-ocean',
	      0.78,
	      0.09,
	      0.19,
	      0.34,
	    ),
	    nextMainlineId: 'core-sight-map',
    previousMainlineId: 'cover-overview',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['core-sight-map', 'ext-hallasan', 'ext-jusangjeolli'],
    enter: 'pan',
  }),
  createScene({
    id: 'core-sight-map',
    title: 'Core Sight Map',
    type: 'mainline',
    mainlineIndex: 3,
    path: ['Jeju Atlas', 'Core Sights'],
    summary:
      'Branch hub scene showing how signature landmarks, culture, and food form experience clusters.',
    corePoint:
      'Jeju is best understood as a network of experiences rather than one iconic stop.',
    visualIntent:
      'Dense atlas map with landmark clusters and thematic zones that invite branch exploration.',
    presenterNotes:
      'This is the strongest branching page. Use it to adapt the presentation live without losing narrative clarity.',
    talkingPoints: [
      'Nature, culture, and food should appear in one integrated map.',
      'Branching works best from scenes with clear cluster logic.',
      'Landmarks are entry points into a broader island system.',
    ],
    hotspots: [
      ellipseHotspot(
        'hs-hallasan-core',
        'Hallasan',
        'ext-hallasan',
	        0.42,
	        0.27,
	        0.1,
	        0.13,
	        'The central mountain remains the island anchor.',
	        [0.42, 0.27],
	      ),
      ellipseHotspot(
        'hs-seongsan-core',
        'Seongsan Ilchulbong',
        'ext-seongsan',
	        0.77,
	        0.49,
	        0.09,
	        0.11,
	        'A landmark that instantly explains Jeju’s eastern identity.',
	        [0.77, 0.49],
	      ),
      ellipseHotspot(
        'hs-udo-core',
        'Udo',
        'ext-udo',
	        0.76,
	        0.27,
	        0.05,
	        0.04,
	        'A slower island sub-world reached by ferry.',
	        [0.76, 0.27],
	      ),
      ellipseHotspot(
        'hs-jusangjeolli-core',
        'Jusangjeolli Cliffs',
        'ext-jusangjeolli',
	        0.12,
	        0.63,
	        0.1,
	        0.12,
	        'Basalt columns where geology becomes architectural.',
	        [0.12, 0.63],
	      ),
      ellipseHotspot(
        'hs-waterfalls-core',
	        'Waterfalls',
	        'ext-waterfalls',
	        0.44,
	        0.8,
	        0.09,
	        0.08,
	        'Lush scenic contrast to the harsher coast.',
	        [0.44, 0.8],
	      ),
      ellipseHotspot(
        'hs-culture-core',
	        'Jeju Culture',
	        'ext-jeju-culture',
	        0.25,
	        0.6,
	        0.08,
	        0.08,
	        'Stone walls, symbols, and island identity textures.',
	        [0.25, 0.6],
	      ),
      ellipseHotspot(
        'hs-food-core',
        'Food',
        'ext-food',
	        0.74,
	        0.7,
	        0.11,
	        0.08,
	        'Food as atmosphere, memory, and regional identity.',
	        [0.74, 0.7],
	      ),
      ellipseHotspot(
        'hs-market-core',
        'Dongmun Market',
        'ext-dongmun-market',
	        0.18,
	        0.42,
	        0.08,
	        0.08,
	        'Urban market density within the wider island atlas.',
	        [0.18, 0.42],
	      ),
	    ],
	    safeZones: withContentPanelSafeZone(
	      'content-panel-core-sight-ocean',
	      0.77,
	      0.09,
	      0.2,
	      0.35,
	    ),
	    nextMainlineId: 'recommended-routes',
    previousMainlineId: 'spatial-structure',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['recommended-routes', 'ext-seongsan', 'ext-food'],
    enter: 'zoom-in',
  }),
  createScene({
    id: 'recommended-routes',
    title: 'Recommended Routes',
    type: 'mainline',
    mainlineIndex: 4,
    path: ['Jeju Atlas', 'Recommended Routes'],
    summary:
      'Route-planning scene translating the atlas into focused one-day and balanced three-day movement logic.',
    corePoint:
      'A strong Jeju route is built around pacing, regional grouping, and restraint rather than trying to collect every landmark.',
    visualIntent:
      'Route overlay scene with directional traces, timing zones, coastal movement, and itinerary rhythm cues.',
    presenterNotes:
      'Use this page to move from inspiration into planning. Frame route design as the moment where the atlas becomes useful: the audience should see that Jeju is large enough to punish over-planning, but structured enough to make elegant routes possible.',
    talkingPoints: [
      'A one-day route should choose one strong slice of Jeju instead of pretending the whole island can be absorbed at once.',
      'A three-day route can balance east-coast icons, Hallasan-centered geography, south-coast scenery, and city or food experiences.',
      'Good pacing protects the trip: fewer rushed transfers means more time to actually feel the island.',
      'Route design is where visual curiosity becomes travel intelligence.',
    ],
    hotspots: [
      ellipseHotspot(
        'hs-one-day-route',
        'One-day Route',
        'ext-one-day-route',
        0.27,
        0.53,
        0.18,
        0.2,
        'A disciplined short-stay route for one strong Jeju slice.',
        [0.27, 0.53],
      ),
      ellipseHotspot(
        'hs-three-day-route',
        'Three-day Route',
        'ext-three-day-route',
        0.62,
        0.5,
        0.21,
        0.27,
        'A balanced route that allows scenery, food, and pacing.',
        [0.62, 0.5],
      ),
      ellipseHotspot(
        'hs-best-season-route',
        'Best Seasons',
        'ext-best-seasons',
        0.08,
        0.15,
        0.12,
        0.09,
        'Season changes whether routes feel open, windy, floral, or crowded.',
        [0.08, 0.15],
      ),
    ],
    nextMainlineId: 'travel-advice-summary',
    previousMainlineId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: [
      'travel-advice-summary',
      'ext-one-day-route',
      'ext-three-day-route',
    ],
    enter: 'route-trace',
  }),
  createScene({
    id: 'travel-advice-summary',
    title: 'Travel Advice Summary',
    type: 'mainline',
    mainlineIndex: 5,
    path: ['Jeju Atlas', 'Travel Advice'],
    summary:
      'Closing summary scene that converts scenic inspiration into season, pacing, weather, and transport judgment.',
    corePoint:
      'The best Jeju trip is not defined by one perfect season or one perfect checklist, but by matching expectations to weather, distance, and travel rhythm.',
    visualIntent:
      'Calm closing atlas scene with seasonal mood zones, transport cues, weather awareness, and practical decision-making energy.',
    presenterNotes:
      'End by helping the audience make decisions, not just admire places. The close should feel useful and reassuring: Jeju is easier to plan when travelers understand season tradeoffs, wind, distances, and when to slow down.',
    talkingPoints: [
      'There is no universal best season: spring, summer, autumn, and winter each change the mood and tradeoffs of the island.',
      'Wind, rain, distance, and parking or transport choices can shape the day as much as the attraction list.',
      'A smoother trip usually comes from grouping nearby experiences and leaving space for weather changes.',
      'The goal is not to finish the map; it is to leave with a clear, memorable version of Jeju.',
    ],
    hotspots: [
      ellipseHotspot(
        'hs-best-seasons-advice',
        'Best Seasons',
        'ext-best-seasons',
        0.24,
        0.54,
        0.25,
        0.3,
        'Seasonal guidance for bloom, greenery, weather, and crowd tradeoffs.',
        [0.24, 0.54],
      ),
      ellipseHotspot(
        'hs-travel-tips-advice',
        'Travel Tips',
        'ext-travel-tips',
        0.61,
        0.67,
        0.2,
        0.18,
        'Practical transport and pacing advice for a smoother trip.',
        [0.61, 0.67],
      ),
    ],
    previousMainlineId: 'recommended-routes',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-best-seasons', 'ext-travel-tips', 'cover-overview'],
    enter: 'soft-crossfade',
    exit: 'fade',
  }),
  createScene({
    id: 'ext-hallasan',
    title: 'Hallasan',
    type: 'extension',
    parentSceneId: 'spatial-structure',
    path: ['Jeju Atlas', 'Spatial Structure', 'Hallasan'],
    summary:
      'Prepared branch focused on Hallasan as Jeju’s geographic and emotional center.',
    corePoint:
      'Hallasan explains both the map logic and the emotional identity of Jeju.',
    visualIntent:
      'Close-up mountain world with crater cues, trail lines, cloud shifts, and clear altitude storytelling.',
    presenterNotes:
      'Use this scene to explain that Jeju is not a flat beach island and that elevation changes both mood and movement.',
    talkingPoints: [
      'The mountain is central in both map structure and memory.',
      'Elevation and weather shape the travel experience.',
      'Hallasan gives the island vertical drama.',
    ],
    parentAnchor: {
      sourceHotspotId: 'hs-hallasan-structure',
      parentAnchorDescription:
        'In the parent Spatial Structure scene, Hallasan appears as the dominant central mountain mass with a broad volcanic silhouette, a bright summit zone, a crater-like crown, and descending green belts that organize the whole island around it. The surrounding routes and terrain all imply that the island radiates outward from this elevated core.',
      visualContinuityRequirements: [
        'Preserve Hallasan as a central volcanic mass, not a generic alpine mountain.',
        'Keep the same warm daylight palette, coastal-blue horizon logic, and 2.5D atlas perspective.',
        'Preserve the summit-crater identity and the sense that lower green belts descend from the mountain core.',
        'Make the child scene feel like a closer camera move into the same mountain object seen in the parent scene.',
      ],
      childExpansionPlan: [
        'Expand the crater basin into a readable summit destination.',
        'Reveal trail logic, altitude bands, shelters, and small hikers without changing the mountain identity.',
        'Preserve the relationship between upper rock, middle forest, and lower routes.',
        'Leave a calm side zone so the collapsed panel does not cover the summit form.',
      ],
      imageReferencePlan: {
        useAnchorCrop: true,
        cropPath:
          '/assets/anchor-crops/spatial-structure/hs-hallasan-structure.png',
      },
    },
    primaryReturnId: 'spatial-structure',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['core-sight-map', 'ext-seongsan'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-seongsan',
    title: 'Seongsan Ilchulbong',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Seongsan Ilchulbong'],
    summary:
      'Prepared branch for Jeju’s eastern volcanic icon and sunrise-facing landform.',
    corePoint:
      'Seongsan works because its silhouette instantly communicates place.',
    visualIntent:
      'Coastal tuff cone world with sea edge, stair logic, and sunrise atmosphere.',
    presenterNotes:
      'Explain why this landmark is visually memorable and why it anchors the eastern coast so strongly.',
    talkingPoints: [
      'Seongsan is one of the clearest single-form landmarks in Jeju.',
      'Its location amplifies sunrise and east-coast identity.',
      'The branch should feel like a closer look at the same world.',
    ],
    parentAnchor: {
      sourceHotspotId: 'hs-seongsan-core',
      parentAnchorDescription:
        'In the parent Core Sight Map scene, Seongsan Ilchulbong appears on the right side as a distinct tuff-cone crater beside bright coastal water and a narrow shoreline edge. It reads as an eastern volcanic cone with a clear bowl shape, sea contact, and open sky around it.',
      visualContinuityRequirements: [
        'Preserve the same crater silhouette, coastline relationship, and east-coast orientation visible in the parent scene.',
        'Keep the same daylight direction, blue-water palette, and atlas-scale visual language.',
        'Do not redesign Seongsan into a different hill or a cinematic postcard scene.',
        'Make the child scene feel like the camera zoomed into the exact eastern cone from the parent map.',
      ],
      childExpansionPlan: [
        'Expand the crater rim into a readable ascent and summit world.',
        'Reveal path logic, rim texture, and small visitor scale details.',
        'Keep the surrounding sea edge present so the landmark still feels coastal.',
        'Reserve a calmer side for the collapsed panel without weakening the cone silhouette.',
      ],
      imageReferencePlan: {
        useAnchorCrop: true,
        cropPath: '/assets/anchor-crops/core-sight-map/hs-seongsan-core.png',
      },
    },
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-udo', 'recommended-routes'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-udo',
    title: 'Udo',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Udo'],
    summary:
      'Prepared branch for Udo as a slower ferry-linked satellite island experience.',
    corePoint:
      'Udo changes the rhythm of Jeju travel rather than simply adding another stop.',
    visualIntent:
      'Satellite island scene with ring-road coastline, ferry arrival cues, bikes, low hills, bright water, and open field calm.',
    presenterNotes:
      'Position Udo as a pace shift and a world-within-the-world. The branch should help the audience feel why a short ferry crossing changes the day: movement slows down, the coastline becomes more intimate, and bikes or scooters make the island feel loopable.',
    talkingPoints: [
      'Udo is best introduced as a smaller island rhythm rather than another landmark checklist.',
      'The ferry link makes the experience feel intentionally separate from the main island.',
      'A ring road, bikes, beaches, and fields give the branch a slow exploratory tempo.',
      'This scene should feel like zooming into the small satellite island visible near the eastern coast.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-seongsan', 'recommended-routes'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-jusangjeolli',
    title: 'Jusangjeolli Cliffs',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Jusangjeolli Cliffs'],
    summary:
      'Prepared branch revealing volcanic geology through basalt-column cliffs and wave impact.',
    corePoint:
      'Jusangjeolli makes Jeju’s volcanic history legible as visible form.',
    visualIntent:
      'Basalt cliff-edge scene where repeating column geometry, white surf, dark stone, and viewing scale carry the story.',
    presenterNotes:
      'Let the audience read volcanic history through texture, repetition, and coast impact. This page should feel almost architectural, but still natural: the point is not to lecture geology, but to show how lava history becomes a coastline you can stand beside.',
    talkingPoints: [
      'The repeating basalt columns make geology visible at a glance.',
      'Surf against dark volcanic stone gives the scene energy and scale.',
      'This branch balances the softer scenic pages with a sharper structural landscape.',
      'The image should stay readable enough that the audience can understand the form before hearing the explanation.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-waterfalls', 'recommended-routes'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-waterfalls',
    title: 'Waterfalls',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Waterfalls'],
    summary:
      'Prepared branch for Jeju’s lush waterfall scenery, mist, basalt ravines, and subtropical contrast.',
    corePoint:
      'Water-rich landscapes show a softer side of Jeju beyond basalt cliffs and volcanic icons.',
    visualIntent:
      'Waterfall scene with vertical white flow, mist, dark volcanic rock, dense green foliage, pools, and small viewing paths.',
    presenterNotes:
      'Use this branch to widen the audience’s sense of Jeju’s visual range. After mountains, cliffs, and coastlines, the waterfall page should introduce humidity, shade, mist, and a more intimate walking pace.',
    talkingPoints: [
      'Waterfalls diversify the island image beyond beaches and volcanic cones.',
      'Dark basalt and bright white water keep the volcanic identity present.',
      'Dense greenery gives the route a softer, more sheltered atmosphere.',
      'This page is useful for explaining why Jeju routes should mix scenic textures rather than repeat the same kind of stop.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-jusangjeolli', 'travel-advice-summary'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-jeju-culture',
    title: 'Jeju Culture',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Jeju Culture'],
    summary:
      'Prepared branch focused on cultural symbols, island materials, and everyday Jeju identity.',
    corePoint:
      'Jeju should feel culturally distinct, not just scenically attractive.',
    visualIntent:
      'Cultural village scene with basalt stone walls, dol hareubang, low houses, citrus, coastal wind, and lived island textures.',
    presenterNotes:
      'Keep the branch grounded in symbolic and environmental identity instead of turning it into a history lecture. The strongest version of this page shows culture as part of the landscape: stone walls, wind, houses, citrus, and small daily-life details.',
    talkingPoints: [
      'Symbols need to feel lived-in, not decorative only.',
      'Stone, wind, citrus, and low village forms help Jeju feel materially distinct.',
      'Culture should sit inside the atlas, not apart from it.',
      'This branch makes the island feel inhabited rather than purely scenic.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-dongmun-market', 'ext-food'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-food',
    title: 'Food',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Food'],
    summary:
      'Prepared branch for Jeju food memory through black pork, seafood, citrus, and atmosphere.',
    corePoint:
      'Food should read as place experience, not menu enumeration.',
    visualIntent:
      'Warm dining scene with grill glow, seafood textures, market energy, and citrus accents.',
    presenterNotes:
      'Talk about sensory memory and regional identity rather than listing dishes.',
    talkingPoints: [
      'Food is one of the strongest memory anchors in travel.',
      'Atmosphere matters as much as specific dishes.',
      'This branch adds warmth to the atlas.',
    ],
    parentAnchor: {
      sourceHotspotId: 'hs-food-core',
      parentAnchorDescription:
        'In the parent Core Sight Map scene, the food region appears on the lower-right side as a circular dining and market cluster near the coast, with warm table colors, clustered dishes, and a lively island-edge atmosphere. It is not a single dish, but a compact social food district.',
      visualContinuityRequirements: [
        'Preserve the lower-right coastal placement, warm palette, and clustered dining identity from the parent scene.',
        'Keep the same Jeju atlas perspective and bright outdoor world rather than switching to a generic restaurant interior.',
        'Make the child scene feel like a closer look at the same food district, not a new menu collage.',
        'Retain food-as-atmosphere rather than food-as-labels.',
      ],
      childExpansionPlan: [
        'Expand the circular dining cluster into a readable food-world with black pork, seafood, citrus, tables, and pathways.',
        'Keep social energy and local place feeling stronger than individual dish cataloging.',
        'Use small visitors, serving areas, and circulation paths for scale.',
        'Leave enough calm edge space for the collapsed panel.',
      ],
      imageReferencePlan: {
        useAnchorCrop: true,
        cropPath: '/assets/anchor-crops/core-sight-map/hs-food-core.png',
      },
    },
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-dongmun-market', 'recommended-routes'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-dongmun-market',
    title: 'Dongmun Market',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Dongmun Market'],
    summary:
      'Prepared branch for Dongmun Market as a dense urban food, produce, and walking node.',
    corePoint:
      'Urban market density gives the atlas an essential local contrast to Jeju’s open landscapes.',
    visualIntent:
      'Market district scene with roof rhythm, warm stall light, seafood and citrus cues, packaged produce, narrow aisles, and pedestrian energy.',
    presenterNotes:
      'Use this scene to contrast urban density with Jeju’s open landscapes. Dongmun should feel practical and atmospheric at the same time: a place to eat, buy, wander, and feel local movement.',
    talkingPoints: [
      'The market condenses local energy into a compact walking environment.',
      'Food, produce, souvenirs, and city movement overlap here.',
      'This branch helps balance nature-heavy storytelling with an urban/local node.',
      'Dongmun is practical, social, and atmospheric at once.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-food', 'travel-advice-summary'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-one-day-route',
    title: 'One-day Route',
    type: 'extension',
    parentSceneId: 'recommended-routes',
    path: ['Jeju Atlas', 'Recommended Routes', 'One-day Route'],
    summary:
      'Prepared route branch for a disciplined one-day Jeju experience that chooses focus over coverage.',
    corePoint:
      'A short stay becomes enjoyable only when the route remains geographically coherent.',
    visualIntent:
      'Tight route-atlas scene with compact movement, timing cues, rest points, and a clear sense of what is intentionally omitted.',
    presenterNotes:
      'Be explicit about tradeoffs. The strength of this route is discipline, not maximal coverage. The audience should feel that a good one-day route protects attention and energy by refusing to chase the whole island.',
    talkingPoints: [
      'One day requires choosing one coherent island slice.',
      'Too many stops weaken the island experience by turning it into transfers.',
      'A good route preserves energy, weather flexibility, and memory.',
      'This page should make restraint feel like a design choice, not a compromise.',
    ],
    primaryReturnId: 'recommended-routes',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-three-day-route', 'travel-advice-summary'],
    enter: 'route-trace',
  }),
  createScene({
    id: 'ext-three-day-route',
    title: 'Three-day Route',
    type: 'extension',
    parentSceneId: 'recommended-routes',
    path: ['Jeju Atlas', 'Recommended Routes', 'Three-day Route'],
    summary:
      'Prepared route branch for a balanced three-day Jeju itinerary with regional grouping and pacing.',
    corePoint:
      'Three days is enough time to combine scenery, food, and pacing without constant rushing.',
    visualIntent:
      'Multi-day route-atlas scene with three clear clusters, day-based grouping, rest rhythm, and balanced regional coverage.',
    presenterNotes:
      'Show how day sequencing can reduce travel friction while widening experience variety. This branch should make the atlas feel useful: east-coast icons, central geography, food, city, and coast can be grouped into a trip that breathes.',
    talkingPoints: [
      'Three days unlocks better rhythm because the route does not need to compress every experience into one day.',
      'The route can balance east, central, south/coastal, and urban/food zones.',
      'Grouping nearby experiences reduces wasted transfers.',
      'This branch shows how the atlas becomes planning intelligence.',
    ],
    primaryReturnId: 'recommended-routes',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-best-seasons', 'travel-advice-summary'],
    enter: 'route-trace',
  }),
  createScene({
    id: 'ext-best-seasons',
    title: 'Best Seasons',
    type: 'extension',
    parentSceneId: 'travel-advice-summary',
    path: ['Jeju Atlas', 'Travel Advice', 'Best Seasons'],
    summary:
      'Prepared seasonal guidance branch showing how Jeju’s mood, activities, crowds, and weather tradeoffs change across the year.',
    corePoint:
      'The best Jeju season depends on desired atmosphere, activity, and tolerance for wind or crowds.',
    visualIntent:
      'Unified seasonal atlas scene with blossom, greenery, clear autumn light, wind, citrus, and coastal weather cues.',
    presenterNotes:
      'Avoid one-size-fits-all advice and instead help the audience map expectations to seasons. The point is not to name one perfect month, but to show that every season changes the island’s mood and planning tradeoffs.',
    talkingPoints: [
      'Season changes the emotional tone of the island.',
      'Weather, wind, crowds, and activity fit matter as much as scenery.',
      'Spring, summer, autumn, and winter should feel like different versions of Jeju rather than ranked options.',
      'This branch helps the summary page become actionable.',
    ],
    primaryReturnId: 'travel-advice-summary',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-travel-tips', 'cover-overview'],
    enter: 'soft-crossfade',
  }),
  createScene({
    id: 'ext-travel-tips',
    title: 'Travel Tips',
    type: 'extension',
    parentSceneId: 'travel-advice-summary',
    path: ['Jeju Atlas', 'Travel Advice', 'Travel Tips'],
    summary:
      'Prepared advice branch covering transport assumptions, weather, pacing, walking effort, and trip comfort.',
    corePoint:
      'Practical expectations protect the quality of the Jeju experience.',
    visualIntent:
      'Utility-focused atlas scene with route fragments, transport cues, weather exposure, luggage, rest points, and restrained guidance framing.',
    presenterNotes:
      'Keep this branch concise and useful so the audience leaves more prepared, not more overwhelmed. The tone should be reassuring: small practical expectations can prevent the most common friction points.',
    talkingPoints: [
      'Transport assumptions shape the trip more than many visitors expect.',
      'Wind, rain, walking distance, and parking or booking timing affect comfort.',
      'Grouping nearby experiences protects the day from unnecessary friction.',
      'Good tips increase trust in the visual presentation because the atlas becomes usable.',
    ],
    primaryReturnId: 'travel-advice-summary',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['cover-overview', 'recommended-routes'],
    enter: 'soft-crossfade',
    exit: 'fade',
  }),
]

const graphSource: SceneGraph = {
  project: {
    id: 'jeju-pixelflip-pre',
    title: 'Jeju PixelFlip Pre',
    version: '0.1.0',
    description:
      'Prepared explorable pixel-art presentation prototype about Jeju Island.',
  },
  scenes,
}

export const sceneGraph = parseSceneGraph(graphSource)

export function getSceneById(sceneId: string) {
  return sceneGraph.scenes.find((scene) => scene.id === sceneId)
}
