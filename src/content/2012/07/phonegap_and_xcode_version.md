---
title: PhoneGapとXcode
date: 2012-07-16T13:45:00.000Z
categories:
  - web
tags:
  - phonegap
  - xcode
excerpt: "機会があってXcodeのバージョンとインストールできるPhoneGapの現在の組み合わせを調べてみました（2012/7/16現在）。4.2については現状ではissueがあって1.9.0をインストールしてもビルドでエラーになる。"
---

機会があって[Xcode](https://developer.apple.com/xcode/)のバージョンとインストールできる[PhoneGap](http://phonegap.com/)の現在の組み合わせを調べてみました（2012/7/16 現在）。4.2 については現状では issue があって 1.9.0 をインストールしてもビルドでエラーになる。

Xcode

PhoneGap

4.3.3 (for Lion)

1.9.0

4.2 (for Snow Leopard)

1.8.1

3.2.6 (for Snow Leopard)

1.8.1

Xcode のバージョン 4 での現在（2012/7/16）の最新は 4.3.3 (for Lion)で、Snow Leopard には 4.2 までが用意されています。ただし、Snow Leopard 用の 4.2 は、どうも Developer 登録しているアカウントでないとダウンロードすることができない雰囲気（探しても「4.2 for Snow Leopard」は見つからない）。Developer 登録していない場合は、3.x の最後が 3.2.6 なので、3.2.6 になるかなと思います。

PhoneGap の 1.9.0 では[\[#CB-957\] iOS Upgrade Guide Migration - ASF JIRA](https://issues.apache.org/jira/browse/CB-957)という issue で Xcode4 以上が requirement として明示されるようになっているので、Xcode 3.2.6 では 1.8.1 が使えるものとしては最新となります。1.9.0 をインストールしてプロジェクトを作成しても、ビルド時に下記のようなエラーが発生する。

```
clang: error: no such file or directory:
'/Users/xxx/Documents/CordovaLib/build/Debug-iphonesimulator/libCordova.a'
Command /Developer/Platforms/iPhoneSimulator.platform/Developer/usr/bin/clang
failed with exit code 1

```

Xcode 4.2 については、上記の問題は発生しないのですが、下記のようなエラーが発生するために、現状では使用できません。

```
/Users/xxx/Documents/CordovaLib/Classes/CDVFile.m:540:123:
error: use of undeclared identifier 'NSURLIsExcludedFromBackupKey'
ok = [url setResourceValue: [NSNumber numberWithBool:
[iCloudBackupExtendedAttributeValue boolValue]]
forKey: NSURLIsExcludedFromBackupKey error:&error];

```

これについては[\[#CB-989\] dyld: Symbol not found: \_NSURLIsExcludedFromBackupKey - ASF JIRA](https://issues.apache.org/jira/browse/CB-989)で扱われていて、どうも iOS5.0 以下のシミュレーターが対象になる問題らしい（Snow Leopard の iOS の最新バージョンは 5.0）。4.3.3 には iOS5.1 のシミュレーターが入っているので 1.9.0 が使用できる。

ただ、この issue はすでに fix していて、7/20 の PhoneGap Day にあわせてリリースされる予定の 2.0.0 では解決される見込み。
