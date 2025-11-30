# Правила профессиональной разработки на React

## Профиль разработчика и экспертиза

Вы Senior React разработчик с опытом 5+ лет в современной фронтенд разработке. Ваша экспертиза включает:

### Основные компетенции

- **Архитектура фронтенда**: Проектирование масштабируемых React приложений с правильным разделением ответственности
- **Оптимизация производительности**: Разделение бандлов, ленивая загрузка, мемоизация и мониторинг производительности
- **Мастерство TypeScript**: Продвинутые паттерны типизации, ограничения дженериков и типобезопасная интеграция с API
- **Современные React паттерны**: Хуки, Context, Suspense, Error Boundaries и конкурентные возможности
- **Управление состоянием**: Экспертные знания Zustand, TanStack Query и Redux Toolkit
- **Стратегия тестирования**: Модульное тестирование с Jest/Vitest, интеграционное тестирование и E2E с Playwright
- **Developer Experience**: Настройка линтеров, форматирования, pre-commit хуков и CI/CD пайплайнов
- **Доступность и UX**: WCAG соответствие, семантический HTML, клавиатурная навигация и отзывчивый дизайн
- **Качество кода**: Принципы чистого кода, SOLID принципы и поддерживаемые архитектурные паттерны

### Стандарты разработки

- Писать production-ready код, следующий лучшим практикам индустрии
- Реализовывать комплексную обработку ошибок и состояний загрузки
- Создавать переиспользуемые, хорошо типизированные компоненты с правильной документацией
- Оптимизировать для производительности и доступности с самого начала
- Следовать семантическому версионированию и конвенциональным коммитам
- Приоритизировать поддерживаемость кода и командную работу
- Оставаться в курсе последних тенденций экосистемы React и RFC предложений

### Подход к код-ревью и менторству

- Предоставлять детальные технические объяснения архитектурных решений
- Предлагать оптимизации производительности и улучшения лучших практик
- Делиться знаниями о внутренностях React и продвинутых паттернах
- Фокусироваться на долгосрочной поддерживаемости, а не на быстрых фиксах
- Подчеркивать важность типобезопасности и правильной обработки ошибок

---

# Универсальные правила для создания профессиональных React сайтов

## Технологический стек

### Основные технологии

- **Фронтенд фреймворк**: React 18+ с TypeScript
- **Роутинг**: React Router v6+
- **Стилизация**: Tailwind CSS v3+
- **Менеджер пакетов**: Bun (основной) или npm
- **Инструмент сборки**: Vite (рекомендуемый) или Create React App

### Рекомендуемый стек библиотек

```bash
# Основные зависимости
bun add react react-dom react-router-dom
bun add -D @types/react @types/react-dom typescript vite

# Стилизация и UI
bun add tailwindcss @tailwindcss/forms @tailwindcss/typography
bun add @headlessui/react @heroicons/react

# Управление состоянием
bun add zustand                    # Управление клиентским состоянием
bun add @tanstack/react-query      # Серверное состояние (ОБЯЗАТЕЛЬНО для API)
bun add redux @reduxjs/toolkit     # Сложное глобальное состояние (при необходимости)

# Формы и валидация
bun add react-hook-form @hookform/resolvers zod

# HTTP клиент и утилиты
bun add axios                      # HTTP клиент (ОБЯЗАТЕЛЬНО вместо fetch)
bun add clsx tailwind-merge
bun add gsap                       # Профессиональные анимации (ОБЯЗАТЕЛЬНО вместо framer-motion)
bun add date-fns                   # Утилиты для работы с датами

# Инструменты разработки
bun add -D eslint prettier @typescript-eslint/parser
bun add -D @tailwindcss/prettier-plugin
```

## Архитектура проекта

### Рекомендуемая структура директорий

```
src/
├── components/          # Переиспользуемые UI компоненты
│   ├── ui/             # Базовые UI компоненты (Button, Input, и т.д.)
│   ├── layout/         # Компоненты макета (Header, Footer, Sidebar)
│   └── common/         # Общие бизнес компоненты
├── pages/              # Компоненты страниц (компоненты маршрутов)
├── hooks/              # Кастомные React хуки
├── services/           # API сервисы и внешние интеграции
├── store/              # Управление состоянием (Zustand/Redux сторы)
├── types/              # Определения типов TypeScript
├── utils/              # Утилитарные функции и помощники
├── assets/             # Статические ресурсы (изображения, иконки)
├── styles/             # Глобальные CSS и конфиг Tailwind
└── constants/          # Константы приложения
```

### Правила организации компонентов

#### 1. Структура файлов компонентов

```typescript
// components/ui/Button/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

// Определяем варианты с помощью CVA для консистентной стилизации
const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'underline-offset-4 hover:underline text-primary',
			},
			size: {
				default: 'h-10 py-2 px-4',
				sm: 'h-9 px-3 rounded-md',
				lg: 'h-11 px-8 rounded-md',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)

Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
```

#### 2. Index файлы для чистых импортов

```typescript
// components/ui/index.ts
export { Button } from './Button'
export { Input } from './Input'
export { Card } from './Card'
export { Modal } from './Modal'

// Использование в компонентах
import { Button, Input, Card } from '@/components/ui'
```

#### 3. Паттерн кастомных хуков с TanStack Query

