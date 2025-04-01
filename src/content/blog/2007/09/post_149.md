---
title: 透明度のクロスブラウザ対応
date: 2007-09-13T16:30:00.000Z
categories:
- web
tags:
- css
---
*   [Cross Browser Transparency | Design Shack](http://www.designshack.co.uk/news/cross-browser-transparency)

<!-- more -->
*   [Opacity - CSS3 . Info](http://www.css3.info/preview/opacity/)

小ネタ。[メモログ：MTIfタグを利用したタブ型ナビゲーション](/blog//2007/09/mtif/)のエントリーで作成した、アクティブ以外のタブには透明度をつけて濃淡の差を出しています（別に透明度で濃淡の差を出す必然性はないのですが使ってみたかった）。指定の仕方は下記のような感じ

```
opacity: 0.8;-moz-opacity: 0.8;filter: alpha(opacity=80);

```

opacityはCSS3の、透明度を割り当てるための指定です。safari 2、safari 3、Firefox 2、IE7など最新のブラウザではすでに対応ずみの指定で、この指定だけでもけっこうそのまま使うことができます。ただIE6や古いFirefoxだとopacityは対応していないので、一緒に「-moz-opacity: 0.8;filter: alpha(opacity=80);」を指定しています。-moz...の指定が古いFirefox用で、filterの指定がIE6用。これで代表的なブラウザのすべてで問題なくなります。

Firefox2、IE7ではopacityだけで問題ないので、あと数ヶ月もしたらこのクロスブラウザ対応はあまり気にしなくても良くなりそうですね。うむ。

9/19 追記。Mac Firefoxで閲覧したときに、opacityの影響でフォントのアンチエイリアスのレンダリングが変な感じになる（文字が細くみえたり太くみえたりする）。全体にopacity:0.9999を入れたり、text-shadowで常に細い状態で表示させることができなくはないようですけど、素直に背景色とフォント色で濃淡をつけるように変更しました（以下のサイトを参考にしました）。

*   [Naive by Design | How To Fix The Mac OS X Text Problem With CSS](http://www.eoghanmccabe.com/naive-by-design/how-to-fix-the-mac-os-x-text-problem-with-css/)
*   [Subtraction: Tiger Blemishes](http://www.subtraction.com/archives/2005/0502_tiger_blemis.php)
*   [24 ways: Knockout Type - Thin Is Always In](http://24ways.org/2006/knockout-type)
