---
title: MacBook proでmakeがうまくいかない問題
date: 2006-04-11T14:30:13.000Z
categories:
- web
tags:
- mac
---
*   [JayAllen.org：Mac OS X is make-ing me angry](http://jayallen.org/journey/2006/03/mac_os_x_is_make-ing_me_angry)

<!-- more -->

MacBook proにてmakeしようとしたときに下記のようなエラーが返り、makeが失敗する問題。

> make: *** wait: Interrupted system call.  Stop.
> make: *** Waiting for unfinished jobs....
> make: *** Waiting for unfinished jobs....
> make: *** wait: Interrupted system call.  Stop.

この問題はどうやらXcodeのバージョンが低いために起きているようです。Xcodeのバージョンを2.2にあげてみたところ、正常にmakeできるようになりました。
