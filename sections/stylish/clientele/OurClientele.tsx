'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedText from '@/components/ui/AnimatedText'
import Image from 'next/image'

export const ClienteleSection: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  // Client logos data - replace with your actual logo URLs
  const clientLogos = [
    { name: 'Gucci', url: '/images/clients/gucci.svg' },
    { name: 'Louis Vuitton', url: '/images/clients/louis.png' },
    { name: 'Prada', url: '/images/clients/prada.svg' },
    { name: 'Dior', url: '/images/clients/dior.svg' },
    { name: 'Louis Vuitton', url: '/images/clients/louis.png' },
  ]

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Kumbh Sans', sans-serif;
        }
      `}</style>

      <section
        ref={ref}
        className="relative w-full bg-white py-16 sm:py-20 md:py-24 overflow-hidden"
      >
        {/* Content Container */}
        <div className="container mx-auto bg-white">
          {/* Title - Animated */}
          <h1 className="text-center mb-12 sm:mb-16 md:mb-20">
            <AnimatedText
              text="Our Clientele"
              isVisible={inView}
              className="text-black font-bold text-[clamp(48px,10vw,152.35px)] leading-[96%] tracking-[0%]  text-center"
              delay={200}
            />
          </h1>

          {/* Client Logos Grid/Table */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="relative z-10 mb-0"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 bg-white">
              {clientLogos.slice(0, 5).map((client, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex items-center justify-center p-8 sm:p-10 md:p-12 border-[1px] border-[#00000080] aspect-square"
                  style={{ borderColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <img
                    src={client.url}
                    alt={client.name}
                    className="w-full h-auto max-w-[120px] sm:max-w-[180px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 z-10">
              {clientLogos.slice(0, 5).map((client, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex items-center justify-center p-8 sm:p-10 md:p-12 border-[1px] border-[#00000080] border-t-0 aspect-square"
                  style={{ borderColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <img
                    src={client.url}
                    alt={client.name}
                    className="w-full h-auto max-w-[120px] sm:max-w-[180px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Optional: Add Stylia Text Watermark */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none"
          style={{
            bottom: '-15%',
            fontSize: 'clamp(80px, 15vw, 250px)',
            fontWeight: 700,
            zIndex: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <Image
            src="/images/footer-signature.png"
            width={800}
            height={500}
            alt="Signature Background"
            className="opacity-20 grayscale brightness-200"
          />
        </div>
      </section>
    </>
  )
}
