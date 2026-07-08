# Gallery Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current dark résumé-style page with a light, work-first video gallery organized as Featured, Brand, Product, Social, and Story sections.

**Architecture:** Local portfolio data drives one featured grid and four reusable category sections. Focused React components handle cards and the optional video modal; a tokenized stylesheet provides the 1700px light visual system and responsive layouts.

**Tech Stack:** React, Vite, Vitest, Testing Library, native CSS, GitHub Pages

## Global Constraints

- No large Hero or standalone personal-information, experience, strengths, or contact sections.
- The visible content order is Featured, Brand, Product, Social, and Story.
- Cards use 16:9 media, minimal metadata, and explicit pending-video state.
- Desktop content width remains approximately 1700px; tablet is two columns and mobile is one.
- Existing GitHub Pages automatic deployment remains functional.

---

### Task 1: Gallery content contract

**Files:**
- Modify: `src/App.test.jsx`, `src/data/portfolio.js`, `src/App.jsx`
- Create: `src/components/FeaturedWorks.jsx`, `src/components/WorkSection.jsx`, `src/components/WorkCard.jsx`, `src/components/VideoModal.jsx`, `src/components/Footer.jsx`
- Modify: `src/components/Header.jsx`

**Interfaces:**
- Produces `categories` and `works` arrays; `WorkSection({ category, works, onSelect })`; `WorkCard({ work, featured, onSelect })`.

- [ ] Replace old structure assertions with failing tests for five headings, four category anchors, twelve cards, and absence of résumé sections.
- [ ] Run `npm test -- --run` and confirm failure because the old page remains.
- [ ] Implement the new data model and component tree with pending-video card behavior.
- [ ] Run the suite and confirm all structure assertions pass.

### Task 2: Video modal behavior

**Files:**
- Modify: `src/App.test.jsx`, `src/components/VideoModal.jsx`, `src/components/WorkCard.jsx`, `src/App.jsx`

**Interfaces:**
- `onSelect(work)` opens only when `work.video` is defined; `VideoModal({ work, onClose })` closes from button, overlay, or Escape.

- [ ] Add failing interaction tests for pending-video feedback and modal close behavior.
- [ ] Run focused tests and confirm the missing behavior fails.
- [ ] Implement selection and accessible dialog behavior.
- [ ] Run all tests and confirm passing output.

### Task 3: Light gallery visual system

**Files:**
- Replace: `src/styles.css`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Produces light semantic tokens, sticky header, featured composition, 16:9 cards, category grids, focus styles, and reduced-motion rules.

- [ ] Add a failing source contract test for light color scheme, 1700px cap, aspect-ratio, focus-visible, and reduced-motion.
- [ ] Run tests and confirm failure against the dark stylesheet.
- [ ] Replace the stylesheet with the approved light gallery system and responsive breakpoints.
- [ ] Run all tests and confirm passing output.

### Task 4: Verify, publish, and inspect

**Files:**
- Modify only when verification exposes a defect.

**Interfaces:**
- Produces a successful bundle and deployed GitHub Pages revision.

- [ ] Run `npm test -- --run` and `npm run build` separately with zero failures.
- [ ] Inspect desktop and 375px render, anchors, overflow, and console logs.
- [ ] Commit and push to `main`.
- [ ] Wait for the Pages workflow and verify the public URL responds successfully.
