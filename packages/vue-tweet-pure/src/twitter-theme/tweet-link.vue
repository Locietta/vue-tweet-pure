<script setup lang="ts">
interface Props {
  href: string
}

defineProps<Props>()
</script>

<template>
  <a
    :href="href"
    :class="$style.root"
    target="_blank"
    rel="noopener noreferrer nofollow"
  >
    <slot></slot>
  </a>
</template>
<style module>
.root {
  font-weight: inherit;
  color: var(--tweet-color-blue-secondary);
  text-decoration: none;
  cursor: pointer;
}
.root:hover {
  text-decoration-thickness: 1px;
  text-decoration-line: underline;
}
</style>
