---
title: text-align&#x3a; justifyで段落を両端揃えにする
date: 2008-06-09T12:45:46.000Z
categories:
  - web
tags:
  - css
excerpt: "*   text-align−スタイルシートリファレンス  「text-align:justify」は、対応していないブラウザがあるから使わない・・と思っていたのでが、今ではどのブラウザでもだいたい対応しているということに今さら気がつきました。いちど見捨てたプロパティにはなかなか目を向けないものだなと思った次第でございます。"
---

- [text-align− スタイルシートリファレンス](http://www.htmq.com/style/text-align.shtml)

「text-align:justify」は、対応していないブラウザがあるから使わない・・と思っていたのでが、今ではどのブラウザでもだいたい対応しているということに今さら気がつきました。いちど見捨てたプロパティにはなかなか目を向けないものだなと思った次第でございます。

追加した CSS はこんな感じ。特に何のひねりもないです。

```
.asset-content{text-align:justify; text-justify:distribute;}

```

IE 6 で確認した感じでは、日本語の両端揃えはまだ text-justify の方が有効に機能するようなので、text-justify:distribute;を入れています。英文であれば text-align:justify のみで問題なさそうな感じでした。

また、Safari3 では日本語の両端揃えは若干不得意のようで、半角英数が文中に含まれている場合や、禁則処理（「、」が行頭にこないようにしたりすること）をしたりすると、でこぼこしてしまう。でも個人的には許容範囲です。Firefox では両端揃えが美しく決まっている。すてきだ。
