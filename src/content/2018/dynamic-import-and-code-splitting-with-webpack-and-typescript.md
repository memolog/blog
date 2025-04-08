---
title: TypeScriptとWebpackを使ってDynamic Importを行う
featured:
  image: erwan-hesry-166245-unsplash
  author: Erwan Hesry
  authorLink: https://unsplash.com/photos/Q34YB7yjAxA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-08 07:40:57
excerpt: "Webpackではバンドルするファイルを3つのアプローチで分けることができる。エントリーポイントを複数設けたり、webpack.config.jsにsplitChunksの設定を入れたりなどの他に、Dyanmic importを使うことでもファイルを分けることができる。詳しくはCode Splittingを参照。"
---

Webpack ではバンドルするファイルを 3 つのアプローチで分けることができる。エントリーポイントを複数設けたり、webpack.config.js に splitChunks の設定を入れたりなどの他に、Dyanmic import を使うことでもファイルを分けることができる。詳しくは[Code Splitting](https://webpack.js.org/guides/code-splitting/)を参照。

[Dyanmic import](https://github.com/tc39/proposal-dynamic-import)は ES2015 の[import](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import)が静的にライブラリを読み込むのに対して、動的に読み込む。たいていの場合普通の import で事足りる一方、多言語用のファイルとか、普段は必要なくて全部読み込むとファイルサイズが大きくなるとか、なくてもまあ基本的な機能に問題ないみたいなものは必要なときに動的にファイルを読み込みたい場合もある。そういったときに Dynamic Import を利用する。

> **Motivation and use cases**

> The existing syntactic forms for importing modules are static declarations. They accept a string literal as the module specifier, and introduce bindings into the local scope via a pre-runtime "linking" process. This is a great design for the 90% case, and supports important use cases such as static analysis, bundling tools, and tree shaking.

> However, it's also desirable to be able to dynamically load parts of a JavaScript application at runtime. This could be because of factors only known at runtime (such as the user's language), for performance reasons (not loading code until it is likely to be used), or for robustness reasons (surviving failure to load a non-critical module). Such dynamic code-loading has a long history, especially on the web, but also in Node.js (to delay startup costs). The existing import syntax does not support such use cases.

> Truly dynamic code loading also enables advanced scenarios, such as racing multiple modules against each other and choosing the first to successfully load.

> [Dyanmic import](https://github.com/tc39/proposal-dynamic-import)

実装的にはこんな感じになる（[サンプルコード](https://github.com/memolog/typescript-webpack-dynamic-import-sample)）。Dynamic import の部分があると webpack が自動的に code splitting してくれるけれど、split されたチャンク名をつけたい場合はファイル名の前にコメントをつける。

```javascript
import(/* webpackChunkName: "hello" */ "./hello_world").then((module) => {
  const hello = new module.HelloWorld();
  hello.say();
});
```

TypeScript の場合は、[Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)で removeComments を true にしていると、webpack が split する前にコメントを消してしまうので removeComments を false にする必要がある（Production モードの場合、[Webpack の minification](https://webpack.js.org/guides/production/#minification)で最終的にコメントを消してくれる）。

Webpack はデフォルトで node_modules から読み込んだライブラリを`vendors`の cacheGroup に分ける。Dynamic Import したファイルで node_modules からライブラリを読み込んだりすると`vendors~hello.js`みたいな名前でファイルを分割する。vendors にファイルを分けたくない場合は、cacheGroup で vendors の設定を false にする。

あと、cacheGroup の名前と chunk の名前の間の delimiter はデフォルトで`~`になっている。通常これで問題ないけど、AWS の CloudFront で cache を invalidate しようすると valid なファイル名じゃないとエラーになるので、変更する必要がでるかもしれない。そういうときには`automaticNameDelimiter`の設定で変更することができる。

```json
  optimization: {
    namedChunks: true,
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: false
      }
    }
  },
```

というメモ。
