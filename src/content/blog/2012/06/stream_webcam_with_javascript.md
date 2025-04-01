---
title: JavascriptでWebカメラを動かす
date: 2012-06-24T12:56:00.000Z
categories:
- web
tags:
- javascript
---
[Stream Your Webcam to a Browser in JavaScript](http://www.sitepoint.com/stream-your-webcam-to-a-browser-in-javascript/)というSitepointの記事で、Operaがバージョン12でgetUserMediaに対応したという話が掲載されていて、サンプルのJavascriptが載っていたので試してみました。シンプルなJavascriptでWebカメラが動くというところが面白い。

<!-- more -->

getUserMediaの仕様は[W3Cのサイトを参照](http://dev.w3.org/2011/webrtc/editor/getusermedia.html#dom-navigator-getusermedia)。良く分からなかったけど...

上述のサイトを参考にすると、第一引数に使用するメディアのタイプを指定して、第二引数にgetUserMediaの実行に成功した場合に実行される処理が入り、第三引数に失敗した場合に実行される処理が入る。

getUserMediaを実行するときにはユーザーにWebカメラを使用するための許可が求められる（Prompts the user for permission to use their Web cam or other video or audio input）。ので、ユーザーが使用を許可した場合は第二引数の処理が動き、拒否した場合は第三引数の処理が動く、のが典型的な動きになる。

```
navigator.getUserMedia(constraints, success, failure)

```

see also [Bruce Lawson’s personal site  : Specifying which camera in getUserMedia](http://www.brucelawson.co.uk/2012/specifying-which-camera-in-getusermedia/)
