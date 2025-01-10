<script setup lang="ts">
import type { Tweet } from '../api'
import type { TwitterComponents } from './types'
import TweetContainer from './tweet-container.vue'
import TweetHeader from './tweet-header.vue'
import TweetInReplyTo from './tweet-in-reply-to.vue'
import TweetBody from './tweet-body.vue'
import TweetMedia from './tweet-media.vue'
import TweetInfo from './tweet-info.vue'
import TweetActions from './tweet-actions.vue'
import TweetReplies from './tweet-replies.vue'
import { QuotedTweet } from './quoted-tweet'
import { enrichTweet } from '../utils'
import { computed } from 'vue'

interface Props {
  tweet: Tweet
  components?: Omit<TwitterComponents, 'TweetNotFound'>
}

const props = defineProps<Props>()
const tweet = computed(() => enrichTweet(props.tweet))
</script>

<template>
  <TweetContainer>
    <TweetHeader
      :tweet="tweet"
      :components="components"
    />
    <TweetInReplyTo
      v-if="tweet.in_reply_to_status_id_str"
      :tweet="tweet"
    />
    <TweetBody :tweet="tweet" />
    <TweetMedia
      v-if="tweet.mediaDetails?.length"
      :tweet="tweet"
      :components="components"
    />
    <QuotedTweet
      v-if="tweet.quoted_tweet"
      :tweet="tweet.quoted_tweet"
    />
    <TweetInfo :tweet="tweet" />
    <TweetActions :tweet="tweet" />
    <TweetReplies :tweet="tweet" />
  </TweetContainer>
</template>
