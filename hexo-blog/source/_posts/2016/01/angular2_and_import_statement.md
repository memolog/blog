---
title: Angular2とimport statement
date: 2016-01-16T16:00:00.000Z
categories:
- web
tags:
- angular2
- javascript
---
[Angular2とDecorators - メモログ](/blog//2016/01/angular2_with_decorators/)に出した[5 Min Quickstart](https://angular.io/docs/ts/latest/quickstart.html)のサンプルを再掲すると、冒頭にimportのstatementがあります。

<!-- more -->

```javascript
import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: 'My First Angular 2 App'
})
export class AppComponent { }
```

これはES6（ES2015）で追加された[import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)機能。ES7でも[javascript-decorators/README.md at master ? wycats/javascript-decorators](https://github.com/leebyron/ecmascript-more-export-from)にて追加の宣言が提案されていて、このページには、ES6の宣言方法もリストにされてあって見やすい。

使い方は、たとえばモジュール側で[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)で下記のように宣言したとする。

```javascript
export function foo (){}
export function bar (){}
```

それをimportで呼び出すには、同じfunction名を使って呼び出すだけでいい。カンマ区切りで複数のfunctionを同時にimportできる。

```javascript
import {foo, bar} from "./foobar.js"
```

モジュール全体を呼び出すなら、「*」を使って呼び出すだけで良い。

```javascript
import * as foobar from "./foobar.js"
foobar.foo()
```

exportするモジュールでdefaultが設定されていれば、defaultのモジュールをシンプルな書き方で呼び出せる。

```javascript
export default function  (){ console.log("foobar") }
```

```javascript
import foobar from "foobar.js"
```

import / export のstatementは、現状で使われている CommonJS方式やAMD方式のメリットを踏襲しつつ、より簡潔で静的な解析がしやすい（=optimizeがしやすい）ものになっている。らしい。詳しくは[ECMAScript 6 modules: the final syntax](http://www.2ality.com/2014/09/es6-modules-final.html)が参考になる。いまのところ直接サポートしているブラウザはなくて、[Babel](https://babeljs.io/docs/learn-es2015/#modules)などのtranspilerを使う感じになる。

なお、webpack の [code splitting](https://webpack.github.io/docs/code-splitting.html#es6-modules)　は importの書式に対応していないらしい（webpackでbundleする前にCommonJSかAMD方式にtranspilerなどで変換する必要がある）。そして、webpackのcode splittingを使いたい場合は、CommonJS方式のrequire.ensureか、AMD方式のrequireか、いずれかを使った方がいい。

> ES6 Modules
> 
> **tldr: Webpack doesn't support es6 modules, use require.ensure or require directly depending on which module format your transpiler creates.**
> 
> Webpack 1.x.x (coming in 2.0.0!) does not natively support or understand ES6 modules. However, you can get around that by using a transpiler, like Babel, to turning the ES6 import syntax into CommonJs or AMD modules. This approach is effective but has one important caveat for dynamic loading.

追記（2016/2/4）：Webpack 2.0.5-betaでは、[ES6 modulesでのcode splitting](https://gist.github.com/sokra/27b24881210b56bbaff7#es6-modules)に対応している雰囲気。System.importの仕様の行方がいまいちわからないけど（[... Was that removed from the spec?](http://www.2ality.com/2014/09/es6-modules-final.html#comment-2217202273)）
