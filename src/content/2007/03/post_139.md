---
title: フォントのサイズを段階的に変更するボタン
date: 2007-03-04T15:21:05.000Z
categories:
  - web
tags:
  - javascript
excerpt: " Ajaxライブラリリファレンスを参考に「フォントのサイズを段階的に変更する」というJavascriptを実験してみました。右のサイドバー（トップページのみ）の右上にひっそりとある「+ | - | reset」というリンクをクリックすると、記事のフォントサイズが大きくなったり小さくなったりします。「reset」をクリックすると、元のサイズ（12px）に戻ります。機能的にはあまり役に立ちませんが、課題演習だと思っていただければ。。"
---

[Ajax ライブラリリファレンス](http://www.amazon.co.jp/exec/obidos/ASIN/4861004314/ref=nosim/yutakayamaguc-22)を参考に「フォントのサイズを段階的に変更する」という Javascript を実験してみました。右のサイドバー（トップページのみ）の右上にひっそりとある「+ | - | reset」というリンクをクリックすると、記事のフォントサイズが大きくなったり小さくなったりします。「reset」をクリックすると、元のサイズ（12px）に戻ります。機能的にはあまり役に立ちませんが、課題演習だと思っていただければ。。

スクリプトは、[prototype.js](http://www.prototypejs.org/)と[moo.fx](http://moofx.mad4milk.net/)をインクルードして、利用できる関数を利用するだけで完成。Javascript はよくわからないのであまり効率的な書き方にはなっていないと思いますが、なんとなく動いているようです（IE 未確認）。ライブラリすごい。

[Ajax ライブラリリファレンス](http://www.amazon.co.jp/exec/obidos/ASIN/4861004314/ref=nosim/yutakayamaguc-22)（p183）では、fx.Text()という関数での利用例が記載されていたのですが、どうやら moo.fx.js が 2.x にアップデートしたときに、関数の構成が変わったようです（おそらくより汎用的になった）。fx.Test の代わりに`divObj = new fx.Style("latest-posts","font-size",{duration:100});`というような感じで利用すると、うまく動作します。

この関数では始めのサイズと終わりのサイズを指定することができるのですが、始めのサイズを固定値にすると連続的な動きにならないので、現在のサイズを取得してそれを参照するようにしてみました。現在のサイズを取得するのも prototype.js の Element.getStyle を利用して取得しています。うーん、便利。

同じ要領で画像のサイズをページ内で拡大したり縮小したりもできそうですね。ふむふむ。

```
<script type="text/javascript" src="<$MTBlogURL$>prototype.js"></script>
<script type="text/javascript" src="<$MTBlogURL$>moo/moo.fx.js"></script>
<script type="text/javascript" src="<$MTBlogURL$>moo/moo.fx.pack.js"></script>

<script type="text/javascript"><!--
window.onload = function (){
divObj = new fx.Style("latest-posts","font-size",{duration:100});
}

function changeTextSize(num){
n = Element.getStyle("latest-posts", "font-size") ;
size = { current:"", changed:""};
size.current = parseInt(n.replace("px", ""));
size.changed = size.current + num;
divObj.custom(size.current, size.changed);
}

function changeTextSizeReset(){
n = Element.getStyle("latest-posts", "font-size") ;
size = { current:"", changed:""};
size.current = parseInt(n.replace("px", ""));
divObj.custom( size.current, 12);
}

// -->

```
