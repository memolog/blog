---
title: Firefox &#x3a; link prefetching（リンクの先読み機能）
date: 2007-08-21T15:41:00.000Z
categories:
- web
---
*   [Link prefetching FAQ](http://developer.mozilla.org/ja/docs/Link_prefetching_FAQ)
*   [sks blog » FirefoxのLink Prefetching（リンクの先読み機能）](http://sks.s201.xrea.com/blog/archives/413)

<!-- more -->

いろいろ調べものをしていたときに見つけました。他のブラウザまでは調べていないのですが、Firefoxではlinkタグのうちrelが「next」もしくは「prefetch」となっているhrefのURLを、ブラウザのアイドル時間中に先に読み込んでおきます。こうすることによって、次のページに遷移したときにスムーズにページが表示されます。たとえばHTMLでプレゼンを作成した場合に、次のページの画像などもprefetch対象にしておくと読み込みがスムーズになって良いかもしれない。

ただし、hrefにクエリストリングが含まれるような場合や（/blog//index/?foo=0 みたいな）、hrefがhttp以外の場合はprefetchは行わないようになっている。逆に言えば、prefetchしてほしくないときはhrefに適当なクエリストリング的なパスを入れておけば良いみたい。

prefetchによるHTTP リクエストには「X-moz: prefetch」というヘッダが付与されているのでどのリクエストがprefetchによるものかは判別できる。これをうまく利用してprefetchをしないようにすることもできるかのかなと思います。 ![cap082101.png](/blog//assets/i/2007/08/cap082101.png)
