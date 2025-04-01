---
title: YSLOW 勉強 &#x3a; 9&#x3a; Reduce DNS Lookups
date: 2007-08-12T15:24:00.000Z
categories:
- web
tags:
- yslow
---
*   [9: Reduce DNS Lookups](http://developer.yahoo.com/performance/rules.html#dns_lookups)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の九つ目。DNS lookups を減らそう。あるhost名とIPアドレスを関連づけるためにDNS（Domain Name System）lookupを行うけれど、これには20〜120ミリ秒の時間がかかる。lookupが完了するまではそのhostからダウンロードすることはできない。

<!-- more -->

ウェブページに存在するhostについてOSにもブラウザにもDNSのキャッシュがない場合に、DNS lookupが行われる。Webページ上で利用しているhost名が少ない方がDNS lookupがおこなれる回数が少なくなる。

ただ、hostを単一に減らすことは、ページ上での並行したダウンロードを減らすことにもつながる。DNS lookupの数を減らしてレスポンスタイムを下げる一方で、並行したダウンロードが減ったことによってレスポンスタイムが増えてしまうかもしれない。ガイドラインでは、hostはすくなくとも2つ、多くても4つとしている。
