---
title: CSS Transforms&#x3a; transform
date: 2012-09-10T14:00:00.000Z
categories:
- web
tags:
- css
- transform
---
[CSS Transform](http://www.w3.org/TR/css3-transforms/)は要素の座標変換を行うもので、transformに[transform functions](http://www.w3.org/TR/css3-transforms/#transform-functions)を指定することで移動/拡大/縮小/回転などを簡単に行うことができる。2Dと3Dの変換に対応していて、transform-styleが設定されていない場合は2D（flat）となる。

<!-- more -->

```
#foobar {
  -moz-transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
  -webkit-transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
  -ms-transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
  -o-transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
  transform: translate(10px,10px), rotate(45deg), scale(0.8,0.8);
}

```

translateが移動、rotateが回転、scaleが拡大/縮小。上記のようにtransform functionsが複数併記されている場合、下記のような指定をしたのと同じ変換になる（左から順に変換されるイメージ）。

transform functionsではmatrix(, , , , , )というかたちでどのように座標変換するか指定することもできるので、予め計算できるようであれば複数のtransform functionsを指定するよりmatrixで指定するほうが効率的であると思われる。

```
<div style="transform: translate(10px, 10px)">
    <div style="transform: rotate(45deg)">
        <div style="transform: scale(0.8,0.8)"></div>
    </div>
</div>

```

サンプル

2Dの場合はskewX/skewYというのもあって、それらを指定するとX軸/Y軸に対して、傾けることもできる。

skewX

サンプル

skewY

サンプル

（というメモ）

CSS Transforms 関連記事
-------------------

*   [CSS Transforms: transform](/blog//2012/09/css_transforms_2d/)
*   [CSS Transforms: transform-origin](/blog//2012/09/css_transforms_2d_2/)
*   [CSS Transforms: perspective](/blog//2012/09/css_transforms_3d_and_perspective/)
*   [CSS Transforms: 3D rendering context (transform-style)](/blog//2012/09/css_transforms_3d_and_transform-style/)