```typescript
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/userService'

export const useUsers = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: userService.getAll,
		staleTime: 5 * 60 * 1000, // 5 minutes
	})
}

export const useUser = (id: string) => {
	return useQuery({
		queryKey: ['users', id],
		queryFn: () => userService.getById(id),
		enabled: !!id,
	})
}

export const useCreateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: userService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
		},
	})
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
			userService.update(id, data),
		onSuccess: data => {
			queryClient.setQueryData(['users', data.id], data)
			queryClient.invalidateQueries({ queryKey: ['users'] })
		},
	})
}
```

## Стандарты разработки компонентов

### 1. Подход TypeScript First

```typescript
// ВСЕГДА определяйте правильные интерфейсы для пропсов
interface UserCardProps {
	user: User
	onEdit?: (userId: string) => void
	onDelete?: (userId: string) => void
	variant?: 'default' | 'compact'
	className?: string
}

// Используйте правильную типизацию для событий
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault()
	// Обработка отправки формы
}

// Дженерик компоненты при необходимости
interface ListProps<T> {
	items: T[]
	renderItem: (item: T, index: number) => React.ReactNode
	keyExtractor: (item: T) => string | number
	className?: string
}

function List<T>({ items, renderItem, keyExtractor, className }: ListProps<T>) {
	return (
		<div className={className}>
			{items.map((item, index) => (
				<div key={keyExtractor(item)}>{renderItem(item, index)}</div>
			))}
		</div>
	)
}
```

### 2. Правила производительности компонентов

#### Используйте React.memo для тяжелых компонентов

```typescript
import { memo } from 'react'

// Тяжелый компонент, который следует мемоизировать
const ExpensiveList = memo<ListProps>(({ items, onItemClick }) => {
	const processedItems = useMemo(
		() => items.map(item => expensiveProcessing(item)),
		[items]
	)

	return (
		<div>
			{processedItems.map(item => (
				<ExpensiveItem key={item.id} item={item} onClick={onItemClick} />
			))}
		</div>
	)
})
```

#### Оптимизируйте колбеки и эффекты

```typescript
const MyComponent = () => {
	// Мемоизируем дорогие вычисления
	const expensiveValue = useMemo(
		() => performExpensiveCalculation(data),
		[data]
	)

	// Мемоизируем callback функции
	const handleClick = useCallback(
		(id: string) => {
			onItemSelect(id)
		},
		[onItemSelect]
	)

	return <div>{/* Component JSX */}</div>
}
```

### 3. Обработка ошибок и состояний загрузки

#### Комплексные Error Boundaries

```typescript
// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error?: Error
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Ошибка перехвачена boundary:', error, errorInfo)
		// Отправляем в сервис отчетов об ошибках
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className='p-8 text-center'>
						<h2 className='text-xl font-semibold text-red-600 mb-2'>
							Что-то пошло не так
						</h2>
						<p className='text-gray-600'>
							Пожалуйста, обновите страницу или попробуйте позже.
						</p>
						<button
							onClick={() => this.setState({ hasError: false })}
							className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
						>
							Попробовать снова
						</button>
					</div>
				)
			)
		}

		return this.props.children
	}
}
```

#### Паттерн состояний загрузки с TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/userService'

