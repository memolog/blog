---
title: a&#x3a;link, a&#x3a;visitedの詳細度はclass selectorのみより大きい
date: 2013-08-30T21:00:00.000Z
categories:
- web
tags:
- css
---
a:link、a:visitedで宣言されたスタイルは、type selector（aタグ）とpseudo-classes（:visited）を組み合わせた詳細度になる。[Calculating a selector's specificity](http://www.w3.org/TR/css3-selectors/#specificity)を参照すると、詳細度は(0,1,1)となる（[CSS2.1](http://www.w3.org/TR/CSS2/cascade.html#specificity)ではstyle属性も含めて(0,0,1,1)と表現されるけど内容は同じ）。

<!-- more -->

class selector (.foobar)のみで宣言されているスタイルは、詳細度では(0,1,0)となるため、a:link、a:visitedの方が詳細度が上となり、より強く反映されることになる。

```markup
<style>
a:link { color: red; }
.foobar { color: green; }
</style>
<p>
<a href="#" class="foobar">FOOBAR</a>
</p>
```

上記のような例だと、リンクの色はgreenではなく、redとなる。仕様通りではあるけど、なんとなくclassだけの方が詳細度が上のように感じてしまい、不思議な振る舞いに見える。けど、仕様通り。

```markup
<style>
a:link { color: red; }
a:visited { color: blue; }
a.foobar { color: green; }
</style>
<p>
<a href="#" class="foobar">FOOBAR</a>
</p>
```

上記のように「a.foobar」となると、詳細度は(0,1,1)で同じとなるので、宣言順で後になるa.foobarの方が強く反映される。ので、greenとなる。逆に訪問済み（visited）の場合でもblueになることはない。訪問済みの場合はblueにしたいなら、.foobar:link で宣言すればいい（詳細度は0.2.0になる）。

というメモ。
