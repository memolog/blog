---
title: iOS7のSafariでremote debuggingできない
date: 2013-09-25T15:30:00.000Z
categories:
- web
tags:
- ios
- safari
---
iOS7のSafariでremote debuggingをしようとすると、inspect内容が途中で戻ってこなかったり、styleの情報が取得できなかったりする。

[Safari on iOS 7 and HTML5: problems, changes and new APIs | Breaking the Mobile Web](http://www.mobilexweb.com/blog/safari-ios7-html5-problems-apis-review)によると、Safariが6.1じゃないとダメらしい。でも、6.1は[プレビュー版](https://developer.apple.com/downloads/index.action?name=Safari&#x25;206.1)でしか使えない（現在の最新は6.0.5）。

<!-- more -->

とりあえずプレビュー版で試したら問題なくinspectできるようになりました。

というメモ。6.1のリリースはいつかな。
