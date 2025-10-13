// Validation schemas and utilities
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const phoneRegex = /^\+?[\d\s\-\(\)]+$/
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  return phoneRegex.test(phone)
}

export const validatePassword = (password: string): boolean => {
  return passwordRegex.test(password)
}

export const validateRequired = (
  value: string | number | undefined | null
): boolean => {
  if (typeof value === 'string') return value.trim().length > 0
  if (typeof value === 'number') return !isNaN(value)
  return value !== undefined && value !== null
}

export const validateMinLength = (
  value: string,
  minLength: number
): boolean => {
  return value.length >= minLength
}

export const validateMaxLength = (
  value: string,
  maxLength: number
): boolean => {
  return value.length <= maxLength
}

export const validateRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max
}

// Form validation helpers
export const getFieldError = (
  field: string,
  value: any,
  rules: any
): string | null => {
  if (rules.required && !validateRequired(value)) {
    return `${field} is required`
  }

  if (
    rules.minLength &&
    typeof value === 'string' &&
    !validateMinLength(value, rules.minLength)
  ) {
    return `${field} must be at least ${rules.minLength} characters`
  }

  if (
    rules.maxLength &&
    typeof value === 'string' &&
    !validateMaxLength(value, rules.maxLength)
  ) {
    return `${field} must be no more than ${rules.maxLength} characters`
  }

  if (rules.email && typeof value === 'string' && !validateEmail(value)) {
    return `${field} must be a valid email address`
  }

  if (rules.password && typeof value === 'string' && !validatePassword(value)) {
    return `${field} must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number`
  }

  if (rules.phone && typeof value === 'string' && !validatePhone(value)) {
    return `${field} must be a valid phone number`
  }

  if (
    rules.range &&
    typeof value === 'number' &&
    !validateRange(value, rules.range.min, rules.range.max)
  ) {
    return `${field} must be between ${rules.range.min} and ${rules.range.max}`
  }

  return null
}
