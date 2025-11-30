import { format } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'

/**
 * Форматирует дату события в читаемый формат
 * @param date - дата события
 * @param locale - локаль (ru или en)
 * @returns отформатированная строка даты
 */
export const formatEventDate = (date: Date, locale: 'ru' | 'en' = 'ru'): string => {
  const localeObj = locale === 'ru' ? ru : enUS

  const dateStr = format(date, 'd MMMM', { locale: localeObj })
  const timeStr = format(date, 'HH:mm')

  return `${dateStr}, ${timeStr}`
}

/**
 * Форматирует цену с валютой
 * @param price - объект с ценой (min, max, currency)
 * @param locale - локаль (ru или en)
 * @returns отформатированная строка цены
 */
export const formatPrice = (
  price: {
    min: number
    max: number
    currency: 'RUB' | 'USD' | 'EUR'
  },
  locale: 'ru' | 'en' = 'ru'
): string => {
  const currencySymbol = {
    RUB: '₽',
    USD: '$',
    EUR: '€',
  }[price.currency]

  const formatNumber = (num: number): string => {
    return num.toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US')
  }

  if (price.min === price.max) {
    return `${formatNumber(price.min)} ${currencySymbol}`
  }

  const fromText = locale === 'ru' ? 'от' : 'from'
  return `${fromText} ${formatNumber(price.min)} ${currencySymbol}`
}

/**
 * Форматирует количество билетов
 * @param count - количество билетов
 * @param locale - локаль (ru или en)
 * @returns отформатированная строка
 */
export const formatTicketsCount = (count: number, locale: 'ru' | 'en' = 'ru'): string => {
  if (locale === 'ru') {
    const cases = [2, 0, 1, 1, 1, 2]
    const titles = ['билет', 'билета', 'билетов']
    const index = count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    return `${count} ${titles[index]}`
  } else {
    return count === 1 ? '1 ticket' : `${count} tickets`
  }
}
