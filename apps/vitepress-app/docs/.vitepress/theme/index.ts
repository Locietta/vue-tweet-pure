import DefaultTheme from 'vitepress/theme'
import { type Theme } from 'vitepress'
import Tweet from './components/Tweet.vue'


export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Tweet', Tweet)
  },
} satisfies Theme
