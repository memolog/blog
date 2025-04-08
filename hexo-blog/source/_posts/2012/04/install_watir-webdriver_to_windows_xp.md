---
title: Windows XPにwatir-webdriverをインストールする
date: 2012-04-12T13:38:21.000Z
categories:
- software testing
tags:
- watir-webdriver
---
gem installするだけで簡単だろうと思って始めてみたら意外と面倒だったのでメモ。Rubyは[RubyInstallerのDownloadページ](http://rubyinstaller.org/downloads)から「Ruby 1.8.7-p358」をダウンロードしてインストールしました。

<!-- more -->

watir-webdriverのインストール
----------------------

とりあえず下記のコマンドを実行

```
gem install watir-webdriver

```

ひとつふたつの依存モジュールのインストールに成功したあとに問題発生。

### ffi-1.0.11がインストールできない

ffiの最新が現在1.0.11ですが、これはWindows XPには「Please update your PATH to include build tools or download the DevKit..」というエラーが発生して入りませんでした。このエラーはDevKitをインストールする主旨のようですが、インストールしても最新のffiはインストールできなかったので、1.0.9をインストールして回避しました。

```
gem install ffi -v 1.0.9

```

これで再度、gem install watir-webdriverを実行。今度はインストールを完了させることができました。

DevKitはたぶん不要ですが、一応インストールのメモ。[RubyInstallerのDownloadページ](http://rubyinstaller.org/downloads)から DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe をダウンロード。そのあと、C:\\Program Files\ に「devkit」というフォルダを新規作成して、ダウンロードしたexeファイルを解凍した中身を保管。コマンドプロンプトを起動して、下記の操作を実行。

```
cd C:\Program Files\devkit
ruby dk.rb init
ruby dk.rb install

```

### multi_jsonがエラーを出す

watir-webdriverのインストールは成功するものの、Watir::Browser.newでFirefoxが起動したら「multi\_json-1.2.0... `to\_json': wrong argument type Hash ...」とかいうエラーが発生... どうやらto_jsonを実行する時のencodeに問題があるようですが、詳細はあまり調べてません。1.2.0から順番に一つ前のバージョンをインストールして、起動して、、ということを繰り返した結果、1.0.4なら大丈夫の様子。

```
gem unistall multi_json
gem install multi_json -v 1.0.4

```

### multi_jsonがさらにエラーを出す

multi\_jsonが「`to\_json': source sequence is illegal/malformed (JSON:GeneratorError)」とかいうエラーを出す場合があって、これは保存しているフォルダのパスに全角文字のフォルダが含まれているからみたい。「デスクトップ」とか...

保存しているフォルダの場所を「My Documents」に変更して回避... 以上の方法でとりあえずWindows XPでもwatir-webdriverが動くようになりました。とりあえず。

### （蛇足）css_parserのインストール

あと、テストスクリプトの中でcss_parserを使用しているのですが（watir-webdriverの依存モジュールではない）、これも現在最新の1.2.6はXPにインストールできませんでした。「Gem files remain installed in C:/....../json-1.6.6 for inspection」みたいなエラーが発生する。

ので、1.2.5のバージョンをインストールすることで回避しました。これは蛇足。

```
gem install css_parser -v 1.2.5

```
