---
title: Angular2とimport statement
date: 2016-01-16T16:00:00.000Z
categories:
  - web
tags:
  - angular2
  - javascript
excerpt: "Angular2とDecorators - メモログに出した5 Min Quickstartのサンプルを再掲すると、冒頭にimportのstatementがあります。"
---

[Angular2 と Decorators - メモログ](/2016/01/angular2_with_decorators/)に出した[5 Min Quickstart](https://angular.io/docs/ts/latest/quickstart.html)のサンプルを再掲すると、冒頭に import の statement があります。

```javascript
import { Component } from "angular2/core";

@Component({
  selector: "my-app",
  template: "My First Angular 2 App",
})
export class AppComponent {}
```

これは ES6（ES2015）で追加された[import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)機能。ES7 でも[javascript-decorators/README.md at master ? wycats/javascript-decorators](https://github.com/leebyron/ecmascript-more-export-from)にて追加の宣言が提案されていて、このページには、ES6 の宣言方法もリストにされてあって見やすい。

使い方は、たとえばモジュール側で[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)で下記のように宣言したとする。

```javascript
export function foo() {}
export function bar() {}
```

それを import で呼び出すには、同じ function 名を使って呼び出すだけでいい。カンマ区切りで複数の function を同時に import できる。

```javascript
import { foo, bar } from "./foobar.js";
```

モジュール全体を呼び出すなら、「\*」を使って呼び出すだけで良い。

```javascript
import * as foobar from "./foobar.js";
foobar.foo();
```

export するモジュールで default が設定されていれば、default のモジュールをシンプルな書き方で呼び出せる。

```javascript
export default function () {
  console.log("foobar");
}
```

```javascript
import foobar from "foobar.js";
```

import / export の statement は、現状で使われている CommonJS 方式や AMD 方式のメリットを踏襲しつつ、より簡潔で静的な解析がしやすい（=optimize がしやすい）ものになっている。らしい。詳しくは[ECMAScript 6 modules: the final syntax](http://www.2ality.com/2014/09/es6-modules-final.html)が参考になる。いまのところ直接サポートしているブラウザはなくて、[Babel](https://babeljs.io/docs/learn-es2015/#modules)などの transpiler を使う感じになる。

なお、webpack の [code splitting](https://webpack.github.io/docs/code-splitting.html#es6-modules)　は import の書式に対応していないらしい（webpack で bundle する前に CommonJS か AMD 方式に transpiler などで変換する必要がある）。そして、webpack の code splitting を使いたい場合は、CommonJS 方式の require.ensure か、AMD 方式の require か、いずれかを使った方がいい。

> ES6 Modules
>
> **tldr: Webpack doesn't support es6 modules, use require.ensure or require directly depending on which module format your transpiler creates.**
>
> Webpack 1.x.x (coming in 2.0.0!) does not natively support or understand ES6 modules. However, you can get around that by using a transpiler, like Babel, to turning the ES6 import syntax into CommonJs or AMD modules. This approach is effective but has one important caveat for dynamic loading.

追記（2016/2/4）：Webpack 2.0.5-beta では、[ES6 modules での code splitting](https://gist.github.com/sokra/27b24881210b56bbaff7#es6-modules)に対応している雰囲気。System.import の仕様の行方がいまいちわからないけど（[... Was that removed from the spec?](http://www.2ality.com/2014/09/es6-modules-final.html#comment-2217202273)）
