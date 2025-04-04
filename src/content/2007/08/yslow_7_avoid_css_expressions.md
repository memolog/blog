---
title: YSLOW 勉強 &#x3a; 7&#x3a; Avoid CSS Expressions
date: 2007-08-09T15:58:00.000Z
categories:
- web
tags:
- yslow
---
*   [7: Avoid CSS Expressions](http://developer.yahoo.com/performance/rules.html#css_expressions)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の七つ目。CSS Expressions の使用を避けよう。CSS Expressionsとは、background-color: expression( (new Date()).getHours()&#x25;2 ? "#B8D4FF" : "#F08A00" ); （2で割れたら#B8D4FF、割れなかったらF08A00）というように、CSSの指定をダイナミックに行えるIEの独自拡張のこと。 便利な機能だけど、expressionsの判定がマウスを動かしたりするだけで行われてしまうため、何千回も判定を繰り返す可能性がある（パフォーマンスにも影響がある）。

<!-- more -->

わたしはこの機能そのもののことを知らなかったからそう感じるのかもしれませんが、この独自拡張を使っている人っているのかなあ・・
