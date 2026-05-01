import { useState, type KeyboardEvent } from 'react'

import { isQaModeEnabled } from '../state/sceneUrlState'
import { useNavigationStore } from '../state/navigationStore'
import type { Hotspot, SceneNode } from '../types/scene'
import { getHotspotCenter, pointsToSvg } from '../utils/hotspotGeometry'

type HotspotOverlayProps = {
  scene: SceneNode
}

export function HotspotOverlay({ scene }: HotspotOverlayProps) {
  const navigateTo = useNavigationStore((state) => state.navigateTo)
  const setActiveHotspot = useNavigationStore((state) => state.setActiveHotspot)
  const isTransitioning = useNavigationStore((state) => state.isTransitioning)
  const mode = useNavigationStore((state) => state.mode)
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string>()
  const shouldShowQaHotspots =
    typeof window !== 'undefined' &&
    isQaModeEnabled(window.location.search) &&
    mode === 'audience'

  const hoveredHotspot = scene.hotspots.find(
    (hotspot) => hotspot.id === hoveredHotspotId,
  )

  return (
    <div className="hotspot-layer">
      <svg
        viewBox="0 0 100 100"
        className={`hotspot-svg ${shouldShowQaHotspots ? 'is-qa-visible' : ''}`}
        preserveAspectRatio="none"
        aria-label={`${scene.title} hotspot overlay`}
      >
        {scene.hotspots.map((hotspot) => {
          return (
            <g key={hotspot.id}>
              {renderHotspotShape({
                hotspot,
                isHovered: hoveredHotspotId === hotspot.id,
                onEnter: () => {
                  setHoveredHotspotId(hotspot.id)
                  setActiveHotspot(hotspot.id)
                },
                onLeave: () => {
                  setHoveredHotspotId(undefined)
                  setActiveHotspot(undefined)
                },
                onActivate: () =>
                  navigateTo(hotspot.targetSceneId, {
                    sourceSceneId: scene.id,
                    hotspotId: hotspot.id,
                    returnTargetId: scene.id,
                    transitionHint: hotspot.transitionHint,
                  }),
                isDisabled: isTransitioning,
              })}
            </g>
          )
        })}
      </svg>

      {hoveredHotspot ? <HotspotTooltip hotspot={hoveredHotspot} /> : null}
    </div>
  )
}

function renderHotspotShape({
  hotspot,
  isHovered,
  onEnter,
  onLeave,
  onActivate,
  isDisabled,
}: {
  hotspot: Hotspot
  isHovered: boolean
  onEnter: () => void
  onLeave: () => void
  onActivate: () => void
  isDisabled: boolean
}) {
  const sharedProps = {
    className: `hotspot-shape hotspot-${hotspot.hoverStyle ?? 'glow'} ${
      isHovered ? 'is-hovered' : ''
    } ${isDisabled ? 'is-disabled' : ''}`,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onClick: () => {
      if (isDisabled) {
        return
      }

      onActivate()
    },
    onKeyDown: (event: KeyboardEvent<SVGElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (isDisabled) {
          return
        }

        onActivate()
      }
    },
    role: 'button' as const,
    tabIndex: isDisabled ? -1 : 0,
    'aria-label': hotspot.label,
    'aria-disabled': isDisabled,
  }

  if (hotspot.shape === 'rect') {
    return (
      <rect
        {...sharedProps}
        x={hotspot.rect.x * 100}
        y={hotspot.rect.y * 100}
        width={hotspot.rect.w * 100}
        height={hotspot.rect.h * 100}
        rx="2"
      />
    )
  }

  if (hotspot.shape === 'ellipse') {
    return (
      <ellipse
        {...sharedProps}
        cx={hotspot.ellipse.cx * 100}
        cy={hotspot.ellipse.cy * 100}
        rx={hotspot.ellipse.rx * 100}
        ry={hotspot.ellipse.ry * 100}
      />
    )
  }

  return <polygon {...sharedProps} points={pointsToSvg(hotspot.points)} />
}

function HotspotTooltip({ hotspot }: { hotspot: Hotspot }) {
  const center = getHotspotCenter(hotspot)

  return (
    <div
      className="hotspot-tooltip"
      style={{
        left: `${center.x * 100}%`,
        top: `${Math.max(10, center.y * 100 - 9)}%`,
      }}
    >
      <strong>{hotspot.label}</strong>
      <span>{hotspot.tooltip}</span>
    </div>
  )
}
