---
title: Automatic Minimum Size of Flex Items
featured:
  image: febiyan-z85gD0sTOQ0-unsplash
  author: Febiyan
  authorLink: https://unsplash.com/@febiyanr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-05-18 18:49:00
excerpt: "時間が開いてしまった。開きすぎてもはや自分でもよく覚えてないけど今回は4.5. Automatic Minimum Size of Flex Items、autoキーワードで自動的に決定される最小値について。"
---

時間が開いてしまった。開きすぎてもはや自分でもよく覚えてないけど今回は[4.5. Automatic Minimum Size of Flex Items](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)、auto キーワードで自動的に決定される最小値について。

> **Note:** The auto keyword, representing an [automatic minimum size](https://www.w3.org/TR/css-sizing-3/#automatic-minimum-size), is the new initial value of the min-width and min-height properties. The keyword was previously defined in this specification, but is now defined in the CSS Sizing module.

`auto`のキーワードは**automatic minimum size**を表し、これが min-width や min-height の新しい初期値になる。このキーワードはこの仕様の中で定義されていたけど、今は[CSS Sizing module](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)の中で定義されている。

`auto`キーワードの説明を[CSS Sizing module](https://www.w3.org/TR/css-sizing-3/#automatic-minimum-size)より抜粋。

> **auto**
> For width/height, specifies an automatic size. See the relevant layout module for how to calculate this.
> For min-width/min-height, specifies an automatic minimum size. Unless otherwise defined by the relevant layout module, however, it resolves to a used value of 0. For backwards-compatibility, the resolved value of this keyword is zero for boxes of all CSS2 display types: block and inline boxes, inline blocks, and all the table layout boxes. It also resolves to zero when no box is generated.

auto は、width/height に対しては automatic size を指定する。算出方法は関連するレイアウトモジュールを参照。

min-width/min-height に対しては、**automatic minimum size**を指定する。しかしながら、関連するレイアウトモジュールによって定義されていない限り、値はゼロとなる。後方互換性のため、このキーワードで渡される値は、CSS2 の display type（block, inline, inline-block, table）の box に対してはゼロとなる。box が生成されないときもゼロとなる。

> To provide a more reasonable default minimum size for flex items, the used value of a main axis automatic minimum size on a flex item that is not a scroll container is a content-based minimum size; for scroll containers the automatic minimum size is zero, as usual.

flex items に対するより合理的なデフォルトの最小サイズを提供するために、[scroll container](https://www.w3.org/TR/css-overflow-3/#scroll-container)ではない flex item の main axis の automatic minimum size として使用される値は、**content-based minimum size**となる。scroll containers に対しては、automatic minimum size は従来通りゼロとなる。

<img src="../../assets/images/flex-direction-terms.svg" />

> In general, the content-based minimum size of a flex item is the smaller of its content size suggestion and its specified size suggestion. However, if the box has an aspect ratio and no specified size, its content-based minimum size is the smaller of its content size suggestion and its transferred size suggestion. If the box has neither a specified size suggestion nor an aspect ratio, its content-based minimum size is the content size suggestion.

一般的には、flex item の content-based minimum size は、**content size suggestion**と**specified size suggestion**の小さい方になる。しかし、もし box がアスペクト比を持っているが**specified size**を持っていない場合、content-based minimum size はその content size suggestion と**transferred size suggestion**の小さい方になる。もし box が specified size もアスペクト比もどちらも持っていない場合、content-based minimum size は content size suggestion になる。

specified size とは[CSS Images Module Level 3](https://www.w3.org/TR/css-images-3/#specified-size)によると以下の通り。

> The specified size of an object is given by CSS, such as through the width and height or background-size properties. The specified size can be a definite width and height, a set of constraints, or a combination thereof.

オブジェクトの specified size は、width と height、または background-size などの CSS によって与えられる。specified size は width と height、制約のセット、またはそれらの組み合わせによって決定される。

> The content size suggestion, specified size suggestion, and transferred size suggestion used in this calculation account for the relevant min/max/preferred size properties so that the content-based minimum size does not interfere with any author-provided constraints, and are defined below:

この計算で使われる content size suggestion や specified size suggestion、transferred size suggestion は、content-based minimum size が制作者が用意したどの制約にも干渉しないように、関連した min/max/preferred サイズのプロパティを考慮しており、以下に定義されている。

> **specified size suggestion**
> If the item’s computed main size property is definite, then the specified size suggestion is that size (clamped by its max main size property if it’s definite). It is otherwise undefined.

item の computed main size プロパティが決まっている場合、specified size suggestion はそのサイズになる（その場合、max main size プロパティによって固定される）。それ以外では undefined となる。

> **transferred size suggestion**
> If the item has an intrinsic aspect ratio and its computed cross size property is definite, then the transferred size suggestion is that size (clamped by its min and max cross size properties if they are definite), converted through the aspect ratio. It is otherwise undefined.

item が intrinsic なアスペクト比を持ち、computed cross size プロパティが決まっている場合、transferred size suggestion はそのサイズになる（それらが定義されている場合、その min と max cross size プロパティによって固定される）。それ以外では undefined となる。

intrinsic とは、[Intrinsic Size (内在サイズ)](https://developer.mozilla.org/ja/docs/Glossary/Intrinsic_Size)あたりを参考にすると、つまり、その flex item が画像のときなど、要素がそもそも持っている値を指す。アスペクト比（縦横比）があって cross 側のサイズが判明していたら、transferred size suggestion はそこから算出される。intrinsic 　 size については[CSS Intrinsic & Extrinsic Sizing Module Level 3](https://www.w3.org/TR/css-sizing-3)あたりに詳しく書かれていそうだけど、今は触れない。

> **content size suggestion**
> The content size suggestion is the min-content size in the main axis, clamped, if it has an aspect ratio, by any definite min and max cross size properties converted through the aspect ratio, and then further clamped by the max main size property if that is definite.

content size suggestion は、main axis の[min-content size](https://www.w3.org/TR/css-sizing-3/#min-content)であり、もしアスペクト比がある場合、アスペクト比を通して変換され決定された任意の min または max cross サイズプロパティによって固定され、さらにそれが定義されている場合は、max main サイズプロパティによって固定される。

min-content size とは、[CSS Intrinsic & Extrinsic Sizing Module Level 3](https://www.w3.org/TR/css-sizing-3/#min-conten)に以下のように書かれている。

> The smallest size a box could take that doesn’t lead to overflow that could be avoided by choosing a larger size. (See [§4 Intrinsic Size Determination](https://www.w3.org/TR/css-sizing-3/#intrinsic))

box がより大きなサイズを選ぶことによって避けることができるオーバーフローを引き起こさない最小のサイズ。

> For the purpose of calculating an intrinsic size of the box (e.g. the box’s min-content size), a content-based minimum size causes the box’s size in that axis to become indefinite (even if e.g. its width property specifies a definite size). Note this means that percentages calculated against this size will behave as auto.

box の intrinsic サイズ（たとえば box の min-content サイズ）を計算する目的で、content-based minimum size がその axis 内の box のサイズを不定の状態にする（たとえ width プロパティが固定サイズを指定していたとしても）。これは、このサイズに対する計算されたパーセンテージが auto として振舞うことを意味する。

> Nonetheless, although this may require an additional layout pass to re-resolve percentages in some cases, this value (like the min-content, max-content, and fit-content values defined in [CSS-SIZING-3]) does not prevent the resolution of percentage sizes within the item.

それにもかかわらず、場合によってはパーセンテージを再解決するための追加のレイアウトパスが必要になる場合があるけれども、（[CSS-SIZING-3](https://www.w3.org/TR/css-flexbox-1/#biblio-css-sizing-3)で定義されている min-content、max-content、fit-content などのような）値は、アイテム内のパーセンテージのサイズの解決を妨げるものではない。

> Note that while a content-based minimum size is often appropriate, and helps prevent content from overlapping or spilling outside its container, in some cases it is not:
> In particular, if flex sizing is being used for a major content area of a document, it is better to set an explicit font-relative minimum width such as min-width: 12em. A content-based minimum width could result in a large table or large image stretching the size of the entire content area into an overflow zone, and thereby making lines of text gratuitously long and hard to read.

content-based minimum size はたいていの場合適切であり、content がオーバーラップまたはコンテナの外にこぼれることを防ぐ一方で、そうではない場合もあることに注意が必要。特に、flex sizing が document の主要なコンテンツエリアに使われている場合、`min-width:12em`のような明示的な font 相対的な最小 width を指定する方が良い。content-based minimum width は、大きなテーブルや大きな画像がコンテンツエリア全体のサイズを overflow zone に引き延ばすことになり、したがってテキストの行が不当に長くなり読みにくくなってしまう。

> Note also, when content-based sizing is used on an item with large amounts of content, the layout engine must traverse all of this content before finding its minimum size, whereas if the author sets an explicit minimum, this is not necessary. (For items with small amounts of content, however, this traversal is trivial and therefore not a performance concern.)

また、content-based sizing が大量のコンテンツのある item に使われると、レイアウトエンジンは最小サイズを見つける前にコンテンツの全てを走査しなければならなくなる。一方、もし制作者が明示的な最小値を設定すれば、これは必要なくなる。（しかしながら、コンテンツ量が少ない items についてはこの操作は些細なことなので、パフォーマンスにたいする懸念はない。）
