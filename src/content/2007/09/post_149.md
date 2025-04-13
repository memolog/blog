---
title: 透明度のクロスブラウザ対応
date: 2007-09-13T16:30:00.000Z
featured:
  image: post_149.webp
  author: chatGPT
categories:
  - web
tags:
  - css
excerpt: "「MTIf タグを利用したタブ型ナビゲーション」の記事で作成した、アクティブ以外のタブには透明度をつけて濃淡の差を出しています（別に透明度で濃淡の差を出す必然性はないのですが使ってみたかった）。指定の仕方は下記のような感じ"
---

- [Cross Browser Transparency | Design Shack](http://www.designshack.co.uk/news/cross-browser-transparency)
- [Opacity - CSS3.Info](http://www.css3.info/preview/opacity/)

小ネタ。「[MTIf タグを利用したタブ型ナビゲーション](/2007/09/mtif/)」の記事で作成した、アクティブ以外のタブには透明度をつけて濃淡の差を出しています（別に透明度で濃淡の差を出す必然性はないのですが使ってみたかった）。指定の仕方は下記のような感じ

```css
opacity: 0.8;-moz-opacity: 0.8;filter: alpha(opacity=80);
```

opacity は CSS3 の、透明度を割り当てるための指定です。safari 2、safari 3、Firefox 2、IE7 など最新のブラウザではすでに対応ずみの指定で、この指定だけでもけっこうそのまま使うことができます。ただ IE6 や古い Firefox だと opacity は対応していないので、一緒に `-moz-opacity: 0.8;filter: alpha(opacity=80);` を指定しています。`-moz`...の指定が古い Firefox 用で、filter の指定が IE6 用。これで代表的なブラウザのすべてで問題なくなります。

Firefox2、IE7 では opacity だけで問題ないので、あと数ヶ月もしたらこのクロスブラウザ対応はあまり気にしなくても良くなりそうですね。うむ。

9/19 追記。Mac Firefox で閲覧したときに、opacity の影響でフォントのアンチエイリアスのレンダリングが変な感じになる（文字が細くみえたり太くみえたりする）。全体に `opacity:0.9999` を入れたり、`text-shadow` で常に細い状態で表示させることができなくはないようですけど、素直に背景色とフォント色で濃淡をつけるように変更しました（以下のサイトを参考にしました）。

- [Naive by Design | How To Fix The Mac OS X Text Problem With CSS](http://www.eoghanmccabe.com/naive-by-design/how-to-fix-the-mac-os-x-text-problem-with-css/)
- [Subtraction: Tiger Blemishes](http://www.subtraction.com/archives/2005/0502_tiger_blemis.php)
- [24 ways: Knockout Type - Thin Is Always In](http://24ways.org/2006/knockout-type)
