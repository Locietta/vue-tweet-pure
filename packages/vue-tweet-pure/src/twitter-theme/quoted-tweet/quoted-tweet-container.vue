<script setup lang="ts">
import type { EnrichedQuotedTweet } from '../../utils'

const openTweetInNewTab = (url: string) => {
  window.open(url, '_blank')
}

interface Props {
  tweet: EnrichedQuotedTweet
}

defineProps<Props>()
</script>

<template>
  <div
    :class="$style.root"
    @click.prevent="openTweetInNewTab(tweet.url)"
  >
    <article :class="$style.article">
      <slot></slot>
    </article>
  </div>
</template>

<style module>
.root {
  width: 100%;
  overflow: hidden;
  border: var(--tweet-border);
  border-radius: 12px;
  margin: var(--tweet-quoted-container-margin);
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
  cursor: pointer;
}

.root:hover {
  background-color: var(--tweet-quoted-bg-color-hover);
}

.article {
  position: relative;
  box-sizing: inherit;
}
</style>
