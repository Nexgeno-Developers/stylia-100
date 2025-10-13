// Custom React hooks
import { useState, useEffect } from 'react'

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      const isScrollingDownNow = direction === 'down'

      if (
        isScrollingDownNow !== isScrollingDown &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setIsScrollingDown(isScrollingDownNow)
      }

      lastScrollY = scrollY > 0 ? scrollY : 0
      setScrollY(scrollY)
    }

    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [isScrollingDown])

  return { scrollY, isScrollingDown }
}

export const useAnimation = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return { isVisible }
}
