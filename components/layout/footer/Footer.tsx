'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ChevronDown, Send, Instagram, Facebook, Twitter } from 'lucide-react'

// Advanced Accordion Component with Next-Level Animation
const AccordionSection = ({
  title,
  children,
  isOpen,
  onToggle,
  index,
}: any) => {
  return (
    <motion.div
      className="border-b border-black/5 last:border-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <motion.button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between group relative overflow-hidden"
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Hover background effect */}
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
            animate={{
              scale: isOpen ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 lg:w-6 lg:h-6" />
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
              className="pb-6"
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
    <footer className="relative bg-white overflow-hidden">
      {/* Animated Signature Background */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9, rotate: -5 }}
          whileInView={{
            opacity: 0.08,
            y: 0,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative w-full max-w-7xl"
          style={{
            mixBlendMode: 'multiply',
            transform: 'translateY(20%)',
          }}
        >
          <svg
            viewBox="0 0 1200 400"
            className="w-[200%] max-w-none mx-auto"
            style={{ filter: 'blur(0.3px)' }}
          >
            <text
              x="180"
              y="280"
              fontFamily="Brush Script MT, cursive"
              fontSize="120"
              fill="currentColor"
              className="text-black"
              style={{ fontWeight: 400 }}
            >
              Stylia
            </text>
          </svg>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Accordion Links (Desktop & Mobile) */}
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

              {/* Newsletter Input with Advanced Animation */}
              <motion.div
                className="relative max-w-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  className="flex rounded-lg overflow-hidden shadow-sm border border-black/10 focus-within:border-black/30 transition-all relative"
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
                    className="px-8 bg-black text-white flex items-center justify-center hover:bg-black/90 transition-colors relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
                          className="text-2xl relative z-10"
                        >
                          ✓
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
                          className="relative z-10"
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Payment Methods with Advanced Stagger */}
              <div className="mt-10 flex items-center gap-3 flex-wrap">
                {/* Mastercard */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.6,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    transition: { type: 'spring', stiffness: 400, damping: 10 },
                  }}
                  className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm border border-black/5 relative overflow-hidden cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-[-4px]">
                    <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
                    <div className="w-5 h-5 rounded-full bg-orange-500 opacity-90 -ml-2" />
                  </div>
                </motion.div>

                {/* Visa */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.7,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    transition: { type: 'spring', stiffness: 400, damping: 10 },
                  }}
                  className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm border border-black/5 cursor-pointer"
                >
                  <svg viewBox="0 0 48 16" className="w-8 h-auto" fill="none">
                    <path d="M18.5 2L15.8 14H13L15.7 2H18.5Z" fill="#1434CB" />
                    <path
                      d="M27.7 2.3C27.1 2.1 26.2 1.9 25.1 1.9C22.3 1.9 20.4 3.4 20.4 5.5C20.4 7.1 21.9 8 23.8 8C24.8 8 25.4 7.9 26 7.7V9.8C25.3 10 24.4 10.1 23.3 10.1C19.8 10.1 17.5 8.1 17.5 5.3C17.5 2.1 20.2 0 24.9 0C26.2 0 27.3 0.2 28 0.4L27.7 2.3Z"
                      fill="#1434CB"
                    />
                  </svg>
                </motion.div>

                {/* PayPal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.8,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    transition: { type: 'spring', stiffness: 400, damping: 10 },
                  }}
                  className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm border border-black/5 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-auto" fill="none">
                    <path
                      d="M8.32 23.5L9.14 18.2H6.42L8.84 3.5H15.5C17.3 3.5 18.7 3.9 19.7 4.8C20.6 5.6 21.1 6.8 21.1 8.3C21.1 10.6 20.4 12.4 19 13.7C17.6 15 15.7 15.7 13.2 15.7H11.4L10.5 20.7H14.2L13.8 23.5H8.32Z"
                      fill="#003087"
                    />
                    <path
                      d="M13.6 15.7C15.9 15.7 17.7 15 19 13.7C20.3 12.3 21 10.6 21 8.3C21 6.9 20.6 5.8 19.7 5C18.8 4.2 17.5 3.7 15.7 3.7H9.14L6.72 18.4H9.44L10.5 13H13.6V15.7Z"
                      fill="#0070E0"
                    />
                  </svg>
                </motion.div>

                {/* Klarna */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.9,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    transition: { type: 'spring', stiffness: 400, damping: 10 },
                  }}
                  className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm border border-black/5 cursor-pointer"
                >
                  <svg viewBox="0 0 64 24" className="w-9 h-auto" fill="none">
                    <path d="M8.5 3H5V21H8.5V3Z" fill="#FFB3C7" />
                    <path
                      d="M20.5 3C16.9 3 14 5.9 14 9.5V14.5C14 18.1 16.9 21 20.5 21H24V17.5H20.5C19.1 17.5 18 16.4 18 15V9C18 7.6 19.1 6.5 20.5 6.5H24V3H20.5Z"
                      fill="#FFB3C7"
                    />
                    <path
                      d="M35 3L30 12L35 21H39L34 12L39 3H35Z"
                      fill="#FFB3C7"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
