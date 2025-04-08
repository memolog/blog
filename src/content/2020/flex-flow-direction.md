---
title: "Flex Flow Direction：the flex-direction property"
featured:
  image: juliana-arruda-iVPWGCbFwd8-unsplash
  author: Juliana Arruda
  authorLink: https://unsplash.com/@julianaaphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-05-21 00:00:00
excerpt: "今回は5. Ordering and Orientationの冒頭部分と、5.1. Flex Flow Direction: the flex-direction propertyについて。"
---

今回は[5. Ordering and Orientation](https://www.w3.org/TR/css-flexbox-1/#flow-order)の冒頭部分と、[5.1. Flex Flow Direction: the flex-direction property](https://www.w3.org/TR/css-flexbox-1/#flex-direction-property)について。

> The contents of a flex container can be laid out in any direction and in any order. This allows an author to trivially achieve effects that would previously have required complex or fragile methods, such as hacks using the float and clear properties. This functionality is exposed through the flex-direction, flex-wrap, and order properties.

flex container のコンテンツはどの方向にもどの順番でも配置することができる。これによって制作者は、float と clear を使ったハックのような複雑で脆弱な手法が要求された効果を簡単に実現できるようになる。この機能は flex-direction, flex-wrap, order プロパティを通して提供されている。

> **Note**: The reordering capabilities of flex layout intentionally affect only the visual rendering, leaving speech order and navigation based on the source order. This allows authors to manipulate the visual presentation while leaving the source order intact for non-CSS UAs and for linear models such as speech and sequential navigation. See [Reordering and Accessibility](https://www.w3.org/TR/css-flexbox-1/#order-accessibility) and the [Flex Layout Overview](https://www.w3.org/TR/css-flexbox-1/#overview) for examples that use this dichotomy to improve accessibility.

注意：flex レイアウトの並び替えの機能は意図的に視覚的なレンダリングのみに影響を与え、ソースの並び順を基本とするスピーチオーダーやナビゲーションはそのままとなる。これによって制作者は視覚的な表示を操作できる一方で、non-CSS なユーザーエージェントやスピーチや sequential navigation のような linear model に対してのソースの順序を維持することができるようになる。アクセシビリティを改善するためのこの二分法を使った例については、[Reordering and Accessibility](https://www.w3.org/TR/css-flexbox-1/#order-accessibility) および [Flex Layout Overview](https://www.w3.org/TR/css-flexbox-1/#overview)を参照。

### 5.1. Flex Flow Direction: the flex-direction property

| key             | value                                                      |
| --------------- | ---------------------------------------------------------- |
| Name            | flex-direction                                             |
| Value           | row &#124; row-reverse &#124; column &#124; column-reverse |
| Initial         | row                                                        |
| Applies to      | flex containers                                            |
| Inherited       | no                                                         |
| Percentages     | n/a                                                        |
| Computed value  | specified keyword                                          |
| Canonical order | per grammar                                                |
| Animation type  | discrete                                                   |

> The flex-direction property specifies how flex items are placed in the flex container, by setting the direction of the flex container’s main axis. This determines the direction in which flex items are laid out.

flex-direction プロパティは flex container の main axis の方向を設定することによって、flex items が flex container 内でどのように配置されるかを指定する。これは flex items が配置される方向を決定する。

<img src="../../assets/images/flex-direction-terms.svg" />

> **row**
> The flex container’s main axis has the same orientation as the inline axis of the current writing mode. The main-start and main-end directions are equivalent to the inline-start and inline-end directions, respectively, of the current writing mode.

**row**
flex container の main axis は、現在の writing mode の inline axis と同じ方向になる。main-start と main-end の方向は、現在の writing mode のそれぞれの inline-start と inline-end の方向と同じになる。

[inline axis](https://www.w3.org/TR/css-writing-modes-4/#inline-axis)は横書きの場合は横軸になる。writing mode が左から右（ltr）なら、flex items も左から右に並ぶ。**column**の方で出てくる[block axis](https://www.w3.org/TR/css-writing-modes-4/#block-axis)は横書きの場合は縦軸になる。以下は CSS Writing Modes Level 4 にある[6.2. Flow-relative Directions](https://www.w3.org/TR/css-writing-modes-4/#logical-directions)の EXAMPLE の画像。

<img src="https://www.w3.org/TR/css-writing-modes-4/diagrams/sizing-ltr-tb.svg" />
<img src="https://www.w3.org/TR/css-writing-modes-4/diagrams/sizing-ttb-rl.svg" />

> **row-revers**
> Same as row, except the main-start and main-end directions are swapped.

**row-revers**
row と同様で、main-start と main-end が入れ替わる（逆向きの方向になる）。

> **column**
> The flex container’s main axis has the same orientation as the block axis of the current writing mode. The main-start and main-end directions are equivalent to the block-start and block-end directions, respectively, of the current writing mode.

**column**
flex container の main axis は現在の writing mode の block axis と同じ方向になる。main-start と main-end の方向は、現在の writing mode のそれぞれの block-start と block-end の方向と同じになる。

writing mode が横書きなら、上から下に並んでいく感じになる。

> **column-reverse**
> Same as column, except the main-start and main-end directions are swapped.

**column-reverse**
column と同様で、main-start と main-end が入れ替わる（逆向きの方向になる）。
