'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

export const RedefiningFashionSection: React.FC = () => {
  return (
    // width: 1440;
    // height: 1292;
    // angle: 0 deg;
    // opacity: 1;
    // top: 4173px;

    <section className="relative w-full mx-auto h-[1140px] 2xl:h-[1292px] overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/redefining-fashion-bg.png"
          alt="Modern Fashion"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative h-full w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="h-full flex flex-col justify-center max-w-2xl">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: true }}
            className="text-black mb-6 sm:mb-8 font-kumbh-sans font-normal capitalize"
            style={{
              fontSize: 'clamp(2rem, 5vw, 63.73px)',
              lineHeight: '105%',
              letterSpacing: '0%',
            }}
          >
            Redefining
            <br />
            Modern Fashion
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
            className="text-black mb-8 sm:mb-12 font-kumbh-sans font-normal capitalize max-w-xl"
            style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 18px)',
              lineHeight: '162%',
              letterSpacing: '0%',
            }}
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
            className="group flex items-center gap-3 text-black font-kumbh-sans font-semibold text-xl sm:text-2xl lg:text-3xl cursor-pointer w-fit"
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
              <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
