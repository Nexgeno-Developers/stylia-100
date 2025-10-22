'use client'

import React, { useRef, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import AnimatedText from '@/components/ui/AnimatedText'
import { useInView } from 'motion/react'
import { useHeader } from '@/lib/contexts/HeaderContext'

export const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, amount: 0.5 })
  const isButtonInView = useInView(buttonRef, { once: true, amount: 0.5 })
  const { setTextColor } = useHeader()

  // Set header text color to black when component mounts
  useEffect(() => {
    setTextColor('black')

    // Reset to white when component unmounts (when navigating away)
    return () => {
      setTextColor('white')
    }
  }, [setTextColor])

  return (
    <section
      className="bg-transparent flex items-center justify-center relative 
  h-[600px] sm:h-[700px] md:h-[800px] lg:h-[850px] 2xl:h-[1000px]"
    >
      <div className="container mx-auto">
        {/* Main Heading Container */}
        <div ref={headingRef} className="mb-8 sm:mb-10 lg:mb-12 text-center">
          {/* First Line - "Defining" */}
          <div className="mb-2 sm:mb-3 lg:mb-4 text-center">
            <AnimatedText
              text="Defining"
              isVisible={isInView}
              className="font-kumbh-sans font-normal text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[45px] leading-[100%] tracking-[0%] text-center"
            />
          </div>

          {/* Second Line - "Elegance" */}
          <div className="mb-1 sm:mb-2 lg:mb-3">
            <AnimatedText
              text="Elegance"
              isVisible={isInView}
              delay={200}
              className="font-kumbh-sans font-bold text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[152.35px] leading-[110%] tracking-[0%] text-center"
            />
          </div>

          {/* Third Line - "Redefining Style." */}
          <div>
            <AnimatedText
              text="Redefining Style."
              isVisible={isInView}
              delay={400}
              className="font-kumbh-sans font-bold text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[152.35px] leading-[110%] tracking-[0%] text-center"
            />
          </div>
        </div>

        {/* Shop Now Button */}
        <div
          ref={buttonRef}
          className="flex justify-center items-center group"
          style={{
            opacity: isButtonInView ? 1 : 0,
            transform: isButtonInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <button
            type="button"
            className="relative z-10 flex justify-center gap-2 items-center 
              text-base sm:text-lg xl:text-[30px] font-sans font-medium 
              px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-full border-2 border-transparent hover:border-2
              text-black cursor-pointer transition-all duration-500 
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:via-gray-900 before:to-black 
              before:-left-full before:w-0 before:transition-all before:duration-700 before:ease-in-out 
              hover:before:left-0 hover:before:w-full hover:text-white hover:border-black"
          >
            <span className="relative z-10 flex items-center gap-2">
              Shop Now
              <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
