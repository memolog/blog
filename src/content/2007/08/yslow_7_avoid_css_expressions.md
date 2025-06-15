---
title: "YSLOW (7): Avoid CSS Expressions"
date: 2007-08-09T15:58:00.000Z
featured:
  image: yslow_7_avoid_css_expressions
  author: chatGPT
categories:
  - web
tags:
  - yslow
excerpt: 'CSS Expressions の使用を避けよう。'
---

- [7: Avoid CSS Expressions](http://developer.yahoo.com/performance/rules.html#css_expressions)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の七つ目。CSS Expressions の使用を避けよう。CSS Expressions とは、

```css
background-color: expression( (new Date()).getHours() % 2 ? "#B8D4FF" : "#F08A00" );
```

みたいな、2 で割れたら`#B8D4FF`、割れなかったら `#F08A00`というように、CSS の指定をダイナミックに行える IE の独自拡張のこと。 便利な機能だけど、expressions の判定がマウスを動かしたりするだけで行われてしまうため、何千回も判定を繰り返す可能性がある（パフォーマンスにも影響がある）。

わたしはこの機能そのもののことを知らなかったからそう感じるのかもしれませんが、この独自拡張を使っている人っているのかなあ・・
