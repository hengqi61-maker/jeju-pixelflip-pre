import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion'
import type { ReactNode } from 'react'

import { useNavigationStore } from '../state/navigationStore'

type TransitionLayerProps = {
  sceneId: string
  children: ReactNode
}

export function TransitionLayer({ sceneId, children }: TransitionLayerProps) {
  const shouldReduceMotion = useReducedMotion() ?? false
  const isTransitioning = useNavigationStore((state) => state.isTransitioning)
  const pendingSceneId = useNavigationStore((state) => state.pendingSceneId)
  const transitionType = useNavigationStore((state) => state.transitionType)
  const transitionFocus = useNavigationStore((state) => state.transitionFocus)
  const transitionScale = useNavigationStore((state) => state.transitionScale)
  const transitionDuration = useNavigationStore(
    (state) => state.transitionDuration,
  )
  const transitionDirection = useNavigationStore(
    (state) => state.transitionDirection,
  )
  const commitPendingNavigation = useNavigationStore(
    (state) => state.commitPendingNavigation,
  )

  const seconds = (shouldReduceMotion ? 180 : transitionDuration) / 1000
  const origin = `${transitionFocus[0] * 100}% ${transitionFocus[1] * 100}%`
  const driftX = (0.5 - transitionFocus[0]) * 80
  const driftY = (0.5 - transitionFocus[1]) * 54
  const exitTarget = getExitTarget({
    isReducedMotion: shouldReduceMotion,
    driftX,
    driftY,
    transitionDirection,
    transitionScale,
    transitionType,
  })

  return (
    <motion.div
      key={sceneId}
      className="transition-layer"
      style={{ transformOrigin: origin }}
      initial={getEntryInitial({
        isReducedMotion: shouldReduceMotion,
        transitionDirection,
      })}
      animate={isTransitioning ? exitTarget : { opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: seconds, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (isTransitioning && pendingSceneId) {
          commitPendingNavigation()
        }
      }}
    >
      {children}
    </motion.div>
  )
}

function getEntryInitial({
  isReducedMotion,
  transitionDirection,
}: {
  isReducedMotion: boolean
  transitionDirection: string
}): TargetAndTransition {
  if (isReducedMotion) {
    return { opacity: 0 }
  }

  if (transitionDirection === 'return') {
    return { opacity: 0, scale: 1.04 }
  }

  return { opacity: 0, scale: 0.96 }
}

function getExitTarget({
  isReducedMotion,
  driftX,
  driftY,
  transitionDirection,
  transitionScale,
  transitionType,
}: {
  isReducedMotion: boolean
  driftX: number
  driftY: number
  transitionDirection: string
  transitionScale: number
  transitionType: string
}): TargetAndTransition {
  if (isReducedMotion || transitionType === 'soft-crossfade') {
    return { opacity: 0, scale: 1 }
  }

  if (transitionType === 'zoom-in-to-hotspot') {
    return { opacity: 0.76, scale: transitionScale, x: driftX, y: driftY }
  }

  if (
    transitionType === 'zoom-out-to-parent' ||
    transitionDirection === 'return'
  ) {
    return { opacity: 0, scale: 1.08 }
  }

  return { opacity: 0, scale: 1 }
}
