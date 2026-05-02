import { describe, expect, it } from 'vitest'

import { sceneGraph } from '../data/sceneGraph'
import { getSceneAssetPaths } from './sceneAssets'
import { parseSceneGraph } from './sceneGraphValidation'

describe('sceneGraphValidation', () => {
  it('accepts the current scene graph', () => {
    expect(sceneGraph.scenes.length).toBeGreaterThan(5)
  })

  it('uses the scene asset contract for every scene', () => {
    for (const scene of sceneGraph.scenes) {
      const assetPaths = getSceneAssetPaths(scene.id)

      expect(scene.visual.background).toBe(assetPaths.background)
      expect(scene.visual.foreground).toBe(assetPaths.foreground)
      expect(scene.visual.ambient).toBe(assetPaths.ambient)
      expect(scene.visual.thumbnail).toBe(assetPaths.thumbnail)
    }
  })

  it('requires every extension scene to carry a verified travel guide', () => {
    const extensionScenes = sceneGraph.scenes.filter(
      (scene) => scene.type === 'extension',
    )
    const mainlineScenes = sceneGraph.scenes.filter(
      (scene) => scene.type === 'mainline',
    )

    expect(extensionScenes).toHaveLength(12)
    expect(mainlineScenes).toHaveLength(5)

    for (const scene of extensionScenes) {
      expect(scene.content.travelGuide?.lastVerified).toBe('2026-05-02')
      expect(scene.content.travelGuide?.sourceUrls.length).toBeGreaterThan(0)
    }

    for (const scene of mainlineScenes) {
      expect(scene.content.travelGuide).toBeUndefined()
    }
  })

  it('rejects duplicate scene ids', () => {
    expect(() =>
      parseSceneGraph({
        project: {
          id: 'demo',
          title: 'Demo',
          version: '1.0.0',
          description: 'Demo graph',
        },
        scenes: [
          {
            id: 'same',
            title: 'A',
            type: 'mainline',
            mainlineIndex: 1,
            path: ['Demo'],
            summary: 'Summary',
            corePoint: 'Core point',
            visual: {
              background: '/a.webp',
              safeZones: [],
              visualIntent: 'Intent',
            },
            content: {
              audienceTitle: 'A',
              audienceSummary: 'Summary',
              presenterNotes: 'Notes',
              talkingPoints: ['Point'],
            },
            hotspots: [],
            navigation: {
              recommendedNextIds: [],
            },
            transition: {
              enter: 'fade',
              exit: 'fade',
            },
            metadata: {
              status: 'draft',
              version: '1.0.0',
            },
          },
          {
            id: 'same',
            title: 'B',
            type: 'mainline',
            mainlineIndex: 2,
            path: ['Demo'],
            summary: 'Summary',
            corePoint: 'Core point',
            visual: {
              background: '/b.webp',
              safeZones: [],
              visualIntent: 'Intent',
            },
            content: {
              audienceTitle: 'B',
              audienceSummary: 'Summary',
              presenterNotes: 'Notes',
              talkingPoints: ['Point'],
            },
            hotspots: [],
            navigation: {
              recommendedNextIds: [],
            },
            transition: {
              enter: 'fade',
              exit: 'fade',
            },
            metadata: {
              status: 'draft',
              version: '1.0.0',
            },
          },
        ],
      }),
    ).toThrow('Duplicate scene id')
  })

  it('rejects parentAnchor sourceHotspotId values that do not exist in the parent scene', () => {
    expect(() =>
      parseSceneGraph({
        project: {
          id: 'demo',
          title: 'Demo',
          version: '1.0.0',
          description: 'Demo graph',
        },
        scenes: [
          {
            id: 'parent',
            title: 'Parent',
            type: 'mainline',
            mainlineIndex: 1,
            path: ['Demo'],
            summary: 'Summary',
            corePoint: 'Core point',
            visual: {
              background: '/parent.webp',
              safeZones: [],
              visualIntent: 'Intent',
            },
            content: {
              audienceTitle: 'Parent',
              audienceSummary: 'Summary',
              presenterNotes: 'Notes',
              talkingPoints: ['Point'],
            },
            hotspots: [
              {
                id: 'real-hotspot',
                label: 'Hotspot',
                targetSceneId: 'child',
                shape: 'ellipse',
                ellipse: { cx: 0.5, cy: 0.5, rx: 0.1, ry: 0.1 },
                tooltip: 'Tooltip',
              },
            ],
            navigation: {
              recommendedNextIds: [],
            },
            transition: {
              enter: 'fade',
              exit: 'fade',
            },
            metadata: {
              status: 'draft',
              version: '1.0.0',
            },
          },
          {
            id: 'child',
            title: 'Child',
            type: 'extension',
            parentSceneId: 'parent',
            path: ['Demo', 'Child'],
            summary: 'Summary',
            corePoint: 'Core point',
            visual: {
              background: '/child.webp',
              safeZones: [],
              visualIntent: 'Intent',
            },
            content: {
              audienceTitle: 'Child',
              audienceSummary: 'Summary',
              presenterNotes: 'Notes',
              talkingPoints: ['Point'],
              travelGuide: {
                status: 'official-reference',
                lastVerified: '2026-05-02',
                sourceUrls: ['https://example.com/child'],
              },
            },
            hotspots: [],
            navigation: {
              primaryReturnId: 'parent',
              recommendedNextIds: [],
            },
            transition: {
              enter: 'fade',
              exit: 'fade',
            },
            parentAnchor: {
              sourceHotspotId: 'missing-hotspot',
              parentAnchorDescription: 'Anchor',
              visualContinuityRequirements: ['Keep continuity'],
              childExpansionPlan: ['Expand detail'],
              imageReferencePlan: {
                useAnchorCrop: true,
                cropPath: '/assets/anchor-crops/parent/missing-hotspot.png',
              },
            },
            metadata: {
              status: 'draft',
              version: '1.0.0',
            },
          },
        ],
      }),
    ).toThrow('parentAnchor sourceHotspotId not found')
  })

  it('rejects extension scenes without travelGuide', () => {
    expect(() =>
      parseSceneGraph({
        project: {
          id: 'demo',
          title: 'Demo',
          version: '1.0.0',
          description: 'Demo graph',
        },
        scenes: [
          {
            id: 'parent',
            title: 'Parent',
            type: 'mainline',
            mainlineIndex: 1,
            path: ['Demo'],
            summary: 'Summary',
            corePoint: 'Core point',
            visual: {
              background: '/parent.webp',
              safeZones: [],
              visualIntent: 'Intent',
            },
            content: {
              audienceTitle: 'Parent',
              audienceSummary: 'Summary',
              presenterNotes: 'Notes',
              talkingPoints: ['Point'],
            },
            hotspots: [],
            navigation: {
              recommendedNextIds: ['child'],
            },
            transition: {
              enter: 'fade',
              exit: 'fade',
            },
            metadata: {
              status: 'reviewed',
              version: '1.0.0',
            },
          },
          {
            id: 'child',
            title: 'Child',
            type: 'extension',
            parentSceneId: 'parent',
            path: ['Demo', 'Child'],
            summary: 'Summary',
            corePoint: 'Core point',
            visual: {
              background: '/child.webp',
              safeZones: [],
              visualIntent: 'Intent',
            },
            content: {
              audienceTitle: 'Child',
              audienceSummary: 'Summary',
              presenterNotes: 'Notes',
              talkingPoints: ['Point'],
            },
            hotspots: [],
            navigation: {
              primaryReturnId: 'parent',
              recommendedNextIds: [],
            },
            transition: {
              enter: 'fade',
              exit: 'fade',
            },
            metadata: {
              status: 'reviewed',
              version: '1.0.0',
            },
          },
        ],
      }),
    ).toThrow('Extension scene missing travelGuide')
  })
})
