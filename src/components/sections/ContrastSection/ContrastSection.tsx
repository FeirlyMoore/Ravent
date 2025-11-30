import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, easing } from '@/utils/gsap'
import Button from '@/components/ui/Button'
import RingElements from '@/components/decorative/RingElements'

const ContrastSection = () => {
  const { t } = useTranslation()
  const [hoveredSide, setHoveredSide] = useState<'participant' | 'organizer' | null>(null)
  const participantRef = useRef<HTMLDivElement>(null)
  const organizerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!participantRef.current || !organizerRef.current) return

    const participantEl = participantRef.current
    const organizerEl = organizerRef.current

    if (hoveredSide === 'participant') {
      gsap.to(participantEl, {
        flex: 2,
        duration: 0.6,
        ease: easing.smooth,
      })
      gsap.to(organizerEl, {
        flex: 1,
        duration: 0.6,
        ease: easing.smooth,
      })
    } else if (hoveredSide === 'organizer') {
      gsap.to(participantEl, {
        flex: 1,
        duration: 0.6,
        ease: easing.smooth,
      })
      gsap.to(organizerEl, {
        flex: 2,
        duration: 0.6,
        ease: easing.smooth,
      })
    } else {
      gsap.to([participantEl, organizerEl], {
        flex: 1,
        duration: 0.6,
        ease: easing.smooth,
      })
    }
  }, [hoveredSide])

  return (
    <section className="relative min-h-[45vh] flex overflow-hidden">
      <div
        ref={participantRef}
        className="relative flex-1 flex items-center justify-center bg-white text-black transition-colors"
        onMouseEnter={() => setHoveredSide('participant')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <RingElements count={4} size={100} />
        <div className="relative z-10 text-center px-8 max-w-md">
          <h2 className="text-h2 font-heading mb-4">
            {t('contrast.participant.title')}
          </h2>
          <p className="text-t2 font-body mb-8 text-gray-700">
            {t('contrast.participant.description')}
          </p>
          <Button variant="primary" size="lg">
            {t('contrast.participant.cta')}
          </Button>
        </div>
      </div>

      <div
        ref={organizerRef}
        className="relative flex-1 flex items-center justify-center bg-black text-white transition-colors"
        onMouseEnter={() => setHoveredSide('organizer')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <RingElements count={4} size={100} className="opacity-50" />
        <div className="relative z-10 text-center px-8 max-w-md">
          <h2 className="text-h2 font-heading mb-4">
            {t('contrast.organizer.title')}
          </h2>
          <p className="text-t2 font-body mb-8 text-gray-300">
            {t('contrast.organizer.description')}
          </p>
          <Button variant="gradient" size="lg">
            {t('contrast.organizer.cta')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ContrastSection
