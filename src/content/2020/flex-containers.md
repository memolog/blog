---
title: Flex Containers
featured:
  image: wengang-zhai-rNO0c2rlVUo-unsplash
  author: Wengang Zhai
  authorLink: https://unsplash.com/@wgzhai?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-20 17:45:51
excerpt: "Flex Layout Box Model and Terminologyから引き続き、3. Flex Containers: the flex and inline-flex display valuesについて確認していく。"
---

[Flex Layout Box Model and Terminology](https://memolog.org/2020/flex-layout-box-model-and-terminology.html)から引き続き、[3. Flex Containers: the flex and inline-flex display values](https://www.w3.org/TR/css-flexbox-1/#flex-containers)について確認していく。

> **Name**: display
> **New values**: flex | inline-flex

> **flex**
> This value causes an element to generate a flex container box that is block-level when placed in flow layout.
> **inline-flex**
> This value causes an element to generate a flex container box that is inline-level when placed in flow layout.

> A flex container establishes a new flex formatting context for its contents. This is the same as establishing a block formatting context, except that flex layout is used instead of block layout. For example, floats do not intrude into the flex container, and the flex container’s margins do not collapse with the margins of its contents. Flex containers form a containing block for their contents [exactly like block containers do](https://www.w3.org/TR/CSS2/visudet.html#containing-block-details). [CSS21] The overflow property applies to flex containers.

flex container は新しい flex formatting context を設置する。これはブロックレイアウトの代わりに flex レイアウトが使われることを除いて、block formatting context と同じように設置される。たとえば、float は flex container の中に侵入してこないし、flex container のマージンは、そのコンテンツのマージンと相殺（collapse）されない。flex container は、block container がするのと全く同じように、コンテンツのための containing block（縦横幅やポジションなどの基本的な値な形成する長方形）を形作る。overflow プロパティは flex container に適用される。

> Flex containers are not block containers, and so some properties that were designed with the assumption of block layout don’t apply in the context of flex layout. In particular:

flex container は block container ではなく、ブロックレイアウトを想定してデザインされているいくつかのプロパティは flex レイアウトのコンテキストでは適用されない。特に以下。

> - float and clear do not create floating or clearance of flex item, and do not take it out-of-flow.
> - vertical-align has no effect on a flex item.
> - the ::first-line and ::first-letter pseudo-elements do not apply to flex containers, and flex containers do not contribute a first formatted line or first letter to their ancestors.

- float と clear は、flex アイテムの float やその clear をしない。つまり flex item を out-of-flow（flow layout によって配置されていない）状態にしない
- vertical-align は flex アイテムには効果がない
- ::first-line と::first-letter の擬似要素は flex container では適用されない。また flex container はその子孫要素に first formatted line または first letter を提供しない。

> If an element’s specified display is inline-flex, then its display property computes to flex in certain circumstances: the table in [CSS 2.1 Section 9.7](https://www.w3.org/TR/CSS2/visuren.html#dis-pos-flo) is amended to contain an additional row, with inline-flex in the "Specified Value" column and flex in the "Computed Value" column.

もしある要素の指定した display が`inline-flex`である場合、その display プロパティが特定の環境の中では`flex`として計算される。[CSS 2.1 Section 9.7](https://www.w3.org/TR/CSS2/visuren.html#dis-pos-flo)の表には、Specified value が`inline-flex`、Computed Value が`flex`という行を追加される。
