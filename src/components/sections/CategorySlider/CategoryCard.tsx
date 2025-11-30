import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, easing } from '@/utils/gsap'
import type { Category } from '@/types/category'

interface CategoryCardProps {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.05,
        duration: 0.4,
        ease: easing.smooth,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: easing.smooth,
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-[280px] h-[180px] rounded-2xl overflow-hidden cursor-pointer select-none"
      onDragStart={(e) => e.preventDefault()}
    >
      <div
        className={`absolute inset-0 bg-gradient-45 ${category.gradient} opacity-90`}
      />

      <div className="relative h-full p-6 flex flex-col justify-between text-white pointer-events-none">
        <div>
          <h3 className="text-h4 font-heading leading-none">{category.name}</h3>
        </div>

        <div>
          <p className="text-t3 font-body opacity-90">
            {t('categories.eventsCount', { count: category.eventCount })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
