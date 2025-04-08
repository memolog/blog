---
title: YSLOW 勉強 &#x3a; 2&#x3a; Use a Content Delivery Network
date: 2007-08-05T06:20:05.000Z
categories:
- web
tags:
- yslow
---
*   [2: Use a Content Delivery Network](http://developer.yahoo.com/performance/rules.html#cdn)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の二つ目。 ユーザーの待ち時間の大半は画像やCSSなどの構成要素をダウンロードするのに費やされているという視点から、待ち時間を減らす為にCDN（Content Delivery Network ）を利用しようという話。Content Delivery Network (CDN) とは、ユーザーに効率的にコンテンツを配信するために分散化させたネットワークのことをさします（[e-word](http://e-words.jp/w/CDN.html)もあわせてごらんください）。

<!-- more -->

CDNは自社で構築する方法もあれば、Akamaiなどのサービス（CDS：Content Delivery Service）を利用する方法もある。けれども、いずれにせよ時間も費用もかかる対策ではあるので、なかなかハードルの高い基準であると思います。
