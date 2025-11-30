import { HTMLAttributes, forwardRef, useRef, useEffect, useImperativeHandle } from 'react'
import { cn } from '@/utils/cn'
import { gsap, easing } from '@/utils/gsap'

export type CardVariant = 'default' | 'elevated' | 'outlined'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  hoverEffect?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      hoverEffect = true,
      children,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => cardRef.current as HTMLDivElement)

    useEffect(() => {
      if (!hoverEffect || !cardRef.current) return

      const card = cardRef.current

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
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
    }, [hoverEffect])

    const baseStyles = 'rounded-xl overflow-hidden transition-all duration-300'

    const variantStyles = {
      default: 'bg-white dark:bg-black',
      elevated:
        'bg-white dark:bg-black shadow-lg hover:shadow-2xl dark:shadow-brand-purple/20',
      outlined:
        'bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 hover:border-brand-yellow dark:hover:border-brand-yellow',
    }

    return (
      <div
        ref={cardRef}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card