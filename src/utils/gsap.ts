import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.config({
  nullTargetWarn: false,
  // trialWarn: false,
})

export { gsap, ScrollTrigger }

export const easing = {
  smooth: 'power2.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  expo: 'expo.out',
} as const
