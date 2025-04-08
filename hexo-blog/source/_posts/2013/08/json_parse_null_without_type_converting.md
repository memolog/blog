---
title: HTC EVO (Android 2.3) と JSON.parse(null)
date: 2013-08-16T12:00:00.000Z
categories:
- web
tags:
- android
- javascript
---
HTC EVO(2.3.4)のAndroid端末で、localStorageに入れた値をJSON.parseした場合に、localStorageからnullが渡るとillegal accessのエラーになる。エラーを出力しないようだけど。。。weinreのコンソールでJSON.parse(null)と打つとそのようなエラーが確認できる。

<!-- more -->

[現象再現用のcodepen](http://codepen.io/memolog/full/IdwJL)。エラーが発生しない場合は、alertで「null」と表示されます。alertが出ない場合は、JSON.parse(null)の処理でillegal accessのエラーが発生していて、途中で処理が止まっている。

[JSON.parseのsyntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)的にparseの対象はtextである必要があって、nullがillegalというのは当然なのかもしれない。でもモダンなブラウザではエラーにならない。JSON.parse(null)をしてもnullが返ってくる。おそらく、モダンブラウザではillegalにせずにtype convertをして結果を返してくれるけど、HTC EVOの(stock)ブラウザではtype convertしてくれない。うむむ。なお、HTC EVOの場合、JSON.parse(false)の場合もillegalになる。string以外はだめ。

さらに悪いことに、console.logでも、渡した値がtoStringをもたない場合は、エラーになってしまう。console.logでデバックするときに、渡した値がundefinedやnullになっていると、そこで処理が止まってしまう。 これはなかなかつらい。外部動作的にはただ処理が途中で止まっているようにしか見えないし、console.logでも状況把握が一歩遅れる。

さらにさらに悪いことに、この現象、HTC EVO(2.3.4)では再現するけど、他の2.3.4端末では発生しない... ブラウザのバージョンは（UserAgentを見る限りでは）533.1で同じに見えるけど、ビルドの違いで発生するのか、なんなのか... この点もつらい。手元にない端末で現象が発生すると、再現できないから原因も分からない。骨が折れる調査になることは間違いない。

JSON.parse用の回避策は簡単で、localStorageの値を判定してnull(falsy)の場合はparseしないという風にしておけば良い。

```
var parsedItem = localStorage.getItem('noStoredItem') ? JSON.parse(localStorage.getItem('noStoredItem')) : null;

```

または

```
var parsedItem = JSON.parse((localStorage.getItem('noStoredItem')||'null'));

```

というメモ
