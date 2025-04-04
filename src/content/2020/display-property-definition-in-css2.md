---
title: The display property definition in CSS2
featured:
  image: frankie-cordoba-YDBEIv9KcwE-unsplash
  author: frankie cordoba
  authorLink: https://unsplash.com/@byfoul?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-23 9:26:00
excerpt: "前回のInner and outer display typesに引き続き。1.1. Module interactionsにCSS Display Moduleは、CSS2の定義を置き換えるまたは拡張するものであると書かれているので、一応CSS2.2の9.2.4 The 'display' propertyをざっと確認しようと思う。"
---

前回の[Inner and outer display types](https://memolog.org/2020/inner-and-outer-display-type.html)に引き続き。[1.1. Module interactions](https://www.w3.org/TR/css-display-3/#placement)に CSS Display Module は、CSS2 の定義を置き換えるまたは拡張するものであると書かれているので、一応 CSS2.2 の[9.2.4 The 'display' property](https://www.w3.org/TR/CSS22/visuren.html#display-prop)をざっと確認しようと思う。

内容的にそんなに多くないので、該当箇所を全部貼り付ける。特筆するところもないので特に確認しなくても良かったかもしれない。

**block**

> This value causes an element to generate a principal block box.

principal block box を作る。principal はその要素のためのメインとなるところみたいな感じ。

**inline-block**

> This value causes an element to generate a principal inline-level block container. (The inside of an inline-block is formatted as a block box, and the element itself is formatted as an atomic inline-level box.)

principal inline-level block container を作る。（inline-block の内側は block box としてフォーマットされ、要素自身は atomic inline-level box としてフォーマットされる）。

atomic の意味が、正直よくわからないのだけど、[What is atomic? - Definition from WhatIs.com](https://whatis.techtarget.com/definition/atomic)には以下のように書かれており、つまりこれ以上、何かより小さい構成要素に分割することができない要素、みたいな意味だと思う。

> In computer programming, atomic describes a unitary action or object that is essentially indivisible, unchangeable, whole, and irreducible.

**inline**

> This value causes an element to generate one or more inline boxes.

一つ以上の inline boxes を生成する

**list-item**

> This value causes an element (e.g., LI in HTML) to generate a principal block box and a marker box. For information about lists and examples of list formatting, please consult the section on lists.

principal block box と marker box を生成する。詳細はリストのセクションに書かれているが今のところ詳細は確認しない。

**none**

> This value causes an element to not appear in the formatting structure (i.e., in visual media the element generates no boxes and has no effect on layout). Descendant elements do not generate any boxes either; the element and its content are removed from the formatting structure entirely. This behavior cannot be overridden by setting the 'display' property on the descendants.

> Please note that a display of 'none' does not create an invisible box; it creates no box at all. CSS includes mechanisms that enable an element to generate boxes in the formatting structure that affect formatting but are not visible themselves. Please consult the section on visibility for details.

要素が formatting structure に出現しなくなる（要素が box を生成しなくなり、レイアウト上の効果をあたえなくなる）。子孫要素も box を生成しなくなる。この振る舞いは子孫要素に display プロパティを設定しても上書きされない。

display:none は不可視の box を作るわけではないことが要注意。none は box を生成しない。CSS は要素から formatting structure の中に box を生成することを可能にする機能を含んでいる。これは formatting に影響を与えるが、visible、可視であるかどうかそのものに影響をあたえない。

**table, inline-table, table-row-group, table-column, table-column-group, table-header-group, table-footer-group, table-row, table-cell, and table-caption**

> These values cause an element to behave like a table element (subject to restrictions described in the chapter on tables).

これらの値は、要素にテーブルっぽい振る舞いをもたらす。

> The computed value is the same as the specified value, except for positioned and floating elements (see Relationships between 'display', 'position', and 'float') and for the root element. For the root element, the computed value is changed as described in the section on the relationships between 'display', 'position', and 'float'.

算出される値は positioned element, floating element, root 要素をのぞいて、指定された値と同じになる。display と position, float の関係性についての詳細は今は確認しない。

> Note that although the initial value of 'display' is 'inline', rules in the user agent's default style sheet may override this value. See the sample style sheet for HTML 4 in the appendix.

display の初期値は inline だけれども、ブラウザのデフォルトスタイルによって上書きされているかもしれない。
