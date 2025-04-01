---
title: YSLOW 勉強 &#x3a; 3&#x3a; Add an Expires Header
date: 2007-08-06T15:52:00.000Z
categories:
- web
tags:
- yslow
---
*   [3: Add an Expires Header](http://developer.yahoo.com/performance/rules.html#expires)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の三つ目。Expires headerを使って構成要素をキャッシュ可能な状態にしよう、という話。キャッシュを持つことによって、キャッシュを読み込んだあとの不必要なHTTP requestを減らすことができる。WebサーバーがApacheであるなら、ExpiresDefaultの設定を使ってキャッシュする時間を設定することができる。

<!-- more -->

キャッシュを長く効かせるとファイルを更新してもキャッシュを参照してしまう、という問題が出てきます。なのでファイル名を変更するなどしてキャッシュを参照しないように工夫するとよい。
