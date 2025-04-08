---
title: responsive grid と box-sizing
date: 2012-05-21T15:25:46.000Z
categories:
- web
tags:
- css3
- responsive-design
---
[Building a modern grid system | Tutorial | .net magazine](http://www.netmagazine.com/tutorials/building-modern-grid-system)にwidthをパーセントで指定したresponsiveなgrid（で、かつネストできてサイズの変更が簡単で..云々）を作成するという話が掲載されている。

<!-- more -->

このgridが便利かどうかは使ってみないとなんともですが、その中で紹介されているbox-sizingというプロパティが面白い（ずいぶん前からあるみたいですけど）。box-sizingではwidth/heightの数値にどの範囲までを含めるかを設定することができる（参照:[box-sizing - MDN](https://developer.mozilla.org/En/CSS/Box-sizing)）。初期設定は標準モードで使われる「content-box（widthはコンテンツのエリアのみでpadding/border/marginは含まれない）」。これを「border-box」に設定すると、widthにpaddingとborderを含めることができる（IE6の互換モードと同じ）。

たとえば画像にborderで枠をつけつつ、横幅いっぱいに表示したいというときに、便利。content-boxのままだと、borderの1pxとかpaddingの幅をある程度考慮してwidthを調整しないといけなくなるけど、border-boxにしてしておけば

```
img.image-full{
  -moz-box-sizing: border-box;
  -webkig-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 5px;
  max-width: 100&#x25;;
}

```

みたいな感じで簡単に指定できる。IE8以降ではないと使用できないけど、[IE7/6用のpolyfill](https://github.com/Schepp/box-sizing-polyfill)が存在するので、IE6にも適用したい場合はそれを使うという手がある（試してないけど）。

responsiveなレイアウトではwidthには&#x25;が使われるので、border-boxを使うことでborderとpaddingを気にしなくて良いというのはそうとう便利な気がする（特にborderは&#x25;で指定できないのできびしい）。[\* { box-sizing: border-box } FTW « Paul Irish](http://paulirish.com/2012/box-sizing-border-box-ftw/)では、さらに全称セレクタでborder-boxを指定するというアイデアが紹介されている（box-sizingの指定は継承されない）。
