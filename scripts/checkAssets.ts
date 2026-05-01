import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { sceneGraph } from '../src/data/sceneGraph.ts'

type ManifestStatus = 'placeholder' | 'draft' | 'reviewed'

type AssetManifest = {
  sceneId?: unknown
  status?: unknown
  layers?: unknown
}

type AssetLayerName = 'background' | 'foreground' | 'ambient' | 'thumbnail'

type Issue = {
  sceneId: string
  message: string
}

const optionalLayerNames: AssetLayerName[] = [
  'foreground',
  'ambient',
  'thumbnail',
]

const allLayerNames: AssetLayerName[] = ['background', ...optionalLayerNames]

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicRoot = join(repoRoot, 'public')
const scenesRoot = join(publicRoot, 'assets', 'scenes')

const missingDirectories: Issue[] = []
const missingManifests: Issue[] = []
const missingRequiredBackgrounds: Issue[] = []
const optionalMissingLayers: Issue[] = []
const manifestMismatches: Issue[] = []
const warnings: Issue[] = []

for (const scene of sceneGraph.scenes) {
  const sceneDir = join(scenesRoot, scene.id)
  const manifestPath = join(sceneDir, 'manifest.json')

  if (!existsSync(sceneDir)) {
    missingDirectories.push({
      sceneId: scene.id,
      message: formatPath(sceneDir),
    })
    continue
  }

  if (!existsSync(manifestPath)) {
    missingManifests.push({
      sceneId: scene.id,
      message: formatPath(manifestPath),
    })
    continue
  }

  const manifest = readManifest(scene.id, manifestPath)
  if (!manifest) {
    continue
  }

  const status = readManifestStatus(scene.id, manifest)

  validateManifestSceneId(scene.id, manifest)
  validateManifestLayers(scene.id, manifest)
  validateManifestLayerMatches(scene.id, manifest, scene.visual)

  const sceneVisualLayers: Partial<Record<AssetLayerName, string>> = {
    background: scene.visual.background,
    foreground: scene.visual.foreground,
    ambient: scene.visual.ambient,
    thumbnail: scene.visual.thumbnail,
  }

  for (const layerName of allLayerNames) {
    const manifestLayerPath = getManifestLayerPath(manifest, layerName)
    const sceneLayerPath = sceneVisualLayers[layerName]

    if (manifestLayerPath) {
      validateLayerFile(scene.id, layerName, manifestLayerPath, status)
    }

    if (sceneLayerPath && sceneLayerPath !== manifestLayerPath) {
      validateLayerFile(scene.id, layerName, sceneLayerPath, status)
    }
  }
}

printSummary()

const failed =
  missingDirectories.length > 0 ||
  missingManifests.length > 0 ||
  missingRequiredBackgrounds.length > 0 ||
  manifestMismatches.length > 0

process.exitCode = failed ? 1 : 0

function readManifest(sceneId: string, manifestPath: string) {
  try {
    return JSON.parse(readFileSync(manifestPath, 'utf8')) as AssetManifest
  } catch (error) {
    manifestMismatches.push({
      sceneId,
      message: `Invalid JSON in ${formatPath(manifestPath)}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    })
    return undefined
  }
}

function readManifestStatus(sceneId: string, manifest: AssetManifest) {
  if (
    manifest.status === 'placeholder' ||
    manifest.status === 'draft' ||
    manifest.status === 'reviewed'
  ) {
    return manifest.status
  }

  manifestMismatches.push({
    sceneId,
    message: `Invalid manifest status: ${String(manifest.status)}`,
  })
  return 'placeholder'
}

function validateManifestSceneId(sceneId: string, manifest: AssetManifest) {
  if (manifest.sceneId !== sceneId) {
    manifestMismatches.push({
      sceneId,
      message: `manifest.sceneId is ${String(manifest.sceneId)}, expected ${sceneId}`,
    })
  }
}

function validateManifestLayers(sceneId: string, manifest: AssetManifest) {
  if (!manifest.layers || typeof manifest.layers !== 'object') {
    manifestMismatches.push({
      sceneId,
      message: 'manifest.layers is missing or invalid',
    })
  }
}

function validateManifestLayerMatches(
  sceneId: string,
  manifest: AssetManifest,
  visual: {
    background: string
    foreground?: string
    ambient?: string
    thumbnail?: string
  },
) {
  for (const layerName of allLayerNames) {
    const manifestLayerPath = getManifestLayerPath(manifest, layerName)
    const sceneLayerPath = visual[layerName]

    if (
      manifestLayerPath &&
      sceneLayerPath &&
      manifestLayerPath !== sceneLayerPath
    ) {
      manifestMismatches.push({
        sceneId,
        message: `${layerName} path mismatch: manifest=${manifestLayerPath}, sceneGraph=${sceneLayerPath}`,
      })
    }
  }
}

function getManifestLayerPath(
  manifest: AssetManifest,
  layerName: AssetLayerName,
) {
  if (!manifest.layers || typeof manifest.layers !== 'object') {
    return undefined
  }

  const value = (manifest.layers as Record<string, unknown>)[layerName]
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

function validateLayerFile(
  sceneId: string,
  layerName: AssetLayerName,
  assetPath: string,
  status: ManifestStatus,
) {
  const absolutePath = resolvePublicAssetPath(assetPath)
  if (existsSync(absolutePath)) {
    return
  }

  if (layerName === 'background') {
    if (status === 'reviewed') {
      missingRequiredBackgrounds.push({
        sceneId,
        message: assetPath,
      })
    } else {
      warnings.push({
        sceneId,
        message: `${status} scene missing background: ${assetPath}`,
      })
    }
    return
  }

  optionalMissingLayers.push({
    sceneId,
    message: `${layerName}: ${assetPath}`,
  })
}

function resolvePublicAssetPath(assetPath: string) {
  const normalizedPath = assetPath.startsWith('/')
    ? assetPath.slice(1)
    : assetPath

  return join(publicRoot, normalizedPath)
}

function printSummary() {
  printIssueGroup('Missing directories', missingDirectories)
  printIssueGroup('Missing manifests', missingManifests)
  printIssueGroup('Missing required backgrounds', missingRequiredBackgrounds)
  printIssueGroup('Optional missing layers', optionalMissingLayers)
  printIssueGroup('Manifest mismatches', manifestMismatches)
  printIssueGroup('Warnings', warnings)

  const failed =
    missingDirectories.length > 0 ||
    missingManifests.length > 0 ||
    missingRequiredBackgrounds.length > 0 ||
    manifestMismatches.length > 0

  console.log('')
  console.log('Asset check summary')
  console.log(`total scenes: ${sceneGraph.scenes.length}`)
  console.log(`missing directories: ${missingDirectories.length}`)
  console.log(`missing manifests: ${missingManifests.length}`)
  console.log(`missing required backgrounds: ${missingRequiredBackgrounds.length}`)
  console.log(`optional missing layers: ${optionalMissingLayers.length}`)
  console.log(`manifest mismatches: ${manifestMismatches.length}`)
  console.log(`warnings: ${warnings.length}`)
  console.log(`final status: ${failed ? 'FAIL' : 'PASS'}`)
}

function printIssueGroup(title: string, issues: Issue[]) {
  if (issues.length === 0) {
    return
  }

  console.log('')
  console.log(`${title}:`)
  for (const issue of issues) {
    console.log(`- ${issue.sceneId}: ${issue.message}`)
  }
}

function formatPath(path: string) {
  return relative(repoRoot, path)
}
