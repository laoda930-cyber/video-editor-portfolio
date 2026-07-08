import { useEffect } from 'react'
export default function VideoModal({ work, onClose }) {
  useEffect(() => { const close = (event) => event.key === 'Escape' && onClose(); document.addEventListener('keydown', close); document.body.classList.add('modal-open'); return () => { document.removeEventListener('keydown', close); document.body.classList.remove('modal-open') } }, [onClose])
  return <div className="video-modal" role="dialog" aria-modal="true" aria-label={work.title} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="video-panel"><button className="modal-close" onClick={onClose} aria-label="关闭播放器">×</button><video controls autoPlay src={work.video}/><h2>{work.title}</h2></div></div>
}
