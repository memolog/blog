---
title: PhoneGap：Androidでカメラを使用するとアプリが止まる
date: 2012-12-21T12:11:00.000Z
categories:
  - web
tags:
  - phonegap
excerpt: "PhoneGapからAndroidでカメラを起動して撮影すると、たまにアプリが止まってしまうという問題について。  これはカメラが起動している間は、PhoneGapのアプリ本体はバックグラウンドにいるので、その間にガベージコレクタがメモリを解放しようとして、アプリ本体のアクティビティをkillするのだそう（おそらくカメラ機能はメモリをたくさん使う）。"
---

PhoneGap から Android でカメラを起動して撮影すると、たまにアプリが止まってしまうという問題について。

これは[\[#CB-1513\] Cordova app gets killed by garbage collector when out of memory due to camera - ASF JIRA](https://issues.apache.org/jira/browse/CB-1513)に書いてある内容によると、カメラが起動している間は、PhoneGap のアプリ本体はバックグラウンドにいるので、その間にガベージコレクタがメモリを解放しようとして、アプリ本体のアクティビティを kill するのだそう（おそらくカメラ機能はメモリをたくさん使う）。

それで[Foreground Camera Plugin for Phonegap (Cordova) 2.1.0](http://code.google.com/p/foreground-camera-plugin/)という plugin が紹介されていて、これはカメラ起動中にアプリをバックグラウンドに移動させないというものらしい。まだ試してみていないですけど、試す価値はあるかもしれません。別の問題が発生するかもしれませんけど。

そして Cordova(phonegap)のコア機能の fix は見送られた模様です。フォトライブラリから写真を選択する分には、アプリが落ちることはないみたいです。試している限りでは（[\[#CB-1835\] Camera.getPicture gives error when get a picture from photo library with spaces in its name on Android](https://issues.apache.org/jira/browse/CB-1835)という問題があるのですが、2.3.0 では解決される）。
