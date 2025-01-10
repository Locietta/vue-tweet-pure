<script setup lang="ts">
import type { EnrichedTweet } from '../utils'

interface Props {
  tweet: EnrichedTweet
}

defineProps<Props>()
</script>

<template>
  <a
    :href="tweet.in_reply_to_url"
    :class="$style.root"
    target="_blank"
    rel="noopener noreferrer"
  >
    Replying to @{{ tweet.in_reply_to_screen_name }}
  </a>
</template>
<style module>
.root {
  text-decoration: none;
  color: var(--tweet-font-color-secondary);
  font-size: 0.9375rem;
  line-height: 1.25rem;
  margin-bottom: 0.25rem;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}
.root:hover {
  text-decoration-thickness: 1px;
  text-decoration-line: underline;
}
</style>
