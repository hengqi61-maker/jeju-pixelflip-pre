import { useEffect } from 'react'

import { sceneGraph } from '../data/sceneGraph'
import { useNavigationStore } from '../state/navigationStore'
import { getSceneIdFromSearch } from '../state/sceneUrlState'
import { Breadcrumb } from './Breadcrumb'
import { ContentPanel } from './ContentPanel'
import { HotspotOverlay } from './HotspotOverlay'
import { NavigationControls } from './NavigationControls'
import { PresenterPanel } from './PresenterPanel'
import { SceneBackground } from './SceneBackground'
import { TransitionLayer } from './TransitionLayer'

const scenesById = new Map(sceneGraph.scenes.map((scene) => [scene.id, scene]))

export function ScenePlayer() {
  const currentSceneId = useNavigationStore((state) => state.currentSceneId)
  const historyStack = useNavigationStore((state) => state.historyStack)
  const visitedSceneIds = useNavigationStore((state) => state.visitedSceneIds)
  const mode = useNavigationStore((state) => state.mode)
  const isTransitioning = useNavigationStore((state) => state.isTransitioning)
  const goBack = useNavigationStore((state) => state.goBack)
  const goToOverview = useNavigationStore((state) => state.goToOverview)
  const goToNextMainline = useNavigationStore((state) => state.goToNextMainline)
  const goToPreviousMainline = useNavigationStore(
    (state) => state.goToPreviousMainline,
  )
  const applySceneFromUrl = useNavigationStore((state) => state.applySceneFromUrl)
  const toggleMode = useNavigationStore((state) => state.toggleMode)

  useEffect(() => {
    const handlePopState = () => {
      applySceneFromUrl(getSceneIdFromSearch(window.location.search))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [applySceneFromUrl])

  const currentScene = scenesById.get(currentSceneId)
  if (!currentScene) {
    return <p>Scene not found.</p>
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <span className="app-title-kicker">Precomputed Visual Browser</span>
          <h1>Jeju PixelFlip Pre</h1>
        </div>
        <p className="app-header-copy">
          Phase-one runtime skeleton with validated scene graph, navigation
          state, hotspot overlay, and presenter mode.
        </p>
      </header>

      <section className="scene-layout">
        <div className="scene-column">
          <div className="scene-frame">
            <TransitionLayer sceneId={currentScene.id}>
              <SceneBackground scene={currentScene} />
              <HotspotOverlay scene={currentScene} />
            </TransitionLayer>
            <Breadcrumb scene={currentScene} />
            <ContentPanel scene={currentScene} />
          </div>

          <NavigationControls
            scene={currentScene}
            canGoBack={historyStack.length > 0}
            onBack={goBack}
            onOverview={goToOverview}
            onNextMainline={goToNextMainline}
            onPreviousMainline={goToPreviousMainline}
            onToggleMode={toggleMode}
            modeLabel={mode === 'audience' ? 'Presenter View' : 'Audience View'}
            disabled={isTransitioning}
          />
        </div>

        {mode === 'presenter' ? (
          <PresenterPanel
            scene={currentScene}
            visitedCount={visitedSceneIds.length}
            historyStack={historyStack}
          />
        ) : null}
      </section>
    </main>
  )
}
