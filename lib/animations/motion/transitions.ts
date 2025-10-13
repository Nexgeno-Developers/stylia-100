// Motion.dev transition presets
export const smoothTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
}

export const quickTransition = {
  duration: 0.3,
  ease: [0.25, 0.46, 0.45, 0.94],
}

export const slowTransition = {
  duration: 1.2,
  ease: [0.25, 0.46, 0.45, 0.94],
}

export const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
}

export const bounceTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 10,
}
