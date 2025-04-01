---
title: text-align&#x3a; justifyで段落を両端揃えにする
date: 2008-06-09T12:45:46.000Z
categories:
- web
tags:
- css
---
*   [text-align−スタイルシートリファレンス](http://www.htmq.com/style/text-align.shtml)

「text-align:justify」は、対応していないブラウザがあるから使わない・・と思っていたのでが、今ではどのブラウザでもだいたい対応しているということに今さら気がつきました。いちど見捨てたプロパティにはなかなか目を向けないものだなと思った次第でございます。

<!-- more -->

追加したCSSはこんな感じ。特に何のひねりもないです。

```
.asset-content{text-align:justify; text-justify:distribute;}

```

IE 6で確認した感じでは、日本語の両端揃えはまだtext-justifyの方が有効に機能するようなので、text-justify:distribute;を入れています。英文であればtext-align:justifyのみで問題なさそうな感じでした。

また、Safari3 では日本語の両端揃えは若干不得意のようで、半角英数が文中に含まれている場合や、禁則処理（「、」が行頭にこないようにしたりすること）をしたりすると、でこぼこしてしまう。でも個人的には許容範囲です。Firefoxでは両端揃えが美しく決まっている。すてきだ。
