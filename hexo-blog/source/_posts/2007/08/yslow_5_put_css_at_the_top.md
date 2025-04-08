---
title: YSLOW 勉強 &#x3a; 5&#x3a; Put CSS at the Top
date: 2007-08-08T15:22:00.000Z
categories:
- web
tags:
- yslow
---
*   [5: Put CSS at the Top](http://developer.yahoo.com/performance/rules.html#css_top)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の五つ目。スタイルシートはheadタグの中で指定しよう、という話。なんか普通の使い方のような気がするのですが・・話の主旨はスタイルシートが最初の方に読み込まれておけば、ページのレンダリングが暫時的にすすんでいくから、ページを早く見ることができるということ。完全に読み切るまで真っ白な画面で待たされるより、少しずつでも表示されていく方がユーザーエクスペリエンスも高くなる。

<!-- more -->
