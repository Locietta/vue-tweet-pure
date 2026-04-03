import { ref, onMounted } from 'vue'
import type { Tweet } from '../api'
import { TwitterApiError } from '../api'

async function fetcher(url: string, fetchOptions?: RequestInit): Promise<Tweet | null> {
  const res = await fetch(url, fetchOptions)
  const json = await res.json()

  if (res.ok) return json.data || null

  throw new TwitterApiError({
    message: `Failed to fetch tweet at "${url}" with "${res.status}".`,
    data: json,
    status: res.status,
  })
}

const cache = new Map<string, Promise<Tweet | null>>()

/** @internal */
export function clearCache() {
  cache.clear()
}

/** @internal */
export function cachedFetcher(url: string, fetchOptions?: RequestInit): Promise<Tweet | null> {
  const cached = cache.get(url)
  if (cached) return cached

  const promise = fetcher(url, fetchOptions).catch((err) => {
    cache.delete(url)
    throw err
  })
  cache.set(url, promise)
  return promise
}

export function useTweet(id: string, apiUrl: string, fetchOptions?: RequestInit) {
  const isLoading = ref(true)
  const data = ref<Tweet | null>()
  const error = ref<Error | null>(null)

  const fetchData = async () => {
    if (!apiUrl && !id) {
      isLoading.value = false
      return
    }

    try {
      const url = `${apiUrl}/${id}`
      const result = await cachedFetcher(url, fetchOptions)
      data.value = result
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchData()
  })

  return {
    isLoading,
    data,
    error,
  }
}

export function useMounted() {
  const mounted = ref(false)

  onMounted(() => {
    mounted.value = true
  })

  return mounted
}
