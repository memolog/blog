---
title: 複合セレクタを指定したときにIE6バグ
date: 2007-08-03T15:33:00.000Z
featured:
  image: elias-maurer-uaJfantgQNE-unsplash
  author: Elias Maurer
  authorLink: https://unsplash.com/ja/@elmaurer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
categories:
  - web
tags:
  - css
excerpt: "p.foo.barのような複合セレクタを指定したときに、IE5と6 では、p.barと単純セレクタで指定しているのと同じ状態になってしまうという話"
---

- [Multiple Classes in IE | Ryan Brill](http://www.ryanbrill.com/archives/multiple-classes-in-ie/)

たとえば、`<p class="foo bar">` と複数のclassをつけている場合に、`p.foo.bar {font-size:100px;}`というかたちで指定すると、IE5と6では、`p.bar {font-size:100px;}`と指定しているのと同じ状態になってしまう、という話。IE7ではこの現象は発生しない。

この現象は、たとえば「奇数行で最後の行にはこの背景色にして、偶数行で最後の行になる場合はこの背景色にする」というようなことをしたい場合に少し困る。`p.odd.last {color:#000;}`と `p.even.last {color:#fff;}`というような指定をしても、どちらも p.last と解釈されてしまい、CSS ファイルの後ろで指定した方が反映されてしまう。

たとえば `odd_last` とか、`even_last` とか、そういうユニークなクラスを指定するとか、そういった回避方法はなくはないのですが、スマートな方法じゃないし、なによりめんどうくさい。
