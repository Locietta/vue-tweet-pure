<script setup lang="ts">
import type { EnrichedTweet } from '../utils'
import { formatDate } from '../date-utils'

interface Props {
  tweet: EnrichedTweet
}

const props = defineProps<Props>()
const createdAt = new Date(props.tweet.created_at)
const formattedCreatedAtDate = formatDate(createdAt)
</script>

<template>
  <a
    :class="$style.root"
    :href="tweet.url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="formattedCreatedAtDate"
  >
    <time :datetime="createdAt.toISOString()">{{ formattedCreatedAtDate }}</time>
  </a>
</template>
<style module>
.root {
  color: inherit;
  text-decoration: none;
  font-size: var(--tweet-info-font-size);
  line-height: var(--tweet-info-line-height);
}
.root:hover {
  text-decoration-thickness: 1px;
  text-decoration-line: underline;
}
</style>
