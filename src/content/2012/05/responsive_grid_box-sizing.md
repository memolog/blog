---
title: responsive grid と box-sizing
date: 2012-05-21T15:25:46.000Z
categories:
  - web
tags:
  - css3
  - responsive-design
excerpt: "Building a modern grid system | Tutorial | .net magazineにwidthをパーセントで指定したresponsiveなgrid（で、かつネストできてサイズの変更が簡単で..云々）を作成するという話が掲載されている。"
---

[Building a modern grid system | Tutorial | .net magazine](http://www.netmagazine.com/tutorials/building-modern-grid-system)に width をパーセントで指定した responsive な grid（で、かつネストできてサイズの変更が簡単で..云々）を作成するという話が掲載されている。

この grid が便利かどうかは使ってみないとなんともですが、その中で紹介されている box-sizing というプロパティが面白い（ずいぶん前からあるみたいですけど）。box-sizing では width/height の数値にどの範囲までを含めるかを設定することができる（参照:[box-sizing - MDN](https://developer.mozilla.org/En/CSS/Box-sizing)）。初期設定は標準モードで使われる「content-box（width はコンテンツのエリアのみで padding/border/margin は含まれない）」。これを「border-box」に設定すると、width に padding と border を含めることができる（IE6 の互換モードと同じ）。

たとえば画像に border で枠をつけつつ、横幅いっぱいに表示したいというときに、便利。content-box のままだと、border の 1px とか padding の幅をある程度考慮して width を調整しないといけなくなるけど、border-box にしてしておけば

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

みたいな感じで簡単に指定できる。IE8 以降ではないと使用できないけど、[IE7/6 用の polyfill](https://github.com/Schepp/box-sizing-polyfill)が存在するので、IE6 にも適用したい場合はそれを使うという手がある（試してないけど）。

responsive なレイアウトでは width には&#x25;が使われるので、border-box を使うことで border と padding を気にしなくて良いというのはそうとう便利な気がする（特に border は&#x25;で指定できないのできびしい）。[\* { box-sizing: border-box } FTW « Paul Irish](http://paulirish.com/2012/box-sizing-border-box-ftw/)では、さらに全称セレクタで border-box を指定するというアイデアが紹介されている（box-sizing の指定は継承されない）。
