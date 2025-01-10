<script setup lang="ts">
import type { EnrichedQuotedTweet } from '../../utils'
import QuotedTweetContainer from './quoted-tweet-container.vue'
import QuotedTweetHeader from './quoted-tweet-header.vue'
import QuotedTweetBody from './quoted-tweet-body.vue'
import TweetMedia from '../tweet-media.vue'

interface Props {
  tweet: EnrichedQuotedTweet
}

defineProps<Props>()
</script>

<template>
  <QuotedTweetContainer :tweet="tweet">
    <QuotedTweetHeader :tweet="tweet" />
    <QuotedTweetBody :tweet="tweet" />
    <TweetMedia
      v-if="tweet.mediaDetails?.length"
      :tweet="tweet"
      quoted
    />
  </QuotedTweetContainer>
</template>
