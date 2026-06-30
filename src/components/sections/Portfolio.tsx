import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clapperboard, Plane, Trophy, BookOpen, Film, Sparkles, Heart, Music } from 'lucide-react'
import PortfolioCard from '@components/ui/PortfolioCard'
import AlbumCard from '@components/ui/AlbumCard'
import GalleryModal from '@components/ui/GalleryModal'
import MouseGlowEffect from '@components/ui/MouseGlowEffect'
import type { PortfolioCategory, PortfolioItem, PortfolioTag } from '../../types'

// Load all portfolio images using Vite glob
const portfolioImages = import.meta.glob('../../assets/portfolio/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
})

// Helper function to get image URL
const getImageUrl = (basePath: string, imageNumber: number): string => {
  const imagePath = `../../assets/portfolio/${basePath}/image-${imageNumber}.jpg`
  return portfolioImages[imagePath] as string || imagePath
}

// Helper function to generate image paths
const generateGalleryImages = (basePath: string, count: number): string[] => {
  return Array.from({ length: count }, (_, i) => getImageUrl(basePath, i + 1))
}

// Tag icon mapping
const tagIcons: Record<PortfolioTag, React.ComponentType<{ className?: string }>> = {
  sde: Clapperboard,
  drone: Plane,
  sports: Trophy,
  documentary: BookOpen,
  bts: Film,
  highlights: Sparkles,
  'pre-wedding': Heart,
  'music-video': Music,
}

