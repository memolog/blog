---
title: MacBook proでmakeがうまくいかない問題
date: 2006-04-11T14:30:13.000Z
categories:
  - web
tags:
  - mac
excerpt: "*   JayAllen.org：Mac OS X is make-ing me angry"
---

- [JayAllen.org：Mac OS X is make-ing me angry](http://jayallen.org/journey/2006/03/mac_os_x_is_make-ing_me_angry)

MacBook pro にて make しようとしたときに下記のようなエラーが返り、make が失敗する問題。

> make: **_ wait: Interrupted system call. Stop.
> make: _** Waiting for unfinished jobs....
> make: **_ Waiting for unfinished jobs....
> make: _** wait: Interrupted system call. Stop.

この問題はどうやら Xcode のバージョンが低いために起きているようです。Xcode のバージョンを 2.2 にあげてみたところ、正常に make できるようになりました。
