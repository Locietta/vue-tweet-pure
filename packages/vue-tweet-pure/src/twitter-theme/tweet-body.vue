<script setup lang="ts">
import type { EnrichedTweet, Entity } from '../utils'
import TweetLink from './tweet-link.vue'

interface Props {
  tweet: EnrichedTweet
}

defineProps<Props>()

const hasHerf = (item: Entity): item is Entity & { href: string } => {
  return ['hashtag', 'mention', 'url', 'symbol'].includes(item.type)
}
</script>

<template>
  <p
    :class="$style.root"
    :lang="tweet.lang"
    dir="auto"
  >
    <template
      v-for="(item, i) in tweet.entities"
      :key="i"
    >
      <TweetLink
        v-if="hasHerf(item)"
        :href="item.href"
      >
        {{ item.text }}
      </TweetLink>
      <!-- eslint-disable vue/no-v-html -->
      <span
        v-else-if="item.type === 'text'"
        v-html="item.text"
      ></span>
    </template>
  </p>
</template>
<style module>
.root {
  font-size: var(--tweet-body-font-size);
  font-weight: var(--tweet-body-font-weight);
  line-height: var(--tweet-body-line-height);
  margin: var(--tweet-body-margin);
  overflow-wrap: break-word;
  white-space: pre-wrap;
}
</style>
