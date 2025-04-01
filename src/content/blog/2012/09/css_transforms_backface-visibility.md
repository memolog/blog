---
title: CSS Transforms&#x3a; backface-visibility
date: 2012-09-23T22:00:00.000Z
categories:
- web
tags:
- css
- transform
---
CSS Transformsには[backface-visibility](http://www.w3.org/TR/css3-transforms/#backface-visibility)という設定もあって、これはその名の通り、背面側を表示するかどうかの設定。

<!-- more -->

たとえばrotateY(180deg)とすると、通常は表示されない背面側が画面上に現れる。通常、背面は表側の鏡像のようになる。文字も鏡に映したように逆さまになる。backface-visibility: hiddenに設定すると、背面側が画面上に現れたら、要素が非表示となる。

> 3D-transformed elements show the same content on both sides, so the reverse side looks like a mirror-image of the front side (as if the element were projected onto a sheet of glass). Normally, elements whose reverse side is towards the viewer remain visible.

[backface-visibility | MDN](https://developer.mozilla.org/en-US/docs/CSS/backface-visibility#Examples)の例が分かりやすい。

CSS Transforms 関連記事
-------------------

*   [CSS Transforms: transform](/blog//2012/09/css_transforms_2d/)
*   [CSS Transforms: transform-origin](/blog//2012/09/css_transforms_2d_2/)
*   [CSS Transforms: perspective](/blog//2012/09/css_transforms_3d_and_perspective/)
*   [CSS Transforms: 3D rendering context (transform-style)](/blog//2012/09/css_transforms_3d_and_transform-style/)
