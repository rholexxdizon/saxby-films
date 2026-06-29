import { useMouseGlow } from '../../hooks/useMouseGlow'

interface MouseGlowEffectProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  radius?: number
  color?: string
}

export const MouseGlowEffect = ({
  children,
  className = '',
  intensity = 0.6,
  radius = 300,
  color = 'rgba(212,175,55,0.08)'
}: MouseGlowEffectProps) => {
  const { containerRef, glowStyle } = useMouseGlow({ intensity, radius, color })

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ position: 'relative' }}
    >
      {/* Mouse-following glow layer */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          ...glowStyle,
          mixBlendMode: 'screen',
        }}
      />
      {children}
    </div>
  )
}

export default MouseGlowEffect