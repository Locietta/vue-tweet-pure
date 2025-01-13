<script setup lang="ts">
import {
  EmbeddedTweet,
  TweetSkeleton,
  defaultTwitterComponents,
  type TwitterComponents,
} from './twitter-theme/components'
import { useTweet } from './composables/useTweet'

import type { Component } from 'vue'

interface TweetProps {
  /**
   * Tweet id (Required)
   * @example 1234567890
   */
  id: string

  /**
   * Twitter API url, twitter content will be fetched from `apiUrl/:id`
   * @default https://react-tweet.vercel.app/api/tweet
   */
  apiUrl?: string

  /**
   * Fallback component to render if the tweet fails to load
   * @default TweetSkeleton
   */
  fallback?: Component

  /**
   * Custom components to render the tweet
   * @default defaultTwitterTheme
   */
  components?: TwitterComponents

  /**
   * Custom fetch options to pass to the fetch request
   * @default {}
   */
  fetchOptions?: RequestInit

  /**
   * Callback to handle errors
   * @default (error) => error
   */
  onError?: (error: Error | null) => Error | null
}

// default to vercel's syndication endpoint
const host = 'https://react-tweet.vercel.app'

const props = withDefaults(defineProps<TweetProps>(), {
  apiUrl: `${host}/api/tweet`,
  fallback: TweetSkeleton,
  fetchOptions: () => ({}) satisfies RequestInit,
  onError: (error: Error | null) => error,
  components: () => defaultTwitterComponents,
})

const { isLoading, data, error } = useTweet(props.id, props.apiUrl, props.fetchOptions)
</script>

<template>
  <fallback v-if="isLoading" />

  <template v-else>
    <component
      :is="components.TweetNotFound"
      v-if="error || !data"
      :error="onError(error)"
    />

    <EmbeddedTweet
      v-else
      :tweet="data"
      :components="components"
    />
  </template>
</template>
