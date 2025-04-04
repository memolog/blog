---
title: CSS Transforms&#x3a; transform
date: 2012-09-10T14:00:00.000Z
categories:
  - web
tags:
  - css
  - transform
excerpt: "CSS Transformは要素の座標変換を行うもので、transformにtransform functionsを指定することで移動/拡大/縮小/回転などを簡単に行うことができる。2Dと3Dの変換に対応していて、transform-styleが設定されていない場合は2D（flat）となる。"
---

[CSS Transform](http://www.w3.org/TR/css3-transforms/)は要素の座標変換を行うもので、transform に[transform functions](http://www.w3.org/TR/css3-transforms/#transform-functions)を指定することで移動/拡大/縮小/回転などを簡単に行うことができる。2D と 3D の変換に対応していて、transform-style が設定されていない場合は 2D（flat）となる。

```
#foobar {
  -moz-transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
  -webkit-transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
  -ms-transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
  -o-transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
  transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
}

```

translate が移動、rotate が回転、scale が拡大/縮小。上記のように transform functions が複数併記されている場合、下記のような指定をしたのと同じ変換になる（左から順に変換されるイメージ）。

transform functions では matrix(, , , , , )というかたちでどのように座標変換するか指定することもできるので、予め計算できるようであれば複数の transform functions を指定するより matrix で指定するほうが効率的であると思われる。

```
<div style="transform: translate(10px, 10px)">
    <div style="transform: rotate(45deg)">
        <div style="transform: scale(0.8,0.8)"></div>
    </div>
</div>

```

サンプル

2D の場合は skewX/skewY というのもあって、それらを指定すると X 軸/Y 軸に対して、傾けることもできる。

skewX

サンプル

skewY

サンプル

（というメモ）

CSS Transforms 関連記事
