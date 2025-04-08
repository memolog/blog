---
title: Webpack 5 compiles code with ES2015
featured:
  image: martin-bennie-xVgHduP61HY-unsplash
  author: martin bennie
  authorLink: https://unsplash.com/es/@martinbennie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2022-09-18 10:20:39
---
Webpackのバージョン5ではコンパイルしたコードにES2015（アロー関数など）が含まれるようになる。これはWebpackが生成する部分に関する仕様なので、babelの設定でES5だけに制限していてもES2015が使われる。IE11ではアロー関数が処理できずに丸ごとエラーとなるので、IE11にまだ対応する必要があれば設定を確認する必要がある（今さらだけど）。<!-- more -->

対応方法は[マイグレーションガイド](https://webpack.js.org/migrate/5/#need-to-support-an-older-browser-like-ie-11)に載っている。webpackの設定に `target: ['web', 'es5']` を追加するか、package.json の `browserslist` に `"browserslist": "defaults, IE 11"` みたいな感じでIE11を対象に含めておくと良い。`.babelrc`のtargetの設定をpackage.jsonのbrowserslistに移動させても良い。

browserslistが`defaults`のみだけど、コンパイルしたコードにアロー関数が含まれていない場合は、内部で参照している[caniuse-lite](https://www.npmjs.com/package/caniuse-lite)のDBが更新されていないためと思われる。
