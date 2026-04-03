import { describe, it, expect } from 'vitest'
import { getMp4Video, getMp4Videos, formatNumber, getMediaUrl } from '../utils'
import type { MediaVideo } from '../api'

const makeMediaBase = () => ({
  display_url: 'pic.twitter.com/abc',
  expanded_url: 'https://twitter.com/user/status/123/photo/1',
  ext_media_availability: { status: 'Available' },
  ext_media_color: { palette: [] },
  indices: [0, 23] as [number, number],
  media_url_https: 'https://pbs.twimg.com/media/abc.jpg',
  original_info: { height: 100, width: 100, focus_rects: [] },
  sizes: {
    large: { h: 100, w: 100, resize: 'fit' },
    medium: { h: 100, w: 100, resize: 'fit' },
    small: { h: 100, w: 100, resize: 'fit' },
    thumb: { h: 100, w: 100, resize: 'fit' },
  },
  url: 'https://t.co/abc',
})

function makeVideoMedia(
  variants: {
    bitrate?: number
    content_type: 'video/mp4' | 'application/x-mpegURL'
    url: string
  }[],
): MediaVideo {
  return {
    ...makeMediaBase(),
    type: 'video',
    video_info: {
      aspect_ratio: [16, 9],
      variants,
    },
  }
}

describe('getMp4Videos', () => {
  it('filters out non-MP4 variants and sorts by bitrate descending', () => {
    const media = makeVideoMedia([
      { bitrate: 832000, content_type: 'video/mp4', url: 'https://v.com/mid.mp4' },
      { content_type: 'application/x-mpegURL', url: 'https://v.com/playlist.m3u8' },
      { bitrate: 2176000, content_type: 'video/mp4', url: 'https://v.com/high.mp4' },
      { bitrate: 256000, content_type: 'video/mp4', url: 'https://v.com/low.mp4' },
    ])

    const result = getMp4Videos(media)
    expect(result).toHaveLength(3)
    expect(result[0].url).toBe('https://v.com/high.mp4')
    expect(result[1].url).toBe('https://v.com/mid.mp4')
    expect(result[2].url).toBe('https://v.com/low.mp4')
  })

  it('returns empty array when no MP4 variants exist', () => {
    const media = makeVideoMedia([
      { content_type: 'application/x-mpegURL', url: 'https://v.com/playlist.m3u8' },
    ])
    expect(getMp4Videos(media)).toEqual([])
  })
})

describe('getMp4Video', () => {
  it('returns undefined for empty variants', () => {
    const media = makeVideoMedia([])
    expect(getMp4Video(media)).toBeUndefined()
  })

  it('returns the single video when only one MP4 variant exists', () => {
    const media = makeVideoMedia([
      { bitrate: 832000, content_type: 'video/mp4', url: 'https://v.com/only.mp4' },
    ])
    const result = getMp4Video(media)
    expect(result?.url).toBe('https://v.com/only.mp4')
  })

  it('returns second-highest quality when multiple variants exist', () => {
    const media = makeVideoMedia([
      { bitrate: 256000, content_type: 'video/mp4', url: 'https://v.com/low.mp4' },
      { bitrate: 2176000, content_type: 'video/mp4', url: 'https://v.com/high.mp4' },
      { bitrate: 832000, content_type: 'video/mp4', url: 'https://v.com/mid.mp4' },
    ])
    // After sort: high, mid, low → index 1 = mid
    const result = getMp4Video(media)
    expect(result?.url).toBe('https://v.com/mid.mp4')
  })
})

describe('formatNumber', () => {
  it('returns "0" for zero', () => {
    expect(formatNumber(0)).toBe('0')
  })

  it('returns plain number for hundreds', () => {
    expect(formatNumber(999)).toBe('999')
  })

  it('formats thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1.0K')
    expect(formatNumber(12345)).toBe('12.3K')
  })

  it('formats millions with M suffix', () => {
    expect(formatNumber(1000000)).toBe('1.0M')
    expect(formatNumber(2500000)).toBe('2.5M')
  })
})

describe('getMediaUrl', () => {
  it('constructs correct URL with format and size params', () => {
    const media = {
      ...makeMediaBase(),
      type: 'photo' as const,
    }
    const url = getMediaUrl(media, 'small')
    const parsed = new URL(url)

    expect(parsed.searchParams.get('format')).toBe('jpg')
    expect(parsed.searchParams.get('name')).toBe('small')
    expect(parsed.pathname).not.toContain('.jpg')
  })

  it('handles different sizes', () => {
    const media = {
      ...makeMediaBase(),
      type: 'photo' as const,
    }
    const url = getMediaUrl(media, 'large')
    const parsed = new URL(url)
    expect(parsed.searchParams.get('name')).toBe('large')
  })
})
