---
title: Gatsbyでスタティックサイトを作成する
date: 2017-12-29
excerpt: "更新しなくなったブログをリニューアルしようと思って、Gatsby で構築しようと思い立って、今作成してみている。  Gatsbyは「Blazing-fast static site generator for React」ということで、Reactベースのスタティックサイトジェネレータらしいのだけど、実のところまだよくわかっていない。Getting Started のドキュメントをみて、gatsby-starter-blog のstarterをGithub pages で公開しているだけなのだ。"
---

更新しなくなったブログをリニューアルしようと思って、[Gatsby](https://www.gatsbyjs.org) で構築しようと思い立って、今作成してみている。

Gatsby は「Blazing-fast static site generator for React」ということで、React ベースのスタティックサイトジェネレータらしいのだけど、実のところまだよくわかっていない。[Getting Started](https://www.gatsbyjs.org/docs/) のドキュメントをみて、[gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) の starter を Github pages で公開しているだけなのだ。

とはいえ、一応最初に行ったことをそのまま書き記しておこうと思う。

## nvm で Node 9.x をインストール

インストール時か`gatsby develop`のときか失念してしまったが、どこかのタイミングで`error serve@6.4.3: The engine "node" is incompatible with this module. Expected version ">=6.9.0".`というエラーが発生してしまったので、ローカル環境に 9.2 をインストール（今確認したらすでに最新は 9.3 だったが）。[nvm](https://github.com/creationix/nvm) はだいぶ前にインストールしたのでどうインストールしたか失念。[Homebrew](https://brew.sh/) でインストールしたのかもしれない。

```bash
nvm install 9
nvm alias default 9
```

デフォルトの設定を 6.x にしていたのだけど、これを機にローカルで使用するバージョンは 9.x に変更した。

## Gatsby CLI のインストール とサイトの作成

ここから先は基本的には[Gatsby getting started](https://www.gatsbyjs.org/docs/) と同じことをただやった。

```bash
npm install -g gatsby-cli
gatsby new memolog https://github.com/gatsbyjs/gatsby-starter-blog
```

## Github Pages へのデプロイ

Github pages にデプロイするためにレポジトリを Github 上で作成して、レポジトリを設定。

```bash
git init
git remote add origin git@github.com:memolog/site.git
git add .
git commit
git push origin master
```

そのあと、 [Deploying Getsby](https://www.gatsbyjs.org/docs/deploy-gatsby/#github-pages) の内容にしたがって、Github Pages へのデプロイ準備
[Yarn](https://yarnpkg.com/docs/install) はいつインストールしたか失念したが、`brew install yarn --without-node` でインストールしたと思う。

```bash
yarn add gh-pages --dev
yarn deploy
```

これで完了。いまのところデフォルトのテンプレートそのままなので、これからその辺りを更新していこうと思う。とりあえずプロフィール画像だけでも変更しておきたい。

個人的にはカスタムドメインを使用したかっただけど、SSL 証明書の関係や、Amazon S3 と CloudFront、Route53 で新しいドメイン用意しても、個人サイトのトラフィックだとたいしてお金かからないらしいのだけど、個人サイトだし、いつ気が変わってやめるかもわからないし、お金かけずにやる方がいいかなと思って github.io をそのまま使うことにした。

（テスト投稿するつもりだけだったのに無駄に文字を書き連ねてしまった）
