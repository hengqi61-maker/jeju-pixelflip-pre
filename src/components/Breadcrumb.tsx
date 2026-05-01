import type { SceneNode } from '../types/scene'

type BreadcrumbProps = {
  scene: SceneNode
}

export function Breadcrumb({ scene }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Scene path">
      {scene.path.map((part, index) => (
        <span key={`${scene.id}-${part}`}>
          {part}
          {index < scene.path.length - 1 ? (
            <span className="breadcrumb-separator"> / </span>
          ) : null}
        </span>
      ))}
    </nav>
  )
}
