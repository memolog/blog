---
title: Fragmenting Flex Layout
featured:
  image: tomas-malik-zlSzh2FP7LY-unsplash
  author: Tomáš Malík
  authorLink: https://unsplash.com/@malcoo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-09-09 10:06:00
excerpt: "今回は10. Fragmenting Flex Layout について。"
---

今回は[10. Fragmenting Flex Layout
](https://www.w3.org/TR/css-flexbox-1/#pagination)について。

> Flex containers can break across pages between items, between lines of items (in multi-line mode), and inside items. The [break-\*](https://www.w3.org/TR/css3-break/#propdef-break-before) properties apply to flex containers as normal for block-level or inline-level boxes. This section defines how they apply to flex items and the contents of flex items. See the [CSS Fragmentation Module](http://www.w3.org/TR/css-break/) for more context [[CSS3-BREAK]](https://www.w3.org/TR/css-flexbox-1/#biblio-css3-break).

flex container は items の間や、item の行の間（複数行モードの場合）、そして items の内部でページをまたぐことができる。[break-\*](https://www.w3.org/TR/css3-break/#propdef-break-before)のプロパティはブロックやインラインレベルと同じように flex containers に適用される。このセクションはそれらがどのように flex item や flex items のコンテンツに適用されるかを定義している。詳細は[CSS Fragmentation Module](http://www.w3.org/TR/css-break/)を参照[[CSS3-BREAK]](https://www.w3.org/TR/css-flexbox-1/#biblio-css3-break)。

> The following breaking rules refer to the [fragmentation container](https://www.w3.org/TR/css3-break/#fragmentation-container) as the “page”. The same rules apply in any other [fragmentation context](https://www.w3.org/TR/css3-break/#fragmentation-context). (Substitute “page” with the appropriate fragmentation container type as needed.) For readability, in this section the terms "row" and "column" refer to the relative orientation of the flex container with respect to the block flow direction of the fragmentation context, rather than to that of the flex container itself.

次の改行ルールでは[fragmentation container](https://www.w3.org/TR/css3-break/#fragmentation-container)を「ページ」として言及する。同じルールが他の[fragmentation context](https://www.w3.org/TR/css3-break/#fragmentation-context)においても適用される。（必要に応じて「ページ」を適切な fragmentation container type に置き換える。）可読性のために、このセクションにおいては「行」「列」の用語を、flex container 自身のそれではなく、fragmentation context のブロックフローに対する flex container の相対的な方向として言及する。

> The exact layout of a fragmented flex container is not defined in this level of Flexible Box Layout. However, breaks inside a flex container are subject to the following rules (interpreted using order-modified document order):

fragmented flex container の正確なレイアウトは Flexible Box Layout のこのレベルでは定義されていない。しかしながら、flex container 内部での改行は次のルールに従う（order-modified document order を使用していると解釈される）。

> - In a row flex container, the break-before and break-after values on flex items are propagated to the flex line. The break-before values on the first line and the break-after values on the last line are propagated to the flex container.<br>**Note:** Break propagation (like text-decoration propagation) does not affect computed values.
> - In a column flex container, the break-before values on the first item and the break-after values on the last item are propagated to the flex container. Forced breaks on other items are applied to the item itself.
> - A forced break inside a flex item effectively increases the size of its contents; it does not trigger a forced break inside sibling items.
> - In a row flex container, [Class A break opportunities](https://www.w3.org/TR/css3-break/#btw-blocks) occur between sibling flex lines, and [Class C break opportunities](https://www.w3.org/TR/css3-break/#end-block) occur between the first/last flex line and the flex container’s content edges. In a column flex container, Class A break opportunities occur between sibling flex items, and Class C break opportunities occur between the first/last flex items on a line and the flex container’s content edges. [CSS3-BREAK]
> - When a flex container is continued after a break, the space available to its flex items (in the block flow direction of the fragmentation context) is reduced by the space consumed by flex container fragments on previous pages. The space consumed by a flex container fragment is the size of its content box on that page. If as a result of this adjustment the available space becomes negative, it is set to zero.
> - If the first fragment of the flex container is not at the top of the page, and none of its flex items fit in the remaining space on the page, the entire fragment is moved to the next page.
> - When a multi-line column flex container breaks, each fragment has its own "stack" of flex lines, just like each fragment of a multi-column container has its own row of column boxes.
> - Aside from the rearrangement of items imposed by the previous point, UAs should attempt to minimize distortion of the flex container with respect to unfragmented flow.

- flex container の行において、flex items 上の`break-before`と`break-after`の値は、flex 行に伝播する。最初の行の break-before の値と最後の行の break-after の値は、flex container に伝播する。<br>**注:**改行の伝播は（text-decoration の伝播のように）計算値に影響を与えない
- flex container の列において、最初の item の break-before の値と最後の item の break-after の値は flex container に伝播する。他の items 上の強制的な改行は item それ自身に適用される。
- flex item 内の強制改行はコンテンツのサイズを効果的に増加させる。それは隣の items 内の強制改行を引き起こさない。
- flex container の行において、[Class A break opportunities](https://www.w3.org/TR/css3-break/#btw-blocks)は隣り合う flex 行の間で発生して、[Class C break opportunities](https://www.w3.org/TR/css3-break/#end-block)は最初・最後の flex 行と flex container のコンテンツの端の間で発生する。flex container の列にといては、Class A break opportunities は隣り合う flex items の間で起こり、Class C break opportunities は最初・最後の flex items と flex container のコンテンツの端との間で発生する。
- flex container が改行の後に継続する場合、flex items に対する余白スペース（fragmentation context のブロックフロー方向において）は、前のページ上の flex container fragments によって使われたスペースを差し引かれる。もしこの調整の結果として余白スペースが負になる場合は、ゼロにセットされる。
- flex container の最初の fragment がページのトップではなく、ページ上の残りのスペースの中でどの flex items もフィットしない場合、全ての fragment が次のページに移動する。
- flex container の複数行の列が改行した場合、ちょうど複数列の container の各 fragment が独自の列 boxes の行を持つように、各 fragment は flex 行の独自の「スタック」を持つ。
- 先のポイントによって課される items の再調整からさらに、ユーザーエージェントは unfragmented フローに対する flex container の歪みを最小限にすることを努力すべきである。

### 10.1. Sample Flex Fragmentation Algorithm

> This informative section presents a possible fragmentation algorithm for flex containers. Implementors are encouraged to improve on this algorithm and provide feedback to the CSS Working Group.

この informative セクションは flex container に対しての可能な fragmentation アルゴリズムを提示する。実装においてはこのアルゴリズムを改善し、CSS Working Group にフィードバックを与えることが推奨される。

> **EXAMPLE 14**
> This algorithm assumes that pagination always proceeds only in the forward direction; therefore, in the algorithms below, alignment is mostly ignored prior to pagination. Advanced layout engines may be able to honor alignment across fragments.

このアルゴリズムはページネーションが常に前方方向にのみ進んでいくことを仮定する。したがって、下のアルゴリズムにおいては、alignment はページネーションの前にたいてい無視される。高度なレイアウトエンジンは fragments にまたがって alignment を履行することができるかもしれない。

> **single-line column flex container**
>
> 1. Run the flex layout algorithm (without regards to pagination) through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing).
> 2. Lay out as many consecutive flex items or item fragments as possible (but at least one or a fragment thereof), starting from the first, until there is no more room on the page or a forced break is encountered.
> 3. If the previous step ran out of room and the free space is positive, the UA may reduce the distributed free space on this page (down to, but not past, zero) in order to make room for the next unbreakable flex item or fragment. Otherwise, the item or fragment that does not fit is pushed to the next page. The UA should pull up if more than 50% of the fragment would have fit in the remaining space and should push otherwise.
> 4. If there are any flex items or fragments not laid out by the previous steps, rerun the flex layout algorithm from [Line Length Determination](https://www.w3.org/TR/css-flexbox-1/#line-sizing) through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing) with the next page’s size and all the contents (including those already laid out), and return to the previous step, but starting from the first item or fragment not already laid out.
> 5. For each fragment of the flex container, continue the flex layout algorithm from [Main-Axis Alignment](https://www.w3.org/TR/css-flexbox-1/#main-alignment) to its finish.

1. [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)を通して、flex レイアウトアルゴリズム（ページネーションに関係なく）を実行する
2. 最初の item から始めてページ上に余白がなくなるか強制的な改行が起こるまで、可能な限り多く（少なくとも 1 つまたは 1 つの fragment）の連続した flex item または item fragments をレイアウトする。
3. もし先のステップで余白が不足し、かつ余白スペースが正の場合、ユーザーエージェントは次の改行できない flex item や fragment のための余白を確保するために、このページの配分された余白スペースを減らすかもしれない（ゼロまで）。ユーザーエージェントはもし fragment の 50%以上が残りのスペースの中でフィットする場合は引き上げ、それ以外の場合は引き下げるべきだろう。
4. もし先のステップによってレイアウトされていない flex items または fragments がある場合、次のページのサイズとすべてのコンテンツ（すでにレイアウトされているものも含む）を使用して、[Line Length Determination](https://www.w3.org/TR/css-flexbox-1/#line-sizing)から[Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)までの flex レイアウトアルゴリズムを再実行して、先のステップに戻り、まだレイアウトされていない最初の item または fragment から始める。
5. flex container の各 fragment に対して、[Main-Axis Alignment](https://www.w3.org/TR/css-flexbox-1/#main-alignment)からその終了までレイアウトアルゴリズムを続ける。

> It is the intent of this algorithm that column-direction single-line flex containers paginate very similarly to block flow. As a test of the intent, a flex container with justify-content:start and no flexible items should paginate identically to a block with in-flow children with same content, same used size and same used margins.

このアルゴリズムの意図は column-direction single-line flex container が、ブロックフローにとても似たページネートを行うということである。その意図のテストとして、`justify-content:start`を持つ flex container で flexible ではない items が、同じコンテンツで同じ使用サイズ、同じマージンの in-flow children を持つブロックが同様にページネートするべきである。

**multi-line column flex container**

> 1. Run the flex layout algorithm with regards to pagination (limiting the flex container’s maximum line length to the space left on the page) through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing).
> 2. Lay out as many flex lines as possible (but at least one) until there is no more room in the flex container in the cross dimension or a forced break is encountered:
> 3. Lay out as many consecutive flex items as possible (but at least one), starting from the first, until there is no more room on the page or a forced break is encountered. Forced breaks within flex items are ignored.
> 4. If this is the first flex container fragment, this line contains only a single flex item that is larger than the space left on the page, and the flex container is not at the top of the page already, move the flex container to the next page and restart flex container layout entirely.
> 5. If there are any flex items not laid out by the first step, rerun the flex layout algorithm from [Main Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#main-sizing) through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing) using only the items not laid out on a previous line, and return to the previous step, starting from the first item not already laid out.
> 6. If there are any flex items not laid out by the previous step, rerun the flex layout algorithm from Line Sizing Determination through [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing) with the next page’s size and only the items not already laid out, and return to the previous step, but starting from the first item not already laid out.
> 7. For each fragment of the flex container, continue the flex layout algorithm from Main-Axis Alignment to its finish.

1. [Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)を通して、ページネーションに考慮しつつ（flex container の最大行数をページの残りスペースに制限する）flex レイアウトアルゴリズムを実行する。
2. cross dimension における flex container 内の余白がなくなるまで、または強制的な改行が発生するまで可能な限り（少なくとも一つ）の flex 行を配置する。
3. 最初の item からページ上に余白スペースがなくなる、または強制的な改行が発生するまで、可能な限りの連続した flex items（少なくとも一つ）を配置する。flex items 内部の強制的な改行は無視される
4. もしこれが最初の flex container fragment の場合で、ページ上に残っているスペースよりも大きい 1 つの flex item のみがこの行に含まれる場合で、かつ flex container がすでにページのトップではない場合、flex container を次のページに移動して flex container レイアウトを全体的に再開する。
5. もし最初のステップによってレイアウトされていない flex items がある場合、先の行でレイアウトされていない items のみを使って、[Main Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#main-sizing)から[Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)までの flex レイアウトアルゴリズムを再実行する。
6. もし先のステップでレイアウトされていない flex items があったら、次のページのサイズとまだレイアウトされていない items を使用して、[Line Length Determination](https://www.w3.org/TR/css-flexbox-1/#line-sizing)から[Cross Sizing Determination](https://www.w3.org/TR/css-flexbox-1/#cross-sizing)までの flex レイアウトアルゴリズムを再実行して、先のステップに戻り、まだレイアウトされていない最初の item から始める。
7. flex container の各 fragment に対して、[Main-Axis Alignment](https://www.w3.org/TR/css-flexbox-1/#main-alignment)からその終了までレイアウトアルゴリズムを続ける。
