// GSAP ScrollTrigger configurations
export const scrollTriggerDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
}

export const scrollTriggerFadeIn = {
  ...scrollTriggerDefaults,
  animation: {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
  },
}

export const scrollTriggerSlideIn = {
  ...scrollTriggerDefaults,
  animation: {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  },
}

export const scrollTriggerScaleIn = {
  ...scrollTriggerDefaults,
  animation: {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: 'back.out(1.7)',
  },
}
