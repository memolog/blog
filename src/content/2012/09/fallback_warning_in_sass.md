---
title: Sass：Fallbackでpollingしているとwarning
date: 2012-09-25T13:03:56.000Z
categories:
  - web
tags:
  - ruby
  - sass
excerpt: "Sassを--watchで動かしているときに下記のようなwarningが発生する。"
---

Sass を--watch で動かしているときに下記のような warning が発生する。

> > \> Sass is watching for changes. Press Ctrl-C to stop.
> > WARNING: Listen has fallen back to polling, learn more at https://github.com/guard/listen#fallback.

詳しくは調べていないけど、内容的にファイルの変更を listen するための仕組みが動いていなくて、Fallback として polling するかたちになっている、ということのよう。polling の状態になっていると変更は一定間隔で反映されるようになる、と思う。polling だから。なので少し反応が鈍い感じになる。その上、私の Mac だと CPU をかなり使う。たぶん頻繁に polling するから。

メッセージにある [guard/listen ? GitHub](https://github.com/guard/listen)がローカルにインストールされていなかったので、とりあえず gem install listen でインストールしてみた。そうすると下記のような dependency の warning が表示。

> > \> Sass is watching for changes. Press Ctrl-C to stop.
> > \[Listen warning\]:
> > Missing dependency 'rb-fsevent' (version '~> 0.9.1')!
> > Please run the following to satisfy the dependency:

    gem install --version '~> 0.9.1' rb-fsevent

For a better performance, it's recommended that you satisfy the missing dependency.
Listen will be polling changes. Learn more at https://github.com/guard/listen#polling-fallback.

なので、gem install rb-fsevent を一緒にインストール。そうしたらとりあえず warning は解消されましたと。少し様子を見た感じでは CPU を無用に食う状態も解消されている雰囲気。
