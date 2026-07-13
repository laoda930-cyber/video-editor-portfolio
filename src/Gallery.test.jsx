import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import App from './App'

describe('reference-style video portfolio', () => {
  it('renders the approved four-part information structure', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: '主导航' })
    for (const label of ['首页', '项目介绍', '作品集', '关于我']) {
      expect(nav).toContainElement(screen.getByRole('link', { name: label }))
    }
    for (const heading of ['A Curated Portfolio of Creative Work by Li Xinxia', '我把想法变成 可以被看见、 被体验的内容。', '精选作品', '让下一段画面，从这里开始。']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }
    expect(screen.queryByText('个人优势')).not.toBeInTheDocument()
    expect(screen.queryByText('项目数据')).not.toBeInTheDocument()
  })

  it('renders four independent scene layers in depth order', () => {
    render(<App />)
    const layers = screen.getAllByTestId('scene-layer')
    expect(layers).toHaveLength(4)
    expect(layers.map((layer) => layer.dataset.layer)).toEqual(['background', 'subject', 'midground', 'foreground'])
  })

  it('moves the active pill when a section link is selected', () => {
    render(<App />)
    const projectLink = screen.getByRole('link', { name: '项目介绍' })
    fireEvent.click(projectLink)
    expect(projectLink).toHaveClass('is-active')
    expect(screen.getByRole('link', { name: '首页' })).not.toHaveClass('is-active')
  })

  it('updates the shared parallax value when the page scrolls', async () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 240 })
    render(<App />)
    fireEvent.scroll(window)
    await waitFor(() => expect(document.documentElement.style.getPropertyValue('--scroll-y')).toBe('240px'))
  })

  it('shows pending feedback for placeholder videos', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: '播放 视频作品 01' })[0])
    expect(screen.getByRole('status')).toHaveTextContent('视频待上传')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('keeps the four-layer layout accessible and motion-safe', () => {
    const css = readFileSync(`${process.cwd()}/src/gallery.css`, 'utf8')
    expect(css).toContain('color-scheme: light')
    expect(css).toContain('max-width: 1700px')
    expect(css).toContain('.scene-layer--background')
    expect(css).toContain('.scene-layer--foreground')
    expect(css).toContain('position:fixed')
    expect(css).toContain('calc(var(--scroll-y) * -0.07)')
    expect(css).toContain(':focus-visible')
    expect(css).toContain('prefers-reduced-motion')
  })
})
