import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Image as ImageIcon } from 'lucide-react'
import type { PortfolioItem } from '../../types'
import { useCursorHover } from '@hooks/useCursorHover'

interface PortfolioCardProps {
  item: PortfolioItem
  index: number
}

const PortfolioCard = ({ item, index }: PortfolioCardProps) => {
  const [showEmbed, setShowEmbed] = useState(false)

  // Cursor hover effect based on item type
  const hoverText = item.type === 'video' ? 'Play' : 'View'
  const cursorHover = useCursorHover({ text: hoverText })

  const card = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  const handleCardClick = () => {
    if (item.type === 'video' && item.embedUrl && !showEmbed) {
      setShowEmbed(true)
    }
  }

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -8 }}
      className="cinematic-card rounded-2xl overflow-hidden group"
      onClick={handleCardClick}
      onMouseEnter={cursorHover.onMouseEnter}
      onMouseLeave={cursorHover.onMouseLeave}
    >
      {/* Thumbnail / Video Container */}
      <div className="relative aspect-[4/3] overflow-hidden surface-secondary" data-video-wrapper="true">
        {!showEmbed ? (
          <>
            {/* Thumbnail Image */}
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Type Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs uppercase tracking-wider font-medium">
              {item.category}
            </div>

            {/* Play Button (for videos) */}
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
                >
                  <Play className="w-8 h-8 text-dark-background ml-1" fill="currentColor" />
                </motion.div>
              </div>
            )}

            {/* Image Icon (for photos) */}
            {item.type === 'photo' && (
              <div className="absolute top-4 right-4 p-2 glassmorphism rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-4 h-4" />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Facebook Embed */}
            <iframe
              src={item.embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={item.title}
            />
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-lg font-display font-semibold mb-2">
          {item.title}
        </h3>
        <p className="text-secondary text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        {item.client && (
          <div className="flex items-center justify-between text-xs text-secondary">
            <span>{item.client}</span>
            {item.year && <span>{item.year}</span>}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default PortfolioCard
