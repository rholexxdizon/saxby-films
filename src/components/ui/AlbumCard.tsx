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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative cursor-pointer"
      onClick={() => onOpen(item)}
      whileHover={{ y: -8 }}
    >
      <div className="aspect-[4/3] rounded-2xl overflow-hidden cinematic-card">
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
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 text-accent mb-2">
          <Album className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider">
            {item.type === 'album' ? `${item.galleryImages?.length || 0} Photos` : 'Video'}
          </span>
        </div>
        <h3 className="text-white font-display font-bold text-lg mb-1">
          {item.title}
        </h3>
        <p className="text-white/70 text-sm line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export default AlbumCard
