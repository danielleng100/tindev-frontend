import { format, addHours } from 'date-and-time'

export default function (date) {
  const dt = new Date(date)

  const now = addHours(dt, -3)

  return format(now, 'HH:mm')
}