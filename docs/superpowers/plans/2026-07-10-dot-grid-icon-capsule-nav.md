# Dot Grid and Icon Capsule Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the first-screen background with a static dot grid and rebuild the left navigation as a compact, shadowless, icon-only gooey capsule.

**Architecture:** Keep the standalone single-file prototype and its existing GooeyNav JavaScript. Express the new visual contract in CSS and semantic SVG markup, while preserving `data-nav-index`, `data-dialogue`, `moveGooeyEffect`, and `makeGooeyParticles` so existing interaction behavior remains intact.

**Tech Stack:** HTML5, CSS, inline SVG, vanilla JavaScript, Vitest static-contract tests.

## Global Constraints

- Modify only `home-nav-button-prototype/index.html` and `src/HomeNavButtonPrototype.test.jsx`.
- Background is static: white surface, 1.5px dark-gray dots, 18px spacing, no gradient glow, noise, or animation.
- Desktop capsule target is 48 × 184px and never wider than 52px; mobile target is 44 × 168px.
- Navigation has no visible text, numbers, or box shadow.
- Four entries remain accessible as 首页、页面区块、作品、联系.
- Existing gooey filter, particles, dialogue updates, reduced-motion handling, tablet player, and swipe behavior remain unchanged.

---

### Task 1: Lock the new background and navigation contract

**Files:**
- Modify: `src/HomeNavButtonPrototype.test.jsx`
- Test: `src/HomeNavButtonPrototype.test.jsx`

**Interfaces:**
- Consumes: `readPrototype(): string`.
- Produces: regression assertions for `.dot-grid-background`, `.icon-capsule-nav`, four SVG icons, accessible labels, and shadowless sizing.

- [ ] **Step 1: Replace the old background assertion and add the capsule contract**

```jsx
it('uses the approved static dot-grid background', () => {
  const html = readPrototype()
  expect(html).toContain('dot-grid-background')
  expect(html).toContain('--dot-size:1.5px')
  expect(html).toContain('--dot-gap:18px')
  expect(html).toContain('radial-gradient(circle')
  expect(html).not.toContain('white-modern-background')
  expect(html).not.toContain('feTurbulence')
})

it('renders a compact shadowless icon-only gooey capsule', () => {
  const html = readPrototype()
  expect(html).toContain('icon-capsule-nav')
  expect(html).toContain('width:48px')
  expect(html).toContain('height:184px')
  expect(html).toContain('border-radius:999px')
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
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- --run src/HomeNavButtonPrototype.test.jsx`

Expected: FAIL because `dot-grid-background`, `icon-capsule-nav`, and the four navigation icon classes do not exist yet.

- [ ] **Step 3: Commit the failing contract test**

```bash
git add src/HomeNavButtonPrototype.test.jsx
git commit -m "test: specify dot grid capsule navigation"
```

---

### Task 2: Implement the dot grid and icon capsule

**Files:**
- Modify: `home-nav-button-prototype/index.html`
- Test: `src/HomeNavButtonPrototype.test.jsx`

**Interfaces:**
- Consumes: existing `data-side-gooey-strip`, `data-gooey-nav`, `data-nav-index`, `data-dialogue`, `.effect.filter`, and `.effect.text` hooks.
- Produces: `.dot-grid-background`, `.icon-capsule-nav`, `.nav-icon`, and four semantic SVG icon classes.

- [ ] **Step 1: Replace the background CSS and markup**

```css
:root{
  --dot-size:1.5px;
  --dot-gap:18px;
  --dot-color:rgba(35,39,37,.56);
}

.dot-grid-background{
  position:absolute;
  z-index:-2;
  inset:0;
  background-color:#fff;
  background-image:radial-gradient(circle,var(--dot-color) var(--dot-size),transparent calc(var(--dot-size) + .2px));
  background-size:var(--dot-gap) var(--dot-gap);
  pointer-events:none;
}
```

Replace the background element with:

```html
<div class="dot-grid-background" data-static-dot-grid aria-hidden="true"></div>
```

- [ ] **Step 2: Rebuild the capsule dimensions without shadow**

```css
.side-gooey-strip{
  left:20px;
  width:48px;
  height:184px;
  padding:0;
}

.gooey-nav-container{
  width:48px;
  height:184px;
  min-height:0;
  padding:8px 4px;
  border:1px solid rgba(17,20,17,.14);
  border-radius:999px;
  background:#161917;
  box-shadow:none;
}

.gooey-nav-container ul{
  height:100%;
  display:grid;
  grid-template-rows:repeat(4,1fr);
  gap:0;
}

.side-nav-item{height:42px;border-radius:50%}
.side-nav-item button{display:grid;place-items:center;padding:0}
.nav-icon{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.8}
```

Add `icon-capsule-nav` to the `<aside>` class list. Remove the visible `<small>` and text `<span>` children, replacing them with 24 × 24 inline SVGs for home, sections, work/play, and contact. Preserve each button's existing `data-*` attributes and add the exact `aria-label` values from Task 1.

- [ ] **Step 3: Keep the gooey slider aligned to the smaller items**

Update `.effect`, `.effect.filter::after`, and mobile rules so the active surface is a 40–42px circle inside the capsule. Keep `filter:blur(7px) contrast(100) blur(0)`, `mix-blend-mode:lighten`, `moveGooeyEffect(item)`, and particle creation unchanged.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- --run src/HomeNavButtonPrototype.test.jsx`

Expected: 1 test file passed, all tests passed.

- [ ] **Step 5: Run DOM and script verification**

Run:

```bash
node -e "const fs=require('fs'),{JSDOM}=require('jsdom');const h=fs.readFileSync('home-nav-button-prototype/index.html','utf8');const d=new JSDOM(h).window.document;new Function([...d.scripts].map(x=>x.textContent).join('\\n'));const result={icons:d.querySelectorAll('.icon-capsule-nav .nav-icon').length,labels:[...d.querySelectorAll('.icon-capsule-nav button')].map(x=>x.getAttribute('aria-label')),visibleLabels:d.querySelectorAll('.icon-capsule-nav small,.icon-capsule-nav button>span:not(.effect)').length};if(result.icons!==4||result.visibleLabels!==0)process.exitCode=1;console.log(JSON.stringify(result,null,2));"
```

Expected: `icons` is 4, labels match the four approved names, `visibleLabels` is 0, and the command exits 0.

- [ ] **Step 6: Commit the implementation**

```bash
git add home-nav-button-prototype/index.html src/HomeNavButtonPrototype.test.jsx
git commit -m "feat: add dot grid icon capsule navigation"
```
