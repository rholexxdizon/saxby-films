import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCursor } from '../../contexts/CursorContext'

const CustomCursor = () => {
  const {
    position,
    scrollProgress,
    isHovering,
    hoverText,
    isActive,
    hasFinePointer,
    prefersReducedMotion,
    isDesktop,
  } = useCursor()

  // Programmatic cursor hiding enforcement
  useEffect(() => {
    if (hasFinePointer && isDesktop && isActive) {
      // Add html class for maximum specificity CSS
      document.documentElement.classList.add('cursor-hide')

      // Add style tag to force cursor hiding
      const style = document.createElement('style')
      style.id = 'cursor-force-hide'
      style.innerHTML = `
        * { cursor: none !important; }
        a, button, [role="button"] { cursor: none !important; }
        .cursor-pointer, .cursor-default, .cursor-not-allowed { cursor: none !important; }

        /* Allow default cursor in native elements that don't support custom cursors */
        select:hover, option:hover, select:focus { cursor: default !important; }
        select, option { cursor: default !important; }
        video:hover, video:focus { cursor: default !important; }
        video { cursor: default !important; }
        iframe:hover, iframe:focus { cursor: default !important; }
        iframe { cursor: default !important; }

        /* Video container specific handling */
        .video-container:hover, .video-container:focus { cursor: default !important; }
        .video-container { cursor: default !important; }
        [data-video-wrapper]:hover { cursor: default !important; }
        [data-video-wrapper] { cursor: default !important; }
      `
      document.head.appendChild(style)

      return () => {
        document.documentElement.classList.remove('cursor-hide')
        const existing = document.getElementById('cursor-force-hide')
        if (existing) existing.remove()
      }
    }
  }, [hasFinePointer, isDesktop, isActive])

  // Don't render if mobile/tablet or reduced motion
  if (!hasFinePointer || prefersReducedMotion || !isActive || !isDesktop) {
    return null
  }

  // Saxby Films gold color system
  const goldAccent = '#d4af37'
  const goldLight = 'rgba(212, 175, 55, 0.5)'
  const goldGlow = 'rgba(212, 175, 55, 0.3)'

  return (
    <>
      {/* MAIN CURSOR SYSTEM - All existing functionality */}

      {/* Enhanced cursor with scroll progress and hover */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: `translate(${position.x - 22}px, ${position.y - 22}px) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.15s ease-out',
          filter: `drop-shadow(0 0 ${isHovering ? 20 : 12}px ${goldGlow})`,
        }}
      >
        {/* Progress Ring SVG */}
        <svg width="44" height="44" viewBox="0 0 44 44" className="rotate-[-90deg]">
          {/* Background circle */}
          <circle
            cx="22"
            cy="22"
            r={20}
            fill="none"
            stroke={goldLight}
            strokeWidth="1.5"
            opacity="0.4"
          />
          {/* Progress circle */}
          <circle
            cx="22"
            cy="22"
            r={20}
            fill="none"
            stroke={goldAccent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={125.6}
            strokeDashoffset={125.6 - (scrollProgress / 100) * 125.6}
            style={{
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
        </svg>

        {/* Subtle gold ring on hover */}
        {isHovering && (
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(212,175,55,0.4)',
              transform: 'scale(1.1)',
              transition: 'all 0.15s ease',
            }}
          />
        )}

        {/* Hover Text - All existing text functionality */}
        <AnimatePresence>
          {isHovering && hoverText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
              transition={{ duration: 0.12 }}
            >
              <span
                className="text-[8px] font-semibold uppercase tracking-wider"
                style={{ color: goldAccent }}
              >
                {hoverText}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Inner Cursor Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[10001] will-change-transform"
        style={{
          transform: `translate(${position.x - 3}px, ${position.y - 3}px) scale(${isHovering ? 1.8 : 1})`,
          transition: 'transform 0.08s ease-out',
        }}
      >
        {/* Main dot with Saxby gold accent - ENLARGES ON HOVER */}
        <div
          className="rounded-full"
          style={{
            width: isHovering ? '12px' : '6px',
            height: isHovering ? '12px' : '6px',
            backgroundColor: goldAccent,
            boxShadow: isHovering
              ? `0 0 15px rgba(212,175,55,0.6), 0 0 25px rgba(212,175,55,0.3)`
              : `0 0 10px rgba(212,175,55,0.4)`,
            opacity: isHovering ? 1 : 0.9,
            transition: 'all 0.15s ease',
          }}
        />

        {/* Cinematic glow on hover */}
        {isHovering && (
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: 'rgba(212,175,55,0.15)',
              transform: 'scale(2)',
              filter: 'blur(4px)',
              opacity: 0.6,
              transition: 'all 0.2s ease',
            }}
          />
        )}
      </div>

      {/* SCSS-STYLE CURSOR - REPLACES MOUSE POINTER ON CLICKABLES */}
      {/* Center Dot (8px) - from SCSS reference */}
      {isHovering && (
        <div
          className="cursor-dot"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            opacity: 1,
          }}
        />
      )}

      {/* Cursor Dot Outline (40px) - from SCSS reference */}
      {isHovering && (
        <div
          className={`cursor-dot-outline ${isHovering ? 'hovered' : ''}`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            opacity: 1,
          }}
        />
      )}
    </>
  )
}

export default CustomCursor