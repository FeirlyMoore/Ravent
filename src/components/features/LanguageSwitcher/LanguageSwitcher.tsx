import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/appStore'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const { language, setLanguage } = useAppStore()

  const handleToggle = () => {
    const newLang = language === 'ru' ? 'en' : 'ru'
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle language"
    >
      <span className="text-t3 font-body font-medium uppercase">
        {language}
      </span>
    </button>
  )
}

export default LanguageSwitcher
