---
title: time要素からpubdate属性が抜けていた
date: 2012-07-02T22:00:00.000Z
categories:
  - web
tags:
  - html
excerpt: "何の気なしにValidator.nu (X)HTML5 Validatorでサイトの検証をしてみたら、time要素のpubdateがnot allowedだと言われて、気がついたらW3Cの仕様のContent Attributesからも抹消されているので、なんでだろうなあと調べていたら20120329の更新で、pubdateが削除されていた（The time element was redesigned to make it match how people wanted to use it. Its pubdate attribute was dropped. ）。参考HTML5 (と関連WD) 更新 - fragmentary。"
---

何の気なしに[Validator.nu (X)HTML5 Validator](http://html5.validator.nu/)でサイトの検証をしてみたら、time 要素の pubdate が not allowed だと言われて、気がついたら[W3C の仕様](http://www.w3.org/TR/html5/the-time-element.html#the-time-element)の Content Attributes からも抹消されているので、なんでだろうなあと調べていたら[20120329 の更新](http://www.w3.org/TR/2012/WD-html5-diff-20120329/#changes-2011-05-25)で、pubdate が削除されていた（The time element was redesigned to make it match how people wanted to use it. Its pubdate attribute was dropped. ）。参考[HTML5 (と関連 WD) 更新 - fragmentary](http://myakura.hatenablog.com/entry/2012/03/30/095033)。

pubdate を削ったらエラーは解消されました。datetime の値は microdata で参照しているのでそのまま（time 要素に itemprop を使用した場合は datetime の値が参照される[仕様](http://www.w3.org/TR/html5/microdata.html#values)）。
