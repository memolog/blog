---
title: HTC EVO (Android 2.3) と JSON.parse(null)
date: 2013-08-16T12:00:00.000Z
categories:
  - web
tags:
  - android
  - javascript
excerpt: "HTC EVO(2.3.4)のAndroid端末で、localStorageに入れた値をJSON.parseした場合に、localStorageからnullが渡るとillegal accessのエラーになる。エラーを出力しないようだけど。。。weinreのコンソールでJSON.parse(null)と打つとそのようなエラーが確認できる。"
---

HTC EVO(2.3.4)の Android 端末で、localStorage に入れた値を JSON.parse した場合に、localStorage から null が渡ると illegal access のエラーになる。エラーを出力しないようだけど。。。weinre のコンソールで JSON.parse(null)と打つとそのようなエラーが確認できる。

[現象再現用の codepen](http://codepen.io/memolog/full/IdwJL)。エラーが発生しない場合は、alert で「null」と表示されます。alert が出ない場合は、JSON.parse(null)の処理で illegal access のエラーが発生していて、途中で処理が止まっている。

[JSON.parse の syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)的に parse の対象は text である必要があって、null が illegal というのは当然なのかもしれない。でもモダンなブラウザではエラーにならない。JSON.parse(null)をしても null が返ってくる。おそらく、モダンブラウザでは illegal にせずに type convert をして結果を返してくれるけど、HTC EVO の(stock)ブラウザでは type convert してくれない。うむむ。なお、HTC EVO の場合、JSON.parse(false)の場合も illegal になる。string 以外はだめ。

さらに悪いことに、console.log でも、渡した値が toString をもたない場合は、エラーになってしまう。console.log でデバックするときに、渡した値が undefined や null になっていると、そこで処理が止まってしまう。 これはなかなかつらい。外部動作的にはただ処理が途中で止まっているようにしか見えないし、console.log でも状況把握が一歩遅れる。

さらにさらに悪いことに、この現象、HTC EVO(2.3.4)では再現するけど、他の 2.3.4 端末では発生しない... ブラウザのバージョンは（UserAgent を見る限りでは）533.1 で同じに見えるけど、ビルドの違いで発生するのか、なんなのか... この点もつらい。手元にない端末で現象が発生すると、再現できないから原因も分からない。骨が折れる調査になることは間違いない。

JSON.parse 用の回避策は簡単で、localStorage の値を判定して null(falsy)の場合は parse しないという風にしておけば良い。

```
var parsedItem = localStorage.getItem('noStoredItem') ? JSON.parse(localStorage.getItem('noStoredItem')) : null;

```

または

```
var parsedItem = JSON.parse((localStorage.getItem('noStoredItem')||'null'));

```

というメモ
