---
title: The flex Shorthand
featured:
  image: steve-douglas-80Pr_AfC71Y-unsplash
  author: Steve Douglas
  authorLink: https://unsplash.com/@sldoug?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-06-30 14:09:49
excerpt: "今回は7. Flexibilityについて。"
---

今回は[7. Flexibility](https://www.w3.org/TR/css-flexbox-1/#flexibility)について。

> The defining aspect of flex layout is the ability to make the flex items “flex”, altering their width/height to fill the available space in the main dimension. This is done with the flex property. A flex container distributes free space to its items (proportional to their flex grow factor) to fill the container, or shrinks them (proportional to their flex shrink factor) to prevent overflow.

> A flex item is fully inflexible if both its flex-grow and flex-shrink values are zero, and flexible otherwise.

flex レイアウトの特徴は flex items を「柔軟(flex)」にすることで、横幅・縦幅を main dimension の余白を埋めるように変更することである。これは flex プロパティによってなされる。flex container は container を満たすため余白部分を items に（flex grow factor に応じて）配分するか、オーバーフローしないように（flex shrink factor に応じて）items を収縮する。

flex item は、もし`flex-grow`と`flex-shrink`が両方とも 0 である場合は完全に柔軟ではなくなる。それ以外の場合は柔軟になる。

### 7.1. The flex Shorthand

| key             | value                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------- |
| Name            | flex                                                                                         |
| Value           | none &#124; [ &lt;‘flex-grow’&gt; &lt;‘flex-shrink’&gt;? &#124;&#124; &lt;‘flex-basis’&gt; ] |
| Initial         | 0 1 auto                                                                                     |
| Applies to      | flex items                                                                                   |
| Inherited       | no                                                                                           |
| Percentages     | see individual properties                                                                    |
| Computed value  | see individual properties                                                                    |
| Animation type  | by computed value type                                                                       |
| Canonical order | per grammar                                                                                  |

Value の`none | [ <‘flex-grow’> <‘flex-shrink’>? || <‘flex-basis’> ]`の部分はつまり、`[ none ] | [ [ <‘flex-grow’> <‘flex-shrink’>? ] || [ <‘flex-basis’> ] ]`と同じ内容になる。すなわち、`none`か、または、`flex-grow`、`flex-shrink`、`flex-basis`の 3 つのうち一つが記述される必要がある。`flex-grow`と`flex-shrink`の記述順は固定で、`flex-shrink`を書く場合は必ず`flex-grow`が必要になる。一方、`flex-shrink`は省略可能。また、`flex-grow`と`flex-shrink`の二つと、`flex-basis`の記述は順不同で書ける。

なので、以下の順番で書くことができる。

- `flex-grow`
- `flex-grow flex-shrink`
- `flex-grow flex-shrink flex-basis`
- `flex-grow flex-basis`
- `flex-basis flex-grow flex-shrink`
- `flex-basis flex-grow`
- `flex-basis`

なお、`flex: 0` みたいに単位表記なしの 0 を使うと、flex-basis ではなく flex-grow の値として扱われる。値が flex-basis であることを明確にするためには、`flex: 0px`とか `flex: 1 1 0`みたいに記述する必要がある。

> The flex property specifies the components of a flexible length: the flex factors (grow and shrink) and the flex basis. When a box is a flex item, flex is consulted instead of the main size property to determine the main size of the box. If a box is not a flex item, flex has no effect.

flex プロパティは**flexible length**つまり、**flex factors**（grow と shrink）と、flax basis を指定する。box が flex item である場合、box の main size を決定するために、main size プロパティの代わりに flex プロパティを参照する。もし box が flex item ではない場合、flex プロパティは効果を持たない。

> **&lt;‘flex-grow’&gt;**
> This &lt;number&gt; component sets flex-grow longhand and specifies the flex grow factor, which determines how much the flex item will grow relative to the rest of the flex items in the flex container when positive free space is distributed. When omitted, it is set to 1.

`flex-grow`は flex-grow ロングハンドの値で**flex grow factor**を指定する。これは、正の余白スペースが配分された場合に、flex item が flex container の残りの items と比べて相対的にどのくらい成長するかを決定する。省略された場合は、`1`になる。

> Flex values between 0 and 1 have a somewhat special behavior: when the sum of the flex values on the line is less than 1, they will take up less than 100% of the free space.

値が 0 から 1 の場合、特別な振る舞いをする。行の flex values の合計が 1 より小さい場合、それらは余白部分の 100%よりも小さい領域を利用する。

> An item’s flex-grow value is effectively a request for some proportion of the free space, with 1 meaning “100% of the free space”; then if the items on the line are requesting more than 100% in total, the requests are rebalanced to keep the same ratio but use up exactly 100% of it. However, if the items request less than the full amount (such as three items that are each flex-grow: .25) then they’ll each get exactly what they request (25% of the free space to each, with the final 25% left unfilled). See [§9.7 Resolving Flexible Lengths](https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths) for the exact details of how free space is distributed.

items の`flex-grow`の値は実質的に余白部分の割り当てに対するリクエストであり、1 は「余白の 100%」を意味する。もし行にある items が合計 100%より多くリクエストしている場合、リクエストは同じ比率をキープしながらバランスを取り直されるが、余白の 100%を正確に使い切る。しかしながら、もし items が全体の量より小さくリクエストした場合（たとえば、3 つの items がそれぞれ`flex-grow: .25`をとる場合）、それらはリクエストした分だけの余白を正確に受け取る（それぞれが 25%の余白を受け取り、残りの 25%は unfilled の状態で残る）。余白がどのように割り当てられるかについて詳細は[§9.7 Resolving Flexible Lengths](https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths)を参照。

> This pattern is required for continuous behavior as flex-grow approaches zero (which means the item wants none of the free space). Without this, a flex-grow: 1 item would take all of the free space; but so would a flex-grow: 0.1 item, and a flex-grow: 0.01 item, etc., until finally the value is small enough to underflow to zero and the item suddenly takes up none of the free space. With this behavior, the item instead gradually takes less of the free space as flex-grow shrinks below 1, smoothly transitioning to taking none of the free space at zero.

このパターンは flex-grow がゼロ（つまり items が余白のスペースを一切必要としない状態）に近づいていくときに連続した振る舞いをするために必要となる。このパターンがないと、`flex-grow: 1`の item は余白のスペースの全てを使用し、`flex-grow: 0.1`の場合も同じように全て使用し、`flex-grow: 0.01`の場合も同様になり、最終的に値がゼロへアンダーフロー（下位桁あふれ）するまで同様になり、そして item は突然余白スペースを全く使用しなくなる。この振る舞いがあると、item は flex-grow が 1 未満に縮小するにつれ、余白スペースが徐々に利用されなくなり、値がゼロで余白スペースを一切使わない状態にスムーズに移行される。

> Unless this “partial fill” behavior is specifically what’s desired, authors should stick to values ≥ 1; for example, using 1 and 2 is usually better than using .33 and .67, as they’re more likely to behave as intended if items are added, removed, or line-wrapped.

この「partial fill」という振る舞いが特に望んでいる振る舞いではない限り、制作者は 1 以上の値を固守すべきである。たとえば、値に 1 と 2 を使うことは、.33 と.67 を利用するより良い。なぜなら items が追加・削除・行折り返しをした場合に、おそらくより意図した通りに振舞うと思われるからである。

> **&lt;‘flex-shrink’&gt;**
> This &lt;number&gt; component sets flex-shrink longhand and specifies the flex shrink factor, which determines how much the flex item will shrink relative to the rest of the flex items in the flex container when negative free space is distributed. When omitted, it is set to 1.

`flex-shrink`は flex-shrink ロングハンドの値で**flex shrink factor**を指定する。これは、負の余白スペースが配分された場合に、flex item が flex container の他の items に対して相対的にどの程度縮小するかを決定する。省略された場合、`1`がセットされる。

> **Note:** The flex shrink factor is multiplied by the flex base size when distributing negative space. This distributes negative space in proportion to how much the item is able to shrink, so that e.g. a small item won’t shrink to zero before a larger item has been noticeably reduced.

負のスペースが配分されたとき、flex shrink factor は flex base size によって乗算される。これは item がどのくらい縮小できるかに応じて負のスペースを配分することになるので、たとえば、大きな item が著しく減少するまで、小さな item がゼロに縮小されることはない。

> **&lt;‘flex-basis’&gt;**
> This component sets the flex-basis longhand, which specifies the flex basis: the initial main size of the flex item, before free space is distributed according to the flex factors.
>
> &lt;‘flex-basis’&gt; accepts the same values as the width and height properties (except that auto is treated differently) plus the content keyword:

`flex-basis`は flex-basis ロングハンドの値で**flex basis**を指定する。これは flex factors にしたがって余白スペースが配分される前の flex item の main size の初期値である。

`flex-basis`は width や height プロパティと同じ値を受け付ける（auto の扱い方は異なる）。さらに`content`キーワードが利用できる。

> **auto**
> When specified on a flex item, the auto keyword retrieves the value of the main size property as the used flex-basis. If that value is itself auto, then the used value is content.

flex item で指定された場合、`auto`キーワードは使用 flex-basis として main size プロパティの値を使用する。もしその値も auto であった場合、使用する値は`content`になる

> **content**
> Indicates an automatic size based on the flex item’s content. (It is typically equivalent to the max-content size, but with adjustments to handle aspect ratios, intrinsic sizing constraints, and orthogonal flows; see details in [§9 Flex Layout Algorithm](https://www.w3.org/TR/css-flexbox-1/#layout-algorithm).)

flex item のコンテンツを基に自動サイズを示す。（それはたいてい max-content サイズと同じであるが、アスペクト比、intrinsic sizing の制約、直交するフローなどを処理するための調整がなされる。詳細は[§9 Flex Layout Algorithm](https://www.w3.org/TR/css-flexbox-1/#layout-algorithm)を参照）

> Note: This value was not present in the initial release of Flexible Box Layout, and thus some older implementations will not support it. The equivalent effect can be achieved by using auto together with a main size (width or height) of auto.

注意：この値は Flexible Box Layout の最初のリリースでは存在しなかった。そのため、いくつかの古い実装ではサポートされていないだろう。auto キーワードと、auto の main size（width または height）を一緒に使うことによって同等の効果を得ることができる。

> **<‘width’>**
> For all other values, flex-basis is resolved the same way as for width and height.
> When omitted from the flex shorthand, its specified value is 0.

（auto, content 以外の）他のすべての値に対して、flex-basis は width や height と同じ方法で解決する。flex ショートハンドから値が省略された場合、値は`0`が指定される。
