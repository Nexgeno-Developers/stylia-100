'use client'

import type React from 'react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, HeartIcon } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface Product {
  id: number
  name: string
  price: number
  image: string
  bannerImage: string
  liked: boolean
}

const LOOP_SETS = 3 // Number of virtual copies for infinite scroll

export const StyliaDiscoverSection: React.FC = () => {
  // Refs
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftAreaRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLSpanElement>(null)
  const rightScrollRef = useRef<HTMLDivElement>(null)
  const slotLeftRef = useRef<HTMLDivElement>(null)
  const slotMidRef = useRef<HTMLDivElement>(null)
  const slotRightRef = useRef<HTMLDivElement>(null)
  const dragProgressRef = useRef(0)
  const animatingRef = useRef(false)
  const isScrollingProgrammaticallyRef = useRef(false)
  const lastDirectionRef = useRef(1) // Track last direction: 1 for forward, -1 for backward
  const cooldownRef = useRef(false) // Prevent rapid transitions
  const scrollDebounceRef = useRef<NodeJS.Timeout | null>(null)

  // Velocity tracking refs
  const velocityRef = useRef(0) // Current velocity
  const lastScrollTimeRef = useRef(Date.now()) // For scroll velocity calculation
  const lastDragTimeRef = useRef(Date.now()) // For drag velocity calculation
  const lastScrollPositionRef = useRef(0) // Last scroll position
  const lastDragPositionRef = useRef(0) // Last drag position
  const currentAnimationRef = useRef<gsap.core.Timeline | null>(null) // Current animation timeline

  // State
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Products
  // const products: Product[] = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       name: 'Floral Elegance Co-Ord Set',
  //       price: 33000,
  //       image:
  //         'https://plus.unsplash.com/premium_photo-1759354756760-b4416a802588?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928',
  //       bannerImage:
  //         'https://plus.unsplash.com/premium_photo-1759354756760-b4416a802588?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928',
  //       liked: false,
  //     },
  //     {
  //       id: 2,
  //       name: 'Chic Floral Co-Ord',
  //       price: 25500,
  //       image:
  //         'https://images.unsplash.com/photo-1760276888172-f123e959d4f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
  //       bannerImage:
  //         'https://images.unsplash.com/photo-1760276888172-f123e959d4f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
  //       liked: false,
  //     },
  //     {
  //       id: 3,
  //       name: 'Elegant Summer Set',
  //       price: 28000,
  //       image:
  //         'https://images.unsplash.com/photo-1760276888172-f123e959d4f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
  //       bannerImage:
  //         'https://images.unsplash.com/photo-1760276888172-f123e959d4f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
  //       liked: false,
  //     },
  //     {
  //       id: 4,
  //       name: 'Modern Classic Outfit',
  //       price: 31000,
  //       image:
  //         'https://plus.unsplash.com/premium_photo-1759432614274-d92ea9d4d465?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1822',
  //       bannerImage:
  //         'https://plus.unsplash.com/premium_photo-1759432614274-d92ea9d4d465?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1822',
  //       liked: false,
  //     },
  //     {
  //       id: 5,
  //       name: 'Summer Breeze Outfit',
  //       price: 33000,
  //       image:
  //         'https://plus.unsplash.com/premium_photo-1760346161631-6b50290d631f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900',
  //       bannerImage:
  //         'https://plus.unsplash.com/premium_photo-1760346161631-6b50290d631f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900',
  //       liked: false,
  //     },
  //     {
  //       id: 6,
  //       name: 'Urban Chic Set',
  //       price: 25500,
  //       image:
  //         'https://plus.unsplash.com/premium_photo-1760269682838-4f7a3d586ad3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900',
  //       bannerImage:
  //         'https://plus.unsplash.com/premium_photo-1760269682838-4f7a3d586ad3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900',
  //       liked: false,
  //     },
  //     {
  //       id: 7,
  //       name: 'Classic Elegance',
  //       price: 28000,
  //       image:
  //         'https://images.unsplash.com/photo-1759845565036-cbecbcfcb8e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900',
  //       bannerImage:
  //         'https://images.unsplash.com/photo-1759845565036-cbecbcfcb8e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900',
  //       liked: false,
  //     },
  //     {
  //       id: 8,
  //       name: 'Contemporary Style',
  //       price: 31000,
  //       image:
  //         'https://images.unsplash.com/photo-1760235674447-fe0cc115b697?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900',
  //       bannerImage:
  //         'https://images.unsplash.com/photo-1760235674447-fe0cc115b697?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900',
  //       liked: false,
  //     },
  //   ],
  //   []
  // )

  const products: Product[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Floral Elegance Co-Ord Set',
        price: 33000,
        image: '/images/stylia-discover-1.png',
        bannerImage: '/images/stylia-discover-1.png',
        liked: false,
      },
      {
        id: 2,
        name: 'Chic Floral Co-Ord',
        price: 25500,
        image: '/images/stylia-discover-2.png',
        bannerImage: '/images/stylia-discover-2.png',
        liked: false,
      },
      {
        id: 3,
        name: 'Elegant Summer Set',
        price: 28000,
        image: '/images/stylia-discover-3.png',
        bannerImage: '/images/stylia-discover-3.png',
        liked: false,
      },
      {
        id: 4,
        name: 'Modern Classic Outfit',
        price: 31000,
        image: '/images/stylia-discover-1.png',
        bannerImage: '/images/stylia-discover-1.png',
        liked: false,
      },
      {
        id: 5,
        name: 'Summer Breeze Outfit',
        price: 33000,
        image: '/images/stylia-discover-2.png',
        bannerImage: '/images/stylia-discover-2.png',
        liked: false,
      },
      {
        id: 6,
        name: 'Urban Chic Set',
        price: 25500,
        image: '/images/stylia-discover-3.png',
        bannerImage: '/images/stylia-discover-3.png',
        liked: false,
      },
      {
        id: 7,
        name: 'Classic Elegance',
        price: 28000,
        image: '/images/stylia-discover-1.png',
        bannerImage: '/images/stylia-discover-1.png',
        liked: false,
      },
      {
        id: 8,
        name: 'Contemporary Style',
        price: 31000,
        image: '/images/stylia-discover-2.png',
        bannerImage: '/images/stylia-discover-2.png',
        liked: false,
      },
    ],
    []
  )

  // Wrap index for circular navigation
  const wrapIndex = (i: number) => {
    const n = products.length
    return ((i % n) + n) % n
  }

  // Get indices for 3 visible slots with consistent mapping
  // Right slot = Featured (current active)
  // Center slot = Next (one position after featured)
  // Left slot = Third (two positions after featured)
  const getSlotIndices = (idx: number) => {
    return {
      left: wrapIndex(idx + 2), // two AFTER active (third position)
      mid: wrapIndex(idx + 1), // one AFTER active (next position)
      right: wrapIndex(idx), // active product (featured)
    }
  }

  // Optimized GSAP transforms with reduced calculations and better performance
  const applySlotTransforms = (progress = 0) => {
    const leftEl = slotLeftRef.current
    const midEl = slotMidRef.current
    const rightEl = slotRightRef.current
    if (!leftEl || !midEl || !rightEl) return

    const p = Math.max(-1, Math.min(1, progress))
    const direction = lastDirectionRef.current

    // Pre-calculate common values for better performance
    const isForward = direction === 1
    const isPositive = p >= 0
    const absP = Math.abs(p)

    // Optimized position calculations
    const leftX = isForward
      ? isPositive
        ? -40 + p * 20
        : -40 - absP * 25
      : isPositive
        ? -40 + p * 20
        : -40 - absP * 25

    const midX = isForward
      ? isPositive
        ? -25 + p * 20
        : -25 - absP * 20
      : isPositive
        ? -25 + p * 20
        : -25 - absP * 20

    const rightX = isForward
      ? isPositive
        ? -5 + p * 75
        : -5 - absP * 20
      : isPositive
        ? -5 + p * 75
        : -5 - absP * 20

    // Batch GSAP updates for better performance
    gsap.set([leftEl, midEl, rightEl], {
      force3D: true,
      willChange: 'transform, opacity, filter',
      transformOrigin: 'center center',
    })

    // Left slot - optimized calculations
    gsap.set(leftEl, {
      x: `${leftX}vw`,
      y: '-50%',
      scale: isPositive ? 0.7 + p * 0.15 : 0.7 - absP * 0.2,
      opacity: isPositive ? 0.6 + p * 0.4 : 0.6 - absP * 0.6,
      filter: `blur(${isPositive ? 4 - p * 2 : 4 + absP * 4}px)`,
      rotationY: isPositive ? -8 + p * 8 : -8 - absP * 8,
      zIndex: 10,
    })

    // Middle slot - optimized calculations
    gsap.set(midEl, {
      x: `${midX}vw`,
      y: '-50%',
      scale: isPositive ? 0.85 + p * 0.25 : 0.85 - absP * 0.15,
      opacity: isPositive ? 1 : 1 - absP * 0.4,
      filter: `blur(${isPositive ? 2 - p * 2 : 2 + absP * 2}px)`,
      rotationY: isPositive ? p * 4 : -absP * 8,
      zIndex: 20,
    })

    // Right slot - optimized calculations
    gsap.set(rightEl, {
      x: `${rightX}vw`,
      y: '-50%',
      scale: isPositive ? 1.1 - p * 0.1 : 1.1 - absP * 0.25,
      opacity: isPositive ? 1 - p : 1,
      filter: `blur(${isPositive ? p * 6 : absP * 2}px)`,
      rotationY: isPositive ? 4 + p * 8 : 4 - absP * 4,
      zIndex: 30,
    })
  }

  // Smooth transition animation with GSAP, cooldown protection, and velocity-based duration
  const transitionToIndex = (
    nextIndex: number,
    direction: 1 | -1,
    fromSidebar = false,
    velocity = 0
  ) => {
    // Cancel any existing animation
    if (currentAnimationRef.current) {
      currentAnimationRef.current.kill()
      currentAnimationRef.current = null
    }

    // Prevent rapid transitions
    if (cooldownRef.current) return

    animatingRef.current = true
    cooldownRef.current = true

    // Store the direction for slot positioning
    lastDirectionRef.current = direction

    const leftEl = slotLeftRef.current
    const midEl = slotMidRef.current
    const rightEl = slotRightRef.current
    if (!leftEl || !midEl || !rightEl) {
      animatingRef.current = false
      cooldownRef.current = false
      return
    }

    // Calculate dynamic duration based on velocity
    // Higher velocity = shorter duration (faster animation)
    // Lower velocity = longer duration (slower animation)
    const baseDuration = 0.8 // 500ms base duration
    const speedFactor = 0.3 // How much velocity affects duration
    const minDuration = 0.2 // 200ms minimum (very fast)
    const maxDuration = 0.8 // 800ms maximum (very slow)

    const dynamicDuration = Math.max(
      minDuration,
      Math.min(maxDuration, baseDuration - velocity * speedFactor)
    )

    // Create a timeline for smooth animation
    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false
        setActiveIndex(nextIndex)
        applySlotTransforms(0)
        currentAnimationRef.current = null

        // Sync sidebar scroll after image transition
        if (!fromSidebar) {
          syncSidebarScroll(nextIndex)
        }

        // Add cooldown period to prevent rapid transitions
        setTimeout(
          () => {
            cooldownRef.current = false
          },
          Math.max(100, dynamicDuration * 200)
        ) // Dynamic cooldown based on duration
      },
    })

    // Store reference to current animation
    currentAnimationRef.current = tl

    // Optimized animation using GSAP's efficient methods
    // Pre-calculate target values for better performance
    const isForward = direction === 1
    const targetProgress = direction

    // Use GSAP's efficient animation methods
    tl.to([leftEl, midEl, rightEl], {
      duration: dynamicDuration,
      ease: 'power2.out',
      force3D: true,
      onUpdate: function () {
        const progress = this.progress() * targetProgress
        applySlotTransforms(progress)
      },
    })
  }

  // Sync sidebar scroll position
  const syncSidebarScroll = (index: number) => {
    const scroller = rightScrollRef.current
    if (!scroller) return

    isScrollingProgrammaticallyRef.current = true
    const totalItems = products.length * LOOP_SETS
    const itemH = scroller.scrollHeight / totalItems
    const middleSetStart = products.length
    const targetTop = (middleSetStart + index) * itemH

    scroller.scrollTo({ top: targetTop, behavior: 'smooth' })

    // Reset flag after scroll completes
    setTimeout(() => {
      isScrollingProgrammaticallyRef.current = false
    }, 600)
  }

  // Initialize cursor
  useEffect(() => {
    const area = leftAreaRef.current
    const cursor = cursorRef.current
    if (!area || !cursor) return

    Object.assign(cursor.style, {
      position: 'absolute',
      width: '40px',
      height: '40px',
      borderRadius: '9999px',
      backgroundColor: 'transparent',
      border: '2px solid #000',
      pointerEvents: 'none',
      opacity: '0',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      transition: 'opacity 0.2s',
    })

    const move = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect()
      cursor.style.left = `${e.clientX - rect.left}px`
      cursor.style.top = `${e.clientY - rect.top}px`
    }

    const enter = () => (cursor.style.opacity = '1')
    const leave = () => (cursor.style.opacity = '0')

    area.addEventListener('mousemove', move)
    area.addEventListener('mouseenter', enter)
    area.addEventListener('mouseleave', leave)

    return () => {
      area.removeEventListener('mousemove', move)
      area.removeEventListener('mouseenter', enter)
      area.removeEventListener('mouseleave', leave)
    }
  }, [])

  // Cursor morph
  const cursorToRect = () => {
    const cursor = cursorRef.current
    const text = cursorTextRef.current
    if (!cursor || !text) return

    cursor.style.width = '120px'
    cursor.style.height = '56px'
    cursor.style.borderRadius = '12px'
    text.style.opacity = '1'
  }

  const cursorToCircle = () => {
    const cursor = cursorRef.current
    const text = cursorTextRef.current
    if (!cursor || !text) return

    cursor.style.width = '40px'
    cursor.style.height = '40px'
    cursor.style.borderRadius = '9999px'
    text.style.opacity = '0'
  }

  useLayoutEffect(() => {
    const area = leftAreaRef.current
    const track = trackRef.current
    if (!area || !track) return

    area.style.perspective = '1200px'

    // Initialize GSAP transforms
    const leftEl = slotLeftRef.current
    const midEl = slotMidRef.current
    const rightEl = slotRightRef.current

    if (leftEl && midEl && rightEl) {
      // Optimized initial setup with GSAP
      gsap.set([leftEl, midEl, rightEl], {
        transformOrigin: 'center center',
        force3D: true,
        willChange: 'transform, opacity, filter',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      })
      applySlotTransforms(0)
    }

    const dragThreshold = 100
    let startX = 0
    let currentX = 0
    let dragging = false

    const onMouseDown = (e: MouseEvent) => {
      if (animatingRef.current) return
      dragging = true
      startX = e.clientX
      setIsDragging(true)
      cursorToRect()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging || animatingRef.current || cooldownRef.current) return

      currentX = e.clientX - startX
      const p = currentX / dragThreshold

      // Calculate drag velocity (throttled for performance)
      const currentTime = Date.now()
      const timeDelta = currentTime - lastDragTimeRef.current

      // Only calculate velocity every 16ms (60fps) for better performance
      if (timeDelta >= 16) {
        const dragDistance = Math.abs(currentX - lastDragPositionRef.current)
        const dragVelocity = dragDistance / timeDelta

        // Update tracking refs
        lastDragTimeRef.current = currentTime
        lastDragPositionRef.current = currentX
        velocityRef.current = dragVelocity
      }

      // Cap drag progress to prevent multiple image transitions
      // Only allow transitioning to adjacent images (current +1 or -1)
      const cappedProgress = Math.max(-1, Math.min(1, p))
      dragProgressRef.current = cappedProgress

      // Only trigger transition if drag exceeds threshold AND we're not in cooldown
      if (Math.abs(cappedProgress) > 0.8 && !cooldownRef.current) {
        const direction = cappedProgress > 0 ? 1 : -1
        lastDirectionRef.current = direction
        const nextIndex = wrapIndex(activeIndex + direction)
        transitionToIndex(nextIndex, direction, false, velocityRef.current)
        startX = e.clientX
        currentX = 0
        dragProgressRef.current = 0
        return
      }

      applySlotTransforms(cappedProgress)
    }

    const onMouseUp = () => {
      if (!dragging) return
      dragging = false
      setIsDragging(false)
      cursorToCircle()

      if (animatingRef.current || cooldownRef.current) return

      const p = dragProgressRef.current

      // Only allow single image transition per drag gesture
      if (p > 0.35) {
        lastDirectionRef.current = 1
        transitionToIndex(
          wrapIndex(activeIndex + 1),
          1,
          false,
          velocityRef.current
        )
      } else if (p < -0.35) {
        lastDirectionRef.current = -1
        transitionToIndex(
          wrapIndex(activeIndex - 1),
          -1,
          false,
          velocityRef.current
        )
      } else {
        applySlotTransforms(0)
        dragProgressRef.current = 0
      }

      startX = 0
      currentX = 0
    }

    area.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      area.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [activeIndex, products.length])

  // Sidebar scroll sync with velocity tracking and animation cancellation
  useEffect(() => {
    const scroller = rightScrollRef.current
    if (!scroller) return

    let ticking = false
    let lastScrollTop = scroller.scrollTop
    let lastLogicalIndex = activeIndex
    let boundaryJustCorrected = false

    const onScroll = () => {
      if (
        ticking ||
        isScrollingProgrammaticallyRef.current ||
        cooldownRef.current
      )
        return

      ticking = true

      requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = scroller
        const totalItems = products.length * LOOP_SETS
        const itemH = scrollHeight / totalItems

        // Skip this frame if we just corrected boundary
        if (boundaryJustCorrected) {
          boundaryJustCorrected = false
          lastScrollTop = scrollTop
          ticking = false
          return
        }

        // Calculate scroll direction BEFORE any modifications
        const rawScrollDelta = scrollTop - lastScrollTop
        const scrollDirection =
          rawScrollDelta > 0 ? 1 : rawScrollDelta < 0 ? -1 : 0
        const scrollDelta = Math.abs(rawScrollDelta)

        const currentScrollIndex = Math.round(scrollTop / itemH)
        const logicalIndex = currentScrollIndex % products.length

        // Handle infinite loop boundaries
        const firstSetEnd = products.length * 0.8
        const lastSetStart = products.length * (LOOP_SETS - 0.8)
        let needsBoundaryCorrection = false

        if (currentScrollIndex < firstSetEnd) {
          const newScrollTop = scrollTop + products.length * itemH
          scroller.scrollTop = newScrollTop
          lastScrollTop = newScrollTop
          needsBoundaryCorrection = true
          boundaryJustCorrected = true
        } else if (currentScrollIndex > lastSetStart) {
          const newScrollTop = scrollTop - products.length * itemH
          scroller.scrollTop = newScrollTop
          lastScrollTop = newScrollTop
          needsBoundaryCorrection = true
          boundaryJustCorrected = true
        }

        // If boundary was corrected, exit early
        if (needsBoundaryCorrection) {
          ticking = false
          return
        }

        // Calculate scroll velocity (throttled for performance)
        const currentTime = Date.now()
        const timeDelta = currentTime - lastScrollTimeRef.current

        // Only calculate velocity every 16ms (60fps) for better performance
        if (timeDelta >= 16 && scrollDelta > 0) {
          const scrollVelocity = scrollDelta / timeDelta

          // Update tracking refs
          lastScrollTimeRef.current = currentTime
          lastScrollPositionRef.current = scrollTop
          velocityRef.current = Math.min(scrollVelocity, 5) // Cap velocity
        }

        // Only transition if index actually changed
        if (logicalIndex !== lastLogicalIndex && scrollDirection !== 0) {
          lastLogicalIndex = logicalIndex

          // If animating, cancel current animation
          if (animatingRef.current) {
            if (currentAnimationRef.current) {
              currentAnimationRef.current.kill()
              currentAnimationRef.current = null
            }
            animatingRef.current = false
            cooldownRef.current = false
          }

          transitionToIndex(
            logicalIndex,
            scrollDirection as 1 | -1,
            true,
            velocityRef.current
          )
        }

        // Update lastScrollTop for next comparison
        lastScrollTop = scrollTop
        ticking = false
      })
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      scroller.removeEventListener('scroll', onScroll)
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current)
        scrollDebounceRef.current = null
      }
    }
  }, [activeIndex, products.length])
  // Initialize sidebar position
  useLayoutEffect(() => {
    const scroller = rightScrollRef.current
    if (!scroller) return

    requestAnimationFrame(() => {
      const totalItems = products.length * LOOP_SETS
      const itemH = scroller.scrollHeight / totalItems
      const middleSetStart = products.length
      scroller.scrollTop = (middleSetStart + activeIndex) * itemH
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[1170px] overflow-hidden bg-white"
    >
      {/* Background layer: fills full width on small, left 9/12 on lg+; right stays white */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-full w-full lg:w-[70%] bg-[#00000012]"
      />

      <div className="h-full container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          {/* Left: Draggable Area */}
          <div
            ref={leftAreaRef}
            className="relative col-span-9 overflow-hidden"
            style={{ cursor: 'none' }}
          >
            {/* Custom Cursor */}
            <div ref={cursorRef} aria-hidden="true">
              <span
                ref={cursorTextRef}
                className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-black opacity-0"
                style={{ transition: 'opacity 0.2s' }}
              >
                Drag
              </span>
            </div>

            {/* Headline */}
            <div className="relative z-20 max-w-lg">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl lg:text-[35px] text-black mb-4 pt-8 font-semibold leading-[1.142]"

                // 142%
              >
                Where Style Meets Identity
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-black font-normal leading-[1.8]"
              >
                Stylia is more than fashion—it's a lifestyle. We create
                timeless, bold, and elegant designs.
              </motion.p>
            </div>

            {/* Image Track */}
            <div
              ref={trackRef}
              className="absolute inset-0 z-10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {(() => {
                const { left, mid, right } = getSlotIndices(activeIndex)
                return (
                  <>
                    {/* Left Slot */}
                    <div
                      ref={slotLeftRef}
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      style={{
                        width: '45vw',
                        maxWidth: '450px',
                        aspectRatio: '3/4',
                      }}
                    >
                      <img
                        src={products[left].bannerImage}
                        alt={products[left].name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Middle Slot */}
                    <div
                      ref={slotMidRef}
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      style={{
                        width: '50vw',
                        maxWidth: '550px',
                        aspectRatio: '3/4',
                      }}
                    >
                      <img
                        src={products[mid].bannerImage}
                        alt={products[mid].name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Right Slot */}
                    <div
                      ref={slotRightRef}
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      style={{
                        width: '55vw',
                        maxWidth: '650px',
                        aspectRatio: '3/4',
                      }}
                    >
                      <img
                        src={products[right].bannerImage}
                        alt={products[right].name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </>
                )
              })()}
            </div>

            {/* Progress Pills */}
            {/* <div className="absolute bottom-8 left-8 z-20 flex gap-2">
              {products.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    if (
                      i !== activeIndex &&
                      !animatingRef.current &&
                      !cooldownRef.current
                    ) {
                      const direction =
                        (i - activeIndex + products.length) % products.length <=
                        products.length / 2
                          ? 1
                          : -1
                      lastDirectionRef.current = direction
                      transitionToIndex(i, direction as 1 | -1, false, 0) // No velocity for click
                    }
                  }}
                  className="h-1 rounded-full"
                  animate={{
                    width: i === activeIndex ? 40 : 8,
                    backgroundColor:
                      i === activeIndex ? '#000' : 'rgba(0,0,0,0.25)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div> */}

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer group absolute bottom-8 left-0 z-20 flex items-center gap-2 text-black font-semibold text-lg lg:text-[35px]"
            >
              <span className="relative">
                Discover Stylia
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </span>
              <ArrowUpRight className="w-10 h-10 group-hover:rotate-45 transition-transform" />
            </motion.button>
          </div>

          {/* Right: Sidebar */}
          <div
            ref={rightScrollRef}
            className="col-span-3 overflow-y-auto h-full"
          >
            {(() => {
              const { left, mid, right } = getSlotIndices(activeIndex)

              return Array.from({ length: products.length * LOOP_SETS }).map(
                (_, idx) => {
                  const productIndex = idx % products.length
                  const p = products[productIndex]

                  // Check which slot this product belongs to
                  const isFeatured = productIndex === right
                  const isNext = productIndex === mid
                  const isUpcoming = productIndex === left

                  return (
                    <div
                      key={`sidebar-${idx}`}
                      style={{ minHeight: `${100 / products.length}vh` }}
                      className="flex items-center px-4 py-8"
                    >
                      <motion.div
                        animate={{
                          scale: isFeatured
                            ? 1
                            : isNext || isUpcoming
                              ? 0.98
                              : 0.95,
                          opacity: isFeatured || isNext || isUpcoming ? 1 : 0.7,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                      >
                        <div className="relative h-110 rounded-xl overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-contain"
                          />
                          {isFeatured && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full"
                            >
                              <HeartIcon className="w-10 h-10 text-black"></HeartIcon>
                            </motion.div>
                          )}
                          {isNext && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute top-3 left-3  text-xs px-3 py-1 rounded-full font-medium"
                            >
                              <HeartIcon className="w-10 h-10 text-black"></HeartIcon>
                            </motion.div>
                          )}
                          {isUpcoming && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium"
                            >
                              <HeartIcon className="w-10 h-10 text-black"></HeartIcon>
                            </motion.div>
                          )}
                        </div>
                        <div className="pl-6">
                          <h3
                            className={`text-xl font-semibold ${isFeatured ? 'text-black' : 'text-gray-700'}`}
                          >
                            {p.name}
                          </h3>
                          <p
                            className={`text-2xl font-bold mt-1 ${isFeatured ? 'text-black' : 'text-gray-600'}`}
                          >
                            ₹ {p.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  )
                }
              )
            })()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StyliaDiscoverSection
