---
title: Flex Items
featured:
  image: vincent-van-zalinge-8bOwZ8ag9UY-unsplash
  author: Vincent van Zalinge
  authorLink: https://unsplash.com/@vincentvanzalinge?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-03-21 18:17:12
excerpt: "Flex Containersから引き続き、4. Flex Itemsについて確認していく。"
---

[Flex Containers](https://memolog.org/2020/flex-containers.html)から引き続き、[4. Flex Items](https://www.w3.org/TR/css-flexbox-1/#flex-items)について確認していく。

> Loosely speaking, the flex items of a flex container are boxes representing its in-flow contents.

大まかに言うと、　 flex container の flex item は、（flex container の）in-flow コンテンツを表現した box である。

つまり、大まかには`display:flex`配下の子要素が flex item として処理される。以下の説明では、例外的なケースについての説明を含んだ、より厳密な内容が続く。

> Each in-flow child of a flex container becomes a flex item, and each contiguous sequence of child text runs is wrapped in an anonymous block container flex item. However, if the entire sequence of child text runs contains only white space (i.e. characters that can be affected by the white-space property) it is instead not rendered (just as if its text nodes were display:none).

flex container のそれぞれの in-flow の子供は、flex item になり、子の text run の連続する列のそれぞれは、anonymous block container flex item でラップされる。しかしながら、もし全ての text run の列が空白（white-space プロパティによって影響をうける文字列）のみを含む場合、ラップされる代わりにレンダリングされなくなる（ちょうど text ノードが display:none であるかのように）。

**EXAMPLE 2**

```html
<div style="display:flex">
  <!-- flex item: block child -->
  <div id="item1">block</div>

  <!-- flex item: floated element; floatの指定は無視される -->
  <div id="item2" style="float: left;">float</div>

  <!-- flex item: インラインコンテンツはanonymous block boxで囲われる -->
  anonymous item 3

  <!-- flex item: inline child -->
  <span>
    item 4
    <!-- flex items はブロックの周囲で分かれない -->
    <q style="display: block" id="not-an-item">item 4</q>
    item 4
  </span>
</div>
```

flex items は下の画像みたいになる。
<img src="../../assets/images/screenshot_flex_items.png" lazyload width="327" height="100" />

> Note that the inter-element white space disappears: it does not become its own flex item, even though the inter-element text does get wrapped in an anonymous flex item.

要素と要素の間にある空白は消える。要素間の text は anonymous flex item でラップされるけれど、空白だけでは flex item にはならない。

> Note also that the anonymous item’s box is unstyleable, since there is no element to assign style rules to. Its contents will however inherit styles (such as font settings) from the flex container.

anonymous item の box は、スタイルのルールを割り当てる要素がないので、スタイルがない（unstyleable）状態になる。しかしながら、flex container から（font のような）スタイルは引き継がれる。

> A flex item establishes an independent formatting context for its contents. However, flex items themselves are flex-level boxes, not block-level boxes: they participate in their container’s flex formatting context, not in a block formatting context.

flex item はそのコンテンツに対して independent formatting context を設置する。しかしながら、flex item そのものは flex レベルの box であり、block レベルの box ではない。つまり flex items は container の flex formatting context に参加する。block formatting context には参加しない。
