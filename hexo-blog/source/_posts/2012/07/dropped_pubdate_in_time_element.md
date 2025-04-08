---
title: time要素からpubdate属性が抜けていた
date: 2012-07-02T22:00:00.000Z
categories:
- web
tags:
- html
---
何の気なしに[Validator.nu (X)HTML5 Validator](http://html5.validator.nu/)でサイトの検証をしてみたら、time要素のpubdateがnot allowedだと言われて、気がついたら[W3Cの仕様](http://www.w3.org/TR/html5/the-time-element.html#the-time-element)のContent Attributesからも抹消されているので、なんでだろうなあと調べていたら[20120329の更新](http://www.w3.org/TR/2012/WD-html5-diff-20120329/#changes-2011-05-25)で、pubdateが削除されていた（The time element was redesigned to make it match how people wanted to use it. Its pubdate attribute was dropped. ）。参考[HTML5 (と関連WD) 更新 - fragmentary](http://myakura.hatenablog.com/entry/2012/03/30/095033)。

<!-- more -->

pubdateを削ったらエラーは解消されました。datetimeの値はmicrodataで参照しているのでそのまま（time要素にitempropを使用した場合はdatetimeの値が参照される[仕様](http://www.w3.org/TR/html5/microdata.html#values)）。
