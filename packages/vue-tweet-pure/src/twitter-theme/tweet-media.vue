<script setup lang="ts">
import { type EnrichedTweet, type EnrichedQuotedTweet, getMediaUrl } from '../utils'
import { type MediaDetails } from '../api'
import type { TwitterComponents } from './default-theme'
import TweetMediaVideo from './tweet-media-video.vue'
import MediaImg from './media-img.vue'
import { computed } from 'vue'
import s from './tweet-media.module.css'

interface Props {
  tweet: EnrichedTweet | EnrichedQuotedTweet
  components?: TwitterComponents
  quoted?: boolean
}

const props = defineProps<Props>()

const getSkeletonStyle = (media: MediaDetails, itemCount: number) => {
  let paddingBottom = 56.25 // default of 16x9

  // if we only have 1 item, show at original ratio
  if (itemCount === 1) {
    paddingBottom = (100 / media.original_info.width) * media.original_info.height
  }

  // if we have 2 items, double the default to be 16x9 total
  if (itemCount === 2) {
    paddingBottom = paddingBottom * 2
  }

  return {
    width: media.type === 'photo' ? undefined : 'unset',
    paddingBottom: `${paddingBottom}%`,
  }
}

const length = computed(() => props.tweet.mediaDetails?.length ?? 0)
const Img = computed(() => props.components?.MediaImg ?? MediaImg)
</script>

<template>
  <div :class="[s.root, { [s.rounded]: !quoted }]">
    <div
      :class="[
        s.mediaWrapper,
        {
          [s.grid2Columns]: length > 1,
          [s.grid3]: length === 3,
          [s.grid2x2]: length > 4,
        },
      ]"
    >
      <template
        v-for="media in tweet.mediaDetails"
        :key="media.media_url_https"
      >
        <a
          v-if="media.type === 'photo'"
          :href="tweet.url"
          :class="[s.mediaContainer, s.mediaLink]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            :class="s.skeleton"
            :style="getSkeletonStyle(media, length)"
          ></div>
          <component
            :is="Img"
            :src="getMediaUrl(media, 'small')"
            :alt="media.ext_alt_text || 'Image'"
            :class="s.image"
            draggable
          />
        </a>
        <div
          v-else
          :class="s.mediaContainer"
        >
          <div
            :class="s.skeleton"
            :style="getSkeletonStyle(media, length)"
          ></div>
          <TweetMediaVideo
            :tweet="tweet"
            :media="media"
          />
        </div>
      </template>
    </div>
  </div>
</template>
