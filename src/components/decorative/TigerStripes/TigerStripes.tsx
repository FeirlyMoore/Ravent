import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TigerStripesProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'vertical' | 'diagonal'
  opacity?: number
}

const TigerStripes = ({
  className,
  variant = 'diagonal',
  opacity = 0.1,
  ...props
}: TigerStripesProps) => {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden',
        className
      )}
      style={{ opacity }}
      {...props}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={`tiger-stripes-${variant}`}
            x="0"
            y="0"
            width={variant === 'vertical' ? '40' : '80'}
            height={variant === 'vertical' ? '100%' : '80'}
            patternUnits="userSpaceOnUse"
            patternTransform={
              variant === 'diagonal' ? 'rotate(-45)' : undefined
            }
          >
            <rect
              x="0"
              y="0"
              width="20"
              height="100%"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#tiger-stripes-${variant})`}
        />
      </svg>
    </div>
  )
}

export default TigerStripes
