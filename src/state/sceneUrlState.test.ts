import { afterEach, describe, expect, it } from 'vitest'

import {
  getSceneIdFromSearch,
  resolveInitialSceneId,
  syncSceneIdToUrl,
} from './sceneUrlState'

const originalWindow = globalThis.window

describe('sceneUrlState', () => {
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

  it('resolves a valid scene id from the URL query', () => {
    const sceneId = resolveInitialSceneId(
      '?scene=core-sight-map',
      new Set(['cover-overview', 'core-sight-map']),
      'cover-overview',
    )

    expect(sceneId).toBe('core-sight-map')
  })

  it('falls back when the URL query scene id is unknown', () => {
    const sceneId = resolveInitialSceneId(
      '?scene=missing-scene',
      new Set(['cover-overview', 'core-sight-map']),
      'cover-overview',
    )

    expect(sceneId).toBe('cover-overview')
  })

  it('syncs the current scene id into the URL without reloading', () => {
    let currentUrl = new URL('http://localhost:5173/?scene=cover-overview')
    const mockWindow = {
      location: currentUrl,
      history: {
        replaceState: (_state: unknown, _title: string, url: string | URL | null) => {
          currentUrl = new URL(String(url))
          mockWindow.location = currentUrl
        },
      },
    }

    Object.defineProperty(globalThis, 'window', {
      value: mockWindow,
      configurable: true,
    })

    syncSceneIdToUrl('spatial-structure')

    expect(currentUrl.searchParams.get('scene')).toBe('spatial-structure')
  })

  it('preserves unrelated query params while replacing the scene id', () => {
    let currentUrl = new URL(
      'http://localhost:5173/?scene=core-sight-map&qa=1',
    )
    const mockWindow = {
      location: currentUrl,
      history: {
        replaceState: (_state: unknown, _title: string, url: string | URL | null) => {
          currentUrl = new URL(String(url))
          mockWindow.location = currentUrl
        },
        pushState: () => {
          throw new Error('pushState should not be used')
        },
      },
    }

    Object.defineProperty(globalThis, 'window', {
      value: mockWindow,
      configurable: true,
    })

    syncSceneIdToUrl('ext-seongsan', 'replace')

    expect(currentUrl.searchParams.get('scene')).toBe('ext-seongsan')
    expect(currentUrl.searchParams.get('qa')).toBe('1')
  })

  it('can push scene ids for browser back/forward history', () => {
    let currentUrl = new URL(
      'http://localhost:5173/?scene=core-sight-map&qa=1',
    )
    const pushedUrls: string[] = []
    const mockWindow = {
      location: currentUrl,
      history: {
        replaceState: () => {
          throw new Error('replaceState should not be used')
        },
        pushState: (_state: unknown, _title: string, url: string | URL | null) => {
          currentUrl = new URL(String(url))
          mockWindow.location = currentUrl
          pushedUrls.push(currentUrl.href)
        },
      },
    }

    Object.defineProperty(globalThis, 'window', {
      value: mockWindow,
      configurable: true,
    })

    syncSceneIdToUrl('ext-seongsan', 'push')

    expect(currentUrl.searchParams.get('scene')).toBe('ext-seongsan')
    expect(currentUrl.searchParams.get('qa')).toBe('1')
    expect(pushedUrls).toHaveLength(1)
  })

  it('reads scene ids from URL search params', () => {
    expect(getSceneIdFromSearch('?scene=ext-seongsan&qa=1')).toBe(
      'ext-seongsan',
    )
    expect(getSceneIdFromSearch('?qa=1')).toBeNull()
  })
})
