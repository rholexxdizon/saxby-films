import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { sendContactEmail } from '../../lib/email'
import { validateFormData, sanitizeFormData, checkRateLimit } from '../../lib/validators'
import { useCursorHover } from '@hooks/useCursorHover'
import CustomDropdown from './CustomDropdown'
import type { ContactFormData } from '../../types'

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    eventType: '',
    eventDate: '',
    budget: '',
    message: '',
    captcha: '',
  })

  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null)

  // Cursor hover effect
  const submitHover = useCursorHover({ text: 'Send' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }))
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check rate limit
    const rateLimitCheck = checkRateLimit(lastSubmitTime, 30000) // 30 seconds
    if (!rateLimitCheck.canSubmit) {
      setSubmitStatus({
        type: 'error',
        message: `Please wait ${rateLimitCheck.remainingTime} seconds before submitting again.`
      })
      return
    }

    // Validate form data
    const validation = validateFormData(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      setSubmitStatus({
        type: 'error',
        message: 'Please fix the errors above before submitting.'
      })
      return
    }

    // Sanitize form data
    const sanitizedData = sanitizeFormData(formData)

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // In a real implementation, you would verify CAPTCHA here
      // For now, we'll proceed with the email sending
      const result = await sendContactEmail(sanitizedData)

      setSubmitStatus({
        type: result.success ? 'success' : 'error',
        message: result.message
      })

      if (result.success) {
        setLastSubmitTime(Date.now())
        // Reset form on success
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          eventType: '',
          eventDate: '',
          budget: '',
          message: '',
          captcha: '',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again or contact us directly.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glassmorphism rounded-2xl p-8">
      <h3 className="text-2xl font-display font-bold mb-6">
        Send Us a Message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 surface-secondary border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors placeholder:text-tertiary"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 surface-secondary border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors placeholder:text-tertiary"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 surface-secondary border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors placeholder:text-tertiary"
            placeholder="+63 912 345 6789"
          />
        </div>

        {/* Event Type & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomDropdown
            label="Event Type"
            value={formData.eventType}
            onChange={(value) => setFormData({ ...formData, eventType: value })}
            options={[
              'Wedding Photography',
              'Wedding Videography',
              'Pre-Wedding Session',
              'Debut Coverage',
              'Event Photography',
              'Event Videography',
              'Corporate Event',
              'Drone Coverage',
              'Other',
            ]}
            placeholder="Select event type"
            className="mb-6"
          />

          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
              Event Date <span className="text-accent">*</span>
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 surface-secondary border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors placeholder:text-tertiary"
            />
          </div>
        </div>

        {/* Budget (Optional) */}
        <CustomDropdown
          label="Budget (Optional)"
          value={formData.budget || ''}
          onChange={(value) => setFormData({ ...formData, budget: value })}
          options={[
            '₱50,000 - ₱100,000',
            '₱100,000 - ₱150,000',
            '₱150,000 - ₱200,000',
            '₱200,000+',
            'Flexible / To be discussed',
          ]}
          placeholder="Select budget range"
          className="mb-6"
        />

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-3 surface-secondary border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none placeholder:text-tertiary"
            placeholder="Tell us about your event, what you're looking for, and any specific requirements..."
          />
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg flex items-start gap-3 ${
                submitStatus.type === 'success'
                  ? 'bg-green-500/20 text-green-200 dark:bg-green-500/10 dark:text-green-300'
                  : 'bg-red-500/20 text-red-200 dark:bg-red-500/10 dark:text-red-300'
              }`}
            >
              {submitStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm">{submitStatus.message}</p>
              </div>
            </motion.div>
          )}

          {errors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-lg bg-red-500/20 text-red-200 dark:bg-red-500/10 dark:text-red-300"
            >
              <ul className="text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          onMouseEnter={submitHover.onMouseEnter}
          onMouseLeave={submitHover.onMouseLeave}
          className="w-full px-8 py-4 gold-gradient text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>

        <p className="text-xs text-secondary text-center">
          By submitting this form, you agree to our privacy policy. We will
          contact you within 24-48 hours.
        </p>
      </form>
    </div>
  )
}

export default ContactForm
