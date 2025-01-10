<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface Props {
  style?: CSSProperties
}

defineProps<Props>()
</script>

<template>
  <span
    :class="$style.skeleton"
    :style="style"
  ></span>
</template>

<style module>
.skeleton {
  display: block;
  width: 100%;
  border-radius: 5px;
  background-image: var(--tweet-skeleton-gradient);
  background-size: 400% 100%;
  animation: loading 8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background-position: 200% 0;
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
