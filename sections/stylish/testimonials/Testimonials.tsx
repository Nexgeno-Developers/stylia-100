'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import AnimatedText from '@/components/ui/AnimatedText'

interface Testimonial {
  id: number
  name: string
  profession: string
  image: string
  text: string
}

export const TestimonialsSection: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentCardRef = useRef(null)
  const nextCardRef = useRef(null)
  const nextNextCardRef = useRef(null)
  const containerRef = useRef(null)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Denial Jack',
      profession: 'Model',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      text: 'The styling service exceeded all my expectations. Every piece feels custom-made for my personality and lifestyle. Absolutely transformative experience!',
    },
    {
      id: 2,
      name: 'Sarah Anderson',
      profession: 'Fashion Designer',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      text: 'Working with Stylia has transformed my wardrobe completely. The attention to detail and personalized styling recommendations are exceptional!',
    },
    {
      id: 3,
      name: 'Michael Chen',
      profession: 'Entrepreneur',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      text: "The quality and craftsmanship are unmatched. Every piece I've purchased has become a staple in my collection. Highly recommend!",
    },
    {
      id: 4,
      name: 'Emma Williams',
      profession: 'Influencer',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      text: 'Absolutely love the curated selections! The team truly understands modern style and delivers pieces that make you feel confident.',
    },
  ]

  const animateSlide = (direction: 'next' | 'prev') => {
    if (isAnimating) return
    setIsAnimating(true)

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        if (direction === 'next') {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        } else {
          setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
          )
        }
      },
    })

    if (direction === 'next') {
      // Current card slides out to the left
      timeline.to(
        currentCardRef.current,
        {
          x: '-120%',
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        0
      )

      // Next card slides to center
      timeline.to(
        nextCardRef.current,
        {
          left: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        0
      )

      // Next-next card slides to next position
      timeline.to(
        nextNextCardRef.current,
        {
          left: '72%',
          opacity: 0.9,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        0
      )
    } else {
      // Current card slides out to the right
      timeline.to(
        currentCardRef.current,
        {
          x: '120%',
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        0
      )

      // Next card (which is actually previous) slides to center
      timeline.fromTo(
        nextCardRef.current,
        { left: '-70%', opacity: 0 },
        {
          left: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        0
      )

      // Next-next becomes the peek card
      timeline.fromTo(
        nextNextCardRef.current,
        { left: '0%', opacity: 1 },
        {
          left: '72%',
          opacity: 0.9,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        0
      )
    }
  }

  const handleNext = () => {
    animateSlide('next')
  }

  const handlePrev = () => {
    animateSlide('prev')
  }

  const getNextTestimonial = () => {
    return testimonials[(currentIndex + 1) % testimonials.length]
  }

  const getNextNextTestimonial = () => {
    return testimonials[(currentIndex + 2) % testimonials.length]
  }

  const current = testimonials[currentIndex]
  const next = getNextTestimonial()
  const nextNext = getNextNextTestimonial()

  // Reset card positions when index changes
  useEffect(() => {
    if (
      currentCardRef.current &&
      nextCardRef.current &&
      nextNextCardRef.current
    ) {
      gsap.set(currentCardRef.current, { x: '0%', opacity: 1, left: '0%' })
      gsap.set(nextCardRef.current, { left: '72%', opacity: 0.9 })
      gsap.set(nextNextCardRef.current, { left: '144%', opacity: 0.6 })
    }
  }, [currentIndex])

  return (
    <section
      ref={ref}
      className="relative w-full bg-white py-16 sm:py-24 overflow-hidden"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <div className="container mx-auto px-4">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 sm:mb-20 md:mb-24">
          {/* Title - Left */}
          <div className="lg:col-span-8">
            <AnimatedText
              text="Confidence Speaks"
              isVisible={inView}
              className="text-black font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight tracking-tight"
              delay={200}
            />
          </div>

          {/* Description - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6,
            }}
            className="lg:col-span-4 flex items-center justify-start"
          >
            <p className="text-black font-medium text-xl sm:text-2xl md:text-3xl leading-snug capitalize max-w-md">
              Our Customers Wear It — Their Words Say It All.
            </p>
          </motion.div>
        </div>

        {/* Carousel Container - OVERFLOW VISIBLE for next card */}
        <div
          ref={containerRef}
          className="relative w-full mb-12"
          style={{ minHeight: '470px', overflow: 'visible' }}
        >
          <div className="relative" style={{ overflow: 'visible' }}>
            {/* Current Testimonial */}
            <div
              ref={currentCardRef}
              className="absolute top-0 left-0 w-full sm:w-[70%] bg-gray-100 p-8 sm:p-10 border-b-4 border-black h-[468px]"
              style={{ zIndex: 2 }}
            >
              {/* Bottom: Reviewer Info */}
              <div className="flex items-center justify-between pb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full"
                  />
                  <div>
                    <h4 className="text-black font-semibold text-lg sm:text-xl capitalize">
                      {current.name}
                    </h4>
                    <p className="text-gray-600 text-sm capitalize">
                      {current.profession}
                    </p>
                  </div>
                </div>

                <div className="text-6xl sm:text-8xl font-serif text-black/20 hidden sm:block leading-none">
                  "
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="mb-8">
                <p className="text-black text-2xl sm:text-3xl md:text-4xl leading-snug">
                  {current.text}
                </p>
              </div>
            </div>

            {/* Next Testimonial - PEEK OUT */}
            <div
              ref={nextCardRef}
              className="hidden sm:block absolute top-0 left-[65%] w-[70%] bg-gray-100 p-8 md:p-10 border-b-4 border-black h-[468px]"
              style={{ zIndex: 1 }}
            >
              <div className="flex items-center justify-between pb-8">
                <div className="flex items-center gap-4 pt-2">
                  <img
                    src={next.image}
                    alt={next.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full"
                  />
                  <div>
                    <h4 className="text-black font-semibold text-lg sm:text-xl capitalize">
                      {next.name}
                    </h4>
                    <p className="text-gray-600 text-sm capitalize">
                      {next.profession}
                    </p>
                  </div>
                </div>

                <div className="text-6xl md:text-7xl font-serif text-black/20 leading-none">
                  "
                </div>
              </div>

              <div>
                <p className="text-black  text-2xl sm:text-3xl md:text-4xl  leading-snug line-clamp-4">
                  {next.text}
                </p>
              </div>
            </div>

            {/* Next-Next Testimonial - Further Peek */}
            <div
              ref={nextNextCardRef}
              className="hidden sm:block absolute top-0 left-[144%] w-[70%] bg-gray-100 p-8 md:p-10 border-b-4 border-black h-[468px]"
              style={{ zIndex: 0, opacity: 0.6 }}
            >
              <div className="flex items-center justify-between pb-8">
                <div className="flex items-center gap-4 pt-2">
                  <img
                    src={nextNext.image}
                    alt={nextNext.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full"
                  />
                  <div>
                    <h4 className="text-black font-semibold text-lg sm:text-xl capitalize">
                      {nextNext.name}
                    </h4>
                    <p className="text-gray-600 text-sm capitalize">
                      {nextNext.profession}
                    </p>
                  </div>
                </div>

                <div className="text-6xl md:text-7xl font-serif text-black/20 leading-none">
                  "
                </div>
              </div>

              <div>
                <p className="text-black  text-2xl sm:text-3xl md:text-4xl  leading-snug line-clamp-4">
                  {nextNext.text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1 }}
          className="flex justify-center gap-4 mt-16"
        >
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-12 h-12" />
          </button>
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-12 h-12" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
