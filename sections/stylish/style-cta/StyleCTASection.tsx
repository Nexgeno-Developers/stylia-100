'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight } from 'lucide-react'
import AnimatedText from '@/components/ui/AnimatedText'

export const StyleCTASection: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <>
      <section
        ref={ref}
        className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[950px] 2xl:h-[1000px] overflow-hidden font-kumbh-sans"
      >
        {/* Full Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/style-cta-bg.png"
            alt="Style CTA Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Overlay for Better Text Readability : background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
           */}
          <div className="absolute inset-0  bg-gradient-to-b from-transparent to-black/50" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full text-center pb-16">
          {/* "Hey there!" - Small Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-[20px] sm:text-[24px] md:text-[30px] font-medium leading-[100%] mb-4 sm:mb-6"
            style={{ fontFamily: "'Kumbh Sans', sans-serif" }}
          >
            Hey there!
          </motion.p>

          {/* Main Title - Animated */}
          <AnimatedText
            text="Let's Style You Up!"
            isVisible={inView}
            className="text-white font-semibold text-[clamp(40px,8vw,100px)] leading-[100%] tracking-[0%] mb-8 sm:mb-12 md:mb-16"
            delay={200}
          />

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          >
            <button
              type="button"
              className="group relative z-10 flex justify-center gap-2 items-center 
                text-base sm:text-lg xl:text-[30px] font-sans font-medium 
                px-6 sm:px-8 xl:px-10 py-3 sm:py-4 xl:py-5 overflow-hidden rounded-full 
                border-2 border-transparent hover:border-black
                text-white cursor-pointer transition-all duration-500 
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:via-black before:to-black 
                before:-left-full before:w-0 before:transition-all before:duration-700 before:ease-in-out 
                hover:before:left-0 hover:before:w-full hover:text-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Connect Now
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
