<script setup lang="ts">
import type { EnrichedTweet } from '../utils'
import TweetInfoCreatedAt from './tweet-info-created-at.vue'

interface Props {
  tweet: EnrichedTweet
}

defineProps<Props>()
</script>

<template>
  <div :class="$style.info">
    <TweetInfoCreatedAt :tweet="tweet" />
    <a
      :class="$style.infoLink"
      href="https://help.x.com/en/x-for-websites-ads-info-and-privacy"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter for Websites, Ads Information and Privacy"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        :class="$style.infoIcon"
      >
        <g>
          <path
            d="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"
          />
        </g>
      </svg>
    </a>
  </div>
</template>
<style module>
.info {
  display: flex;
  align-items: center;
  color: var(--tweet-font-color-secondary);
  margin-top: 0.125rem;
  overflow-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.infoLink {
  color: inherit;
  text-decoration: none;
}
.infoLink {
  height: var(--tweet-actions-icon-wrapper-size);
  width: var(--tweet-actions-icon-wrapper-size);
  font: inherit;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -4px;
  border-radius: 9999px;
  transition-property: background-color;
  transition-duration: 0.2s;
}
.infoLink:hover {
  background-color: var(--tweet-color-blue-secondary-hover);
}
.infoIcon {
  color: inherit;
  fill: currentColor;
  height: var(--tweet-actions-icon-size);
  user-select: none;
}
.infoLink:hover > .infoIcon {
  color: var(--tweet-color-blue-secondary);
}
</style>