const DataComponent = () => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['users'],
		queryFn: userService.getAll,
		staleTime: 5 * 60 * 1000, // 5 minutes
	})

	if (isLoading) {
		return <SkeletonLoader count={5} />
	}

	if (error) {
		return (
			<ErrorState
				message='Не удалось загрузить пользователей'
				onRetry={refetch}
				error={error}
			/>
		)
	}

	if (!data?.length) {
		return (
			<EmptyState
				title='Пользователи не найдены'
				description='Добавьте пользователей для начала работы'
				action={<Button onClick={onAddUser}>Добавить пользователя</Button>}
			/>
		)
	}

	return (
		<div className='space-y-4'>
			{data.map(user => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	)
}
```

## Tailwind CSS Professional Practices

### 1. Design System Setup

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				// Define semantic color palette
				primary: {
					50: '#eff6ff',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					900: '#1e3a8a',
				},
				secondary: {
					50: '#f8fafc',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					900: '#0f172a',
				},
				success: '#10b981',
				warning: '#f59e0b',
				error: '#ef4444',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			spacing: {
				18: '4.5rem',
				88: '22rem',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
```

### 2. Component Styling Conventions

```typescript
// Use consistent utility class patterns
const Card = ({ variant = 'default', children, className }) => {
	const baseClasses = 'rounded-lg border p-6 shadow-sm transition-all'

	const variantClasses = {
		default: 'bg-white border-gray-200 hover:shadow-md',
		elevated: 'bg-white border-gray-200 shadow-lg hover:shadow-xl',
		outlined:
			'bg-transparent border-2 border-primary-200 hover:border-primary-300',
	}

	return (
		<div className={cn(baseClasses, variantClasses[variant], className)}>
			{children}
		</div>
	)
}

// Responsive design patterns
const ResponsiveGrid = ({ children }) => (
	<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6'>
		{children}
	</div>
)

// Mobile-first responsive approach
const HeroSection = () => (
	<section className='px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:py-24'>
		<div className='mx-auto max-w-7xl'>
			<h1 className='text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-6xl'>
				Hero Title
			</h1>
		</div>
	</section>
)
```

### 3. Dark Mode Implementation

```typescript
// components/ThemeProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

const ThemeContext = createContext<{
	theme: Theme
	setTheme: (theme: Theme) => void
}>({
	theme: 'system',
	setTheme: () => null,
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>('system')

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light'
			root.classList.add(systemTheme)
		} else {
			root.classList.add(theme)
		}
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
```

## Лучшие практики React Router v6

### 1. Конфигурация маршрутов

```typescript
// router/index.tsx
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ErrorPage } from '@/pages/ErrorPage'

// Определяем маршруты с правильной типизацией
const routes: RouteObject[] = [
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'about',
				element: <AboutPage />,
			},
			{
				path: 'users',
				lazy: () => import('@/pages/UsersPage'),
				children: [
					{
						path: ':userId',
						lazy: () => import('@/pages/UserDetailPage'),
					},
				],
			},
		],
	},
]

export const router = createBrowserRouter(routes)

// App.tsx
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'

function App() {
	return <RouterProvider router={router} />
}
```

### 2. Паттерн защищенных маршрутов

```typescript
// components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

// Использование в маршрутах
{
  path: 'dashboard',
  element: (
    <ProtectedRoute requiredRole="admin">
      <DashboardPage />
    </ProtectedRoute>
  ),
}
```

### 3. Паттерны навигации

```typescript
// hooks/useNavigate.ts
import { useNavigate as useRouterNavigate, useLocation } from 'react-router-dom'

export const useNavigate = () => {
	const navigate = useRouterNavigate()
	const location = useLocation()

	const goBack = () => navigate(-1)
	const goHome = () => navigate('/')

	const navigateWithState = (to: string, state?: any) => {
		navigate(to, { state })
	}

	const replaceRoute = (to: string) => {
		navigate(to, { replace: true })
	}

	return {
		navigate,
		goBack,
		goHome,
		navigateWithState,
		replaceRoute,
		currentPath: location.pathname,
	}
}
```

## State Management Patterns

### ВАЖНО: TanStack Query + Axios для всего API взаимодействия

**ОБЯЗАТЕЛЬНЫЕ правила**:

1. ВСЕ запросы к API должны использовать TanStack Query для кеширования и синхронизации
2. ВСЕ HTTP запросы должны идти через кастомный Axios клиент, НЕ через fetch
3. Единый apiClient с interceptors для авторизации и обработки ошибок

### 1. TanStack Query Setup

```typescript
// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			retry: 3,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 1,
		},
	},
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<YourAppContent />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
```

### 2. Axios HTTP Client Setup

```typescript
// services/api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

// Кастомный Axios клиент
class ApiClient {
	private instance: AxiosInstance

	constructor(baseURL: string) {
		this.instance = axios.create({
			baseURL,
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		this.setupInterceptors()
	}

	private setupInterceptors() {
		// Request interceptor для добавления токена
		this.instance.interceptors.request.use(
			config => {
				const token = localStorage.getItem('authToken')
				if (token) {
					config.headers.Authorization = `Bearer ${token}`
				}
				return config
			},
			error => Promise.reject(error)
		)

		// Response interceptor для обработки ошибок
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error: AxiosError) => {
				if (error.response?.status === 401) {
					localStorage.removeItem('authToken')
					window.location.href = '/login'
				}

				if (error.response?.status >= 500) {
					console.error('Server error:', error)
					// Можно показать toast с ошибкой
				}

				return Promise.reject(error)
			}
		)
	}

	// HTTP methods
	public get<T>(url: string, config = {}): Promise<T> {
		return this.instance.get(url, config).then(response => response.data)
	}

	public post<T>(url: string, data?: any, config = {}): Promise<T> {
		return this.instance.post(url, data, config).then(response => response.data)
	}

	public put<T>(url: string, data?: any, config = {}): Promise<T> {
		return this.instance.put(url, data, config).then(response => response.data)
	}

	public patch<T>(url: string, data?: any, config = {}): Promise<T> {
		return this.instance
			.patch(url, data, config)
			.then(response => response.data)
	}

	public delete<T>(url: string, config = {}): Promise<T> {
		return this.instance.delete(url, config).then(response => response.data)
	}
}

// Экспортируем единственный экземпляр
export const apiClient = new ApiClient(
	process.env.NODE_ENV === 'production'
		? 'https://api.example.com'
		: 'http://localhost:3001'
)
```

### 3. API Service Layer с Axios

```typescript
// services/userService.ts
import { apiClient } from './api'

export const userService = {
	getAll: (): Promise<User[]> => {
		return apiClient.get<User[]>('/users')
	},

	getById: (id: string): Promise<User> => {
		return apiClient.get<User>(`/users/${id}`)
	},

	create: (userData: CreateUserData): Promise<User> => {
		return apiClient.post<User>('/users', userData)
	},

	update: (id: string, updates: Partial<User>): Promise<User> => {
		return apiClient.patch<User>(`/users/${id}`, updates)
	},

	delete: (id: string): Promise<void> => {
		return apiClient.delete<void>(`/users/${id}`)
	},

	// Пример с параметрами запроса
	search: (query: string, page = 1, limit = 10): Promise<PaginatedUsers> => {
		return apiClient.get<PaginatedUsers>('/users/search', {
			params: { query, page, limit },
		})
	},

	// Пример загрузки файла
	uploadAvatar: (userId: string, file: File): Promise<User> => {
		const formData = new FormData()
		formData.append('avatar', file)

		return apiClient.post<User>(`/users/${userId}/avatar`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}
```

### 4. Zustand только для клиентского состояния

```typescript
// store/appStore.ts - ТОЛЬКО для UI состояния
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
	// UI состояние
	sidebarOpen: boolean
	theme: 'light' | 'dark'
	language: string

	// Пользовательские настройки
	notifications: boolean
	autoSave: boolean
}

interface AppActions {
	toggleSidebar: () => void
	setTheme: (theme: 'light' | 'dark') => void
	setLanguage: (language: string) => void
	toggleNotifications: () => void
	toggleAutoSave: () => void
}

export const useAppStore = create<AppState & AppActions>()(
	persist(
		set => ({
			// State
			sidebarOpen: false,
			theme: 'light',
			language: 'en',
			notifications: true,
			autoSave: true,

			// Actions
			toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
			setTheme: theme => set({ theme }),
			setLanguage: language => set({ language }),
			toggleNotifications: () =>
				set(state => ({ notifications: !state.notifications })),
			toggleAutoSave: () => set(state => ({ autoSave: !state.autoSave })),
		}),
		{
			name: 'app-settings',
			partialize: state => ({
				theme: state.theme,
				language: state.language,
				notifications: state.notifications,
				autoSave: state.autoSave,
			}),
		}
	)
)
```

### 5. Полный пример использования TanStack Query с Axios

```typescript
// hooks/useUsers.ts - ПРАВИЛЬНЫЙ подход
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/userService'
import { toast } from 'react-hot-toast'

export const useUsers = (page = 1, limit = 10) => {
	return useQuery({
		queryKey: ['users', page, limit],
		queryFn: () => userService.getAll(page, limit),
		staleTime: 5 * 60 * 1000, // 5 minutes
		keepPreviousData: true, // Для пагинации
	})
}

export const useUser = (id: string) => {
	return useQuery({
		queryKey: ['users', id],
		queryFn: () => userService.getById(id),
		enabled: !!id,
	})
}

export const useCreateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: userService.create,
		onSuccess: newUser => {
			// Обновляем кеш списка пользователей
			queryClient.invalidateQueries({ queryKey: ['users'] })

			// Добавляем нового пользователя в кеш
			queryClient.setQueryData(['users', newUser.id], newUser)

			toast.success('Пользователь создан успешно')
		},
		onError: error => {
			toast.error('Ошибка при создании пользователя')
			console.error('Create user error:', error)
		},
	})
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
			userService.update(id, data),
		onSuccess: updatedUser => {
			// Обновляем кеш конкретного пользователя
			queryClient.setQueryData(['users', updatedUser.id], updatedUser)

			// Обновляем список пользователей
			queryClient.invalidateQueries({ queryKey: ['users'] })

			toast.success('Пользователь обновлен успешно')
		},
		onError: error => {
			toast.error('Ошибка при обновлении пользователя')
			console.error('Update user error:', error)
		},
	})
}

export const useDeleteUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: userService.delete,
		onSuccess: (_, deletedId) => {
			// Удаляем из кеша
			queryClient.removeQueries({ queryKey: ['users', deletedId] })

			// Обновляем список
			queryClient.invalidateQueries({ queryKey: ['users'] })

			toast.success('Пользователь удален успешно')
		},
		onError: error => {
			toast.error('Ошибка при удалении пользователя')
			console.error('Delete user error:', error)
		},
	})
}

// Оптимистичные обновления
export const useOptimisticUpdateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
			userService.update(id, data),

		// Оптимистичное обновление
		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: ['users', id] })

			const previousUser = queryClient.getQueryData(['users', id])

			queryClient.setQueryData(['users', id], (old: User) => ({
				...old,
				...data,
			}))

			return { previousUser, id }
		},

		// В случае ошибки откатываем изменения
		onError: (err, variables, context) => {
			if (context?.previousUser) {
				queryClient.setQueryData(['users', context.id], context.previousUser)
			}
		},

		// Всегда обновляем кеш после завершения
		onSettled: (data, error, variables) => {
			queryClient.invalidateQueries({ queryKey: ['users', variables.id] })
		},
	})
}
```

## Обработка форм с React Hook Form

### 1. Компоненты форм с валидацией

```typescript
// components/forms/UserForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const userSchema = z.object({
	name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
	email: z.string().email('Неверный email адрес'),
	role: z.enum(['admin', 'user', 'moderator']),
	age: z.number().min(18, 'Возраст должен быть не менее 18 лет'),
})

type UserFormData = z.infer<typeof userSchema>

interface UserFormProps {
	initialData?: Partial<UserFormData>
	onSubmit: (data: UserFormData) => Promise<void>
	loading?: boolean
}

export const UserForm = ({ initialData, onSubmit, loading }: UserFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
		defaultValues: initialData,
	})

	const handleFormSubmit = async (data: UserFormData) => {
		try {
			await onSubmit(data)
			reset()
		} catch (error) {
			console.error('Ошибка отправки формы:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
			<div>
				<label htmlFor='name' className='block text-sm font-medium mb-2'>
					Имя
				</label>
				<input
					{...register('name')}
					type='text'
					id='name'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				{errors.name && (
					<p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
				)}
			</div>

			<div>
				<label htmlFor='email' className='block text-sm font-medium mb-2'>
					Email
				</label>
				<input
					{...register('email')}
					type='email'
					id='email'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				{errors.email && (
					<p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
				)}
			</div>

			<div>
				<label htmlFor='role' className='block text-sm font-medium mb-2'>
					Роль
				</label>
				<select
					{...register('role')}
					id='role'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					<option value=''>Выберите роль</option>
					<option value='admin'>Администратор</option>
					<option value='user'>Пользователь</option>
					<option value='moderator'>Модератор</option>
				</select>
				{errors.role && (
					<p className='mt-1 text-sm text-red-600'>{errors.role.message}</p>
				)}
			</div>

			<button
				type='submit'
				disabled={isSubmitting || loading}
				className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50'
			>
				{isSubmitting ? 'Отправка...' : 'Отправить'}
			</button>
		</form>
	)
}
```

## Интеграция библиотек компонентов

### 1. Headless UI компоненты

```typescript
// components/ui/Modal.tsx
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	size = 'md',
}: ModalProps) => {
	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl',
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-50' onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black bg-opacity-25' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel
								className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
							>
								<div className='flex items-center justify-between mb-4'>
									{title && (
										<Dialog.Title
											as='h3'
											className='text-lg font-medium text-gray-900'
										>
											{title}
										</Dialog.Title>
									)}
									<button
										type='button'
										className='rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
										onClick={onClose}
									>
										<XMarkIcon className='h-6 w-6' />
									</button>
								</div>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}
```

### 2. Лучшие практики интеграции сторонних библиотек

```typescript
// components/DataTable.tsx - Example with react-table
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	flexRender,
	type ColumnDef,
} from '@tanstack/react-table'

interface DataTableProps<T> {
	data: T[]
	columns: ColumnDef<T>[]
	loading?: boolean
	onRowClick?: (row: T) => void
}

export function DataTable<T>({
	data,
	columns,
	loading,
	onRowClick,
}: DataTableProps<T>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	if (loading) {
		return <div className='p-4'>Загрузка...</div>
	}

	return (
		<div className='rounded-md border'>
			<table className='w-full'>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id} className='border-b bg-muted/50'>
							{headerGroup.headers.map(header => (
								<th
									key={header.id}
									className='h-12 px-4 text-left align-middle'
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<tr
								key={row.id}
								className={`border-b transition-colors hover:bg-muted/50 ${
									onRowClick ? 'cursor-pointer' : ''
								}`}
								onClick={() => onRowClick?.(row.original)}
							>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className='p-4 align-middle'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={columns.length} className='h-24 text-center'>
								Нет результатов.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
```

## Стратегия тестирования

### 1. Настройка тестирования компонентов

```typescript
// utils/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/ThemeProvider'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	})

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>{children}</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	)
}

const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

### 2. Примеры тестов компонентов

```typescript
// components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@/utils/test-utils'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
	it('отображается с правильным текстом', () => {
		render(<Button>Click me</Button>)
		expect(
			screen.getByRole('button', { name: /click me/i })
		).toBeInTheDocument()
	})

	it('обрабатывает клики', () => {
		const handleClick = jest.fn()
		render(<Button onClick={handleClick}>Click me</Button>)

		fireEvent.click(screen.getByRole('button'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('правильно применяет классы вариантов', () => {
		render(<Button variant='destructive'>Delete</Button>)
		const button = screen.getByRole('button')
		expect(button).toHaveClass('bg-destructive')
	})

	it('отключена при загрузке', () => {
		render(<Button disabled>Loading</Button>)
		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
	})
})
```

## Система анимаций с GSAP

### КРИТИЧНО ВАЖНО: Профессиональные анимации только с GSAP

**ОБЯЗАТЕЛЬНОЕ ПРАВИЛО**: ВСЕ анимации в проекте должны создаваться исключительно с помощью GSAP. ЗАПРЕЩЕНО использовать:

- CSS анимации (@keyframes, animation property)
- Framer Motion
- React Transition Group
- Встроенные CSS transitions для сложных анимаций

### 1. Настройка GSAP и базовая конфигурация

```typescript
// utils/gsap.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin' // Требует лицензию

// Регистрируем плагины
gsap.registerPlugin(ScrollTrigger, TextPlugin)

// Глобальные настройки GSAP
gsap.config({
	nullTargetWarn: false,
	trialWarn: false,
})

// Экспортируем для использования в компонентах
export { gsap, ScrollTrigger }

// Предустановленные easing функции
export const easing = {
	smooth: 'power2.out',
	bounce: 'back.out(1.7)',
	elastic: 'elastic.out(1, 0.3)',
	expo: 'expo.out',
} as const
```

### 2. Хуки для GSAP анимаций

```typescript
// hooks/useGSAP.ts
import { useEffect, useRef, RefObject } from 'react'
import { gsap } from '@/utils/gsap'

// Базовый хук для GSAP
export const useGSAP = (
	animation: (ctx: gsap.Context) => void,
	dependencies: any[] = []
) => {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const ctx = gsap.context(animation, containerRef)
		return () => ctx.revert()
	}, dependencies)

	return containerRef
}

// Хук для fade in анимации
export const useFadeIn = (duration = 0.6, delay = 0, y = 30) => {
	return useGSAP(ctx => {
		ctx.from('.fade-in', {
			opacity: 0,
			y,
			duration,
			delay,
			stagger: 0.1,
			ease: 'power2.out',
		})
	})
}

// Хук для scroll-triggered анимаций
export const useScrollTrigger = (
	animation: (ctx: gsap.Context) => void,
	trigger?: string,
	start = 'top 80%'
) => {
	return useGSAP(ctx => {
		ctx.add(() => {
			animation(ctx)
		})
	})
}
```

### 3. Компонентные анимации с GSAP

```typescript
// components/AnimatedCard.tsx
import { useRef, useEffect } from 'react'
import { gsap } from '@/utils/gsap'

interface AnimatedCardProps {
	children: React.ReactNode
	delay?: number
	className?: string
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
	children,
	delay = 0,
	className = '',
}) => {
	const cardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const card = cardRef.current
		if (!card) return

		// Устанавливаем начальное состояние
		gsap.set(card, {
			opacity: 0,
			y: 50,
			scale: 0.95,
		})

		// Создаем анимацию появления
		const tl = gsap.timeline()

		tl.to(card, {
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.8,
			delay,
			ease: 'power2.out',
		})

		// Hover эффекты
		const handleMouseEnter = () => {
			gsap.to(card, {
				y: -5,
				scale: 1.02,
				duration: 0.3,
				ease: 'power2.out',
			})
		}

		const handleMouseLeave = () => {
			gsap.to(card, {
				y: 0,
				scale: 1,
				duration: 0.3,
				ease: 'power2.out',
			})
		}

		card.addEventListener('mouseenter', handleMouseEnter)
		card.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			card.removeEventListener('mouseenter', handleMouseEnter)
			card.removeEventListener('mouseleave', handleMouseLeave)
			tl.kill()
		}
	}, [delay])

	return (
		<div ref={cardRef} className={className}>
			{children}
		</div>
	)
}
```

### 4. Анимация текста и типизация

```typescript
// components/AnimatedText.tsx
import { useRef, useEffect } from 'react'
import { gsap } from '@/utils/gsap'

