---
title: iOS7のSafariでremote debuggingできない
date: 2013-09-25T15:30:00.000Z
categories:
  - web
tags:
  - ios
  - safari
excerpt: "iOS7のSafariでremote debuggingをしようとすると、inspect内容が途中で戻ってこなかったり、styleの情報が取得できなかったりする。  Safari on iOS 7 and HTML5: problems, changes and new APIs | Breaking the Mobile Webによると、Safariが6.1じゃないとダメらしい。でも、6.1はプレビュー版でしか使えない（現在の最新は6.0.5）。"
---

iOS7 の Safari で remote debugging をしようとすると、inspect 内容が途中で戻ってこなかったり、style の情報が取得できなかったりする。

[Safari on iOS 7 and HTML5: problems, changes and new APIs | Breaking the Mobile Web](http://www.mobilexweb.com/blog/safari-ios7-html5-problems-apis-review)によると、Safari が 6.1 じゃないとダメらしい。でも、6.1 は[プレビュー版](https://developer.apple.com/downloads/index.action?name=Safari%206.1)でしか使えない（現在の最新は 6.0.5）。

とりあえずプレビュー版で試したら問題なく inspect できるようになりました。

というメモ。6.1 のリリースはいつかな。
