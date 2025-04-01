---
title: Sublime Text 2 で JSHint
date: 2013-04-13T14:50:00.000Z
categories:
- web
tags:
- javascript
---
[Sublime Text 2 の JSLint から node がみつからない - メモログ](/blog//2013/02/node_not_found_with_jsLint/)と関連して、少しの間JSLintを使用していたのですが、jQueryなどglobalに定義されている変数があるとそこで定義されていないと言われたりなどしてしまい、若干使い勝手が悪い。

<!-- more -->

それでJSHintを使い始めてみている。JSHintについては[About -- JSHint](http://www.jshint.com/about/)を参照。

> JSHint is a fork of [JSLint](http://jslint.com/), the tool written and maintained by Douglas Crockford. The project originally [started](http://anton.kovalyov.net/2011/02/20/why-i-forked-jslint-to-jshint/) as an effort to make a more configurable version of JSLint-the one that doesn't enforce one particular coding style on its users-but then transformed into a separate static analysis tool with its own goals and ideals.

JSLintのチェックをいろいろ設定可能な状態にするところからスタートして、いまは静的コード解析までしてくれるらしい。

Sublime Text 2へのJSHintのインストールは下記のような感じ。

1.  nodeが入っていなかったらnodeをインストール（homebrewが入っていたらbrew install nodeでインストールできる。[RVM / JewelryBox / Homebrew をインストール - メモログ](/blog//2012/09/rvm_jewelrybox_homebrew/)）
2.  \[sudo\] npm install -g jshint で、nodeからJSHintをインストール
3.  メニューのTools - Command Paletteを開いて、「Package Controll: Install Package」を選択して、JSHintを選択

Sublime Text 2のJSHintの設定は、~/Library/Application Support/Sublime Text 2/Packages/JSHint/.jshintrc にあります。デフォルトの設定を変更したい場合は、これをUserのディレクトリにコピーして、それを編集します。

```
cd ~/Library/Application Support/Sublime Text 2/Packages/
cp JSHint/.jshintrc User/JSHint.jshintrc

```

設定は[Documentation -- JSHint](http://www.jshint.com/docs/)を参照。Enforcing optionsは書き方を制限する系の設定で、Relaxing optionsは逆に制限を緩める（warningなどを出さないように抑制する）系の設定で、Environmentsは環境関連。jquery: trueにすると、JQueryや$などはどこかでglobal変数に定義されているものとして扱ってくれます。

Environmentsで用意されていないものについては、"globals": {"define":false,"require":false}のような感じで、globalsで設定すると同じことができます。

設定の中で「maxcomplexity」の設定は興味深くて、 [Cyclomatic complexity](http://ja.wikipedia.org/wiki/&#x25;E5&#x25;BE&#x25;AA&#x25;E7&#x25;92&#x25;B0&#x25;E7&#x25;9A&#x25;84&#x25;E8&#x25;A4&#x25;87&#x25;E9&#x25;9B&#x25;91&#x25;E5&#x25;BA&#x25;A6)を計算して、complexityを設定した値で制限してくれるみたいです。[Testable JavaScript](http://www.amazon.co.jp/gp/product/B00B1WLE92/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B00B1WLE92&linkCode=as2&tag=yutakayamaguc-22)![](http://www.assoc-amazon.jp/e/ir?t=yutakayamaguc-22&l=as2&o=9&a=B00B1WLE92)に書かれていた内容によると、Thomas J. McCabeは、すべてのメソッドはCyclomatic complexityを10以下にすべしとしているそうです。[Software Integrity Blog » Blog Archive » McCabe Cyclomatic Complexity: the proof in the pudding](http://www.enerjy.com/blog/?p=198)の調査では25くらいまではバグとの相関関係あまり変わらないみたいですけど、[Project Metrics Help - Complexity metrics](http://www.aivosto.com/project/help/pm-complexity.html)の話だとCyclomatic complexityが上がってくると、Bad fix probabilityも上がると。やはり10くらいが妥当だという話で、とりあえず10に設定してみました。

そしてそして、Sublime Text 2で保存したときにJSHintを自動的に実行したい場合は、[SublimeOnSaveBuild](https://github.com/alexnj/SublimeOnSaveBuild)を別途インストールします。インストールは、メニューのTools - Command Paletteを開いて、「Package Controll: Install Package」を選択して、「SublimeOnSaveBuild」を選びます。インストールするだけで特に設定は必要ありません。
