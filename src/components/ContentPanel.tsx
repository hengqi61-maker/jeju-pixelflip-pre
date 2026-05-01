import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

import type { SceneNode } from '../types/scene'

type ContentPanelProps = {
  scene: SceneNode
}

export function ContentPanel({ scene }: ContentPanelProps) {
  const contentSafeZone = scene.visual.safeZones.find(
    (safeZone) => safeZone.purpose === 'content-panel',
  )
  const style = contentSafeZone
    ? ({
        left: `${contentSafeZone.x * 100}%`,
        top: `${contentSafeZone.y * 100}%`,
        right: 'auto',
        width: `${contentSafeZone.w * 100}%`,
        maxHeight: `${contentSafeZone.h * 100}%`,
      } satisfies CSSProperties)
    : undefined

  return (
    <motion.div
      key={scene.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <details className="content-panel" style={style}>
        <summary className="content-panel-summary-trigger">
          <span>
            {scene.type === 'mainline'
              ? `Mainline ${scene.mainlineIndex}`
              : 'Prepared Branch'}
          </span>
          <strong>{scene.content.audienceTitle}</strong>
        </summary>

        <div className="content-panel-kicker">
          {scene.type === 'mainline'
            ? `Mainline ${scene.mainlineIndex}`
            : 'Prepared Branch'}
        </div>
        <h1>{scene.content.audienceTitle}</h1>
        <p className="content-panel-summary">{scene.content.audienceSummary}</p>

        <div className="content-panel-core">
          <h2>Core Point</h2>
          <p>{scene.corePoint}</p>
        </div>
      </details>
    </motion.div>
  )
}
