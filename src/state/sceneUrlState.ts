export function resolveInitialSceneId(
  search: string,
  validSceneIds: Set<string>,
  fallbackSceneId: string,
) {
  const params = new URLSearchParams(search)
  const sceneId = params.get('scene')

  if (sceneId && validSceneIds.has(sceneId)) {
    return sceneId
  }

  return fallbackSceneId
}

export function getSceneIdFromSearch(search: string) {
  const params = new URLSearchParams(search)
  return params.get('scene')
}

export function syncSceneIdToUrl(
  sceneId: string,
  mode: 'push' | 'replace' = 'replace',
) {
  if (typeof window === 'undefined') {
    return
  }

  const url = new URL(window.location.href)
  url.searchParams.set('scene', sceneId)

  if (mode === 'push') {
    window.history.pushState({}, '', url)
    return
  }

  window.history.replaceState({}, '', url)
}

export function isQaModeEnabled(search: string) {
  const params = new URLSearchParams(search)
  return params.get('qa') === '1'
}
