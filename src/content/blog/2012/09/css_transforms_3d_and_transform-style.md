---
title: CSS Transforms&#x3a; 3D rendering context (transform-style)
date: 2012-09-23T12:24:00.000Z
categories:
- web
tags:
- css
- transform
---
[CSS Transforms: (3D/perspective) - メモログ](/blog//2012/09/css_transforms_3d_and_perspective/)の続きで3d rendering contextについて。[CSS Transforms](http://www.w3.org/TR/css3-transforms/#perspective-matrix-computation)のExample7から9を紹介するだけという内容。

<!-- more -->

Example7のサンプルと、Example8のサンプル。 ![](http://www.w3.org/TR/css3-transforms/examples/3d-rendering-context-flat.png) ![](http://www.w3.org/TR/css3-transforms/examples/3d-rendering-context-3d.png) 両者の違いは、後者はtransform-style:preserve-3dが指定されていて、青とライムの要素が3D rendering contextの中にいるということ。2Dの場合でも、perspectiveの効果で長方形が台形状に描かれるけど、3Dでのレンダリングのような奥行きの空間は存在しない。台形状に描かれているだけ。

なので、前者の2Dの場合は、台形状の要素（青）を親に持つ要素（ライム）が、rotateX（+transform-origin）による変換で青より短い台形のように描かれる。3Dの場合は、奥行きの空間が存在して、青の要素はY軸方向に回転している（横回転）。ライムの要素はそこからさらにX軸方向に回転する（縦回転）。

Example9では、ここからさらに「交差（intersect）」の状態を例示している。 ![](http://www.w3.org/TR/css3-transforms/examples/3d-intersection.png) 3Dの場合は、奥行きの空間が存在するので、要素のZ軸方向への傾き方によって、要素が交差するという現象が発生する。ブラウザで実際に試してみたら、要素の左半分だけ親要素の後ろ側にいかなかったですけど（ある回転角度で全部後ろ側にいく）。

そんな感じ。3D redering contextは描画する上で奥行きの空間が必要な場合、必要となる。一つの要素をY軸方向に回転させたいだけの場合は、3D rendering contextがなくてもperspectiveの指定だけでそれっぽくなる。

CSS Transforms 関連記事
-------------------

*   [CSS Transforms: transform](/blog//2012/09/css_transforms_2d/)
*   [CSS Transforms: transform-origin](/blog//2012/09/css_transforms_2d_2/)
*   [CSS Transforms: perspective](/blog//2012/09/css_transforms_3d_and_perspective/)
*   [CSS Transforms: 3D rendering context (transform-style)](/blog//2012/09/css_transforms_3d_and_transform-style/)
