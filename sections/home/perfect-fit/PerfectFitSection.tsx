'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'
import { gsap } from 'gsap'

// Image data for each category
const imageData = {
  'body-shape': [
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    'https://images.unsplash.com/photo-1517841905240-472988cdbffb',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
  ],
  'skin-tone': [
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7',
  ],
  'height-structure': [
    'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6',
    'https://images.unsplash.com/photo-1473671967197-2df5dc0f4f81',
    'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8',
  ],
}

interface AnimatedTextProps {
  text: string
  delay?: number
  className?: string
  isVisible: boolean
}

// Animated text component that splits text into characters
const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  className = '',
  isVisible,
}) => {
  const words = text.split(' ')
  let charIndex = 0

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, idx) => {
            const currentCharIndex = charIndex++
            return (
              <span
                key={idx}
                className="inline-block"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(120%)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                  transitionDelay: `${delay + currentCharIndex * 30}ms`,
                }}
              >
                {char}
              </span>
            )
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}

export const PerfectFitSection: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string>('skin-tone')
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isHeadingVisible, setIsHeadingVisible] = useState<boolean>(false)

  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  const shopOptions = [
    {
      id: 'body-shape',
      title: 'Shop by Body Shape',
      color: 'text-gray-400',
      hoverColor: 'hover:text-gray-900',
    },
    {
      id: 'skin-tone',
      title: 'Shop by Skin Tone',
      color: 'text-gray-900',
      hoverColor: 'hover:text-black',
    },
    {
      id: 'height-structure',
      title: 'Shop by Height / Structure',
      color: 'text-gray-400',
      hoverColor: 'hover:text-gray-900',
    },
  ]

  // Intersection Observer for heading animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeadingVisible(true)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px',
      }
    )

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current)
      }
    }
  }, [])

  // Get current images based on active option
  const currentImages = imageData[activeOption as keyof typeof imageData]
  const currentImage = currentImages[currentImageIndex]

  // Advanced curved transition using GSAP
  const animateImageTransition = (newDirection: 'left' | 'right') => {
    if (!imageRef.current) return

    const container = imageRef.current
    const isLeftTransition = newDirection === 'left'

    // Create GSAP timeline for complex animation
    const tl = gsap.timeline()

    // Phase 1: Exit animation - current image moves out
    tl.to(container, {
      x: isLeftTransition ? '-50%' : '50%',
      y: -80,
      opacity: 0,
      rotateY: isLeftTransition ? -25 : 25,
      scale: 0.9,
      duration: 0.3,
      ease: 'power3.inOut',
      transformOrigin: 'center center',
    })

    // Phase 2: Reset position for new image
    tl.set(container, {
      x: isLeftTransition ? '50%' : '-50%',
      y: 80,
      opacity: 0,
      rotateY: isLeftTransition ? 25 : -25,
      scale: 0.9,
    })

    // Phase 3: Enter animation with curved path
    tl.to(container, {
      x: 0,
      y: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
    })

    tl.to(
      container,
      {
        filter: 'blur(10px)',
        duration: 0.3,
      },
      '<'
    )

    tl.to(container, { filter: 'blur(0px)', duration: 0.6 }, '>-0.3')
  }

  // Handle navigation arrows
  const handlePrevImage = () => {
    setDirection('left')
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    )
    animateImageTransition('left')
  }

  const handleNextImage = () => {
    setDirection('right')
    setCurrentImageIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    )
    animateImageTransition('right')
  }

  // Handle category change
  const handleCategoryChange = (optionId: string) => {
    if (optionId === activeOption) return

    setActiveOption(optionId)
    setCurrentImageIndex(0)
    setDirection('right')
    animateImageTransition('right')
  }

  return (
    <>   
    
    <section className="relative bg-white overflow-hidden h-full w-full flex items-center">
      <div className="px-[4vw] h-full items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8 w-full">
          {/* Left Content Side */}
          <div className="flex flex-col justify-center">
            {/* Top Content */}
            <div ref={headingRef}>
              <h2 className="text-[5.5vw] font-semibold text-black mb-6 leading-tight font-kumbh-sans overflow-hidden">
                <span className="block">
                  <AnimatedText
                    text="Find Your"
                    isVisible={isHeadingVisible}
                    delay={0}
                    className="font-semibold"
                  />
                </span>
                <span className="block">
                  <AnimatedText
                    text="Perfect Fit"
                    isVisible={isHeadingVisible}
                    delay={300}
                    className="font-normal"
                  />
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                viewport={{ once: true }}
                className="text-[1.3vw] pb-[7vw] text-black font-kumbh-sans font-normal text-lg leading-[180%] max-w-full lg:max-w-[90%]"
              >
                Explore Styles Curated To Complement Your Body Type, Skin Tone,
                And Height — So You Look And Feel Your Best Every Day.
              </motion.p>
            </div>

            {/* Bottom Shop Options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 lg:mt-0"
            >
              {shopOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleCategoryChange(option.id)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center justify-between w-full sm:w-[90%] text-left py-[0.8vw] cursor-pointer transition-all duration-300 ${
                    activeOption === option.id
                      ? 'text-gray-900 font-semibold'
                      : `${option.color} ${option.hoverColor}`
                  }`}
                >
                  <span className="text-[1.8vw] font-medium">
                    {option.title}
                  </span>

                  <motion.div
                    whileHover={{ rotate: 45, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-[2vw] h-[2vw]" />
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right Image Side with Navigation */}
          <div className="relative h-full" ref={imageContainerRef}>
            {/* Image Container with GSAP Animation */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full h-full"
              style={{ perspective: '1000px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B6F47] to-[#6B5538] overflow-hidden">
                <Image
                  key={`${activeOption}-${currentImageIndex}`}
                  src={currentImage}
                  alt={`Fashion Model - ${activeOption}`}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </motion.div>

            {/* Left Navigation Arrow */}
            <motion.button
              onClick={handlePrevImage}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-10 group"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-10 h-10 text-white scale-105 transition-all duration-300" />
            </motion.button>

            {/* Right Navigation Arrow */}
            <motion.button
              onClick={handleNextImage}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-10 group"
              aria-label="Next image"
            >
              <ArrowRight className="w-10 h-10 text-white  scale-105 transition-all duration-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
    </> 
  )
}
