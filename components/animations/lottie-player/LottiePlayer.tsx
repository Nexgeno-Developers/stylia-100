'use client'

import React from 'react'
import { lottieAnimations } from '@/lib/animations'

interface LottiePlayerProps {
  animation: keyof typeof lottieAnimations
  width?: number
  height?: number
  className?: string
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({
  animation,
  width = 200,
  height = 200,
  className,
}) => {
  const animationConfig = lottieAnimations[animation]

  return (
    <div className={className}>
      <div
        className="lottie-container"
        style={{ width, height }}
        data-animation-path={animationConfig.path}
        data-loop={animationConfig.loop}
        data-autoplay={animationConfig.autoplay}
      >
        {/* Lottie animation will be loaded here */}
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading animation...</span>
        </div>
      </div>
    </div>
  )
}
