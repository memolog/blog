---
title: Logical AND/OR/Nullish assignment operators
featured:
  image: cath-smith-PF5_cqOQFT4-unsplash
  author: Cath Smith
  authorLink: https://unsplash.com/@cathsmithphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-09-09 13:03:29
---
[ES.next News](http://esnextnews.com/)の9/1の回のメールにあった[Logical assignment operators in JavaScript](https://dev.to/hemanth/logical-assignment-operators-in-javascript-inh)について。[TypeScript 4.0 から利用可能](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0-rc/#short-circuiting-assignment-operators)。
<!-- more -->

### Logical AND assignment
[Logical AND assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)は`x &&= y`と書く。`x`が[truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy)の場合に`x = y` が実行される。`x`が[falsy](https://developer.mozilla.org/en-US/docs/Glossary/falsy)の場合は、`x = y`の部分は評価されない（Short-circuit evaluation）。だからコード的には

```javascript
x && (x = y)
```
と同じ処理であり、

```javascript
x = x && y
```
とは異なる（この場合はアサインメントが必ず発生するので）

### Logical OR assignment
[Logical OR assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)は`x ||= y`と書く。`x`がfalsyの場合に`x = y`が実行される。`x`がtruthyの場合は、`x = y`の部分は評価されない。だからコード的には

```javascript
x || (x = y)
```
と同じ処理であり、

```javascript
x = x || y
```
とは異なる（この場合はアサインメントが必ず発生するので）

### Logical nullish assignment
[Logical nullish assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment)は`x ??= y`と書く。`x`が[nullish](https://developer.mozilla.org/en-US/docs/Glossary/nullish)の場合、`x = y`が実行される。`x`がnullishでなければ、`x = y`の部分は評価されない。

```javascript
x ?? (x = y);
```
と同じであり、

```javascript
x = x ?? y;
```
とは異なる

### サポート状況
これら Logical assignments の対応状況は[ECMAScript compatible table](http://kangax.github.io/compat-table/es2016plus/#test-Logical_Assignment)を参照すると、すべてのブラウザ（IE11以外）で対応直近という感じにある。IE11が使えないとどうしてもそのままでは使えないが、TypeScriptでは4.0でこれらのtranspileをサポートしており利用することができる。[Playground](https://www.typescriptlang.org/play?ts=4.0.2)で試すことができる。

というメモ。
