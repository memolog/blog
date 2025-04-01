---
title: indexOf とビット演算子
date: 2014-08-30T06:47:00.000Z
categories:
- web
tags:
- javascript
---
[String.prototype.indexOf() - JavaScript | MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)は、Stringの中の文字があったら、その文字の開始位置を返して、ない場合は「-1」を返します。

<!-- more -->

配列に対しても同様のメソッドがあり（[Array.prototype.indexOf() - JavaScript | MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)）、配列の中の要素と、与えた値がマッチするか（===で比較する）どうかを調べて、マッチしたら配列のindexを返して、ない場合は「-1」を返します。

たとえば、indexOfを使って、対象の文字列もしくは配列に、渡した値が存在するかどうかを確かめる場合、

```javascript
var a = 'foobar';
if (a.indexOf('bar') !== -1){
  console.log('Matched');
}
```

とする（[RegExp.prototype.test() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)もあるけど）。

ビット演算子（[Bitwise operators - JavaScript | MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)）は、ビットを扱う演算子。その中で「~」はNOTの扱う演算子で（[~ (Bitwise NOT)](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT)）、それぞれのbitを反転した値を返す。

Javascriptのビット演算子はSigned 32-bit integer に変換される、というMDNの記述を下記に引用する（ECMAScriptの仕様は確認してない...）。

> The operands of all bitwise operators are converted to signed 32-bit integers in two's complement format. Two's complement format means that a number's negative counterpart (e.g. 5 vs. -5) is all the number's bits inverted (bitwise NOT of the number, a.k.a. ones' complement of the number) plus one. For example, the following encodes the integer 314:

[日本語の情報](https://developer.mozilla.org/ja/docs/JavaScript/Reference/Operators/Bitwise_Operators)もあったので、該当箇所もあわせて引用。

> すべてのビット演算でオペランドは符号付き 32 ビット演算に、ビッグエンディアンおよび 2 の補数形式で変換されます。ビッグエンディアン形式とは、32 ビットを水平方向に並べたとき最上位ビット (最大値のビット位置) が左端にある形式です。2 の補数形式とは、ある値に対する負数 (例えば 5 と -5) は、正数のビットをすべて反転 (正数の NOT ビット演算、1 の補数として知られています) して 1 を加えたものです。例えば以下は、整数値 314 (10 進数) を表しています:

つまり、32bitにおける-1（base 10）は以下のようなbitになる。

```javascript
-1 (base 10) = 11111111111111111111111111111111 (base 2)
```

それを~のビット演算子で反転させると「00000000000000000000000000000000」というビットになる。これは10進数に数値にすると「0」になる。

Javascriptにおいて、数値の「0」はfalsyとして扱われ、それ以外はtruthyとなるので、上の方のindexOfの例を下記のように書き換えることができる。

```javascript
var a = 'foobar';
if (~a.indexOf('bar')){
  console.log('Matched');
}
```

a.indexOfでマッチしなかった場合のみ「-1」となり、-1を~のビット演算子で反転させた場合「0」となる。マッチしたときは「-1」以外になり、その場合ビット演算子で反転させた値も「0」以外となるので、truthyとなる。

なので、!== -1 で比較しても、~を使って比較しても、結果としては同じになる。

気分的に「~」を使う方が「!== -1」を使うより洗練されててエレガントな感じがある。どこかで使いたい。でも「!== -1」の方が直接的だし読みやすいよねえ、、と思って、結局いつも「!== -1」で比較している。

というメモ。
