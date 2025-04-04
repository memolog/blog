---
title: matchdepを使ってgrunt.loadNpmTasksする
date: 2013-05-06T05:38:00.000Z
categories:
  - web
tags:
  - grunt
excerpt: "matchdepを使用してgrunt.loadNpmTasksを毎回記述しないで済むようにするという話。`npm install --save-dev` でインストールしたgrunt pluginをGruntで使用する場合、Gruntfile.jsでgrunt.loadNpmTasksを使ってタスクのloadをする必要があります。"
---

matchdep を使用して grunt.loadNpmTasks を毎回記述しないで済むようにするという話。`npm install --save-dev` でインストールした grunt plugin を Grunt で使用する場合、Gruntfile.js で[grunt.loadNpmTasks](http://gruntjs.com/api/grunt#grunt.loadnpmtasks)を使ってタスクの load をする必要があります。

しかし、grunt plugin を追加するたびに grunt.loadNpmTasks を Gruntfile に追加するのはわずらわしいし、お試しで追加した plugin とか使わなくなった plugin を削除するときに loadNpmTasks をいちいち除かないといけないのもまた面倒くさい。

ので、[matchdep](https://npmjs.org/package/matchdep)を使用する。matchdep については[matchdep を使って Grunt.js のプラグインを自動ロードする | Re\* Programming](http://nantokaworks.com/?p=955)で簡潔に解説されています。

```javascript
require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
```

上記のように設定すると、package.json の devDependencies から、マッチングした対象の名前を返してくれます。そして forEach で grunt.loadNpmTasks に渡すと。devDependencies に grunt plugin を追加すれば、loadNpmTasks を Gruntfile に記述しなくても、task を load してくれるようになります。

ただ、[grunt-template-jasmine-requirejs](https://github.com/jsoverson/grunt-template-jasmine-requirejs)のように、task のない grunt plugin をインストールしていると、

```bash
>> Local Npm module "grunt-template-jasmine-requirejs" not found. Is it installed?
```

という warning が発生するので、個人的には

```javascript
require("matchdep")
  .filterDev("grunt-*")
  .forEach(function (name) {
    if (!/template/.test(name)) {
      grunt.loadNpmTasks(name);
    }
  });
```

という感じで、名前に template がある場合は、task はないだろうということにして、loadNpmTasks の対象から外すようにしています。もっと良い方法があるかもしれませんけど、今のところはこれで。
