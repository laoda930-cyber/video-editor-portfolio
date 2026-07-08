# Standalone Portfolio Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Build a self-contained hero-first-screen.html with a warm editorial portfolio hero and five TikTok-style upward-paging animated previews.

**Architecture:** One standalone HTML file contains semantic markup, embedded CSS, and embedded JavaScript. Five fixed-height scenes live in a vertical track; a small controller owns the active index, transition lock, accessible label, and status announcement. Existing index.html and src files stay untouched.

**Tech Stack:** HTML5, CSS custom properties/keyframes/media queries, vanilla JavaScript, Node.js with JSDOM, in-app browser.

## Global Constraints

- Create hero-first-screen.html as the only implementation file.
- Do not modify index.html or any file under src.
- Do not load frameworks, CDNs, fonts, images, videos, audio, or other network resources.
- Render exactly five animated placeholders in this order: 品牌视觉叙事、产品质感短片、商业增长内容、情绪剧情短片、知识动画合成.
- Clicking 下一个 moves the current scene upward and the next scene in from below in about 420ms; scene five wraps to scene one.
- Keep the cat absent while preserving empty character-layer and subdued cat-box elements.
- Support keyboard input, 48px minimum targets, polite announcements, visible focus, and prefers-reduced-motion.
- The finished file must work through file://.

---

### Task 1: Create the standalone semantic shell

