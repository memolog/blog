---
title: "YSLOW (5): Put CSS at the Top"
date: 2007-08-08T15:22:00.000Z
featured:
  image: yslow_5_put_css_at_the_top
  author: chatGPT
categories:
  - web
tags:
  - yslow
excerpt: "スタイルシートは head タグの中で指定しよう、という話。なんか普通の使い方のような気がするのですが・・"
---

- [5: Put CSS at the Top](http://developer.yahoo.com/performance/rules.html#css_top)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の五つ目。スタイルシートは head タグの中で指定しよう、という話。なんか普通の使い方のような気がするのですが・・話の主旨はスタイルシートが最初の方に読み込まれておけば、ページのレンダリングが暫時的にすすんでいくから、ページを早く見ることができるということ。完全に読み切るまで真っ白な画面で待たされるより、少しずつでも表示されていく方がユーザーエクスペリエンスも高くなる。
