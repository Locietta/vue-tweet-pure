<script setup lang="ts">
import AvatarImg from '../avatar-img.vue'
import type { EnrichedQuotedTweet } from '../../utils'
import VerifiedBadge from '../verified-badge.vue'

interface Props {
  tweet: EnrichedQuotedTweet
}

const props = defineProps<Props>()
const { user } = props.tweet
</script>

<template>
  <div :class="$style.header">
    <a
      :href="tweet.url"
      :class="$style.avatar"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        :class="[
          $style.avatarOverflow,
          { [$style.avatarSquare]: user.profile_image_shape === 'Square' },
        ]"
      >
        <AvatarImg
          :src="user.profile_image_url_https"
          :alt="user.name"
          :width="20"
          :height="20"
        />
      </div>
    </a>
    <div :class="$style.author">
      <div :class="$style.authorText">
        <span :title="user.name">{{ user.name }}</span>
      </div>
      <VerifiedBadge :user="user" />
      <div :class="$style.username">
        <span :title="`@${user.screen_name}`">@{{ user.screen_name }}</span>
      </div>
    </div>
  </div>
</template>

<style module>
.header {
  display: flex;
  padding: 0.75rem 0.75rem 0 0.75rem;
  line-height: var(--tweet-header-line-height);
  font-size: var(--tweet-header-font-size);
  white-space: nowrap;
  overflow-wrap: break-word;
  overflow: hidden;
}

.avatar {
  position: relative;
  height: 20px;
  width: 20px;
}

.avatarSquare {
  border-radius: 4px;
}

.author {
  display: flex;
  margin: 0 0.5rem;
}

.authorText {
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.username {
  color: var(--tweet-font-color-secondary);
  text-decoration: none;
  text-overflow: ellipsis;
  margin-left: 0.125rem;
}
</style>
