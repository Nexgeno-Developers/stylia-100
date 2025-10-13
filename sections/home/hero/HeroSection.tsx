// HeroSection.tsx - Updated
import React from 'react'
import { MotionWrapper } from '@/components/animations/motion-wrapper'
import { ArrowUpRight } from 'lucide-react'

export const HeroSection: React.FC = () => {
  return (
    <MotionWrapper className="hero-section">
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{
          height: '1141px',
          maxWidth: '100vw',
        }}
      >
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
                Discover the {''}
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[100px] font-semibold">
                  Art of Fashion
                </span>
              </span>
            </h1>

            {/* CTA Button */}
            <div className="flex gap-4 justify-center items-center">
              <button className="font-kumbh-sans font-semibold text-base sm:text-lg xl:text-xl uppercase text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-white/20 hover:border-white/40">
                Shop Now
                <ArrowUpRight className="w-5 h-5 text-white group-hover:scale-110 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  )
}

// Optional: Add this to your global CSS or tailwind config for custom font sizes
// @layer utilities {
//   @media (min-width: 1536px) {
//     .text-100px {
//       font-size: 100px;
//       line-height: 1;
//     }
//   }
// }
