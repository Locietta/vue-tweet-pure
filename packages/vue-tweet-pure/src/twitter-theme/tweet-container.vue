<script setup lang="ts">
import './theme.css'
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>

<template>
  <div :class="['vue-tweet-theme', $style.root, attrs.class]">
    <article :class="$style.article">
      <slot></slot>
    </article>
  </div>
</template>

<style module>
.root {
  width: 100%;
  min-width: 250px;
  max-width: 550px;
  overflow: hidden;
  /* Base font styles */
  color: var(--tweet-font-color);
  font-family: var(--tweet-font-family);
  font-weight: 400;
  box-sizing: border-box;
  border: var(--tweet-border);
  border-radius: 12px;
  margin: var(--tweet-container-margin);
  background-color: var(--tweet-bg-color);
  transition-property: background-color, box-shadow;
  transition-duration: 0.2s;
}
.root:hover {
  background-color: var(--tweet-bg-color-hover);
}
.article {
  position: relative;
  box-sizing: inherit;
  padding: 0.75rem 1rem;
}
</style>
