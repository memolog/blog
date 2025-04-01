---
title: JavaScriptにおける値の受け渡しについて
date: 2014-06-08T15:00:00.000Z
categories:
- web
tags:
- javascript
---
少し前にJavaScriptの値の受け渡し方について改めて調べていたら、[Passing by value vs. by reference](https://developer.mozilla.org/en-US/docs/Talk:JavaScript/Guide/Obsolete_Pages/Defining_Functions)の話が大変参考になった。詳しくは上記リンクを参照。

<!-- more -->

簡単に言うと、JavaScriptの値の受け渡しは「Pass by value」なのだけど、渡す値がObjectの場合は、Objectが格納されている場所に関する情報が渡される。

つまり

```
var a = 0;
function f(x){
  x = 10;
  console.log(a, x);
};
f(a);
```

とすると、値が渡されただけなので、元のデータを参照しない。xは10だけど、aは0のままになる。

一方で、

```
var a = [0];
function f(x){
  x[0] = 10;
  console.log(a, x);
};
f(a);
```

とすると、渡された値が配列オブジェクトなので、xの値は元のオブジェクトが格納されている場所の情報になる。いわゆる参照渡しの状態になる。xは\[10\]となるし、aも\[10\]となる。

でも、

```
var a = [0];
function f(x){
  x = [10];
  console.log(a, x);
};
f(a);
```

とすると、xが新しい配列オブジェクトに置き換わることになり、元のオブジェクトaとの関連はなくなる。なので、aは\[0\]のままで、xは\[10\]となる。

というメモ。