**Files:**
- Create: hero-first-screen.html
- Do not modify: index.html
- Do not modify: src/**

**Interfaces:**
- Produces: .portfolio-hero, #hero-copy, #preview-device, .scene-track, five .preview-scene[data-scene], #next-work, .cat-box, .character-layer, and .scene-status.
- Consumes: no project code or runtime assets.

- [ ] **Step 1: Run the failing existence check**

~~~powershell
node -e "const fs=require('fs');if(!fs.existsSync('hero-first-screen.html'))throw new Error('hero-first-screen.html missing')"
~~~

Expected: exit 1 with hero-first-screen.html missing.

- [ ] **Step 2: Create the document with the agreed semantic regions**

Create hero-first-screen.html with this exact hierarchy and copy:

~~~html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="李欣霞，视频剪辑师作品集首屏。">
  <title>李欣霞 · 视频剪辑师</title>
  <style></style>
</head>
<body>
  <a class="skip-link" href="#hero-copy">跳到主要内容</a>
  <main class="portfolio-hero">
    <header class="hero-header">
      <a class="brand" href="#hero-copy" aria-label="李欣霞，视频剪辑师">
        <span class="brand-mark">LXX</span>
        <span><strong>李欣霞</strong><small>VIDEO EDITOR</small></span>
      </a>
      <nav aria-label="首屏导航">
        <a href="#preview-device">作品</a>
        <a href="#hero-copy">关于</a>
        <a href="mailto:1888888888@qq.com">联系</a>
      </nav>
    </header>

    <section class="hero-layout" aria-labelledby="hero-title">
      <div class="hero-copy" id="hero-copy" tabindex="-1">
        <p class="eyebrow"><span></span> VIDEO EDITOR · 2026</p>
        <h1 id="hero-title">让每一帧，<br><em>都值得停留</em></h1>
        <p class="intro">专注商业短视频，<br>用剪辑驱动传播与转化。</p>
        <ul class="skills" aria-label="专业方向">
          <li>品牌宣传</li><li>产品推广</li><li>营销内容</li>
        </ul>
      </div>

      <div class="showcase" id="preview-device">
        <div class="device" aria-label="五组精选作品预览">
          <div class="device-camera" aria-hidden="true"></div>
          <div class="device-screen">
            <div class="scene-track">
              <article class="preview-scene scene-brand" data-scene="0" data-title="品牌视觉叙事">
                <div class="scene-art" aria-hidden="true"><span class="word word-a">STORY</span><span class="word word-b">BRAND</span><i class="light-beam"></i></div>
                <div class="scene-meta"><span>01 / BRAND FILM</span><h2>品牌视觉叙事</h2></div>
              </article>
              <article class="preview-scene scene-product" data-scene="1" data-title="产品质感短片">
                <div class="scene-art" aria-hidden="true"><span class="product-form"></span><i class="orbit orbit-a"></i><i class="orbit orbit-b"></i></div>
                <div class="scene-meta"><span>02 / PRODUCT VIDEO</span><h2>产品质感短片</h2></div>
              </article>
              <article class="preview-scene scene-growth" data-scene="2" data-title="商业增长内容">
                <div class="scene-art" aria-hidden="true"><span class="metric">+127%</span><i class="bar bar-a"></i><i class="bar bar-b"></i><i class="bar bar-c"></i></div>
                <div class="scene-meta"><span>03 / SOCIAL CONTENT</span><h2>商业增长内容</h2></div>
              </article>
              <article class="preview-scene scene-story" data-scene="3" data-title="情绪剧情短片">
                <div class="scene-art" aria-hidden="true"><i class="flare flare-a"></i><i class="flare flare-b"></i><span class="frame-line"></span></div>
                <div class="scene-meta"><span>04 / STORY FILM</span><h2>情绪剧情短片</h2></div>
              </article>
              <article class="preview-scene scene-motion" data-scene="4" data-title="知识动画合成">
                <div class="scene-art" aria-hidden="true"><span class="motion-grid"></span><i class="node node-a"></i><i class="node node-b"></i><i class="node node-c"></i></div>
                <div class="scene-meta"><span>05 / MOTION DESIGN</span><h2>知识动画合成</h2></div>
              </article>
            </div>
          </div>
          <span class="device-reflection" aria-hidden="true"></span>
        </div>
        <div class="control-stage">
          <div class="cat-box" aria-hidden="true"><span></span></div>
          <button id="next-work" type="button" aria-label="下一个作品，当前第 1 个，共 5 个">
            <span>下一个</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="character-layer" aria-hidden="true"></div>
        </div>
        <p class="scene-status" aria-live="polite" aria-atomic="true">当前作品：品牌视觉叙事</p>
      </div>
    </section>
    <p class="edition">PORTFOLIO · 2026</p>
  </main>
  <script></script>
</body>
</html>
~~~

- [ ] **Step 3: Run the structural test**

~~~powershell
node -e "const fs=require('fs');const h=fs.readFileSync('hero-first-screen.html','utf8');const must=['<html lang=\"zh-CN\">','class=\"portfolio-hero\"','id=\"preview-device\"','id=\"next-work\"','class=\"character-layer\"'];for(const x of must)if(!h.includes(x))throw new Error('missing '+x);const n=(h.match(/data-scene=/g)||[]).length;if(n!==5)throw new Error('expected 5 scenes, got '+n);console.log('PASS: semantic shell and five scenes')"
~~~

Expected: PASS: semantic shell and five scenes.

---

### Task 2: Implement the editorial visual system

**Files:**
- Modify: hero-first-screen.html

**Interfaces:**
- Consumes: every class from Task 1.
- Produces: a two-column desktop layout, stacked mobile layout, vertical 9:16 device, five distinct scene art systems, 72px desktop control, and reduced-motion styles.

- [ ] **Step 1: Run the failing style-contract check**

~~~powershell
node -e "const fs=require('fs');const h=fs.readFileSync('hero-first-screen.html','utf8');for(const x of ['--paper:#f5f3f0','min-height:100svh','aspect-ratio:9/16','transition:transform 420ms','@media(max-width:720px)','prefers-reduced-motion:reduce'])if(!h.includes(x))throw new Error('missing style contract '+x)"
~~~

Expected: exit 1 with missing style contract.

- [ ] **Step 2: Add the complete visual rules**

Implement the following exact tokens in the embedded style:

~~~css
:root{
  --paper:#f5f3f0;--ink:#1a1a1a;--muted:#68645f;--accent:#e8a87c;
  --line:rgba(26,26,26,.13);--ease:cubic-bezier(.4,0,.2,1);
}
~~~

Implement these selector contracts:

- .portfolio-hero: min-height:100svh, overflow:hidden, horizontal padding clamp(24px,5.55vw,80px), warm radial glow, subtle 72px grid.
- .hero-header: 88px high flex row with bottom hairline.
- .hero-layout: min-height calc(100svh - 88px), columns minmax(340px,5fr) and minmax(520px,7fr), vertically centered.
- h1: clamp(56px,5.2vw,84px), weight 400, line-height 1.07, letter-spacing -.065em.
- .device: width min(27vw,370px), minimum 310px, aspect-ratio:9/16, 9px deep-gray frame, 34px radius, diffuse shadow.
- .device-screen: full size, overflow hidden, 26px radius.
- .scene-track: height 100%, transition:transform 420ms var(--ease), will-change:transform.
- .preview-scene: height 100%, position relative, overflow hidden.
- .control-stage: positioned beside the device; .cat-box opacity no greater than .15.
- #next-work: 72px circle on desktop, 64px on mobile, dark translucent glass, visible hover/active/focus, 3s breathing animation.
- .scene-status: visually hidden but available to assistive technology.
- At max-width 1000px: reduce device and gap while preserving two columns.
- At max-width 720px: one column, centered copy, device below copy, no horizontal overflow, control below the device.
- At max-width 390px: device no wider than 285px.
- Under prefers-reduced-motion:reduce: remove all keyframe animation and reduce transition duration to .01ms.

Implement five visibly distinct scene systems with these exact palettes and motion motifs:

- scene-brand: #bd8b66 to #3c2822; oversized STORY/BRAND lettering and a slow light beam.
- scene-product: #dbe8eb to #27363c; floating translucent product form and two rotating rings.
- scene-growth: #829d78 to #17221b; +127% typography and three animated vertical bars.
- scene-story: #3f294a to #e6a06f; two drifting blurred flares and a cinematic frame line.
- scene-motion: #e9e6df with #1e3b51; 38px grid and three floating geometric nodes.

Use only transform and opacity for continuous animation. Do not animate width, height, top, or left.

- [ ] **Step 3: Run the style-contract and scope checks**

~~~powershell
node -e "const fs=require('fs');const h=fs.readFileSync('hero-first-screen.html','utf8');for(const x of ['--paper:#f5f3f0','min-height:100svh','aspect-ratio:9/16','transition:transform 420ms','@media(max-width:720px)','prefers-reduced-motion:reduce'])if(!h.includes(x))throw new Error('missing style contract '+x);console.log('PASS: visual contract')"
git diff --name-only
~~~

Expected: PASS: visual contract, and only hero-first-screen.html appears as an implementation change.

- [ ] **Step 4: Commit the visual shell**

~~~powershell
git add -- hero-first-screen.html
git commit -m "feat: add standalone portfolio hero visuals"
~~~

---

### Task 3: Add upward paging and accessible state

**Files:**
- Modify: hero-first-screen.html

**Interfaces:**
- Consumes: #next-work, .scene-track, .preview-scene[data-scene], and .scene-status.
- Produces: goToNext(): void, activeIndex from 0 through 4, isTransitioning lock, translate3d track positions, synchronized label and status.

- [ ] **Step 1: Run the failing controller check**

~~~powershell
node -e "const fs=require('fs');const h=fs.readFileSync('hero-first-screen.html','utf8');for(const x of ['function goToNext()','isTransitioning','translate3d(0, -'])if(!h.includes(x))throw new Error('missing controller '+x)"
~~~

Expected: exit 1 with missing controller.

- [ ] **Step 2: Add the complete embedded controller**

~~~html
<script>
  (() => {
    const track = document.querySelector('.scene-track');
    const scenes = [...document.querySelectorAll('.preview-scene[data-scene]')];
    const nextButton = document.querySelector('#next-work');
    const status = document.querySelector('.scene-status');
    const transitionMs = 420;
    let activeIndex = 0;
    let isTransitioning = false;
    let releaseTimer = 0;

    function syncAccessibleState() {
      const title = scenes[activeIndex].dataset.title;
      nextButton.setAttribute(
        'aria-label',
        '下一个作品，当前第 ' + (activeIndex + 1) + ' 个，共 ' + scenes.length + ' 个'
      );
      status.textContent = '当前作品：' + title;
    }

    function releaseTransition() {
      window.clearTimeout(releaseTimer);
      isTransitioning = false;
      track.classList.remove('is-switching');
      nextButton.disabled = false;
    }

    function goToNext() {
      if (isTransitioning) return;
      isTransitioning = true;
      nextButton.disabled = true;
      track.classList.add('is-switching');

      const nextIndex = (activeIndex + 1) % scenes.length;
      activeIndex = nextIndex;
      track.style.transform = 'translate3d(0, -' + (nextIndex * 100) + '%, 0)';
      syncAccessibleState();

      const reducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      releaseTimer = window.setTimeout(
        releaseTransition,
        reducedMotion ? 20 : transitionMs + 30
      );
    }

    nextButton.addEventListener('click', goToNext);
    track.addEventListener('transitionend', (event) => {
      if (event.target === track && event.propertyName === 'transform') {
        releaseTransition();
      }
    });
    syncAccessibleState();
  })();
</script>
~~~

- [ ] **Step 3: Run the JSDOM interaction test**

~~~powershell
node -e "const fs=require('fs');const {JSDOM}=require('jsdom');const h=fs.readFileSync('hero-first-screen.html','utf8');const dom=new JSDOM(h,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.matchMedia=()=>({matches:true})}});const d=dom.window.document;const b=d.querySelector('#next-work');b.click();setTimeout(()=>{if(d.querySelector('.scene-track').style.transform!=='translate3d(0, -100%, 0)')throw new Error('upward page failed');if(!b.getAttribute('aria-label').includes('第 2 个'))throw new Error('label failed');console.log('PASS: upward paging and accessible state')},40)"
~~~

Expected: PASS: upward paging and accessible state.

- [ ] **Step 4: Run the wraparound test**

~~~powershell
node -e "const fs=require('fs');const {JSDOM}=require('jsdom');const h=fs.readFileSync('hero-first-screen.html','utf8');const dom=new JSDOM(h,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.matchMedia=()=>({matches:true})}});const d=dom.window.document;const b=d.querySelector('#next-work');let n=0;const step=()=>{b.click();setTimeout(()=>{n++;if(n<5)step();else{if(d.querySelector('.scene-track').style.transform!=='translate3d(0, -0%, 0)')throw new Error('wrap failed');console.log('PASS: five-scene wraparound')}},35)};step()"
~~~

Expected: PASS: five-scene wraparound.

---

### Task 4: Verify visual quality, responsiveness, and repository isolation

**Files:**
- Verify: hero-first-screen.html
- Verify unchanged: index.html, src/**

**Interfaces:**
- Consumes: completed standalone file.
- Produces: evidence that the file works directly, at all target widths, without regressing the existing application.

- [ ] **Step 1: Open the absolute file in the in-app browser**

Open D:\作品集网页\hero-first-screen.html directly.

Verify:

- 1440x900: balanced two columns; no content below the hero; button and subdued box sit beside the device.
- 900x900: device remains fully visible and does not overlap copy or controls.
- 390x844: copy stacks above device; no horizontal scroll; control is at least 48px.
- Five button activations move old scenes upward and wrap scene five to scene one.
- Tab reaches the button; Enter and Space advance it; focus ring remains visible.
- Reduced-motion emulation stops continuous animation and preserves all content.
- Browser console contains no error.

- [ ] **Step 2: Run repository regression and isolation checks**

~~~powershell
npm test -- --run
npm run build
git diff --check
git status --short
~~~

Expected:

- Existing Vitest tests pass.
- Existing Vite build succeeds.
- git diff --check emits no output.
- No modified path is index.html or under src.

- [ ] **Step 3: Commit the finished interaction**

~~~powershell
git add -- hero-first-screen.html
git commit -m "feat: complete standalone portfolio hero interaction"
git status --short
~~~

Expected: commit succeeds and git status --short is empty.
