# Four-Layer Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved reference-style light portfolio with four independent parallax layers and placeholder video works.

**Architecture:** Keep the Vite entry point unchanged. Replace the current gallery composition with focused React components for the fixed navigation, layered scene, portfolio sections, and placeholder work cards. A single scroll effect writes `--scroll-y` to the document root; CSS gives each layer its own speed and disables the effect for reduced-motion users.

**Tech Stack:** React, Vite, Vitest, Testing Library, CSS custom properties.

## Global Constraints

- The content width is at most 1700px on desktop.
- The information structure is 首页 / 项目介绍 / 作品集 / 关于我.
- Work images and videos are placeholders; clicking them must show `视频待上传`.
- The scene has four independent layers: background, subject, midground, foreground.
- The background is fixed and the foreground has the largest scroll displacement.
- Reduced-motion preferences disable parallax movement.

---

### Task 1: Specify the new structure and parallax behavior

**Files:**
- Modify: `src/Gallery.test.jsx`

**Interfaces:**
- Consumes: the default `App` React component.
- Produces: DOM and CSS expectations that define the redesigned page.

- [ ] **Step 1: Write failing tests**

```jsx
expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument()
expect(screen.getByRole('heading', { name: /A Curated Portfolio/ })).toBeInTheDocument()
expect(screen.getAllByTestId('scene-layer')).toHaveLength(4)
expect(document.documentElement.style.getPropertyValue('--scroll-y')).toBe('240px')
```

- [ ] **Step 2: Verify the tests fail**

Run: `npx vitest run --exclude .worktrees/** src/Gallery.test.jsx`

Expected: failures for the missing main navigation, hero copy, scene layers, and scroll variable.

- [ ] **Step 3: Keep the test focused on user-visible behavior**

Use accessible roles for headings, links, and play buttons; only use test IDs for the otherwise decorative scene layers.

### Task 2: Implement the four-layer React page

**Files:**
- Modify: `src/App.jsx`
- Create: `src/components/ParallaxScene.jsx`
- Create: `src/components/PortfolioNav.jsx`
- Create: `src/components/ReferenceWorkCard.jsx`
- Modify: `src/data/gallery.js`

**Interfaces:**
- `ParallaxScene()` renders four decorative layers with `data-layer` values.
- `PortfolioNav()` renders the four section anchors.
- `ReferenceWorkCard({ work, onSelect, compact })` renders one accessible placeholder video button.
- `galleryWorks` supplies six placeholder works; no video URL is required.

- [ ] **Step 1: Add the scroll value effect**

```jsx
useEffect(() => {
  let frame = 0
  const update = () => document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
  const onScroll = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(update)
  }
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    document.documentElement.style.removeProperty('--scroll-y')
  }
}, [])
```

- [ ] **Step 2: Render the approved sections and placeholder behavior**

The four anchors are `#home`, `#project`, `#works`, and `#about`. Selecting a work without `video` sets the live status to `${work.title} · 视频待上传`.

- [ ] **Step 3: Run the focused test**

Run: `npx vitest run --exclude .worktrees/** src/Gallery.test.jsx`

Expected: all Gallery tests pass.

### Task 3: Match the reference layout and verify the build

**Files:**
- Modify: `src/gallery.css`

**Interfaces:**
- Consumes: the class names and `data-layer` values from Task 2.
- Produces: desktop-first 1700px layout, fixed pill navigation, dreamy light palette, and four scroll speeds.

- [ ] **Step 1: Style the four layer speeds**

```css
.scene-layer--background { position: fixed; transform: none; }
.scene-layer--subject { transform: translate3d(0, calc(var(--scroll-y) * -0.015), 0); }
.scene-layer--midground { transform: translate3d(0, calc(var(--scroll-y) * -0.035), 0); }
.scene-layer--foreground { transform: translate3d(0, calc(var(--scroll-y) * -0.07), 0); }
```

- [ ] **Step 2: Add responsive and reduced-motion rules**

```css
@media (prefers-reduced-motion: reduce) {
  .scene-layer { transform: none !important; }
}
```

- [ ] **Step 3: Run verification**

Run: `npx vitest run --exclude .worktrees/** src/Gallery.test.jsx`

Expected: all Gallery tests pass.

Run: `npm run build`

Expected: Vite exits with code 0 and writes the production bundle to `dist/`.
