// composables/useDateFormat.ts
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export const useDateFormat = () => {
  const formatDateTime = (date: string | Date, pattern = 'dd MMM yyyy, HH:mm') => {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, pattern, { locale: ru })
  }

  const formatRelative = (date: string | Date) => {
    const d = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(d, { addSuffix: true, locale: ru })
  }

  return { formatDateTime, formatRelative }
}
