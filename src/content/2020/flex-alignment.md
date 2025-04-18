---
title: Flex Alignment
featured:
  image: 600484slsdl.webp
  author: William James Glackens
  authorLink: https://artvee.com/dl/red-basket-of-zinnias/
date: 2020-07-18 11:52:00
excerpt: "今回は8. Alignmentについて。長いけど一気に。"
---

今回は[8. Alignment](https://www.w3.org/TR/css-flexbox-1/#alignment)について。長いけど一気に。

> After a flex container’s contents have finished their flexing and the dimensions of all flex items are finalized, they can then be aligned within the flex container.
>
> The margin properties can be used to align items in a manner similar to, but more powerful than, what margins can do in block layout. Flex items also respect the alignment properties from CSS Box Alignment, which allow easy keyword-based alignment of items in both the main axis and cross axis. These properties make many common types of alignment trivial, including some things that were very difficult in CSS 2.1, like horizontal and vertical centering.

flex container のコンテンツが flexing を完了して、すべての flex items の寸法が確定したら、flex container の中で整列できるようになる。

マージンを使うことで、マージンがブロックレイアウトでするのと同じような手法で、しかしよりパワフルに items を整列することができる。Flex items は、main axis 内と cross axis 内の items でキーワードベースの整列を簡単にできるようにするために、[CSS Box Alignment](https://www.w3.org/TR/css3-align/)からの alignment プロパティにも配慮する。これらのプロパティにより多くのよくあるタイプの alignment を簡単にできるようにする。これには CSS 2.1 ではとても難しかった水平と垂直方向の真ん中揃えなどが含まれる。

> **Note:** While the alignment properties are defined in [CSS Box Alignment](https://www.w3.org/TR/css3-align/) [[CSS-ALIGN-3]](https://www.w3.org/TR/css-flexbox-1/#biblio-css-align-3), Flexible Box Layout reproduces the definitions of the relevant ones here so as to not create a normative dependency that may slow down advancement of the spec. These properties apply only to flex layout until CSS Box Alignment Level 3 is finished and defines their effect for other layout modes. Additionally, any new values defined in the Box Alignment module will apply to Flexible Box Layout; in otherwords, the Box Alignment module, once completed, will supercede the definitions here.

alignment のプロパティは[CSS Box Alignment](https://www.w3.org/TR/css3-align/)で定義されている一方、Flexible Box Layout では、仕様の進展が遅くなるかもしれない標準的な依存関係を作らないように、関連する定義をここに複製している。これらのプロパティは CSS Box Alignment Level 3 が完成して、他のレイアウトモードに対する効果が定義されるまで、flex レイアウトにのみ適用される。さらに、Box Alignment モジュールで定義されているどの新しい値についても、Flexible Box Layout に適用されるだろう。一方、Box Alignment モジュールは、ひとたび完了したら、ここでの定義よりも優先される。

### 8.1. Aligning with auto margins

> This section is non-normative. The normative definition of how margins affect flex items is in the [Flex Layout Algorithm](https://www.w3.org/TR/css-flexbox-1/#layout-algorithm) section.

このセクションは非規範的である。マージンが flex items にどのように影響を与えるかについての規範的な定義は[Flex Layout Algorithm](https://www.w3.org/TR/css-flexbox-1/#layout-algorithm)のセクションの中にある。

> Auto margins on flex items have an effect very similar to auto margins in block flow:

flex items におけ auto マージンは、ブロックフローにおける auto マージンととても似ている。

> - During calculations of flex bases and flexible lengths, auto margins are treated as 0.
> - Prior to alignment via justify-content and align-self, any positive free space is distributed to auto margins in that dimension.
> - Overflowing boxes ignore their auto margins and overflow in the end direction.

- flex basis と flexible length の計算中は、auto マージンは 0 として扱われる
- `justify-content`と`align-self`経由での alignment が優先され、いずれの正の余白スペースもその次元の中の auto マージンに配分される。
- boxes のオーバーフローの処理は auto マージンを無視して、end 方向に対してオーバーフローする。

> **Note:** If free space is distributed to auto margins, the alignment properties will have no effect in that dimension because the margins will have stolen all the free space left over after flexing.

もし余白スペースが auto マージンに配分された場合、マージンは flexing した後に残っている余白スペースをすべて奪ってしまうから、その次元における alignment プロパティは効果を持たなくなる。

> **EXAMPLE 11**
> One use of auto margins in the main axis is to separate flex items into distinct "groups". The following example shows how to use this to reproduce a common UI pattern - a single bar of actions with some aligned on the left and others aligned on the right.
> <img src="/assets/images/screen_flex_alignment_example_11.png" />

main axis における auto マージンの一つの使い方は、flex items を個別の「グループ」に分離することである。次の例はこのことを一般的な UI パターン（いくつかのアクションを左側に配置して、残りをを右側に配置するバー）を再現するのにどのように利用するかを示したものである。

```css
nav > ul {
  display: flex;
}
nav > ul > #login {
  margin-left: auto;
}
```

```html
<nav>
  <ul>
    <li><a href=/about>About</a>
    <li><a href=/projects>Projects</a>
    <li><a href=/interact>Interact</a>
    <li id="login"><a href=/login>Login</a>
  </ul>
</nav>
```

> **EXAMPLE 12**
> The figure below illustrates the difference in cross-axis alignment in overflow situations between using auto margins and using the [alignment properties](https://www.w3.org/TR/css-flexbox-1/#propdef-align-items).

下の図はオーバーフローを起こしてる状況での cross-axis の alignment について、auto マージンを利用することと[alignment プロパティ](https://www.w3.org/TR/css-flexbox-1/#propdef-align-items)を利用することの違いを示したものである。

> <img src="/assets/images/screen_flex_alignment_example_12.png" width="400" />
>
> **Figure 9**
> The items in the figure on the left are centered with margins, while those in the figure on the right are centered with `align-self`. If this column flex container was placed against the left edge of the page, the margin behavior would be more desirable, as the long item would be fully readable. In other circumstances, the true centering behavior might be better.

左側の図の items はマージンによって中央揃えとなっている。右側の図の items は`align-self`によって中央揃えとなっている。もしこの列の flex container がページの左端に対して配置されていた場合、長い item が完全に読める状態になり、マージンの振る舞いはもっと期待通りになる。他の状況では、中央揃えの振る舞いはより良いかもしれない。

### 8.2. Axis Alignment: the justify-content property

| key             | value                                                                             |
| --------------- | --------------------------------------------------------------------------------- |
| Name            | justify-content                                                                   |
| Value           | flex-start &#124; flex-end &#124; center &#124; space-between &#124; space-around |
| Initial         | flex-start                                                                        |
| Applies to      | flex containers                                                                   |
| Inherited       | no                                                                                |
| Percentages     | n/a                                                                               |
| Computed value  | specified keyword                                                                 |
| Canonical order | per grammar                                                                       |
| Animation type  | discrete                                                                          |

> The justify-content property aligns flex items along the main axis of the current line of the flex container. This is done after any flexible lengths and any auto margins have been resolved. Typically it helps distribute extra free space leftover when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.

`justify-content`プロパティは flex items を flex container の現在の行の main axis に沿って整列させる。これは flexible length と auto マージンがすべて解決した後に行われる。たいていの場合それは、行にあるすべての flex items が inflexible、または flexible だがそれの最大サイズに達しているような場合に、残った余白スペースを配分するのに役に立つ。また、それは items が行をオーバーフローする場合に、items の整列に対してある程度の制御を働かせる。

**flex-start**

> Flex items are packed toward the start of the line. The main-start margin edge of the first flex item on the line is placed flush with the main-start edge of the line, and each subsequent flex item is placed flush with the preceding item.

flex items は行の先頭に向かって詰められる。行上の最初の flex item の main-start のマージンの端は、行の main-start の端と同じところから配置され、後続の flex item はその前の item と同じように配置される。

**flex-end**

> Flex items are packed toward the end of the line. The main-end margin edge of the last flex item is placed flush with the main-end edge of the line, and each preceding flex item is placed flush with the subsequent item.

flex items は行の最後に向かって積められる。最後の flex item の main-end マージンの端は、行の main-end の端と同じところから配置され、一つ前の flex item は後続の item と同じように配置される。

**center**

> Flex items are packed toward the center of the line. The flex items on the line are placed flush with each other and aligned in the center of the line, with equal amounts of space between the main-start edge of the line and the first item on the line and between the main-end edge of the line and the last item on the line. (If the leftover free-space is negative, the flex items will overflow equally in both directions.)

flex items は行の中央に向かって詰められる。行上の flex items は、それぞれが同一平面上に配置され、行の main-start の端と行の最初の item との間と、行の main-edge の端と行の最後の item との間に、同じ量のスペースを持ちつつ、行の中央に沿って整列する。（もし残りの余白が負の場合、flex items は両方の方向に対して同じ量だけオバーフローする）

**space-between**

> Flex items are evenly distributed in the line. If the leftover free-space is negative or there is only a single flex item on the line, this value is identical to flex-start. Otherwise, the main-start margin edge of the first flex item on the line is placed flush with the main-start edge of the line, the main-end margin edge of the last flex item on the line is placed flush with the main-end edge of the line, and the remaining flex items on the line are distributed so that the spacing between any two adjacent items is the same.

flex items は行内に等間隔で配置される。残りの余白スペースが負であるか、行上に一つの flex item しかない場合、この値は flex-start と同じになる。それ以外では、行上の最初の flex item の main-start マージンの端は、行の main-start の端から配置され、行上の最後の flex item の main-edge マージンの端が行の main-end の端の方から配置され、行上の残りの flex items は、隣り合う item のスペースが同じになるように配分される。

**space-around**

> Flex items are evenly distributed in the line, with half-size spaces on either end. If the leftover free-space is negative or there is only a single flex item on the line, this value is identical to center. Otherwise, the flex items on the line are distributed such that the spacing between any two adjacent flex items on the line is the same, and the spacing between the first/last flex items and the flex container edges is half the size of the spacing between flex items.

flex items は行内に等間隔で配分され、両橋に半分のサイズのスペースが設けられる。残りの余白スペースが負であるか、行上に一つの flex item しかない場合は、この値は center と同じになる。それ以外では、行上の flex items は、隣り合う flex items の間のスペースが同じで、かつ最初と最後の flex items と flex container の端の間が flex items の間のスペースのサイズの半分になるように配分される。

<img src="https://www.w3.org/TR/css-flexbox-1/images/flex-pack.svg" />

上の図は`justify-content`の 5 つのキーワードについて、flex container 上の効果を 3 つの色付き item を使って図示したもの。

### 8.3. Cross-axis Alignment: the align-items and align-self properties

| key             | value                                                                   |
| --------------- | ----------------------------------------------------------------------- |
| Name            | align-items                                                             |
| Value           | flex-start &#124; flex-end &#124; center &#124; baseline &#124; stretch |
| Initial         | stretch                                                                 |
| Applies to      | flex containers                                                         |
| Inherited       | no                                                                      |
| Percentages     | n/a                                                                     |
| Computed value  | specified keyword                                                       |
| Canonical order | per grammar                                                             |
| Animation type  | discrete                                                                |

<br>

| key             | value                                                                               |
| --------------- | ----------------------------------------------------------------------------------- |
| Name            | align-self                                                                          |
| Value           | auto &#124; flex-start &#124; flex-end &#124; center &#124; baseline &#124; stretch |
| Initial         | auto                                                                                |
| Applies to      | flex items                                                                          |
| Inherited       | no                                                                                  |
| Percentages     | n/a                                                                                 |
| Computed value  | specified keyword                                                                   |
| Canonical order | per grammar                                                                         |
| Animation type  | discrete                                                                            |
| Flex item       | discrete                                                                            |

> Flex items can be aligned in the cross axis of the current line of the flex container, similar to justify-content but in the perpendicular direction. align-items sets the default alignment for all of the flex container’s items, including anonymous flex items. align-self allows this default alignment to be overridden for individual flex items. (For anonymous flex items, align-self always matches the value of align-items on their associated flex container.)
>
> If either of the flex item’s cross-axis margins are auto, align-self has no effect.

flex items は flex container の現在の行の cross axis 方向に対して整列することができる。`justify-content`と同様であるが、直交方向に対して適用される。`align-items`は flex container の匿名 item を含めたすべての items に対して、デフォルトの alignment を設定する。`align-self`は個々の flex items についてデフォルトの alignment を上書きすることができる。（匿名の flex items に対しては、align-self は常に関連する flex container 上の align-items の値と一致する）

もし flex item の cross-axis のマージンのいずれかが auto である場合、align-self は効果を持たない。

> Values have the following meanings:

**auto**

> Defers cross-axis alignment control to the value of align-items on the parent box. (This is the initial value of align-self.)

cross-axis alignment の制御を親の box 上の align-items の値に委ねる。（これは align-self の初期値）

**flex-start**

> The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line.

flex item の cross-start マージンの端は、行の cross-start の端と同じところから配置される。

**flex-end**

> The cross-end margin edge of the flex item is placed flush with the cross-end edge of the line.

flex item の cross-end マージンの端は、行の cross-end の端と同じところから配置される。

**center**

> The flex item’s margin box is centered in the cross axis within the line. (If the cross size of the flex line is less than that of the flex item, it will overflow equally in both directions.)

flex item のマージン box は、行内の cross axis に対して中央揃えとなる。（もし flex 行の cross size が flex item のそれより小さい場合、両方の方向に対して均等にオーバーフローする）

**baseline**

> The flex item participates in baseline alignment: all participating flex items on the line are aligned such that their baselines align, and the item with the largest distance between its baseline and its cross-start margin edge is placed flush against the cross-start edge of the line. If the item does not have a baseline in the necessary axis, then one is [synthesized](https://www.w3.org/TR/css3-align/#synthesize-baseline) from the flex item’s border box.

flex item は baseline alignment に参加する。行上のすべての参加 flex items はそれらの baseline が揃うように整列し、baseline と cross-start マージンの端との間の距離が一番大きな item は、行の cross-start の端と同じところから配置される。もし item が必要な axis に対して baseline を持っていない場合、baseline は flex item の border box から[合成](https://www.w3.org/TR/css3-align/#synthesize-baseline)される。

**stretch**

> If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched. Its used value is the length necessary to make the cross size of the item’s margin box as close to the same size as the line as possible, while still respecting the constraints imposed by min-height/min-width/max-height/max-width.
>
> **Note:** If the flex container’s height is constrained this value may cause the contents of the flex item to overflow the item.
>
> The cross-start margin edge of the flex item is placed flush with the cross-start edge of the line.

もし flex item の cross size プロパティが auto となり、cross-axis の両方のマージンがどちらも auto ではない場合、flex item は伸長する。その使用値は、
min-height/min-width/max-height/max-width によって課される制約を守りつつ、item のマージン box の cross size が、行と可能な限り同じサイズに近づくのに必要な長さになる。

もし flex container の高さが制限されている場合、この値によって flex item のコンテンツがオバーフローするかもしれない。

flex item の cross-start マージンの端は、行の cross-start の端と同じところに配置される。

<img src="https://www.w3.org/TR/css-flexbox-1/images/flex-align.svg" />

### 8.4. Packing Flex Lines: the align-content property

| key             | value                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------ |
| Name            | align-content                                                                                    |
| Value           | flex-start &#124; flex-end &#124; center &#124; space-between &#124; space-around &#124; stretch |
| Initial         | stretch                                                                                          |
| Applies to      | multi-line flex containers                                                                       |
| Inherited       | no                                                                                               |
| Percentages     | n/a                                                                                              |
| Computed value  | specified keyword                                                                                |
| Canonical order | per grammar                                                                                      |
| Animation type  | discrete                                                                                         |

> The align-content property aligns a flex container’s lines within the flex container when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis. Note, this property has no effect on a [single-line](https://www.w3.org/TR/css-flexbox-1/#single-line-flex-container) flex container. Values have the following meanings:

`align-content`プロパティは、`justify-content`が main-axis 内で個々の items を整列するのと同じように、cross-axis に対して余分なスペースがある場合に flex container 内で flex container の行を整列する。このプロパティは[1 行だけの flex container](https://www.w3.org/TR/css-flexbox-1/#single-line-flex-container)においては効果を持たない。

**flex-start**

> Lines are packed toward the start of the flex container. The cross-start edge of the first line in the flex container is placed flush with the cross-start edge of the flex container, and each subsequent line is placed flush with the preceding line.

行は flex container の start 方向に詰められる。flex container 内の最初の行の cross-start の端は、flex container の cross-start の端と同じところに配置され、後続の行はその前の行に続いて配置される。

**flex-end**

> Lines are packed toward the end of the flex container. The cross-end edge of the last line is placed flush with the cross-end edge of the flex container, and each preceding line is placed flush with the subsequent line.

行は flex container の end 方向から詰められる。最後の行の cross-end の端は flex container の cross-end の端と同じところに配置され、前の行は、後続の行に続いて配置される。

**center**

> Lines are packed toward the center of the flex container. The lines in the flex container are placed flush with each other and aligned in the center of the flex container, with equal amounts of space between the cross-start content edge of the flex container and the first line in the flex container, and between the cross-end content edge of the flex container and the last line in the flex container. (If the leftover free-space is negative, the lines will overflow equally in both directions.)

行は flex container の中央から詰められる。flex container の行は、それぞれ同一平面上に配置され、flex container の真ん中で整列する。flex container の cross-start content の端と flex container 内の最初の行との間と、flex container の cross-end content の端と flex container 内の最後の行との間のスペースは同じになる。（もし残りの余白スペースが負の場合、行は両方の方向に対して均等にオーバーフローする）

**space-between**

> Lines are evenly distributed in the flex container. If the leftover free-space is negative or there is only a single flex line in the flex container, this value is identical to flex-start. Otherwise, the cross-start edge of the first line in the flex container is placed flush with the cross-start content edge of the flex container, the cross-end edge of the last line in the flex container is placed flush with the cross-end content edge of the flex container, and the remaining lines in the flex container are distributed so that the spacing between any two adjacent lines is the same.

行は flex container 内で均等に配分さえる。もし残りの余白スペースが負であるか、flex container 内に flex 行が一つだけの場合、この値は flex-start と同じになる。それ以外の場合、flex container 内の最初の行の cross-start の端は flex container の cross-start content の端と同じところになり、flex container 内の最後の行の cross-end の端は flex container の cross-end content の端と同じところになる。そして flex container 内の残りの行は隣り合う行の間隔が同じになるように配分される。

**space-around**

> Lines are evenly distributed in the flex container, with half-size spaces on either end. If the leftover free-space is negative this value is identical to center. Otherwise, the lines in the flex container are distributed such that the spacing between any two adjacent lines is the same, and the spacing between the first/last lines and the flex container edges is half the size of the spacing between flex lines.

行はそれぞれの終端に半分のサイズのスペースを持ちつつ、flex container 内で均等に配分される。もし残りの余白スペースが負である場合、この値は center と同じになる。それ以外の場合では、flex container 内の行は隣り合う行の間隔が同じになるように配分され、最初と最後の行と flex container の端の間が flex の行間の半分のサイズになるようにスペースが持たれる。

**stretch**

> Lines stretch to take up the remaining space. If the leftover free-space is negative, this value is identical to flex-start. Otherwise, the free-space is split equally between all of the lines, increasing their cross size.

行は余白のスペースに応じて伸長する。もし残りの余白スペースが負の場合、この値は flex-start と同じになる。それ以外の場合では、余白スペースはすべての行に対して均等に分割される、行の cross size が増加する。

> **Note:** Only multi-line flex containers ever have free space in the cross-axis for lines to be aligned in, because in a single-line flex container the sole line automatically stretches to fill the space.

単一行の flex container 内の単一行はスペースを満たすように自動的に伸長するので、複数行の flex containers だけが、整列する行に対して cross-axis 内に余白スペースを持つ。

<img src="https://www.w3.org/TR/css-flexbox-1/images/align-content-example.svg" width="500" />

### 8.5. Flex Container Baselines

> In order for a flex container to itself [participate in baseline alignment](https://www.w3.org/TR/css-flexbox-1/#baseline-participation) (e.g. when the flex container is itself a flex item in an outer flex container), it needs to submit the position of the baselines that will best represent its contents. To this end, the baselines of a flex container are determined as follows (after reordering with order, and taking flex-direction into account):

flex container が自身を[baseline alignment に参加する](https://www.w3.org/TR/css-flexbox-1/#baseline-participation)ためには（例えば flex container 自身が、外側の flex container の flex item である場合）、コンテンツを表示するのにベストな baseline の位置を提案する必要がある。このため、flex container の baseline は次のように決定される（order によって並び替えと flex-direction が考慮された後）

> **first/last main-axis baseline set**
>
> 1. When the inline axis of the flex container matches its main axis, its baselines are determined as follows:
>    If any of the flex items on the flex container’s startmost/endmost flex line participate in baseline alignment, the flex container’s first/last main-axis baseline set is [generated](https://www.w3.org/TR/css-align-3/#generate-baselines) from the shared alignment baseline of those flex items.

flex container の inline axis が main axis と一致する場合、baseline は次のように決定される。もし flex container の最初と最後の flex line 上にあるいずれかの flex items が baseline alignment に参加している場合、flex container の最初と最後の main-axis の baseline set は flex items の shared alignment baseline から[生成](https://www.w3.org/TR/css-align-3/#generate-baselines)される。

> 2. Otherwise, if the flex container has at least one flex item, the flex container’s first/last main-axis baseline set is generated from the alignment baseline of the startmost/endmost flex item. (If that item has no alignment baseline parallel to the flex container’s main axis, then one is first synthesized from its border edges.)

それ以外の場合、もし flex container が少なくとも一つの flex item を持っている場合、flex container の最初と最後のの main-axis baseline set は最初と最後の flex item の alignment baseline から生成される。（item が flex container の main axis に対して平行な alignment baseline を持っていない場合、それは border の両端から最初に合成されたものになる。

> 3. Otherwise, the flex container has no first/last main-axis baseline set, and one is synthesized if needed according to the rules of its alignment context.

それ以外の場合、flex container は最初と最後の main-axis baseline set を持たず、必要な場合は alignment context のルールにしたがって合成される。

> **first/last cross-axis baseline set**
> When the inline axis of the flex container matches its cross axis, its baselines are determined as follows:

flex container の inline axis が cross axis と一致する場合、baseline は次のように決定される。

> 1. If the flex container has at least one flex item, the flex container’s first/last cross-axis baseline set is generated from the alignment baseline of the startmost/endmost flex item. (If that item has no alignment baseline parallel to the flex container’s cross axis, then one is first synthesized from its border edges.)

もし flex container が少なくとも一つの flex item を持つ場合、flex container の最初と最後の cross-axis baseline set は最初と最後の flex item の alignment baseline から生成される。（もし item が flex container の cross axis と平行する alignment baseline を持たない場合、border の両端から最初に合成されたものになる。）

> 2. Otherwise, the flex container has no first/last cross-axis baseline set, and one is synthesized if needed according to the rules of its [alignment context](https://www.w3.org/TR/css3-align/#shared-alignment-context).

それ以外の場合、flex container は最初と最後の cross-axis baseline set を持たない。必要になった場合は alignment context のルールに沿って合成される。

> When calculating the baseline according to the above rules, if the box contributing a baseline has an overflow value that allows scrolling, the box must be treated as being in its initial scroll position for the purpose of determining its baseline.

上記のルールにしたがって baseline が計算された場合で、もし baseline を提供された box がスクロールが許可される overflow 値の持っていた場合、baseline を決定するために、box が初期のスクロール位置にいるかのように扱われなければならない。

> When [determining the baseline of a table cell](https://www.w3.org/TR/CSS2/tables.html#height-layout), a flex container provides a baseline just as a line box or table-row does. [CSS21]
>
> See CSS Writing Modes 3 §4.1 Introduction to Baselines and CSS Box Alignment 3 §9 Baseline Alignment Details for more information on baselines.

[table cell の baseline を決定する](https://www.w3.org/TR/CSS2/tables.html#height-layout)場合は、flex container は line box や table-row と同じように baseline を提供する。

baseline についてのより詳細な情報については、[CSS Writing Modes 3 §4.1 Introduction to Baselines](https://www.w3.org/TR/css-writing-modes-3/#intro-baselines)と[CSS Box Alignment 3 §9 Baseline Alignment Details](https://www.w3.org/TR/css3-align/#baseline-rules)を参照。
