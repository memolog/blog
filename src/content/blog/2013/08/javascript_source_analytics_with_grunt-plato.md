---
title: Javascript source analytics with grunt-plato
date: 2013-08-18T20:00:00.000Z
categories:
- software testing
tags:
- grunt
---
Gruntのpluginで[grunt-plato](https://github.com/jsoverson/grunt-plato)というのがあって、[Plato](https://github.com/jsoverson/plato)を使ってJavascriptの静的解析結果をvisualizeしてレポートしてくれます。

<!-- more -->

レポートのサンプルがいくつか載っていて、[jQueryのサンプルはこんな感じ](http://jsoverson.github.io/plato/examples/jquery/)。解析は主に[philbooth/complexityReport.js](https://github.com/philbooth/complexityReport.js)を使ったcomplexityの解析結果で、Platoはそれをグラフに出力してくれる。あとJSHintでの検知結果もついてくる。  
  
![](http://farm6.staticflickr.com/5343/9522271089_6496427759_o.png)

complexityReport.jsでは何を出力してくれるかというと、lines of code、number of parameters、cyclomatic complexity、Halstead metrics、maintainability indexなど。[サンプルがこんな感じ](https://github.com/philbooth/complexityReport.js/blob/master/SELF.md)。

Platoのグラフで注目されるのは、Maintainabilityという項目かなと思われますが、Maintainabilityの項目は、[Maintainability Index Range and Meaning - Code Analysis Team Blog - Site Home - MSDN Blogs](http://blogs.msdn.com/b/codeanalysis/archive/2007/11/20/maintainability-index-range-and-meaning.aspx)とか[Maintainability - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Maintainability)、[Virtual Machinery - Sidebar 4 - MI and MINC - Maintainability Index](http://www.virtualmachinery.com/sidebar4.htm)に詳しく書かれている。コードの複雑性を評価することで、維持しやすい状態を保つ指標になる、と思われる。msdnの[コード メトリックス値](http://msdn.microsoft.com/ja-jp/library/bb385914.aspx)で類似する内容が日本語で読める。

Maintainabilityの計算方法は下記のようになっている。

```
171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * ln(Lines of Code) 

```

係数がなぜこの値なのかは、勉強不足ゆえ不明...

Maintainability Index は、この値を0から100までの数値に変換したもの。microsoftのサイトでは、20-100までの間はnoiseレベルのものと見なして、0-20になるようなら注意しないといけないということにしている。

```
Maintainability Index = 
Math.max(0,(171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * ln(Lines of Code))*100 / 171)

```

それぞれの値ですけど、Halstead Volumeは[Halstead complexity measures - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Halstead_complexity_measures)に書いてあるVolumeのこと。[オペレーター](http://e-words.jp/w/E382AAE3839AE383ACE383BCE382BF.html)と[オペランド](http://e-words.jp/w/E382AAE3839AE383A9E383B3E38389.html)の、のべ数に、オペレーターとオペランドのユニーク数の対数を乗算して得る。処理の数が多ければ多いほどMaintainabilityは下がるし、処理の種類が多くなればMaintainabilityはより簡単に下がる、と。自然対数で処理されるので、10個から100個に変わるのと、1000個から1100個に変わるのでは、Maintainabilityへの影響は前者の方が大きい。

Lines of Codeは[LOC - Wikipedia](http://ja.wikipedia.org/wiki/LOC)を参照。physicalかlogicalかについての明記は見つかりませんでしたけど、logicalだと思います。とりあえずcomplexityReport.jsではlogicalを使っている様子。ソースの（論理）行数が増えれば増えるほど、Maintainabilityは下がると。自然対数で処理されるので、10行から100行に変わるのと、1000行から1100行に変わるのでは、Maintainabilityへの影響は前者の方が圧倒的に大きい。

Cyclomatic Complexityは[Cyclomatic comlexity - メモログ](/blog//2013/08/cyclomatic_comlexity/)にメモしました。処理経路の数が多ければ多いほど、Maintainabilityは下がると。

Cyclomatic comlexityは自然対数で処理しないので、増えれば増えるほどリニアにMaintainabilityは下がっていく。けれども係数が小さいので、モジュール単位とかでMaintainabilityを計測すると大勢に影響しないほど小さい感がある。モジュール単位での計測だと、コードの行数が係数が大きくて、行数も100から1000くらいだろうから、増えた時の影響力も大きい感があります。Halstead Volumeも比較的影響力大きいかな。

では根本としてどの範囲を対象に計測するのが妥当なのかという別の疑問が出てくるわけですが、よく分からない.. モジュール内で処理が完結しているならモジュール単位で計算するのが妥当かなあ。

というメモ。
