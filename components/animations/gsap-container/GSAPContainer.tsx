'use client'

import React, { useEffect, useRef } from 'react'
import {
  fadeInAnimation,
  slideInFromLeft,
  slideInFromRight,
} from '@/lib/animations'

interface GSAPContainerProps {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideInLeft' | 'slideInRight'
  delay?: number
  className?: string
}

export const GSAPContainer: React.FC<GSAPContainerProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  className,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // This would integrate with GSAP when the library is installed
    // For now, we'll use CSS transitions as a fallback
    element.style.opacity = '0'
    element.style.transform =
      animation === 'slideInLeft'
        ? 'translateX(-50px)'
        : animation === 'slideInRight'
          ? 'translateX(50px)'
          : 'translateY(20px)'

    const timer = setTimeout(() => {
      element.style.transition = 'all 0.6s ease-out'
      element.style.opacity = '1'
      element.style.transform = 'translateX(0) translateY(0)'
    }, delay)

    return () => clearTimeout(timer)
  }, [animation, delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
