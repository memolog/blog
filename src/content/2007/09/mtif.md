---
title: MTIfタグを利用したタブ型ナビゲーション
date: 2007-09-12T17:14:00.000Z
featured:
  image: kevin-charit-KU9D4Sz6IDY-unsplash.webp
  author: Kevin Charit
  authorLink: https://unsplash.com/ja/@kevin_charit?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
categories:
  - web
tags:
  - css
  - mt
excerpt: "Movable Type 4 から追加された MTIf タグを利用して、現在いるページがアクティブな状態になるタブ型ナビゲーションを設置してみました。"
---

Movable Type 4 から追加された MTIf タグを利用して、現在いるページがアクティブな状態になるタブ型ナビゲーションを設置してみました。作業内容的には[MT で奇数行、偶数行ごとに背景色をつける方法](/2007/08/mt/)と変わりません。今回は分岐の条件をテンプレートの種類（名前）にしています。

まずナビゲーションの HTML がこちら。アクティブにしたいタブに「here」という class を指定しています。MTUnless を併用するともう少しかしこい HTML にできるかもしれません。

```html
<div id="banner-image">
<div id="banner-image-inner">

<div id="topnavi">
<div id="topnavi-inner">
<ul>
<li class="rss"><a href="http://feeds.feedburner.jp/memolog">
<img width="9" height="9" alt="RSS" src="/assets/mt/mt-static/images/status_icons/feed.gif"/>
RSS</a></li>
<li class="archives<MTIf name="archive_index"> here</MTIf><
MTIf name="entry_template"> here</MTIf><MTIf name="datebased_archive"> here</MTIf>"><a href="
<$MTBlogURL$>/archives.html">archives</a></li>
<li class="profile"><a href="http://memolog.org/mt/mt-search.cgi?tag=profile&IncludeBlogs=5">profile</a></li>
<li class="home <MTIf name="main_index">here</MTIf>"><a href="<$MTBlogURL$>">home</a></li>
</ul>
</div>
</div>

</div>
</div>

```

CSS はこんな感じ。背景画像の上にタブを載せているので、表示がずれないようにピクセル単位でガチガチに指定しています（ul のマージンが入ることに気づかずに、しばらく悩んだ）。

```
/* top navigation */
#banner-image {height:160px; background:#fff url(/assets/site-design/0701/050101.gif) no-repeat; width:940px; margin:0 auto;}
#banner-image-inner {padding-top:125px;}

#topnavi {height:35px;}
#topnavi-inner {padding-bottom:10px; padding-right:20px; text-align:center;}
#topnavi ul {list-style-type:none; margin:0;}
#topnavi li {width:54px; height:25px; margin:0 2px; float:right;}
#topnavi li a {width:46px; height:17px; display:block; padding:4px; background-color:#e6e6e6;
font-size:11px; font-familiy:Verdana,sans-serif; opacity: 0.8;-moz-opacity: 0.8;filter: alpha(opacity=80);}
#topnavi li a:link, #topnavi li a:visited {text-decoration:none;}
#topnavi li.here a{background-color:#fff; opacity: 1;-moz-opacity: 1;filter: alpha(opacity=100);}
#topnavi li a:hover {background-color:#A1D0FF; opacity: 1;-moz-opacity: 1;filter: alpha(opacity=100);}
#topnavi li.rss img {margin-right:4px;}

```

- [タグリファレンス：MTif](http://movabletype.jp/documentation/appendices/tags/if.html)
