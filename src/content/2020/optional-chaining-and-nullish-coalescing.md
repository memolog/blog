---
title: Optional chaining and Nullish coalescing
featured:
  image: ben-hershey-1IZBAlIs4ug-unsplash
  author: Ben Hershey
  authorLink: https://unsplash.com/@introspectivedsgn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-06 07:25:28
excerpt: "ES2020で新しく追加された機能（ECMAScript 2016+ compatibility tableの画面の下の方にある）はどれもわりと実用的で、なくても大丈夫なんだけどあると便利といったものが並んでいる。Bigintは日常的には使わないとは思うけど。  その中で、Nullish coalescingとOptional chaining はかなり便利。なくても大丈夫だし、使わなくても良いんだけど、便利だから日常的に書かれるJavaScriptの書き方を変えるものになると思う。"
---

ES2020 で新しく追加された機能（[ECMAScript 2016+ compatibility table](https://kangax.github.io/compat-table/es2016plus/)の画面の下の方にある）はどれもわりと実用的で、なくても大丈夫なんだけどあると便利といったものが並んでいる。Bigint は日常的には使わないとは思うけど。

その中で、[Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)と[Optional chaining](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining) はかなり便利。なくても大丈夫だし、使わなくても良いんだけど、便利だから日常的に書かれる JavaScript の書き方を変えるものになると思う。

まず、Nullish とは何かというと、値が null か undefined になるものを言う。[Falsy](https://developer.mozilla.org/ja/docs/Glossary/Falsy)の場合、数値の 0 とか NaN、空文字列などが含まれるけど、Nullish は値が存在しない場合（null と undefined）だけを扱う。

論理演算子の`&&`や`||`（[論理演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_Operators)）は、Falsy な値ははすべて False として扱うので、

```javascript
const foo = 0;
const bar = foo || 100;
```

としたとき、0 のような Falsy な値を`bar`に渡したい場合でも、`||`の右側の値が使われてしまう。こういったときに従来なら

```javascript
const foo = 0;
const bar = typeof foo === "undefined" || foo === null ? 100 : foo;
```

みたいな感じにしないといけなかった。（Strict モードなら undefined が別の値になることはないので、`foo === undefined`と書いても大丈夫）。

Nullish coalescing なら undefined か null の場合だけ扱うようになるので、以下のように簡単に書く事ができる。

```javascript
const foo = 0;
const bar = foo ?? 100;
```

これは便利。
