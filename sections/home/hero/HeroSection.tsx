'use client'

import React, { useEffect, useState, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import AnimatedText from '@/components/ui/AnimatedText'
import { useInView } from 'motion/react'
import { useHeader } from '@/lib/contexts/HeaderContext'

interface MotionWrapperProps {
  children: React.ReactNode
  className?: string
}

// Motion wrapper component (simplified version)
const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>
}

// interface AnimatedTextProps {
//   text: string
//   delay?: number
//   className?: string
//   isVisible: boolean
// }

// // Animated text component that splits text into characters
// const AnimatedText: React.FC<AnimatedTextProps> = ({
//   text,
//   delay = 0,
//   className = '',
//   isVisible
// }) => {
//   // Split text into words and characters, preserving spaces
//   const words = text.split(' ')
//   let charIndex = 0

//   return (
//     <span className={className}>
//       {words.map((word, wordIndex) => (
//         <span key={wordIndex} className="inline-block">
//           {word.split('').map((char, idx) => {
//             const currentCharIndex = charIndex++
//             return (
//               <span
//                 key={idx}
//                 className="inline-block"
//                 style={{
//                   transform: isVisible ? 'translateY(0)' : 'translateY(120%)',
//                   opacity: isVisible ? 1 : 0,
//                   transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
//                   transitionDelay: `${delay + currentCharIndex * 30}ms`,
//                 }}
//               >
//                 {char}
//               </span>
//             )
//           })}
//           {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
//         </span>
//       ))}
//     </span>
//   )
// }

export const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, amount: 0.5 })
  const isButtonInView = useInView(buttonRef, { once: true, amount: 0.5 })
  const { setTextColor } = useHeader()

  // Set header text color to white when component mounts
  useEffect(() => {
    setTextColor('white')
  }, [setTextColor])

  return (
    <MotionWrapper className="hero-section h-full w-full">
      <div
        className="relative flex items-center justify-center overflow-hidden h-full w-full "
      >
        <div className="">
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
            className="absolute inset-0 z-20 text-center w-full flex items-end justify-center pb-[3vw]"
            
          >
            <div className="flex flex-col items-center justify-center">
              {/* Main Heading with Letter Animation */}
              <h1
                ref={headingRef}
                className="text-white mb-8 sm:mb-10 lg:mb-12 font-sans leading-tight overflow-hidden"
              >
                <span className="block text-[7vw] font-normal mb-2">
                  <AnimatedText text="Discover the" isVisible={isInView} />{' '}
                  <AnimatedText
                    text="Art of Fashion"
                    className="text-[7vw] font-semibold"
                    isVisible={isInView}
                    delay={400}
                  />
                </span>
              </h1>

              {/* Animated Circle Expand CTA Button */}
              <div
                className="flex gap-4 justify-center items-center group"
                ref={buttonRef}
                style={{
                  opacity: isButtonInView ? 1 : 0,
                  transform: isButtonInView
                    ? 'translateY(0)'
                    : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <button
                  type="button"
                  className="relative z-10 flex justify-center gap-2 items-center 
                    text-[1.8vw] font-sans font-medium 
                    px-[2.5vw] py-[0.8vw] overflow-hidden rounded-full border-2 border-transparent hover:border-2
                    text-white cursor-pointer transition-all duration-500 
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-50 before:via-white before:to-gray-50 
                    before:-left-full before:w-0 before:transition-all before:duration-700 before:ease-in-out 
                    hover:before:left-0 hover:before:w-full hover:text-black hover:border-white"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Now
                    <ArrowUpRight className="w-[2vw] h-[2vw] transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
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
