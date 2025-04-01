---
title: MTで奇数行、偶数行ごとに背景色をつける方法
date: 2007-07-31T16:41:00.000Z
categories:
- web
tags:
- css
- mt
---
*   [The blog of H.Fujimoto：Movable Type 4のブロックタグ内で使える変数](http://www.h-fj.com/blog/archives/2007/07/21-120042.php)

<!-- more -->

ブロックタグ内で使える変数を利用して、奇数行（odd）と偶数行（even）にわけてclassを指定することができます。偶数行と奇数行にわけて配色したいというときに非常に便利。これだけでデザインの幅がかなり広がる。右側の「最近のブログ記事」の一覧で実践してみました。作成したテンプレートは下記のようなかたち（不要な箇所は割愛しています）。

```
<MTEntries lastn="10">
<li class="widget-list-item <MTIf name="__odd__">odd</MTElse>even</MTIf>">
<a href="<$MTEntryPermalink$>" ><$MTEntryTitle$></a></li>
</MTEntries>

```

そして適用したCSSは下記のような感じ。

```
.widget-archives .widget-header {border:none; padding-bottom:0; margin-bottom:0;}
.widget-archives ul {border:1px solid #ddd;}
.widget-archives li {margin:0;padding:0; overflow:hidden;}
.widget-archives li {display:inline;}
.widget-archives li a {display:block; padding:5px;}
.widget-archives li.odd a {background-color:#f0f0f0;}
.widget-archives li.even a {background-color:#e6e6e6;}
.widget-archives li.even a:hover {background-color:#FFA6E9;}
.widget-archives li.odd a:hover {background-color:#FFBFEF;}

```

これで完了。MTEntriesの他に、MTCommentsでも利用可能。コメントの場合で、たとえばエントリーの投稿者のコメントには特別のCSSを入れたいという場合には、<MTIfCommenterIsEntryAuthor>author</MTIfCommenterIsEntryAuthor> というような形で、authorというclassを追加すると良いかもしれない。
