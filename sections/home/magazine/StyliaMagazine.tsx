// 'use client'

// import React, { useRef, useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import Image from 'next/image'

// interface MagazineCard {
//   id: number
//   title: string
//   image: string
//   category: string
// }

// export const StyliaMagazineSection: React.FC = () => {
//   const magazineCards: MagazineCard[] = [
//     {
//       id: 1,
//       title: 'Bold Stripes',
//       image: '/images/magazine/img1.png',
//       category: 'featured',
//     },
//     {
//       id: 2,
//       title: 'Art Of Style',
//       image: '/images/magazine/img2.png',
//       category: 'featured',
//     },
//     {
//       id: 3,
//       title: 'Effortless Chic',
//       image: '/images/magazine/img3.png',
//       category: 'standard',
//     },
//     {
//       id: 4,
//       title: 'Power Moves',
//       image: '/images/magazine/img4.png',
//       category: 'standard',
//     },
//     {
//       id: 5,
//       title: 'Luxury Details',
//       image: '/images/magazine/img5.png',
//       category: 'standard',
//     },
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   }

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: [0.43, 0.13, 0.23, 0.96],
//       },
//     },
//   }

//   return (
//     <section className="relative w-full bg-[#00000012] overflow-hidden">
//       <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 py-12 sm:py-16">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 sm:mb-12 gap-4"
//         >
//           <h2
//             className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black leading-tight font-kumbh-sans capitalize"
//             style={{ lineHeight: '100%', letterSpacing: '0%' }}
//           >
//             Stylia <span className="font-bold">Magazine</span>
//           </h2>

//           <p
//             className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide font-kumbh-sans capitalize"
//             style={{ lineHeight: '195%', letterSpacing: '0%' }}
//           >
//             Your Front Row Seat To Fashion, Trends & Culture
//           </p>
//         </motion.div>

//         {/* Grid Layout */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-100px' }}
//           className="space-y-6"
//         >
//           {/* Row 1 - Two Large Featured Cards */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {magazineCards
//               .filter((card) => card.category === 'featured')
//               .map((card) => (
//                 <ScratchRevealCard
//                   key={card.id}
//                   card={card}
//                   variants={cardVariants}
//                 />
//               ))}
//           </div>

//           {/* Row 2 - Three Standard Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {magazineCards
//               .filter((card) => card.category === 'standard')
//               .map((card) => (
//                 <ScratchRevealCard
//                   key={card.id}
//                   card={card}
//                   variants={cardVariants}
//                 />
//               ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// interface ScratchRevealCardProps {
//   card: MagazineCard
//   variants: any
// }

// const ScratchRevealCard: React.FC<ScratchRevealCardProps> = ({
//   card,
//   variants,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [isHovering, setIsHovering] = useState(false)
//   const animationFrameRef = useRef<number>(0)
//   const fadeAnimationRef = useRef<number>(0)
//   const lastPositionRef = useRef<{ x: number; y: number } | null>(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext('2d', { willReadFrequently: true })
//     if (!ctx) return

//     // Set canvas size to match container
//     const updateCanvasSize = () => {
//       const container = containerRef.current
//       if (!container) return

//       const rect = container.getBoundingClientRect()
//       const dpr = window.devicePixelRatio || 1

//       canvas.width = rect.width * dpr
//       canvas.height = rect.height * dpr
//       canvas.style.width = `${rect.width}px`
//       canvas.style.height = `${rect.height}px`

//       ctx.scale(dpr, dpr)

//       // Reset canvas - initially white overlay to hide clear image
//       ctx.clearRect(0, 0, rect.width, rect.height)
//       ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
//       ctx.fillRect(0, 0, rect.width, rect.height)
//     }

//     updateCanvasSize()
//     window.addEventListener('resize', updateCanvasSize)

//     return () => {
//       window.removeEventListener('resize', updateCanvasSize)
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current)
//       }
//       if (fadeAnimationRef.current) {
//         cancelAnimationFrame(fadeAnimationRef.current)
//       }
//     }
//   }, [])

//   // Draw reveal effect with smooth continuous path
//   const drawReveal = (x: number, y: number) => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     ctx.globalCompositeOperation = 'destination-out'

