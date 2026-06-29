export type PortfolioTag = 'sde' | 'drone' | 'sports' | 'documentary' | 'bts' | 'highlights' | 'pre-wedding'

export type PortfolioCategory = 'all' | 'photos' | 'videos' | 'weddings' | 'events' | 'corporate'

export interface PortfolioItem {
  id: string
  title: string
  category: PortfolioCategory
  type: 'photo' | 'video'
  thumbnail: string
  embedUrl?: string
  description: string
  client?: string
  year?: number
  tags?: PortfolioTag[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  avatar?: string
  rating?: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

export interface ContactFormData {
  fullName: string
  email: string
  phoneNumber: string
  eventType: string
  eventDate: string
  budget?: string
  message: string
  captcha: string
}
