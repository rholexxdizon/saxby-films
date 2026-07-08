import { motion } from 'framer-motion'
import {
  Camera,
  Video,
  Heart,
  Sparkles,
  Building,
  Plane,
  Zap,
  Users,
  ExternalLink
} from 'lucide-react'

const iconMap = {
  Camera,
  Video,
  Heart,
  Sparkles,
  Building,
  Plane,
  Zap,
  Users,
}

interface ServiceCardProps {
  service: {
    id: string
    title: string
    description: string
    icon: keyof typeof iconMap
    externalLink?: string
    isExternal?: boolean
  }
  index: number
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const Icon = iconMap[service.icon] || Camera

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

  const CardContent = () => (
    <>
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
        className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
      >
        <Icon className="w-7 h-7 text-accent" />
      </motion.div>

      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-xl font-display font-semibold">
          {service.title}
        </h3>
        {service.isExternal && (
          <ExternalLink className="w-4 h-4 text-accent" />
        )}
      </div>

      {/* Description */}
      <p className="text-secondary text-sm leading-relaxed">
        {service.description}
      </p>

      {/* External Link Badge */}
      {service.isExternal && (
        <div className="mt-3 text-xs text-accent/80 uppercase tracking-wider">
          Provided by Yellow Mango Studios
        </div>
      )}
    </>
  )

  if (service.isExternal && service.externalLink) {
    return (
      <motion.a
        href={service.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        variants={card}
        whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
        className="cinematic-card rounded-2xl p-6 group block cursor-pointer"
      >
        <CardContent />
      </motion.a>
    )
  }

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
      className="cinematic-card rounded-2xl p-6 group"
    >
      <CardContent />
    </motion.div>
  )
}

export default ServiceCard
