---
title: カスタムドメインを設定する
featured:
  image: pierre-chatel-innocenti-477580-unsplash
  author: Pierre Châtel-Innocenti
  authorLink: https://unsplash.com/photos/cgagYoakDS8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-08 05:58:41
excerpt: "このサイトはHexoを使ってGithub Pagesに公開しているのだけど、最近Github PagesカスタムドメインでもHTTPSをサポートしてくれるようになったので、適当にリダイレクトかけていた元の memolog.org のドメインを設定することにした。"
---

このサイトは[Hexo](https://hexo.io/)を使って Github Pages に公開しているのだけど、最近[Github Pages カスタムドメインでも HTTPS をサポートしてくれるようになった](https://blog.github.com/2018-05-01-github-pages-custom-domains-https/)ので、[適当にリダイレクトかけていた](../../2018/redirect-to-my-old-blog/)元の memolog.org のドメインを設定することにした。

まず[Setting up an apex domain](https://help.github.com/articles/setting-up-an-apex-domain/)にしたがって、memolog.org の A レコードを変更。

その後、Github の設定画面の「Custom domain」に memolog.org を入れて、準備ができたら Enforce HTTPS を有効にして完了。

このままだと Hexo で Github Pages に記事を更新するときに HTTPS 設定が外れてしまうので、[hexo-deployer-git の issue](https://github.com/hexojs/hexo-deployer-git/issues/87)を参考に、source のディレクトリに[CNAME ファイル](https://github.com/memolog/blog/blob/master/source/CNAME)を追加。

Chrome で dev tools で証明書の確認したらちゃんと Let's encrypt から発行されていました。
![](/assets/images/certification-memolog.png)
