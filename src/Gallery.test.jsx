import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import App from './App'

describe('video gallery', () => {
  it('renders featured work followed by four visible categories', () => {
    render(<App />)
    for (const heading of ['精选作品', '品牌宣传', '产品推广', '营销口播', '剧情教育']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    }
    expect(screen.getAllByTestId('work-card')).toHaveLength(12)
    expect(screen.queryByText('个人优势')).not.toBeInTheDocument()
    expect(screen.queryByText('关于我')).not.toBeInTheDocument()
  })

  it('provides direct navigation to every category', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: '作品分类' })
    expect(nav.querySelectorAll('a')).toHaveLength(4)
    expect(screen.getByRole('link', { name: '品牌宣传' })).toHaveAttribute('href', '#brand')
    expect(screen.getByRole('link', { name: '产品推广' })).toHaveAttribute('href', '#product')
  })

  it('shows pending feedback without opening an empty player', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '播放 品牌视觉叙事' }))
    expect(screen.getByRole('status')).toHaveTextContent('视频待上传')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('keeps gallery layout accessible and responsive', () => {
    const css = readFileSync(`${process.cwd()}/src/gallery.css`, 'utf8')
    expect(css).toContain('color-scheme: light')
    expect(css).toContain('max-width: 1700px')
    expect(css).toContain('aspect-ratio: 16 / 9')
    expect(css).toContain(':focus-visible')
    expect(css).toContain('prefers-reduced-motion')
  })
})
