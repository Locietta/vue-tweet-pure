import { describe, it, expect } from 'vitest'
import { formatDate } from '../date-utils'

describe('formatDate', () => {
  // local time, so the result doesn't depend on the machine's timezone
  const date = new Date(2023, 0, 14, 10, 29)

  it('formats in the order of en-US', () => {
    expect(formatDate(date, 'en-US')).toBe('10:29 AM · Jan 14, 2023')
  })

  it('formats in the order of zh-CN', () => {
    const [time, day] = formatDate(date, 'zh-CN').split(' · ')
    expect(time).toContain('10:29')
    expect(day).toBe('2023年1月14日')
  })
})
