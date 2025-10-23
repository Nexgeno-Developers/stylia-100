'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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
import AnimatedText from '@/components/ui/AnimatedText'

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
  const [currentProduct, setCurrentProduct] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [isHovering, setIsHovering] = useState(false)

  // New state variables for transitions
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionType, setTransitionType] = useState<
    'product' | 'color' | null
  >(null)
  const [nextProductIndex, setNextProductIndex] = useState<number | null>(null)
  const [nextColorIndex, setNextColorIndex] = useState<number | null>(null)

  const signatureRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const buyButtonTextRef = useRef<HTMLSpanElement>(null)
  const buyButtonHoverTextRef = useRef<HTMLSpanElement>(null)
  const buyButtonBgRef = useRef<HTMLSpanElement>(null)

  // New refs for transition images
  const currentImageRef = useRef<HTMLDivElement>(null)
  const nextImageRef = useRef<HTMLDivElement>(null)

  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, amount: 0.5 })

  const productData: ProductData[] = [
    {
      id: 1,
      title: 'Test 1 Lorem Ipsum Is Placeholder',
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
          hex: '#550000',
          image: '/images/product-showcase/product-1.png',
        },
        {
          id: 'beige',
          name: 'Beige',
          hex: '#933E3E',
          image: '/images/product-showcase/product-2.png',
        },
        {
          id: 'teal',
          name: 'Teal',
          hex: '#1C5C5B',
          image: '/images/product-showcase/product-3.png',
        },
        {
          id: 'blue',
          name: 'Blue',
          hex: '#171855',
          image: '/images/product-showcase/product-4.png',
        },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 2,
      title: 'Test 2Lorem Ipsum Is Placeholder',
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
          hex: '#550000',
          image: '/images/product-showcase/product-1.png',
        },
        {
          id: 'beige',
          name: 'Beige',
          hex: '#933E3E',
          image: '/images/product-showcase/product-2.png',
        },
        {
          id: 'teal',
          name: 'Teal',
          hex: '#1C5C5B',
          image: '/images/product-showcase/product-3.png',
        },
        {
          id: 'blue',
          name: 'Blue',
          hex: '#171855',
          image: '/images/product-showcase/product-4.png',
        },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 3,
      title: 'Test 3 Lorem Ipsum Is Placeholder',
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
          hex: '#550000',
          image: '/images/product-showcase/product-1.png',
        },
        {
          id: 'beige',
          name: 'Beige',
          hex: '#933E3E',
          image: '/images/product-showcase/product-2.png',
        },
        {
          id: 'teal',
          name: 'Teal',
          hex: '#1C5C5B',
          image: '/images/product-showcase/product-3.png',
        },
        {
          id: 'blue',
          name: 'Blue',
          hex: '#171855',
          image: '/images/product-showcase/product-4.png',
        },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 4,
      title: 'Test 4 Lorem Ipsum Is Placeholder',
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
          hex: '#550000',
          image: '/images/product-showcase/product-1.png',
        },
        {
          id: 'beige',
          name: 'Beige',
          hex: '#933E3E',
          image: '/images/product-showcase/product-2.png',
        },
        {
          id: 'teal',
          name: 'Teal',
          hex: '#1C5C5B',
          image: '/images/product-showcase/product-3.png',
        },
        {
          id: 'blue',
          name: 'Blue',
          hex: '#171855',
          image: '/images/product-showcase/product-4.png',
        },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
  ]

  // Safety check - if no products, return null
  if (!productData || productData.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">
          Please add product data to the productData array
        </p>
      </div>
    )
  }

  // GSAP animations - Parallax effect
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
    if (!currentImageRef.current || isTransitioning) return

    if (isHovering) {
      gsap.to(currentImageRef.current, {
        scale: 1.05,
        rotation: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
    } else {
      gsap.to(currentImageRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }, [isHovering, isTransitioning])

  // Buy button hover animation
  useEffect(() => {
    const buttonText = buyButtonTextRef.current
    const hoverText = buyButtonHoverTextRef.current
    const bg = buyButtonBgRef.current

    if (!buttonText || !hoverText || !bg) return

    // Set initial positions - removed x offset for center alignment
    gsap.set(hoverText, { y: '-100%', x: '0%', opacity: 0 })
    gsap.set(buttonText, { y: '0%', x: '0%', opacity: 1 })
    gsap.set(bg, { x: '-100%' })

    const handleMouseEnter = () => {
      // Animate background sweep
      gsap.to(bg, {
        x: '0%',
        duration: 0.7,
        ease: 'power2.out',
      })

      // Slide out default text (down)
      gsap.to(buttonText, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      })

      // Slide in hover text (from top to center)
      gsap.to(hoverText, {
        y: '0%',
        x: '0%', // Keep centered
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }

    const handleMouseLeave = () => {
      // Reset background
      gsap.to(bg, {
        x: '-100%',
        duration: 0.7,
        ease: 'power2.out',
      })

      // Slide back default text
      gsap.to(buttonText, {
        y: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      })

      // Slide out hover text (to top, stay centered)
      gsap.to(hoverText, {
        y: '-100%',
        x: '0%', // Keep centered
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }

    const button = buttonText.closest('button')
    if (button) {
      button.addEventListener('mouseenter', handleMouseEnter)
      button.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // Background color change animation (only for product changes, not color changes)
  useEffect(() => {
    if (
      !sectionRef.current ||
      !productData[currentProduct]?.colors[selectedColor] ||
      isTransitioning // Skip during color transitions since we handle it in the timeline
    )
      return

    gsap.to(sectionRef.current, {
      backgroundColor: productData[currentProduct].colors[selectedColor].hex,
      duration: 0.8,
      ease: 'power2.inOut',
    })
  }, [selectedColor, currentProduct, productData, isTransitioning])
  // Product change transition effect (V-shaped motion)
  useEffect(() => {
    if (
      transitionType === 'product' &&
      nextProductIndex !== null &&
      !isTransitioning
    ) {
      console.log(
        '🎬 Starting product transition:',
        currentProduct,
        '->',
        nextProductIndex
      )

      setIsTransitioning(true)

      // Wait for React to render the next image
      setTimeout(() => {
        if (!currentImageRef.current || !nextImageRef.current) {
          console.log('❌ Refs not ready, falling back to instant change')
          setCurrentProduct(nextProductIndex)
          setNextProductIndex(null)
          setTransitionType(null)
          setIsTransitioning(false)
          return
        }

        console.log('✅ Refs ready, starting animation')

        // Set initial position for next image (top-left, off-screen)
        gsap.set(nextImageRef.current, {
          x: '-100%',
          y: '-100%',
          opacity: 0,
          scale: 0.8,
        })

        // Reset current image to ensure it's at starting position
        gsap.set(currentImageRef.current, {
          x: '0%',
          y: '0%',
          opacity: 1,
          scale: 1,
        })

        const tl = gsap.timeline({
          onComplete: () => {
            console.log('✅ Product transition complete')

            // First, update the state
            setCurrentProduct(nextProductIndex)
            setSelectedColor(0) // Reset color for new product

            // Then wait a tiny bit for React to update, then clean up
            setTimeout(() => {
              setNextProductIndex(null)
              setTransitionType(null)
              setIsTransitioning(false)

              // Reset current image position (it now has the "next" image)
              if (currentImageRef.current) {
                gsap.set(currentImageRef.current, {
                  x: '0%',
                  y: '0%',
                  opacity: 1,
                  scale: 1,
                })
              }
            }, 50)
          },
        })

        // Animate both images simultaneously (V-shaped motion)
        tl.to(
          currentImageRef.current,
          {
            x: '100%',
            y: '-100%',
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power3.out',
          },
          0
        ).to(
          nextImageRef.current,
          {
            x: '0%',
            y: '0%',
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          },
          0
        )
      }, 50) // Small delay to ensure React has rendered
    }
  }, [transitionType, nextProductIndex, currentProduct, isTransitioning])

  // Color change transition effect (slide left to right)
  useEffect(() => {
    if (
      transitionType === 'color' &&
      nextColorIndex !== null &&
      !isTransitioning
    ) {
      console.log(
        '🎨 Starting color transition:',
        selectedColor,
        '->',
        nextColorIndex
      )

      setIsTransitioning(true)

      // Wait for React to render the next image
      setTimeout(() => {
        if (!currentImageRef.current || !nextImageRef.current) {
          console.log('❌ Refs not ready, falling back to instant change')
          setSelectedColor(nextColorIndex)
          setNextColorIndex(null)
          setTransitionType(null)
          setIsTransitioning(false)
          return
        }

        console.log('✅ Refs ready, starting color animation')

        // Set initial position for next image (left, off-screen)
        gsap.set(nextImageRef.current, {
          x: '-100vw',
          y: '0%',
          opacity: 0,
          duration: 1,
          scale: 1,
        })

        // Reset current image
        gsap.set(currentImageRef.current, {
          x: '0%',
          y: '0%',
          opacity: 1,
          scale: 1,
        })

        const tl = gsap.timeline({
          onComplete: () => {
            console.log('✅ Color transition complete')

            // First, update the state
            setSelectedColor(nextColorIndex)

            // Then wait a tiny bit for React to update, then clean up
            setTimeout(() => {
              setNextColorIndex(null)
              setTransitionType(null)
              setIsTransitioning(false)

              // Reset current image position
              if (currentImageRef.current) {
                gsap.set(currentImageRef.current, {
                  x: '0%',
                  y: '0%',
                  opacity: 1,
                  scale: 1,
                })
              }
            }, 50)
          },
        })

        // Get the next color for background animation
        const nextColor = productData[currentProduct].colors[nextColorIndex]

        // Animate both images and background color simultaneously (horizontal slide)
        tl.to(
          currentImageRef.current,
          {
            x: '100vw',
            y: '0%',
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          },
          0
        )
          .to(
            nextImageRef.current,
            {
              x: '0%',
              y: '0%',
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            0
          )
          .to(
            sectionRef.current,
            {
              backgroundColor: nextColor.hex,
              duration: 1,
              ease: 'power2.out',
            },
            0
          )
      }, 50)
    }
  }, [transitionType, nextColorIndex, selectedColor, isTransitioning])
  // Reset to first color when product changes
  useEffect(() => {
    setSelectedColor(0)
    setSelectedSize('M')
    setQuantity(1)
  }, [currentProduct])

  const handleColorChange = (index: number) => {
    console.log(
      '🎨 Color change clicked:',
      index,
      'Current:',
      selectedColor,
      'Transitioning:',
      isTransitioning
    )
    if (isTransitioning || index === selectedColor) return
    console.log('✅ Setting up color transition')
    setNextColorIndex(index)
    setTransitionType('color')
  }

  const handlePrevious = () => {
    if (isTransitioning) {
      console.log('⏸️ Transition in progress, ignoring click')
      return
    }
    const newIndex =
      currentProduct === 0 ? productData.length - 1 : currentProduct - 1
    console.log('⬅️ Previous clicked:', newIndex)
    setNextProductIndex(newIndex)
    setTransitionType('product')
  }

  const handleNext = () => {
    if (isTransitioning) {
      console.log('⏸️ Transition in progress, ignoring click')
      return
    }
    const newIndex =
      currentProduct === productData.length - 1 ? 0 : currentProduct + 1
    console.log('➡️ Next clicked:', newIndex)
    setNextProductIndex(newIndex)
    setTransitionType('product')
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const getCurrentImage = () => {
    if (!productData[currentProduct]?.colors[selectedColor]) return ''
    return productData[currentProduct].colors[selectedColor].image
  }

  const getNextImage = () => {
    if (transitionType === 'product' && nextProductIndex !== null) {
      if (!productData[nextProductIndex]?.colors[0]) return ''
      return productData[nextProductIndex].colors[0].image
    }
    if (transitionType === 'color' && nextColorIndex !== null) {
      if (!productData[currentProduct]?.colors[nextColorIndex]) return ''
      return productData[currentProduct].colors[nextColorIndex].image
    }
    return getCurrentImage()
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full xl:h-[1100px] 2xl:h-[1267px] overflow-hidden"
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
          className="relative w-[60%] h-[60%] pt-20"
        >
          <Image
            src={productData[currentProduct].signature}
            alt="Signature"
            fill
            className="object-contain brightness-0 invert opacity-100"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>
      </div>

      <div className="relative h-full container mx-auto" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 h-full gap-6 lg:gap-0">
          {/* Left Section - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-3 flex flex-col justify-between h-full py-8 sm:py-10 lg:py-20"
          >
            {/* Title Block - Stays at Top */}
            <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
              <h1
                ref={headingRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[43px] text-white font-kumbh-sans leading-tight font-semibold"
              >
                <AnimatedText
                  text={productData[currentProduct].title}
                  isVisible={isInView}
                />
              </h1>
              <p className="text-sm sm:text-base lg:text-lg overflow-x-auto text-white font-kumbh-sans leading-tight font-normal capitalize">
                {productData[currentProduct].subtitle}
              </p>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                viewport={{ once: true }}
                className="text-xs sm:text-sm text-white max-w-lg font-kumbh-sans leading-tight font-normal capitalize"
              >
                {productData[currentProduct].description}
              </motion.p>
            </div>

            {/* Navigation & Rating - Stays at Bottom */}
            <div className="space-y-4 sm:space-y-6 mt-8 lg:mt-0">
              {/* Navigation Arrows */}
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.button
                  onClick={handlePrevious}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isTransitioning}
                  className="cursor-pointer disabled:opacity-50"
                >
                  <ArrowLeft className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isTransitioning}
                  className="cursor-pointer disabled:opacity-50"
                >
                  <ArrowRight className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                </motion.button>
              </div>

              {/* Rating */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${
                        i < Math.floor(productData[currentProduct].rating)
                          ? 'fill-[#FFD117] text-[#FFD117]'
                          : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-white/90 text-xs sm:text-sm lg:text-lg font-kumbh-sans leading-tight font-normal capitalize pt-2">
                  ({productData[currentProduct].rating} From{' '}
                  {productData[currentProduct].reviewCount} Reviews)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Center Section - Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-5 relative flex items-end justify-center h-[400px] sm:h-[500px] md:h-[600px] lg:h-full"
          >
            {/* Current Image */}
            <div
              ref={currentImageRef}
              onMouseEnter={() => !isTransitioning && setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="absolute w-full h-full flex items-end justify-center"
              style={{ zIndex: isTransitioning ? 1 : 2 }}
            >
              <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[999px]">
                <Image
                  src={getCurrentImage()}
                  alt={productData[currentProduct].title}
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>

            {/* Next Image (for transitions) */}
            {isTransitioning && (
              <div
                ref={nextImageRef}
                className="absolute w-full h-full flex items-end justify-center"
                style={{ zIndex: 3 }}
              >
                <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[999px]">
                  <Image
                    src={getNextImage()}
                    alt="Next Product"
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Section - Purchase Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-4 flex flex-col justify-between h-full py-8 sm:py-10 lg:py-20"
          >
            {/* Price - Fixed at Top Right */}
            <div className="flex items-center justify-start gap-3 sm:gap-4 lg:pt-20">
              <span className="text-3xl sm:text-4xl lg:text-5xl text-white font-kumbh-sans leading-tight font-bold capitalize">
                ₹{' '}
                {productData[currentProduct].discountedPrice.toLocaleString(
                  'en-IN'
                )}
              </span>
              <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-[#FFFFFF4D] line-through font-kumbh-sans leading-tight font-normal capitalize">
                ₹{' '}
                {productData[currentProduct].originalPrice.toLocaleString(
                  'en-IN'
                )}
              </span>
            </div>

            {/* Bottom Section - Colors, Quantity, Sizes, Buttons */}
            <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              {/* Available Colors */}
              <div>
                <h3 className="text-white text-lg sm:text-xl lg:text-[23px] font-medium font-kumbh-sans leading-tight capitalize mb-3 sm:mb-4">
                  Available Color
                </h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  {productData[currentProduct].colors.map((color, index) => (
                    <motion.button
                      key={color.id}
                      onClick={() => handleColorChange(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isTransitioning}
                      className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 cursor-pointer rounded-full border-2 transition-all duration-300 disabled:opacity-50 ${
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
                <h3 className="text-white text-base sm:text-lg font-medium font-kumbh-sans leading-tight capitalize mb-3 sm:mb-4">
                  Quantity
                </h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.button
                    onClick={decrementQuantity}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="hover:bg-white/10 w-9 h-9 sm:w-10 sm:h-10 hover:text-white hover:rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 cursor-pointer"
                  >
                    <Minus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-10 text-white" />
                  </motion.button>
                  <span className="text-white text-xl sm:text-2xl font-medium min-w-[40px] text-center font-kumbh-sans leading-tight capitalize">
                    {quantity}
                  </span>
                  <motion.button
                    onClick={incrementQuantity}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="hover:bg-white/10 w-9 h-9 sm:w-10 sm:h-10 hover:text-white hover:rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 cursor-pointer"
                  >
                    <Plus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Available Sizes */}
              <div>
                <h3 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Available Size
                </h3>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {productData[currentProduct].sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold text-white transition-all duration-300 relative
                  ${selectedSize === size ? 'after:w-full' : 'after:w-0'}
                  after:content-[''] after:absolute after:left-0 after:bottom-0 
                  after:h-[2px] after:bg-white after:transition-all after:duration-300
                  hover:after:w-full cursor-pointer`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* 🛍️ Buy It Now */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full overflow-hidden flex justify-center items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 
              text-base sm:text-lg font-semibold font-kumbh-sans text-white capitalize 
              backdrop-blur-sm border-2 border-transparent bg-[#FFFFFF1A] 
              transition-all duration-500 cursor-pointer"
                >
                  {/* Hover background sweep (left → right) */}
                  <span
                    ref={buyButtonBgRef}
                    className="absolute inset-0 bg-[#FFFFFF33] z-0"
                  />

                  {/* Text container (handles text swap) */}
                  <span className="relative z-10 overflow-hidden flex items-center justify-center w-full h-6 sm:h-7">
                    <span
                      ref={buyButtonTextRef}
                      className="flex items-center justify-center gap-2 absolute w-full"
                    >
                      Buy it Now
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>

                    <span
                      ref={buyButtonHoverTextRef}
                      className="flex items-center justify-center gap-2 absolute w-full"
                    >
                      Only 2 Left
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </span>
                </motion.button>

                {/* 🛒 Add to Cart */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full overflow-hidden flex justify-center items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 
              text-base sm:text-lg font-semibold font-kumbh-sans text-white capitalize 
              border-2 border-white/40 bg-black hover:text-white 
              transition-all duration-500 backdrop-blur-sm group"
                >
                  {/* Hover overlay (slides left → right) */}
                  <span
                    className="absolute inset-0 bg-white/10 translate-x-[-100%] 
                group-hover:translate-x-0 transition-transform duration-700 ease-out z-0"
                  />

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add to Cart
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
