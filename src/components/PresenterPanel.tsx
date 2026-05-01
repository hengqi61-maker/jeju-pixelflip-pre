import { sceneGraph } from '../data/sceneGraph'
import type { SceneNode } from '../types/scene'

type PresenterPanelProps = {
  scene: SceneNode
  visitedCount: number
  historyStack: string[]
}

const scenesById = new Map(sceneGraph.scenes.map((scene) => [scene.id, scene]))

export function PresenterPanel({
  scene,
  visitedCount,
  historyStack,
}: PresenterPanelProps) {
  return (
    <aside className="presenter-panel">
      <div className="presenter-panel-block">
        <span className="presenter-label">Presenter Mode</span>
        <h2>{scene.title}</h2>
        <p>{scene.content.presenterNotes}</p>
      </div>

      <div className="presenter-panel-block">
        <span className="presenter-label">Suggested Next</span>
        <ul>
          {scene.navigation.recommendedNextIds.map((sceneId) => (
            <li key={sceneId}>{scenesById.get(sceneId)?.title ?? sceneId}</li>
          ))}
        </ul>
      </div>

      <div className="presenter-panel-block presenter-metrics">
        <div>
          <strong>{visitedCount}</strong>
          <span className="presenter-label">Visited Scenes</span>
        </div>
        <div>
          <strong>{historyStack.length}</strong>
          <span className="presenter-label">History Depth</span>
        </div>
      </div>
    </aside>
  )
}
