---
title: PhoneGap2.1とXcode4.5でエラー
date: 2012-09-26T03:28:07.000Z
categories:
  - web
tags:
  - phonegap
excerpt: "PhoneGapの2.1を使用して作成したプロジェクトを、Xcodeの4.5でRunしたら下記のようなエラーが発生。  ``` clang: error: no such file or directory:"
---

[PhoneGap](http://www.phonegap.com/)の 2.1 を使用して作成したプロジェクトを、Xcode の 4.5 で Run したら下記のようなエラーが発生。

```
clang: error: no such file or directory:


'/Users/username/Library/Developer/Xcode/DerivedData/projectname/Build/Products/Debug-iphoneos/libCordova.a'

```

Google で検索したところによると、[\[#CB-1360\] iOS 6 - bump deployment target support to 4.3, add/remove architectures - ASF JIRA](https://issues.apache.org/jira/browse/CB-1360)で報告されている issue によるものらしくて、[ASF Git Repos - incubator-cordova-ios.git/commitdiff](https://git-wip-us.apache.org/repos/asf?p=incubator-cordova-ios.git;a=commitdiff;h=07b54f14;hp=cf2412b5a0db4c67b144561abd201810e3f5f2a5)の差分を、ダウンロードしてきた PhoneGap のライブラリ（lib/ios/CordovaLib/CordovaLib.xcodeproj/project.pbxproj）に適用すると解消される。

この修正は 2.2 では含まれるようなので、2.2 では問題は発生しない（と思われる）。
