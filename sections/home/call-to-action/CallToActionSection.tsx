import React from 'react'
import { MotionWrapper } from '@/components/animations/motion-wrapper'
import { Button } from '@/components/ui'

export const CallToActionSection: React.FC = () => {
  return (
    <MotionWrapper className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Transform Your Wardrobe?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join thousands of satisfied customers who have discovered their
          perfect style with Stylia. Start your fashion journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Shop Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            Browse Collection
          </Button>
        </div>
      </div>
    </MotionWrapper>
  )
}
