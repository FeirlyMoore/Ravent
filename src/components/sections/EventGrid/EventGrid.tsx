import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, easing } from '@/utils/gsap'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import EventCard from './EventCard'
import { mockEvents } from '@/data/mockEvents'

const EventGrid = () => {
  const { t } = useTranslation()
  const gridRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: easing.smooth }
      )

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.event-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: easing.smooth,
            stagger: 0.1,
            delay: 0.2,
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const handleShowMore = () => {
    window.open('/events', '_blank')
  }

  const displayedEvents = mockEvents.slice(0, 9)

  return (
    <section className="relative py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        <h2 ref={titleRef} className="text-h2 font-heading mb-8">
          {t('events.title')}
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {displayedEvents.map(event => (
            <div key={event.id} className="event-card">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="gradient" size="lg" onClick={handleShowMore}>
            {t('events.showMore')}
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default EventGrid
