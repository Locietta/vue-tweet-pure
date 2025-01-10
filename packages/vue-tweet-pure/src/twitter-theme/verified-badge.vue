<script setup lang="ts">
import type { TweetUser } from '../api'
import { Verified, VerifiedBusiness, VerifiedGovernment } from './icons'
import { computed, useCssModule, useAttrs } from 'vue'

const styles = useCssModule()
const attrs = useAttrs()

interface Props {
  user: TweetUser
}

const props = defineProps<Props>()

const verified = computed(
  () => props.user.verified || props.user.is_blue_verified || props.user.verified_type,
)

const icon = computed(() => {
  if (!verified.value) return null

  if (props.user.verified_type === 'Government') {
    return VerifiedGovernment
  }
  if (props.user.verified_type === 'Business') {
    return VerifiedBusiness
  }
  return Verified
})

const iconClassName = computed(() => {
  if (!verified.value) return null

  if (props.user.verified_type === 'Government') {
    return styles.verifiedGovernment
  }
  if (props.user.verified_type === 'Business') {
    return null
  }
  return props.user.is_blue_verified ? styles.verifiedBlue : styles.verifiedOld
})
</script>

<template>
  <div
    v-if="verified"
    :class="[attrs.class, iconClassName]"
  >
    <component :is="icon" />
  </div>
</template>

<style module>
.verifiedOld {
  color: var(--tweet-verified-old-color);
}
.verifiedBlue {
  color: var(--tweet-verified-blue-color);
}
.verifiedGovernment {
  /* color: var(--tweet-verified-government-color); */
  color: rgb(130, 154, 171);
}
</style>
