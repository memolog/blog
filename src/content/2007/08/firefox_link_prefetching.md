---
title: Firefox ：link prefetching（リンクの先読み機能）
date: 2007-08-21T15:41:00.000Z
categories:
  - web
excerpt: "*   Link prefetching FAQ *   sks blog » FirefoxのLink Prefetching（リンクの先読み機能）"
---

- [Link prefetching FAQ](http://developer.mozilla.org/ja/docs/Link_prefetching_FAQ)
- [sks blog » Firefox の Link Prefetching（リンクの先読み機能）](http://sks.s201.xrea.com/blog/archives/413)

いろいろ調べものをしていたときに見つけました。他のブラウザまでは調べていないのですが、Firefox では link タグのうち rel が「next」もしくは「prefetch」となっている href の URL を、ブラウザのアイドル時間中に先に読み込んでおきます。こうすることによって、次のページに遷移したときにスムーズにページが表示されます。たとえば HTML でプレゼンを作成した場合に、次のページの画像なども prefetch 対象にしておくと読み込みがスムーズになって良いかもしれない。

ただし、href にクエリストリングが含まれるような場合や（/blog//index/?foo=0 みたいな）、href が http 以外の場合は prefetch は行わないようになっている。逆に言えば、prefetch してほしくないときは href に適当なクエリストリング的なパスを入れておけば良いみたい。

prefetch による HTTP リクエストには「X-moz: prefetch」というヘッダが付与されているのでどのリクエストが prefetch によるものかは判別できる。これをうまく利用して prefetch をしないようにすることもできるかのかなと思います。 ![cap082101.png](/assets/i/2007/08/cap082101.png)
