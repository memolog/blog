---
title: Unexpected reserved word 'interface' on jest
featured:
  image: Unexpected-reserved-word-interface-on-jest.webp
  author: chatGPT
date: 2022-09-30 06:23:42
excerpt: "jestを28以降に更新したら、jestの実行時に`Unexpected reserved word 'interface'`みたいなエラーが返ってくるようになった。エラーの発生源はbabel-parserでinterfaceは予約語に含まれているため。typescriptで利用しているinterfaceがここでエラーになる。"
---

jest を 28 以降に更新したら、jest の実行時に`Unexpected reserved word 'interface'`みたいなエラーが返ってくるようになった。エラーの発生源は babel-parser で interface は予約語に含まれているため。typescript で利用している interface がここでエラーになる。

Babel で TypeScript を利用する場合は preset ( https://babeljs.io/docs/en/babel-preset-typescript ) を入れないといけないが、それは入っている。そもそも webpack と babel-loader を使ってコードの生成はできていたので、babelrc の設定は間違ってない。

それなのになんでだろうなと、かなり悩んだのだけど、jest のバージョン 28 で babelrc のパスを解決するのに rootDir を渡すようになっていたのが原因だった( https://jestjs.io/ja/docs/28.x/upgrading-to-jest28#babel-config )。

jest.config.js の babel-jest に babelrc の設定を追加することで解決した。

```json
"transform": {
  "\\.[jt]sx?$": [ "babel-jest", {
    "babelrcRoots": "<rootDir>/../"
  }]
}
```

jest.config.json はだいたいプロジェクトの直下に置かれているはずで、babelrc もプロジェクト直下にあると思うので、だいたいのプロジェクトでは問題にはならないと思う。今回はちょっと違う構成になっていて、エラー内容もわりと分かりにくかったので、原因を掴むのに時間がかかった。
