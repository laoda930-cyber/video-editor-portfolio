import { useState } from 'react'
import Header from './components/Header'
import FeaturedWorks from './components/FeaturedWorks'
import WorkSection from './components/WorkSection'
import VideoModal from './components/VideoModal'
import Footer from './components/Footer'
import { categories, galleryWorks } from './data/gallery'

export default function App() {
  const [selectedWork, setSelectedWork] = useState(null)
  const [notice, setNotice] = useState('')
  const featured = galleryWorks.filter((work) => work.featured)
  const selectWork = (work) => {
    if (!work.video) {
      setNotice(`${work.title} · 视频待上传`)
      return
    }
    setNotice('')
    setSelectedWork(work)
  }

  return <>
    <a className="skip-link" href="#featured">跳到作品</a>
    <Header categories={categories} />
    <main>
      <FeaturedWorks works={featured} onSelect={selectWork} />
      {categories.map((category) => <WorkSection key={category.id} category={category} works={galleryWorks.filter((work) => work.category === category.id)} onSelect={selectWork} />)}
    </main>
    <div className="upload-notice" role="status" aria-live="polite">{notice}</div>
    <Footer />
    {selectedWork && <VideoModal work={selectedWork} onClose={() => setSelectedWork(null)} />}
  </>
}
