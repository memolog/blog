---
title: MTPaginate：Movable Typeでページネーションをする
date: 2007-10-27T14:46:00.000Z
categories:
  - web
tags:
  - mt
excerpt: "*   Six Apart - Movable Type プラグインディレクトリ: MTPaginate"
---

- [Six Apart - Movable Type プラグインディレクトリ: MTPaginate](http://www.sixapart.jp/movabletype/plugins/mtpaginate.html)

- [MT Extensions: MTPaginate 1.28](http://www.nonplus.net/software/mt/MTPaginate.htm)

ふと、Movable Type でインデックスページをページネートしたいなと思い、実践してみました。MTPaginate というプラグインを使って、ページネーションを行います。MTPaginate は、個人は無償ですが、商用利用の場合は 20 ドルかかります。

#### MTPaginate のインストール

[MTPaginate](http://www.nonplus.net/software/mt/MTPaginate.htm)をダウンロードしてきて、plugin フォルダの中身を MT の plugin フォルダに、mt-static/plugins フォルダの中身を MT の mt-static/plugins フォルダにそれぞれアップロードします。

#### php ファイルの生成

php でないと動作しないので、php ファイルのインデックステンプレートを生成します。「インデックスページ」の中身を丸ごとコピーして、新たに「インデックスページ（ページネート）」というテンプレートを作成しました。ファイル名は「index.php」。インデックスページをそのまま利用しても良かったのですが、この方が何か問題が起きたときに後戻りしやすそうだったので。

そして、さくらのレンタルサーバーはファイルのパーミッションが 705 か 755 でないと php を利用できないので、mt-config.cgi に[HTMLPerm 0755](http://movabletype.jp/documentation/appendices/config-directives/htmlperms.html) と追記。

#### ページネーション部分のタグを記述

エントリーの生成部分を下記のように変更。max_sections で 1 ページあたりのエントリー数を指定して、ページネートするエントリーの件数は MTEntries で 100 件に指定。

```
<MTPaginate>
<MTPaginateContent max_sections="5">
<MTEntries lastn="100">
<MTPaginateSectionID><$MTEntryID></MTPaginateSectionID>
<$MTInclude module="ブログ記事の概要"$>
<$MTPaginateSectionBreak$>
</MTEntries>
</MTPaginateContent>

<MTPaginateIfMultiplePages>
<div class="pagenate"><$MTPaginateNavigator style="links" separator=" " $></div>
</MTPaginateIfMultiplePages>

<MTPaginateIfLastPage_>
<div class="lastpage">より過去の記事は<a href="<$MTBlogURL$>archives.html">記事タイトル一覧</a>を参照ください。</div>
</MTPaginateIfLastPage_>

</MTPaginate>

```

#### CSS の追加

CSS はこんな感じのを追加しました（そのうち変更するかもしれません）。

```
/* pagenate */
.pagenate,.lastpage {font-size:11px; color:#666; margin:1em 0; border-top:1px dashed #ccc; padding-top:0.7em;}
.lastpage {border:none;margin-top:0; padding-top:0;}
.pagenate a {border:1px solid #ccc; text-decoration:none;padding:2px 1px; font-size:11px;}
.pagenate a:hover {color:#fff; background-color:#fc3; border-color:#fc3;}
.pagenate .pagenate-last {border:none; text-decoration:underline;}
.pagenate a.pagenate-last:hover{background-color:transparent; color:#666;}

```

#### index.html の撤収

FTP にて index.html ファイルを削除して、index.html が再構築されないように「インデックスページ」の「再構築オプション」のチェックをオフにして保存。index.html でアクセスがあった場合に、index.php にリダイレクトするように.htaccess を指定（詳細は省略）。

以上です。作業内容はこれだけなのですが、ローカルで試したりしているうちにあっというまに時間がすぎていきました。ページングのもっと賢いやり方があれば、ぜひ教えてください。
