---
title: MacBook proでmakeがうまくいかない問題
date: 2006-04-11T14:30:13.000Z
featured:
  image: tc-photography-LyFpyS_aMlw-unsplash.webp
  author: TC Photography
  authorLink: https://unsplash.com/ja/@tcphoto24?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
categories:
  - web
tags:
  - mac
excerpt: "MacBook pro にて make しようとしたときに下記のようなエラーが返り、make が失敗する問題。"
---

MacBook pro にて make しようとしたときに下記のようなエラーが返り、make が失敗する問題。

> make: **_ wait: Interrupted system call. Stop.
> make: _** Waiting for unfinished jobs....
> make: **_ Waiting for unfinished jobs....
> make: _** wait: Interrupted system call. Stop.

この問題はどうやら Xcode のバージョンが低いために起きているようです。Xcode のバージョンを 2.2 にあげてみたところ、正常に make できるようになりました。
