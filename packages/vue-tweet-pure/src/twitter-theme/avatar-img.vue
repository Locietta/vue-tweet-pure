<script setup lang="ts">
interface AvatarImgProps {
  src: string
  alt: string
  width: number
  height: number
}

defineProps<AvatarImgProps>()
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
  />
</template>
