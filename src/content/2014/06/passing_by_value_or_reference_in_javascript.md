---
title: JavaScriptにおける値の受け渡しについて
date: 2014-06-08T15:00:00.000Z
categories:
  - web
tags:
  - javascript
excerpt: "少し前にJavaScriptの値の受け渡し方について改めて調べていたら、Passing by value vs. by referenceの話が大変参考になった。詳しくは上記リンクを参照。"
---

少し前に JavaScript の値の受け渡し方について改めて調べていたら、[Passing by value vs. by reference](https://developer.mozilla.org/en-US/docs/Talk:JavaScript/Guide/Obsolete_Pages/Defining_Functions)の話が大変参考になった。詳しくは上記リンクを参照。

簡単に言うと、JavaScript の値の受け渡しは「Pass by value」なのだけど、渡す値が Object の場合は、Object が格納されている場所に関する情報が渡される。

つまり

```
var a = 0;
function f(x){
  x = 10;
  console.log(a, x);
};
f(a);
```

とすると、値が渡されただけなので、元のデータを参照しない。x は 10 だけど、a は 0 のままになる。

一方で、

```
var a = [0];
function f(x){
  x[0] = 10;
  console.log(a, x);
};
f(a);
```

とすると、渡された値が配列オブジェクトなので、x の値は元のオブジェクトが格納されている場所の情報になる。いわゆる参照渡しの状態になる。x は\[10\]となるし、a も\[10\]となる。

でも、

```
var a = [0];
function f(x){
  x = [10];
  console.log(a, x);
};
f(a);
```

とすると、x が新しい配列オブジェクトに置き換わることになり、元のオブジェクト a との関連はなくなる。なので、a は\[0\]のままで、x は\[10\]となる。

というメモ。
