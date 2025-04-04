---
title: Cyclomatic comlexity
date: 2013-08-03T14:55:55.000Z
categories:
  - software testing
tags:
  - testing
excerpt: "Cyclomatic complexity - Wikipedia, the free encyclopedia。日本語では、循環的複雑度 - Wikipediaと呼ぶみたい。"
---

[Cyclomatic complexity - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Cyclomatic_complexity)。日本語では、[循環的複雑度 \- Wikipedia](http://ja.wikipedia.org/wiki/%E5%BE%AA%E7%92%B0%E7%9A%84%E8%A4%87%E9%9B%91%E5%BA%A6)と呼ぶみたい。

Cyclomatic complexity は、（Wikipedia に書いてありますが）コードの中で独立した処理の進み方がいくつあるかを示したもので、コードの複雑度の指標となります。[Sublime Text 2 で JSHint](/blog//2013/04/sublime_text_2_jshint/)の記事でもそういえば書いていましたが（忘れてた）、Cyclomatic complexity は 10 以下が妥当な範囲としています（[Testable JavaScript](http://www.amazon.co.jp/gp/product/B00B1WLE92/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B00B1WLE92&linkCode=as2&tag=yutakayamaguc-22)![](http://ir-jp.amazon-adsystem.com/e/ir?t=yutakayamaguc-22&l=as2&o=9&a=B00B1WLE92) 参照）。JSHint では[maxcomplexity](http://www.jshint.com/docs/options/#maxcomplexity)で設定することができます。

計測には、M = E - N + P という計算式が使われます。詳細は[Cyclomatic complexity - Description](http://en.wikipedia.org/wiki/Cyclomatic_complexity#Description)に書かれていますが、Javascript の function は、function の処理が終わった後は、処理を実行した場所(entry point)に戻るので、Javascript の function の Cyclomatic complexity を調べるなら、2P ではなく P になる（日本語の Wikipedia はそのあたりの説明が薄い）。

この式の M は complexity で、E が edge の数、N が node の数で、P が exit node の数になる（javascript function の場合、常に 1 つだけになる）。[Cyclomatic complexity - Implications for Software Testing](http://en.wikipedia.org/wiki/Cyclomatic_complexity#Implications_for_Software_Testing)の内容を参考にすると、

```
function () {
  if (c1()) {
    f1();
  } else {
    f2();
  }

  if (c2()) {
    f3();
  } else {
    f4();
  }
}

```

のような処理を control flow graph にすると、添付の図のようになる。edge(E)は矢印の部分になる。node は丸の部分で、赤丸が entry point、青色が exit point となっている。

![File:Control flow graph of function with two if else statements.svg](//upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Control_flow_graph_of_function_with_two_if_else_statements.svg/400px-Control_flow_graph_of_function_with_two_if_else_statements.svg.png)

edget（矢印）と node（丸）をそれぞれ数えると、9 個と 7 個になるので、Complexity の M は、M = 9 - 7 + 1 で、3 となる。

つまり、Cyclomatic complexity は、入り口から出口までにあるコードのブロック（node）に対して、ブロック間を行き来する道がどれだけあるかを表したものであると。ブロックの数と比較して道が多くあるということは、色んな進み方ができるということであり、バグにつながる確率が高くなると。そして Cyclomatic complexity は 10 までに押さえるのがよしと。それ以上になる場合は、処理の方法を変えるとか（if 文ではなく functon map みたいなかたちにするとか）、function を目的別に分割するとかして、コードの簡潔性を保つのが良い。

また、既存の機能に条件分岐を増やして、Cyclomatic complexity が二倍三倍になるような修正は、バグを含みやすいので、あまり良い修正方法とは言いがたいと。

というメモ。
