---
title: YSLOW 勉強 &#x3a; 10&#x3a; Minify JavaScript
date: 2007-08-13T14:52:01.000Z
categories:
  - web
tags:
  - yslow
excerpt: "*   10: Minify JavaScript  rules for high performance web sitesの十個目。Javascriptを最小化しよう。スクリプト内の不要なスペースとか改行やタブとかを削除することで、ダウンロードするファイルのサイズが減るのでレスポンスタイムを短くすることができる。代表的なツールにはJSMINがある。"
---

- [10: Minify JavaScript](http://developer.yahoo.com/performance/rules.html#minify)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の十個目。Javascript を最小化しよう。スクリプト内の不要なスペースとか改行やタブとかを削除することで、ダウンロードするファイルのサイズが減るのでレスポンスタイムを短くすることができる。代表的なツールには[JSMIN](http://www.crockford.com/javascript/jsmin.html)がある。

スクリプトを難読化（Obfuscation：不要な文字を削るのとともに、function や変数の名前を変えて短くする）させることは、最小化よりもファイルサイズを削ることにつながるけれど、バグを誘発する恐れがあるためここではお勧めしていません。

最小化の方がメンテナンスコストも低いと記述されていますが、スペースや改行、タブなどを削った時点でメンテナンスコストは結構高い（メンテナンスしにくい）状態であるように思いますが、どうなんでしょう。
