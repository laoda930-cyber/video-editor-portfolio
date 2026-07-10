import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'

const prototypePath = `${process.cwd()}/home-nav-button-prototype/index.html`
const readPrototype = () => readFileSync(prototypePath, 'utf8')

describe('standalone first-screen dialogue and side gooey navigation prototype', () => {
  it('exists as a standalone html file in its own folder', () => {
    expect(existsSync(prototypePath)).toBe(true)
  })

  it('uses the approved static dot-grid background', () => {
    const html = readPrototype()

    expect(html).toContain('home-nav-prototype')
    expect(html).toContain('dot-grid-background')
    expect(html).toContain('data-static-dot-grid')
    expect(html).toContain('--dot-size:1.5px')
    expect(html).toContain('--dot-gap:18px')
    expect(html).toContain('radial-gradient(circle')
    expect(html).not.toContain('white-modern-background')
    expect(html).not.toContain('feTurbulence')
    expect(html).not.toContain('class="liquid-background"')
    expect(html).not.toContain('class="background-grid"')
    expect(html).not.toContain('background-bar')
    expect(html).not.toContain('nav-position-anchor')
  })

  it('renames the old top navigation into an event-driven dialogue component', () => {
    const html = readPrototype()

    expect(html).toContain('dialogue-component')
    expect(html).toContain('dialogue-copy')
    expect(html).toContain('data-dialogue-event')
    expect(html).toContain('updateDialogue')
    expect(html).not.toContain('home-nav-button')
    expect(html).not.toContain('nav-panel')
    expect(html).not.toContain('toggleNavigation')
  })

  it('rebuilds the left-center strip around a real GooeyNav-style filter and particles', () => {
    const html = readPrototype()

    expect(html).toContain('side-gooey-strip')
    expect(html).toContain('gooey-nav-container')
    expect(html).toContain('data-gooey-nav')
    expect(html).toContain('side-nav-item')
    expect(html).toContain('effect filter')
    expect(html).toContain('effect text')
    expect(html).toContain('--linear-ease')
    expect(html).toContain('filter:blur(7px) contrast(100) blur(0)')
    expect(html).toContain('mix-blend-mode:lighten')
    expect(html).toContain('class="particle"')
    expect(html).toContain('class="point"')
    expect(html).toContain('makeGooeyParticles')
    expect(html).toContain('moveGooeyEffect')
    expect(html).toContain('--strip-radius:12px')
    expect(html).toContain('position:fixed')
    expect(html).toContain('translateY(-50%)')
    expect(html).not.toContain('box-shadow:0 8px 22px')
  })

  it('renders a compact shadowless icon-only gooey capsule', () => {
    const html = readPrototype()

    expect(html).toContain('icon-capsule-nav')
    expect(html).toContain('width:48px')
    expect(html).toContain('height:184px')
    expect(html).toContain('border-radius:999px')
    expect(html).toContain('box-shadow:none')
    expect(html).toContain('nav-icon-home')
    expect(html).toContain('nav-icon-sections')
    expect(html).toContain('nav-icon-work')
    expect(html).toContain('nav-icon-contact')
    expect(html).toContain('aria-label="首页"')
    expect(html).toContain('aria-label="页面区块"')
    expect(html).toContain('aria-label="作品"')
    expect(html).toContain('aria-label="联系"')
    expect(html).not.toMatch(/<small>0[1-4]<\/small>/)
  })

  it('renders the video area as an iPad-like device with real hardware details', () => {
    const html = readPrototype()

    expect(html).toContain('tablet-video-player')
    expect(html).toContain('tablet-device')
    expect(html).toContain('tablet-aluminum-rim')
    expect(html).toContain('tablet-bezel')
    expect(html).toContain('tablet-glass')
    expect(html).toContain('tablet-camera')
    expect(html).toContain('tablet-side-button')
    expect(html).toContain('tablet-home-indicator')
    expect(html).toContain('tablet-reflection')
    expect(html).toContain('video-feed')
    expect(html).toContain('video-slide')
    expect(html).not.toContain('tablet-metal-frame')
  })

  it('uses SVG short-video action icons instead of placeholder emoji characters', () => {
    const html = readPrototype()

    expect(html).toContain('douyin-actions')
    expect(html).toContain('action-avatar')
    expect(html).toContain('action-like')
    expect(html).toContain('action-comment')
    expect(html).toContain('action-favorite')
    expect(html).toContain('action-share')
    expect(html).toContain('<svg')
    expect(html).toContain('icon-heart')
    expect(html).toContain('icon-comment')
    expect(html).toContain('icon-bookmark')
    expect(html).toContain('icon-share')
    expect(html).not.toContain('💬')
    expect(html).not.toContain('★')
    expect(html).not.toContain('♥')
  })

  it('keeps swipe switching but hides the hint after the first completed switch', () => {
    const html = readPrototype()

    expect(html).toContain('swipe-hint')
    expect(html).toContain('data-swipe-hint')
    expect(html).toContain('hideSwipeHint')
    expect(html).toContain('has-swiped')
    expect(html).toContain('pointer-events:none')
    expect(html).toContain('switchVideo')
    expect(html).toMatch(/function switchVideo[\s\S]*hideSwipeHint/)
    expect(html).toContain('touchstart')
    expect(html).toContain('touchend')
    expect(html).toContain('wheel')
    expect(html).not.toContain('tablet-top-nav')
    expect(html).not.toContain('tablet-bottom-nav')
  })

  it('reserves the first-screen right-side companion cat slot without building the cat yet', () => {
    const html = readPrototype()

    expect(html).toContain('cat-companion-slot')
    expect(html).toContain('暂留猫咪陪伴位')
    expect(html).not.toContain('cat-avatar')
    expect(html).not.toContain('interactive-cat')
  })

  it('does not build the second screen content yet', () => {
    const html = readPrototype()

    expect(html).not.toContain('second-screen')
    expect(html).not.toContain('第二屏内容')
  })

  it('keeps management entry points out of the public prototype', () => {
    const html = readPrototype()

    expect(html).not.toMatch(/admin|login|dashboard|cms/i)
    expect(html).not.toMatch(/后台|管理后台/)
  })
})
