---
title: Webpack 5 compiles code with ES2015
featured:
  image: martin-bennie-xVgHduP61HY-unsplash
  author: martin bennie
  authorLink: https://unsplash.com/es/@martinbennie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2022-09-18 10:20:39
excerpt: "Webpackのバージョン5ではコンパイルしたコードにES2015（アロー関数など）が含まれるようになる。これはWebpackが生成する部分に関する仕様なので、babelの設定でES5だけに制限していてもES2015が使われる。IE11ではアロー関数が処理できずに丸ごとエラーとなるので、IE11にまだ対応する必要があれば設定を確認する必要がある（今さらだけど）。"
---

Webpack のバージョン 5 ではコンパイルしたコードに ES2015（アロー関数など）が含まれるようになる。これは Webpack が生成する部分に関する仕様なので、babel の設定で ES5 だけに制限していても ES2015 が使われる。IE11 ではアロー関数が処理できずに丸ごとエラーとなるので、IE11 にまだ対応する必要があれば設定を確認する必要がある（今さらだけど）。

対応方法は[マイグレーションガイド](https://webpack.js.org/migrate/5/#need-to-support-an-older-browser-like-ie-11)に載っている。webpack の設定に `target: ['web', 'es5']` を追加するか、package.json の `browserslist` に `"browserslist": "defaults, IE 11"` みたいな感じで IE11 を対象に含めておくと良い。`.babelrc`の target の設定を package.json の browserslist に移動させても良い。

browserslist が`defaults`のみだけど、コンパイルしたコードにアロー関数が含まれていない場合は、内部で参照している[caniuse-lite](https://www.npmjs.com/package/caniuse-lite)の DB が更新されていないためと思われる。
