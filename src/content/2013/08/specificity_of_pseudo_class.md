---
title: a&#x3a;link, a&#x3a;visitedの詳細度はclass selectorのみより大きい
date: 2013-08-30T21:00:00.000Z
categories:
  - web
tags:
  - css
excerpt: "a:link、a:visitedで宣言されたスタイルは、type selector（aタグ）とpseudo-classes（:visited）を組み合わせた詳細度になる。Calculating a selector's specificityを参照すると、詳細度は(0,1,1)となる（CSS2.1ではstyle属性も含めて(0,0,1,1)と表現されるけど内容は同じ）。"
---

a:link、a:visited で宣言されたスタイルは、type selector（a タグ）と pseudo-classes（:visited）を組み合わせた詳細度になる。[Calculating a selector's specificity](http://www.w3.org/TR/css3-selectors/#specificity)を参照すると、詳細度は(0,1,1)となる（[CSS2.1](http://www.w3.org/TR/CSS2/cascade.html#specificity)では style 属性も含めて(0,0,1,1)と表現されるけど内容は同じ）。

class selector (.foobar)のみで宣言されているスタイルは、詳細度では(0,1,0)となるため、a:link、a:visited の方が詳細度が上となり、より強く反映されることになる。

```html
<style>
  a:link {
    color: red;
  }
  .foobar {
    color: green;
  }
</style>
<p>
  <a href="#" class="foobar">FOOBAR</a>
</p>
```

上記のような例だと、リンクの色は green ではなく、red となる。仕様通りではあるけど、なんとなく class だけの方が詳細度が上のように感じてしまい、不思議な振る舞いに見える。けど、仕様通り。

```html
<style>
  a:link {
    color: red;
  }
  a:visited {
    color: blue;
  }
  a.foobar {
    color: green;
  }
</style>
<p>
  <a href="#" class="foobar">FOOBAR</a>
</p>
```

上記のように「a.foobar」となると、詳細度は(0,1,1)で同じとなるので、宣言順で後になる a.foobar の方が強く反映される。ので、green となる。逆に訪問済み（visited）の場合でも blue になることはない。訪問済みの場合は blue にしたいなら、.foobar:link で宣言すればいい（詳細度は 0.2.0 になる）。

というメモ。
