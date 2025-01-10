<script setup lang="ts">
import type { EnrichedQuotedTweet } from '../../utils'

interface Props {
  tweet: EnrichedQuotedTweet
}

defineProps<Props>()
</script>

<template>
  <p
    :class="$style.root"
    :lang="tweet.lang"
    dir="auto"
  >
    <!-- eslint-disable vue/no-v-html -->
    <span
      v-for="(item, i) in tweet.entities"
      :key="i"
      v-html="item.text"
    ></span>
  </p>
</template>

<style module>
.root {
  font-size: var(--tweet-quoted-body-font-size);
  font-weight: var(--tweet-quoted-body-font-weight);
  line-height: var(--tweet-quoted-body-line-height);
  margin: var(--tweet-quoted-body-margin);
  overflow-wrap: break-word;
  white-space: pre-wrap;
  padding: 0 0.75rem;
}
</style>
