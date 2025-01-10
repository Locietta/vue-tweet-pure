<script setup lang="ts">
import { computed } from 'vue'
import { type EnrichedTweet, formatNumber } from '../utils'

interface Props {
  tweet: EnrichedTweet
}

const props = defineProps<Props>()

const replyText = computed(() => {
  if (props.tweet.conversation_count === 0) return 'Read more on X'
  if (props.tweet.conversation_count === 1)
    return `Read ${formatNumber(props.tweet.conversation_count)} reply`
  return `Read ${formatNumber(props.tweet.conversation_count)} replies`
})
</script>

<template>
  <div :class="$style.replies">
    <a
      :class="$style.link"
      :href="tweet.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span :class="$style.text">{{ replyText }}</span>
    </a>
  </div>
</template>
<style module>
.replies {
  padding: 0.25rem 0;
}
.link {
  text-decoration: none;
  color: var(--tweet-color-blue-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  user-select: none;
  outline-style: none;
  transition-property: background-color;
  transition-duration: 0.2s;
  padding: 0 1rem;
  border: var(--tweet-border);
  border-radius: 9999px;
}
.link:hover {
  background-color: var(--tweet-color-blue-secondary-hover);
}
.text {
  font-weight: var(--tweet-replies-font-weight);
  font-size: var(--tweet-replies-font-size);
  line-height: var(--tweet-replies-line-height);
  overflow-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
