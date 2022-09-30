---
title: Unexpected reserved word 'interface' on jest
featured:
  image: glen-carrie-gsPnE6rMRns-unsplash
  author: Glen Carrie
  authorLink: https://unsplash.com/@glencarrie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2022-09-30 06:23:42
---
jestを28以降に更新したら、jestの実行時に`Unexpected reserved word 'interface'`みたいなエラーが返ってくるようになった。エラーの発生源はbabel-parserでinterfaceは予約語に含まれているため。typescriptで利用しているinterfaceがここでエラーになる。<!-- more -->

BabelでTypeScriptを利用する場合はpreset ( https://babeljs.io/docs/en/babel-preset-typescript ) を入れないといけないが、それは入っている。そもそもwebpackとbabel-loaderを使ってコードの生成はできていたので、babelrcの設定は間違ってない。

それなのになんでだろうなと、かなり悩んだのだけど、jestのバージョン28でbabelrcのパスを解決するのにrootDirを渡すようになっていたのが原因だった( https://jestjs.io/ja/docs/28.x/upgrading-to-jest28#babel-config )。

jest.config.jsのbabel-jestにbabelrcの設定を追加することで解決した。

```json
{% raw %}"transform": {
  "\\.[jt]sx?$": [ "babel-jest", {
    "babelrcRoots": "<rootDir>/../"
  }]
}{% endraw %}
```

jest.config.jsonはだいたいプロジェクトの直下に置かれているはずで、babelrcもプロジェクト直下にあると思うので、だいたいのプロジェクトでは問題にはならないと思う。今回はちょっと違う構成になっていて、エラー内容もわりと分かりにくかったので、原因を掴むのに時間がかかった。
