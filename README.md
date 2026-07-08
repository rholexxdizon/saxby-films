# Saxby Films - Premium Cinematic Website

## Link - https://saxby-films.pages.dev/

A modern, premium website for Saxby Films featuring WebGL-powered visuals, smooth animations, and exceptional performance. Built with React, TypeScript, and cutting-edge web technologies.

## Features

### ✨ Visual Excellence
- **WebGL Fragment Shader**: Custom shader with domain warping, 2D noise, and liquid morphing effects
- **Smooth Animations**: Framer Motion-powered transitions and parallax effects
- **Glassmorphism Design**: Premium dark-themed UI with glass effects
- **Responsive Design**: Mobile-first approach with perfect tablet and desktop experiences

### 🚀 Performance
- **Lazy Loading**: Portfolio images and videos load on demand
- **Code Splitting**: React.lazy for optimized bundle sizes
- **WebGL Optimization**: Pauses rendering when hero section is off-screen
- **Image Optimization**: WebP format with responsive srcset
- **Performance Monitoring**: Built-in Web Vitals tracking

### 🔒 Security
- **CAPTCHA Protection**: reCAPTCHA integration for form submissions
- **Input Validation**: Client-side validation and sanitization
- **Rate Limiting**: Prevents duplicate form submissions
- **Environment Variables**: Secure API key management

### ♿ Accessibility
- **WCAG AA Compliance**: Full keyboard navigation and screen reader support
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Skip Links**: Quick navigation to main content
- **Focus Management**: Clear focus indicators for interactive elements

### 🤖 AI Chatbot
- **Rule-Based System**: No paid APIs required
- **Lazy Loading**: Only loads when opened
- **Glassmorphism UI**: Premium design with typing animations
- **Smart Escalation**: Redirects complex queries to contact form

## Tech Stack

### Core
- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Vite 6** - Build tool

### Styling & Animation
- **Tailwind CSS v4** - Utility-first CSS
- **Framer Motion** - Animation library

### 3D & WebGL
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F

### Utilities
- **Lenis** - Smooth scroll
- **Lucide React** - Icon library
- **React Intersection Observer** - Viewport detection
- **EmailJS** - Email service
- **React Helmet Async** - SEO management

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/saxby-films.git
   cd saxby-films
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_RECAPTCHA_SITE_KEY=your_site_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the website.

### Building for Production

```bash
npm run build
```

The optimized files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Cloudflare Pages

1. **Connect your repository** to Cloudflare Pages
2. **Configure build settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18+
3. **Set environment variables** in Cloudflare Pages dashboard
4. **Deploy**

The `_headers` and `_redirects` files are already configured for optimal performance and security.

## Project Structure

```
src/
├── assets/              # Static assets (logo, images)
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components (Navigation, Footer)
│   ├── sections/        # Page sections (Hero, Services, Portfolio, etc.)
│   ├── animations/      # WebGL and animation components
│   └── meta/            # SEO components
├── lib/                 # Utility functions (validators, email, performance)
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── contexts/            # React contexts (Theme)
├── App.tsx              # Root component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| First Contentful Paint (FCP) | < 1.8s | ✅ |
| Largest Contentful Paint (LCP) | < 2.5s | ✅ |
| Time to Interactive (TTI) | < 3.5s | ✅ |
| Cumulative Layout Shift (CLS) | < 0.1 | ✅ |
| Lighthouse Score | 90+ | ✅ |

## Key Features Implementation

### WebGL Performance Optimization
The WebGL shader stops rendering when the hero section is not visible:

```typescript
const useWebGLPerformance = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    })
    // ... observe hero section
  }, [])

  return { isVisible }
}
```

### Portfolio Lazy Loading
Initial load: 6 items (4 photos + 2 videos)
- Uses Intersection Observer for viewport detection
- "Load More" adds 6 items per click
- Thumbnail-first approach for Facebook embeds

### Form Security
- Client-side validation for all fields
- Input sanitization to prevent XSS
- CAPTCHA verification before submission
- 30-second rate limiting between submissions

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | Yes |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | Yes |
| `VITE_RECAPTCHA_SITE_KEY` | reCAPTCHA site key | Yes |

## Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Last 2 versions

## Accessibility

- Full keyboard navigation
- Screen reader compatible
- ARIA labels and roles
- Focus indicators
- Skip links
- Semantic HTML
- Color contrast WCAG AA compliant

## SEO

- sitemap.xml
- robots.txt
- Open Graph metadata
- Twitter Card metadata
- Structured data (Schema.org)
- Canonical URLs
- Meta descriptions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

- **Website**: [saxbyfilms.com](https://saxbyfilms.com)
- **Instagram**: [@saxbyfilms](https://www.instagram.com/saxbyfilms)
- **Email**: info@saxbyfilms.com

---

Built with ❤️ for Saxby Films
