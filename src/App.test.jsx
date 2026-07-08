import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import App from './App'

describe.skip('legacy portfolio page', () => {
  it('renders the complete portfolio story and contact route', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /把节奏、情绪与故事/ })).toBeInTheDocument()
    for (const name of ['首页', '关于我', '精选作品', '个人优势', '保持联系']) {
      expect(screen.getByText(name, { selector: '[data-section-label]' })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: '1888888888@qq.com' })).toHaveAttribute('href', 'mailto:1888888888@qq.com')
  })

  it('renders resume content as structured portfolio data', () => {
    render(<App />)
    expect(screen.getAllByTestId('experience')).toHaveLength(3)
    expect(screen.getAllByTestId('work-card')).toHaveLength(3)
    expect(screen.getAllByTestId('strength-card')).toHaveLength(4)
    expect(screen.getByText((_, element) => element.tagName === 'B' && element.textContent === '90+')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByRole('navigation').querySelectorAll('a')).toHaveLength(4)
  })

  it('includes responsive and accessible visual-system safeguards', () => {
    const css = readFileSync(`${process.cwd()}/src/styles.css`, 'utf8')
    expect(css).toContain('max-width: 1700px')
    expect(css).toContain(':focus-visible')
    expect(css).toContain('prefers-reduced-motion')
  })

  it('declares a Chinese document title', () => {
    const html = readFileSync(`${process.cwd()}/index.html`, 'utf8')
    expect(html).toContain('lang="zh-CN"')
    expect(html).toContain('<title>李欣霞 · 视频剪辑师作品集</title>')
  })
})
