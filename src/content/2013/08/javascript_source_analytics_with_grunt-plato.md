---
title: Javascript source analytics with grunt-plato
date: 2013-08-18T20:00:00.000Z
categories:
  - software testing
tags:
  - grunt
excerpt: "Gruntのpluginでgrunt-platoというのがあって、Platoを使ってJavascriptの静的解析結果をvisualizeしてレポートしてくれます。"
---

Grunt の plugin で[grunt-plato](https://github.com/jsoverson/grunt-plato)というのがあって、[Plato](https://github.com/jsoverson/plato)を使って Javascript の静的解析結果を visualize してレポートしてくれます。

レポートのサンプルがいくつか載っていて、[jQuery のサンプルはこんな感じ](http://jsoverson.github.io/plato/examples/jquery/)。解析は主に[philbooth/complexityReport.js](https://github.com/philbooth/complexityReport.js)を使った complexity の解析結果で、Plato はそれをグラフに出力してくれる。あと JSHint での検知結果もついてくる。

![](http://farm6.staticflickr.com/5343/9522271089_6496427759_o.png)

complexityReport.js では何を出力してくれるかというと、lines of code、number of parameters、cyclomatic complexity、Halstead metrics、maintainability index など。[サンプルがこんな感じ](https://github.com/philbooth/complexityReport.js/blob/master/SELF.md)。

Plato のグラフで注目されるのは、Maintainability という項目かなと思われますが、Maintainability の項目は、[Maintainability Index Range and Meaning - Code Analysis Team Blog - Site Home - MSDN Blogs](http://blogs.msdn.com/b/codeanalysis/archive/2007/11/20/maintainability-index-range-and-meaning.aspx)とか[Maintainability - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Maintainability)、[Virtual Machinery - Sidebar 4 - MI and MINC - Maintainability Index](http://www.virtualmachinery.com/sidebar4.htm)に詳しく書かれている。コードの複雑性を評価することで、維持しやすい状態を保つ指標になる、と思われる。msdn の[コード メトリックス値](http://msdn.microsoft.com/ja-jp/library/bb385914.aspx)で類似する内容が日本語で読める。

Maintainability の計算方法は下記のようになっている。

```
171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * ln(Lines of Code)

```

係数がなぜこの値なのかは、勉強不足ゆえ不明...

Maintainability Index は、この値を 0 から 100 までの数値に変換したもの。microsoft のサイトでは、20-100 までの間は noise レベルのものと見なして、0-20 になるようなら注意しないといけないということにしている。

```
Maintainability Index =
Math.max(0,(171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * ln(Lines of Code))*100 / 171)

```

それぞれの値ですけど、Halstead Volume は[Halstead complexity measures - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Halstead_complexity_measures)に書いてある Volume のこと。[オペレーター](http://e-words.jp/w/E382AAE3839AE383ACE383BCE382BF.html)と[オペランド](http://e-words.jp/w/E382AAE3839AE383A9E383B3E38389.html)の、のべ数に、オペレーターとオペランドのユニーク数の対数を乗算して得る。処理の数が多ければ多いほど Maintainability は下がるし、処理の種類が多くなれば Maintainability はより簡単に下がる、と。自然対数で処理されるので、10 個から 100 個に変わるのと、1000 個から 1100 個に変わるのでは、Maintainability への影響は前者の方が大きい。

Lines of Code は[LOC - Wikipedia](http://ja.wikipedia.org/wiki/LOC)を参照。physical か logical かについての明記は見つかりませんでしたけど、logical だと思います。とりあえず complexityReport.js では logical を使っている様子。ソースの（論理）行数が増えれば増えるほど、Maintainability は下がると。自然対数で処理されるので、10 行から 100 行に変わるのと、1000 行から 1100 行に変わるのでは、Maintainability への影響は前者の方が圧倒的に大きい。

Cyclomatic Complexity は[Cyclomatic comlexity - メモログ](/blog//2013/08/cyclomatic_comlexity/)にメモしました。処理経路の数が多ければ多いほど、Maintainability は下がると。

Cyclomatic comlexity は自然対数で処理しないので、増えれば増えるほどリニアに Maintainability は下がっていく。けれども係数が小さいので、モジュール単位とかで Maintainability を計測すると大勢に影響しないほど小さい感がある。モジュール単位での計測だと、コードの行数が係数が大きくて、行数も 100 から 1000 くらいだろうから、増えた時の影響力も大きい感があります。Halstead Volume も比較的影響力大きいかな。

では根本としてどの範囲を対象に計測するのが妥当なのかという別の疑問が出てくるわけですが、よく分からない.. モジュール内で処理が完結しているならモジュール単位で計算するのが妥当かなあ。

というメモ。
