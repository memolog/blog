---
title: Angular2とDecorators
date: 2016-01-13T16:15:00.000Z
categories:
  - web
tags:
  - angular2
  - es7
  - javascript
  - typescript
excerpt: "Decorators は ECMAScript で Propose となっている実装で、Angular 2 と TypeScript を使った実装ではよく出てくる。 Exploring ES2016 Decorators -- Google Developers -- Mediumを参考にすると、定義したfunction名の頭に「@」をつけて、使いたいclassやpropertyの前に記述するらしい。"
---

Decorators は [ECMAScript](https://github.com/tc39/ecma262) で Propose となっている実装で、Angular 2 と TypeScript を使った実装ではよく出てくる。 [Exploring ES2016 Decorators -- Google Developers -- Medium](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)を参考にすると、定義した function 名の頭に「@」をつけて、使いたい class や property の前に記述するらしい。

> An ES2016 decorator is an expression which returns function and can take a target, name and property descriptor as arguments. You apply it by prefixing the decorator with an `@` character and placing this at the very top of what you are trying to decorate. Decorators can be defined for either a class or property.

[Exploring ES2016 Decorators -- Google Developers -- Medium](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)に記述されているサンプルコード（一部）は下記のような感じ。

```javascript
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
class Cat {
  @readonly
  meow() {
    return `${this.name} says Meow`;
  }
}
```

上記の例の場合、meow function オブジェクトの writable プロパティが false に設定される。

Angular.io の[5 Min Quickstart](https://angular.io/docs/ts/latest/quickstart.html)では、下記のようなサンプルコードが載っている。@Component の Decorators で設定したプロパティが、AppComponent に設定される。

```javascript
import { Component } from "angular2/core";

@Component({
  selector: "my-app",
  template: "My First Angular 2 App",
})
export class AppComponent {}
```

（なお、TypeScript を Javascript に compile する場合には、tsconfig の compilerOptions で"experimentalDecorators": true の設定が必要がある。）

という感じのメモ（書いてみたら大して書くこと思いつかなかった）。

そのほか参考：

- [Angular 2 Fundamentals\* - Course by @johnlindquist @eggheadio](https://egghead.io/series/angular-2-fundamentals)
- [JavaScript Decorators - Qiita](http://qiita.com/armorik83/items/e3a0ce67f569ddc4b432)
