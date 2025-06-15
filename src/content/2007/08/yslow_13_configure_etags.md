---
title: "YSLOW (13): Configure ETags"
date: 2007-08-16T16:29:00.000Z
featured:
  image: yslow_13_configure_etags
  author: chatGPT
categories:
  - web
tags:
  - yslow
excerpt: "*   13: Configure ETags  rules for high performance web sitesの十三個目（最後）。ETags（Entity Tags）を設定しよう。ブラウザが持ったキャッシュが古いかどうかを判断するための情報として、構成要素（component：画像とかスクリプトとか）のバージョンをETagで特定させることで、last-modified（修正日）よりも柔軟（で確度の高い）情報を提供することができる。"
---

- [13: Configure ETags](http://developer.yahoo.com/performance/rules.html#etags)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の十三個目（最後）。ETags（Entity Tags）を設定しよう。ブラウザが持ったキャッシュが古いかどうかを判断するための情報として、構成要素（component：画像とかスクリプトとか）のバージョンを ETag で特定させることで、last-modified（修正日）よりも柔軟（で確度の高い）情報を提供することができる。

ETag における問題は、サーバーを特定させるような属性で（ETag が）構成されていると、複数台のサーバーで運用している場合に、キャッシュしたサーバーと、再度アクセスしたときのサーバーの Etag が異なるために、304（not modified）ではなく 200 のレスポンスを返してしまうということ。

複数台で運用しているウェブサービスで、ETag がサーバーを特定させるような書式になっている場合は（デフォルトの書式ではサーバーを特定させるような状態になっている）、ETag を利用すると返って動作が遅くなってしまう。ETag の恩恵に授かれない場合には、ETag を削除してしまった方がいい。
