---
'vue-tweet-pure': patch
---

Fix tweets not rendering (`entities is not iterable`) now that the syndication API omits empty entity lists such as `hashtags`, `user_mentions` and `symbols`