const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [ref, inView] = useInView({
    threshold: isMobile ? 0.05 : 0.2,
    triggerOnce: false,
  })

  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('all')
  const [selectedTags, setSelectedTags] = useState<PortfolioTag[]>([])
  const [visibleItems, setVisibleItems] = useState(6)
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

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

  const handleOpenGallery = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsGalleryOpen(true)
  }

  const handleCloseGallery = () => {
    setIsGalleryOpen(false)
    setSelectedItem(null)
  }

  // Animation variants for staggered grid
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const portfolioItems: PortfolioItem[] = [
    // EVENTS CATEGORY
    {
      id: 'olivia-rodrigo-bts',
      title: 'Olivia Rodrigo - GUTS World Tour (Manila)',
      category: 'events',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/c2f8q0wwYyE/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/c2f8q0wwYyE',
      videoUrl: 'https://www.youtube.com/watch?v=c2f8q0wwYyE',
      description: 'American Express helped Olivia Rodrigo make her dream of bringing the GUTS World Tour to the Philippines a reality. The sold-out Manila show was the largest crowd Olivia has ever played for!',
      client: 'Olivia Rodrigo / American Express',
      year: 2024,
      tags: ['bts'],
    },
    {
      id: 'rhodessa-ano-ba-talaga-tayo',
      title: 'Rhodessa - Ano Ba Talaga Taya? (Official Music Video)',
      category: 'videos',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/e8G1y4aASck/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/e8G1y4aASck',
      videoUrl: 'https://www.youtube.com/watch?v=e8G1y4aASck',
      description: 'The Official Music Video of "ano ba talaga tayo?" by Rhodessa',
      client: 'Rhodessa',
      year: 2024,
      tags: ['music-video'],
    },
    {
      id: 'rhodessa-kiss',
      title: 'Rhodessa - Kiss (Official Music Video)',
      category: 'videos',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/VqtK6Au0E3E/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/VqtK6Au0E3E',
      videoUrl: 'https://www.youtube.com/watch?v=VqtK6Au0E3E',
      description: 'The Official Music Video of "Kiss" by Rhodessa',
      client: 'Rhodessa',
      year: 2024,
      tags: ['music-video'],
    },
    {
      id: 'wilbert-ross-makaluma',
      title: 'Makaluma - Wilbert Ross (Official Music Video)',
      category: 'videos',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/_M1cupr5uvc/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/_M1cupr5uvc',
      videoUrl: 'https://www.youtube.com/watch?v=_M1cupr5uvc',
      description: 'The Official Music Video of "Makaluma" by Wilbert Ross',
      client: 'Wilbert Ross',
      year: 2024,
      tags: ['music-video', 'highlights'],
    },
    {
      id: 'smile-360-sde',
      title: 'Smile 360 Dental Clinic Kick-off Party 2025 | SDE',
      category: 'corporate',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/mwJXI8I22aE/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/mwJXI8I22aE',
      videoUrl: 'https://www.youtube.com/watch?v=mwJXI8I22aE',
      description: "Here's the Same-day-edit video of the unforgettable Kick-Off Party of Smile 360 Dental Clinic!",
      client: 'Smile 360 Dental Clinic',
      year: 2025,
      tags: ['sde'],
    },
    {
      id: 'rosas-drone-compilation',
      title: 'ROSAS | Drone Compilation',
      category: 'events',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/QeOmceQAKeg/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/QeOmceQAKeg',
      videoUrl: 'https://www.youtube.com/watch?v=QeOmceQAKeg',
      description: 'Aerial shots during Leni-Kiko campaign rallies.',
      client: 'ROSAS Campaign',
      year: 2022,
      tags: ['drone', 'documentary'],
    },
    {
      id: 'showreel-2025',
      title: 'Showreel 2025 by Saxby Dizon',
      category: 'videos',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/9mIYuZcJ6a4/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/9mIYuZcJ6a4',
      videoUrl: 'https://www.youtube.com/watch?v=9mIYuZcJ6a4',
      description: 'Wrapping up 2025 with this showreel. Grateful to all the studios and teams who trusted me and made these projects possible. On to bigger stories.',
      client: 'Saxby Films',
      year: 2025,
      tags: ['highlights', 'documentary'],
    },

    // WEDDING ALBUMS
    {
      id: 'jerremae-bless-wedding-album',
      title: 'Jerremae and Bless | Wedding Day',
      category: 'weddings',
      type: 'album',
      thumbnail: getImageUrl('weddings/jerremae-bless/gallery', 1),
      description: 'A beautiful wedding album capturing the special moments of Jerremae and Bless.',
      client: 'Jerremae & Bless',
      year: 2024,
      tags: ['highlights', 'documentary'],
      galleryImages: generateGalleryImages('weddings/jerremae-bless/gallery', 12),
    },
    {
      id: 'alfred-sheila-wedding-album',
      title: 'Alfred and Sheila | Wedding Day',
      category: 'weddings',
      type: 'album',
      thumbnail: getImageUrl('weddings/alfred-sheila', 1),
      description: 'A beautiful wedding album capturing the special moments of Alfred and Sheila.',
      client: 'Alfred & Sheila',
      year: 2024,
      tags: ['highlights', 'documentary'],
      galleryImages: generateGalleryImages('weddings/alfred-sheila', 12),
    },
    {
      id: 'ronnan-carren-wedding-album',
      title: 'Ronnan and Carren | Wedding Day',
      category: 'weddings',
      type: 'album',
      thumbnail: getImageUrl('weddings/ronnan-carren/gallery', 1),
      description: 'A beautiful wedding album capturing the special moments of Ronnan and Carren.',
      client: 'Ronnan & Carren',
      year: 2024,
      tags: ['highlights', 'documentary'],
      galleryImages: generateGalleryImages('weddings/ronnan-carren/gallery', 12),
    },
    {
      id: 'gilbert-niescee-wedding-album',
      title: 'Gilbert and Niescee | Wedding Day',
      category: 'weddings',
      type: 'album',
      thumbnail: getImageUrl('weddings/gilbert-niescee', 1),
      description: 'A beautiful wedding album capturing the special moments of Gilbert and Niescee.',
      client: 'Gilbert & Niescee',
      year: 2024,
      tags: ['highlights', 'documentary'],
      galleryImages: generateGalleryImages('weddings/gilbert-niescee', 12),
    },

    // PRE-WEDDING ALBUMS
    {
      id: 'sarah-jecson-prewedding-album',
      title: 'Sarah & Jecson | Pre-Wedding Session',
      category: 'weddings',
      type: 'album',
      thumbnail: getImageUrl('pre-weddings/sarah-jecson', 1),
      description: 'Romantic pre-wedding session with Sarah & Jecson in stunning locations.',
      client: 'Sarah & Jecson',
      year: 2024,
      tags: ['pre-wedding', 'documentary'],
      galleryImages: generateGalleryImages('pre-weddings/sarah-jecson', 12),
    },
    {
      id: 'alfred-sheila-prewedding-album',
      title: 'Alfred and Sheila | Pre-Wedding Session',
      category: 'weddings',
      type: 'album',
      thumbnail: getImageUrl('pre-weddings/alfred-sheila', 1),
      description: 'Romantic pre-wedding session with Alfred and Sheila.',
      client: 'Alfred & Sheila',
      year: 2024,
      tags: ['pre-wedding', 'documentary'],
      galleryImages: generateGalleryImages('pre-weddings/alfred-sheila', 12),
    },
    {
      id: 'mae-bernie-prewedding-album',
      title: 'Mae and Bernie | Pre-Wedding Session',
      category: 'weddings',
      type: 'album',
      thumbnail: getImageUrl('pre-weddings/mae-bernie', 1),
      description: 'Romantic pre-wedding session with Mae and Bernie.',
      client: 'Mae & Bernie',
      year: 2024,
      tags: ['pre-wedding', 'documentary'],
      galleryImages: generateGalleryImages('pre-weddings/mae-bernie', 12),
    },
    {
      id: 'ronnan-carren-prewedding-album',
      title: 'Ronnan and Carren | Pre-Wedding Session',
      category: 'weddings',
      type: 'album',
      thumbnail: getImageUrl('pre-weddings/ronnan-carren', 1),
      description: 'Romantic pre-wedding session with Ronnan and Carren.',
      client: 'Ronnan & Carren',
      year: 2024,
      tags: ['pre-wedding', 'documentary'],
      galleryImages: generateGalleryImages('pre-weddings/ronnan-carren', 12),
    },

    // MUSIC VIDEO ALBUMS
    {
      id: 'rhodessa-music-video-album',
      title: 'Rhodessa Music Video Production',
      category: 'videos',
      type: 'album',
      thumbnail: getImageUrl('music-videos/rhodessa', 1),
      description: 'Behind the scenes and production photos from Rhodessa music videos.',
      client: 'Rhodessa',
      year: 2024,
      tags: ['music-video', 'bts'],
      galleryImages: generateGalleryImages('music-videos/rhodessa', 12),
    },
    {
      id: 'wilbert-ross-music-video-album',
      title: 'Wilbert Ross Music Video Production',
      category: 'videos',
      type: 'album',
      thumbnail: getImageUrl('music-videos/wilbert-ross', 1),
      description: 'Behind the scenes and production photos from Wilbert Ross music video.',
      client: 'Wilbert Ross',
      year: 2024,
      tags: ['music-video', 'bts'],
      galleryImages: generateGalleryImages('music-videos/wilbert-ross', 12),
    },

    // NEW PORTFOLIO ITEMS
    {
      id: 'jerremae-bless-prewedding-film',
      title: 'Jerremae & Bless Pre Wedding Film | 4K',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/-U8TeRhjEA4/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/-U8TeRhjEA4',
      videoUrl: 'https://www.youtube.com/watch?v=-U8TeRhjEA4',
      description: 'Jerremae & Bless Pre-Wedding Film',
      client: 'Jerremae & Bless',
      year: 2026,
      tags: ['pre-wedding'],
    },
    {
      id: 'ron-carren-prewedding-film',
      title: 'Ron & Carren Pre-Wedding Film | 4K',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/RFYXJcIgn3k/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/RFYXJcIgn3k',
      videoUrl: 'https://www.youtube.com/watch?v=RFYXJcIgn3k',
      description: 'Ron & Carren Pre-Wedding Film',
      client: 'Ron & Carren',
      year: 2026,
      tags: ['pre-wedding'],
    },
    {
      id: 'alfred-sheila-wedding-sde',
      title: 'Alfred & Sheila Wedding SDE',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/rSKfW6O2qUw/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/rSKfW6O2qUw',
      videoUrl: 'https://www.youtube.com/watch?v=rSKfW6O2qUw',
      description: 'The Wedding of Alfred & Sheila 💍',
      client: 'Alfred & Sheila',
      year: 2026,
      tags: ['sde'],
    },
    {
      id: 'sheila-alfred-prewedding-film',
      title: 'Sheila & Alfred Pre Wedding Film | 4K',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/DA_eRRF8GcQ/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/DA_eRRF8GcQ',
      videoUrl: 'https://www.youtube.com/watch?v=DA_eRRF8GcQ',
      description: 'Sheila & Alfred Pre-Wedding Film',
      client: 'Sheila & Alfred',
      year: 2026,
      tags: ['pre-wedding'],
    },
    {
      id: 'showreel-2024',
      title: 'Showreel 2024 by Saxby Films',
      category: 'videos',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/VHPJ7ZQr5AE/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/VHPJ7ZQr5AE',
      videoUrl: 'https://www.youtube.com/watch?v=VHPJ7ZQr5AE',
      description: 'Wrapping up 2024 with this showreel. Grateful to all the studios and teams who trusted us. Thank you!',
      client: 'Saxby Films',
      year: 2024,
      tags: ['highlights'],
    },
    {
      id: 'mae-bernie-wedding-sde',
      title: 'Mae & Bernie Wedding SDE',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/DpMjAWEWWMA/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/DpMjAWEWWMA',
      videoUrl: 'https://www.youtube.com/watch?v=DpMjAWEWWMA',
      description: 'The Wedding of Mae & Bernie 💍',
      client: 'Mae & Bernie',
      year: 2024,
      tags: ['sde'],
    },
    {
      id: 'sarah-jecson-wedding-sde',
      title: 'Sarah & Jecson Wedding SDE',
      category: 'weddings',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/kWBlzXkpftI/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/kWBlzXkpftI',
      videoUrl: 'https://www.youtube.com/watch?v=kWBlzXkpftI',
      description: 'Sarah & Jecson Wedding SDE',
      client: 'Sarah & Jecson',
      year: 2024,
      tags: ['sde'],
    },
    {
      id: 'lg-golf-tournament-sde',
      title: 'LG Golf Tournament 2023 | SDE',
      category: 'events',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/9Q_EwibfyWM/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/9Q_EwibfyWM',
      videoUrl: 'https://www.youtube.com/watch?v=9Q_EwibfyWM',
      description: 'LG Golf Tournament 2023 | SDE',
      client: 'LG',
      year: 2024,
      tags: ['sde'],
    },
    {
      id: 'elyu-governance',
      title: 'Elyu: Governance',
      category: 'corporate',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/HZWDFyXHWoQ/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/HZWDFyXHWoQ',
      videoUrl: 'https://www.youtube.com/watch?v=HZWDFyXHWoQ',
      description: 'All about La Union Governance',
      client: 'La Union Tourism',
      year: 2022,
      tags: ['documentary'],
    },
    {
      id: 'elyu-tourist-spot',
      title: 'Elyu: Tourist Spot',
      category: 'corporate',
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/lGFHN3M4kPM/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/lGFHN3M4kPM',
      videoUrl: 'https://www.youtube.com/watch?v=lGFHN3M4kPM',
      description: 'All about La Union Tourist Spots',
      client: 'La Union Tourism',
      year: 2022,
      tags: ['documentary'],
    },
  ]

  // Custom ordering for "All" filter
  const orderedItems = useMemo(() => {
    if (selectedCategory !== 'all') {
      // Special ordering for weddings category - videos first, then albums
      if (selectedCategory === 'weddings') {
        const videos = portfolioItems.filter(item =>
          item.category === 'weddings' && item.type === 'video'
        )
        const albums = portfolioItems.filter(item =>
          item.category === 'weddings' && item.type === 'album'
        )
        // Order wedding videos: wedding video, pre-wedding, SDE, then others
        const orderedVideos = videos.sort((a, b) => {
          const priority = ['wedding', 'pre-wedding', 'sde']
          const aPriority = priority.findIndex(p =>
            a.tags?.includes(p as PortfolioTag)
          )
          const bPriority = priority.findIndex(p =>
            b.tags?.includes(p as PortfolioTag)
          )
          if (aPriority === -1 && bPriority === -1) return 0
          if (aPriority === -1) return 1
          if (bPriority === -1) return -1
          return aPriority - bPriority
        })
        return [...orderedVideos, ...albums]
      }

      return portfolioItems
    }

    // Define priority order for "All" filter
    const priorityIds = [
      'jerremae-bless-prewedding-film',         // 1. wedding video
      'sarah-jecson-wedding-sde',               // 2. wedding SDE
      'alfred-sheila-wedding-sde',             // 3. wedding SDE
      'olivia-rodrigo-bts',                    // 4. olivia rodrigo bts
      'wilbert-ross-makaluma',                 // 5. makaluma music video
      'smile-360-sde',                         // 6. sde smile 360
    ]

    // Separate items into priority and remaining
    const priorityItems: PortfolioItem[] = []
    const remainingItems: PortfolioItem[] = []

    portfolioItems.forEach(item => {
      const priorityIndex = priorityIds.indexOf(item.id)
      if (priorityIndex !== -1) {
        priorityItems[priorityIndex] = item
      } else {
        remainingItems.push(item)
      }
    })

    // Combine priority items in order, then remaining items
    return [...priorityItems.filter(Boolean), ...remainingItems]
  }, [selectedCategory, portfolioItems])

  // Two-level filtering: category first, then tags
  const filteredItems = useMemo(() => {
    let results = orderedItems

    // Level 1: Filter by main category
    if (selectedCategory !== 'all') {
      // Special handling for 'photos' category - show all album items
      if (selectedCategory === 'photos') {
        results = results.filter(item => item.type === 'album')
      } else {
        results = results.filter(item => item.category === selectedCategory)
      }
    }

    // Level 2: Filter by tags (multi-select OR logic)
    if (selectedTags.length > 0) {
      results = results.filter(item =>
        item.tags && selectedTags.some(tag => item.tags!.includes(tag))
      )

      // Special ordering for SDE tag - put smile-360-sde at the end
      if (selectedTags.includes('sde') && selectedTags.length === 1) {
        const smile360 = results.find(item => item.id === 'smile-360-sde')
        const others = results.filter(item => item.id !== 'smile-360-sde')
        if (smile360) {
          results = [...others, smile360]
        }
      }
    }

    return results
  }, [selectedCategory, selectedTags, orderedItems])

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
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
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
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
                  ? 'gold-gradient text-white shadow-lg shadow-accent/25 border-2 border-accent/50 ring-2 ring-accent/20 scale-105'
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
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
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
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
          {displayedItems.map((item, index) => (
            item.type === 'album' ? (
              <AlbumCard
                key={item.id}
                item={item}
                index={index}
                onOpen={handleOpenGallery}
              />
            ) : (
              <PortfolioCard key={item.id} item={item} index={index} />
            )
          ))}
        </motion.div>
      </MouseGlowEffect>

      {/* Gallery Modal */}
      <GalleryModal
        item={selectedItem}
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
      />

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
