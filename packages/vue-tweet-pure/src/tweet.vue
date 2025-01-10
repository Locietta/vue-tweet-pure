<script setup lang="ts">
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  type TwitterComponents,
} from './twitter-theme/components'
import type { TweetCoreProps } from './utils'
import { useTweet } from './composables/useTweet'

import type { Component } from 'vue'

interface TweetProps extends Omit<TweetCoreProps, 'id'> {
  id?: string
  apiUrl?: string
  fallback?: Component
  components?: TwitterComponents
  fetchOptions?: RequestInit
  onError?: (error: unknown) => unknown
}

const props = withDefaults(defineProps<TweetProps>(), {
  id: undefined,
  apiUrl: undefined,
  fallback: TweetSkeleton,
  components: undefined,
  fetchOptions: undefined,
  onError: undefined,
})

const { isLoading, data, error } = useTweet(props.id, props.apiUrl, props.fetchOptions)
</script>

<template>
  <fallback v-if="isLoading" />

  <template v-else>
    <component
      :is="components?.TweetNotFound || TweetNotFound"
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
