function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M9 7.7v8.6c0 .8.9 1.3 1.6.8l6.3-4.3a1 1 0 0 0 0-1.6l-6.3-4.3c-.7-.5-1.6 0-1.6.8Z" fill="currentColor" />
    </svg>
  )
}

export default function ReferenceWorkCard({ work, onSelect, compact = false }) {
  return (
    <article className={`reference-card${compact ? ' reference-card--compact' : ''}`} data-tone={work.tone}>
      <button type="button" className="reference-card__button" aria-label={`播放 ${work.title}`} onClick={() => onSelect(work)}>
        <span className="reference-card__visual">
          <span className="reference-card__index">{work.index}</span>
          <span className="reference-card__play"><PlayIcon /></span>
          <span className="reference-card__caption">
            <strong>{work.title}</strong>
            <small>{work.subtitle}</small>
          </span>
        </span>
      </button>
    </article>
  )
}
