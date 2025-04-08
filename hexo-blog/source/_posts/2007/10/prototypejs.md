---
title: prototype.js を使ってトラックバックを開閉するように変更
date: 2007-10-08T02:37:00.000Z
categories:
- web
tags:
- javascript
---
*   [Prototype JavaScript framework](http://www.prototypejs.org/)

個人的にトラックバックの機能をあまり利用しなくなった。だから表示を控えめにしつつ、機能は残しておきたい。ということでJavascriptで開閉するかたちにしてみました。といっても、たいしたことしてませんが・・

<!-- more -->

以下が作業手順

1.  prototype.jsをダウンロードして、headerにscriptタグを追加。
2.  トラックバックの表示欄全体を<div id=trackbacks-open-content >で囲う
3.  開閉用のリンクを追加。

開閉用のリンクは下記のように追加。prototype.jsの機能の一つのElement.toggle(element)を使っているだけ。toggle(element)は、指定したタグのidを表示を切り替えてくれます。

```
<a href="javascript:void(0)" onclick="javascript:Element.toggle('trackbacks-open-content');">
開く/閉じる</a> 

```

表示するリンクと非表示にするリンクを別々にしたいときには、Element.show()、Element.hideを使うとできます。

prototypeについては、[Ajaxライブラリリファレンス](http://www.amazon.co.jp/gp/product/4861004314/249-8435951-8869142?ie=UTF8&tag=yutakayamaguc-22&linkCode=xm2&camp=247&creativeASIN=4861004314)という本を参照しています。本書に載っているバージョンは1.4（いま1.5.1.1）ですが、きっと大丈夫。便利な世の中なのである。
