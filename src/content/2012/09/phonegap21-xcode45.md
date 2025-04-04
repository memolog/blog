---
title: PhoneGap2.1とXcode4.5でエラー
date: 2012-09-26T03:28:07.000Z
categories:
- web
tags:
- phonegap
---
[PhoneGap](http://www.phonegap.com/)の2.1を使用して作成したプロジェクトを、Xcodeの4.5でRunしたら下記のようなエラーが発生。

```
clang: error: no such file or directory: 

<!-- more -->
'/Users/username/Library/Developer/Xcode/DerivedData/projectname/Build/Products/Debug-iphoneos/libCordova.a'

```

Googleで検索したところによると、[\[#CB-1360\] iOS 6 - bump deployment target support to 4.3, add/remove architectures - ASF JIRA](https://issues.apache.org/jira/browse/CB-1360)で報告されているissueによるものらしくて、[ASF Git Repos - incubator-cordova-ios.git/commitdiff](https://git-wip-us.apache.org/repos/asf?p=incubator-cordova-ios.git;a=commitdiff;h=07b54f14;hp=cf2412b5a0db4c67b144561abd201810e3f5f2a5)の差分を、ダウンロードしてきたPhoneGapのライブラリ（lib/ios/CordovaLib/CordovaLib.xcodeproj/project.pbxproj）に適用すると解消される。

この修正は2.2では含まれるようなので、2.2では問題は発生しない（と思われる）。
