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
export const PerfectFitSection: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string>('skin-tone')
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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
      x: isLeftTransition ? '-50%' : '50%', // exit to left if going left, exit to right if going right
      y: -80, // stronger upward curve
      opacity: 0,
      rotateY: isLeftTransition ? -25 : 25, // deeper 3D spin
      scale: 0.9,
      duration: 0.3,
      ease: 'power3.inOut',
      transformOrigin: 'center center',
    })

    // Phase 2: Reset position for new image - position it on the opposite side
    tl.set(container, {
      x: isLeftTransition ? '50%' : '-50%', // position on opposite side for entry
      y: 80,
      opacity: 0,
      rotateY: isLeftTransition ? 25 : -25,
      scale: 0.9,
    })

    // Phase 3: Enter animation with curved path - new image comes in
    tl.to(container, {
      x: 0,
      y: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)', // gives a gentle settle motion
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
    animateImageTransition('left') // Going to previous image (left direction)
  }

  const handleNextImage = () => {
    setDirection('right')
    setCurrentImageIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    )
    animateImageTransition('right') // Going to next image (right direction)
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
    <section className="relative bg-white overflow-hidden py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[900px] gap-8">
          {/* Left Content Side */}
          <div className="flex flex-col justify-between py-14">
            {/* Top Content */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-semibold text-black mb-6 leading-tight font-kumbh-sans"
              >
                Find Your
                <br />
                <span className='font-normal'>Perfect Fit</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="sm:text-lg lg:text-xl text-black font-kumbh-sans font-normal text-lg leading-[180%] max-w-full lg:max-w-[90%]"
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
                  className={`group flex items-center justify-between w-full sm:w-[90%] text-left py-4 cursor-pointer transition-all duration-300 ${
                    activeOption === option.id
                      ? 'text-gray-900 font-semibold'
                      : `${option.color} ${option.hoverColor}`
                  }`}
                >
                  <span className="text-xl sm:text-2xl lg:text-3xl font-medium">
                    {option.title}
                  </span>

                  <motion.div
                    whileHover={{ rotate: 45, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right Image Side with Navigation */}
          <div className="relative" ref={imageContainerRef}>
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
              className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full  hover:bg-white transition-all duration-300 group"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-10 h-10 text-white group-hover:text-black transition-colors" />
            </motion.button>

            {/* Right Navigation Arrow */}
            <motion.button
              onClick={handleNextImage}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full  hover:bg-white transition-all duration-300 group"
              aria-label="Next image"
            >
              <ArrowRight className="w-10 h-10 text-white group-hover:text-black transition-colors" />
            </motion.button>

            {/* Image Counter Indicator */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2"
            >
              {currentImages.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    const direction = idx > currentImageIndex ? 'right' : 'left'
                    setDirection(direction)
                    setCurrentImageIndex(idx)
                    animateImageTransition(direction)
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

/* 
===========================================
INSTALLATION INSTRUCTIONS:
===========================================

1. Install GSAP:
   npm install gsap

2. Install Framer Motion (if not already installed):
   npm install framer-motion

3. Optional - For Lottie animations:
   npm install lottie-react
   
   Then add to button hover states:
   import Lottie from 'lottie-react'
   import arrowAnimation from './arrow-hover.json'

===========================================
ANIMATION BREAKDOWN:
===========================================

1. **GSAP Timeline** (animateImageTransition):
   - Phase 1: Exit with curved path (x, y, rotateY, scale, opacity)
   - Phase 2: Reset position off-screen on opposite side
   - Phase 3: Enter with curved path and settling motion
   - Uses power2 easing for natural, organic motion

2. **3D Transforms**:
   - rotateY creates depth perception
   - Perspective wrapper on container enhances 3D effect
   - Scale changes add visual weight to transitions

3. **Framer Motion**:
   - Handles button interactions and hover states
   - Arrow button scale and position animations
   - Smooth dot indicator transitions

4. **Performance Optimizations**:
   - GSAP uses GPU-accelerated transforms
   - Image preloading with Next.js Image component
   - RequestAnimationFrame timing for smooth 60fps
   - Will-change applied via transform properties

===========================================
CUSTOMIZATION OPTIONS:
===========================================

Adjust timing:
- duration: 0.5 → slower/faster exit
- duration: 0.6 → slower/faster entry

Adjust curve intensity:
- y: -50 → higher/lower arc
- rotateY: 15 → more/less 3D rotation

Adjust easing:
- power2 → power3, power4, elastic, back
- See: https://gsap.com/docs/v3/Eases/

===========================================
OPTIONAL LOTTIE ENHANCEMENTS:
===========================================

For arrow buttons:
<Lottie 
  animationData={arrowHoverAnimation}
  loop={false}
  className="w-6 h-6"
/>

For category buttons:
Add ripple effect or glow animation on click
*/
