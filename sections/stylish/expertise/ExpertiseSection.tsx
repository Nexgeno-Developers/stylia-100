'use client'

import React, { useRef, useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedText from '@/components/ui/AnimatedText'

interface ListItem {
  text: string
  image: string
}

export const ExpertiseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Smooth cursor tracking
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Spring animation for smooth following with lighter damping
  const springConfig = { damping: 20, stiffness: 150, mass: 0.8 }
  const imageX = useSpring(cursorX, springConfig)
  const imageY = useSpring(cursorY, springConfig)

  const listItems: ListItem[] = [
    {
      text: 'Couture Design',
      image:
        'https://images.unsplash.com/photo-1760895986008-0a016173836c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=800&h=600',
    },
    {
      text: 'Styling',
      image:
        'https://images.unsplash.com/photo-1742201589806-3c7135a3fe68?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=800&h=600',
    },
    {
      text: 'Sustainable Fabric',
      image:
        'https://images.unsplash.com/photo-1760895986008-0a016173836c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=800&h=600',
    },
    {
      text: 'Editorial Fashion',
      image:
        'https://images.unsplash.com/photo-1742201589806-3c7135a3fe68?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=800&h=600',
    },
    {
      text: 'Custom Fittings',
      image:
        'https://images.unsplash.com/photo-1760895986008-0a016173836c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=800&h=600',
    },
  ]

  useEffect(() => {
    if (!inView || !sectionRef.current) return

    const subtext = sectionRef.current.querySelector('.subtext-line')
    const items = sectionRef.current.querySelectorAll('.list-item')

    if (subtext) {
      ;(subtext as HTMLElement).style.opacity = '0'
      ;(subtext as HTMLElement).style.transform = 'translateX(-40px)'
      setTimeout(() => {
        ;(subtext as HTMLElement).style.transition =
          'all 1s cubic-bezier(0.22, 1, 0.36, 1)'
        ;(subtext as HTMLElement).style.opacity = '1'
        ;(subtext as HTMLElement).style.transform = 'translateX(0)'
      }, 450)
    }

    items.forEach((item, i) => {
      ;(item as HTMLElement).style.opacity = '0'
      setTimeout(
        () => {
          ;(item as HTMLElement).style.transition =
            'all 1s cubic-bezier(0.22, 1, 0.36, 1)'
          ;(item as HTMLElement).style.opacity = '1'
        },
        600 + i * 120
      )
    })
  }, [inView])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Always update cursor position when moving over any hovered item
    const x = e.clientX
    const y = e.clientY

    cursorX.set(x)
    cursorY.set(y)
  }

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;500;700&display=swap');
        * {
          font-family: 'Kumbh Sans', sans-serif;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative bg-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
      >
        <div ref={ref} className="">
          {/* ✅ Animated Heading */}
          <h1 className="expertise-heading text-black font-bold text-[clamp(48px,10vw,152.35px)] leading-[96%] tracking-tight mb-24">
            <AnimatedText
              text="Expertise"
              isVisible={inView}
              className="inline-block"
              delay={200}
            />
          </h1>

          {/* GRID: Subtext + List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* LEFT: Subtext Grid */}
            <div className="grid gap-6 col-span-12 lg:col-span-4">
              <p className="subtext-line text-black font-medium text-[clamp(20px,3vw,30px)] leading-[132%] capitalize pt-8">
                What We Do Best
              </p>
            </div>

            {/* RIGHT: Interactive List */}
            <div className="relative space-y-8 col-span-12 lg:col-span-8">
              {listItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="list-item relative group cursor-pointer list-none"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onMouseMove={handleMouseMove}
                >
                  <h3
                    className="text-black font-normal text-[clamp(40px,8vw,100px)] leading-[96%] tracking-tight"
                    style={{ fontFamily: "'Kumbh Sans', sans-serif" }}
                  >
                    {item.text}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CURSOR-FOLLOWING IMAGE - Fixed position, follows cursor */}
        <AnimatePresence mode="wait">
          {hoveredIndex !== null && (
            <motion.div
              key={`image-${hoveredIndex}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                x: imageX,
                y: imageY,
                translateX: '-50%',
                translateY: '-50%',
                pointerEvents: 'none',
                zIndex: 9999,
              }}
              className="w-[500px] h-[400px] overflow-hidden shadow-2xl"
            >
              <motion.img
                key={`img-${hoveredIndex}`}
                src={listItems[hoveredIndex].image}
                alt={listItems[hoveredIndex].text}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
