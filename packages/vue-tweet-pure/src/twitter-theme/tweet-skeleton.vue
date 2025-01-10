<script setup lang="ts">
import TweetContainer from './tweet-container.vue'
import Skeleton from './skeleton.vue'
</script>

<template>
  <TweetContainer :class="$style.root">
    <Skeleton :style="{ height: '3rem', marginBottom: '0.75rem' }" />
    <Skeleton :style="{ height: '6rem', margin: '0.5rem 0' }" />
    <div :style="{ borderTop: 'var(--tweet-border)', margin: '0.5rem 0' }"></div>
    <Skeleton
      :style="{
        height: '2rem',
      }"
    />
    <Skeleton
      :style="{
        height: '2rem',
        borderRadius: '9999px',
        marginTop: '0.5rem',
      }"
    />
  </TweetContainer>
</template>
<style module>
.root {
  pointer-events: none;
  padding-bottom: 0.25rem;
}
</style>
