---
title: Automatic Box Type Transformations
featured:
  image: jeremy-bishop-t52E8yzCURM-unsplash
  author: Jeremy Bishop
  authorLink: https://unsplash.com/@jeremybishop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-10 22:12:24
excerpt: "Box Layout Modes: the display propertyの最後の節として 2.7. Automatic Box Type Transformationsについて書かれているので、簡単に確認する。何らかのレイアウト効果の影響でboxのタイプが自動的に変わる場合があるという話。"
---

[Box Layout Modes: the display property](https://www.w3.org/TR/css-display-3/#the-display-properties)の最後の節として
[2.7. Automatic Box Type Transformations](https://www.w3.org/TR/css-display-3/#transformations)について書かれているので、簡単に確認する。何らかのレイアウト効果の影響で box のタイプが自動的に変わる場合があるという話。

> Some layout effects require blockification or inlinification of the box type, which sets the box’s outer display type to block or inline (respectively). (This has no effect on display types that generate no box at all, such as none or contents.) Additionally:

レイアウトの効果によっては、box type の**blockification**または**inlinification**、つまり、box の outer display type を block または inline に設定しなければならない場合がある。（これは`none`や`contents`など box を生成しない display type には影響を与えない。）それはさらに下記のような事象を含む。

> - If a block flow box is inlinified, its inner display type is set to flow-root so that it remains a block container.

もし block flow box をインライン化する場合、inner display type は`flow-root`に設定される。つまり、block container は残ることになる。

> - If an inline flow box is inlinified, it recursively inlinifies all of its in-flow children, so that no block-level descendants break up the inline formatting context in which it participates.

もし inline flow box をインライン化する場合、そのフローの中の子孫はすべて再帰的にインライン化される。なので、block レベルの子孫が iniline formatting context を破壊することはない。

> - For legacy reasons, if an inline flow-root box (aka inline-block) is blockified, it becomes a block box (losing its flow-root nature). For consistency, a run-in flow-root box also blockifies to a block box.

歴史的な経緯によって、もし inline flow-root box（いわゆる inline-block）をブロック化する場合、それは block box になる（flow-root の特性を失う）。一貫性のために、run-in flow-root box もまた、ブロック化によって block box になる。

> - If a layout-internal box is blockified, its inner display type converts to flow so that it becomes a block container. Inlinification has no effect on layout-internal boxes. (However, placement in such an inline context will typically cause them to be wrapped in an appropriately-typed anonymous inline-level box.)

もし layout-internal（display-internal）box がブロック化したら、inner display type は`flow`になり、block container になる。インライン化は、layout-internal box には影響がない（しかしながら、そのような inline コンテキストへの配置は、たいていの場合、それらを適切なタイプの anonymous inline レベル box で囲う要因となるだろう。

> **Note**: There are two methods used to fix up box types when a box is mismatched to its context. One is transformation of the computed value of display, such as blockification and inlinification described here. The other, taking place during box tree construction (after computed values have been determined), is the creation of intermediary anonymous boxes, such as happens in tables, ruby, and flow layout.

box がそのコンテキストと合っていない場合、box のタイプを修正するための方法が二つある。一つは上記で述べた blockification や inlinification のような display の computed value を変換することである。もう一つは、table や ruby、flow layout で行われるような、box tree を構築するところで、box の間に anonymous box を作成することである。

> **EXAMPLE 2**
> Some examples of computed-value fixup include:

- Absolute positioning or floating an element blockifies the box’s display type. [CSS2]
- Containment in a ruby container inlinifies the box’s display type, as described in [CSS3RUBY].
- A parent with a grid or flex display value blockifies the box’s display type. [CSS3-GRID-LAYOUT] [CSS3-FLEXBOX]

以下の例は computed-value fixup が含まれている。

- absolute による position 設定、または要素の回り込み（float）は、その box の display type をブロック化する
- ruby container によって囲われると、その box の display type はインライン化する。
- grid や flex の値がついた親は、その box の display type をブロック化する。

> The root element’s display type is always blockified. Additionally, a display of contents computes to block on the root element.

ルートの要素の display type は常にブロック化される。さらに、コンテンツの表示はルート要素上では block として計算される。
