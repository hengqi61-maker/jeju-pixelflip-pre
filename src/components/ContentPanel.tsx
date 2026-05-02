import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'

import type { SceneNode, SceneTravelGuide } from '../types/scene'

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

        {scene.content.travelGuide ? (
          <TravelGuide guide={scene.content.travelGuide} />
        ) : null}
      </details>
    </motion.div>
  )
}

function TravelGuide({ guide }: { guide: SceneTravelGuide }) {
  const items = [
    ['门票/费用', guide.fee],
    ['预约', guide.reservation],
    ['开放/时间', guide.hours],
    ['交通/停车', guide.transport],
    ['建议时长', guide.duration],
    ['适合人群', guide.bestFor],
  ].filter((item): item is [string, string] => Boolean(item[1]))

  return (
    <section className="travel-guide" aria-label="Travel Guide 实用攻略">
      <div className="travel-guide-heading">
        <h2>Travel Guide / 实用攻略</h2>
        <span>{guide.lastVerified}</span>
      </div>

      <dl>
        {items.map(([label, value]) => (
          <div key={label} className="travel-guide-item">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      {guide.cautions?.length ? (
        <div className="travel-guide-cautions">
          <h3>注意事项</h3>
          <ul>
            {guide.cautions.map((caution) => (
              <li key={caution}>{caution}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="travel-guide-sources">
        <span>出行前以官方页面为准</span>
        {guide.sourceUrls.map((sourceUrl, index) => (
          <a
            key={sourceUrl}
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            来源 {index + 1}
          </a>
        ))}
      </div>
    </section>
  )
}
