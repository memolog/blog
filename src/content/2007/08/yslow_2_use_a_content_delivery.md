---
title: "YSLOW (2): Use a Content Delivery Network"
date: 2007-08-05T06:20:05.000Z
featured:
  image: yslow_2_use_a_content_delivery
  author: chatGPT
categories:
  - web
tags:
  - yslow
excerpt: "ユーザーの待ち時間の大半は画像や CSS などの構成要素をダウンロードするのに費やされているという視点から、待ち時間を減らす為に CDNを利用しようという話。"
---

- [2: Use a Content Delivery Network](http://developer.yahoo.com/performance/rules.html#cdn)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の二つ目。 ユーザーの待ち時間の大半は画像や CSS などの構成要素をダウンロードするのに費やされているという視点から、待ち時間を減らす為に CDN（Content Delivery Network ）を利用しようという話。Content Delivery Network (CDN) とは、ユーザーに効率的にコンテンツを配信するために分散化させたネットワークのことをさします（[e-word](http://e-words.jp/w/CDN.html)もあわせてごらんください）。

CDN は自社で構築する方法もあれば、Akamai などのサービス（CDS：Content Delivery Service）を利用する方法もある。けれども、いずれにせよ時間も費用もかかる対策ではあるので、なかなかハードルの高い基準であると思います。
