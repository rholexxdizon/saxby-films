import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Image as ImageIcon } from 'lucide-react'
import type { PortfolioItem } from '../../types'

interface PortfolioCardProps {
  item: PortfolioItem
  index: number
}

const PortfolioCard = ({ item, index }: PortfolioCardProps) => {
  const [showEmbed, setShowEmbed] = useState(false)

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
      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
      className="cinematic-card rounded-2xl overflow-hidden group"
      onClick={handleCardClick}
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
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />

            {/* Type Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full text-xs uppercase tracking-wider font-medium">
              {item.category}
            </div>

            {/* Play Button (for videos) */}
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
                  whileTap={{ scale: 0.9, transition: { duration: 0.15 } }}
                  className="relative w-16 h-16 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/40"
                >
                  <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                  {/* Gold glow effect */}
                  <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl" />
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
