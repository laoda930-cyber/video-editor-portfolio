const layers = ['background', 'subject', 'midground', 'foreground']

export default function ParallaxScene() {
  return (
    <div className="parallax-scene" aria-hidden="true">
      {layers.map((layer) => (
        <div
          className={`scene-layer scene-layer--${layer}`}
          data-layer={layer}
          data-testid="scene-layer"
          key={layer}
        />
      ))}
    </div>
  )
}
