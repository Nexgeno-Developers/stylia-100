import React from 'react'
import { MotionWrapper } from '@/components/animations/motion-wrapper'
import { ArrowUpRight } from 'lucide-react'

export const HeroSection: React.FC = () => {
  return (
    <MotionWrapper className="hero-section">
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: '1141px',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* GIF Background with specific dimensions */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('/images/gif/hero.gif')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 1,
            }}
          />

          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/20 z-10" />

          {/* Content Container */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 text-center px-4 sm:px-6 lg:px-8 w-full pb-12 sm:pb-16 lg:pb-20"
            style={{ maxWidth: '1440px', margin: '0 auto' }}
          >
            <div className="flex flex-col items-center justify-end">
              {/* Main Heading */}
              <h1 className="text-white mb-8 sm:mb-10 lg:mb-12 font-kumbh-sans uppercase leading-tight">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[100px] font-normal mb-2">
                  Discover the{' '}
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[100px] font-semibold">
                    Art of Fashion
                  </span>
                </span>
              </h1>

              {/* Animated Circle Expand CTA Button */}
              <div className="flex gap-4 justify-center items-center group">
                <button
                  type="button"
                  className="relative z-10 flex justify-center gap-2 items-center shadow-xl 
    text-base sm:text-lg xl:text-xl font-kumbh-sans font-semibold uppercase 
    px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-full border-2 border-white 
    text-white cursor-pointer isolation-auto transition-all duration-500 
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-50 before:via-white before:to-gray-50 
    before:-left-full before:w-0 before:transition-all before:duration-700 before:ease-in-out 
    hover:before:left-0 hover:before:w-full hover:text-black hover:border-transparent"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Now
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  )
}