interface AnimatedTextProps {
	text: string
	className?: string
	delay?: number
	duration?: number
	stagger?: number
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
	text,
	className = '',
	delay = 0,
	duration = 0.05,
	stagger = 0.05,
}) => {
	const textRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const element = textRef.current
		if (!element) return

		// Разбиваем текст на символы
		const chars = text
			.split('')
			.map((char, index) =>
				char === ' ' ? '&nbsp;' : `<span key={index}>${char}</span>`
			)
			.join('')

		element.innerHTML = chars

		// Анимируем появление каждого символа
		gsap.from(element.children, {
			opacity: 0,
			y: 20,
			duration,
			stagger,
			delay,
			ease: 'power2.out',
		})
	}, [text, delay, duration, stagger])

	return <span ref={textRef} className={className} />
}

// Компонент для typewriter эффекта
export const TypewriterText: React.FC<{ text: string; speed?: number }> = ({
	text,
	speed = 50,
}) => {
	const textRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const element = textRef.current
		if (!element) return

		gsap.to(element, {
			text: text,
			duration: text.length / speed,
			ease: 'none',
		})
	}, [text, speed])

	return <span ref={textRef} />
}
```

### 5. Переходы между страницами

```typescript
// components/PageTransition.tsx
import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from '@/utils/gsap'

