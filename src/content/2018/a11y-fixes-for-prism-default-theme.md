---
title: A11y fixes for prism default theme
featured:
  image: stas-ovsky-781959-unsplash
  author: Stas Ovsky
  authorLink: https://unsplash.com/photos/JlBYy9eaOxg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-18 00:18:27
excerpt: "Lighthouse reported color contrast issues in the code block colored by prism.js. Actually I don't care about these issues because people doesn't read code blocks carefully. However, I just did the quick fixes for them by changing the color to see the contrast ratio in Chrome developer console."
---

[Lighthouse](https://developers.google.com/web/tools/lighthouse) reported [color contrast issues](https://paulirish.github.io/lighthouse/docs/api/lighthouse/2.5.1/lighthouse-core_audits_accessibility_color-contrast.js.html) in the code block colored by [prism.js](https://prismjs.com/). Actually I don't care about these issues because people doesn't read code blocks carefully. However, I just did the quick fixes for them by changing the color to see the contrast ratio in Chrome developer console.

Fixes are the following. The full CSS is attached to the [gist](https://gist.github.com/memolog/219ce21e3d059f149d5230bb93f57a01).

```diff

```
