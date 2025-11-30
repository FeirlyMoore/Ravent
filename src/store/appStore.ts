import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  theme: 'light' | 'dark' | 'system'
  language: 'ru' | 'en'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLanguage: (language: 'ru' | 'en') => void
}

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      theme: 'system',
      language: 'ru',
      setTheme: theme => set({ theme }),
      setLanguage: language => set({ language }),
    }),
    {
      name: 'app-settings',
      partialize: state => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
)
