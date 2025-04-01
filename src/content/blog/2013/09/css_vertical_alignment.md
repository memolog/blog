---
title: CSSで横並びで真ん中にそろえたい
date: 2013-09-15T02:55:00.000Z
categories:
- web
tags:
- css
---
横並びにした要素を真ん中揃えにしたいという話。アプローチはいろいろあります。floatは真ん中揃えはむずかしそうなので、除外...（できるのかな）

*   line-heightでそろえる
*   display:inline-boxでそろえる

<!-- more -->
*   display:tableでそろえる
*   Flexboxでそろえる

line-heightでそろえる
----------------

line-heightは行の高さを指定するわけですが、line-heightがコンテンツエリア（フォントのサイズで決まる）よりも大きい場合はコンテンツエリアの上下に均等に配分されるので、60pxのコンテンツの真ん中にテキストを表示したい場合は、line-height:60pxにするとちょうど真ん中に配置される。line-heightでそろえるので、各要素は1行でおさめないといけないけど、タブメニューとかなら文字数少ないのでたぶん問題ない。インライン要素同士はbaselineで揃う感じになる。

.example1 { line-height:60px; text-align: center; padding: 0; } .example1 li { display:inline; padding: 5px; border:1px solid #ccc;} .example1 .circle { padding: 24px 30px; margin-right: 10px; border-radius: 100&#x25;; background:#ccc; } .example1 .two { font-size: 30px; }

*   Lorem
*   ipsum

```markup
<style>
.example1 { line-height:60px; text-align: center;  padding: 0; }
.example1 li { display:inline; padding: 5px; border:1px solid #ccc; }
.example1 .circle { padding: 24px 30px; margin-right: 10px; border-radius: 100&#x25;; background:#ccc; }
.example1 .two { font-size: 30px; }
</style>
<ul class="example1">
<li class="circle"></li>
<li class="one">Lorem</li>
<li class="two">ipsum</li>
</ul>
```

display:inline-boxでそろえる
-----------------------

display:inline-blockでは、vertical-alignのプロパティが使用できるので、vertical-align:middleを使用することで真ん中にそろえることができます。[inline-block](http://caniuse.com/inline-block)はIE8以降なら問題なく使用できる。各要素のコンテンツの高さはバラバラになる。

inline-blockのvertical-heightは、他のインライン要素との配置を揃えるための指定になるので、コンテンツ内のテキストは上揃えになる。なので、hightを指定すると中のテキストは真ん中に揃わなくなるので、高さをそろえたいときはpaddingで調整する感じになり、微妙な調整が必要になる。高さをそろえる必要がないときはわりと便利で簡単。

.example2 { list-style:none; text-align:center; margin: 0; padding: 0; } .example2 li { display: inline-block; vertical-align: middle; margin: 0; padding: 5px; border:1px solid #ccc; } .example2 .circle { padding: 30px 30px; margin-right: 10px; border-radius: 100&#x25;; background:#ccc; } .example2 .one {width: 20em; max-width:30&#x25;;} .example2 .two {font-size: 24px; width: 10em; max-width: 25&#x25;;}

*   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
*   Lorem ipsum dolor sit amet,

```markup
<style>
.example2 { list-style:none; text-align:center;  margin: 0; padding: 0; }
.example2 li { display: inline-block; vertical-align: middle;  margin: 0;  padding: 5px; border:1px solid #ccc; }
.example2 .circle { padding: 30px 30px; margin-right: 10px; border-radius: 100&#x25;; background:#ccc; }
.example2 .one {width: 20em; max-width: 30&#x25;;}
.example2 .two {font-size: 24px; width: 10em; max-width: 25&#x25;;}
</style>
<ul class="example2">
<li class="circle"></li>
<li class="one">Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
<li class="two">Lorem ipsum dolor sit amet, </li>
</ul>
```

display:tableでそろえる
------------------

display:tableとdisplay:table-cellを使うと、テーブルレイアウトと同じような感じになります。セル内の配置をvertical-alignで真ん中にそろえることができます。コンテンツ（セル）の高さは一番大きなセルと同じになります。[display:tableの対応状況](http://caniuse.com/css-table)。コンテンツの幅は明示的に指定しないと期待通りにならない場合が多い。各コンテンツにmarginをとりたい場合は、display:tableのところでcell-paddingでなんとかするか、コンテンツ内にinner div的なのを追加してなんとかする感じになる。

.example3 {display:table; margin: 0 auto; width: 80&#x25;; padding: 0;} .example3 li{display:table-cell; vertical-align:middle; margin: 0; padding: 5px; text-align:center; border:1px solid #ccc; } .example3 .circle { padding: 24px 30px; border-radius: 100&#x25;; background:#ccc; } .example3 .one {width: auto;} .example3 .two {font-size: 24px; width: 10em;}

*   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
*   Lorem ipsum dolor sit amet

```markup
<style>
.example3 {display:table; margin: 0 auto; width: 80&#x25;;  padding: 0;}
.example3 li{display:table-cell; vertical-align:middle; margin: 0;  padding: 5px; text-align:center; border:1px solid #ccc;}
.example3 .circle { padding: 24px 30px; border-radius: 100&#x25;; background:#ccc; }
.example3 .one {width: auto;}
.example3 .two {font-size: 24px; width: 10em;}
</style>
<ul class="example3">
<li><span class="circle"></span></li>
<li class="one">Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
<li class="two">Lorem ipsum dolor sit amet</li>
</ul>
```

flexboxでそろえる
------------

flexboxでは、display:flexとalign-items:centerで縦方向にそろえる。flexboxは[CSS Flexbox Please!](http://demo.agektmr.com/flexbox/)で試すことができます。コンテンツの高さをそろえたいときはalign-itemsをstretchにすればコンテナの要素の高さと合うようになりますが、中の要素が上揃えになってしまう（vertical-alignは効かない）。

[Flexboxの対応状況](http://caniuse.com/flexbox)。下の例ではprefixなしの指定しかしていないので、safariやIEでは横並びになりません。

.example4 {display:flex; align-items: center; justify-content: center; margin: 0 auto; padding: 0; list-style:none; } .example4 li{margin: 0; padding: 5px; text-align:center; border:1px solid #ccc;} .example4 .circle { padding: 30px; border-radius: 100&#x25;; margin: 10px; background:#ccc;} .example4 .one {width: auto; flex-basis: 20em;} .example4 .two {font-size: 24px; flex-basis: 10em;}

*   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
*   Lorem ipsum dolor sit amet

```markup
<style>
.example4 {display:flex; align-items: center; justify-content: center; margin: 0 auto; padding: 0; list-style:none; }
.example4 li{margin: 0;  padding: 5px; border:1px solid #ccc; text-align:center;}
.example4 .circle { padding: 30px; border-radius: 100&#x25;; margin: 10px; background:#ccc;}
.example4 .one {width: auto; flex-basis: 20em;}
.example4 .two {font-size: 24px; flex-basis: 10em;}
</style>
<ul class="example4">
<li class="circle"></li>
<li class="one">Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
<li class="two">Lorem ipsum dolor sit amet</li>
</ul>
```

というメモ。

以下は参考サイト。

*   [CSSで要素を横並びにする方法まとめ | HALAWATA.NET](http://www.halawata.net/2011/10/css-float-display-box/)
*   [CSS「display: table」と「display: table-cell」で出来ること | アイビーネットblog](http://ib-ennoshita.jp/2008/04/24-ogawa.html)
