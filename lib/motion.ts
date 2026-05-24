export const DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
  cinematic: 1.2,
} as const

export const EASINGS = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  snappy: [0.34, 1.56, 0.64, 1] as const,
  cinematic: [0.16, 1, 0.3, 1] as const,
  fade: [0.4, 0, 0.2, 1] as const,
}

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.slow, ease: EASINGS.cinematic },
  },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: DURATIONS.normal, ease: EASINGS.fade },
  },
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

export const fadeInUpVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.slow, ease: EASINGS.cinematic },
  },
}

export const blurReveal = {
  initial: { opacity: 0, filter: 'blur(8px)', y: 16 },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.7, ease: EASINGS.cinematic },
  },
}

export const mobileMenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.fade },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: DURATIONS.normal, ease: EASINGS.cinematic },
  },
}