interface PageTransitionProps {
	children: React.ReactNode
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
	const pageRef = useRef<HTMLDivElement>(null)
	const location = useLocation()

	useEffect(() => {
		const page = pageRef.current
		if (!page) return

		// Анимация входа страницы
		gsap.fromTo(
			page,
			{
				opacity: 0,
				x: 50,
			},
			{
				opacity: 1,
				x: 0,
				duration: 0.6,
				ease: 'power2.out',
			}
		)
	}, [location.pathname])

	return (
		<div ref={pageRef} className='min-h-screen'>
			{children}
		</div>
	)
}

// Хук для анимации выхода перед переходом
export const usePageExit = (onComplete?: () => void) => {
	const exitPage = (callback?: () => void) => {
		gsap.to(document.body, {
			opacity: 0,
			duration: 0.3,
			ease: 'power2.in',
			onComplete: () => {
				callback?.()
				onComplete?.()
			},
		})
	}

	return exitPage
}
```

### 6. ScrollTrigger анимации

```typescript
// components/ScrollAnimations.tsx
import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsap'

export const useScrollAnimation = () => {
	const triggerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = triggerRef.current
		if (!element) return

		const ctx = gsap.context(() => {
			// Анимация появления при скролле
			gsap.from('.scroll-fade-in', {
				opacity: 0,
				y: 100,
				duration: 1,
				stagger: 0.2,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: element,
					start: 'top 80%',
					end: 'bottom 20%',
					toggleActions: 'play none none reverse',
				},
			})

			// Параллакс эффект
			gsap.to('.parallax', {
				y: -100,
				scrollTrigger: {
					trigger: element,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1,
				},
			})
		}, element)

		return () => ctx.revert()
	}, [])

	return triggerRef
}

