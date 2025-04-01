---
title: Grunt事始め
date: 2013-04-28T04:25:00.000Z
categories:
- web
tags:
- grunt
- javascript
---
はじめてGruntを利用するときに行うこと。詳しくは[Getting started - Grunt: The JavaScript Task Runner](http://gruntjs.com/getting-started)を参照。

<!-- more -->

Gruntについて
---------

Gruntはnodeで動作するJavascriptのTask Runnerで、JSHintとかディレクトリのクリーンアップとか、開発中に発生するタスクを簡単に実行できるように整備することができます。

Gruntのinstallにはnpm（Node.jsのパッケージマネージャー）を使用します。Nodeのinstallは、[node.js](http://nodejs.org/download/)からインストーラーをダウンロードするか、[homebrew](http://mxcl.github.io/homebrew/)でインストールする。sudoが必要な場合はsudoする。

```
[sudo] npm install -g grunt-cli

```

設定ファイルの用意
---------

Gruntを使うにあたって、package.jsonと、Gruntfile.jsの二つのファイルを用意します。package.jsonはGruntで使用するplugins(task)をインストールするためのファイル（npm経由でインストールする）で、Gruntfile.jsはtaskを実行するための設定ファイル。

これらのファイルを手作業で作成することもできますが、[grunt-init](http://gruntjs.com/project-scaffolding)で用意しているtemplateで生成して、生成したファイルから不要な箇所を差し引く方が簡単（と思う）。

grunt-initのインストールは下記のような感じ

```
[sudo] npm install -g grunt-init

```

grunt-init用のtemplateは[Installing templates](http://gruntjs.com/project-scaffolding#installing-templates)にいくつか用意されていて、用途にあったものを使用する。Gruntfile.jsを生成するだけなら、[grunt-init-gruntfile](https://github.com/gruntjs/grunt-init-gruntfile)が良くて、Grunt pluginを作成するなら[grunt-init-gruntplugin](https://github.com/gruntjs/grunt-init-gruntplugin)が良さそう。package.jsonも一緒に作成するならとりあえず[grunt-init-commonjs](https://github.com/gruntjs/grunt-init-commonjs)が良いかもしれない。いずれにせよあとで編集すれば良いだけなので、どれでも良いと言えばどれでも良い。

[grunt-init-commonjs](https://github.com/gruntjs/grunt-init-commonjs)で例にすると

```
git clone git@github.com:gruntjs/grunt-init-commonjs.git ~/.grunt-init/commonjs

```

で、templateをダウンロードしてきて（grunt-initで使用するテンプレートは、~/.grunt-init/に入れる）、grunt-initを実行する。grunt-initは、gruntのタスクを実行したいプロジェクトのルートで行う。

```
cd ~/Desktop
mkdir my-project
cd my-project
grunt-init commonjs

```

すると、作成時の設定をいろいろ聞かれるので、いろいろ答える。全部デフォルトでもあとで変更すれば良いので大丈夫。一緒にpackage.jsonも作成されます。

grunt-init-gruntfileを使った場合など、package.jsonを別途作成する場合は

```
cd ~/Desktop/my-project
npm init

```

すれば簡単に作成することができる。

あとは、Gruntfile.jsとpackage.jsonを開いて、不要そうなものを適当に削る。すぐに削除しても後から削除しても良い。そして

```
cd ~/Desktop/my-project
npm install

```

すると、package.jsonに記述されているdevDependenciesなpluginが、node_modulesディレクトリにインストールされます。

Grunt taskの実行
-------------

これで

```
cd ~/Desktop/my-project
grunt jshint

```

と実行すると、Gruntfile.jsに記述されているjshintのタスクが実行されるようになります。
