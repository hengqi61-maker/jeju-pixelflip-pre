// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { sceneGraph } from '../data/sceneGraph'
import { ContentPanel } from './ContentPanel'

const scenesById = new Map(sceneGraph.scenes.map((scene) => [scene.id, scene]))

afterEach(() => cleanup())

describe('ContentPanel', () => {
  it('renders Chinese travel guide content for extension scenes', () => {
    const scene = scenesById.get('ext-seongsan')
    expect(scene).toBeDefined()

    render(<ContentPanel scene={scene!} />)

    expect(screen.getByText('Travel Guide / 实用攻略')).toBeInTheDocument()
    expect(screen.getByText('2026-05-02')).toBeInTheDocument()
    expect(screen.getByText('门票/费用')).toBeInTheDocument()
    expect(screen.getByText('出行前以官方页面为准')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '来源 1' })).toHaveAttribute(
      'href',
      'https://www.visitjeju.net/en/detail/view?contentsid=CONT_000000000500349',
    )
  })

  it('does not render an empty travel guide for mainline scenes', () => {
    const scene = scenesById.get('core-sight-map')
    expect(scene).toBeDefined()

    render(<ContentPanel scene={scene!} />)

    expect(screen.queryByText('Travel Guide / 实用攻略')).not.toBeInTheDocument()
  })
})
