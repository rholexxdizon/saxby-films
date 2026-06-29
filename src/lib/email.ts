import emailjs from '@emailjs/browser'
import type { ContactFormData } from '../types'

/**
 * Initialize EmailJS with public key
 */
export const initializeEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  if (publicKey) {
    emailjs.init(publicKey)
  }
}

/**
 * Send contact form email via EmailJS
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

    if (!serviceId || !templateId) {
      console.error('EmailJS configuration missing')
      return {
        success: false,
        message: 'Email service is not properly configured. Please contact us directly.'
      }
    }

    // Prepare email template parameters
    const templateParams = {
      from_name: formData.fullName,
      from_email: formData.email,
      phone_number: formData.phoneNumber,
      event_type: formData.eventType,
      event_date: formData.eventDate,
      budget: formData.budget || 'Not specified',
      message: formData.message,
      to_name: 'Saxby Films',
      'g-recaptcha-response': formData.captcha,
    }

    // Send email
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    )

    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you for reaching out to Saxby Films. We received your inquiry and will contact you soon.'
      }
    } else {
      throw new Error('Email send failed')
    }
  } catch (error) {
    console.error('EmailJS Error:', error)
    return {
      success: false,
      message: 'Failed to send your message. Please try again or contact us directly via email or social media.'
    }
  }
}

/**
 * Validate EmailJS configuration
 */
export const validateEmailJSConfig = (): { isValid: boolean; missingKeys: string[] } => {
  const missingKeys: string[] = []

  if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) {
    missingKeys.push('VITE_EMAILJS_SERVICE_ID')
  }
  if (!import.meta.env.VITE_EMAILJS_TEMPLATE_ID) {
    missingKeys.push('VITE_EMAILJS_TEMPLATE_ID')
  }
  if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
    missingKeys.push('VITE_EMAILJS_PUBLIC_KEY')
  }

  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  }
}
