---
title: "YSLOW (3): Add an Expires Header"
date: 2007-08-06T15:52:00.000Z
featured:
  image: yslow_3_add_an_expires_header
  author: chatGPT
categories:
  - web
tags:
  - yslow
excerpt: "Expires header を使って構成要素をキャッシュ可能な状態にしよう、という話。"
---

- [3: Add an Expires Header](http://developer.yahoo.com/performance/rules.html#expires)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の三つ目。Expires header を使って構成要素をキャッシュ可能な状態にしよう、という話。キャッシュを持つことによって、キャッシュを読み込んだあとの不必要な HTTP request を減らすことができる。Web サーバーが Apache であるなら、ExpiresDefault の設定を使ってキャッシュする時間を設定することができる。

キャッシュを長く効かせるとファイルを更新してもキャッシュを参照してしまう、という問題が出てきます。なのでファイル名を変更するなどしてキャッシュを参照しないように工夫するとよい。
