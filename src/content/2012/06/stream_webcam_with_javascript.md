---
title: JavascriptでWebカメラを動かす
date: 2012-06-24T12:56:00.000Z
categories:
  - web
tags:
  - javascript
excerpt: "Stream Your Webcam to a Browser in JavaScriptというSitepointの記事で、Operaがバージョン12でgetUserMediaに対応したという話が掲載されていて、サンプルのJavascriptが載っていたので試してみました。シンプルなJavascriptでWebカメラが動くというところが面白い。"
---

[Stream Your Webcam to a Browser in JavaScript](http://www.sitepoint.com/stream-your-webcam-to-a-browser-in-javascript/)という Sitepoint の記事で、Opera がバージョン 12 で getUserMedia に対応したという話が掲載されていて、サンプルの Javascript が載っていたので試してみました。シンプルな Javascript で Web カメラが動くというところが面白い。

getUserMedia の仕様は[W3C のサイトを参照](http://dev.w3.org/2011/webrtc/editor/getusermedia.html#dom-navigator-getusermedia)。良く分からなかったけど...

上述のサイトを参考にすると、第一引数に使用するメディアのタイプを指定して、第二引数に getUserMedia の実行に成功した場合に実行される処理が入り、第三引数に失敗した場合に実行される処理が入る。

getUserMedia を実行するときにはユーザーに Web カメラを使用するための許可が求められる（Prompts the user for permission to use their Web cam or other video or audio input）。ので、ユーザーが使用を許可した場合は第二引数の処理が動き、拒否した場合は第三引数の処理が動く、のが典型的な動きになる。

```
navigator.getUserMedia(constraints, success, failure)

```

see also [Bruce Lawson’s personal site  : Specifying which camera in getUserMedia](http://www.brucelawson.co.uk/2012/specifying-which-camera-in-getusermedia/)
