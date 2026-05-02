import { z } from 'zod'

import type {
  Hotspot,
  ImageReferencePlan,
  SceneParentAnchor,
  SceneGraph,
  SceneMetadata,
  SceneNavigation,
  SceneNode,
  SceneProject,
  SceneTransition,
  SceneTravelGuide,
  SceneVisual,
  SafeZone,
} from '../types/scene'

const normalizedNumber = z.number().min(0).max(1)

const safeZoneSchema: z.ZodType<SafeZone> = z.object({
  id: z.string().min(1),
  purpose: z.enum([
    'breadcrumb',
    'content-panel',
    'speaker-notes',
    'knowledge-tree',
  ]),
  x: normalizedNumber,
  y: normalizedNumber,
  w: normalizedNumber,
  h: normalizedNumber,
})

const transitionHintSchema = z.object({
  type: z.enum([
    'fade',
    'zoom-in',
    'zoom-out',
    'pan',
    'route-trace',
    'zoom-in-to-hotspot',
    'zoom-out-to-parent',
    'pan-to-region',
    'soft-crossfade',
  ]),
  focus: z.tuple([normalizedNumber, normalizedNumber]).optional(),
  scale: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  targetEntry: z.enum(['soft-reveal', 'focus-reveal']).optional(),
})

const hotspotBaseSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  targetSceneId: z.string().min(1),
  tooltip: z.string().min(1),
  hoverStyle: z.enum(['glow', 'outline', 'soft-tint', 'lift']).optional(),
  presenterHint: z.string().optional(),
  transitionHint: transitionHintSchema.optional(),
})

const hotspotSchema: z.ZodType<Hotspot> = z.discriminatedUnion('shape', [
  hotspotBaseSchema.extend({
    shape: z.literal('rect'),
    rect: z.object({
      x: normalizedNumber,
      y: normalizedNumber,
      w: normalizedNumber,
      h: normalizedNumber,
    }),
  }),
  hotspotBaseSchema.extend({
    shape: z.literal('ellipse'),
    ellipse: z.object({
      cx: normalizedNumber,
      cy: normalizedNumber,
      rx: normalizedNumber,
      ry: normalizedNumber,
    }),
  }),
  hotspotBaseSchema.extend({
    shape: z.literal('polygon'),
    points: z
      .array(z.tuple([normalizedNumber, normalizedNumber]))
      .min(3),
  }),
])

const visualSchema: z.ZodType<SceneVisual> = z.object({
  background: z.string().min(1),
  foreground: z.string().optional(),
  ambient: z.string().optional(),
  thumbnail: z.string().optional(),
  safeZones: z.array(safeZoneSchema),
  visualIntent: z.string().min(1),
})

const travelGuideSchema: z.ZodType<SceneTravelGuide> = z.object({
  status: z.enum(['official-reference', 'editorial-guidance']),
  lastVerified: z.string().min(1),
  sourceUrls: z.array(z.string().url()).min(1),
  fee: z.string().min(1).optional(),
  reservation: z.string().min(1).optional(),
  hours: z.string().min(1).optional(),
  transport: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  cautions: z.array(z.string().min(1)).optional(),
  bestFor: z.string().min(1).optional(),
})

const contentSchema = z.object({
  audienceTitle: z.string().min(1),
  audienceSummary: z.string().min(1),
  presenterNotes: z.string().min(1),
  talkingPoints: z.array(z.string().min(1)).min(1),
  transitionLine: z.string().optional(),
  travelGuide: travelGuideSchema.optional(),
})

const navigationSchema: z.ZodType<SceneNavigation> = z.object({
  nextMainlineId: z.string().optional(),
  previousMainlineId: z.string().optional(),
  primaryReturnId: z.string().optional(),
  overviewReturnId: z.string().optional(),
  recommendedNextIds: z.array(z.string()),
})

const sceneTransitionSchema: z.ZodType<SceneTransition> = z.object({
  enter: z.enum([
    'fade',
    'zoom-in',
    'zoom-out',
    'pan',
    'route-trace',
    'zoom-in-to-hotspot',
    'zoom-out-to-parent',
    'pan-to-region',
    'soft-crossfade',
  ]),
  exit: z.enum([
    'fade',
    'zoom-in',
    'zoom-out',
    'pan',
    'route-trace',
    'zoom-in-to-hotspot',
    'zoom-out-to-parent',
    'pan-to-region',
    'soft-crossfade',
  ]),
})

const imageReferencePlanSchema: z.ZodType<ImageReferencePlan> = z.object({
  useAnchorCrop: z.boolean(),
  cropPath: z.string().optional(),
})

const sceneParentAnchorSchema: z.ZodType<SceneParentAnchor> = z.object({
  sourceHotspotId: z.string().min(1),
  parentAnchorDescription: z.string().min(1),
  visualContinuityRequirements: z.array(z.string().min(1)).min(1),
  childExpansionPlan: z.array(z.string().min(1)).min(1),
  imageReferencePlan: imageReferencePlanSchema,
})

