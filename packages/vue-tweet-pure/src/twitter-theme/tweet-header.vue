<script setup lang="ts">
import type { EnrichedTweet } from '../utils'
import type { TwitterComponents } from './types'
import AvatarImg from './avatar-img.vue'
import VerifiedBadge from './verified-badge.vue'

interface Props {
  tweet: EnrichedTweet
  components?: TwitterComponents
}

const props = defineProps<Props>()
const ImgComponent = props.components?.AvatarImg ?? AvatarImg
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
        <component
          :is="ImgComponent"
          :src="user.profile_image_url_https"
          :alt="user.name"
          :width="48"
          :height="48"
        />
      </div>
      <div :class="$style.avatarOverflow">
        <div :class="$style.avatarShadow"></div>
      </div>
    </a>
    <div :class="$style.author">
      <a
        :href="tweet.url"
        :class="$style.authorLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div :class="$style.authorLinkText">
          <span :title="user.name">{{ user.name }}</span>
        </div>
        <VerifiedBadge
          :user="user"
          :class="$style.authorVerified"
        />
      </a>
      <div :class="$style.authorMeta">
        <a
          :href="tweet.url"
          :class="$style.username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span :title="`@${user.screen_name}`">@{{ user.screen_name }}</span>
        </a>
        <div :class="$style.authorFollow">
          <span :class="$style.separator">·</span>
          <a
            :href="user.follow_url"
            :class="$style.follow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow
          </a>
        </div>
      </div>
    </div>
    <a
      :href="tweet.url"
      :class="$style.brand"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on Twitter"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        :class="$style.twitterIcon"
      >
        <g>
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </g>
      </svg>
    </a>
  </div>
</template>
<style module>
.header {
  display: flex;
  padding-bottom: 0.75rem;
  line-height: var(--tweet-header-line-height);
  font-size: var(--tweet-header-font-size);
  white-space: nowrap;
  overflow-wrap: break-word;
  overflow: hidden;
}

.avatar {
  position: relative;
  height: 48px;
  width: 48px;
}
.avatarOverflow {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  border-radius: 9999px;
}
.avatarSquare {
  border-radius: 4px;
}
.avatarShadow {
  height: 100%;
  width: 100%;
  transition-property: background-color;
  transition-duration: 0.2s;
  box-shadow: rgb(0 0 0 / 3%) 0px 0px 2px inset;
}
.avatarShadow:hover {
  background-color: rgba(26, 26, 26, 0.15);
}

.author {
  max-width: calc(100% - 84px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0.5rem;
}
.authorLink {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
}
.authorLink:hover {
  text-decoration-line: underline;
}
.authorVerified {
  display: inline-flex;
}
.authorLinkText {
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.authorMeta {
  display: flex;
}
.authorFollow {
  display: flex;
}
.username {
  color: var(--tweet-font-color-secondary);
  text-decoration: none;
  text-overflow: ellipsis;
}
.follow {
  color: var(--tweet-color-blue-secondary);
  text-decoration: none;
  font-weight: 700;
}
.follow:hover {
  text-decoration-line: underline;
}
.separator {
  padding: 0 0.25rem;
}

.brand {
  margin-inline-start: auto;
}

.twitterIcon {
  width: 23.75px;
  height: 23.75px;
  color: var(--tweet-twitter-icon-color);
  fill: currentColor;
  user-select: none;
}
</style>
