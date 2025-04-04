---
title: Sublime Text 2 の JSLint から node がみつからない
date: 2013-02-17T20:28:00.000Z
categories:
  - web
tags:
  - node
  - "sublime text 2"
excerpt: "Sublime Text 2にJSLintというpackageをインストールしているのですが、これが下記のようなno such file or directoryでエラーになる。"
---

Sublime Text 2 に[JSLint](https://github.com/darrenderidder/Sublime-JSLint)という package をインストールしているのですが、これが下記のような no such file or directory でエラーになる。

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

どうやら homebrew でインストールした node が、/usr/local/bin/node に存在していて、/usr/bin:/bin:/usr/sbin:/sbin に存在していないためみたい。

[\[Error 2\] The system cannot find the file specified ? Issue #5 ? darrenderidder/Sublime-JSLint ? GitHub](https://github.com/darrenderidder/Sublime-JSLint/issues/5)の話を参考に、JSLint.sublime-build の cmd の「node」を「/usr/local/bin/node」に変更したら、動くようになりましたと..

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

でも少し考えて、/usr/bin に symlink つけても良いかと思って、上の変更は止めて、symlink をつける方向に。

```
cd /usr/bin
sudo ln -s /usr/local/bin/node

```

というメモ。Sublime Text 2 でコマンド実行したときに/usr/local/bin も参照してくれれば良いのにとか思うのですけど、あ、symlink じゃなくて PATH を通せば良いのか..（いや、PATH は通ってる雰囲気...）
