---
title: YSLOW 勉強：12：Remove Duplicate Scripts
date: 2007-08-15T15:11:00.000Z
categories:
  - web
tags:
  - yslow
excerpt: "*   12: Remove Duplicate Scripts  rules for high performance web sitesの十二個目。重複したスクリプトを削除しよう。IEの場合は、HTTPリクエストがキャッシュされていない場合は、リクエストを二回行ってしまう（キャッシュしている場合でもリロードするとHTTPリクエストを送る）。それに加えて、スクリプトの判定は二倍行われてしまうため、余計に時間がかかる。この現象はFirefoxでも発生する。"
---

- [12: Remove Duplicate Scripts](http://developer.yahoo.com/performance/rules.html#js_dupes)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の十二個目。重複したスクリプトを削除しよう。IE の場合は、HTTP リクエストがキャッシュされていない場合は、リクエストを二回行ってしまう（キャッシュしている場合でもリロードすると HTTP リクエストを送る）。それに加えて、スクリプトの判定は二倍行われてしまうため、余計に時間がかかる。この現象は Firefox でも発生する。

開発チームの人数やスクリプトの数が多くなると、二重に入れてしまうようなケースがあるとのこと。なるほど。
