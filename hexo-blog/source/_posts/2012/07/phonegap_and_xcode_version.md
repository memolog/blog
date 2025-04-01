---
title: PhoneGapとXcode
date: 2012-07-16T13:45:00.000Z
categories:
- web
tags:
- phonegap
- xcode
---
機会があって[Xcode](https://developer.apple.com/xcode/)のバージョンとインストールできる[PhoneGap](http://phonegap.com/)の現在の組み合わせを調べてみました（2012/7/16現在）。4.2については現状ではissueがあって1.9.0をインストールしてもビルドでエラーになる。

<!-- more -->

Xcode

PhoneGap

4.3.3 (for Lion)

1.9.0

4.2 (for Snow Leopard)

1.8.1

3.2.6 (for Snow Leopard)

1.8.1

Xcodeのバージョン4での現在（2012/7/16）の最新は4.3.3 (for Lion)で、Snow Leopardには4.2までが用意されています。ただし、Snow Leopard用の4.2は、どうもDeveloper登録しているアカウントでないとダウンロードすることができない雰囲気（探しても「4.2 for Snow Leopard」は見つからない）。Developer登録していない場合は、3.xの最後が3.2.6なので、3.2.6になるかなと思います。

PhoneGapの1.9.0では[\[#CB-957\] iOS Upgrade Guide Migration - ASF JIRA](https://issues.apache.org/jira/browse/CB-957)というissueでXcode4以上がrequirementとして明示されるようになっているので、Xcode 3.2.6では1.8.1が使えるものとしては最新となります。1.9.0をインストールしてプロジェクトを作成しても、ビルド時に下記のようなエラーが発生する。

```
clang: error: no such file or directory: 
'/Users/xxx/Documents/CordovaLib/build/Debug-iphonesimulator/libCordova.a'
Command /Developer/Platforms/iPhoneSimulator.platform/Developer/usr/bin/clang
failed with exit code 1

```

Xcode 4.2については、上記の問題は発生しないのですが、下記のようなエラーが発生するために、現状では使用できません。

```
/Users/xxx/Documents/CordovaLib/Classes/CDVFile.m:540:123: 
error: use of undeclared identifier 'NSURLIsExcludedFromBackupKey'
ok = [url setResourceValue: [NSNumber numberWithBool: 
[iCloudBackupExtendedAttributeValue boolValue]] 
forKey: NSURLIsExcludedFromBackupKey error:&error];

```

これについては[\[#CB-989\] dyld: Symbol not found: _NSURLIsExcludedFromBackupKey - ASF JIRA](https://issues.apache.org/jira/browse/CB-989)で扱われていて、どうもiOS5.0以下のシミュレーターが対象になる問題らしい（Snow LeopardのiOSの最新バージョンは5.0）。4.3.3にはiOS5.1のシミュレーターが入っているので1.9.0が使用できる。

ただ、このissueはすでにfixしていて、7/20のPhoneGap Dayにあわせてリリースされる予定の2.0.0では解決される見込み。
