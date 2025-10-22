'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export const StyliaAbout = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)
  const statsRef = useRef(null)

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  useEffect(() => {
    // Main section fade in
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    )

    // Title animation with gradient reveal
    gsap.fromTo(
      titleRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      }
    )

    // Parallax effect on images
    if (image1Ref.current) {
      gsap.to(image1Ref.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: image1Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    if (image2Ref.current) {
      gsap.to(image2Ref.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: image2Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    // Signature underline animation
    const underline = document.querySelector('.signature-underline')
    if (underline) {
      gsap.fromTo(
        underline,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, [])

  const stats = [
    { number: 8, label: 'Years of Experience' },
    { number: 12, label: 'Collections' },
    { number: 20, label: 'Collaborations' },
  ]

  const AnimatedNumber = ({ target, inView }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!inView) return

      let start = 0
      const duration = 2000
      const increment = target / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }, [target, inView])

    return <span>{count < 10 ? `0${count}` : count}</span>
  }

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;500;700&display=swap');

        * {
          font-family: 'Kumbh Sans', sans-serif;
        }

        .signature-underline {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full bg-white px-6 md:px-12 lg:px-20 xl:px-32 py-20"
      >
        {/* Top Section */}
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-20">
            {/* Left: Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-center"
            >
              <p className="text-black text-[30px] font-medium leading-[132%] capitalize mb-8">
                Fashion Designer & Creative Director
              </p>
            </motion.div>

            {/* Right: About Me Title */}
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="relative flex items-start xl:justify-end"
            >
              <div className="relative">
                <h2 className="text-black font-bold text-[80px] md:text-[120px] xl:text-[152.35px] leading-[96%] tracking-normal">
                  <AnimatedText
                    text="About Me"
                    isVisible={isInView}
                    className="text-black font-bold text-[80px] md:text-[120px] xl:text-[152.35px] leading-[96%] tracking-normal"
                  />
                </h2>
              </div>
            </motion.div>
          </div>

          {/* Two Column Paragraphs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-18">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.5,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-black text-[25px] font-normal leading-[163%] capitalize"
            >
              Stylia is an independent designer label redefining contemporary
              fashion with refined silhouettes, sustainable fabrics, and
              handcrafted detailing.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.5,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-black text-[25px] font-normal leading-[163%] capitalize"
            >
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s,
            </motion.p>
          </div>

          {/* Bottom Section: Images + Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">
            {/* Left: Images */}
            <div className="flex items-center gap-8 justify-center h-[700px]">
              {/* Left Image (Vertically Centered) */}
              <motion.div
                ref={image1Ref}
                className="overflow-hidden self-center"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1.5,
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop"
                  alt="Stylia Model 1"
                  className="w-[316px] h-[520px] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8,  ease: [0.22, 1, 0.36, 1], }}
                />
              </motion.div>

              {/* Right Image (Full Height of Container) */}
              <motion.div
                ref={image2Ref}
                className="overflow-hidden h-full"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1.5,
                  delay: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=700&fit=crop"
                  alt="Stylia Model 2"
                  className="w-[316px] h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </div>

            {/* Right: Stats */}
            <div ref={statsRef} className="flex flex-col gap-6 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={statsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 1.5,
                    delay: 1.4 + index * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-8"
                >
                  <div className="w-[2px] h-[200px] bg-black"></div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <span className="text-black font-medium text-[120px] md:text-[152.35px] leading-[96%]">
                        <AnimatedNumber
                          target={stat.number}
                          inView={statsInView}
                        />
                      </span>
                      <span className="text-black font-medium flex items-center justify-center leading-none">
                        <Plus
                          width={120}
                          height={120}
                          style={{ strokeWidth: 1 }}
                        />
                      </span>
                      <p className="text-black font-medium text-[22px] leading-[163%] capitalize mt-4">
                        {stat.label.split(' ').map((word, index) =>
                          index === 2 ? (
                            <>
                              <br />
                              {word}{' '}
                            </>
                          ) : (
                            `${word} `
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
