import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { PortfolioItem } from '../../types'

interface GalleryModalProps {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
}

const GalleryModal = ({ item, isOpen, onClose }: GalleryModalProps) => {
  const [showMore, setShowMore] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const initialVisibleCount = 6

  if (!item) return null

  const images = item.galleryImages || []
  const visibleImages = showMore ? images : images.slice(0, initialVisibleCount)
  const hasMore = images.length > initialVisibleCount

  const openLightbox = (imageSrc: string, index: number) => {
    setLightboxImage(imageSrc)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    const totalImages = images.length
    let newIndex = direction === 'prev'
      ? (currentImageIndex - 1 + totalImages) % totalImages
      : (currentImageIndex + 1) % totalImages

    setCurrentImageIndex(newIndex)
    setLightboxImage(images[newIndex])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!lightboxImage) return

    if (e.key === 'ArrowLeft') navigateImage('prev')
    if (e.key === 'ArrowRight') navigateImage('next')
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-7xl mx-auto h-full flex flex-col p-6 md:p-12"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-white/70">{item.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer relative group"
                    onClick={() => openLightbox(image, images.indexOf(image))}
                  >
                    <img
                      src={image}
                      alt={`${item.title} - Photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Hover overlay - only shows on hovered item */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-black/50 rounded-full p-3">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3h-6" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasMore && !showMore && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setShowMore(true)}
                  className="mt-8 mx-auto block px-8 py-4 gold-gradient text-white rounded-full font-medium"
                >
                  Load More ({images.length - initialVisibleCount} more)
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Lightbox Overlay */}
          <AnimatePresence>
            {lightboxImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[60] bg-black/98 flex items-center justify-center"
                onClick={closeLightbox}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="relative max-w-6xl max-h-[90vh] px-4"
                  onClick={e => e.stopPropagation()}
                >
                  <img
                    src={lightboxImage}
                    alt={`Photo ${currentImageIndex + 1}`}
                    className="max-w-full max-h-[85vh] object-contain"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>

                  {/* Close button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GalleryModal
