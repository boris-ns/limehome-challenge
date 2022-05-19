export function dateWithoutTime(dateTime: Date): Date {
  const date = new Date(dateTime.getTime())
  date.setUTCHours(0, 0, 0, 0)
  return date
}
