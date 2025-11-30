import { useAppStore } from '@/store/appStore'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useAppStore()

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'light') return '☀️'
    if (theme === 'dark') return '🌙'
    return '💻'
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
      title={`Current theme: ${theme}`}
    >
      <span className="text-t2">{getIcon()}</span>
    </button>
  )
}

export default ThemeSwitcher
