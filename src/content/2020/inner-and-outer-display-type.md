---
title: Inner and outer display types
featured:
  image: fotografierende-HMGNL811SQE-unsplash
  author: fotografierende
  authorLink: https://unsplash.com/@fotografierende?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-18 06:25:00
excerpt: "前回のCSS Display Module Introductionに引き続き、CSS Display Module Level 3の2. Box Layout Modes: the display property冒頭部分についてのメモ。内容を見直して、変だなと思うところは随時修正してる。"
---

前回の[CSS Display Module Introduction](https://memolog.org/2020/css-display-module-introduction.html)に引き続き、CSS Display Module Level 3 の[2. Box Layout Modes: the display property](https://www.w3.org/TR/css-display-3/#the-display-properties)冒頭部分についてのメモ。内容を見直して、変だなと思うところは随時修正してる。

最初に Introduction からの抜粋。

> Each **box** in the box tree represents its corresponding element (or pseudo-element) in space and/or time on the canvas, while each **text run** in the box tree likewise represents the contents of its corresponding text nodes.

box tree において、box は、スクリーン上で要素を時間的・空間的に表現する。text run は text nodes の内容を表現する。

> Then, for each element, CSS generates zero or more boxes as specified by that element’s display property. Typically, an element generates a single box, the [principal box](https://drafts.csswg.org/css-display/#principal-box), which represents itself and contains its contents in the box tree.

CSS は、各要素に対して、display プロパティに応じて 0 個以上の box を生成する。通常は、一つの要素につき、一つの box を生成する。その box は**principal box**と呼ばれ、box 自身と内包するコンテンツを box tree 内に表現する。

抜粋ここまで。