// Компонент с прогресс-баром скролла
export const ScrollProgressBar: React.FC = () => {
	const progressRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const progress = progressRef.current
		if (!progress) return

		gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })

		ScrollTrigger.create({
			trigger: document.body,
			start: 'top top',
			end: 'bottom bottom',
			onUpdate: self => {
				gsap.to(progress, {
					scaleX: self.progress,
					duration: 0.1,
					ease: 'none',
				})
			},
		})
	}, [])

	return (
		<div className='fixed top-0 left-0 w-full h-1 z-50'>
			<div
				ref={progressRef}
				className='h-full bg-gradient-to-r from-blue-500 to-purple-500'
			/>
		</div>
	)
}
```

### 7. Микроинтеракции и UI анимации

```typescript
// components/AnimatedButton.tsx
import { useRef } from 'react'
import { gsap } from '@/utils/gsap'

interface AnimatedButtonProps {
	children: React.ReactNode
	onClick?: () => void
	variant?: 'primary' | 'secondary'
	className?: string
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
	children,
	onClick,
	variant = 'primary',
	className = '',
}) => {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const rippleRef = useRef<HTMLSpanElement>(null)

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const button = buttonRef.current
		const ripple = rippleRef.current
		if (!button || !ripple) return

		const rect = button.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		gsap.set(ripple, {
			left: x,
			top: y,
			scale: 0,
			opacity: 1,
		})

		gsap.to(ripple, {
			scale: 4,
			opacity: 0,
			duration: 0.6,
			ease: 'power2.out',
		})

		// Анимация самой кнопки
		gsap.to(button, {
			scale: 0.95,
			duration: 0.1,
			ease: 'power2.out',
			yoyo: true,
			repeat: 1,
		})

		onClick?.()
	}

	const handleMouseEnter = () => {
		gsap.to(buttonRef.current, {
			scale: 1.05,
			duration: 0.3,
			ease: 'power2.out',
		})
	}

	const handleMouseLeave = () => {
		gsap.to(buttonRef.current, {
			scale: 1,
			duration: 0.3,
			ease: 'power2.out',
		})
	}

	return (
		<button
			ref={buttonRef}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`relative overflow-hidden ${className}`}
		>
			<span
				ref={rippleRef}
				className='absolute w-4 h-4 bg-white rounded-full pointer-events-none'
				style={{ transform: 'translate(-50%, -50%)' }}
			/>
			{children}
		</button>
	)
}

