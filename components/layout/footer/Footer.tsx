'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Send, Instagram, Facebook, Twitter, ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { Check } from 'lucide-react'
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

export const Footer = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    quick: false,
    info: false,
    social: false,
  })
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Refs for GSAP ScrollTrigger animation
  const footerRef = useRef<HTMLElement>(null)
  const signatureRef = useRef<HTMLDivElement>(null)

  // GSAP ScrollTrigger animation for signature
  useEffect(() => {
    if (!footerRef.current || !signatureRef.current) return

    const footer = footerRef.current
    const signature = signatureRef.current

    // Set initial state - signature positioned below viewport
    gsap.set(signature, {
      y: '100%',
      opacity: 0,
    })

    // Create ScrollTrigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: footer,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1, // Smooth scrubbing with 1 second lag
      markers: process.env.NODE_ENV === 'development', // Show markers in development
      onEnter: () => {
        // Animation when scrolling down (entering footer)
        gsap.to(signature, {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          ease: 'back.out(1.7)', // Elastic bounce effect
        })
      },
      onLeave: () => {
        // Animation when scrolling up (leaving footer)
        gsap.to(signature, {
          y: '100%',
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut', // Smooth exit
        })
      },
      onEnterBack: () => {
        // Animation when scrolling back down into footer
        gsap.to(signature, {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          ease: 'back.out(1.7)',
        })
      },
      onLeaveBack: () => {
        // Animation when scrolling back up out of footer
        gsap.to(signature, {
          y: '100%',
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        })
      },
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

  return (
    <footer ref={footerRef} className="relative bg-white overflow-hidden">
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-[1440px] h-[800px] mx-auto px-8 py-16 lg:py-24">
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
                          className="text-2xl relative z-10 cursor-pointer"
                        >
                          <Check className="text-white" />
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
                          <Image
                            src="/images/svg/send.svg"
                            alt="Send"
                            className="text-white"
                            width={30}
                            height={30}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Payment Methods */}
              <div className="mt-10 flex items-center gap-3 flex-wrap">
                {/* Mastercard */}
                <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm border border-black/5 cursor-pointer">
                  <Image
                    src="/images/svg/mastercard.svg"
                    alt="Mastercard"
                    width={56}
                    height={24}
                    className="object-contain"
                  />
                </div>

                {/* Visa */}
                <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm border border-black/5 cursor-pointer">
                  <Image
                    src="/images/svg/visa.svg"
                    alt="Visa"
                    width={56}
                    height={24}
                    className="object-contain"
                  />
                </div>

                {/* PayPal */}
                <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm border border-black/5 cursor-pointer">
                  <Image
                    src="/images/svg/paypal.svg"
                    alt="Paypal"
                    width={56}
                    height={24}
                    className="object-contain"
                  />
                </div>

                {/* UPI */}
                <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm border border-black/5 cursor-pointer">
                  <Image
                    src="/images/svg/klarna.svg"
                    alt="Klarna"
                    width={56}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Signature Background - Full Width Below Content */}
      <div
        ref={signatureRef}
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none overflow-hidden"
      >
        <div
          className="relative w-full"
          style={{
            height: 'clamp(300px, 50vh, 650px)',
          }}
        >
          <Image
            src="/images/footer-signature.png"
            alt="Stylia Signature"
            fill
            className="object-contain object-bottom opacity-100 brightness-0"
            style={{
              objectPosition: 'bottom center',
              mixBlendMode: 'normal', // Prevent light blending
              filter: 'brightness(0) saturate(100%)', // ensures solid black
            }}
            priority
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
