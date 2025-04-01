---
title: gruntからXcodeプロジェクトのDeployment infoを変更する
date: 2013-12-08T20:00:00.000Z
tags:
- grunt
- ios
- xcode
---
gruntからXcodeプロジェクトのDeployment infoを変更する。Xcodeから変更するのは簡単。でもそれをgruntでtaskとして実行する。こうした作業をgrunt taskで行うメリットは、繰り返し行う作業の場合は、それを自動化できるという点。  

<!-- more -->
  
![](http://farm4.staticflickr.com/3680/11268544774_8985928bc5_o.png)

AppName.xcodeprojのパッケージの中には、project.pbxprojというファイルがあって、ここにXcodeのプロジェクト関連の設定が入っています。[node-xcode](https://github.com/alunny/node-xcode)というスクリプトはこのproject.pbxprojの内容をパースして、内容を更新保存させることができます。全体のスクリプトは[Gist](https://gist.github.com/memolog/7855866)に（ローカルタスクとして動くようになっている）。

```javascript
    var xcode = require('xcode');
    var _ = require('lodash') || grunt.util._;
    var fs = require('fs');

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
          bs['IPHONEOS_DEPLOYMENT_TARGET'] = '6.0';
          bs['TARGETED_DEVICE_FAMILY'] = '1';
        }
      });
      
      fs.writeFileSync(path, project.writeSync(), 'utf-8');
      cb();
    });
```

プロジェクトのパースは、xcode.project(path)でproject.pbxprojを指定して、そのあとproject.parse()を実行するだけです。引数にfunctionを渡すと、パース実行後にproject内容の操作ができます。

project.pbxXCBuildConfigurationSection()では、project.pbxproj内のisa=XCBuildConfigurationになっている設定が配列で返ってきます（通常「Release」と「Debug」が、プロジェクトとビルドごとに一つずつで計4つくるはず）。

設定本体は「buildSettings」というオブジェクトに含まれています。Deployment targetの設定は「IPHONEOS\_DEPLOYMENT\_TARGET」という名前で入っているので、そのkeyの値を変更する。「Devices」の設定は「TARGETED\_DEVICE\_FAMILY」。このあたりの名前はproject.pbxprojをテキストエディタで開いてみると、だいたいわかります。

それで内容の操作をしたあとに、fs.writeFileSync(path, project.writeSync(), 'utf-8');をして、内容を上書きして終了します。最後のcb()は、[Gruntタスク内のthis.async](http://gruntjs.com/api/inside-tasks)を実行して、タスクが完了させています。

という（雑すぎてあとで自分で思い出せるのか不安な）メモ。
