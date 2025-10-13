// Lottie animation configurations
export const lottieConfig = {
  renderer: 'svg',
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export const lottieAnimations = {
  loading: {
    path: '/animations/lottie/loading.json',
    ...lottieConfig,
  },
  success: {
    path: '/animations/lottie/success.json',
    loop: false,
    autoplay: true,
  },
  error: {
    path: '/animations/lottie/error.json',
    loop: false,
    autoplay: true,
  },
  celebration: {
    path: '/animations/lottie/celebration.json',
    loop: false,
    autoplay: true,
  },
}
