---
title: Microdata/Microformatsの検証ができるRich Snippets Testing Tool
date: 2012-07-01T22:00:00.000Z
categories:
  - web
tags:
  - html
  - microdata
excerpt: "GoogleのWebmaster toolsのひとつにRich Snippets Testing Toolというのがあって、このツールではサイトに記述したMicrodataやMicroformatsなどの構造化データマークアップ(structured data markup)をGoogleがきちんとパースしてくれるかどうかをチェックすることができます。"
---

Google の Webmaster tools のひとつに[Rich Snippets Testing Tool](http://www.google.com/webmasters/tools/richsnippets)というのがあって、このツールではサイトに記述した Microdata や Microformats などの構造化データマークアップ(structured data markup)を Google がきちんとパースしてくれるかどうかをチェックすることができます。

それでメモログを検証した結果が[こんな感じ](http://www.google.com/webmasters/tools/richsnippets?url=http%3A%2F%2Fmemolog.org%2F2012%2F07%2Faround_dnt.php)（インデックスページだと hfeed がたくさん出力されるので、個別アーカイブにて）。

最初に[hentry](http://microformats.org/wiki/hentry)に必須の entry-title がない（entry-title の class を指定していなかった）とか、hcard で著作者情報を示した方が良い的なことをいろいろ言われたので、言われるがままに対応してみました。microdata 的には blogPosting に[itemref](http://www.w3.org/TR/html5/microdata.html#attr-itemref)を設定して、author 情報として section#profile の箇所を参照するように設定しました（itemref の使い方を知る）。

自分の名前があるところでは日本語で、あるところでは英表記で記述していたりしたのですが、構造化データ的には英表記部分で統一してみたりしてみました。ひとつのデータの中に itemprop=name を複数追加してはいけないという規則はなさそうな感はあるのですけど、調査不足。

あと、[hentry の仕様](http://microformats.org/wiki/hentry)としては、entry-title の class が存在しない場合は最初の見出し要素を使用すると書かれてはいるのですが、そこはツール的には考慮されない様子。

> if the Entry Title is missing, use
>
> - the first <h#> element in the Entry, or
> - the <title> of the page, if there is no enclosing Feed element, or
> - assume it is the empty string

検証結果の「Extracted Author/Publisher for this page」の項目では、Google Plus のプロフィール画面とリンクされているかどうかをチェックしてくれるようです。Google Plus との連携がとれている場合は、「Verified: Authorship markup is verified for this page.」と表示される。Google Plus へのリンクが存在しない場合は、なんとなく author 関連の URL を引っ張ってくる様子。そして時には「Error: Author profile page does not have an authorship link to a Google Profile」みたいなエラーを出力する様子（このエラーが出る理由はいまいち不明）。 ![](http://farm8.staticflickr.com/7106/7478678764_650b123865_z.jpg)

Google Plus との連携の取り方は[検索結果内の著者情報 \- ウェブマスター ツール ヘルプ](http://support.google.com/webmasters/bin/answer.py?hl=ja&answer=1408986)を参照的なリンクがついていたので、それを参考に設定してみました。要するにサイトにリンクをつけて、Google Plus の「投稿先」にリンクを追加するだけで良いみたい。これでそのうち検索結果に Google Plus のプロフィールアイコンが表示されるようになるのかしら。

microdata に対応したあとに使ってみると、いろいろ楽しいかなと思います。

追記(2012/7/16)
