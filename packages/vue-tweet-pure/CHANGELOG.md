# vue-tweet-pure

## 0.3.1

### Patch Changes

- 8b40205: Format the tweet time and date in the order of the viewer's locale, instead of an English pattern filled with localized parts (e.g. `10:29 上午 · 1 14, 2023` in Chinese)
- 7eaac06: Fix tweets not rendering (`entities is not iterable`) now that the syndication API omits empty entity lists such as `hashtags`, `user_mentions` and `symbols`

## 0.3.0

### Minor Changes

- 5cc30f8: Update dependencies, fixed a memory leak, add cache for tweet fetcher and introduce vitest

## 0.2.1

### Patch Changes

- 4e83366: Specify color-scheme to `light dark` for default unspecified theme. This transpiles to @media query which maintains the original behavior.

## 0.2.0

### Minor Changes

- fbc01da: Expose wrapped tweet syndication API for users.

### Patch Changes

- 45a9788: Modify verified icon color under dark mode. Also use color-scheme to better handle light/dark.
- fbc01da: Provide default theme component & improve typing
