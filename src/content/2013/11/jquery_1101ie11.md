---
title: jQuery 1.10.1とIE11の組み合わせでエラーが発生する場合がある
date: 2013-11-20T20:00:00.000Z
categories:
  - web
tags:
  - javascript
  - jquery
excerpt: "モーダルなどjQueryでiframeを開いた場合に、jQuery 1.10.1とIE11の組み合わせだとエラーが発生する。ので、モーダル使っているなら、1.10.2にアップデートしないといけない。これはバンドルされてるSizzleに下記のような処理があるため。"
---

モーダルなど jQuery で iframe を開いた場合に、jQuery 1.10.1 と IE11 の組み合わせだとエラーが発生する。ので、モーダル使っているなら、1.10.2 にアップデートしないといけない。これはバンドルされてる Sizzle に下記のような処理があるため。

```javascript
setDocument = Sizzle.setDocument = function( node ) {
  var doc = node ? node.ownerDocument || node : preferredDoc,
    parent = doc.parentWindow;

  (... snip ...)

  // Support: IE>8
  // If iframe document is assigned to "document" variable and if iframe has been reloaded,
  // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
  if ( parent && parent.frameElement ) {
    parent.attachEvent( "onbeforeunload", function() {
      setDocument();
    });
  }
```

parentWindow で値がとれて、かつ frameElement（iframe とか）があると、attachEvent が実行される。IE11 には attachEvent は存在しないので、エラーとなるみたいな感じ。parentWindow は[quirksmode](http://www.quirksmode.org/dom/w3c_html.html)によると IE（と古い Opera）でのみ使われているプロパティ。

この処理が、1.10.2 だと下記のようになる。

```javascript
setDocument = Sizzle.setDocument = function( node ) {
  var doc = node ? node.ownerDocument || node : preferredDoc,
    parent = doc.defaultView;

  (... snip ...)

  // Support: IE>8
  // If iframe document is assigned to "document" variable and if iframe has been reloaded,
  // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
  // IE6-8 do not support the defaultView property so parent will be undefined
  if ( parent && parent.attachEvent && parent !== parent.top ) {
    parent.attachEvent( "onbeforeunload", function() {
      setDocument();
    });
  }
```

parent に attachEvent メソッドがある場合のみに実行されるので、IE11 では処理されなくなる。parent の取得が parentWindow から defaultView になっているのは（[defaultView は IE9 以降しか使えない](http://www.quirksmode.org/dom/w3c_html.html)）、そもそもこの対応は[#13936 (SCRIPT70 Permission denied in selectors after iframe was submitted in IE9-10, jQuery 1.9.1 and 2.0.0)](http://bugs.jquery.com/ticket/14535)の issue に対するものなので、IE8 以前は不要だからみたい。

ということで、1.10.2 であれば IE11 でもエラーが発生しない。

けれども、どうも#13936 の問題は IE11 でも発生するようで、[#14535 (Selection fails in IE11 when the last context is a no-longer-present iframe document)](http://bugs.jquery.com/ticket/14535)で追加修正が 1.11 で入りそうな様子（child iframe で reload をさせなければ発生しない問題みたい）。

というメモ。
