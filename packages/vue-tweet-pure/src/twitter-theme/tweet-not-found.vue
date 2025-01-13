<script setup lang="ts">
import TweetContainer from './tweet-container.vue'

interface Props {
  error: Error | null
}

defineProps<Props>()
</script>

<template>
  <TweetContainer>
    <div :class="$style.root">
      <h3>Tweet not found</h3>
      <p>The embedded tweet could not be found…</p>
    </div>
  </TweetContainer>
</template>
<style module>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.75rem;
}
.root > h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
</style>