//     if (lastPositionRef.current) {
//       // Draw smooth line between last position and current position
//       ctx.beginPath()
//       ctx.moveTo(lastPositionRef.current.x, lastPositionRef.current.y)
//       ctx.lineTo(x, y)
//       ctx.lineWidth = 120 // Double the radius for smooth coverage
//       ctx.lineCap = 'round'
//       ctx.lineJoin = 'round'
//       ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
//       ctx.stroke()
//     } else {
//       // First point - draw a circle
//       ctx.beginPath()
//       ctx.arc(x, y, 60, 0, Math.PI * 2)
//       ctx.fillStyle = 'rgba(255, 255, 255, 1)'
//       ctx.fill()
//     }

//     ctx.globalCompositeOperation = 'source-over'
//     lastPositionRef.current = { x, y }
//   }

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isHovering) return

//     const rect = containerRef.current?.getBoundingClientRect()
//     if (!rect) return

//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top

//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current)
//     }

//     animationFrameRef.current = requestAnimationFrame(() => {
//       drawReveal(x, y)
//     })
//   }

//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (!isHovering) return
//     e.preventDefault()

//     const touch = e.touches[0]
//     const rect = containerRef.current?.getBoundingClientRect()
//     if (!rect) return

//     const x = touch.clientX - rect.left
//     const y = touch.clientY - rect.top

//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current)
//     }

//     animationFrameRef.current = requestAnimationFrame(() => {
//       drawReveal(x, y)
//     })
//   }

//   const handleMouseEnter = () => {
//     setIsHovering(true)
//     lastPositionRef.current = null // Reset position for new scratch session
//   }

//   const handleMouseLeave = () => {
//     setIsHovering(false)
//     // Keep scratched areas visible - don't reset canvas
//   }
//   return (
//     <motion.div
//       variants={variants}
//       className="group relative overflow-hidden bg-neutral-100 cursor-pointer"
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onTouchStart={handleMouseEnter}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleMouseLeave}
//       style={{
//         touchAction: 'none',
//         cursor: 'crosshair',
//         userSelect: 'none',
//         WebkitUserSelect: 'none',
//       }}
//     >
//       {/* Image Container */}
//       <div className="relative aspect-[4/5] w-full overflow-hidden">
//         {/* Base Image */}
//         <motion.div
//           animate={{ scale: isHovering ? 1.03 : 1 }}
//           transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
//           className="relative w-full h-full"
//         >
//           {/* Blurred image layer - always visible */}
//           <Image
//             src={card.image}
//             alt={card.title}
//             fill
//             className="object-cover blur-md"
//             sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           />

//           {/* Clear image layer - revealed through canvas masking */}
//           <Image
//             src={card.image}
//             alt={card.title}
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           />
//         </motion.div>

//         {/* Canvas for scratch reveal effect */}
//         <canvas
//           ref={canvasRef}
//           className="absolute inset-0 w-full h-full pointer-events-none z-10"
//           style={{
//             imageRendering: 'pixelated',
//           }}
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />

//         {/* Title Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-30 pointer-events-none">
//           <motion.h3
//             initial={{ y: 10, opacity: 0.9 }}
//             animate={{
//               y: isHovering ? 0 : 10,
//               opacity: isHovering ? 1 : 0.9,
//             }}
//             transition={{ duration: 0.3, ease: 'easeOut' }}
//             className="text-lg sm:text-2xl lg:text-[35px] font-semibold text-white drop-shadow-lg tracking-wide font-kumbh-sans capitalize text-center"
//             style={{ lineHeight: '142%', letterSpacing: '0%' }}
//           >
//             {card.title}
//           </motion.h3>
//         </div>

//         {/* Reveal hint on first hover */}
//         {!isHovering && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//             className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full z-30 pointer-events-none"
//           >
//             <p className="text-black text-xs font-medium">Scratch to reveal</p>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   )
// }

// export default StyliaMagazineSection
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'

interface MagazineCard {
  id: number
  title: string
  image: string
  category: string
  description?: string
  subtitle?: string
}

