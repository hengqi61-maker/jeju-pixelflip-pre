import type { SceneNode } from '../types/scene'

type NavigationControlsProps = {
  scene: SceneNode
  canGoBack: boolean
  onBack: () => void
  onOverview: () => void
  onNextMainline: () => void
  onPreviousMainline: () => void
  onToggleMode: () => void
  modeLabel: string
  disabled?: boolean
}

export function NavigationControls({
  scene,
  canGoBack,
  onBack,
  onOverview,
  onNextMainline,
  onPreviousMainline,
  onToggleMode,
  modeLabel,
  disabled = false,
}: NavigationControlsProps) {
  return (
    <div className="navigation-controls">
      <button type="button" onClick={onOverview} disabled={disabled}>
        Overview
      </button>
      <button type="button" onClick={onBack} disabled={disabled || !canGoBack}>
        Back
      </button>
      <button
        type="button"
        onClick={onPreviousMainline}
        disabled={disabled || !scene.navigation.previousMainlineId}
      >
        Previous
      </button>
      <button
        type="button"
        onClick={onNextMainline}
        disabled={disabled || !scene.navigation.nextMainlineId}
      >
        Next
      </button>
      <button type="button" onClick={onToggleMode} disabled={disabled}>
        {modeLabel}
      </button>
    </div>
  )
}
