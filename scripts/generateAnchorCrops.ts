import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { sceneGraph } from '../src/data/sceneGraph'

type CropTarget = {
  parentSceneId: string
  sourceHotspotId: string
  outputPath: string
  paddingFactor: number
}

const cropTargets: CropTarget[] = [
  {
    parentSceneId: 'spatial-structure',
    sourceHotspotId: 'hs-hallasan-structure',
    outputPath: 'public/assets/anchor-crops/spatial-structure/hs-hallasan-structure.png',
    paddingFactor: 1.9,
  },
  {
    parentSceneId: 'core-sight-map',
    sourceHotspotId: 'hs-seongsan-core',
    outputPath: 'public/assets/anchor-crops/core-sight-map/hs-seongsan-core.png',
    paddingFactor: 1.85,
  },
  {
    parentSceneId: 'core-sight-map',
    sourceHotspotId: 'hs-food-core',
    outputPath: 'public/assets/anchor-crops/core-sight-map/hs-food-core.png',
    paddingFactor: 1.75,
  },
]

function getBounds(
  hotspot: (typeof sceneGraph.scenes)[number]['hotspots'][number],
  imageWidth: number,
  imageHeight: number,
) {
  if (hotspot.shape === 'ellipse') {
    const { cx, cy, rx, ry } = hotspot.ellipse
    return {
      x: (cx - rx) * imageWidth,
      y: (cy - ry) * imageHeight,
      w: rx * 2 * imageWidth,
      h: ry * 2 * imageHeight,
    }
  }

  if (hotspot.shape === 'rect') {
    const { x, y, w, h } = hotspot.rect
    return {
      x: x * imageWidth,
      y: y * imageHeight,
      w: w * imageWidth,
      h: h * imageHeight,
    }
  }

  const xs = hotspot.points.map(([x]) => x * imageWidth)
  const ys = hotspot.points.map(([, y]) => y * imageHeight)

  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  return {
    x: minX,
    y: minY,
    w: maxX - minX,
    h: maxY - minY,
  }
}

function expandBounds(
  bounds: { x: number; y: number; w: number; h: number },
  paddingFactor: number,
  imageWidth: number,
  imageHeight: number,
) {
  const centerX = bounds.x + bounds.w / 2
  const centerY = bounds.y + bounds.h / 2
  const expandedW = bounds.w * paddingFactor
  const expandedH = bounds.h * paddingFactor

  const left = Math.max(0, Math.round(centerX - expandedW / 2))
  const top = Math.max(0, Math.round(centerY - expandedH / 2))
  const right = Math.min(imageWidth, Math.round(centerX + expandedW / 2))
  const bottom = Math.min(imageHeight, Math.round(centerY + expandedH / 2))

  return {
    left,
    top,
    width: right - left,
    height: bottom - top,
  }
}

async function main() {
  for (const target of cropTargets) {
    const parentScene = sceneGraph.scenes.find(
      (scene) => scene.id === target.parentSceneId,
    )

    if (!parentScene) {
      throw new Error(`Parent scene not found: ${target.parentSceneId}`)
    }

    const hotspot = parentScene.hotspots.find(
      (candidate) => candidate.id === target.sourceHotspotId,
    )

    if (!hotspot) {
      throw new Error(
        `Hotspot ${target.sourceHotspotId} not found in ${target.parentSceneId}`,
      )
    }

    const sourcePath = path.join(
      process.cwd(),
      'public',
      parentScene.visual.background.replace('/assets/', 'assets/'),
    )

    const image = sharp(sourcePath)
    const metadata = await image.metadata()

    if (!metadata.width || !metadata.height) {
      throw new Error(`Could not read image size for ${sourcePath}`)
    }

    const bounds = getBounds(hotspot, metadata.width, metadata.height)
    const region = expandBounds(
      bounds,
      target.paddingFactor,
      metadata.width,
      metadata.height,
    )

    await fs.mkdir(path.dirname(target.outputPath), { recursive: true })

    await image
      .extract(region)
      .png()
      .toFile(target.outputPath)

    console.log(
      `Generated anchor crop: ${target.outputPath} from ${target.parentSceneId}/${target.sourceHotspotId}`,
    )
  }
}

await main()
