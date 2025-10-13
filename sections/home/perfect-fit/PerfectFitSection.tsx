'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

export const PerfectFitSection: React.FC = () => {
  const [activeOption, setActiveOption] = useState<string | null>(null)

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

  return (
    <section className="relative bg-white overflow-hidden py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[900px]">
          {/* Left Content Side */}
          <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16 xl:p-20">
            {/* Top Content */}

            {/* Style for find your : font-family: Kumbh Sans;
font-weight: 600;
font-style: SemiBold;
font-size: 80px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;

Style for perfect fit : font-family: Kumbh Sans;
font-weight: 600;
font-style: SemiBold;
font-size: 80px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;

 */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-semibold text-black mb-6 leading-tight uppercase font-kumbh-sans"
              >
                Find Your
                <br />
                <span className="font-semibold text-80px letter-spacing-0% leading-100% leading-trim-none font-kumbh-sans">
                  Perfect Fit
                </span>
              </motion.h2>

              {/* font-family: Kumbh Sans;
font-weight: 400;
font-style: Regular;
font-size: 18px;
leading-trim: NONE;
line-height: 180%;
letter-spacing: 0%;
capitalize
 */}

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="sm:text-lg lg:text-xl text-black font-kumbh-sans font-regular text-lg letter-spacing-0% leading-[180%] leading-trim-none capitalize"
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
              className="space-y-6 mt-12 lg:mt-0"
            >
              {shopOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => setActiveOption(option.id)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center justify-between w-full text-left py-4 cursor-pointer transition-all duration-300 ${option.color} ${option.hoverColor}`}
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

          {/* Right Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative lg:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B6F47] to-[#6B5538] m-4 sm:m-6 lg:m-8 xl:m-10 w-[613px] h-[830px]">
              {/* Replace with actual image */}
              <Image
                src="/images/perfect-fit-model.png"
                alt="Fashion Model"
                width={613}
                height={830}
                className="object-cover w-[613px] h-[830px] "
                style={{
                  objectPosition: 'top',
                }}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal/Overlay for Active Option */}
      <AnimatePresence>
        {activeOption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveOption(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                duration: 0.5,
              }}
              className="bg-white rounded-2xl p-8 sm:p-12 max-w-2xl mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                {shopOptions.find((opt) => opt.id === activeOption)?.title}
              </motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 mb-6"
              >
                Discover personalized fashion recommendations tailored just for
                you.
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300"
                onClick={() => setActiveOption(null)}
              >
                Start Shopping
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
