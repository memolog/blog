---
title: compass で sass の sourcemap を作る
date: 2013-08-21T14:00:00.000Z
categories:
- web
tags:
- compass
- grunt
- sass
---
sassのsourcemapを用意すると、Chromeのdeveloper toolsを使ったときにscssファイルでスタイルのinspectができるようになるので、非常に便利。詳細は[Sassファイルでの記述位置を知るより美しい方法｜Blog｜Skyward Design](http://www.skyward-design.net/blog/archives/000163.html)などを参照。  

<!-- more -->
  
![](http://farm8.staticflickr.com/7365/9563224728_a3f1aae573_o.png)

ということで、compassでsassのsourcemapを生成したい。いろいろ試してみたのですが、とりあえずうまくいった手順が下記のような感じ。まずはインストール。preview版なのでインストール後に問題起こるかもしれません。

```bash
gem install sass --pre
gem install compass-sourcemaps --pre
```

そして、config.rbに下記を追加。

```none
sass_options = { :sourcemap => true }
```

これで compass --compile を実行したら、css_dirの同じ場所に css.map ファイルができるようになりました。

本当は[grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)のタスクでsourmapを作成したかったのですが、compass-sourcemapsのcompassでは、options.timeが有効になっている場合にsourcemapを作成するとエラーになってしまう（grunt-contrib-compassのタスクの中でcompass cleanの実行ではない場合はoptions.timeを有効にするようになっている）。ので、そのうち...

あと sass --pre と compass --pre の組み合わせも試してみましたが、試した時点では、compass compileも、sass --compassもどちらもsource mapを作成できませんでした。sass --compassの方は、compassのrequireに失敗して「Could not find compass」みたいなエラーが発生しました。時が経てば使えるようになるかも。

というメモ。
