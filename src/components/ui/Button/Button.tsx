import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'gradient'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-body font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
      primary:
        'bg-brand-yellow text-black hover:bg-brand-orange focus:ring-brand-orange',
      secondary:
        'bg-black dark:bg-white text-white dark:text-black hover:opacity-80 focus:ring-gray-500',
      outline:
        'border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black focus:ring-brand-yellow',
      gradient:
        'bg-gradient-brand-45 text-white hover:opacity-90 focus:ring-brand-purple',
    }

    const sizeStyles = {
      sm: 'px-4 py-2 text-t4 rounded-md',
      md: 'px-6 py-3 text-t3 rounded-lg',
      lg: 'px-8 py-4 text-t2 rounded-xl',
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
