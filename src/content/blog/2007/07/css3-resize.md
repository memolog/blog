---
title: CSS3 &#x3a; resize プロパティ
date: 2007-07-29T14:35:00.000Z
categories:
- web
tags:
- css
---
*   [http://www.css3.info/preview/resize.html](http://www.css3.info/preview/resize.html)
*   [http://www.w3.org/TR/css3-ui/#resize](http://www.w3.org/TR/css3-ui/#resize)

<!-- more -->

CSS3のプロパティの一つに「resize」というプロパティがあり、それがSafari 3では利用可能であるという話。実際にコメント欄（comment-open-text）にresize:both;というプロパティをつけてみました。Safari 3では入力フォームの大きさを自由にリサイズすることができます。

どこにも情報を保存しないため、たとえばリロードしたりすると元のサイズに戻ってしまう。よく利用する管理画面ではやはりCookieやDBかどこかにリサイズ情報を保存してたほうが便利だと思いますが、コメント入力欄とか不特定多数の人が1〜2回だけ利用するというような場合にはCSSで対応するほうが便利そう。

Firefox 2ではまだ対応していないようですが、きっと3がでることには対応しているのではないかと期待しています（[GranParadiso.app](http://www.mozilla-japan.org/projects/firefox/3.0a1/releasenotes/)でも確認してみましたが、まだ対応していなかった）。
