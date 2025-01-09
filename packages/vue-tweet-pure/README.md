# vue-tweet-pure

A Vue 3 component for embedding tweets in your Vue.js applications. This is a Vue port of [react-tweet](https://github.com/vercel/react-tweet).

## Features

- 🚀 Fast loading - SSR-ready, no external scripts or iframes
- 💪 Native Vue components - no dependency on Twitter's widgets.js
- 🎨 Customizable - style the tweet component to match your app's design
- Does NOT require using the Twitter API

## Installation

```bash
npm install vue-tweet-pure
# or
yarn add vue-tweet-pure
# or
pnpm add vue-tweet-pure
```

## Usage

```vue
<script setup>
import { Tweet } from 'vue-tweet-pure'
</script>

<template>
  <Tweet id="1234567890" />
</template>
```

## Credits

This package is a Vue 3 port of [react-tweet](https://github.com/vercel/react-tweet) by Vercel. Special thanks to their team for the original implementation and API support.

## License

MIT © Locietta
