'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  Send,
  Instagram,
  Facebook,
  Twitter,
  ArrowDown,
  Check,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Advanced Accordion Component
const AccordionSection = ({
  title,
  children,
  isOpen,
  onToggle,
  index,
}: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <motion.button
        onClick={onToggle}
        className="w-[35%] cursor-pointer py-2 flex items-center justify-between group relative overflow-hidden"
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/[0.02] rounded-lg"
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />

        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight relative z-10">
          {title}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-black/60 group-hover:text-black transition-colors relative z-10"
        >
          <motion.div
            animate={{ scale: isOpen ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown className="w-6 h-6 lg:w-8 lg:h-8" />
          </motion.div>
        </motion.div>
      </motion.button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="pb-6 pl-4 pt-2"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Footer() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    quick: false,
    info: false,
    social: false,
  })
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null)
  const leavingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Refs for GSAP ScrollTrigger animation
  const footerRef = useRef<HTMLElement>(null)
  const styliaTextRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])

  // GSAP ScrollTrigger animation for STYLIA text
  useEffect(() => {
    if (!footerRef.current || !styliaTextRef.current) return

    const footer = footerRef.current
    const letters = lettersRef.current.filter(Boolean)

    if (letters.length === 0) return

    // Set initial state - all letters positioned below viewport
    gsap.set(letters, {
      y: 500,
      opacity: 0,
      rotationX: 90,
      scale: 0.8,
    })

    // Create ScrollTrigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: footer,
      start: 'top 80%',
      end: 'top 20%',
      onEnter: () => {
        // Staggered letter animation
        gsap.to(letters, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: {
            each: 0.1,
            from: 'start',
          },
        })
      },
      onLeaveBack: () => {
        // Reset animation when scrolling back up
        gsap.to(letters, {
          y: 500,
          opacity: 0,
          rotationX: 90,
          scale: 0.8,
          duration: 0.6,
          ease: 'power2.inOut',
          stagger: {
            each: 0.05,
            from: 'end',
          },
        })
      },
    })

    // Add hover effect to individual letters
    letters.forEach((letter, index) => {
      if (!letter) return

      letter.addEventListener('mouseenter', () => {
        gsap.to(letter, {
          y: -15,
          scale: 1.1,
          duration: 0.3,
          ease: 'back.out(2)',
        })
      })

      letter.addEventListener('mouseleave', () => {
        gsap.to(letter, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    })

    // Cleanup function
    return () => {
      scrollTrigger.kill()
    }
  }, [])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleEmailSubmit = () => {
    if (email) {
      setIsSubmitted(true)
      console.log('Email submitted:', email)
      setTimeout(() => {
        setEmail('')
        setIsSubmitted(false)
      }, 2000)
    }
  }

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
  ]

  const information = [
    { name: 'Shipping & Returns', href: '/shipping' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ]

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  const linkVariants: Variants = {
    hidden: { opacity: 0, x: -15, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  }

  const styliaLetters = ['S', 'T', 'Y', 'L', 'I', 'A']

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden py-16 lg:py-24"
    >
      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Accordion Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            {/* Quick Links Accordion */}
            <AccordionSection
              title="Quick Links"
              isOpen={openSections.quick}
              onToggle={() => toggleSection('quick')}
              index={0}
            >
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <motion.li
                    key={idx}
                    custom={idx}
                    initial="hidden"
                    animate={openSections.quick ? 'visible' : 'hidden'}
                    variants={linkVariants}
                  >
                    <motion.a
                      href={link.href}
                      className="text-black/70 hover:text-black text-base inline-block relative group"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <span className="relative">
                        {link.name}
                        <motion.span
                          className="absolute bottom-0 left-0 h-[1px] bg-black"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </AccordionSection>

            {/* Information Accordion */}
            <AccordionSection
              title="Information"
              isOpen={openSections.info}
              onToggle={() => toggleSection('info')}
              index={1}
            >
              <ul className="space-y-3">
                {information.map((link, idx) => (
                  <motion.li
                    key={idx}
                    custom={idx}
                    initial="hidden"
                    animate={openSections.info ? 'visible' : 'hidden'}
                    variants={linkVariants}
                  >
                    <motion.a
                      href={link.href}
                      className="text-black/70 hover:text-black text-base inline-block relative group"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <span className="relative">
                        {link.name}
                        <motion.span
                          className="absolute bottom-0 left-0 h-[1px] bg-black"
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </AccordionSection>

            {/* Follow Us Accordion */}
            <AccordionSection
              title="Follow Us"
              isOpen={openSections.social}
              onToggle={() => toggleSection('social')}
              index={2}
            >
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={openSections.social ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={
                      openSections.social
                        ? {
                            scale: 1,
                            rotate: 0,
                            transition: {
                              delay: idx * 0.1,
                              type: 'spring',
                              stiffness: 260,
                              damping: 20,
                            },
                          }
                        : { scale: 0, rotate: -180 }
                    }
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      rotate: 5,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 flex items-center justify-center bg-black text-white rounded-full hover:bg-black/80 transition-colors shadow-md relative overflow-hidden group"
                    aria-label={social.label}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 2, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <social.icon className="w-5 h-5 relative z-10" />
                  </motion.a>
                ))}
              </motion.div>
            </AccordionSection>

            {/* Copyright */}
            <motion.div
              className="pt-12 lg:pt-16"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-sm text-black/60">
                Copyright © Stylia | Designed By{' '}
                <motion.span
                  className="font-semibold text-black/80 inline-block"
                  whileHover={{ scale: 1.05, color: '#000' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  NEXGENO
                </motion.span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Stay Connected
              </motion.h2>

              <motion.p
                className="text-base text-black/70 mb-8 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Subscribe To Our Newsletter And Enjoy 10% Off Your First
                Purchase.
              </motion.p>

              {/* Newsletter Input */}
              <motion.div
                className="relative max-w-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  className="flex overflow-hidden shadow-sm border border-black/10 focus-within:border-black/30 transition-all relative"
                  whileHover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="flex-1 px-6 py-4 bg-gray-50 text-black placeholder:text-black/40 text-sm focus:outline-none focus:bg-white transition-colors"
                  />
                  <motion.button
                    onClick={handleEmailSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 bg-black text-white flex items-center justify-center hover:bg-black/90 transition-colors relative overflow-hidden group cursor-pointer"
                  >
                    <motion.div
                      className="absolute cursor-pointer inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="relative z-10 cursor-pointer"
                        >
                          <Check className="w-6 h-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="send"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 45 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="relative z-10 cursor-pointer"
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Payment Methods */}
              <motion.div
                className="mt-10 mb-10 flex items-center gap-3 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {['MC', 'VISA', 'PP', 'UPI'].map((payment, idx) => (
                  <motion.div
                    key={payment}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + idx * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm border border-black/5 cursor-pointer text-xs font-bold text-black/70"
                  >
                    {payment}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated STYLIA Text Background - Full Width Below Content */}
      <div
        ref={styliaTextRef}
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-hidden pointer-events-auto"
        style={{
          height: 'clamp(200px, 50vh, 500px)',
          perspective: '1000px',
        }}
      >
        <div className="flex items-center justify-center w-full h-full">
          {styliaLetters.map((letter, index) => {
            const isHovered = hoveredIndex === index
            const isNeighbor =
              hoveredIndex !== null && Math.abs(index - hoveredIndex) === 1
            const isTrailing = leavingIndex === index

            const baseColor = 'rgba(0,0,0)'

            // Gradient (lighter charcoal)
            const gradient =
              'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 35%, #4a4a4a 65%, #6b6b6b 100%)'

            const transition =
              'color 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s ease-out, text-shadow 0.6s ease-out, background-position 1s ease-in-out'

            // Determine visual intensity
            const intensity = isHovered
              ? 1
              : isNeighbor
                ? 0.5
                : isTrailing
                  ? 0.2
                  : 0

            const style: React.CSSProperties = {
              fontSize: 'clamp(120px, 20vw, 280px)',
              lineHeight: 0.9,
              letterSpacing: '0.01em',
              fontWeight: 900,
              transformStyle: 'preserve-3d',
              willChange: 'transform, color, text-shadow',
              transition,
              // Base appearance
              color: intensity > 0 ? 'transparent' : baseColor,
              // Gradient text when active
              backgroundImage: intensity > 0 ? gradient : 'none',
              backgroundSize: intensity > 0 ? '200% 200%' : undefined,
              backgroundPosition: intensity > 0 ? '50% 50%' : undefined,
              WebkitBackgroundClip: intensity > 0 ? 'text' : undefined,
              backgroundClip: intensity > 0 ? 'text' : undefined,
              WebkitTextFillColor: intensity > 0 ? 'transparent' : undefined,
              textShadow:
                intensity > 0
                  ? `0 4px 20px rgba(0,0,0,${0.15 * intensity})`
                  : 'none',
              transform:
                intensity > 0 ? `scale(${1 + 0.05 * intensity})` : undefined,
            }

            return (
              <span
                key={index}
                ref={(el) => {
                  lettersRef.current[index] = el
                }}
                className="inline-block cursor-pointer select-none"
                style={style}
                onMouseEnter={() => {
                  if (leavingTimerRef.current) {
                    clearTimeout(leavingTimerRef.current)
                    leavingTimerRef.current = null
                  }
                  setLeavingIndex(null)
                  setHoveredIndex(index)
                }}
                onMouseMove={(e) => {
                  // Mouse-position driven gradient movement (premium feel)
                  const target = e.currentTarget as HTMLSpanElement
                  const rect = target.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width) * 100
                  const y = ((e.clientY - rect.top) / rect.height) * 100
                  // Animate background position towards cursor
                  target.style.backgroundPosition = `${x}% ${y}%`
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null)
                  // Persistent glow trail (0.5s)
                  setLeavingIndex(index)
                  leavingTimerRef.current = setTimeout(() => {
                    setLeavingIndex(null)
                  }, 500)
                }}
              >
                {letter}
              </span>
            )
          })}
        </div>
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/50 pointer-events-none" />
    </footer>
  )
}
