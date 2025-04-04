---
title: "Flex Line Wrapping: the flex-wrap property"
featured:
  image: jerry-wang-xiie4XeSzTU-unsplash
  author: Jerry Wang
  authorLink: https://unsplash.com/@jerry_318?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-05-23 09:00:00
excerpt: "前回のFlex Flow Direction: the flex-direction propertyから引き続き。5.2. Flex Line Wrapping: the flex-wrap propertyについて"
---

前回の[Flex Flow Direction: the flex-direction property](https://memolog.org/2020/flex-flow-direction.html)から引き続き。[5.2. Flex Line Wrapping: the flex-wrap property](https://www.w3.org/TR/css-flexbox-1/#flex-wrap-property)について

| key             | value                                  |
| --------------- | -------------------------------------- |
| Name            | flex-wrap                              |
| Value           | nowrap &#124; wrap &#124; wrap-reverse |
| Initial         | nowrap                                 |
| Applies to      | flex containers                        |
| Inherited       | no                                     |
| Percentages     | n/a                                    |
| Computed value  | specified keyword                      |
| Canonical order | per grammar                            |
| Animation type  | discrete                               |

> The flex-wrap property controls whether the flex container is single-line or multi-line, and the direction of the cross-axis, which determines the direction new lines are stacked in.

`flex-wrap`プロパティは flex container が 1 行か複数行かを制御し、また cross-axis の方向を制御して新しい行が積み重なる方向を決定する。

> **nowrap**
> The flex container is single-line.

**nowrap**
flex container は 1 行になる。

> **wrap**
> The flex container is multi-line.

**wrap**
flex container は複数行になる。

> **wrap-reverse**
> Same as wrap.

**wrap-reverse**
wrap と同様

> For the values that are not wrap-reverse, the cross-start direction is equivalent to either the inline-start or block-start direction of the current writing mode (whichever is in the cross axis) and the cross-end direction is the opposite direction of cross-start. When flex-wrap is wrap-reverse, the cross-start and cross-end directions are swapped.

`wrap-reverse`以外の値の場合、cross-start の方向は、現在の writing mode（cross axis がある方）の inline-start か block-start のどちらかと同じになる。また、cross-end の方向は cross-start の方向と反対になる。flex-wrap が`wrap-reverse`の場合は、cross-start と cross-end の方向が入れ替わる。

以下の flex wrap のサンプルは[flex-wrap - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/flex-wrap)のサンプルの画面キャプチャ。writing mode は`horizontal-tb`で上から下、左から右という流れ。

<img src="../../assets/images/flex-direction-terms.svg" />
<img src="https://www.w3.org/TR/css-writing-modes-4/diagrams/sizing-ltr-tb.svg" />

`nowrap`の場合は、main axis に沿って左から右に一列で並ぶ。折り返さない。
<img src="../../assets/images/screen_flex-wrap-nowrap.png" />

`wrap`の場合は、main-end に到達したところで折り返し、複数行になる。折り返した後の要素は下側に並ぶ。
<img src="../../assets/images/screen_flex-wrap-wrap.png" />

`wrap-reverse`の場合は、main-end に到達したところで折り返すのは wrap と同様。左から右に並ぶ流れは変わらないが、cross-start と cross-end の方向が入れ替わり、折り返した後の要素が上側に並ぶ。
<img src="../../assets/images/screen_flex-wrap-wrap-reverse.png" />
