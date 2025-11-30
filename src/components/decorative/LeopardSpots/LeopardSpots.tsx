import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface LeopardSpotsProps extends HTMLAttributes<HTMLDivElement> {
  count?: number
  size?: 'sm' | 'md' | 'lg'
}

const LeopardSpots = ({
  className,
  count = 5,
  size = 'md',
  ...props
}: LeopardSpotsProps) => {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
  }

  const spotSize = sizeMap[size]

  const generateSpots = () => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.7 + Math.random() * 0.6,
      rotation: Math.random() * 360,
    }))
  }

  const spots = generateSpots()

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden',
        className
      )}
      {...props}
    >
      {spots.map(spot => (
        <div
          key={spot.id}
          className="absolute"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            width: `${spotSize * spot.scale}px`,
            height: `${spotSize * spot.scale}px`,
            transform: `translate(-50%, -50%) rotate(${spot.rotation}deg)`,
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-brand-45 opacity-20" />
        </div>
      ))}
    </div>
  )
}

export default LeopardSpots
