---
title: Firefox 40 の CSP で「*」だけでは blob&#x3a; を許容しなくなった。
date: 2015-08-24T14:51:00.000Z
categories:
  - web
tags:
  - csp
  - firefox
  - security
excerpt: "File APIから取得した画像のサムネイルをblueimp/JavaScript-Load-Imageを使って表示していたところが、Firefox 40になってから表示されなくなったので、なんでだろうなあと思っていたら、Firefox 40からのCSPのポリシーに修正が入っていて、*（ワイルドカード）でblob:、data:、filesystem:のリソースを許容しなくなったのが原因でした。"
---

File API から取得した画像のサムネイルを[blueimp/JavaScript-Load-Image](https://github.com/blueimp/JavaScript-Load-Image)を使って表示していたところが、Firefox 40 になってから表示されなくなったので、なんでだろうなあと思っていたら、[Firefox 40](https://developer.mozilla.org/ja/Firefox/Releases/40/Site_Compatibility)からの CSP のポリシーに修正が入っていて、\*（ワイルドカード）で blob:、data:、filesystem:のリソースを許容しなくなったのが原因でした。

真面目に調べようとして時間が経ってしまったのでざっくりいうと、[現行の CSP](http://www.w3.org/TR/CSP/)（2015 年 2 月に Candidate Recommendation となっている）では、[4.2.2. Matching Source Expressions](http://www.w3.org/TR/CSP/#match-source-expression)にて下記のように規定されている。

> If the source expression a consists of a single U+002A ASTERISK character (\*), and url's scheme is not one of blob, data, filesystem, then return does match.

つまりアスタリスクで指定しているリソースについて、blob:や data:、filesystem での参照が対象外となっている。img-src:'_'（または img-src の指定がなくて、default-src:'_'がある）である場合、<img src="blob:...みたいな画像を表示することができない。対応としては、img-src: '\*','blob:'とか一緒に指定しておけばいい（仕様をちゃんと確認してないから少し不安だけど）。

というメモ。
