import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useAppStore } from './store/appStore'
import HomePage from './pages/HomePage'
import './i18n/config'

function App() {
  const theme = useAppStore(state => state.theme)

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      if (systemTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [theme])

  return (
    <HashRouter> {/* ← ЗАМЕНИТЕ BrowserRouter на HashRouter */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  )
}

export default App