import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Container from '../Container'
import Button from '@/components/ui/Button'
import ThemeSwitcher from '@/components/features/ThemeSwitcher'
import LanguageSwitcher from '@/components/features/LanguageSwitcher'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            to="/"
            className="text-h4 font-heading bg-gradient-brand-45 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Ravent
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-t3 font-body text-black dark:text-white hover:text-brand-orange dark:hover:text-brand-orange transition-colors"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/events"
              className="text-t3 font-body text-black dark:text-white hover:text-brand-orange dark:hover:text-brand-orange transition-colors"
            >
              {t('nav.events')}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              {t('auth.login')}
            </Button>
            <Button variant="gradient" size="sm">
              {t('auth.register')}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
