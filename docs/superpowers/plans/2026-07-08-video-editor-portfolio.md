# Video Editor Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, runnable React + Vite portfolio for video editor 李欣霞.

**Architecture:** A static single-page React application composed from focused section components and local content data. Styling lives in a token-driven CSS system with responsive rules and reduced-motion support; Vitest and Testing Library verify structure, copy, navigation, and data rendering.

**Tech Stack:** React 18, Vite 5, Vitest, Testing Library, native CSS

## Global Constraints

- Content width is capped at approximately 1700px.
- The visual language is dark, restrained, cinematic, and avoids generic blue-purple neon styling.
- Placeholder artwork must be replaceable without changing the layout.
- The site must retain a usable responsive layout and accessible focus/motion behavior.
- Contact details use the supplied resume: 1888888888 and 1888888888@qq.com.

---

### Task 1: Project foundation and render contract

**Files:**
- Create: `package.json`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/App.test.jsx`, `vite.config.js`

**Interfaces:**
- Produces: `App(): JSX.Element`, a page with `header`, `main`, and `footer` landmarks.

- [ ] Write `src/App.test.jsx` first with Testing Library assertions for the main heading, all five section labels, and email link.
- [ ] Run `npm test -- --run`; expect failure because the app/configuration is absent.
- [ ] Add the smallest Vite/React setup and semantic section skeleton that satisfies the test.
- [ ] Install dependencies and rerun `npm test -- --run`; expect all assertions to pass.

### Task 2: Content model and section components

**Files:**
- Create: `src/data/portfolio.js`, `src/components/Header.jsx`, `Hero.jsx`, `About.jsx`, `Works.jsx`, `Strengths.jsx`, `Contact.jsx`
- Modify: `src/App.jsx`, `src/App.test.jsx`

**Interfaces:**
- Produces: `experiences`, `works`, and `strengths` arrays; each component accepts its relevant array as a prop.

- [ ] Add failing tests asserting 3 experience entries, 3 work cards, 4 strength cards, navigation links, and resume-derived statistics.
- [ ] Run the focused test and confirm failures are due to missing content.
- [ ] Implement local data and focused components, then compose them in `App`.
- [ ] Rerun the test suite and expect all tests to pass.

### Task 3: Cinematic visual system and responsive behavior

**Files:**
- Create: `src/styles.css`
- Modify: `src/main.jsx`, `src/App.jsx`

**Interfaces:**
- Consumes the stable class names emitted by section components.
- Produces tokenized colors, 1700px container rules, cinematic placeholder art, hover/focus states, responsive layouts, and reduced-motion overrides.

- [ ] Add a source-level test asserting the stylesheet includes a 1700px cap, visible `:focus-visible`, and `prefers-reduced-motion`.
- [ ] Run tests and confirm the new stylesheet contract fails.
- [ ] Implement global tokens, typography, grids, artwork, section layouts, transitions, and breakpoints.
- [ ] Rerun all tests and expect them to pass.

### Task 4: Build and browser verification

**Files:**
- Modify only if verification reveals a defect.

**Interfaces:**
- Produces a successful production bundle and a visually usable page at local development URL.

- [ ] Run `npm run build`; expect exit code 0.
- [ ] Start the Vite preview/development server.
- [ ] Inspect desktop and narrow viewport rendering, anchor navigation, focus states, overflow, and console errors in the in-app browser.
- [ ] If a defect appears, add a failing regression test, fix it, rerun tests/build, and repeat browser inspection.
