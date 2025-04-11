---
title: "YSLOW 勉強: 1: Minimize HTTP Requests"
date: 2007-08-04T15:46:10.000Z
featured:
  image: yslow_1_minimize_http_requests.webp
  author: chatGPT
categories:
  - web
tags:
  - yslow
excerpt: "話題になっていたYSLOWをインストールして試してみるという話。YSLOWはrules for high performance web sites（ウェブサイトを高速にするルール）に記載されている法則に則って、ウェブページの表示を遅くしている原因が何かを教えてくれるFirebugzの拡張プラグインです。"
---

- [YSlow for Firebug](http://developer.yahoo.com/yslow/)

内向きに話題になっていた YSLOW をインストールして試してみるという話。YSLOW は[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)（ウェブサイトを高速にするルール）に記載されている法則に則って、ウェブページの表示を遅くしている原因が何かを教えてくれる Firebugz の拡張プラグインです。

rules for high performance web sites のルールは全部で 13 個。その一つずつを、小刻みに勉強していこうという試みです。

一つ目は「1.Minimize HTTP Requests」。ユーザーの待ち時間の大半は画像や CSS、javascript、Flash などのページの構成要素のダウンロードに費やされているから、これらの数を減らして HTTP request の数を減らしていこうということ。ページのリッチさを保ちつつ、HTTP request を減らすアイデアが記されています。

1.  イメージマップを利用して画像の点数を少なくする：ナビゲーションバーなど、統合できる画像を統合して、HTTP request を減らす
2.  「[CSS Sprites](http://alistapart.com/articles/sprites)」という手法を使う：いくつかの画像を一つの画像にまとめて、background-position でずらしながら利用する。
3.  インライン（img タグ）で挿入している画像を CSS で表示するようにする：インライン上の画像は実際のページに組み込まれるため、HTML ドキュメントのサイズを増やしてしまう。だから（キャッシュされる）CSS 上で呼び出す方が良い。
4.  ファイルを統合する：Javascript や CSS などのファイルをひとつにまとめて HTTP request の数を少なくする。

ちなみに、memolog.org のトップページの判定は D 判定・・、Feed Flare の外部 Javascript がエントリーごとに入っているために、評価が下がっているようです。スタッツ用に埋め込んでいるけど（たぶん）トップページには必要なさそうなので、外してみよう。

![cap080501.gif](/assets/i/2007/08/cap080501.gif)
