---
title: マージンの相殺とoverflow, clear&#x3a;both
date: 2012-06-04T20:15:00.000Z
categories:
  - web
tags:
  - html
excerpt: "垂直方向に隣接するマージンはマージンの相殺（collapsing）が働くけれど、overflow:hiddenがあると相殺されない、という仕様の話。あとclearanceについて。"
---

垂直方向に隣接するマージンは[マージンの相殺（collapsing）](http://www.w3.org/TR/CSS21/box#collapsing-margins)が働くけれど、overflow:hidden があると相殺されない、という仕様の話。あと clearance について。

```
<style>
.foo {margin:10px 0 20px 0;}
.bar {margin:25px 0 5px 0;}
.baz {margin:20px 0 30px 0;}
</style>

<h3 class="foo">foo</h3>
<div class="bar">
  <p class="baz">baz</p>
</div>

```

上のような HTML/CSS の場合、h3.foo の margin bottom と div.bar と p.baz の margin top が、垂直方向に隣接するマージンとなるので相殺の対象となる。その場合、大きい値のマージンが残る。上の例では div.bar の 25px のマージンが残る。

マージンの相殺は

```
<style>
p{ margin:10px; }
</style>

<p>foo</p>
<p>bar</p>
<p>baz</p>

```

のような HTML/CSS の場合に、3 つの p タグの上下にマージンを入れつつ、p タグの間のマージンも重複しないで同じマージン幅であけることができるので、状況によって便利

ただしマージンの相殺には除外要件があって、下記のようなもの

> Adjoining vertical margins collapse, except:
>
> - Margins of the root element's box do not collapse.
> - If the top and bottom margins of an element with **clearance** are adjoining, its margins collapse with the adjoining margins of following siblings but that resulting margin does not collapse with the bottom margin of the parent block.

さらに、条件が書かれていて

> Two margins are adjoining if and only if:
>
> - both belong to in-flow block-level boxes that participate in **the same block formatting context**
> - no line boxes, no clearance, no padding and no border separate them (Note that certain zero-height line boxes (see 9.4.2) are ignored for this purpose.)
> - both belong to vertically-adjacent box edges, i.e. form one of the following pairs:
>   - top margin of a box and top margin of its first in-flow child
>   - bottom margin of box and top margin of its next in-flow following sibling
>   - bottom margin of a last in-flow child and bottom margin of its parent if the parent has 'auto' computed height
>   - top and bottom margins of a box that does not establish a new block formatting context and that has zero computed 'min-height', zero or 'auto' computed 'height', and no in-flow children

と書いてあり、「same block formatting」の中にある要素でないと、マージンの相殺は発生しない。

overflow は[float と width:auto - メモログ](/blog//2012/05/float_and_width_auto/)でも触れましたけれど、visible 以外の値が設定されている場合は、new block formatting contexts を構築するので、マージンの相殺が発生しなくなる。

上の例の場合だと

```
<style>
.foo {margin:10px 0 20px 0;}
.bar {margin:25px 0 5px 0; overflow:hidden;}
.baz {margin:20px 0 30px 0;}
</style>

<h3 class="foo">foo</h3>
<div class="bar">
  <p class="baz">baz</p>
</div>

```

のように、div.bar に overflow:hidden がつくと、h3.foo と div.bar/p.baz との間のマージンの相殺は行われなくなる（div.bar と p.baz との間の相殺は発生する）。

上のような具体例として、仕様上に下記のように箇条書きされている。

> Note the above rules imply that:
>
> - Margins between a floated box and any other box do not collapse (not even between a float and its in-flow children).
> - Margins of elements that establish new block formatting contexts (such as floats and elements with 'overflow' other than 'visible') do not collapse with their in-flow children.
> - Margins of absolutely positioned boxes do not collapse (not even with their in-flow children).
> - Margins of inline-block boxes do not collapse (not even with their in-flow children).
> - The bottom margin of an in-flow block-level element always collapses with the top margin of its next in-flow block-level sibling, unless that sibling has clearance.
> - The top margin of an in-flow block element collapses with its first in-flow block-level child's top margin if the element has no top border, no top padding, and the child has no clearance.
> - The bottom margin of an in-flow block box with a 'height' of 'auto' and a 'min-height' of zero collapses with its last in-flow block-level child's bottom margin if the box has no bottom padding and no bottom border and the child's bottom margin does not collapse with a top margin that has clearance.
> - A box's own margins collapse if the 'min-height' property is zero, and it has neither top or bottom borders nor top or bottom padding, and it has a 'height' of either 0 or 'auto', and it does not contain a line box, and all of its in-flow children's margins (if any) collapse.

clearance はいわゆる float:both などを設定した場合に発生するけれど、[clearance の仕様](http://www.w3.org/TR/CSS21/visuren.html#clearance)には下記のように書かれている。

> Values other than 'none' potentially introduce clearance. Clearance inhibits margin collapsing and acts as spacing above the margin-top of an element. It is used to push the element vertically past the float.
>
> Computing the clearance of an element on which 'clear' is set is done by first determining the hypothetical position of the element's top border edge. This position is where the actual top border edge would have been if the element's 'clear' property had been 'none'.
>
> If this hypothetical position of the element's top border edge is not past the relevant floats, then clearance is introduced, and margins collapse according to the rules in 8.3.1.

端的に言うと、clear:both と書かいても、実際に clearance が発生しない場合はマージンの相殺は行われる。
