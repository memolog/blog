---
title: Flex Layout Algorithm
featured:
  image: sarah-madaio-fpZHGVBzlYk-unsplash
  author: Sarah Madaio
  authorLink: https://unsplash.com/@smadaio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-07-26 11:56:00
excerpt: "今回は9. Flex Layout Algorithmについて。この章は見なくて良いんじゃないかと思いつつ、写経のような感じでやっていこうと思う。"
---

今回は[9. Flex Layout Algorithm](https://www.w3.org/TR/css-flexbox-1/#layout-algorithm)について。この章は見なくて良いんじゃないかと思いつつ、写経のような感じでやっていこうと思う。

> This section contains normative algorithms detailing the exact layout behavior of a flex container and its contents. The algorithms here are written to optimize readability and theoretical simplicity, and may not necessarily be the most efficient. Implementations may use whatever actual algorithms they wish, but must produce the same results as the algorithms described here.
>
> **Note:** This section is mainly intended for implementors. Authors writing web pages should generally be served well by the individual property descriptions, and do not need to read this section unless they have a deep-seated urge to understand arcane details of CSS layout.
>
> The following sections define the algorithm for laying out a flex container and its contents.
>
> **Note:** Flex layout works with the flex items in order-modified document order, not their original document order.

このセクションは flex container およびそのコンテンツの正確なレイアウトの振る舞いについての規範的なアルゴリズムの詳細を含んでいる。ここにあるアルゴリズムは可読性や理論的な簡易さを適切にするために書かれており、最も効率的であるとは限らない。実装にはそれらが望ましいと思う実際のアルゴリズムを何でも利用することができるが、ここに示されているアルゴリズムと同じ結果を出力しなければならない。

このセクションは主に実装者に対して書かれている。WEB ページの制作者には個々のプロパティの記述によって適切に情報提供されているので、
CSS レイアウトの難解な詳細を深く理解したいということがなければ、このセクションを読む必要はない。

次のセクションは flex container とそのコンテンツをレイアウトするためのアルゴリズムを定義する。

flex layout はオリジナルのドキュメント順ではなく、order-modified されたドキュメント順で flex items を操作する。

### 9.1. Initial Setup

> **1. Generate anonymous flex items** as described in [§4 Flex Items](https://www.w3.org/TR/css-flexbox-1/#flex-items).

[§4 Flex Items](https://www.w3.org/TR/css-flexbox-1/#flex-items)で記述したように、**匿名の flex items を生成する**

### 9.2. Line Length Determination

> **2. Determine the available main and cross space for the flex items.** For each dimension, if that dimension of the flex container’s content box is a definite size, use that; if that dimension of the flex container is being sized under a min or max-content constraint, the available space in that dimension is that constraint; otherwise, subtract the flex container’s margin, border, and padding from the space available to the flex container in that dimension and use that value.
>
> This might result in an infinite value.

**2. flex items に対して利用可能な main/cross のスペースを決定する。**それぞれの次元に対して、もし flex container のコンテンツ box の次元が、明確なサイズであるなら、それを利用する。もし flex container の次元が min/max-content の制約下でサイズを指定するなら、その次元における利用可能なスペースはその制約になる。それ以外の場合は、この次元における flex container に対して利用可能なスペースから、flex container のマージン、ボーダー、パディングなどを差し引いたものになる。

結果として値が無限になる場合がある。

> **EXAMPLE 13**
> For example, the available space to a flex item in a floated auto-sized flex container is:
>
> - the width of the flex container’s containing block minus the flex container’s margin, border, and padding in the horizontal dimension
> - infinite in the vertical dimension

たとえば、フロートした auto-sized flex container における flex item の利用可能なスペースは次のようになる。

- flex container の包含ブロックの幅から水平方向の次元の flex container のマージン・ボーダー・パディングをマイナスする
- 縦方向については、無限になる

> **3. Determine the flex base size and hypothetical main size of each item:**

**3. それぞれの item の flex base size と仮想 main size を決定する**

> A. If the item has a definite used flex basis, that’s the flex base size.
> B. If the flex item has ...
>
> - an intrinsic aspect ratio,
> - a used flex basis of content, and
> - a definite cross size,
>   then the flex base size is calculated from its inner cross size and the flex item’s intrinsic aspect ratio.
>
> C. If the used flex basis is content or depends on its available space, and the flex container is being sized under a min-content or max-content constraint (e.g. when performing automatic table layout [CSS21]), size the item under that constraint. The flex base size is the item’s resulting main size.
> D. Otherwise, if the used flex basis is content or depends on its available space, the available main size is infinite, and the flex item’s inline axis is parallel to the main axis, lay the item out using the rules for a box in an orthogonal flow [CSS3-WRITING-MODES]. The flex base size is the item’s max-content main size.
> **Note:** This case occurs, for example, in an English document (horizontal writing mode) containing a column flex container containing a vertical Japanese (vertical writing mode) flex item.
> E. Otherwise, size the item into the available space using its used flex basis in place of its main size, treating a value of content as max-content. If a cross size is needed to determine the main size (e.g. when the flex item’s main size is in its block axis) and the flex item’s cross size is auto and not definite, in this calculation use fit-content as the flex item’s cross size. The flex base size is the item’s resulting main size.
>
> When determining the flex base size, the item’s min and max main sizes are ignored (no clamping occurs). Furthermore, the sizing calculations that floor the content box size at zero when applying box-sizing are also ignored. (For example, an item with a specified size of zero, positive padding, and box-sizing: border-box will have an outer flex base size of zero—and hence a negative inner flex base size.)
>
> The hypothetical main size is the item’s flex base size clamped according to its used min and max main sizes (and flooring the content box size at zero).
>
> Determine the main size of the flex container using the rules of the formatting context in which it participates. For this computation, auto margins on flex items are treated as 0.

A. もし item が明確な flex basis の値があるなら、それが flex base size になる。

B. もし flex item が以下の値を持っていたら...

- intrinsic なアスペクト比
- flex basis の使用値が content
- cross size の明確な値

flex base size は item の内部 cross size と intrinsic なアスペクト比から計算される

C. flex basis の使用値が content であるか利用可能なスペースに依存する場合で、flex container が min/max-content の制約下でサイズを決定する（例えば自動 table レイアウトを実行する）場合、その制約下でサイズを決定する。その flex base size は item の最終的な main size になる。

D. それ以外の場合で、もし flex basis の使用値が content かである利用可能なスペースに依存する場合で、利用可能な main size が無限で flex item の inline axis が main axis と平行である場合、直交するフロー内の box に対するルールを使って item をレイアウトする。flex base size は item の max-content main size になる。

E. それ以外の場合、content の値を max-content の値として扱い、main size の代わりに flex basis を使って利用可能なスペースで item のサイズを決定する。もし cross size が main size を決定するのに必要とされる場合（たとえば、flex item の main size が block axis 内にある場合）で、flex item の cross size が auto で明確ではない場合、flex item の cross size として`fit-content`を使って計算する。flex base size は item の最終的な main size になる。

flex base size が決定したら、item の min/max サイズは無視される（clamping（値の制限）が発生しなくなる）。さらに、box-sizing を適用する場合、content box のサイズをゼロに切り捨てるサイズの計算も無視される（たとえば、ゼロが指定されている item で、正のパディングがあり、かつ`box-sizing: border-box`である場合、outer flex base size がゼロになり、したがって負の inner flex base size になる）。

仮想の main size は、min/max main size の使用値にしたがって制限された、item の flex base size になる（そして content box のサイズはゼロに切り捨てられる）。

flex container の main size は、参加している formatting context のルールを使って決定する。この計算において、flex items の auto マージンは 0 として扱われる。

### 9.3. Main Size Determination

> **5. Collect flex items into flex lines:**
>
> - If the flex container is single-line, collect all the flex items into a single flex line.
> - Otherwise, starting from the first uncollected item, collect consecutive items one by one until the first time that the next collected item would not fit into the flex container’s inner main size (or until a forced break is encountered, see [§10 Fragmenting Flex Layout](https://www.w3.org/TR/css-flexbox-1/#pagination)). If the very first uncollected item wouldn’t fit, collect just it into the line.
>   For this step, the size of a flex item is its outer hypothetical main size. (Note: This can be negative.)
>   Repeat until all flex items have been collected into flex lines.
>   Note that the "collect as many" line will collect zero-sized flex items onto the end of the previous line even if the last non-zero item exactly "filled up" the line.

**5. flex items を flex 行に集める**

- もし flex container が 1 行の場合、すべての flex items を一つの flex 行に集める
- それ以外の場合、最初の未収集の item から始めて、次に収集する item が flex container の inner main size にフィットしなくなるまで（または強制的な break が発生するまで。[§10 Fragmenting Flex Layout](https://www.w3.org/TR/css-flexbox-1/#pagination)を参照）、連続する items を一つずつ集めていく。もし最初の未収集の item がフィットしない場合、それだけを行に集める。
  このステップに対して、flex item のサイズはその仮想の outer main size になる（これは負の値になる可能性がある）
  そしてすべての flex item が flex 行に集められるまで繰り返す。
  この行に「集める」作業は、たとえ最後のゼロではない item が正確に行に「満たされた」場合でも、ゼロサイズの flex items を前の行の最後に集める。

> **6. Resolve the flexible lengths** of all the flex items to find their used main size. See [§9.7 Resolving Flexible Lengths](https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths).

**6.**main size の使用値を見つけるためにすべての flex items について**flexible length を解決する**。[§9.7 Resolving Flexible Lengths](https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths)を参照。

### 9.4. Cross Size Determination

**7.Determine the hypothetical cross size of each item** by performing layout with the used main size and the available space, treating auto as fit-content.

**7.**main size の使用値と利用可能スペースを使ってレイアウトを実行して、auto を`fit-content`として扱い、**各 item の仮想の cross size を決定する**

**8.Calculate the cross size of each flex line.**

> If the flex container is single-line and has a definite cross size, the cross size of the flex line is the flex container’s inner cross size.
>
> Otherwise, for each flex line:
>
> 1. Collect all the flex items whose inline-axis is parallel to the main-axis, whose align-self is baseline, and whose cross-axis margins are both non-auto. Find the largest of the distances between each item’s baseline and its hypothetical outer cross-start edge, and the largest of the distances between each item’s baseline and its hypothetical outer cross-end edge, and sum these two values.
> 2. Among all the items not collected by the previous step, find the largest outer hypothetical cross size.
> 3. The used cross-size of the flex line is the largest of the numbers found in the previous two steps and zero.
>    If the flex container is single-line, then clamp the line’s cross-size to be within the container’s computed min and max cross sizes. Note that if CSS 2.1’s definition of min/max-width/height applied more generally, this behavior would fall out automatically.

もし flex container が単一行で、cross size が明確な値である場合、flex 行の cross size は flex container の inner cross size になる。

それ以外の場合、各 flex 行について以下のようになる。

1. inline-axis が main-axis に対して平行で、align-self が baseline で、cross-axis マージンが両方とも auto ではないすべての flex items を集める。各 item の baseline と仮想 outer cross-start の端との間の距離が一番大きい箇所と、各 item の baseline と仮想 outer cross-end の端との間の距離が一番大きい箇所を見つけて、それらの値を合計する。
2. 先のステップで収集しなかったすべての items の中で、outer の仮想 cross size が一番大きいものを見つける
3. flex 行の cross-size の使用値は、先のステップで見つけた値とゼロの中で一番大きい値になる。
   もし flex container が単一行の場合、行の cross-size は container の min/max cross size の使用値の範囲内に収める。もし min/max-width/height の CSS 2.1 の定義がより広く適用される場合、この振る舞いは自動的に失われることに注意。

> **9. Handle 'align-content: stretch'**. If the flex container has a definite cross size, align-content is stretch, and the sum of the flex lines' cross sizes is less than the flex container’s inner cross size, increase the cross size of each flex line by equal amounts such that the sum of their cross sizes exactly equals the flex container’s inner cross size.

**9. `align-contnet: strech`を対処する**。もし flex container が cross size の明確な値を持っている場合、align-content は stretch となり、flex 行の cross size の合計は flex container の inner cross size よりも小さくなり、cross size の合計が正確に flex container の inner cross size と同じになるように、同じ量だけ各 flex line の cross size を増やす。

> **10. Collapse visibility:collapse items**. If any flex items have visibility: collapse, note the cross size of the line they’re in as the item’s strut size, and restart layout from the beginning.
>
> In this second layout round, when collecting items into lines, treat the collapsed items as having zero main size. For the rest of the algorithm following that step, ignore the collapsed items entirely (as if they were display:none) except that after calculating the cross size of the lines, if any line’s cross size is less than the largest strut size among all the collapsed items in the line, set its cross size to that strut size.
>
> Skip this step in the second layout round.

**10. `visibility:collapse`の items を折りたたむ**。もしいずれかの flex items が`visibility: collapse`を持っている場合、その item の支柱サイズとして、その行の cross size をメモしておき、最初からレイアウトを再開する。

この 2 回目のレイアウトの回で、items を行に集めた時に、折り畳まれた items をゼロの main size を持っているものとして扱う。このステップの後に続く残りのアルゴリズムについて、折り畳まれた items は完全に無視されれ（`display:none`が設定されているかのようになる）。ただし、もし行の cross size が、行内の折り畳まれた item の中で最も大きい支柱サイズよりも小さい場合、その cross size は支柱サイズになる。

2 回目のレイアウトの回ではこのステップをスキップする。

> **11. Determine the used cross size of each flex item.** If a flex item has align-self: stretch, its computed cross size property is auto, and neither of its cross-axis margins are auto, the used outer cross size is the used cross size of its flex line, clamped according to the item’s used min and max cross sizes. Otherwise, the used cross size is the item’s hypothetical cross size.
>
> If the flex item has align-self: stretch, redo layout for its contents, treating this used size as its definite cross size so that percentage-sized children can be resolved.
>
> Note that this step does not affect the main size of the flex item, even if it has an intrinsic aspect ratio.

もし flex item が`align-self: stretch`を持っている場合、その cross size の計算値は auto にあり、cross-axis のマージンはいずれも auto にはならず、outer cross size の使用値は flex 行の cross size の使用値になり、item の min/max cross size の使用値に従って値を固定する。それ以外の場合、cross size の使用値は item の仮想 cross size になる。

もし flex item が`align-self: stretch`を持っている場合、そのコンテンツに対してレイアウトをやり直し、パーセンテージサイズの子供を解決するために、この使用サイズを cross size の固定値として扱う。

このステップは item が intrinsic なアスペクト比を持っている場合でも、flex item の main size には影響を与えないことに注意。

### 9.5. Main-Axis Alignment

> **12. Distribute any remaining free space.** For each flex line:
>
> 1. If the remaining free space is positive and at least one main-axis margin on this line is auto, distribute the free space equally among these margins. Otherwise, set all auto margins to zero.
> 2. Align the items along the main-axis per justify-content.

**12. 残りの余白スペースを配分する** 各 flex 行について以下のようにする。

1. もし残りの余白スペースが正で、この行上の少なくとも一つの main-axis が auto である場合、余白スペースはこれらのマージンに均等に配分される。それ以外の場合、すべての auto マージンはゼロにセットされる。
2. justify-content に従って、main-axis に沿って item を整列する。

### 9.6. Cross-Axis Alignment

> **13. Resolve cross-axis auto margins.** If a flex item has auto cross-axis margins:
>
> - If its outer cross size (treating those auto margins as zero) is less than the cross size of its flex line, distribute the difference in those sizes equally to the auto margins.
> - Otherwise, if the block-start or inline-start margin (whichever is in the cross axis) is auto, set it to zero. Set the opposite margin so that the outer cross size of the item equals the cross size of its flex line.

**13. cross-size auto マージンを解決する** もし flex item が auto cross-axis マージンを持っている場合、以下のようになる。

- もし outer cross size（それらの auto マージンはゼロとして扱われる）が、flex 行の cross size より小さい場合、それらのサイズの差を auto マージンに均等に配分する
- それ以外の場合、もし block-start もしくは inline-start のマージン（cross axis 内のどちらでも）が auto である場合、ゼロにセットされる。item の outer cross size が flex 行の cross size と同じになるように反対のマージンがセットされる。

> **14. Align all flex items along the cross-axis** per align-self, if neither of the item’s cross-axis margins are auto.

**14.** もし item の cross-axis マージンがいずれも auto ではない場合、align-self に従って、**すべての flex items を cross-axis に沿って整列する。**

> **15. Determine the flex container’s used cross size:**
>
> - If the cross size property is a definite size, use that, clamped by the used min and max cross sizes of the flex container.
> - Otherwise, use the sum of the flex lines' cross sizes, clamped by the used min and max cross sizes of the flex container.

**15. flex container の cross size の使用値を決定する**

- もし cross size が固定値である場合、それを使用する。flex container の min/max cross size の使用値によって収められる。
- それ以外の場合、flex 行の cross size の合計を利用する。flex container の min/max cross size の使用値によって収められる。

> **16. Align all flex lines** per align-content.

**16.** align-content に従って**すべての flex 行を整列する**

### 9.7. Resolving Flexible Lengths

> To resolve the flexible lengths of the items within a flex line:

flex 行内で item の flexible length を解決するために、以下のことを行う。

> **1. Determine the used flex factor**. Sum the outer hypothetical main sizes of all items on the line. If the sum is less than the flex container’s inner main size, use the flex grow factor for the rest of this algorithm; otherwise, use the flex shrink factor.

**1. flex factor の使用値を決定する。** 行上のすべての items の outer 仮想 main size を合計する。もし合計が flex container の inner main size よりも小さい場合、このアルゴリズムの残りの部分について flex grow factor を使用する。それ以外の場合、flex shrink factor を使用する。

> **2. Size inflexible items**. Freeze, setting its target main size to its hypothetical main size…
>
> - any item that has a flex factor of zero
> - if using the flex grow factor: any item that has a flex base size greater than its hypothetical main size
> - if using the flex shrink factor: any item that has a flex base size smaller than its hypothetical main size

**2. inflexible items のサイズを決める。** ターゲットの main size を仮想 main size に設定して固定する

- flex factor がゼロである item
- もし flex grow factor を使用してる場合、flex base size が仮想 main size より大きい item
- もし flex shrink factor を使用してる場合、flex base size が仮想 main size より小さい item

> **3. Calculate initial free space**. Sum the outer sizes of all items on the line, and subtract this from the flex container’s inner main size. For frozen items, use their outer target main size; for other items, use their outer flex base size.

**3. 余白スペースの初期値を計算する。** 行上のすべての items の outer sizes を合計して、これを flex container の inner main size から引く。固定した items については、それらの outer target main size を使用する。それ以外の items には、それらの outer flex base size を使用する。

> **4.** Loop:
> a. Check for flexible items. If all the flex items on the line are frozen, free space has been distributed; exit this loop.
> b. Calculate the remaining free space as for initial free space, above. If the sum of the unfrozen flex items’ flex factors is less than one, multiply the initial free space by this sum. If the magnitude of this value is less than the magnitude of the remaining free space, use this as the remaining free space.
> c. Distribute free space proportional to the flex factors.
> **If the remaining free space is zero**
> Do nothing.
> **If using the flex grow factor**
> Find the ratio of the item’s flex grow factor to the sum of the flex grow factors of all unfrozen items on the line. Set the item’s target main size to its flex base size plus a fraction of the remaining free space proportional to the ratio.
> **If using the flex shrink factor**
> For every unfrozen item on the line, multiply its flex shrink factor by its inner flex base size, and note this as its scaled flex shrink factor. Find the ratio of the item’s scaled flex shrink factor to the sum of the scaled flex shrink factors of all unfrozen items on the line. Set the item’s target main size to its flex base size minus a fraction of the absolute value of the remaining free space proportional to the ratio. Note this may result in a negative inner main size; it will be corrected in the next step.
> **Otherwise**
> Do nothing.
> d. **Fix min/max violations**. Clamp each non-frozen item’s target main size by its used min and max main sizes and floor its content-box size at zero. If the item’s target main size was made smaller by this, it’s a max violation. If the item’s target main size was made larger by this, it’s a min violation.
> e. **Freeze over-flexed items.** The total violation is the sum of the adjustments from the previous step ∑(clamped size - unclamped size). If the total violation is:
> **Zero**
> Freeze all items.
> **Positive**
> Freeze all the items with min violations.
> **Negative**
> Freeze all the items with max violations.
> f. Return to the start of this loop.

**4.** Loop:

a. **flexible items を確認する**。もし行上のすべての flex items が固定であるなら、余白スペースは配分されている。ループを終了する。
b. 上述の余白スペースの初期処理と同じように**残りの余白スペースを計算する**。もし固定化されていない flex items の flex factors の合計が 1 よりも低い場合、この合計値で初期の余白スペースを乗算する。もしこの値の大きさが残りの余白スペースの大きさよりも小さい場合、この値を残り余白スペースとして使用する。
c. **flex factors に応じて余白スペースの配分する。**

- 残りの余白スペースがゼロだったら
  何もしない
- flex grow factor を使用している場合
  行上のすべての固定化されていない items の flex grow factors の合計に対する、その item の flex grow factor の割合を調べる。item の target main size を flex base size に、その割合に比例した残り余白スペースの割合をプラスした値に設定する。
- flex shrink factor を使用している場合
  行上のすべての固定化されていない item に対して、item の flex shrink factor にその inner flex base size を乗算して、この値を scaled flex shrink factor としてメモする。行上のすべての固定化されていない item の flex shrink factor の合計に対する、item の scaled flex shrink factor の割合を調べる。item の target main size に、flex base size にその割合に比例した残り余白スペースの絶対値の割合をマイナスした値を設定する。これは次のステップで修正される。
- その他の場合
  何もしない
  d. **min/max 違反を修正する。**各固定されていない item の target main size を min/max main size の使用値内に収め、content-box のサイズを 0 に切り捨てる。もし item の target main size がこれによって小さくなる場合は、max 違反となる。もし item の target main size がこれより大きくなる場合は、それは min 違反となる。
  e. **over-flexed item を固定する**違反の総計は、先のステップからの調整値の合計（∑(clamped size - unclamped size)）になる。もし違反の総計が
- ゼロの場合、すべて固定にする
- 正の場合、min 違反にて、すべての item を固定する
- 負の場合、max 違反にて、すべての item を固定する
  f. このループの最初に戻る

> **5.** Set each item’s used main size to its target main size.

各 item の main size の使用値を、item の target main size に設定する

### 9.8. Definite and Indefinite Sizes

> Although CSS Sizing [[CSS-SIZING-3](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)] defines definite and indefinite lengths, Flexbox has several additional cases where a length can be considered definite:
>
> 1. If a single-line flex container has a definite cross size, the outer cross size of any stretched flex items is the flex container’s inner cross size (clamped to the flex item’s min and max cross size) and is considered definite.
> 2. If the flex container has a definite main size, a flex item’s post-flexing main size is treated as definite, even though it can rely on the indefinite sizes of any flex items in the same line.
> 3. Once the cross size of a flex line has been determined, items in auto-sized flex containers are also considered definite for the purpose of layout; see [step 11](https://www.w3.org/TR/css-flexbox-1/#algo-stretch).
>
> **Note:** The main size of a fully inflexible item with a definite flex basis is, by definition, definite.

CSS Sizing [[CSS-SIZING-3](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)] が[明確](https://www.w3.org/TR/css-sizing-3/#definite)・[不明確](https://www.w3.org/TR/css-sizing-3/#indefinite)な長さについて定義しているが、flexbox でも長さが明確であると見なされる追加のケースがある。

1. もし単一行の flex container が明確な cross size を持っている場合、伸長した flex items の outer cross size は flex container の inner cross size（flex item の min/max cross size に収まる）となり、明確であると見なされる。
2. もし flex container が明確な main size を持っている場合、たとえそれが同じ行にある flex item の不明確なサイズに依存していても、flex item の post-flexing main size は明確なサイズとして扱われる。
3. ひとたび flex line の cross size が決定されたら、auto-sized flex containers 内の items はレイアウト目的で明確なサイズと見なされる。[step 11](https://www.w3.org/TR/css-flexbox-1/#algo-stretch)参照。

**注** 不明確な flex basis を持つ完全に inflexible な item の main size は、定義により、明確なサイズとなる。

### 9.9. Intrinsic Sizes

> The [intrinsic sizing](https://www.w3.org/TR/css-sizing-3/#intrinsic-sizing) of a flex container is used to produce various types of content-based automatic sizing, such as shrink-to-fit logical widths (which use the fit-content formula) and content-based logical heights (which use the max-content size).
>
> See [[CSS-SIZING-3]](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3) for a definition of the terms in this section.

flex cotainer の[intrinsic sizing](https://www.w3.org/TR/css-sizing-3/#intrinsic-sizing)は、shrink-to-fit logical width （これは fit-content の式で使う）や content-based logical height（max-content サイズで使う）などのように、様々なタイプの content-based 自動サイズを生成するために使われる。

このセクションの用語の定義については[[CSS-SIZING-3]](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)を参照。

#### 9.9.1. Flex Container Intrinsic Main Sizes

> The max-content main size of a flex container is the smallest size the flex container can take while maintaining the max-content contributions of its flex items, insofar as allowed by the items’ own flexibility:

flex container の max-content の main size は、flex items の max-content の配分を維持しながら、flex container が取りうる最小サイズになる。

> 1. For each flex item, subtract its outer flex base size from its max-content contribution size. If that result is positive, divide by its flex grow factor floored at 1; if negative, divide by its scaled flex shrink factor having floored the flex shrink factor at 1. This is the item’s max-content flex fraction.
> 2. Place all flex items into lines of infinite length.
> 3. Within each line, find the largest max-content flex fraction among all the flex items. Add each item’s flex base size to the product of its flex grow factor (or scaled flex shrink factor, if the chosen max-content flex fraction was negative) and the chosen max-content flex fraction, then clamp that result by the max main size floored by the min main size.
> 4. The flex container’s max-content size is the largest sum of the afore-calculated sizes of all items within a single line.

1. 各 flex item について、その max-content 配分サイズから、outer flex base size を引く。もし結果が正であれば、flex grow factor を 1 で切り捨てた値で除算する。もし結果が負であれば、flex shrink factor を 1 で切り捨てた、スケールされた flex shrink factor で除算する。これは item の max-content flex fraction になる。
2. すべての flex items を不定の長さの行に配置する。
3. 各行の中で、flex items の中で一番大きい max-content flex fraction を探す。各 item の flex base size に flex grow factor（もしくはもし選択した max-content flex fraction が負の場合、スケールされた flex factor）と選択した max-content flex fraction との積を追加して、min main size で切り捨てられた max main size によって結果を制限する。
4. flex container の max-content size は、単一行内のすべての items の先に計算したサイズの合計の一番大きな値になる。

> The min-content main size of a single-line flex container is calculated identically to the max-content main size, except that the flex item’s min-content contribution is used instead of its max-content contribution. However, for a multi-line container, it is simply the largest min-content contribution of all the flex items in the flex container.

単一行の flex container の min-content size は、flex item の min-content の配分が、その max-content の配分の代わりにつかわれている場合は除いて、max-content main size と同じように計算される。しかしながら、複数行の container に対しては、単に flex container 内のすべての flex items の min-content の配分のうち、一番大きな値になる。

> **Implications of this algorithm when the sum of flex is less than 1**
> The above algorithm is designed to give the correct behavior for two cases in particular, and make the flex container’s size continuous as you transition between the two:
>
> 1. If all items are inflexible, the flex container is sized to the sum of their flex base size. (An inflexible flex base size basically substitutes for a width/height, which, when specified, is what a max-content contribution is based on in Block Layout.)
> 2. When all items are flexible with flex factors ≥ 1, the flex container is sized to the sum of the max-content contributions of its items (or perhaps a slightly larger size, so that every flex item is at least the size of its max-content contribution, but also has the correct ratio of its size to the size of the other items, as determined by its flexibility).
>
> For example, if a flex container has a single flex item with flex-basis: 100px; but a max-content size of 200px, then when the item is flex-grow: 0, the flex container (and flex item) is 100px wide, but when the item is flex-grow: 1 or higher, the flex container (and flex item) is 200px wide.
>
> There are several possible ways to make the overall behavior continuous between these two cases, particularly when the sum of flexibilities on a line is between 0 and 1, but all of them have drawbacks. We chose one we feel has the least bad implications; unfortunately, it "double-applies" the flexibility when the sum of the flexibilities is less than 1. In the above example, if the item has flex-grow: .5, then the flex container ends up 150px wide, but the item then sizes normally into that available space, ending up 125px wide.

**flex の合計が 1 未満の場合のアルゴリズムの実装**
上述のアルゴリズムは特に 2 つのケースに対して正しい振る舞いを与えるために設計されており、flex container のサイズを 2 つのケース間で連続的な移行を可能にする。

1. すべての items が柔軟ではない場合、flex container は flex base size の合計値になる。（inflexible な flex base size は基本的に width/height、つまり指定されると max-content の配分がブロックレイアウトにおいて基本になるもの、の代わりに使用される。）
2. すべての items が柔軟であり、flex factors が 1 以上の場合、flex container はその items の max-content の配分の合計になる（もしくはどの flex item も少なくとも max-content の配分のサイズになるだけはなく、その柔軟性によって決定されるように、item のサイズと他の item のサイズの比率が正しくあるためにおそらく少しだけ大きなサイズになる）。

たどえば、もし flex container が`flex-basis: 100px`を持ち、200px の max-content サイズを持つ単一の flex item を持つ場合、item が`flex-grow: 0`なら、flex container（と flex item）は 100px の幅になる。しかし item が`flex-grow: 1`もしくはそれ以上の場合、flex container（と flex item）は 200px の幅になる。

これらの二つのケースの間の全体の振る舞いを継続的にするためにはいくつかの方法があり、特に行上の flexibilities の合計が 0 から 1 の間の場合あるが、それらの全てについて欠点がある。私たちはそのうち一番悪くない実装であると感じるものを選んだ。残念ながら、、それは flexibilities の合計が 1 より小さい場合、flexibilities を「重複適用」する。上記の例では、もし item が`flex-grow: .5`の場合、flex container は 150px の幅になるが、item は通常利用可能なスペースに収まるので、item の幅は 125px になる。

### 9.9.2. Flex Container Intrinsic Cross Sizes

> The min-content/max-content cross size of a single-line flex container is the largest min-content contribution/max-content contribution (respectively) of its flex items.

単一行 flex container の min-content/max-content の cross size は、flex items の（それぞれの）min-content の配分/max-content の配分になる。

> For a multi-line flex container, the min-content/max-content cross size is the sum of the flex line cross sizes resulting from sizing the flex container under a cross-axis min-content constraint/max-content constraint (respectively). However, if the flex container is flex-flow: column wrap;, then it’s sized by first finding the largest min-content/max-content cross-size contribution among the flex items (respectively), then using that size as the available space in the cross axis for each of the flex items during layout.

複数行の flex container では、min-content/max-content cross size は（それぞれの）cross-axis min-content 制約/max-content 制約の下、flex container をサイズ設定することによって得られる flex 行の cross size の合計になる。しかしながら、もし flex container が`flex-flow: column wrap;` である場合、最初に（それぞれの）flex items の中の min-content/max-content の cross-size の配分の大きい値を見つけてサイズを設定し、そのサイズをレイアウト中にそれぞれの flex items に対して cross size の余白スペースとして利用する。

> **Note:** This heuristic for column wrap flex containers gives a reasonable approximation of the size that the flex container should be, with each flex item ending up as min(item’s own max-content, maximum min-content among all items), and each flex line no larger than its largest flex item. It’s not a perfect fit in some cases, but doing it completely correct is insanely expensive, and this works reasonably well.

`column wrap`の flex container についてのヒューリスティックは、各 flex item が最小（item 自身の max-content, 全 item の中の最大 min-content）であり、各 flex 行が最も大きい flex item よりも大きくないような flex container になるようにサイズの妥当な概算を提供する。それはいくつかのケースでは完全には適合しないかもしれないが、完全に正しく行うことは非常に高コストであり、この方法が良い感じに機能する。

### 9.9.3. Flex Item Intrinsic Size Contributions

> The main-size min-content contribution of a flex item is the larger of its outer min-content size and outer [preferred size](https://www.w3.org/TR/css-sizing-3/#preferred-size-properties) (its width/height as appropriate) if that is not auto, clamped by its flex base size as a maximum (if it is not growable) and/or as a minimum (if it is not shrinkable), and then further clamped by its min/max main size.

flex item の main-size min-content の配分は、auto でない場合、outer min-content size と outer [preferred size](https://www.w3.org/TR/css-sizing-3/#preferred-size-properties)（必要に応じて width や height）の大きい方になり、flex base size を最大値（growable の場合）and/or 最小値（shrinkable の場合）として制限し、それから min/max main size によってさらに制限される。

> The main-size max-content contribution of a flex item is the larger of its outer max-content size and outer preferred size (its width/height as appropriate) clamped by its flex base size as a maximum (if it is not growable) and/or as a minimum (if it is not shrinkable), and then further clamped by its min/max main size.

flex item の main-size max-content の配分は、outer max-content size と outer preferred size（必要に応じて width や height）の大きい方になり、flex base size を最大値（growable の場合）and/or 最小値（shrinkable の場合）として制限し、それから min/max main size によってさらに制限される。
