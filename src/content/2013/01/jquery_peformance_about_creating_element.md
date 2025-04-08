---
title: jQueryで要素を作成するときのパフォーマンス
date: 2013-01-15T16:15:00.000Z
categories:
  - web
tags:
  - javascript
  - jquery
  - performance
excerpt: "jQueryで要素を作成する場合、jQuery()のExampleを参考にすると、作り方としては下記の二通りの方法があります。"
---

jQuery で要素を作成する場合、[jQuery()の Example](http://api.jquery.com/jQuery/#entry-examples-1)を参考にすると、作り方としては下記の二通りの方法があります。

```javascript
$("<div><p>Hello</p></div>").appendTo("body");
```

```javascript
$("<div/>", {
  class: "test",
  text: "Click me!",
  click: function () {
    $(this).toggleClass("test");
  },
}).appendTo("body");
```

処理としては、前者は最終的に documentFragment に append した div 要素の innerHTML を使って要素を作成して、後者は createElement で要素を作成した後に二番目の引数に指定した attribute をそれぞれ設定していく感じ。

それでどちらの方法が処理的に速いのかなと思って、[jsperf にテストを用意してみました](http://jsperf.com/innerhtml-vs-addattribute-later)。このテストでは、前者の innerHTML を使用する方が速かったです。後者の場合は attribute を一つずつ設定していくので、結果として innerHTML より遅くなる雰囲気（たぶん）。設定するプロパティが増えてくると、innerHTML との差がより顕著に出るかもしれません。

jsperf のテストでは、さらに下記のような素の JavaScript で実行した場合の結果もつけてみました。素の方が当たり前ですが、色々何もしないので高速。

```javascript
var div = document.createElement("div");
div.setAttribute("class", "foobar");
"textContent" in div
  ? (div.textContent = "foobar")
  : div.appendChild(document.createTextNode("foobar"));
var $div = $(div);
```

最後の行の「var $div = $(div);」のように、引数が DOMElement の場合は jQuery オブジェクトの context にその引数を設定するだけみたいなので、素の JavaScript で DOMElement を生成して、それを jQuery オブジェクトとしてラップする方が速い雰囲気（buildFragment の過程で生成されるキャッシュが有効に活用できる場合は jQuery で生成した方が総合的には速いのかもしれないけど未確認）。

このテストの場合、[IE8 で textContent が使用できない](http://www.quirksmode.org/dom/w3c_html.html)ので、そこだけ調整をしています（IE8 まで対応したかった）。jQuery にはクロスブラウザを意識した細かい対応が随所にあるので、互換性が低い要素やその操作の場合にはやはり jQuery を使用するのが良さそう。

（追記）[jQuery 1.9 でも同様のテストをしてみました](http://jsperf.com/innerhtml-vs-addattribute-later-with-jquery1-9)（上のテストは 1.8.3）。createElement したあとの attribute の設定が簡素化されたようで（[#12840 (Remove (private) parameter "pass" from jQuery.attr and jQuery.access)](http://bugs.jquery.com/ticket/12840)）、innerHTML と遜色なく動作する雰囲気。createElement した後で chain で個別に attribute を設定する方が少しだけ早い。
