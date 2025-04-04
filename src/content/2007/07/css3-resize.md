---
title: CSS3 &#x3a; resize プロパティ
date: 2007-07-29T14:35:00.000Z
categories:
  - web
tags:
  - css
excerpt: "*   http://www.css3.info/preview/resize.html *   http://www.w3.org/TR/css3-ui/#resize"
---

- [http://www.css3.info/preview/resize.html](http://www.css3.info/preview/resize.html)
- [http://www.w3.org/TR/css3-ui/#resize](http://www.w3.org/TR/css3-ui/#resize)

CSS3 のプロパティの一つに「resize」というプロパティがあり、それが Safari 3 では利用可能であるという話。実際にコメント欄（comment-open-text）に resize:both;というプロパティをつけてみました。Safari 3 では入力フォームの大きさを自由にリサイズすることができます。

どこにも情報を保存しないため、たとえばリロードしたりすると元のサイズに戻ってしまう。よく利用する管理画面ではやはり Cookie や DB かどこかにリサイズ情報を保存してたほうが便利だと思いますが、コメント入力欄とか不特定多数の人が 1〜2 回だけ利用するというような場合には CSS で対応するほうが便利そう。

Firefox 2 ではまだ対応していないようですが、きっと 3 がでることには対応しているのではないかと期待しています（[GranParadiso.app](http://www.mozilla-japan.org/projects/firefox/3.0a1/releasenotes/)でも確認してみましたが、まだ対応していなかった）。
