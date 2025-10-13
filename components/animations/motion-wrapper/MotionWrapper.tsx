'use client'

// Animation wrapper components
import React from 'react'
import { motion } from 'motion/react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface MotionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  )
}
