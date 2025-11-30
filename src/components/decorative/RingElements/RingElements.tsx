import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface RingElementsProps extends HTMLAttributes<HTMLDivElement> {
  count?: number
  size?: number
}

const RingElements = ({
  className,
  count = 3,
  size = 200,
  ...props
}: RingElementsProps) => {
  const generateRings = () => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.8,
    }))
  }

  const rings = generateRings()

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden',
        className
      )}
      {...props}
    >
      {rings.map(ring => (
        <div
          key={ring.id}
          className="absolute"
          style={{
            left: `${ring.x}%`,
            top: `${ring.y}%`,
            width: `${size * ring.scale}px`,
            height: `${size * ring.scale}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-full h-full rounded-full border-4 border-brand-yellow opacity-20" />
        </div>
      ))}
    </div>
  )
}

export default RingElements
