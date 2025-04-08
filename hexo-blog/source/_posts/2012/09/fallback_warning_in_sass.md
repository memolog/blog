---
title: Sass&#x3a; Fallbackでpollingしているとwarning
date: 2012-09-25T13:03:56.000Z
categories:
- web
tags:
- ruby
- sass
---
Sassを--watchで動かしているときに下記のようなwarningが発生する。

>>\> Sass is watching for changes. Press Ctrl-C to stop.
WARNING: Listen has fallen back to polling, learn more at https://github.com/guard/listen#fallback.

<!-- more -->

詳しくは調べていないけど、内容的にファイルの変更をlistenするための仕組みが動いていなくて、Fallbackとしてpollingするかたちになっている、ということのよう。pollingの状態になっていると変更は一定間隔で反映されるようになる、と思う。pollingだから。なので少し反応が鈍い感じになる。その上、私のMacだとCPUをかなり使う。たぶん頻繁にpollingするから。

メッセージにある [guard/listen ? GitHub](https://github.com/guard/listen)がローカルにインストールされていなかったので、とりあえずgem install listenでインストールしてみた。そうすると下記のようなdependencyのwarningが表示。

>>\> Sass is watching for changes. Press Ctrl-C to stop.
\[Listen warning\]:
  Missing dependency 'rb-fsevent' (version '~> 0.9.1')!
  Please run the following to satisfy the dependency:
    gem install --version '~> 0.9.1' rb-fsevent
  
  For a better performance, it's recommended that you satisfy the missing dependency.
  Listen will be polling changes. Learn more at https://github.com/guard/listen#polling-fallback.

なので、gem install rb-fsevent を一緒にインストール。そうしたらとりあえずwarningは解消されましたと。少し様子を見た感じではCPUを無用に食う状態も解消されている雰囲気。
