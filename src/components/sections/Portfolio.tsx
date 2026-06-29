import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clapperboard, Plane, Trophy, BookOpen, Film, Sparkles, Heart } from 'lucide-react'
import PortfolioCard from '@components/ui/PortfolioCard'
import MouseGlowEffect from '@components/ui/MouseGlowEffect'
import type { PortfolioCategory, PortfolioItem, PortfolioTag } from '../../types'

// Tag icon mapping
const tagIcons: Record<PortfolioTag, React.ComponentType<{ className?: string }>> = {
  sde: Clapperboard,
  drone: Plane,
  sports: Trophy,
  documentary: BookOpen,
  bts: Film,
  highlights: Sparkles,
  'pre-wedding': Heart,
}

const Portfolio = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
  })

  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('all')
  const [selectedTags, setSelectedTags] = useState<PortfolioTag[]>([])
  const [visibleItems, setVisibleItems] = useState(6)
  const [loading, setLoading] = useState(false)

  const toggleTag = (tag: PortfolioTag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
    setVisibleItems(6)
  }

  const handleCategoryChange = (category: PortfolioCategory) => {
    setSelectedCategory(category)
    setSelectedTags([])
    setVisibleItems(6)
  }

  // Initial portfolio content with updated categories and tags
  const portfolioItems: PortfolioItem[] = [
    {
      id: 'jerremae-bless-video',
      title: 'Jerremae and Bless | Wedding',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/-U8TeRhjEA4/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/-U8TeRhjEA4',
      description: 'A cinematic wedding film showcasing the beautiful moments of Jerremae and Bless.',
      client: 'Jerremae & Bless',
      year: 2024,
      tags: ['highlights', 'documentary'],
    },
    {
      id: 'jerremae-bless-prewedding',
      title: 'Jerremae and Bless | Pre-Wedding',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/RFYXJcIgn3k/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/RFYXJcIgn3k',
      description: 'Romantic pre-wedding session with Jerremae and Bless in stunning locations.',
      client: 'Jerremae & Bless',
      year: 2024,
      tags: ['pre-wedding', 'documentary'],
    },
    {
      id: 'wedding-sde-1',
      title: 'Same Day Edit | Wedding',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/rSKfW6O2qUw/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/rSKfW6O2qUw',
      description: 'Beautiful same day edit wedding film.',
      client: 'John & Jane',
      year: 2024,
      tags: ['sde', 'highlights'],
    },
    {
      id: 'golf-tournament-sde',
      title: 'Golf Tournament SDE',
      category: 'events',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/golf123/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/golf123',
      description: 'Same day edit coverage of a prestigious golf tournament.',
      client: 'Golf Club Championship',
      year: 2024,
      tags: ['sde', 'sports', 'highlights'],
    },
    {
      id: 'basketball-highlights',
      title: 'Basketball Championship Highlights',
      category: 'events',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/bball456/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/bball456',
      description: 'Dynamic highlights from the regional basketball championship.',
      client: 'Regional Basketball League',
      year: 2024,
      tags: ['sports', 'highlights'],
    },
    {
      id: 'drone-compilation',
      title: 'Aerial Drone Compilation',
      category: 'videos',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/drone789/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/drone789',
      description: 'Stunning aerial footage showcase using drone cinematography.',
      client: 'Various Clients',
      year: 2024,
      tags: ['drone', 'documentary'],
    },
    {
      id: 'corporate-doc',
      title: 'Corporate Brand Documentary',
      category: 'corporate',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/corp012/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/corp012',
      description: 'Professional documentary showcasing company culture and values.',
      client: 'Tech Innovations Inc.',
      year: 2024,
      tags: ['documentary', 'bts'],
    },
    {
      id: 'wedding-drone-shots',
      title: 'Wedding Venue Drone Coverage',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/wedding345/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/wedding345',
      description: 'Beautiful aerial drone shots of wedding venue and ceremony.',
      client: 'Sarah & Michael',
      year: 2024,
      tags: ['drone', 'highlights'],
    },
    {
      id: 'track-day-drone',
      title: 'Track Day Drone Footage',
      category: 'events',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/track678/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/track678',
      description: 'Exciting drone footage from motorsport track day event.',
      client: 'Racing Club',
      year: 2024,
      tags: ['drone', 'sports', 'highlights'],
    },
    {
      id: 'wedding-photos-2',
      title: 'Garden Wedding Photos',
      category: 'weddings',
      type: 'photo',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      description: 'Beautiful garden wedding photography.',
      client: 'Mike & Sarah',
      year: 2024,
      tags: ['documentary'],
    },
    {
      id: 'jerremae-bless-photos',
      title: 'Jerremae and Bless | Wedding Photos',
      category: 'weddings',
      type: 'photo',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      description: 'Beautiful wedding photography capturing the love and joy of Jerremae and Bless special day.',
      client: 'Jerremae & Bless',
      year: 2024,
      tags: ['highlights', 'documentary'],
    },
    {
      id: 'corporate-headshots',
      title: 'Executive Team Headshots',
      category: 'corporate',
      type: 'photo',
      thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
      description: 'Professional corporate headshots for executive team.',
      client: 'Financial Services Corp',
      year: 2024,
      tags: ['bts'],
    },
  ]

  // Two-level filtering: category first, then tags
  const filteredItems = useMemo(() => {
    let results = portfolioItems

    // Level 1: Filter by main category
    if (selectedCategory !== 'all') {
      results = results.filter(item => item.category === selectedCategory)
    }

    // Level 2: Filter by tags (multi-select OR logic)
    if (selectedTags.length > 0) {
      results = results.filter(item =>
        item.tags && selectedTags.some(tag => item.tags!.includes(tag))
      )
    }

    return results
  }, [selectedCategory, selectedTags, portfolioItems])

  // Get available tags for current category
  const availableTags = useMemo(() => {
    const allTags = new Set<PortfolioTag>()

    portfolioItems.forEach(item => {
      if (selectedCategory === 'all' || item.category === selectedCategory) {
        item.tags?.forEach(tag => allTags.add(tag))
      }
    })

    return Array.from(allTags).sort()
  }, [selectedCategory, portfolioItems])

  // Get items to display (lazy loading)
  const displayedItems = filteredItems.slice(0, visibleItems)

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'events', label: 'Events' },
    { id: 'corporate', label: 'Corporate' },
  ]

  const handleLoadMore = () => {
    setLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setVisibleItems(prev => prev + 6)
      setLoading(false)
    }, 500)
  }

  const hasMoreItems = visibleItems < filteredItems.length

  return (
    <section id="portfolio" ref={ref} className="py-24 md:py-32 px-6 md:px-12 portfolio-bg cinematic-portfolio-dark dark:bg-gradient-to-b dark:from-dark-surface dark:to-dark-background light:bg-gradient-to-b light:from-gray-50 light:to-gray-100">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg secondary max-w-2xl mx-auto">
            Explore our collection of visual stories, each one crafted with passion
            and artistic vision.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
                    layout
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id as PortfolioCategory)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 relative ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-amber-500/25 shadow-lg border-2 border-amber-400/50 ring-2 ring-amber-400/20 scale-105'
                  : 'bg-white/5 backdrop-blur-sm text-white/70 hover:bg-white/10 border border-white/10 hover:border-white/20'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Browse by Style */}
        {availableTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="text-center mb-4"
          >
            <h3 className="text-sm uppercase tracking-widest text-white/50 font-medium">
              Browse by Style
            </h3>
          </motion.div>
        )}

        {/* Tag Filters */}
        {availableTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            layout
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {availableTags.map((tag) => {
              const Icon = tagIcons[tag]
              const isSelected = selectedTags.includes(tag)
              return (
                <motion.button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                  className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide transition-all duration-300 flex items-center gap-1.5 relative ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-2 border-amber-400/60 shadow-amber-400/20 shadow-md ring-1 ring-amber-400/30 scale-105'
                      : 'bg-white/5 backdrop-blur-sm text-white/60 hover:bg-white/10 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-white/40'}`} />
                  {tag.replace('-', ' ')}
                </motion.button>
              )
            })}

            {selectedTags.length > 0 && (
              <motion.button
                onClick={() => setSelectedTags([])}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 rounded-full text-xs uppercase tracking-wide text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 bg-white/5 backdrop-blur-sm border border-red-400/20 hover:border-red-400/40"
              >
                Clear Tags
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Active Filters Display */}
        {selectedTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4"
          >
            <span className="text-sm secondary">
              Active filters: {selectedTags.map((tag, index) => {
                const Icon = tagIcons[tag]
                return (
                  <span key={tag} className="inline-flex items-center gap-1 mx-1">
                    <Icon className="w-3 h-3" />
                    {tag.replace('-', '')}
                    {index < selectedTags.length - 1 && ', '}
                  </span>
                )
              })}
            </span>
          </motion.div>
        )}

        {/* Portfolio Grid */}
        <MouseGlowEffect className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
          {displayedItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </MouseGlowEffect>

        {/* Load More Button */}
        {hasMoreItems && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
                        className="text-center"
          >
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-4 gold-gradient text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="secondary text-lg mb-4">
              No items match your current filters.
            </p>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-accent hover:text-accent-hover transition-colors"
              >
                Clear all filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Portfolio
