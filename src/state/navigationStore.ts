import { create } from 'zustand'

import { sceneGraph } from '../data/sceneGraph'
import { resolveInitialSceneId, syncSceneIdToUrl } from './sceneUrlState'
import type {
  NavigationMode,
  TransitionDirection,
  TransitionHint,
  TransitionType,
} from '../types/scene'

const overviewSceneId = 'cover-overview'

type NavigationStore = {
  currentSceneId: string
  previousSceneId?: string
  historyStack: string[]
  visitedSceneIds: string[]
  activeHotspotId?: string
  returnTargetId?: string
  mode: NavigationMode
  isTransitioning: boolean
  transitionType: TransitionType
  transitionFocus: [number, number]
  transitionScale: number
  transitionDuration: number
  transitionDirection: TransitionDirection
  pendingSceneId?: string
  navigateTo: (sceneId: string, options?: NavigateOptions) => void
  commitPendingNavigation: () => void
  goBack: () => void
  goToOverview: () => void
  goToNextMainline: () => void
  goToPreviousMainline: () => void
  applySceneFromUrl: (sceneId: string | null) => void
  toggleMode: () => void
  setActiveHotspot: (hotspotId?: string) => void
}

type NavigateOptions = {
  sourceSceneId?: string
  hotspotId?: string
  returnTargetId?: string
  transitionHint?: TransitionHint
  transitionDirection?: TransitionDirection
  replaceHistory?: boolean
  urlMode?: 'push' | 'replace'
}

type PendingNavigationState = {
  previousSceneId: string
  currentSceneId: string
  historyStack: string[]
  visitedSceneIds: string[]
  activeHotspotId?: string
  returnTargetId?: string
  urlMode: 'push' | 'replace'
}

const scenesById = new Map(sceneGraph.scenes.map((scene) => [scene.id, scene]))
const initialSceneId = resolveInitialSceneId(
  typeof window === 'undefined' ? '' : window.location.search,
  new Set(scenesById.keys()),
  overviewSceneId,
)

function uniquePush(list: string[], value: string) {
  return list.includes(value) ? list : [...list, value]
}

function normalizeTransitionHint(
  hint: TransitionHint | undefined,
  direction: TransitionDirection,
) {
  const fallbackType: TransitionType =
    direction === 'return' ? 'zoom-out-to-parent' : 'soft-crossfade'

  return {
    type: hint?.type ?? fallbackType,
    focus: hint?.focus ?? ([0.5, 0.5] as [number, number]),
    scale: hint?.scale ?? 1.55,
    duration: hint?.duration ?? 650,
  }
}

