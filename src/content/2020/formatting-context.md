---
title: Formatting Context
featured:
  image: cameron-venti-QUt6Ww8OQx0-unsplash
  author: Cameron Venti
  authorLink: https://unsplash.com/@cmventi20?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-28 17:12:58
excerpt: "Inner and outer display typesにて、inner display type は**formatting context**について定義し、子孫となるboxがどのように配置されるかを決める、と書いた。今回はformatting contextについて確認する。"
---

[Inner and outer display types](https://memolog.org/2020/inner-and-outer-display-type.html)にて、inner display type は**formatting context**について定義し、子孫となる box がどのように配置されるかを決める、と書いた。今回は formatting context について確認する。

先にまとめ。

- box は画面上に要素（または擬似要素）を表現するもの。
- formatting context は box をどう配置するかを決定づける。fomatting context のタイプによってどう配置するかは変わってくる。
- box は包含（親）ブロックの formatting context に入るか、float みたいに独自の formatting context を作る場合もある。
- inner display type で配下の box をどのように配置するか（formatting context）を決定する。inner display type には、flow、flow-root、table、flex、grid、ruby みたいな値がある。
