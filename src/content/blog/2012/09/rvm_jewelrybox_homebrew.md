---
title: RVM / JewelryBox / Homebrew をインストール
date: 2012-09-08T12:39:03.000Z
categories:
- web
tags:
- ruby
---
RVM（Ruby version manager）はMacでデフォルトのバージョン以外のRubyをインストールするときに便利。JewelryBoxはRVMのGUIツールでインストールしたRubyを可視化してくれる。Homebrewはパッケージマネージャーで面倒なインストールを楽にしてくれる。これらをインストールしたので、そのメモ。

<!-- more -->

### Homebrewのインストール

[HomeBrew](http://mxcl.github.com/homebrew/)のサイトに書いてある通りにターミナルで下記を実行

```
ruby <(curl -fsSkL raw.github.com/mxcl/homebrew/go)

```

### JewelryBoxのインストール

[JewelryBox](http://unfiniti.com/software/mac/jewelrybox)のサイトにある[Get the OS X version now!](http://jewelrybox.unfiniti.com/)のリンクをたどって、表示されたページにあるダウンロードボタンから、JewelryBoxのディスクイメージをダウンロード。そしてインストール。

### RVMのインストール

JewelryBoxを起動したら、RVMをインストールするかどうかを尋ねてくるので、インストールを実行する。

### RVM requirements関連をインストール

RVMでRubyをインストールする前に使用するときに必要なものをHomebrewを使ってインストール。下記のコマンドをターミナルで実行（JewerlyBoxのDashboardのrelease noteに書いてあるコマンド）。

```
brew install libksba

```

```
brew update
brew tap homebrew/dupes
brew install autoconf automake apple-gcc42
rvm pkg install openssl

```

上のは、1.9.3を使用するときに必要なもの。下のは、Xcode4.2以降でなくなってしまった、Rubyをコンパイルするときに必要なもの。

### 1.9.3をインストールしてデフォルトにする

JewelryBoxの「Add Ruby」のメニューから、「ruby-1.9.3-p194」を選択してインストールを実行。インストール後にManage Rubiesのメニューを開いて、Optionsの項目にある「Set As Default Ruby」のボタンを押す。

これでMacにデフォルトで入っている1.8.7の環境を壊すことなく、1.9.3を使用できるようになりましたと。
