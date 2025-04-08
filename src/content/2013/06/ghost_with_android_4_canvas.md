---
title: Android 4.1/4.2 でCanvasを使うとゴーストが発生する
date: 2013-06-17T20:25:00.000Z
categories:
  - web
tags:
  - android
excerpt: "Issue 41312 - android - Html5 Canvas drawing issue - duplicated drawing - when parent has overflow:hidden - Android - An Open Handset Alliance Project - Google Project Hostingという問題があるようで、Android 4.1/4.2のブラウザ（stock browser）でCanvasを使用すると、描画が二重に発生する。"
---

[Issue 41312 - android - Html5 Canvas drawing issue - duplicated drawing - when parent has overflow:hidden - Android - An Open Handset Alliance Project - Google Project Hosting](http://code.google.com/p/android/issues/detail?id=41312)という問題があるようで、Android 4.1/4.2 のブラウザ（stock browser）で Canvas を使用すると、描画が二重に発生する。

解決方法は、oveflow:hidden をなくす。もしくは[overflow property](http://www.w3.org/TR/css-overflow-3/#overflow-properties)の initial である overflow:visible に設定するとよさそう。わたしの場合は canvas を position:absolute にしてもしなくても現象に変更はなかった。

個人的に確認した限りでは、Google Chrome では発生しない様子。
