import { motion } from 'framer-motion'
import { useState } from 'react'
import type { PortfolioItem } from '../../types'
import { Album } from 'lucide-react'

interface AlbumCardProps {
  item: PortfolioItem
  index: number
  onOpen: (item: PortfolioItem) => void
}

const AlbumCard = ({ item, index, onOpen }: AlbumCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

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

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
      className="cinematic-card rounded-2xl overflow-hidden group cursor-pointer"
      onClick={() => onOpen(item)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden surface-secondary">
        <img
          src={item.thumbnail}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface-secondary animate-pulse" />
        )}

        {/* Gradient Overlay - always visible with more opacity on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Album Icon & Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full">
          <Album className="w-4 h-4 text-white" />
          <span className="text-xs uppercase tracking-wider font-medium text-white">
            {item.galleryImages?.length || 0} Photos
          </span>
        </div>
      </div>

      {/* Card Content - Below image */}
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

export default AlbumCard