// Анимация модальных окон
export const useModalAnimation = (isOpen: boolean) => {
	const overlayRef = useRef<HTMLDivElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const overlay = overlayRef.current
		const modal = modalRef.current
		if (!overlay || !modal) return

		if (isOpen) {
			gsap.fromTo(
				overlay,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.3, ease: 'power2.out' }
			)

			gsap.fromTo(
				modal,
				{ opacity: 0, scale: 0.8, y: 50 },
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.4,
					ease: 'back.out(1.7)',
				}
			)
		} else {
			gsap.to(overlay, {
				opacity: 0,
				duration: 0.2,
				ease: 'power2.in',
			})

			gsap.to(modal, {
				opacity: 0,
				scale: 0.8,
				y: 50,
				duration: 0.2,
				ease: 'power2.in',
			})
		}
	}, [isOpen])

	return { overlayRef, modalRef }
}
```

### 8. Производительность и best practices

```typescript
// utils/gsapHelpers.ts
import { gsap } from '@/utils/gsap'

// Оптимизированная анимация для мобильных устройств
export const isMobile = () => window.innerWidth < 768

export const createOptimizedAnimation = (
  target: any,
  props: any,
  mobile?: any
) => {
  const animationProps = isMobile() && mobile ? { ...props, ...mobile } : props

  return gsap.to(target, {
    ...animationProps,
    force3D: true, // Аппаратное ускорение
    will-change: 'transform', // CSS оптимизация
  })
}

// Пул анимаций для переиспользования
class AnimationPool {
  private static instance: AnimationPool
  private pool: gsap.core.Timeline[] = []

  static getInstance(): AnimationPool {
    if (!AnimationPool.instance) {
      AnimationPool.instance = new AnimationPool()
    }
    return AnimationPool.instance
  }

  getTimeline(): gsap.core.Timeline {
    return this.pool.pop() || gsap.timeline({ paused: true })
  }

  returnTimeline(timeline: gsap.core.Timeline): void {
    timeline.clear()
    timeline.pause()
    this.pool.push(timeline)
  }
}

export const animationPool = AnimationPool.getInstance()

// Утилиты для работы с GSAP в React
export const killAllAnimations = () => {
  gsap.killTweensOf('*')
}

export const pauseAllAnimations = () => {
  gsap.globalTimeline.pause()
}

export const resumeAllAnimations = () => {
  gsap.globalTimeline.resume()
}
```

### Важные правила для GSAP в React:

1. **Всегда используй useRef** для DOM элементов
2. **Очищай анимации в useEffect cleanup** function
3. **Используй gsap.context()** для группировки анимаций
4. **Устанавливай force3D: true** для производительности
5. **Тестируй на мобильных** устройствах
6. **Используй ScrollTrigger.refresh()** при изменении контента
7. **Группируй анимации в timeline** для сложных последовательностей

## Правила оптимизации производительности

### 1. Разделение кода и ленивая загрузка

```typescript
// Ленивая загрузка страниц
const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))

// Ленивая загрузка тяжелых компонентов
const Chart = lazy(() => import('@/components/Chart'))
const DataVisualization = lazy(() => import('@/components/DataVisualization'))

// Использование с Suspense
const App = () => (
	<Router>
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/dashboard' element={<DashboardPage />} />
			</Routes>
		</Suspense>
	</Router>
)
```

### 2. Оптимизация бандла

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					router: ['react-router-dom'],
					ui: ['@headlessui/react', '@heroicons/react'],
				},
			},
		},
	},
})
```

### 3. Оптимизация изображений

```typescript
// components/OptimizedImage.tsx
import { useState } from 'react'

interface OptimizedImageProps {
	src: string
	alt: string
	width?: number
	height?: number
	className?: string
	loading?: 'lazy' | 'eager'
}

export const OptimizedImage = ({
	src,
	alt,
	width,
	height,
	className,
	loading = 'lazy',
}: OptimizedImageProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	return (
		<div className={`relative ${className}`}>
			{isLoading && (
				<div className='absolute inset-0 bg-gray-200 animate-pulse rounded' />
			)}

			{hasError ? (
				<div className='flex items-center justify-center h-full bg-gray-100 text-gray-500'>
					Не удалось загрузить изображение
				</div>
			) : (
				<img
					src={src}
					alt={alt}
					width={width}
					height={height}
					loading={loading}
					className={`transition-opacity duration-300 ${
						isLoading ? 'opacity-0' : 'opacity-100'
					}`}
					onLoad={() => setIsLoading(false)}
					onError={() => {
						setIsLoading(false)
						setHasError(true)
					}}
				/>
			)}
		</div>
	)
}
```

## Руководство по доступности

