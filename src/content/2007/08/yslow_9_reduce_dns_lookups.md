---
title: "YSLOW (9): Reduce DNS Lookups"
date: 2007-08-12T15:24:00.000Z
featured:
  image: yslow_9_reduce_dns_lookups
  author: chatGPT
categories:
  - web
tags:
  - yslow
excerpt: "DNS lookups を減らそう。"
---

- [9: Reduce DNS Lookups](http://developer.yahoo.com/performance/rules.html#dns_lookups)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の九つ目。DNS lookups を減らそう。ある host 名と IP アドレスを関連づけるために DNS（Domain Name System）lookup を行うけれど、これには 20〜120 ミリ秒の時間がかかる。lookup が完了するまではその host からダウンロードすることはできない。

ウェブページに存在する host について OS にもブラウザにも DNS のキャッシュがない場合に、DNS lookup が行われる。Web ページ上で利用している host 名が少ない方が DNS lookup がおこなれる回数が少なくなる。

ただ、host を単一に減らすことは、ページ上での並行したダウンロードを減らすことにもつながる。DNS lookup の数を減らしてレスポンスタイムを下げる一方で、並行したダウンロードが減ったことによってレスポンスタイムが増えてしまうかもしれない。ガイドラインでは、host はすくなくとも 2 つ、多くても 4 つとしている。
