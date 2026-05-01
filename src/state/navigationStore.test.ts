import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const originalWindow = globalThis.window

function installMockWindow(url: string) {
  let currentUrl = new URL(url)
  const pushedUrls: string[] = []
  const replacedUrls: string[] = []
  const mockWindow = {
    location: currentUrl,
    history: {
      pushState: (_state: unknown, _title: string, url: string | URL | null) => {
        currentUrl = new URL(String(url))
        mockWindow.location = currentUrl
        pushedUrls.push(currentUrl.href)
      },
      replaceState: (
        _state: unknown,
        _title: string,
        url: string | URL | null,
      ) => {
        currentUrl = new URL(String(url))
        mockWindow.location = currentUrl
        replacedUrls.push(currentUrl.href)
      },
    },
  }

  Object.defineProperty(globalThis, 'window', {
    value: mockWindow,
    configurable: true,
  })

  return {
    get currentUrl() {
      return currentUrl
    },
    pushedUrls,
    replacedUrls,
  }
}

describe('navigationStore', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    if (originalWindow) {
      Object.defineProperty(globalThis, 'window', {
        value: originalWindow,
        configurable: true,
      })
      return
    }

    Reflect.deleteProperty(globalThis, 'window')
  })

  it('pushes a child scene URL when committed after hotspot navigation', async () => {
    const mockWindow = installMockWindow(
      'http://localhost:5173/?scene=core-sight-map&qa=1',
    )
    const { useNavigationStore } = await import('./navigationStore')

    useNavigationStore.getState().navigateTo('ext-seongsan', {
      sourceSceneId: 'core-sight-map',
      hotspotId: 'seongsan',
      returnTargetId: 'core-sight-map',
    })
    useNavigationStore.getState().commitPendingNavigation()

    expect(useNavigationStore.getState().currentSceneId).toBe('ext-seongsan')
    expect(mockWindow.currentUrl.searchParams.get('scene')).toBe('ext-seongsan')
    expect(mockWindow.currentUrl.searchParams.get('qa')).toBe('1')
    expect(mockWindow.pushedUrls).toHaveLength(1)
  })

  it('applies browser popstate scene changes to the store and clears transitions', async () => {
    installMockWindow('http://localhost:5173/?scene=ext-seongsan&qa=1')
    const { useNavigationStore } = await import('./navigationStore')

    useNavigationStore.getState().navigateTo('ext-udo')
    useNavigationStore.getState().applySceneFromUrl('core-sight-map')

    const state = useNavigationStore.getState()
    expect(state.currentSceneId).toBe('core-sight-map')
    expect(state.isTransitioning).toBe(false)
    expect(state.pendingSceneId).toBeUndefined()
    expect(state.activeHotspotId).toBeUndefined()
  })

  it('restores app-level Back history when browser forward enters an extension', async () => {
    installMockWindow('http://localhost:5173/?scene=core-sight-map&qa=1')
    const { useNavigationStore } = await import('./navigationStore')

    useNavigationStore.getState().applySceneFromUrl('ext-seongsan')

    const state = useNavigationStore.getState()
    expect(state.currentSceneId).toBe('ext-seongsan')
    expect(state.historyStack).toEqual(['core-sight-map'])
  })

  it('replaces the URL for app-level Back without dropping qa mode', async () => {
    const mockWindow = installMockWindow(
      'http://localhost:5173/?scene=core-sight-map&qa=1',
    )
    const { useNavigationStore } = await import('./navigationStore')

    useNavigationStore.getState().navigateTo('ext-seongsan', {
      sourceSceneId: 'core-sight-map',
      returnTargetId: 'core-sight-map',
    })
    useNavigationStore.getState().commitPendingNavigation()
    useNavigationStore.getState().goBack()
    useNavigationStore.getState().commitPendingNavigation()

    expect(useNavigationStore.getState().currentSceneId).toBe('core-sight-map')
    expect(mockWindow.currentUrl.searchParams.get('scene')).toBe(
      'core-sight-map',
    )
    expect(mockWindow.currentUrl.searchParams.get('qa')).toBe('1')
    expect(mockWindow.replacedUrls).toHaveLength(1)
  })
})
