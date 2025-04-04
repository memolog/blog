---
title: Cordovaプロジェクトをアーカイブしたときにエラー
date: 2013-12-05T03:30:00.000Z
categories:
  - web
tags:
  - phonegap
  - xcode
excerpt: "Cordova/PhoneGapで作成したXcodeのプロジェクトをアーカイブしようとしたときに下記のようなエラーが発生するようになりまして。  ```none Stripping /Users/me/Library/Developer/Xcode/DerivedData/AppName-fiikgzftwgndirfiyeacmuhhgnft/Build/Intermediates/ArchiveIntermediates/AppName/IntermediateBuildFilesPath/UninstalledProducts/libCordova.a"
---

Cordova/PhoneGap で作成した Xcode のプロジェクトをアーカイブしようとしたときに下記のようなエラーが発生するようになりまして。

```
Stripping /Users/me/Library/Developer/Xcode/DerivedData/AppName-fiikgzftwgndirfiyeacmuhhgnft/Build/Intermediates/ArchiveIntermediates/AppName/IntermediateBuildFilesPath/UninstalledProducts/libCordova.a


    cd /Users/me/path/to/AppName/platforms/ios/CordovaLib
    setenv PATH "/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin:/Applications/Xcode.app/Contents/Developer/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/strip -S /Users/me/Library/Developer/Xcode/DerivedData/AppName-fiikgzftwgndirfiyeacmuhhgnft/Build/Intermediates/ArchiveIntermediates/AppName/IntermediateBuildFilesPath/UninstalledProducts/libCordova.a

/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/strip: can't open temporary file: (null) (Bad address)
Command /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/strip failed with exit code 1

```

どうも CordovaLib の Strip Linked Product のプロセスで、Stripping するときに temporary file を開くところで失敗しているみたい。なので、CordovaLib の「Strip Linked Product」を「No」に設定すると回避できる。

![](http://farm6.staticflickr.com/5546/11203619224_9584d6cf87_o.png)

根本的には tmp ディレクトリにアクセスできないのが原因のようなので、/private/tmp のディレクトリのパーミッションを変更すればエラーが発生しなくなる。tmp ディレクトリのパーミションを変更した記憶はないのだけど...

```bash
cd /private
sudo chmod 777 tmp
sudo chmod +t tmp
```

ほかの人や他の Mac ではこのパーミッションであったので、設定自体は問題ないと思いますけど、変えた記憶はないんだよなあ。

というメモ。
