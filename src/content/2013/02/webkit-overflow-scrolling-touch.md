---
title: -webkit-overflow-scrollingと慣性スクロール
date: 2013-02-27T15:58:00.000Z
featured:
  image: colin-watts-EpzoqfX57PQ-unsplash.webp
  author: Colin Watts
  authorLink: https://unsplash.com/ja/@colinwatts?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
categories:
  - web
tags:
  - css
excerpt: "コンテンツがオーバーフローしたときにスクロールバーを表示させる場合に、そのコンテンツのスクロールの仕方を設定する値として-webkit-overflow-scrollingというのがある。"
---

コンテンツがオーバーフローしたときにスクロールバーを表示させる場合に、そのコンテンツのスクロールの仕方を設定する値として-webkit-overflow-scrolling というのがある。 詳細は[Safari CSS Reference](http://developer.apple.com/library/safari/#documentation/appleapplications/reference/safaricssref/articles/standardcssproperties.html)の「-webkit-overflow-scrolling」を参照。値を「touch」にすると native アプリでスクロールしたときのような、いわゆる慣性スクロールの状態になる。

```css
.foobar {
  position: absolute;
  width: 100&#x25;
  height: 300px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
```

値を「touch」にした場合は、そこに stacking context が作成される。stacking context が作られると、その要素の子要素たちは、その stacking context を基準にして、z-index 順に重なるようになる（z 軸上の z-index にある親要素の平面で子要素が重なるイメージ）。なので、この指定によって、子要素の z 軸上の配置が変わる可能性がある。詳細は[Elaborate description of Stacking Contexts](http://www.w3.org/TR/CSS21/zindex.html)とか、[The stacking context - CSS | MDN](https://developer.mozilla.org/en-US/docs/CSS/Understanding_z-index/The_stacking_context?redirectlocale=en-US&redirectslug=Understanding_CSS_z-index%2FThe_stacking_context)とか、[位置を固定した要素のすたっきんぐ・こんてきすと？ \- Weblog - hail2u.net](http://hail2u.net/blog/webdesign/stacking-contexts-on-fixed-element.html)とか、[CSS 完全ガイド 第 2 版](http://www.amazon.co.jp/gp/product/487311232X/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=487311232X&linkCode=as2&tag=yutakayamaguc-22)の 348 ページあたりを参考。

というメモ。
