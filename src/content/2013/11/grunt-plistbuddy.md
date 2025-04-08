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
excerpt: '![Xcode_General_setting](http://www.flickr.com/photos/91221720@N00/11110211616 "Xcode_General_setting by Yutaka Yamaguchi, on Flickr")'
---

[![Xcode_General_setting](http://farm4.staticflickr.com/3709/11110211616_9223de9a3f.jpg)](http://www.flickr.com/photos/91221720@N00/11110211616 "Xcode_General_setting by Yutaka Yamaguchi, on Flickr")

Xcode プロジェクトの Version(CFBundleShortVersionString)、Build(CFBundleVersion）の値は Xcode の UI で簡単に変更することができます。しかし、それを Grunt タスクで変更するようにしたい。ということで、そのための Grunt タスクを作成しました。[grunt-plistbuddy](https://npmjs.org/package/grunt-plistbuddy)です。

Xcode プロジェクトの Version/Build の文字は、info.plist(AppName-Info.plist とか)で管理されています。PlistBuddy は、plist ファイルを扱うためのコマンドで、詳細は[PlistBuddy(8) Mac OS X Manual Page](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man8/PlistBuddy.8.html)に書かれています。

grunt-plistbuddy のタスクは PlistBuddy を実行することで plist に記述された値を変更します。

Xcode プロジェクトの Build の値を変更する場合は下記のような感じに設定します。あ、grunt.initConfig の中で。

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

Version の値も同様に変更することができます。Xcode 上で Version の値が入っていない場合は、あらかじめ追加しておく必要があります（もしくは PlistBuddy で Add を実行する）。

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
