---
title: Cordovaプロジェクトをアーカイブしたときにエラー
date: 2013-12-05T03:30:00.000Z
categories:
- web
tags:
- phonegap
- xcode
---
Cordova/PhoneGapで作成したXcodeのプロジェクトをアーカイブしようとしたときに下記のようなエラーが発生するようになりまして。

```none
Stripping /Users/me/Library/Developer/Xcode/DerivedData/AppName-fiikgzftwgndirfiyeacmuhhgnft/Build/Intermediates/ArchiveIntermediates/AppName/IntermediateBuildFilesPath/UninstalledProducts/libCordova.a

<!-- more -->
    cd /Users/me/path/to/AppName/platforms/ios/CordovaLib
    setenv PATH "/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin:/Applications/Xcode.app/Contents/Developer/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/strip -S /Users/me/Library/Developer/Xcode/DerivedData/AppName-fiikgzftwgndirfiyeacmuhhgnft/Build/Intermediates/ArchiveIntermediates/AppName/IntermediateBuildFilesPath/UninstalledProducts/libCordova.a

/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/strip: can't open temporary file: (null) (Bad address)
Command /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/strip failed with exit code 1

```

どうもCordovaLibのStrip Linked Productのプロセスで、Strippingするときにtemporary fileを開くところで失敗しているみたい。なので、CordovaLibの「Strip Linked Product」を「No」に設定すると回避できる。  
  
![](http://farm6.staticflickr.com/5546/11203619224_9584d6cf87_o.png)

根本的にはtmpディレクトリにアクセスできないのが原因のようなので、/private/tmpのディレクトリのパーミッションを変更すればエラーが発生しなくなる。tmpディレクトリのパーミションを変更した記憶はないのだけど...

```bash
cd /private
sudo chmod 777 tmp
sudo chmod +t tmp
```

ほかの人や他のMacではこのパーミッションであったので、設定自体は問題ないと思いますけど、変えた記憶はないんだよなあ。

というメモ。
