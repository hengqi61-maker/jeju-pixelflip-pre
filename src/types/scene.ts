export type SceneType = 'mainline' | 'extension'

export type HoverStyle = 'glow' | 'outline' | 'soft-tint' | 'lift'

export type TransitionType =
  | 'fade'
  | 'zoom-in'
  | 'zoom-out'
  | 'pan'
  | 'route-trace'
  | 'zoom-in-to-hotspot'
  | 'zoom-out-to-parent'
  | 'pan-to-region'
  | 'soft-crossfade'

export type TransitionDirection = 'enter' | 'return' | 'mainline'

export type SafeZonePurpose =
  | 'breadcrumb'
  | 'content-panel'
  | 'speaker-notes'
  | 'knowledge-tree'

export type SafeZone = {
  id: string
  purpose: SafeZonePurpose
  x: number
  y: number
  w: number
  h: number
}

export type HotspotRect = {
  x: number
  y: number
  w: number
  h: number
}

export type HotspotEllipse = {
  cx: number
  cy: number
  rx: number
  ry: number
}

export type TransitionHint = {
  type: TransitionType
  focus?: [number, number]
  scale?: number
  duration?: number
  targetEntry?: 'soft-reveal' | 'focus-reveal'
}

export type HotspotShape = 'rect' | 'ellipse' | 'polygon'

type HotspotBase = {
  id: string
  label: string
  targetSceneId: string
  tooltip: string
  hoverStyle?: HoverStyle
  presenterHint?: string
  transitionHint?: TransitionHint
}

export type RectHotspot = HotspotBase & {
  shape: 'rect'
  rect: HotspotRect
}

export type EllipseHotspot = HotspotBase & {
  shape: 'ellipse'
  ellipse: HotspotEllipse
}

export type PolygonHotspot = HotspotBase & {
  shape: 'polygon'
  points: [number, number][]
}

export type Hotspot = RectHotspot | EllipseHotspot | PolygonHotspot

export type SceneVisual = {
  background: string
  foreground?: string
  ambient?: string
  thumbnail?: string
  safeZones: SafeZone[]
  visualIntent: string
}

export type SceneAssetManifest = {
  sceneId: string
  version: string
  status: 'placeholder' | 'draft' | 'reviewed'
  size: {
    master?: [number, number]
    display?: [number, number]
    thumbnail?: [number, number]
  }
  layers: {
    background: string
    foreground?: string
    ambient?: string
    thumbnail?: string
  }
  notes?: string
}

export type SceneContent = {
  audienceTitle: string
  audienceSummary: string
  presenterNotes: string
  talkingPoints: string[]
  transitionLine?: string
}

export type SceneNavigation = {
  nextMainlineId?: string
  previousMainlineId?: string
  primaryReturnId?: string
  overviewReturnId?: string
  recommendedNextIds: string[]
}

export type SceneTransition = {
  enter: TransitionType
  exit: TransitionType
}

export type ImageReferencePlan = {
  useAnchorCrop: boolean
  cropPath?: string
}

export type SceneParentAnchor = {
  sourceHotspotId: string
  parentAnchorDescription: string
  visualContinuityRequirements: string[]
  childExpansionPlan: string[]
  imageReferencePlan: ImageReferencePlan
}

export type SceneMetadata = {
  status: 'draft' | 'art-ready' | 'implemented' | 'reviewed'
  version: string
  lastUpdated?: string
}

export type SceneNode = {
  id: string
  title: string
  type: SceneType
  mainlineIndex?: number
  parentSceneId?: string
  path: string[]
  summary: string
  corePoint: string
  visual: SceneVisual
  content: SceneContent
  hotspots: Hotspot[]
  navigation: SceneNavigation
  transition: SceneTransition
  parentAnchor?: SceneParentAnchor
  metadata: SceneMetadata
}

export type SceneProject = {
  id: string
  title: string
  version: string
  description: string
}

export type SceneGraph = {
  project: SceneProject
  scenes: SceneNode[]
}

export type NavigationMode = 'audience' | 'presenter'
