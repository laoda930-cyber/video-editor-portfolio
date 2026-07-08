const PlayIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7.8v8.4c0 .8.9 1.3 1.6.8l6.2-4.2a1 1 0 0 0 0-1.6L10.6 7c-.7-.5-1.6 0-1.6.8Z" fill="currentColor"/></svg>

export default function WorkCard({ work, featured = false, onSelect }) {
  return <article className={`gallery-card ${featured ? 'is-featured' : ''}`} data-testid={featured ? 'featured-card' : 'work-card'}><button className="media-button" onClick={() => onSelect(work)} aria-label={`播放 ${work.title}`}><div className={`media-art tone-${work.tone}`}><span className="media-code">{work.id.toUpperCase()}</span><span className="play-icon"><PlayIcon /></span><span className="pending-label">VIDEO PENDING</span></div></button><div className="card-meta"><div><h3>{work.title}</h3><span>{work.year}</span></div><span>{work.duration}</span></div></article>
}
