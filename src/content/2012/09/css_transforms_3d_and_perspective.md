---
title: CSS Transforms：perspective
date: 2012-09-22T12:26:00.000Z
categories:
  - web
tags:
  - css
  - transforms
excerpt: "3D Transform Renderingについては、下記のように記述されている。"
---

[3D Transform Rendering](http://www.w3.org/TR/css3-transforms/#transform-3d-rendering)については、下記のように記述されている。

> Normally, elements render as flat planes, and are rendered into the same plane as their containing block. Often this is the plane shared by the rest of the page. Two-dimensional transform functions can alter the appearance of an element, but that element is still rendered into the same plane as its containing block.
>
> Three-dimensional transforms can result in transformation matrices with a non-zero Z component (where the Z axis projects out of the plane of the screen). This can result in an element rendering on a different plane than that of its containing block. This may affect the front-to-back rendering order of that element relative to other elements, as well as causing it to intersect with other elements. This behavior depends on whether the element is a member of a 3D rendering context, as described below.

2D の場合は transform しても包含ブロックと同じ面の上でレンダリングする。3D では包含ブロックと異なる面でレンダリングされるようになり、要素の前後関係や要素同士の「交差（intersect）」というような現象が発生すると。3D でレンダリングするには 3D rendering context が及ぶ範囲に要素が存在する必要がある。

なお、3D rendering context を生成するには transform-style:preserve-3d の指定が必要。[3D Transform Rendering](http://www.w3.org/TR/css3-transforms/#transform-3d-rendering)の Example 5 では、2D のコンテキストで rotateY（Y 軸に回転させる/横回転）した場合が例示されています。![](http://www.w3.org/TR/css3-transforms/examples/simple-3d-example.png)

そして perspective について。perspective は、描画される面とユーザーとの距離を指定できて、値が小さいほどユーザーと面との距離が近い。要素がどのように表示されるかは、この距離（perspective）と要素が Z 軸（奥行き）のどこに位置しているかに影響される。

perspective-origin はユーザーの視点の位置を変更することができる（上から見下すような目線とか下から見上げるような目線とか）。 ![](http://www.w3.org/TR/css3-transforms/perspective_distance.png)

Example 6 で perspective も指定した状態で rotateY をした要素が例示されている。回転の仕方としては、ドアを引いて開いたような感じになる（ドアノブが左側にある）。左側の Z 軸上の位置が近くなり、右側の Z 軸上の位置が遠くなる。ので、左側が大きくなり、右側が小さくなる。また、3d rendering context を持っていないので、2D（同じ面）でレンダリングされている。 ![](http://www.w3.org/TR/css3-transforms/examples/simple-perspective-example.png)

CSS Transforms 関連記事
