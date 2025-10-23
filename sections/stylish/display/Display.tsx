'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Display: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state: scale 0.8, centered with padding
      gsap.set(imageWrapperRef.current, {
        scale: 0.7,
        yPercent: 0,
      })

      // Animate scale + slight upward movement on scroll
      gsap.to(imageWrapperRef.current, {
        scale: 1.15, // Final zoom
        yPercent: -20, // Parallax upward
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[930px] p-20 overflow-hidden "
    >
      {/* Image Wrapper */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 -m-20" // Negative margin to cancel padding
      >
        <Image
          src="/images/display/display.png"
          alt="Luxury Display - Couture Excellence"
          fill
          priority
          quality={98}
          className="object-cover object-center"
        />
      </div>
    </section>
  )
}
