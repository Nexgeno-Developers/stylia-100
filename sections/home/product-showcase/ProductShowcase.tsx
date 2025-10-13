'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
} from 'lucide-react'
import Image from 'next/image'
import gsap from 'gsap'

interface ProductColor {
  id: string
  name: string
  hex: string
  image: string
}

interface ProductData {
  id: number
  title: string
  subtitle: string
  description: string
  originalPrice: number
  discountedPrice: number
  rating: number
  reviewCount: number
  colors: ProductColor[]
  sizes: string[]
  signature: string
}

export const ProductShowcase: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [isHovering, setIsHovering] = useState(false)

  const imageRef = useRef<HTMLDivElement>(null)
  const signatureRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const productData: ProductData = {
    id: 1,
    title: 'Lorem Ipsum Is Placeholder',
    subtitle: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing',
    description: 'Elit, Sed Do',
    originalPrice: 33000,
    discountedPrice: 33000,
    rating: 4.8,
    reviewCount: 350,
    signature: '/images/product-showcase/logo.png',
    colors: [
      {
        id: 'red',
        name: 'Red',
        hex: '#BE091C',
        image: '/images/product-showcase/product-1.png',
      },
      {
        id: 'beige',
        name: 'Beige',
        hex: '#933E3E',
        image: '/images/product-showcase/product-1.png',
      },
      {
        id: 'teal',
        name: 'Teal',
        hex: '#1C5C5B',
        image: '/images/product-showcase/product-1.png',
      },
      {
        id: 'blue',
        name: 'Blue',
        hex: '#171855',
        image: '/images/product-showcase/product-1.png',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  }

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current) return
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window

        const xPos = (clientX / innerWidth - 0.5) * 30
        const yPos = (clientY / innerHeight - 0.5) * 30

        gsap.to(signatureRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
        })
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Image hover effect
  useEffect(() => {
    if (!imageRef.current) return

    if (isHovering) {
      gsap.to(imageRef.current, {
        scale: 1.05,
        rotation: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
    } else {
      gsap.to(imageRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }, [isHovering])

  const handleColorChange = (index: number) => {
    setSelectedColor(index)
  }

  const handlePrevious = () => {
    setSelectedColor((prev) =>
      prev === 0 ? productData.colors.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setSelectedColor((prev) =>
      prev === productData.colors.length - 1 ? 0 : prev + 1
    )
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen lg:h-[1100px] 2xl:h-[1267px] overflow-hidden bg-[#550000]"
    >
      {/* Circular White Smoke Effect - Middle Only */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[800px] rounded-full bg-white opacity-10 blur-3xl"></div>
      </div>

      {/* Signature Background - Full Section Width, Behind Everything */}
      <div
        ref={signatureRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative w-[60%] h-[60%]"
        >
          <Image
            src={productData.signature}
            alt="Signature"
            fill
            className="object-contain brightness-0 invert opacity-100"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>
      </div>

      <div
        className="relative h-full max-w-[1440px] mx-auto"
        style={{ zIndex: 2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          {/* Left Section - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-between h-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 pb-12 lg:pb-20"
          >
            {/* Title Block - Stays at Top */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[43px] text-white font-kumbh-sans leading-tight font-semibold capitalize leading-142% letter-spacing-0% leading-trim-none">
                {productData.title}
              </h1>
              <p className="text-base sm:text-lg overflow-x-auto text-white font-kumbh-sans leading-tight font-normal capitalize leading-195% letter-spacing-0% leading-trim-none">
                {productData.subtitle}
              </p>
              <p className="text-sm text-white max-w-lg font-kumbh-sans leading-tight font-normal capitalize leading-195% letter-spacing-0% leading-trim-none">
                {productData.description}
              </p>
            </div>

            {/* Navigation & Rating - Stays at Bottom */}
            <div className="space-y-6">
              {/* Navigation Arrows */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handlePrevious}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                >
                  <ArrowLeft className="w-10 h-10 text-white" />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                >
                  <ArrowRight className="w-10 h-10 text-white" />
                </motion.button>
              </div>

              {/* Rating */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        i < Math.floor(productData.rating)
                          ? 'fill-[#FFD117] text-[#FFD117]   '
                          : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-white/90 text-sm lg:text-lg font-kumbh-sans leading-tight font-normal capitalize leading-195% letter-spacing-0% leading-trim-none pt-2">
                  ({productData.rating} From {productData.reviewCount} Reviews)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Center Section - Product Image (Full Height, No Padding) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative flex items-end justify-center h-full"
          >
            {/* Product Image - Touches Bottom */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor}
                ref={imageRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                className="relative w-full h-full flex items-end justify-center"
              >
                <div className="relative w-full max-w-md lg:max-w-lg h-full">
                  <Image
                    src={productData.colors[selectedColor].image}
                    alt={productData.title}
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Section - Purchase Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-between h-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 pb-12 lg:pb-20"
          >
            {/* Price - Fixed at Top Right */}
            <div className="flex items-center justify-start gap-4 pt-20">
              <span className="text-4xl sm:text-5xl text-white font-kumbh-sans leading-tight font-bold capitalize leading-142% letter-spacing-0% leading-trim-none">
                ₹ {productData.discountedPrice.toLocaleString('en-IN')}
              </span>
              <span className=" text-xl sm:text-2xl lg:text-3xl text-[#FFFFFF4D] line-through font-kumbh-sans leading-tight font-normal capitalize leading-142% letter-spacing-0% leading-trim-none">
                ₹ {productData.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Bottom Section - Colors, Quantity, Sizes, Buttons */}
            <div className="space-y-8">
              {/* Available Colors */}
              <div>
                <h3 className="text-white text-lg font-medium font-kumbh-sans leading-tight capitalize leading-195% letter-spacing-0% leading-trim-none mb-4">
                  Available Color
                </h3>
                <div className="flex items-center gap-3">
                  {productData.colors.map((color, index) => (
                    <motion.button
                      key={color.id}
                      onClick={() => handleColorChange(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 cursor-pointer rounded-full border-2 transition-all duration-300 ${
                        selectedColor === index
                          ? 'border-white scale-110'
                          : 'border-white/40'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-white text-lg font-medium font-kumbh-sans leading-tight capitalize leading-195% letter-spacing-0% leading-trim-none mb-4">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={decrementQuantity}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="hover:bg-white/10 w-10 h-10 hover:text-white hover:rounded-lg  flex items-center justify-center text-xl font-bold transition-all duration-300 cursor-pointer"
                  >
                    <Minus className="w-8 h-10 text-white" />
                  </motion.button>
                  <span className="text-white text-2xl font-medium min-w-[40px] text-center font-kumbh-sans leading-tight capitalize leading-142% letter-spacing-0% leading-trim-none">
                    {quantity}
                  </span>
                  <motion.button
                    onClick={incrementQuantity}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="hover:bg-white/10 w-10 h-10 hover:text-white hover:rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 cursor-pointer"
                  >
                    <Plus className="w-8 h-8 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Available Sizes */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">
                  Available Size
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  {productData.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 font-semibold text-white transition-all duration-300 relative
                        ${selectedSize === size ? 'after:w-full' : 'after:w-0'}
                        after:content-[''] after:absolute after:left-0 after:bottom-0 
                        after:h-[2px] after:bg-white after:transition-all after:duration-300
                        hover:after:w-full cursor-pointer
                        `}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Buy It Now */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#FFFFFF1A] text-white py-4 font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm group cursor-pointer hover:bg-[#FFFFFF33] hover:text-white font-kumbh-sans leading-tight capitalize leading-142% letter-spacing-0% leading-trim-none"
                >
                  Buy it Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                {/* Add to Cart */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black hover:bg-black/60 border-2 border-white/40 hover:border-white/60 text-white py-4 font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm cursor-pointer font-kumbh-sans leading-tight capitalize leading-142% letter-spacing-0% leading-trim-none"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
