---
title: Sublime Text 2 で JSHint
date: 2013-04-13T14:50:00.000Z
categories:
  - web
tags:
  - javascript
excerpt: "Sublime Text 2 の JSLint から node がみつからない - メモログと関連して、少しの間JSLintを使用していたのですが、jQueryなどglobalに定義されている変数があるとそこで定義されていないと言われたりなどしてしまい、若干使い勝手が悪い。"
---

[Sublime Text 2 の JSLint から node がみつからない - メモログ](/2013/02/node_not_found_with_jsLint/)と関連して、少しの間 JSLint を使用していたのですが、jQuery など global に定義されている変数があるとそこで定義されていないと言われたりなどしてしまい、若干使い勝手が悪い。

それで JSHint を使い始めてみている。JSHint については[About -- JSHint](http://www.jshint.com/about/)を参照。

> JSHint is a fork of [JSLint](http://jslint.com/), the tool written and maintained by Douglas Crockford. The project originally [started](http://anton.kovalyov.net/2011/02/20/why-i-forked-jslint-to-jshint/) as an effort to make a more configurable version of JSLint-the one that doesn't enforce one particular coding style on its users-but then transformed into a separate static analysis tool with its own goals and ideals.

JSLint のチェックをいろいろ設定可能な状態にするところからスタートして、いまは静的コード解析までしてくれるらしい。

Sublime Text 2 への JSHint のインストールは下記のような感じ。

1.  node が入っていなかったら node をインストール（homebrew が入っていたら brew install node でインストールできる。[RVM / JewelryBox / Homebrew をインストール - メモログ](/2012/09/rvm_jewelrybox_homebrew/)）
2.  \[sudo\] npm install -g jshint で、node から JSHint をインストール
3.  メニューの Tools - Command Palette を開いて、「Package Controll: Install Package」を選択して、JSHint を選択

Sublime Text 2 の JSHint の設定は、~/Library/Application Support/Sublime Text 2/Packages/JSHint/.jshintrc にあります。デフォルトの設定を変更したい場合は、これを User のディレクトリにコピーして、それを編集します。

```
cd ~/Library/Application Support/Sublime Text 2/Packages/
cp JSHint/.jshintrc User/JSHint.jshintrc

```

設定は[Documentation -- JSHint](http://www.jshint.com/docs/)を参照。Enforcing options は書き方を制限する系の設定で、Relaxing options は逆に制限を緩める（warning などを出さないように抑制する）系の設定で、Environments は環境関連。jquery: true にすると、JQuery や$などはどこかで global 変数に定義されているものとして扱ってくれます。

Environments で用意されていないものについては、"globals": {"define":false,"require":false}のような感じで、globals で設定すると同じことができます。

設定の中で「maxcomplexity」の設定は興味深くて、 [Cyclomatic complexity](http://ja.wikipedia.org/wiki/%E5%BE%AA%E7%92%B0%E7%9A%84%E8%A4%87%E9%9B%91%E5%BA%A6)を計算して、complexity を設定した値で制限してくれるみたいです。[Testable JavaScript](http://www.amazon.co.jp/gp/product/B00B1WLE92/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=B00B1WLE92&linkCode=as2&tag=yutakayamaguc-22)に書かれていた内容によると、Thomas J. McCabe は、すべてのメソッドは Cyclomatic complexity を 10 以下にすべしとしているそうです。[Software Integrity Blog » Blog Archive » McCabe Cyclomatic Complexity: the proof in the pudding](http://www.enerjy.com/blog/?p=198)の調査では 25 くらいまではバグとの相関関係あまり変わらないみたいですけど、[Project Metrics Help - Complexity metrics](http://www.aivosto.com/project/help/pm-complexity.html)の話だと Cyclomatic complexity が上がってくると、Bad fix probability も上がると。やはり 10 くらいが妥当だという話で、とりあえず 10 に設定してみました。

そしてそして、Sublime Text 2 で保存したときに JSHint を自動的に実行したい場合は、[SublimeOnSaveBuild](https://github.com/alexnj/SublimeOnSaveBuild)を別途インストールします。インストールは、メニューの Tools - Command Palette を開いて、「Package Controll: Install Package」を選択して、「SublimeOnSaveBuild」を選びます。インストールするだけで特に設定は必要ありません。
