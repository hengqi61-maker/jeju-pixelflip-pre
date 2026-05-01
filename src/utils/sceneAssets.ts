import type { SceneAssetManifest, SceneNode } from '../types/scene'

export const sceneAssetFileNames = {
  background: 'background.webp',
  foreground: 'foreground.png',
  ambient: 'ambient.png',
  thumbnail: 'thumbnail.webp',
  manifest: 'manifest.json',
} as const

export function getSceneAssetBasePath(sceneId: string) {
  const baseUrl = import.meta.env?.BASE_URL ?? '/'
  const basePath = baseUrl.replace(/\/$/, '')
  return `${basePath}/assets/scenes/${sceneId}`
}

export function getSceneAssetPath(
  sceneId: string,
  fileName: (typeof sceneAssetFileNames)[keyof typeof sceneAssetFileNames],
) {
  return `${getSceneAssetBasePath(sceneId)}/${fileName}`
}

export function getSceneAssetPaths(sceneId: string) {
  return {
    background: getSceneAssetPath(sceneId, sceneAssetFileNames.background),
    foreground: getSceneAssetPath(sceneId, sceneAssetFileNames.foreground),
    ambient: getSceneAssetPath(sceneId, sceneAssetFileNames.ambient),
    thumbnail: getSceneAssetPath(sceneId, sceneAssetFileNames.thumbnail),
    manifest: getSceneAssetPath(sceneId, sceneAssetFileNames.manifest),
  }
}

export function createPlaceholderSceneAssetManifest(
  scene: SceneNode,
): SceneAssetManifest {
  return {
    sceneId: scene.id,
    version: scene.metadata.version,
    status: 'placeholder',
    size: {
      master: [3840, 2160],
      display: [1920, 1080],
      thumbnail: [480, 270],
    },
    layers: {
      background: scene.visual.background,
      foreground: scene.visual.foreground,
      ambient: scene.visual.ambient,
      thumbnail: scene.visual.thumbnail,
    },
    notes:
      'Placeholder manifest. Replace layers as reviewed pixel-art scene assets become available.',
  }
}
