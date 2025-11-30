import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { gsap, easing } from '@/utils/gsap'
import Container from '@/components/layout/Container'
import CategoryCard from './CategoryCard'
import { mockCategories } from '@/data/mockCategories'

const CategorySlider = () => {
  const { t } = useTranslation()
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: easing.smooth }
      )
    })

    return () => ctx.revert()
  }, [])

  const updateScrollButtons = () => {
    if (!sliderRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return

    const scrollAmount = 300
    const newScrollLeft =
      direction === 'left'
        ? sliderRef.current.scrollLeft - scrollAmount
        : sliderRef.current.scrollLeft + scrollAmount

    gsap.to(sliderRef.current, {
      scrollLeft: newScrollLeft,
      duration: 0.5,
      ease: easing.smooth,
      onUpdate: updateScrollButtons,
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
    updateScrollButtons()
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    updateScrollButtons()
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('scroll', updateScrollButtons)
      return () => slider.removeEventListener('scroll', updateScrollButtons)
    }
  }, [])

  return (
    <section className="relative py-16 sm:py-20 bg-white dark:bg-black">
      <Container>
        <div ref={containerRef}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-h2 font-heading">{t('categories.title')}</h2>

            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                aria-label={t('categories.scrollLeft')}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                aria-label={t('categories.scrollRight')}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className={`flex gap-4 overflow-x-auto scrollbar-hide select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            {mockCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CategorySlider
