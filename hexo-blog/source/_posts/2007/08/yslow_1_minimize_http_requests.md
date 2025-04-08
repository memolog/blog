---
title: YSLOW 勉強 &#x3a; 1&#x3a; Minimize HTTP Requests
date: 2007-08-04T15:46:10.000Z
categories:
- web
tags:
- yslow
---
*   [YSlow for Firebug](http://developer.yahoo.com/yslow/)

内向きに話題になっていたYSLOWをインストールして試してみるという話。YSLOWは[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)（ウェブサイトを高速にするルール）に記載されている法則に則って、ウェブページの表示を遅くしている原因が何かを教えてくれるFirebugzの拡張プラグインです。

<!-- more -->

rules for high performance web sites のルールは全部で13個。その一つずつを、小刻みに勉強していこうという試みです。

一つ目は「1.Minimize HTTP Requests」。ユーザーの待ち時間の大半は画像やCSS、javascript、Flashなどのページの構成要素のダウンロードに費やされているから、これらの数を減らして HTTP request の数を減らしていこうということ。ページのリッチさを保ちつつ、HTTP requestを減らすアイデアが記されています。

1.  イメージマップを利用して画像の点数を少なくする：ナビゲーションバーなど、統合できる画像を統合して、HTTP request を減らす
2.  「[CSS Sprites](http://alistapart.com/articles/sprites)」という手法を使う：いくつかの画像を一つの画像にまとめて、background-positionでずらしながら利用する。
3.  インライン（imgタグ）で挿入している画像をCSSで表示するようにする：インライン上の画像は実際のページに組み込まれるため、HTML ドキュメントのサイズを増やしてしまう。だから（キャッシュされる）CSS上で呼び出す方が良い。
4.  ファイルを統合する：JavascriptやCSSなどのファイルをひとつにまとめて HTTP request の数を少なくする。

ちなみに、memolog.orgのトップページの判定はD判定・・、Feed Flareの外部Javascriptがエントリーごとに入っているために、評価が下がっているようです。スタッツ用に埋め込んでいるけど（たぶん）トップページには必要なさそうなので、外してみよう。 ![cap080501.gif](/blog//assets/i/2007/08/cap080501.gif)
