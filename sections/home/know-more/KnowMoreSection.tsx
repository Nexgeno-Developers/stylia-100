'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import AnimatedText from '@/components/ui/AnimatedText'
import { useInView } from 'framer-motion'

export const KnowMoreSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isScratching, setIsScratching] = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const pointsQueueRef = useRef<Array<{ x: number; y: number }>>([])
  const isDrawingRef = useRef(false)

  const headingRef = useRef(null)
  const isInView = useInView(headingRef, { once: true, amount: 0.5 })

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const imageContainer = imageContainerRef.current
    if (!canvas || !imageContainer) return

    const ctx = canvas.getContext('2d', {
      willReadFrequently: false,
      alpha: true,
    })
    if (!ctx) return

    const initCanvas = () => {
      const rect = imageContainer.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.scale(dpr, dpr)

      // Enable smoothing for better quality
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      // Fill with white - this will be erased to reveal video
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, rect.width, rect.height)
    }

    initCanvas()

    const handleResize = () => {
      initCanvas()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Smooth drawing with interpolation
  const drawSmoothLine = useCallback(() => {
    if (isDrawingRef.current || pointsQueueRef.current.length === 0) return

    isDrawingRef.current = true
    const canvas = canvasRef.current
    const imageContainer = imageContainerRef.current

    if (!canvas || !imageContainer) {
      isDrawingRef.current = false
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      isDrawingRef.current = false
      return
    }

    const rect = imageContainer.getBoundingClientRect()
    const points = [...pointsQueueRef.current]
    pointsQueueRef.current = []

    // Use destination-out to erase and reveal video below
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
    ctx.lineWidth = 90
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    points.forEach((point, index) => {
      if (index === 0 && !lastPosRef.current) {
        // First point - draw circle
        ctx.beginPath()
        ctx.arc(point.x, point.y, 35, 0, Math.PI * 2)
        ctx.fill()
        lastPosRef.current = point
      } else if (lastPosRef.current) {
        // Draw smooth line with quadratic curve for interpolation
        if (index < points.length - 1) {
          const nextPoint = points[index + 1]
          const midX = (point.x + nextPoint.x) / 2
          const midY = (point.y + nextPoint.y) / 2

          ctx.beginPath()
          ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
          ctx.quadraticCurveTo(point.x, point.y, midX, midY)
          ctx.stroke()

          lastPosRef.current = { x: midX, y: midY }
        } else {
          // Last point - draw straight line
          ctx.beginPath()
          ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
          ctx.lineTo(point.x, point.y)
          ctx.stroke()

          lastPosRef.current = point
        }

        // Draw circle at current position for smooth coverage
        ctx.beginPath()
        ctx.arc(point.x, point.y, 35, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // Update mask
    if (imageContainer) {
      const dataUrl = canvas.toDataURL('image/png')
      imageContainer.style.webkitMaskImage = `url(${dataUrl})`
      imageContainer.style.maskImage = `url(${dataUrl})`
    }

    // Start video on first scratch
    if (!videoStarted && videoRef.current && points.length > 0) {
      videoRef.current.play().catch((e) => console.log('Video play failed:', e))
      setVideoStarted(true)
    }

    isDrawingRef.current = false

    // Continue drawing if there are more points
    if (pointsQueueRef.current.length > 0) {
      requestAnimationFrame(drawSmoothLine)
    }
  }, [videoStarted])

  const addPoint = useCallback(
    (x: number, y: number) => {
      pointsQueueRef.current.push({ x, y })

      if (!isDrawingRef.current) {
        requestAnimationFrame(drawSmoothLine)
      }
    },
    [drawSmoothLine]
  )

  const handleStart = (clientX: number, clientY: number) => {
    setIsScratching(true)
    lastPosRef.current = null
    pointsQueueRef.current = []

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = clientX - rect.left
    const y = clientY - rect.top

    addPoint(x, y)
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!isScratching) return

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = clientX - rect.left
    const y = clientY - rect.top

    addPoint(x, y)
  }

  const handleEnd = () => {
    setIsScratching(false)
    lastPosRef.current = null
    pointsQueueRef.current = []
  }

  return (
    <section className="relative w-full overflow-hidden bg-white h-full flex items-center">
      <div className="container mx-auto h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[100vh] w-full overflow-hidden shadow-2xl"
          ref={containerRef}
          onMouseEnter={() => {
            setIsScratching(true)
            lastPosRef.current = null
            pointsQueueRef.current = []
          }}
          onMouseMove={(e) => {
            if (!isScratching) return
            handleMove(e.clientX, e.clientY)
          }}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => {
            e.preventDefault()
            handleStart(e.touches[0].clientX, e.touches[0].clientY)
          }}
          onTouchMove={(e) => {
            e.preventDefault()
            handleMove(e.touches[0].clientX, e.touches[0].clientY)
          }}
          onTouchEnd={handleEnd}
          style={{
            touchAction: 'none',
            cursor: 'crosshair',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {/* Video Layer (Bottom) */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/knowmore-video.mp4" type="video/mp4" />
          </video>

          {/* Image Layer (Middle) - Uses canvas as mask */}
          <div
            ref={imageContainerRef}
            className="absolute inset-0 pointer-events-none transition-none"
            style={{
              WebkitMaskImage: 'linear-gradient(white, white)',
              maskImage: 'linear-gradient(white, white)',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            <Image
              src="/images/knowmore-bg.png"
              alt="Style Pro"
              fill
              className="object-cover object-top select-none"
              priority
              draggable={false}
            />
          </div>

          {/* Hidden canvas for mask generation */}
          <canvas
            ref={canvasRef}
            className="absolute opacity-0 pointer-events-none"
            style={{ position: 'absolute', top: -9999, left: -9999 }}
          />

          {/* Hint */}
          {!videoStarted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full z-30 pointer-events-none select-none"
            >
              <p className="text-white text-sm font-semibold tracking-wide">
                ✨ Scratch to reveal video
              </p>
            </motion.div>
          )}

          {/* Content Overlay (Top) */}
          <div className="absolute inset-0 flex items-end justify-between p-8 lg:p-10 z-20 pointer-events-none select-none">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              ref={headingRef}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
            >
              <AnimatedText text="Style" isVisible={isInView} />{' '}
              <span className="font-light">
                <AnimatedText text="Pro" isVisible={isInView} />
              </span>
            </motion.h2>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn cursor-pointer flex items-center gap-3 text-white font-semibold text-xl lg:text-2xl xl:text-3xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] pointer-events-auto"
            >
              <span className="relative">
                Know More
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover/btn:w-full transition-all duration-300 ease-out" />
              </span>
              <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 group-hover/btn:rotate-45 group-hover/btn:scale-110 transition-all duration-300 ease-out" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
