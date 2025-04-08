---
title: The display value property (list-item / internal)
featured:
  image: glen-hooper-8LWtpfhGP4U-unsplash
  author: Glen Hooper
  authorLink: https://unsplash.com/@hoops1972?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-08 14:24:22
excerpt: "The display value property (outside / inside)の続き。2. Box Layout Modes: the display propertyからdisplayプロパティのvalueについて、list-itemとinterについて確認していく。"
---

[The display value property (outside / inside)](https://memolog.org/2020/display-value-property.html)の続き。[2. Box Layout Modes: the display property](https://www.w3.org/TR/css-display-3/#the-display-properties)から display プロパティの value について、list-item と inter について確認していく。

### display-listitem

`<display-listitem>`の定義は以下のようになっている

> &lt;display-outside&gt;? && [ flow | flow-root ]? && list-item

つまり、`list-item`のキーワードは必須で、並列して`<display-outside>`と`flow`か`flow-root`を指定することができる。なお、複数キーワードの並置（Multi-keyword values）は[display - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/display)によると 2020 年 3 月現在 Firefox のみサポートしている。

> The list-item keyword causes the element to generate a ::marker pseudo-element [CSS-PSEUDO-4] with the content specified by its list-style properties (CSS 2.1§12.5 Lists) [CSS2] together with a principal box of the specified type for its own contents.

list-item キーワードは principal box と共に`::marker`の擬似要素を生成する。

> If no inner display type value is specified, the principal box’s inner display type defaults to flow. If no outer display type value is specified, the principal box’s outer display type defaults to block.

`<display-outside>`が指定されていなければ `block` となり、`flow | flow-root`が指定されていなければ`flow`になる。

> Note: In this level, as restricted in the grammar, list-items are limited to the Flow Layout display types (block/inline/run-in with flow/flow-root inner types). This restriction may be relaxed in a future level of this module.

list-item の inner display type は今のところ flow/flow-root に制限されているけど、将来的には融和されるかもしれない。

### display-internal

> table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container

> Some layout models, such as table and ruby, have a complex internal structure, with several different roles that their children and descendants can fill. This section defines those “layout-internal” display values, which only have meaning within that particular layout mode.

> Unless otherwise specified, both the inner display type and the outer display type of elements using these display values are set to the given keyword.

`table`や`ruby`などの layout では、内部に（行とか列とか）子孫要素に異なる役割を渡すような複雑な構造を持つ。`layout-internal`は特定の layout mode でしか意味を持たない内部で利用する display value などを扱っている。

特に指定がない場合、これらの display value を利用している要素の inner display type と outer display type には、所与のキーワードがセットされる。

> The <display-internal> keywords are defined as follows:

> **table-row-group, table-header-group, table-footer-group, table-row, table-cell, table-column-group, table-column**

> The element is an internal table element. It generates the appropriate internal table box which participates in a table formatting context. See CSS2§17.2 [CSS2].
> table-cell boxes have a flow-root inner display type.

table 関連のキーワード。table-cell boxes は`flow-root`の inner display type を持つ。

> **table-caption**
> The element generates a table caption box, which is a block box with special behavior with respect to table and table wrapper boxes. See CSS2§17.2 [CSS2].
> table-caption boxes have a flow-root inner display type.

table-caption は table caption box という特別な振る舞いをする block box を生成する。こちらの box も flow-root の inner display type を持つ。

> **ruby-base, ruby-text, ruby-base-container, ruby-text-container**
> The element is an internal ruby element. It generates the appropriate internal ruby box which participates in a ruby formatting context. [CSS3RUBY]
> ruby-base and ruby-text have a flow inner display type.
