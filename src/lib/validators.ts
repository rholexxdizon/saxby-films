/**
 * Email validation using regex
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Phone number validation (supports international formats)
 */
export const validatePhone = (phone: string): boolean => {
  // Allow digits, spaces, dashes, parentheses, and plus sign
  const phoneRegex = /^\+?[\d\s-()]+$/
  const hasDigits = /\d/.test(phone)
  return phoneRegex.test(phone) && hasDigits && phone.length >= 10
}

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validate all form fields
 */
export const validateFormData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Full Name validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters long')
  }

  // Email validation
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }

  // Phone validation
  if (!data.phoneNumber || !validatePhone(data.phoneNumber)) {
    errors.push('Please enter a valid phone number')
  }

  // Event Type validation
  if (!data.eventType || data.eventType.trim().length < 2) {
    errors.push('Please enter your event type')
  }

  // Event Date validation
  if (!data.eventDate) {
    errors.push('Please select your event date')
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }

  // Budget is optional, but if provided, should be valid
  if (data.budget && data.budget.trim().length > 0 && data.budget.trim().length < 2) {
    errors.push('Budget information is too short')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Sanitize all form data
 */
export const sanitizeFormData = (data: any): any => {
  const sanitized: any = {}

  for (const key in data) {
    if (typeof data[key] === 'string') {
      sanitized[key] = sanitizeInput(data[key].trim())
    } else {
      sanitized[key] = data[key]
    }
  }

  return sanitized
}

/**
 * Check if submission is rate limited (prevent duplicate submissions)
 */
export const checkRateLimit = (
  lastSubmitTime: number | null,
  cooldownPeriod: number = 30000
): { canSubmit: boolean; remainingTime?: number } => {
  if (!lastSubmitTime) {
    return { canSubmit: true }
  }

  const now = Date.now()
  const timeSinceLastSubmit = now - lastSubmitTime

  if (timeSinceLastSubmit < cooldownPeriod) {
    const remainingTime = Math.ceil((cooldownPeriod - timeSinceLastSubmit) / 1000)
    return {
      canSubmit: false,
      remainingTime,
    }
  }

  return { canSubmit: true }
}

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1,3})(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    return `+${match[1]} ${match[2]}-${match[3]}-${match[4]}`
  }

  return phone
}
