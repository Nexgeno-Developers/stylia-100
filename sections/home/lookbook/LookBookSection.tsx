'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface LookbookItem {
  id: number
  title: string
  description: string
  image: string
  number: string
}

export const LookbookSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const lookbookItems: LookbookItem[] = [
    {
      id: 1,
      number: '01',
      title: 'Explore Curated Lookbook',
      description:
        "Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Industry's",
      image: '/images/lookbook-1.png',
    },
    {
      id: 2,
      number: '02',
      title: 'Explore Curated Lookbook',
      description:
        "Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Industry's",
      image: '/images/lookbook-2.png',
    },
    {
      id: 3,
      number: '03',
      title: 'Explore Curated Lookbook',
      description:
        'Is Simply Dummy Text Of The Printing And Typesetting Industry.',
      image: '/images/lookbook-1.png',
    },
    {
      id: 4,
      number: '04',
      title: 'Explore Curated Lookbook',
      description:
        "Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Industry's",
      image: '/images/lookbook-2.png',
    },
    {
      id: 5,
      number: '05',
      title: 'Explore Curated Lookbook',
      description:
        'Is Simply Dummy Text Of The Printing And Typesetting Industry.',
      image: '/images/lookbook-1.png',
    },
    {
      id: 6,
      number: '06',
      title: 'Explore Curated Lookbook',
      description:
        "Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Industry's",
      image: '/images/lookbook-2.png',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.number-item', {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      gsap.from('.lookbook-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? lookbookItems.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === lookbookItems.length - 1 ? 0 : prev + 1))
  }

  const handleNumberClick = (index: number) => {
    setActiveIndex(index)
  }

  const nextIndex = activeIndex < lookbookItems.length - 1 ? activeIndex + 1 : 0

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[993px] bg-[#00000012] overflow-hidden"
    >
      <div className="h-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 h-full">
          {/* Column 1: Number Navigation (1 col) */}
          <div className="col-span-1 bg-[#E8E8E8] flex flex-col items-center justify-center gap-8 sm:gap-12 py-8">
            {lookbookItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNumberClick(index)}
                className={`number-item font-kumbh-sans font-bold text-2xl sm:text-3xl lg:text-4xl transition-all duration-500 cursor-pointer ${
                  index === activeIndex
                    ? 'text-black scale-125'
                    : index === activeIndex - 1 || index === activeIndex + 1
                      ? 'text-black scale-100'
                      : 'text-black scale-90'
                }`}
                whileHover={{ scale: 1.2, color: '#000' }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              >
                {item.number}
              </motion.button>
            ))}
          </div>

          {/* Column 2-5: Active Image (4 cols) */}
          <div className="col-span-4 relative flex items-center justify-center bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={`active-${activeIndex}`}
                initial={{ x: 100, opacity: 0, scale: 0.95 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ x: -100, opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.7,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                className="relative w-full h-full"
              >
                <Image
                  src={lookbookItems[activeIndex].image}
                  alt={lookbookItems[activeIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Column 6-9: Center Content (4 cols) */}
          <div className="col-span-4 relative flex flex-col items-start justify-center px-6 lg:px-10">
            {/* Top Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-sm xl:text-base 2xl:text-lg text-black mb-8 font-kumbh-sans font-normal text-left max-w-md leading-195% letter-spacing-0% text-transform-capitalize leading-trim-none capitalize"
                style={{ lineHeight: '162%' }}
              >
                {lookbookItems[activeIndex].description}
              </motion.p>
            </AnimatePresence>

            {/* Main Title */}
            <motion.h2
              className="lookbook-title text-5xl xl:text-6xl 2xl:text-80px font-kumbh-sans font-bold text-black mb-10 leading-tight text-left"
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
            >
              Explore
              <br />
              <span className="font-normal text-5xl xl:text-6xl 2xl:text-80px letter-spacing-0% leading-100% leading-trim-none font-kumbh-sans">
                Curated
              </span>
              <br />
              <span className="font-normal text-5xl xl:text-6xl 2xl:text-80px letter-spacing-0% leading-100% leading-trim-none font-kumbh-sans">
                Lookbook
              </span>
            </motion.h2>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-start gap-6 mb-10">
              <motion.button
                onClick={handlePrevious}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                <ChevronLeft className="w-10 h-10 lg:w-12 lg:h-12 text-black" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                <ChevronRight className="w-10 h-10 lg:w-12 lg:h-12 text-black" />
              </motion.button>
            </div>

            {/* Shop Now Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 text-black font-kumbh-sans font-semibold text-xl lg:text-2xl cursor-pointer text-left"
            >
              <span className="relative">
                Shop Now
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </span>
              <motion.div
                whileHover={{ rotate: 45, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-6 h-6 lg:w-7 lg:h-7" />
              </motion.div>
            </motion.button>
          </div>

          {/* Column 10-12: Next Preview Image (3 cols) - Half Height, Centered */}
          <div className="col-span-3 relative flex items-center justify-center px-4 py-8 mb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={`next-${nextIndex}`}
                initial={{ x: 100, opacity: 0, scale: 0.9 }}
                animate={{
                  x: 0,
                  opacity: 0.7,
                  scale: 1,
                }}
                exit={{ x: -50, opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.7,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                className="relative w-full"
                style={{ height: '50%' }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={lookbookItems[nextIndex].image}
                    alt={lookbookItems[nextIndex].title}
                    fill
                    className="object-contain opacity-100"
                  />
                </div>

                {/* Description - below image */}
                <p className="text-black font-kumbh-sans font-normal text-left max-w-lg absolute bottom-[-18px] left-0">
                  {lookbookItems[nextIndex].description.slice(0, 36)}...
                </p>

                {/* Small number badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute -top-3 -left-3 text-black font-kumbh-sans font-bold text-4xl w-12 h-12 flex items-center justify-center z-10"
                >
                  {lookbookItems[nextIndex].number}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
