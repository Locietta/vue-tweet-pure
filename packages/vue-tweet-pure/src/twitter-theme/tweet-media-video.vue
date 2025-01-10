<script setup lang="ts">
import { ref } from 'vue'
import type { MediaAnimatedGif, MediaVideo } from '../api'
import { type EnrichedQuotedTweet, type EnrichedTweet, getMediaUrl, getMp4Video } from '../utils'
import mediaStyles from './tweet-media.module.css'

interface Props {
  tweet: EnrichedTweet | EnrichedQuotedTweet
  media: MediaAnimatedGif | MediaVideo
}

const props = defineProps<Props>()
const playButton = ref(true)
const isPlaying = ref(false)
const ended = ref(false)
const mp4Video = getMp4Video(props.media)
let timeout = 0

const handlePlay = () => {
  if (timeout) window.clearTimeout(timeout)
  if (!isPlaying.value) isPlaying.value = true
  if (ended.value) ended.value = false
}

const handlePause = () => {
  if (timeout) window.clearTimeout(timeout)
  timeout = window.setTimeout(() => {
    if (isPlaying.value) isPlaying.value = false
    timeout = 0
  }, 100)
}

const handleVideoButtonClick = (e: Event) => {
  const video = (e.currentTarget as HTMLButtonElement).previousElementSibling as HTMLMediaElement

  e.preventDefault()
  playButton.value = false
  isPlaying.value = true
  video.play()
  video.focus()
}
</script>

<template>
  <video
    :class="mediaStyles.image"
    :poster="getMediaUrl(media, 'small')"
    :controls="!playButton"
    muted
    preload="none"
    :tabindex="playButton ? -1 : 0"
    @play="handlePlay"
    @pause="handlePause"
    @ended="ended = true"
  >
    <source
      :src="mp4Video.url"
      :type="mp4Video.content_type"
    />
  </video>

  <button
    v-if="playButton"
    type="button"
    :class="$style.videoButton"
    aria-label="View video on X"
    @click="handleVideoButtonClick"
  >
    <svg
      viewBox="0 0 24 24"
      :class="$style.videoButtonIcon"
      aria-hidden="true"
    >
      <g>
        <path d="M21 12L4 2v20l17-10z" />
      </g>
    </svg>
  </button>

  <div
    v-if="!isPlaying && !ended"
    :class="$style.watchOnTwitter"
  >
    <a
      :href="tweet.url"
      :class="$style.anchor"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ playButton ? 'Watch on X' : 'Continue watching on X' }}
    </a>
  </div>

  <a
    v-if="ended"
    :href="tweet.url"
    :class="[$style.anchor, $style.viewReplies]"
    target="_blank"
    rel="noopener noreferrer"
  >
    View replies
  </a>
</template>
<style module>
.anchor {
  display: flex;
  align-items: center;
  color: white;
  padding: 0 1rem;
  border: 1px solid transparent;
  border-radius: 9999px;
  font-weight: 700;
  transition: background-color 0.2s;
  cursor: pointer;
  user-select: none;
  outline-style: none;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.videoButton {
  position: relative;
  height: 67px;
  width: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--tweet-color-blue-primary);
  transition-property: background-color;
  transition-duration: 0.2s;
  border: 4px solid #fff;
  border-radius: 9999px;
  cursor: pointer;
}
.videoButton:hover,
.videoButton:focus-visible {
  background-color: var(--tweet-color-blue-primary-hover);
}
.videoButtonIcon {
  margin-left: 3px;
  width: calc(50% + 4px);
  height: calc(50% + 4px);
  max-width: 100%;
  color: #fff;
  fill: currentColor;
  user-select: none;
}
.watchOnTwitter {
  position: absolute;
  top: 12px;
  right: 8px;
}
.watchOnTwitter > a {
  min-width: 2rem;
  min-height: 2rem;
  font-size: 0.875rem;
  line-height: 1rem;
  backdrop-filter: blur(4px);
  background-color: rgba(15, 20, 25, 0.75);
}
.watchOnTwitter > a:hover {
  background-color: rgba(39, 44, 48, 0.75);
}
.viewReplies {
  position: relative;
  min-height: 2rem;
  background-color: var(--tweet-color-blue-primary);
  border-color: var(--tweet-color-blue-primary);
  font-size: 0.9375rem;
  line-height: 1.25rem;
}
.viewReplies:hover {
  background-color: var(--tweet-color-blue-primary-hover);
}
</style>
