---
title: CSS：column-count で3列レイアウトを作成
date: 2010-02-03T22:00:00.000Z
categories:
  - web
tags:
  - css
excerpt: "*   Stronger, Better, Faster Design with CSS3"
---

- [Stronger, Better, Faster Design with CSS3](http://www.smashingmagazine.com/2009/12/16/stronger-better-faster-design-with-css3/)

- [W3C: CSS Multi-column Layout Module](http://www.w3.org/TR/css3-multicol/)
- [Multi-column layout - CSS3 . Info](http://www.css3.info/preview/multi-column-layout/)

フッター部分を 3 列にしてみようかなと唐突に思いついて、以前から興味あった column-count を使って 3 列にしてみました。Firefox と Safari でのみ対応（IE では 1 列のまま表示されます）。Pico のデザインのバランスを崩している気がしないでもないですけど、まあいいか。

追加した CSS は下記のよう感じです。他にもいろいろ追加してますけど不要な部分は割愛。

```
-webkit-column-count: 3; -webkit-column-gap: 10px;
-moz-column-count: 3; -moz-column-gap: 10px;

```

-webkit が Safari 用で-moz が Firefox 用。colum-count は列（カラム）の数を指定して、column-gap は列と列の間の隙間の大きさを指定します。

簡単ですなあ。これで[背景画像を複数指定](http://www.css3.info/preview/multiple-backgrounds/)できるようになったら div を複数囲うなんてことは必要なくなるんでしょうね。
