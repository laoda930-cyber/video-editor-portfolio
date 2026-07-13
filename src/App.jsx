import { useEffect, useState } from 'react'
import ParallaxScene from './components/ParallaxScene'
import PortfolioNav from './components/PortfolioNav'
import ReferenceWorkCard from './components/ReferenceWorkCard'
import { galleryWorks } from './data/gallery'

function useParallaxValue() {
  useEffect(() => {
    let frame = 0
    const scheduleFrame = window.requestAnimationFrame || ((callback) => callback())
    const cancelFrame = window.cancelAnimationFrame || (() => {})
    const update = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    }
    const onScroll = () => {
      cancelFrame(frame)
      frame = scheduleFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelFrame(frame)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.style.removeProperty('--scroll-y')
    }
  }, [])
}

export default function App() {
  const [notice, setNotice] = useState('')
  useParallaxValue()

  const selectWork = (work) => {
    setNotice(`${work.title} · 视频待上传`)
  }

  return (
    <div className="portfolio-site">
      <ParallaxScene />
      <a className="skip-link" href="#works">跳到作品集</a>
      <PortfolioNav />

      <main className="portfolio-content">
        <section className="hero-section scene-section" id="home">
          <div className="hero-copy">
            <h1>
              A Curated Portfolio of Creative Work by{' '}
              <span>Li Xinxia</span>
            </h1>
            <p>
              用剪辑重组时间，用画面传递情绪。<br />
              这里记录了我在视频剪辑、视觉表达与创意叙事中的部分作品。
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#project">开始 <small>start</small></a>
              <a className="button button--secondary" href="#about">关于我 <small>about me</small></a>
            </div>
          </div>
          <a className="scroll-cue" href="#project" aria-label="向下查看项目介绍">
            <span />
            SCROLL
          </a>
        </section>

        <section className="project-section scene-section content-shell" id="project">
          <div className="project-copy">
            <h2>
              我把想法变成 <span>可以被看见、</span> 被体验的内容。
            </h2>
            <p>
              我关注 AI 视频创作、视觉叙事、产品体验和交互设计。
              这里收录了我最具代表性的项目，持续探索数字边界下的感官平衡。
            </p>
            <a className="text-link" href="#works">浏览全部作品 <span aria-hidden="true">↗</span></a>
          </div>

          <div className="project-reel" aria-label="代表视频作品">
            {galleryWorks.slice(0, 3).map((work) => (
              <ReferenceWorkCard key={work.id} work={work} onSelect={selectWork} compact />
            ))}
          </div>
        </section>

        <section className="works-section scene-section" id="works">
          <div className="content-shell works-shell">
            <div className="works-heading">
              <h2>精选作品</h2>
              <p>SELECTED VIDEO WORKS · 2024—2026</p>
            </div>
            <div className="works-grid">
              {galleryWorks.map((work) => (
                <ReferenceWorkCard key={work.id} work={work} onSelect={selectWork} />
              ))}
            </div>
          </div>
        </section>

        <section className="about-section scene-section content-shell" id="about">
          <div className="about-copy">
            <h2>让下一段画面，从这里开始。</h2>
            <p>李欣霞 · 视频剪辑师</p>
          </div>
          <div className="about-contact">
            <a href="mailto:1888888888@qq.com">1888888888@qq.com</a>
            <a href="tel:1888888888">1888888888</a>
          </div>
          <span className="copyright">© 2026 LI XINXIA</span>
        </section>
      </main>

      <div className="upload-notice" role="status" aria-live="polite">
        {notice}
      </div>
    </div>
  )
}
