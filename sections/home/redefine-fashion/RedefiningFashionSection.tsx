'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import AnimatedText from '@/components/ui/AnimatedText'

export const RedefiningFashionSection: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, amount: 0.5 })

  return (
    // width: 1440;
    // height: 1292;
    // angle: 0 deg;
    // opacity: 1;
    // top: 4173px;

    <section
      className="relative h-full w-full overflow-hidden flex items-center"
      style={{
        backgroundImage: "url('/images/redefining-fashion-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="h-full flex items-center">
        {/* Content Container - centered */}
        <div className="px-[4vw] text-left">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            ref={headingRef}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: true }}
            className="text-[4.2vw]  text-black mb-6 sm:mb-8 font-kumbh-sans font-normal leading-[5.5vw]">
            <span className="block">
              <AnimatedText text="Redefining" isVisible={isInView} />
            </span>
            <span className="block">
              <AnimatedText text="Modern Fashion" isVisible={isInView} />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            viewport={{ once: true }}
            className="text-[1.3vw] text-black mb-8 sm:mb-12 font-kumbh-sans font-normal capitalize max-w-xl"
          >
            Stylia Is Where Elegance Meets Attitude. Each Design Is Crafted To
            Celebrate Individuality, Confidence,
          </motion.p>

          {/* Shop Now Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 text-black font-kumbh-sans font-semibold text-[1.9vw] cursor-pointer w-fit"
          >
            <span className="relative">
              Shop Now
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-black"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </span>
            <motion.div
              whileHover={{ rotate: 45, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-[2vw] h-[2vw]" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
