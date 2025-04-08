---
title: 複数のセレクタを指定したときにIE6バグ
date: 2007-08-03T15:33:00.000Z
categories:
  - web
tags:
  - css
excerpt: "*   Multiple Classes in IE | Ryan Brill *   付録：セレクタ関連の対応状況 - CSS2リファレンス"
---

- [Multiple Classes in IE | Ryan Brill](http://www.ryanbrill.com/archives/multiple-classes-in-ie/)
- [付録：セレクタ関連の対応状況 \- CSS2 リファレンス](http://hp.vector.co.jp/authors/VA022006/css/corrbrwser/selector.html)

たとえば、<p class="foo bar" > と複数 class をつけている場合に、p.foo.bar {font-size:100px;}というかたちで指定すると、IE5 と 6 では、p.bar {font-size:100px;}と指定しているのと同じ状態になってしまう、という話。IE7 ではこの現象は発生しない。

この現象は、たとえば「奇数行で最後の行にはこの背景色にして、偶数行で最後の行になる場合はこの背景色にする」というようなことをしたい場合に少し困る。p.odd.last {color:#000;}と p.even.last {color:#fff;} というような指定をしても、どちらも p.last と解釈されてしまい、CSS ファイルの後ろで指定した方が反映されてしまう。

たとえば odd_last とか、even_last とか、そういうユニークなクラスを指定するとか、そういった回避方法はなくはないのですが、スマートな方法じゃないし、なによりめんどうくさい。
