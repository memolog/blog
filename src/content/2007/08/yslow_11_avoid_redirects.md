---
title: YSLOW 勉強 &#x3a; 11&#x3a; Avoid Redirects
date: 2007-08-14T16:13:41.000Z
categories:
- web
tags:
- yslow
---
*   [11: Avoid Redirects](http://developer.yahoo.com/performance/rules.html#redirects)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の十一個目。リダイレクトを避けよう。HTMLドキュメントにたどりつくまでは何の要素のダウンロードも始まらないので、リダイレクトしている間はすべてが遅れる。

<!-- more -->

もっとも無駄なリダイレクトの一つは、URLの末尾「/（スラッシュ）」が抜けているときに起るリダイレクトで、/のついたURLにリダイレクトします（http://memolog.org => http://memolog.org/）。この問題はAlias や mod_rewrite、DirectorySlashを利用することで、対処することができます。

次の例として旧サイトから新サイトへの移行の話に触れていますが、要するに、HTTPでレスポンスのやりとりをするのはできるだけ避けて、代わりにApacheのAliasやmod_rewriteを使った方が良いということのようです。

あとは末尾のスラッシュは忘れずにつけるということでしょうか。
