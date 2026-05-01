import type { Hotspot } from '../types/scene'

export type ScreenPoint = {
  x: number
  y: number
}

export function getHotspotCenter(hotspot: Hotspot): ScreenPoint {
  if (hotspot.shape === 'rect') {
    return {
      x: hotspot.rect.x + hotspot.rect.w / 2,
      y: hotspot.rect.y + hotspot.rect.h / 2,
    }
  }

  if (hotspot.shape === 'ellipse') {
    return {
      x: hotspot.ellipse.cx,
      y: hotspot.ellipse.cy,
    }
  }

  const total = hotspot.points.reduce(
    (acc, [x, y]) => {
      return { x: acc.x + x, y: acc.y + y }
    },
    { x: 0, y: 0 },
  )

  return {
    x: total.x / hotspot.points.length,
    y: total.y / hotspot.points.length,
  }
}

export function pointsToSvg(points: [number, number][]): string {
  return points.map(([x, y]) => `${x * 100},${y * 100}`).join(' ')
}
