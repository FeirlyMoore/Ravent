import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, easing } from '@/utils/gsap'
import Container from '@/components/layout/Container'
import TigerStripes from '@/components/decorative/TigerStripes'
import LeopardSpots from '@/components/decorative/LeopardSpots'

const HeroSection = () => {
  const { t } = useTranslation()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const sloganRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: easing.smooth } })

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo(
          sloganRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-[45vh] flex items-end pb-16 justify-center bg-white dark:bg-black overflow-hidden">
      <TigerStripes variant="diagonal" opacity={0.05} />
      <LeopardSpots count={8} size="lg" />

      <Container className="relative z-10 text-center">
        <h1
          ref={titleRef}
          className="text-h1 sm:text-[96px] lg:text-[120px] font-heading bg-gradient-brand-45 bg-clip-text text-transparent leading-none"
        >
          Ravent
        </h1>
        <p
          ref={sloganRef}
          className="text-t1 sm:text-h4 font-body mt-6 text-black dark:text-white"
        >
          {t('hero.slogan')}
        </p>
      </Container>
    </section>
  )
}

export default HeroSection
