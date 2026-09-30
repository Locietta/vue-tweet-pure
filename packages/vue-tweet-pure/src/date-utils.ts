// let each locale order its own time and date parts, e.g.
// en-US: "10:29 AM · Jan 14, 2023", zh-CN: "10:29 · 2023年1月14日"
const timeOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
}

const dateOptions: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}

const defaultLocale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'

export const formatDate = (date: Date, locale: string = defaultLocale) => {
  const formattedTime = new Intl.DateTimeFormat(locale, timeOptions).format(date)
  const formattedDate = new Intl.DateTimeFormat(locale, dateOptions).format(date)
  return `${formattedTime} · ${formattedDate}`
}
