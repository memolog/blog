---
title: Sublime Text 2 の JSLint から node がみつからない
date: 2013-02-17T20:28:00.000Z
categories:
- web
tags:
- node
- "sublime text 2"
---
Sublime Text 2に[JSLint](https://github.com/darrenderidder/Sublime-JSLint)というpackageをインストールしているのですが、これが下記のようなno such file or directoryでエラーになる。

<!-- more -->

```
[Errno 2] No such file or directory
[cmd:  [u'node', u'/Users/.../Library/Application Support/
Sublime Text 2/Packages/JSLint/linter.js', u'--sloppy', 
u'--indent', u'2', u'--node', u'--nomen', u'--vars', 
u'--plusplus', u'--stupid', u'--todo', u'foobar.js']]
[dir:  /Users/...]
[path: /usr/bin:/bin:/usr/sbin:/sbin]
[Finished]

```

どうやらhomebrewでインストールしたnodeが、/usr/local/bin/nodeに存在していて、/usr/bin:/bin:/usr/sbin:/sbinに存在していないためみたい。

[\[Error 2\] The system cannot find the file specified ? Issue #5 ? darrenderidder/Sublime-JSLint ? GitHub](https://github.com/darrenderidder/Sublime-JSLint/issues/5)の話を参考に、JSLint.sublime-buildのcmdの「node」を「/usr/local/bin/node」に変更したら、動くようになりましたと..

```
{
	"cmd": [
	  "/usr/local/bin/node", 
	  "${packages}/JSLint/linter.js",
	  // tolerate missing 'use strict' pragma
	  "--sloppy",
	  // suggest an indent level of two spaces
	  "--indent", "2",
	  // assume node.js to predefine node globals

```

でも少し考えて、/usr/bin にsymlinkつけても良いかと思って、上の変更は止めて、symlinkをつける方向に。

```
cd /usr/bin
sudo ln -s /usr/local/bin/node

```

というメモ。Sublime Text 2でコマンド実行したときに/usr/local/binも参照してくれれば良いのにとか思うのですけど、あ、symlinkじゃなくてPATHを通せば良いのか..（いや、PATHは通ってる雰囲気...）