export const StyliaMagazineSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null) // shared hover tracking

  const magazineCards: MagazineCard[] = [
    {
      id: 1,
      title: 'Bold Stripes',
      image: '/images/magazine/img1.png',
      category: 'featured',
      description: 'Explore bold modern lines in streetwear fashion.',
      subtitle: 'Editorial',
    },
    {
      id: 2,
      title: 'Art Of Style',
      image: '/images/magazine/img2.png',
      category: 'featured',
      description: 'A look into timeless silhouettes that never fade.',
      subtitle: 'Trends',
    },
    {
      id: 3,
      title: 'Effortless Chic',
      image: '/images/magazine/img3.png',
      category: 'standard',
      description: 'Minimalism meets comfort in perfect harmony.',
      subtitle: 'Inspiration',
    },
    {
      id: 4,
      title: 'Power Moves',
      image: '/images/magazine/img4.png',
      category: 'standard',
      description: 'Bold tailoring that redefines confidence.',
      subtitle: 'Style Tips',
    },
    {
      id: 5,
      title: 'Luxury Details',
      image: '/images/magazine/img5.png',
      category: 'standard',
      description: 'Discover how details elevate every look.',
      subtitle: 'Culture',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  }

  return (
    <section className="relative w-full bg-[#00000012] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 py-12 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 sm:mb-12 gap-4"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black leading-tight font-kumbh-sans capitalize">
            Stylia <span className="font-bold">Magazine</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-500 font-medium tracking-wide font-kumbh-sans capitalize">
            Your Front Row Seat To Fashion, Trends & Culture
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6"
        >
          {/* Row 1 - Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {magazineCards
              .filter((card) => card.category === 'featured')
              .map((card) => (
                <HoverRevealCard
                  key={card.id}
                  card={card}
                  variants={cardVariants}
                  isActive={activeCard === card.id}
                  setActiveCard={setActiveCard}
                />
              ))}
          </div>

          {/* Row 2 - Standard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {magazineCards
              .filter((card) => card.category === 'standard')
              .map((card) => (
                <HoverRevealCard
                  key={card.id}
                  card={card}
                  variants={cardVariants}
                  isActive={activeCard === card.id}
                  setActiveCard={setActiveCard}
                />
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface HoverRevealCardProps {
  card: MagazineCard
  variants: any
  isActive?: boolean
  setActiveCard: (id: number | null) => void
}

const HoverRevealCard: React.FC<HoverRevealCardProps> = ({
  card,
  variants,
  isActive,
  setActiveCard,
}) => {
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imageRef.current || !contentRef.current || !titleRef.current) return

    // Set initial states
    gsap.set(imageRef.current, { height: '100%' })
    gsap.set(contentRef.current, { opacity: 0, y: 30 })
    gsap.set(titleRef.current, { opacity: 1, y: 0 })
  }, [])

  useEffect(() => {
    if (!imageRef.current || !contentRef.current || !titleRef.current) return
    const image = imageRef.current
    const content = contentRef.current
    const title = titleRef.current

    gsap.killTweensOf([image, content, title])

    if (isActive) {
      const tl = gsap.timeline()
      tl.to(
        image,
        {
          clipPath: 'inset(0% 0% 40% 0%)', // Clips bottom 40%
          scale: 1.05,
          duration: 0.7,
          ease: 'power3.out',
        },
        0
      )
        .to(
          content,
          {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
          },
          0
        )
        .to(
          title,
          {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.out',
          },
          0
        )
    } else {
      const tl = gsap.timeline()
      tl.to(
        image,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 0.6,
          ease: 'power3.inOut',
        },
        0
      )
        .to(
          content,
          {
            y: '100%',
            opacity: 0,
            duration: 0.6,
            ease: 'power3.inOut',
          },
          0
        )
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.inOut',
          },
          0.1
        )
    }

    return () => {
      gsap.killTweensOf([image, content, title])
    }
  }, [isActive])

  return (
    <motion.div
      variants={variants}
      className="group relative overflow-hidden bg-neutral-100 cursor-pointer rounded-2xl"
      onMouseEnter={() => setActiveCard(card.id)}
      onMouseLeave={() => setActiveCard(null)}
    >
      {/* Image + Title */}
      <div ref={imageRef} className="w-full h-full overflow-hidden relative">
        <Image
          src={card.image}
          alt={card.title}
          width={1000}
          height={1000}
          className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          ref={titleRef}
          className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-30 pointer-events-none"
        >
          <motion.h3
            initial={{ y: 10, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-lg sm:text-2xl lg:text-[35px] font-semibold text-white drop-shadow-lg tracking-wide font-kumbh-sans capitalize text-center"
          >
            {card.title}
          </motion.h3>
        </div>
      </div>

      {/* Reveal Area */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 w-full h-[40%] bg-white opacity-0 translate-y-6 flex flex-col justify-between p-6 sm:p-8"
      >
        <div className="flex justify-between items-start">
          <p className="text-neutral-700 text-sm sm:text-base font-medium max-w-[50%] font-kumbh-sans">
            {card.description}
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-black font-kumbh-sans">
            {card.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 font-semibold text-right font-kumbh-sans">
          {card.subtitle}
        </p>
      </div>
    </motion.div>
  )
}

export default StyliaMagazineSection
