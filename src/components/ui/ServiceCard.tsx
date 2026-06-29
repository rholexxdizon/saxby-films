import { motion } from 'framer-motion'
import {
  Camera,
  Video,
  Heart,
  Sparkles,
  Building,
  Plane,
  Zap,
  Users
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

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="cinematic-card rounded-2xl p-6 group"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors"
      >
        <Icon className="w-7 h-7 text-accent" />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-display font-semibold mb-3">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-secondary text-sm leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  )
}

export default ServiceCard
