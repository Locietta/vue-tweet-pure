import { describe, it, expect, vi, beforeEach } from 'vitest'

// Must mock before importing the module under test
const fetchMock = vi.fn()
vi.stubGlobal('fetch', fetchMock)

// Dynamic import so the module sees our stubbed fetch
const { cachedFetcher, clearCache } = await import('../composables/useTweet')

function mockFetchResponse(data: unknown, ok = true, status = 200) {
  fetchMock.mockResolvedValueOnce({
    ok,
    status,
    json: () => Promise.resolve(ok ? { data } : { errors: ['fail'] }),
  })
}

beforeEach(() => {
  fetchMock.mockReset()
  clearCache()
})

describe('cachedFetcher', () => {
  it('returns fetched data', async () => {
    mockFetchResponse({ id_str: '123', text: 'hello' })
    const result = await cachedFetcher('https://api.test/123')
    expect(result).toEqual({ id_str: '123', text: 'hello' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('returns cached result on second call with same URL', async () => {
    mockFetchResponse({ id_str: '123', text: 'hello' })
    await cachedFetcher('https://api.test/123')
    const result = await cachedFetcher('https://api.test/123')
    expect(result).toEqual({ id_str: '123', text: 'hello' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('does not cache failed fetches', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ errors: ['not found'] }),
    })
    await expect(cachedFetcher('https://api.test/bad')).rejects.toThrow()

    // Second call should retry
    mockFetchResponse({ id_str: 'bad', text: 'recovered' })
    const result = await cachedFetcher('https://api.test/bad')
    expect(result).toEqual({ id_str: 'bad', text: 'recovered' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('caches different URLs independently', async () => {
    mockFetchResponse({ id_str: '1' })
    mockFetchResponse({ id_str: '2' })

    const [r1, r2] = await Promise.all([
      cachedFetcher('https://api.test/1'),
      cachedFetcher('https://api.test/2'),
    ])

    expect(r1).toEqual({ id_str: '1' })
    expect(r2).toEqual({ id_str: '2' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
