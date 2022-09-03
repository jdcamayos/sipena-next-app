import { formatDistance, format } from 'date-fns'

export const dateRegistered = (date: string | Date) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true
  })
}

export const dateFormat = (date: string | Date) => {
  return format(new Date(date), 'MM/dd/yy - HH:MM')
}