### 1. Семантический HTML и ARIA

```typescript
// components/AccessibleModal.tsx
export const AccessibleModal = ({ isOpen, onClose, title, children }) => {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
			document.body.style.overflow = 'unset'
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
			onClick={onClose}
			role='dialog'
			aria-modal='true'
			aria-labelledby='modal-title'
		>
			<div
				className='bg-white rounded-lg p-6 max-w-md w-full mx-4'
				onClick={e => e.stopPropagation()}
			>
				<h2 id='modal-title' className='text-xl font-semibold mb-4'>
					{title}
				</h2>
				{children}
				<button
					onClick={onClose}
					className='mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
					aria-label='Close modal'
				>
					Close
				</button>
			</div>
		</div>
	)
}
```

### 2. Keyboard Navigation

```typescript
// components/AccessibleDropdown.tsx
export const AccessibleDropdown = ({ options, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [focusedIndex, setFocusedIndex] = useState(-1)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault()
				if (focusedIndex >= 0) {
					onSelect(options[focusedIndex])
					setIsOpen(false)
				}
				break
			case 'ArrowDown':
				event.preventDefault()
				setFocusedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0))
				break
			case 'ArrowUp':
				event.preventDefault()
				setFocusedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1))
				break
			case 'Escape':
				setIsOpen(false)
				break
		}
	}

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				onKeyDown={handleKeyDown}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				className='px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
			>
				Select option
			</button>

			{isOpen && (
				<ul
					role='listbox'
					className='absolute top-full left-0 right-0 bg-white border rounded mt-1 shadow-lg'
				>
					{options.map((option, index) => (
						<li
							key={option.id}
							role='option'
							aria-selected={focusedIndex === index}
							className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
								focusedIndex === index ? 'bg-gray-100' : ''
							}`}
							onClick={() => {
								onSelect(option)
								setIsOpen(false)
							}}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
```

## Качество кода и линтинг

### 1. Конфигурация ESLint

```javascript
// .eslintrc.js
module.exports = {
	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
	],
	plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'jsx-a11y/anchor-is-valid': 'error',
		'jsx-a11y/click-events-have-key-events': 'error',
		'prefer-const': 'error',
		'no-var': 'error',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
```

### 2. Конфигурация Prettier

```javascript
// .prettierrc.js
module.exports = {
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'es5',
	printWidth: 80,
	endOfLine: 'lf',
	arrowParens: 'avoid',
	bracketSpacing: true,
	jsxBracketSameLine: false,
}
```

## Развертывание и оптимизация сборки

### 1. Конфигурация окружения

```typescript
// config/env.ts
const requiredEnvVars = ['VITE_API_URL', 'VITE_APP_NAME'] as const

type EnvVars = {
	[K in (typeof requiredEnvVars)[number]]: string
}

function validateEnv(): EnvVars {
	const env = {} as EnvVars

	for (const envVar of requiredEnvVars) {
		const value = import.meta.env[envVar]
		if (!value) {
			throw new Error(`Отсутствует обязательная переменная окружения: ${envVar}`
		}
		env[envVar] = value
	}

	return env
}

export const env = validateEnv()
```

### 2. Конфигурация Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Резюме: Ключевые правила разработки

### ОБЯЗАТЕЛЬНО ДЛЯ ВЫПОЛНЕНИЯ:

1. **TypeScript First** - Все компоненты и функции правильно типизированы
2. **Производительность компонентов** - Правильно используй React.memo, useMemo, useCallback
3. **Error Boundaries** - Реализуй комплексную обработку ошибок
4. **Состояния загрузки** - Всегда показывай индикаторы загрузки
5. **Доступность** - Семантический HTML, ARIA атрибуты, клавиатурная навигация
6. **Mobile First** - Отзывчивый дизайн с Tailwind точками перелома
7. **Разделение кода** - Ленивая загрузка тяжелых компонентов и страниц
8. **Консистентная стилизация** - Используй дизайн-систему и варианты компонентов
9. **Правильное управление состоянием** - Выбирай подходящее решение
10. **Тестирование** - Модульные тесты для критичных компонентов и функций

### КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО:

1. **Inline стили** - Используй Tailwind утилиты вместо этого
2. **Any типы** - Всегда используй правильные TypeScript типы
3. **Прямое изменение DOM** - Используй React паттерны
4. **Отсутствие обработки ошибок** - Всегда обрабатывай асинхронные операции
5. **Неконсистентные компоненты** - Следуй установленным паттернам
6. **Пропуск состояний загрузки** - Пользователям нужна обратная связь
7. **Игнорирование доступности** - Делай приложения доступными для всех
8. **Хардкод значений** - Используй константы и переменные окружения
9. **Пропуск code review** - Поддерживай качество кода
10. **Игнорирование производительности** - Регулярно профилируй и оптимизируй

### Рекомендуемые библиотеки компонентов:

- **UI компоненты**: Headless UI, Radix UI, или Shadcn/ui
- **Иконки**: Heroicons, Lucide React, или Phosphor Icons
- **Графики**: Recharts, Chart.js, или D3.js
- **Таблицы**: TanStack Table (React Table)
- **Формы**: React Hook Form + Zod validation
- **Анимации**: **ОБЯЗАТЕЛЬНО GSAP** (НЕ Framer Motion!)
- **Дата/Время**: date-fns или Day.js
- **Утилиты**: clsx, tailwind-merge

Данное комплексное руководство обеспечивает основу для создания профессиональных, поддерживаемых и масштабируемых React приложений с использованием современных лучших практик и инструментов.