const metadataSchema: z.ZodType<SceneMetadata> = z.object({
  status: z.enum(['draft', 'art-ready', 'implemented', 'reviewed']),
  version: z.string().min(1),
  lastUpdated: z.string().optional(),
})

const projectSchema: z.ZodType<SceneProject> = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  version: z.string().min(1),
  description: z.string().min(1),
})

const sceneNodeSchema: z.ZodType<SceneNode> = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(['mainline', 'extension']),
  mainlineIndex: z.number().int().positive().optional(),
  parentSceneId: z.string().optional(),
  path: z.array(z.string().min(1)).min(1),
  summary: z.string().min(1),
  corePoint: z.string().min(1),
  visual: visualSchema,
  content: contentSchema,
  hotspots: z.array(hotspotSchema),
  navigation: navigationSchema,
  transition: sceneTransitionSchema,
  parentAnchor: sceneParentAnchorSchema.optional(),
  metadata: metadataSchema,
})

const sceneGraphSchema: z.ZodType<SceneGraph> = z.object({
  project: projectSchema,
  scenes: z.array(sceneNodeSchema).min(1),
})

export function parseSceneGraph(input: unknown): SceneGraph {
  const graph = sceneGraphSchema.parse(input)
  validateSceneGraphReferences(graph)
  return graph
}

function validateSceneGraphReferences(graph: SceneGraph) {
  const sceneIds = new Set<string>()
  const mainlineIndexes = new Set<number>()

  for (const scene of graph.scenes) {
    if (sceneIds.has(scene.id)) {
      throw new Error(`Duplicate scene id: ${scene.id}`)
    }

    sceneIds.add(scene.id)

    if (scene.type === 'mainline') {
      if (scene.mainlineIndex === undefined) {
        throw new Error(`Mainline scene missing mainlineIndex: ${scene.id}`)
      }

      if (mainlineIndexes.has(scene.mainlineIndex)) {
        throw new Error(`Duplicate mainlineIndex: ${scene.mainlineIndex}`)
      }

      mainlineIndexes.add(scene.mainlineIndex)
    }

    if (scene.type === 'extension' && !scene.parentSceneId) {
      throw new Error(`Extension scene missing parentSceneId: ${scene.id}`)
    }

    if (scene.type === 'extension' && !scene.content.travelGuide) {
      throw new Error(`Extension scene missing travelGuide: ${scene.id}`)
    }

    if (scene.type === 'mainline' && scene.content.travelGuide) {
      throw new Error(`Mainline scene should not define travelGuide: ${scene.id}`)
    }

    if (scene.parentAnchor && scene.type !== 'extension') {
      throw new Error(`Only extension scenes may define parentAnchor: ${scene.id}`)
    }

    const hotspotIds = new Set<string>()
    for (const hotspot of scene.hotspots) {
      if (hotspotIds.has(hotspot.id)) {
        throw new Error(`Duplicate hotspot id in ${scene.id}: ${hotspot.id}`)
      }
      hotspotIds.add(hotspot.id)
    }
  }

  for (const scene of graph.scenes) {
    validateReference(scene.parentSceneId, scene.id, 'parentSceneId', sceneIds)
    validateReference(
      scene.navigation.nextMainlineId,
      scene.id,
      'nextMainlineId',
      sceneIds,
    )
    validateReference(
      scene.navigation.previousMainlineId,
      scene.id,
      'previousMainlineId',
      sceneIds,
    )
    validateReference(
      scene.navigation.primaryReturnId,
      scene.id,
      'primaryReturnId',
      sceneIds,
    )
    validateReference(
      scene.navigation.overviewReturnId,
      scene.id,
      'overviewReturnId',
      sceneIds,
    )

    for (const nextId of scene.navigation.recommendedNextIds) {
      validateReference(nextId, scene.id, 'recommendedNextIds', sceneIds)
    }

    for (const hotspot of scene.hotspots) {
      validateReference(
        hotspot.targetSceneId,
        scene.id,
        `hotspot:${hotspot.id}`,
        sceneIds,
      )
    }

    if (scene.parentAnchor && scene.parentSceneId) {
      const parentScene = graph.scenes.find(
        (candidate) => candidate.id === scene.parentSceneId,
      )

      if (!parentScene) {
        throw new Error(
          `Parent scene not found for parentAnchor in ${scene.id}: ${scene.parentSceneId}`,
        )
      }

      const sourceHotspotExists = parentScene.hotspots.some(
        (hotspot) => hotspot.id === scene.parentAnchor?.sourceHotspotId,
      )

      if (!sourceHotspotExists) {
        throw new Error(
          `parentAnchor sourceHotspotId not found in ${scene.parentSceneId}: ${scene.parentAnchor.sourceHotspotId}`,
        )
      }
    }
  }
}

function validateReference(
  reference: string | undefined,
  sceneId: string,
  field: string,
  sceneIds: Set<string>,
) {
  if (reference && !sceneIds.has(reference)) {
    throw new Error(`Scene ${sceneId} has invalid ${field}: ${reference}`)
  }
}
