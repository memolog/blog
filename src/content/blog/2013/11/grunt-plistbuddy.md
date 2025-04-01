---
title: gruntでXcodeプロジェクトのVersion/Buildを変更する
date: 2013-11-29T03:30:00.000Z
categories:
- web
tags:
- grunt
- ios
- javascript
- xcode
---
[![Xcode_General_setting](http://farm4.staticflickr.com/3709/11110211616_9223de9a3f.jpg)](http://www.flickr.com/photos/91221720@N00/11110211616 "Xcode_General_setting by Yutaka Yamaguchi, on Flickr")  

<!-- more -->
XcodeプロジェクトのVersion(CFBundleShortVersionString)、Build(CFBundleVersion）の値はXcodeのUIで簡単に変更することができます。しかし、それをGruntタスクで変更するようにしたい。ということで、そのためのGruntタスクを作成しました。[grunt-plistbuddy](https://npmjs.org/package/grunt-plistbuddy)です。

XcodeプロジェクトのVersion/Buildの文字は、info.plist(AppName-Info.plistとか)で管理されています。PlistBuddyは、plistファイルを扱うためのコマンドで、詳細は[PlistBuddy(8) Mac OS X Manual Page](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man8/PlistBuddy.8.html)に書かれています。

grunt-plistbuddyのタスクはPlistBuddyを実行することでplistに記述された値を変更します。

XcodeプロジェクトのBuildの値を変更する場合は下記のような感じに設定します。あ、grunt.initConfigの中で。

```javascript
plistbuddy: {
  version: {
    method: 'Set',
    entry: ':CFBundleVersion',
    value: '1.0.1',
    src: 'AppName-Info.plist'
  }
}
```

これは下記のようなコマンドを実行するのと同じになります。

```bash
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion 1.0.1" yourApp-Info.plist
```

Versionの値も同様に変更することができます。Xcode上でVersionの値が入っていない場合は、あらかじめ追加しておく必要があります（もしくはPlistBuddyでAddを実行する）。

```javascript
plistbuddy: {
  versionShort: {
    method: 'Set',
    entry: ':CFBundleShortVersionString',
    value: '1.0',
    src: 'AppName-Info.plist'
  }
}
```

詳細は[memolog/grunt-plistbuddy](https://github.com/memolog/grunt-plistbuddy)もご参考いただければ。

というメモ。
