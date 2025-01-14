# vue-tweet-pure

[![npm version](https://img.shields.io/npm/v/vue-tweet-pure.svg)](https://www.npmjs.com/package/vue-tweet-pure)
[![TypeScript](https://img.shields.io/npm/types/vue-tweet-pure)](https://www.npmjs.com/package/vue-tweet-pure)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-tweet-pure)](https://bundlephobia.com/package/vue-tweet-pure)
[![License](https://img.shields.io/npm/l/vue-tweet-pure.svg)](https://github.com/Locietta/vue-tweet-pure/blob/main/LICENSE)

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
import 'vue-tweet-pure/style.css' // include default twitter component styles
</script>

<template>
  <Tweet id="1234567890" />
</template>
```

Defining `TwitterComponents` to override default components or using `vue-tweet-pure/api` to build your own tweet component is also possible. I'm not done with the documentation yet, but you can check out the [react-tweet](https://react-tweet.vercel.app/api-reference) documentation for now. The API is almost same.

> **NOTE**: Server component support is not implemented yet.

## Development

Contributions are welcome! We're using turbo monorepo to manage the packages. To get started:

1. Clone the repository
2. Install dependencies: `pnpm i --frozen-lockfile`
3. Start the development server:
   - `pnpm dev --filter vue-tweet-pure` for basic playground with Vite
   - `pnpm dev --filter vitepress-app` for more complex example with VitePress, where you can easily toggle light/dark to test the component in different themes

## Credits

This package is a Vue 3 port of [react-tweet](https://github.com/vercel/react-tweet) by Vercel. Special thanks to their team for the original implementation and API support.

## License

MIT © 2025 Locietta
