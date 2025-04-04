---
title: Internet Explorer (11含む) の UserAgent
date: 2013-08-01T13:45:00.000Z
categories:
  - web
tags:
  - ie
excerpt: "必要があってIEのUserAgentを調べてコピペしたので、そのメモ。すぐ利用可能な状態のOSで調べたので、ブラウザとOSの組み合わせは特に意識していない。"
---

必要があって IE の UserAgent を調べてコピペしたので、そのメモ。すぐ利用可能な状態の OS で調べたので、ブラウザと OS の組み合わせは特に意識していない。

IE8 (Windows XP)
`Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET4.0C; .NET4.0E)`

IE9 (Windows 7)
`Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)`

IE10 (Windows 8)
`Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0; .NET4.0E; .NET4.0C; Tablet PC 2.0)`

IE11 preview (Windows 7)
`Mozilla/5.0 (Windows NT 6.1; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; rv:11.0) like Gecko`

IE11 の navigator.appName は「Netscape」になっています。それ以外は「Microsoft Internet Explorer」。[Detecting Windows Internet Explorer More Effectively (Internet Explorer)](http://msdn.microsoft.com/en-us/library/ms537509%28v=vs.85%29.aspx)で appName 使って detect してたから appName 使ったのに、それが返って IE11 の detect したいときに面倒くさい感じに。[W3C の仕様](http://www.w3.org/TR/html5/webappapis.html#dom-navigator-appname)的には、Netscape かそのブラウザのフルネームかということなので、問題ない。

IE11 も含めた形で判定したい場合は、「Trident」の文字列で判定しつつ、rv のバージョン番号を使うことでできる。今のところ。 [Internet Explorer 11: “Don’t call me IE” | NCZOnline](http://www.nczonline.net/blog/2013/07/02/internet-explorer-11-dont-call-me-ie/)も参照。

なお、Windows Phone 8 (Nokia) の IE の UserAgent は下記のような感じでした。

Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 620)
