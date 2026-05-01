import { useEffect, useState } from 'react'

import { useNavigationStore } from '../state/navigationStore'
import { isQaModeEnabled } from '../state/sceneUrlState'
import type { SceneNode } from '../types/scene'

type SceneBackgroundProps = {
  scene: SceneNode
}

export function SceneBackground({ scene }: SceneBackgroundProps) {
  const mode = useNavigationStore((state) => state.mode)
  const accentClass = getSceneAccentClass(scene.id)
  const backgroundStatus = useAssetLoadStatus(scene.visual.background)
  const foregroundStatus = useAssetLoadStatus(scene.visual.foreground)
  const ambientStatus = useAssetLoadStatus(scene.visual.ambient)
  const missingAssets = [
    backgroundStatus,
    foregroundStatus,
    ambientStatus,
  ].filter((status) => status.state === 'missing')
  const shouldShowQaUi =
    typeof window !== 'undefined' &&
    (mode === 'presenter' || isQaModeEnabled(window.location.search))
  const shouldShowAssetStatus =
    import.meta.env.DEV && shouldShowQaUi && missingAssets.length > 0
  const shouldShowAssetPills = import.meta.env.DEV && shouldShowQaUi
  const shouldShowVisualIntent = shouldShowQaUi

  return (
    <div className={`scene-background ${accentClass}`}>
      <FallbackSceneArt scene={scene} />

      {backgroundStatus.state === 'loaded' && scene.visual.background ? (
        <img
          className="scene-asset-layer scene-asset-background"
          src={scene.visual.background}
          alt=""
          draggable={false}
        />
      ) : null}

      {ambientStatus.state === 'loaded' && scene.visual.ambient ? (
        <img
          className="scene-asset-layer scene-asset-ambient"
          src={scene.visual.ambient}
          alt=""
          draggable={false}
        />
      ) : null}

      {foregroundStatus.state === 'loaded' && scene.visual.foreground ? (
        <img
          className="scene-asset-layer scene-asset-foreground"
          src={scene.visual.foreground}
          alt=""
          draggable={false}
        />
      ) : null}

      {shouldShowAssetPills ? (
        <div className="scene-background-ambient">
          <span className="ambient-pill">
            BG {formatAssetState(backgroundStatus.state)}
          </span>
          <span className="ambient-pill">
            FG {formatAssetState(foregroundStatus.state)}
          </span>
          <span className="ambient-pill">
            AMBIENT {formatAssetState(ambientStatus.state)}
          </span>
        </div>
      ) : null}
      {shouldShowAssetStatus ? (
        <div className="scene-asset-status" role="status">
          Missing assets:{' '}
          {missingAssets.map((asset) => asset.path).join(', ')}
        </div>
      ) : null}
      {shouldShowVisualIntent ? (
        <div className="scene-background-caption">
          <span className="visual-intent-label">Visual Intent</span>
          <p>{scene.visual.visualIntent}</p>
        </div>
      ) : null}
    </div>
  )
}

function FallbackSceneArt({ scene }: { scene: SceneNode }) {
  return (
    <div className="scene-fallback-art" aria-hidden="true">
      <div className="scene-background-grid" />
      <div className="scene-background-orb scene-background-orb-left" />
      <div className="scene-background-orb scene-background-orb-right" />
      <div className="scene-background-ridge scene-background-ridge-back" />
      <div className="scene-background-ridge scene-background-ridge-front" />
      <div className="scene-background-coast" />
      <span className="scene-fallback-label">{scene.id}</span>
    </div>
  )
}

type AssetLoadStatus = {
  path?: string
  state: 'idle' | 'loading' | 'loaded' | 'missing'
}

function useAssetLoadStatus(path?: string): AssetLoadStatus {
  const [status, setStatus] = useState<AssetLoadStatus>({
    state: 'idle',
  })

  useEffect(() => {
    if (!path) {
      return
    }

    let isCurrent = true
    const image = new Image()

    image.onload = () => {
      if (isCurrent) {
        setStatus({ path, state: 'loaded' })
      }
    }

    image.onerror = () => {
      if (isCurrent) {
        setStatus({ path, state: 'missing' })
      }
    }

    image.src = path

    return () => {
      isCurrent = false
    }
  }, [path])

  if (!path) {
    return { path, state: 'idle' }
  }

  if (status.path !== path) {
    return { path, state: 'loading' }
  }

  return status
}

function formatAssetState(state: AssetLoadStatus['state']) {
  if (state === 'loaded') {
    return 'loaded'
  }

  if (state === 'missing') {
    return 'fallback'
  }

  return state
}

function getSceneAccentClass(sceneId: string) {
  if (sceneId.includes('route')) {
    return 'scene-accent-routes'
  }

  if (sceneId.includes('market') || sceneId.includes('food')) {
    return 'scene-accent-urban'
  }

  if (sceneId.includes('hallasan')) {
    return 'scene-accent-mountain'
  }

  if (sceneId.includes('season') || sceneId.includes('advice')) {
    return 'scene-accent-season'
  }

  return 'scene-accent-coast'
}
