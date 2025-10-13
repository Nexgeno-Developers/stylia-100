'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowUpRight, Heart } from 'lucide-react'
import Image from 'next/image'
import gsap from 'gsap'

interface Product {
  id: number
  name: string
  price: number
  image: string
  bannerImage: string
  liked: boolean
}

export const StyliaDiscoverSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rightScrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const products: Product[] = [
    {
      id: 1,
      name: 'Floral Elegance Co-Ord Set',
      price: 33000,
      image: '/images/stylia-discover-sidebar-one.png',
      bannerImage: '/images/stylia-discover-1.png',
      liked: false,
    },
    {
      id: 2,
      name: 'Chic Floral Co-Ord',
      price: 25500,
      image: '/images/stylia-discover-sidebar-two.png',
      bannerImage: '/images/stylia-discover-2.png',
      liked: false,
    },
    {
      id: 3,
      name: 'Elegant Summer Set',
      price: 28000,
      image: '/images/stylia-discover-sidebar-one.png',
      bannerImage: '/images/stylia-discover-1.png',
      liked: false,
    },
    {
      id: 4,
      name: 'Modern Classic Outfit',
      price: 31000,
      image: '/images/stylia-discover-sidebar-one.png',
      bannerImage: '/images/stylia-discover-1.png',
      liked: false,
    },
  ]

  useEffect(() => {
    const rightScroll = rightScrollRef.current
    if (!rightScroll) return

    const handleScroll = () => {
      const scrollTop = rightScroll.scrollTop
      const itemHeight = rightScroll.scrollHeight / products.length
      const currentIndex = Math.min(
        Math.floor(scrollTop / itemHeight),
        products.length - 1
      )

      if (currentIndex !== activeIndex) {
        setActiveIndex(currentIndex)
      }
    }

    rightScroll.addEventListener('scroll', handleScroll)
    return () => rightScroll.removeEventListener('scroll', handleScroll)
  }, [activeIndex, products.length])

  // Animate background images when activeIndex changes
  useEffect(() => {
    gsap.to('.banner-image', {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        gsap.to(`.banner-image-${activeIndex}`, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        })
      },
    })
  }, [activeIndex])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[1170px] overflow-hidden"
    >
      {/* 1170 */}
      <div className="h-full max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          {/* Left Side - Hero Banner with Changing Images */}
          <div className="relative col-span-9 bg-[#00000012] p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-between overflow-hidden h-full ">
            {/* Background Images - Stacked with Parallax Effect */}
            <div className="absolute inset-0 z-0">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`banner-image banner-image-${index} absolute inset-0 transition-opacity duration-500`}
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                  }}
                >
                  {/* Background Image Layer with depth */}
                  <div className="absolute bottom-0 left-0 w-full h-full">
                    {/* Layer 3 - Farthest (Most Blur) */}
                    <motion.div
                      className="absolute bottom-[20%] left-4 w-[30%] h-[60%] sm:w-[35%] sm:h-[65%] lg:w-[40%] lg:h-[40%]"
                      animate={{
                        y: index === activeIndex ? 0 : 20,
                        opacity: index === activeIndex ? 0.5 : 0,
                        filter: 'blur(4px)',
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <Image
                        src={
                          products[(index + 2) % products.length].bannerImage
                        }
                        alt="Background"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </motion.div>

                    {/* Layer 2 - Middle (Medium Blur) */}
                    <motion.div
                      className="absolute bottom-10 left-[20%] sm:left-[22%] w-[40%] h-[70%] sm:w-[45%] sm:h-[75%] lg:w-[50%] lg:h-[70%]"
                      animate={{
                        y: index === activeIndex ? 0 : 15,
                        opacity: index === activeIndex ? 0.7 : 0,
                        filter: 'blur(4px)',
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                        delay: 0.1,
                      }}
                    >
                      <Image
                        src={
                          products[(index + 1) % products.length].bannerImage
                        }
                        alt="Midground"
                        width={800}
                        height={100}
                        className="object-cover rounded-lg"
                      />
                    </motion.div>

                    {/* Layer 1 - Closest (Sharp) */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-[50%] h-[80%] sm:w-[55%] sm:h-[85%] lg:w-[40%] lg:h-[90%]"
                      animate={{
                        y: index === activeIndex ? 0 : 10,
                        opacity: index === activeIndex ? 1 : 0,
                        scale: index === activeIndex ? 1 : 0.95,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                        delay: 0.2,
                      }}
                    >
                      <Image
                        src={product.bannerImage}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                        priority={index === 0}
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Text Content - Always Visible */}
            <div className="relative z-20 max-w-lg">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl lg:text-35px font-semibold text-black mb-4 sm:mb-6 leading-tight font-kumbh-sans capitalize tracking-normal leading-142% letter-spacing-0% leading-trim-none "
              >
                Where Style Meets Identity
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm sm:text-base lg:text-lg text-black mb-6 sm:mb-8 leading-relaxed font-kumbh-sans font-regular letter-spacing-0% leading-trim-none capitalize tracking-normal leading-180%"
              >
                Stylia Is More Than Fashion—It's A Lifestyle. We Create
                Timeless, Bold, And Elegant Designs
              </motion.p>
            </div>

            {/* Active Product Indicator */}
            <div className="relative z-20 flex gap-2">
              {products.map((_, index) => (
                <motion.div
                  key={index}
                  className="h-1 bg-black/30 rounded-full mb-6"
                  animate={{
                    width: index === activeIndex ? 40 : 8,
                    backgroundColor:
                      index === activeIndex ? '#000' : 'rgba(0,0,0,0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 sm:gap-3 text-black font-semibold text-lg sm:text-xl lg:text-2xl absolute bottom-10 left-10 cursor-pointer"
          >
            <span className="relative">
              Discover Stylia
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
            </span>
            <motion.div
              whileHover={{ rotate: 45, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </motion.div>
          </motion.button>

          {/* Right Side - Scrollable Product List */}
          <div
            ref={rightScrollRef}
            className="col-span-3 bg-white overflow-y-auto h-full snap-y snap-mandatory"
            style={{
              scrollBehavior: 'smooth',
            }}
          >
            <div className="">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: index === activeIndex ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="snap-start"
                  style={{
                    minHeight: `${100 / products.length}vh`,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 w-full `}
                  >
                    {/* Product Image */}
                    <div className="relative h-[200px] sm:h-[300px] lg:h-[365px] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={`object-contain transition-transform duration-700 ${
                          index === activeIndex ? 'scale-100' : 'scale-105'
                        } group-hover:scale-110`}
                      />

                      {/* Like Button */}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 left-4 p-2 sm:p-3 rounded-full hover:bg-white transition-all duration-300 cursor-pointer"
                      >
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 hover:fill-red-500 hover:text-red-500 transition-colors duration-300" />
                      </motion.button>

                      {/* Active Indicator Badge */}
                      {/* {index === activeIndex && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          Featured
                        </motion.div>
                      )} */}
                    </div>

                    {/* Product Info */}
                    <motion.div
                      animate={{
                        backgroundColor:
                          index === activeIndex ? '#ffffff' : '#f9fafb',
                      }}
                      className="p-4 sm:p-6"
                    >
                      <h3 className="text-lg sm:text-xl text-black mb-2 font-kumbh-sans font-medium capitalize tracking-normal leading-142% letter-spacing-0% leading-trim-none">
                        {product.name}
                      </h3>
                      <p className="text-xl sm:text-2xl text-black font-kumbh-sans font-bold capitalize tracking-normal leading-142% letter-spacing-0% leading-trim-none">
                        ₹ {product.price.toLocaleString('en-IN')}
                      </p>
                    </motion.div>

                    {/* Quick View Button */}
                    {/* {index === activeIndex && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-black text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-800 transition-all duration-300 "
                      >
                        Quick View
                      </motion.button>
                    )} */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
