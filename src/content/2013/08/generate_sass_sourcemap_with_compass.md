---
title: compass で sass の sourcemap を作る
date: 2013-08-21T14:00:00.000Z
categories:
  - web
tags:
  - compass
  - grunt
  - sass
excerpt: "sassのsourcemapを用意すると、Chromeのdeveloper toolsを使ったときにscssファイルでスタイルのinspectができるようになるので、非常に便利。詳細はSassファイルでの記述位置を知るより美しい方法｜Blog｜Skyward Designなどを参照。"
---

sass の sourcemap を用意すると、Chrome の developer tools を使ったときに scss ファイルでスタイルの inspect ができるようになるので、非常に便利。詳細は[Sass ファイルでの記述位置を知るより美しい方法｜ Blog ｜ Skyward Design](http://www.skyward-design.net/blog/archives/000163.html)などを参照。

![](http://farm8.staticflickr.com/7365/9563224728_a3f1aae573_o.png)

ということで、compass で sass の sourcemap を生成したい。いろいろ試してみたのですが、とりあえずうまくいった手順が下記のような感じ。まずはインストール。preview 版なのでインストール後に問題起こるかもしれません。

```bash
gem install sass --pre
gem install compass-sourcemaps --pre
```

そして、config.rb に下記を追加。

```none
sass_options = { :sourcemap => true }
```

これで compass --compile を実行したら、css_dir の同じ場所に css.map ファイルができるようになりました。

本当は[grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)のタスクで sourmap を作成したかったのですが、compass-sourcemaps の compass では、options.time が有効になっている場合に sourcemap を作成するとエラーになってしまう（grunt-contrib-compass のタスクの中で compass clean の実行ではない場合は options.time を有効にするようになっている）。ので、そのうち...

あと sass --pre と compass --pre の組み合わせも試してみましたが、試した時点では、compass compile も、sass --compass もどちらも source map を作成できませんでした。sass --compass の方は、compass の require に失敗して「Could not find compass」みたいなエラーが発生しました。時が経てば使えるようになるかも。

というメモ。
