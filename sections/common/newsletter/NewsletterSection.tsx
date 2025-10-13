// Common sections
import React from 'react'
import { MotionWrapper } from '@/components/animations/motion-wrapper'
import { Input, Button } from '@/components/ui'

export const NewsletterSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
  }

  return (
    <MotionWrapper className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Stay Updated with Latest Trends
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new
          arrivals, exclusive offers, and fashion tips.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </MotionWrapper>
  )
}
