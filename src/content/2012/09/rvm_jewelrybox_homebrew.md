---
title: RVM / JewelryBox / Homebrew をインストール
date: 2012-09-08T12:39:03.000Z
categories:
  - web
tags:
  - ruby
excerpt: "RVM（Ruby version manager）はMacでデフォルトのバージョン以外のRubyをインストールするときに便利。JewelryBoxはRVMのGUIツールでインストールしたRubyを可視化してくれる。Homebrewはパッケージマネージャーで面倒なインストールを楽にしてくれる。これらをインストールしたので、そのメモ。"
---

RVM（Ruby version manager）は Mac でデフォルトのバージョン以外の Ruby をインストールするときに便利。JewelryBox は RVM の GUI ツールでインストールした Ruby を可視化してくれる。Homebrew はパッケージマネージャーで面倒なインストールを楽にしてくれる。これらをインストールしたので、そのメモ。

### Homebrew のインストール

[HomeBrew](http://mxcl.github.com/homebrew/)のサイトに書いてある通りにターミナルで下記を実行

```
ruby <(curl -fsSkL raw.github.com/mxcl/homebrew/go)

```

### JewelryBox のインストール

[JewelryBox](http://unfiniti.com/software/mac/jewelrybox)のサイトにある[Get the OS X version now!](http://jewelrybox.unfiniti.com/)のリンクをたどって、表示されたページにあるダウンロードボタンから、JewelryBox のディスクイメージをダウンロード。そしてインストール。

### RVM のインストール

JewelryBox を起動したら、RVM をインストールするかどうかを尋ねてくるので、インストールを実行する。

### RVM requirements 関連をインストール

RVM で Ruby をインストールする前に使用するときに必要なものを Homebrew を使ってインストール。下記のコマンドをターミナルで実行（JewerlyBox の Dashboard の release note に書いてあるコマンド）。

```
brew install libksba

```

```
brew update
brew tap homebrew/dupes
brew install autoconf automake apple-gcc42
rvm pkg install openssl

```

上のは、1.9.3 を使用するときに必要なもの。下のは、Xcode4.2 以降でなくなってしまった、Ruby をコンパイルするときに必要なもの。

### 1.9.3 をインストールしてデフォルトにする

JewelryBox の「Add Ruby」のメニューから、「ruby-1.9.3-p194」を選択してインストールを実行。インストール後に Manage Rubies のメニューを開いて、Options の項目にある「Set As Default Ruby」のボタンを押す。

これで Mac にデフォルトで入っている 1.8.7 の環境を壊すことなく、1.9.3 を使用できるようになりましたと。
