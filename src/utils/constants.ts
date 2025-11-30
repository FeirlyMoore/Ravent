export const COLORS = {
  brand: {
    yellow: '#F7B075',
    orange: '#E95A59',
    purple: '#B31872',
  },
  black: '#000000',
  white: '#FFFFFF',
} as const

export const GRADIENTS = {
  deg30: 'linear-gradient(30deg, #F7B075, #E95A59, #B31872)',
  deg45: 'linear-gradient(45deg, #F7B075, #E95A59, #B31872)',
  deg60: 'linear-gradient(60deg, #F7B075, #E95A59, #B31872)',
} as const

export const FONT_SIZES = {
  h1: '72px',
  h2: '60px',
  h3: '48px',
  h4: '36px',
  t1: '24px',
  t2: '18px',
  t3: '14px',
  t4: '12px',
} as const

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const