let pendingNavigationState: PendingNavigationState | undefined

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  currentSceneId: initialSceneId,
  historyStack: [],
  visitedSceneIds: [initialSceneId],
  mode: 'audience',
  isTransitioning: false,
  transitionType: 'soft-crossfade',
  transitionFocus: [0.5, 0.5],
  transitionScale: 1.55,
  transitionDuration: 650,
  transitionDirection: 'mainline',
  navigateTo: (sceneId, options) => {
    const currentSceneId = get().currentSceneId
    if (get().isTransitioning) {
      return
    }

    if (sceneId === currentSceneId) {
      return
    }

    const targetScene = scenesById.get(sceneId)
    if (!targetScene) {
      return
    }

    const direction = options?.transitionDirection ?? 'enter'
    const transition = normalizeTransitionHint(options?.transitionHint, direction)

    pendingNavigationState = {
      previousSceneId: currentSceneId,
      currentSceneId: sceneId,
      historyStack: options?.replaceHistory
        ? get().historyStack
        : [...get().historyStack, currentSceneId],
      visitedSceneIds: uniquePush(get().visitedSceneIds, sceneId),
      activeHotspotId: options?.hotspotId,
      returnTargetId:
        options?.returnTargetId ??
        options?.sourceSceneId ??
        targetScene.navigation.primaryReturnId,
      urlMode: options?.urlMode ?? 'push',
    }

    set({
      isTransitioning: true,
      transitionType: transition.type,
      transitionFocus: transition.focus,
      transitionScale: transition.scale,
      transitionDuration: transition.duration,
      transitionDirection: direction,
      pendingSceneId: sceneId,
      activeHotspotId: options?.hotspotId,
    })
  },
  commitPendingNavigation: () => {
    if (!pendingNavigationState) {
      set({
        isTransitioning: false,
        pendingSceneId: undefined,
        activeHotspotId: undefined,
      })
      return
    }

    const nextState = pendingNavigationState
    pendingNavigationState = undefined

    set({
      previousSceneId: nextState.previousSceneId,
      currentSceneId: nextState.currentSceneId,
      historyStack: nextState.historyStack,
      visitedSceneIds: nextState.visitedSceneIds,
      activeHotspotId: nextState.activeHotspotId,
      returnTargetId: nextState.returnTargetId,
      isTransitioning: false,
      pendingSceneId: undefined,
    })
    syncSceneIdToUrl(nextState.currentSceneId, nextState.urlMode)
  },
  goBack: () => {
    if (get().isTransitioning) {
      return
    }

    const historyStack = get().historyStack
    if (historyStack.length === 0) {
      return
    }

    const nextHistory = [...historyStack]
    const previousSceneId = nextHistory.pop()
    if (!previousSceneId) {
      return
    }

    const currentSceneId = get().currentSceneId
    const transition = normalizeTransitionHint(undefined, 'return')

    pendingNavigationState = {
      previousSceneId: currentSceneId,
      currentSceneId: previousSceneId,
      historyStack: nextHistory,
      visitedSceneIds: get().visitedSceneIds,
      activeHotspotId: undefined,
      returnTargetId: scenesById.get(previousSceneId)?.navigation.primaryReturnId,
      urlMode: 'replace',
    }

    set({
      isTransitioning: true,
      transitionType: transition.type,
      transitionFocus: transition.focus,
      transitionScale: 1.18,
      transitionDuration: transition.duration,
      transitionDirection: 'return',
      pendingSceneId: previousSceneId,
      activeHotspotId: undefined,
    })
  },
  goToOverview: () => {
    get().navigateTo(overviewSceneId, {
      returnTargetId: overviewSceneId,
      transitionDirection: 'return',
      transitionHint: { type: 'soft-crossfade', duration: 520 },
    })
  },
  goToNextMainline: () => {
    const currentScene = scenesById.get(get().currentSceneId)
    if (currentScene?.navigation.nextMainlineId) {
      get().navigateTo(currentScene.navigation.nextMainlineId, {
        transitionDirection: 'mainline',
        transitionHint: { type: 'soft-crossfade', duration: 520 },
      })
    }
  },
  goToPreviousMainline: () => {
    const currentScene = scenesById.get(get().currentSceneId)
    if (currentScene?.navigation.previousMainlineId) {
      get().navigateTo(currentScene.navigation.previousMainlineId, {
        transitionDirection: 'mainline',
        transitionHint: { type: 'soft-crossfade', duration: 520 },
      })
    }
  },
  applySceneFromUrl: (sceneId) => {
    if (!sceneId) {
      return
    }

    const targetSceneId = sceneId
    const targetScene = scenesById.get(targetSceneId)
    if (!targetScene) {
      return
    }

    const state = get()
    if (state.currentSceneId === targetSceneId && !state.isTransitioning) {
      return
    }

    pendingNavigationState = undefined

    const shouldRestoreParentHistory =
      targetScene.type === 'extension' &&
      state.currentSceneId === targetScene.navigation.primaryReturnId
    const historyStack =
      state.historyStack.at(-1) === targetSceneId
        ? state.historyStack.slice(0, -1)
        : shouldRestoreParentHistory
          ? [...state.historyStack, state.currentSceneId]
          : state.historyStack

    set({
      previousSceneId: state.currentSceneId,
      currentSceneId: targetSceneId,
      historyStack,
      visitedSceneIds: uniquePush(state.visitedSceneIds, targetSceneId),
      activeHotspotId: undefined,
      returnTargetId: targetScene.navigation.primaryReturnId,
      isTransitioning: false,
      pendingSceneId: undefined,
    })
  },
  toggleMode: () => {
    set((state) => ({
      mode: state.mode === 'audience' ? 'presenter' : 'audience',
    }))
  },
  setActiveHotspot: (hotspotId) => {
    set({ activeHotspotId: hotspotId })
  },
}))
