import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

import { sceneGraph } from '../src/data/sceneGraph.ts'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const scenesRoot = join(repoRoot, 'public', 'assets', 'scenes')

for (const scene of sceneGraph.scenes) {
  const sceneDir = join(scenesRoot, scene.id)
  const sourcePath = join(sceneDir, 'background.webp')
  const outputPath = join(sceneDir, 'thumbnail.webp')

  await mkdir(sceneDir, { recursive: true })
  await sharp(sourcePath)
    .resize(480, 270, { fit: 'cover', position: 'center' })
    .webp({ quality: 82 })
    .toFile(outputPath)

  console.log(`thumbnail: ${scene.id}`)
}
