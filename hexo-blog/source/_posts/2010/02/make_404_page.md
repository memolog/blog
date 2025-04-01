---
title: 404ページを作成する
date: 2010-02-04T22:00:00.000Z
categories:
- web
tags:
- mt
---
今さら感はありつつも気が向くままにMTのウェブページ機能を使って404ページを作成してみました。新規ウェブページ作成画面を開いて404.phpというページを作成。.htaccessに下記のように記述。

```

<!-- more -->
ErrorDocument 404 /404.php

```

コンテンツ部分以外は他のページと同じものが使われるので、あとはコンテンツの文言を考えるだけで完了。私は[こんな風な404ページ](/404.php)にしてみました。404ページにだけスタイルを指定したい場合は、コンテンツ部分についている個別ページ用のid属性を使用しました。

```
#page-435 {margin:-40px 60px 30px;padding:20px 30px;border:10px solid #e6e6e6;}
#page-435 #page-title { font-size:20px; font-family:serif; color:#333; font-weight:normal;}
#page-435 form {margin:1em 0}
#page-435 .asset-content {font-size:12px;line-height:1.8;}
#page-435 .asset-content ul {margin-left:1.2em; list-style-type:circle;}

```
