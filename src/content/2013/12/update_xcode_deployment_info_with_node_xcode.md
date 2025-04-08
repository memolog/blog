---
title: gruntからXcodeプロジェクトのDeployment infoを変更する
date: 2013-12-08T20:00:00.000Z
tags:
  - grunt
  - ios
  - xcode
excerpt: "gruntからXcodeプロジェクトのDeployment infoを変更する。Xcodeから変更するのは簡単。でもそれをgruntでtaskとして実行する。こうした作業をgrunt taskで行うメリットは、繰り返し行う作業の場合は、それを自動化できるという点。"
---

grunt から Xcode プロジェクトの Deployment info を変更する。Xcode から変更するのは簡単。でもそれを grunt で task として実行する。こうした作業を grunt task で行うメリットは、繰り返し行う作業の場合は、それを自動化できるという点。

![](http://farm4.staticflickr.com/3680/11268544774_8985928bc5_o.png)

AppName.xcodeproj のパッケージの中には、project.pbxproj というファイルがあって、ここに Xcode のプロジェクト関連の設定が入っています。[node-xcode](https://github.com/alunny/node-xcode)というスクリプトはこの project.pbxproj の内容をパースして、内容を更新保存させることができます。全体のスクリプトは[Gist](https://gist.github.com/memolog/7855866)に（ローカルタスクとして動くようになっている）。

```javascript
var xcode = require("xcode");
var _ = require("lodash") || grunt.util._;
var fs = require("fs");

var path = this.data.src;
var project = xcode.project(path);
var cb = this.async();

project.parse(function (err) {
  if (err) {
    grunt.log.write(err);
  }

  var XCBuildConfigurationSections = project.pbxXCBuildConfigurationSection();
  _.forEach(XCBuildConfigurationSections, function (section) {
    if (section.buildSettings) {
      var bs = section.buildSettings;
      bs["IPHONEOS_DEPLOYMENT_TARGET"] = "6.0";
      bs["TARGETED_DEVICE_FAMILY"] = "1";
    }
  });

  fs.writeFileSync(path, project.writeSync(), "utf-8");
  cb();
});
```

プロジェクトのパースは、xcode.project(path)で project.pbxproj を指定して、そのあと project.parse()を実行するだけです。引数に function を渡すと、パース実行後に project 内容の操作ができます。

project.pbxXCBuildConfigurationSection()では、project.pbxproj 内の isa=XCBuildConfiguration になっている設定が配列で返ってきます（通常「Release」と「Debug」が、プロジェクトとビルドごとに一つずつで計 4 つくるはず）。

設定本体は「buildSettings」というオブジェクトに含まれています。Deployment target の設定は「IPHONEOS_DEPLOYMENT_TARGET」という名前で入っているので、その key の値を変更する。「Devices」の設定は「TARGETED_DEVICE_FAMILY」。このあたりの名前は project.pbxproj をテキストエディタで開いてみると、だいたいわかります。

それで内容の操作をしたあとに、fs.writeFileSync(path, project.writeSync(), 'utf-8');をして、内容を上書きして終了します。最後の cb()は、[Grunt タスク内の this.async](http://gruntjs.com/api/inside-tasks)を実行して、タスクが完了させています。

という（雑すぎてあとで自分で思い出せるのか不安な）メモ。
