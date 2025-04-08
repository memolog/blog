---
title: CSS Transforms&#x3a; perspective
date: 2012-09-22T12:26:00.000Z
categories:
- web
tags:
- css
- transforms
---
[3D Transform Rendering](http://www.w3.org/TR/css3-transforms/#transform-3d-rendering)については、下記のように記述されている。

<!-- more -->

> Normally, elements render as flat planes, and are rendered into the same plane as their containing block. Often this is the plane shared by the rest of the page. Two-dimensional transform functions can alter the appearance of an element, but that element is still rendered into the same plane as its containing block.
> 
> Three-dimensional transforms can result in transformation matrices with a non-zero Z component (where the Z axis projects out of the plane of the screen). This can result in an element rendering on a different plane than that of its containing block. This may affect the front-to-back rendering order of that element relative to other elements, as well as causing it to intersect with other elements. This behavior depends on whether the element is a member of a 3D rendering context, as described below.

2Dの場合はtransformしても包含ブロックと同じ面の上でレンダリングする。3Dでは包含ブロックと異なる面でレンダリングされるようになり、要素の前後関係や要素同士の「交差（intersect）」というような現象が発生すると。3Dでレンダリングするには3D rendering contextが及ぶ範囲に要素が存在する必要がある。

なお、3D rendering contextを生成するにはtransform-style:preserve-3dの指定が必要。[3D Transform Rendering](http://www.w3.org/TR/css3-transforms/#transform-3d-rendering)のExample 5では、2DのコンテキストでrotateY（Y軸に回転させる/横回転）した場合が例示されています。![](http://www.w3.org/TR/css3-transforms/examples/simple-3d-example.png)

そしてperspectiveについて。perspectiveは、描画される面とユーザーとの距離を指定できて、値が小さいほどユーザーと面との距離が近い。要素がどのように表示されるかは、この距離（perspective）と要素がZ軸（奥行き）のどこに位置しているかに影響される。

perspective-originはユーザーの視点の位置を変更することができる（上から見下すような目線とか下から見上げるような目線とか）。 ![](http://www.w3.org/TR/css3-transforms/perspective_distance.png)

Example 6でperspectiveも指定した状態でrotateYをした要素が例示されている。回転の仕方としては、ドアを引いて開いたような感じになる（ドアノブが左側にある）。左側のZ軸上の位置が近くなり、右側のZ軸上の位置が遠くなる。ので、左側が大きくなり、右側が小さくなる。また、3d rendering contextを持っていないので、2D（同じ面）でレンダリングされている。 ![](http://www.w3.org/TR/css3-transforms/examples/simple-perspective-example.png)

CSS Transforms 関連記事
-------------------

*   [CSS Transforms: transform](/blog//2012/09/css_transforms_2d/)
*   [CSS Transforms: transform-origin](/blog//2012/09/css_transforms_2d_2/)
*   [CSS Transforms: perspective](/blog//2012/09/css_transforms_3d_and_perspective/)
*   [CSS Transforms: 3D rendering context (transform-style)](/blog//2012/09/css_transforms_3d_and_transform-style/)
