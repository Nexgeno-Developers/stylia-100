'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import AnimatedText from '@/components/ui/AnimatedText'

interface TrendingProduct {
  id: number
  name: string
  price: number
  image: string
  thumbnail: string
}

export const TrendingNowSection: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, amount: 0.5 })

  const trendingProducts: TrendingProduct[] = [
    {
      id: 1,
      name: 'Elegant Sequin Evening',
      price: 25500,
      image: '/images/trending-now-images/image-one.png',
      thumbnail: '/images/svg/dress.svg',
    },
    {
      id: 2,
      name: 'Elegant Sequin Evening',
      price: 25500,
      image: '/images/trending-now-images/image-two.png',
      thumbnail: '/images/svg/dress.svg',
    },
    {
      id: 3,
      name: 'Elegant Sequin Evening',
      price: 25500,
      image: '/images/trending-now-images/image-three.png',
      thumbnail: '/images/svg/dress.svg',
    },
    {
      id: 4,
      name: 'Elegant Sequin Evening',
      price: 25500,
      image: '/images/trending-now-images/image-four.png',
      thumbnail: '/images/svg/dress.svg',
    },
  ]

  return (
    <section className="relative w-full h-full bg-white">
      <div className="px-[4vw] mx-auto h-full">
        <div className="w-full h-full flex flex-col justify-center">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 gap-6">
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 ref={headingRef} className="font-kumbh-sans text-black">
              <span
                className="font-normal text-[5.5vw]"
              >
                <AnimatedText text="Trending" isVisible={isInView} />
              </span>
              <span
                className="font-semibold text-[5.5vw]"
              >
                {' '}
                <AnimatedText text="Now" isVisible={isInView} />
              </span>
            </h2>
          </motion.div>

          {/* Right: Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            viewport={{ once: true }}
            className="font-kumbh-sans font-normal text-black capitalize max-w-lg text-[1.3vw]"
          >
            Handpicked Styles Loved By Our Fashion Community.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="group relative"
            >
              {/* Product Card */}
              <div className="relative overflow-hidden">
                {/* Main Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

                  {/* Hover Effect – Quick View */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <div className="bg-white px-6 py-3 rounded-full shadow-lg text-center pointer-events-none">
                      <p className="font-kumbh-sans font-bold text-[1.4vw] text-black">
                        Quick View
                      </p>
                    </div>
                  </motion.div>

                  {/* Heart Icon - Top Right */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="opacity-0 group-hover:opacity-100 absolute top-4 right-4 transition-all duration-300 z-10 cursor-pointer"
                  >
                    <Heart className="w-5 h-5 text-white hover:fill-red-500 hover:text-red-500 transition-colors duration-300" />
                  </motion.button>

                  {/* Thumbnail - Bottom center */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-10 sm:h-10 bg-white overflow-hidden  border-2 border-white z-10"
                  >
                    <Image
                      src={product.thumbnail}
                      alt={`${product.name} thumbnail`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Product Info Overlay - Bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-6 text-white"
                >
                  <h3 className="font-kumbh-sans font-medium mb-1 capitalize text-[1.4vw] text-center text-transform-capitalize">
                    {product.name}
                  </h3>
                  <p className="font-kumbh-sans font-bold text-[1.6vw] text-transform-capitalize text-center">
                  
                    ₹ {product.price.toLocaleString('en-IN')}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
