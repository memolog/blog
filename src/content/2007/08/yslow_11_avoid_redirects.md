---
title: "YSLOW (11): Avoid Redirects"
date: 2007-08-14T16:13:41.000Z
featured:
  image: yslow_11_avoid_redirects
  author: chatGPT
categories:
  - web
tags:
  - yslow
excerpt: "リダイレクトを避けよう。HTML ドキュメントにたどりつくまでは何の要素のダウンロードも始まらないので、リダイレクトしている間はすべてが遅れる。"
---

- [11: Avoid Redirects](http://developer.yahoo.com/performance/rules.html#redirects)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の十一個目。リダイレクトを避けよう。HTML ドキュメントにたどりつくまでは何の要素のダウンロードも始まらないので、リダイレクトしている間はすべてが遅れる。

もっとも無駄なリダイレクトの一つは、URL の末尾「/（スラッシュ）」が抜けているときに起るリダイレクトで、/のついた URL にリダイレクトします（ http://memolog.org => http://memolog.org/ ）。この問題はAlias や mod_rewrite、DirectorySlash を利用することで、対処することができます。

次の例として旧サイトから新サイトへの移行の話に触れていますが、要するに、HTTP でレスポンスのやりとりをするのはできるだけ避けて、代わりに Apache の Alias や mod_rewrite を使った方が良いということのようです。

あとは末尾のスラッシュは忘れずにつけるということでしょうか。
