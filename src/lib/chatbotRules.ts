export interface ChatRule {
  keywords: string[]
  response: string
  suggestions?: string[]
}

export const chatRules: ChatRule[] = [
  {
    keywords: ['price', 'cost', 'rate', 'quote', 'pricing', 'how much', 'budget', 'affordable', 'cheap', 'expensive'],
    response: 'For detailed pricing information and personalized quotes, please message us directly at info@saxbyfilms.com or through our Facebook page. Our packages are flexible and can be customized based on your specific needs and requirements.',
    suggestions: ['Request Quote', 'Contact Us']
  },
  {
    keywords: ['service', 'offer', 'provide', 'what do you do', 'specialize', 'package'],
    response: 'We offer a full range of visual storytelling services including:\n\n• Wedding Photography & Videography\n• Pre-Wedding Sessions\n• Debut Coverage\n• Event Photography & Videography\n• Corporate Events\n• Drone Coverage\n\nEach service is tailored to capture your unique story beautifully.',
    suggestions: ['View Services', 'View Portfolio']
  },
  {
    keywords: ['wedding', 'marriage', 'bride', 'groom', 'ceremony', 'reception'],
    response: 'We would be honored to capture your special day! Our wedding packages include both photography and videography, with options for pre-wedding sessions, same-day edits, and full coverage. Each wedding film is crafted with cinematic excellence.',
    suggestions: ['Wedding Photography', 'Wedding Videography', 'Pre-Wedding Session']
  },
  {
    keywords: ['pre-wedding', 'engagement', 'pre-wed', 'prenuptial', 'couple shoot'],
    response: 'Our pre-wedding sessions are perfect for capturing your love story before the big day! We can shoot at beautiful locations of your choice, creating stunning images and videos that celebrate your journey together.',
    suggestions: ['View Pre-Wedding Portfolio', 'Book a Session']
  },
  {
    keywords: ['debut', '18th birthday', '18th birthday debut', 'coming out', 'debutante'],
    response: 'We specialize in creating stunning debut coverage that captures every precious moment of this milestone celebration. From the grand entrance to the 18 candles and roses, we ensure every detail is beautifully preserved.',
    suggestions: ['Debut Coverage', 'View Portfolio']
  },
  {
    keywords: ['event', 'corporate', 'conference', 'seminar', 'birthday', 'party', 'celebration'],
    response: 'Our event coverage services are perfect for any occasion! Whether it\'s a corporate conference, birthday party, or special celebration, we provide professional photography and videography that captures the essence of your event.',
    suggestions: ['Event Photography', 'Event Videography']
  },
  {
    keywords: ['drone', 'aerial', 'flyover', 'sky', 'aerial shot', 'bird\'s eye'],
    response: 'Yes, we offer professional drone coverage! Our licensed and experienced drone operators capture breathtaking aerial footage that adds a spectacular perspective to your event. Weather conditions and venue permissions are considered for all drone shoots.',
    suggestions: ['Drone Coverage', 'Contact Us']
  },
  {
    keywords: ['book', 'reserve', 'schedule', 'how to book', 'availability', 'date'],
    response: 'To book our services, please message us directly through:\n\n📧 Email: info@saxbyfilms.com\n📘 Facebook: Saxby Films\n\nWe recommend booking as early as possible, especially for weddings during peak season (6-12 months advance notice). We\'ll respond within 24-48 hours to discuss availability.',
    suggestions: ['Send Email', 'Message on Facebook']
  },
  {
    keywords: ['delivery', 'turnaround', 'how long', 'wait', 'processing time', 'when will i get'],
    response: 'Delivery times vary by service:\n\n• Photos: 4-8 weeks (weddings), 2-4 weeks (events)\n• Videos: 8-12 weeks (weddings), 4-6 weeks (events)\n• Same Day Edit: Delivered at the event\n• Sneak peeks: Within 1 week\n\nWe prioritize quality while working efficiently!',
    suggestions: ['Contact Us for Timeline']
  },
  {
    keywords: ['payment', 'terms', 'condition', 'policy', 'down payment', 'deposit'],
    response: 'Our payment terms are flexible and can be discussed during our consultation. We typically require a reservation fee to secure your date, with the balance due upon completion. For specific details, please contact us directly.',
    suggestions: ['Contact Us', 'Request Terms']
  },
  {
    keywords: ['location', 'where', 'area', 'travel', 'destination'],
    response: 'We are based in Metro Manila, Philippines, but we love to travel! We\'re available for destination weddings and events worldwide. Travel fees apply for locations outside our primary service area.',
    suggestions: ['Wedding Coverage', 'Event Coverage']
  },
  {
    keywords: ['portfolio', 'work', 'sample', 'examples', 'see', 'previous'],
    response: 'We\'d love to show you our work! You can browse our portfolio section on this website, or follow us on Instagram @saxbyfilms for our latest projects and behind-the-scenes content.',
    suggestions: ['View Portfolio', 'Follow on Instagram']
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    response: 'Hi! Welcome to Saxby Films 👋 I\'m here to help answer questions about our services, bookings, and events. What can I assist you with today?',
    suggestions: ['Our Services', 'Wedding Packages', 'Request Quote']
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'helpful'],
    response: 'You\'re welcome! If you have any more questions, feel free to ask. We\'re here to help you capture your perfect moments! 🎉',
    suggestions: ['Contact Us', 'View Portfolio']
  },
  {
    keywords: ['goodbye', 'bye', 'see you', 'take care'],
    response: 'Thank you for chatting with us! We hope to work with you soon. Feel free to reach out anytime via email or Facebook. Have a wonderful day! ✨',
    suggestions: ['Send Email', 'Facebook']
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'social media', 'facebook', 'instagram', 'get in touch', 'contact info'],
    response: `Here's how to reach us:

📧 Email: info@saxbyfilms.com
📞 Phone: +63 9151 676 819
📍 Location: Cavite, Philippines

📸 Social Media:
• Instagram: @saxbyfilms
• Facebook: Saxby Films

We typically respond within 24-48 hours!`,
    suggestions: ['Send Email', 'Facebook', 'Instagram']
  }
]

export const defaultResponse = 'I may not have complete information for that inquiry. For personalized assistance regarding your specific needs, please contact Saxby Films directly via email (info@saxbyfilms.com) or Instagram (@saxbyfilms).'

export const getBotResponse = (userMessage: string): { response: string; suggestions: string[] } => {
  const lowerMessage = userMessage.toLowerCase()

  // Find matching rule
  for (const rule of chatRules) {
    if (rule.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        response: rule.response,
        suggestions: rule.suggestions || []
      }
    }
  }

  // No match found - return default response
  return {
    response: defaultResponse,
    suggestions: ['Send Email', 'Instagram', 'Services']
  }
}

export const welcomeMessage = `Hi! Welcome to Saxby Films 👋

I'm here to help answer questions about our services, bookings, and events.

How can I assist you today?`

export const quickSuggestions = [
  'Our Services',
  'Wedding Packages',
  'Pricing Information',
  'Book a Session',
  'View Portfolio',
  'Contact Us'
]
