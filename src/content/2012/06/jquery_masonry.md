---
title: 縦方向のfloatを実現するjQuery Masonry
date: 2012-06-18T12:36:00.000Z
featured:
  image: jquery_masonry.webp
  author: chagGPT
categories:
  - web
tags:
  - jquery
excerpt: "いわゆるPinterest風な縦方向にfloatさせるjQueryのpluginが.net Magazineで紹介されていたので、試してみました。floatさせたいコンテンツのclass（と全体を囲っているコンテナのclass）と、1カラムあたりの幅を指定するだけで、縦方向にfloatさせることができます。便利。写真の記事一覧画面とか、写真があるとやはり映えますなあとか、悦に入っています（写真最近撮ってないな）。"
---

いわゆる[Pinterest](http://pinterest.com/)風な縦方向に float させる jQuery の plugin が[.net Magazine](http://www.netmagazine.com/shop/magazines/july-2012-229)で紹介されていたので、試してみました。float させたいコンテンツの class（と全体を囲っているコンテナの class）と、1 カラムあたりの幅を指定するだけで、縦方向に float させることができます。便利。[写真の記事一覧画面](http://memolog.org/photo/)とか、写真があるとやはり映えますなあとか、悦に入っています（写真最近撮ってないな）。

オプションもいろいろあって、[jQuery Mansory](http://masonry.desandro.com/docs/options.html)に書かれています。isFitWidth を true にすると、表示幅にあわせて横に配置できるコンテンツの数を自動的に調整してくれるのでそれを指定。

どのように縦方向に float させるかというと、コンテンツの div に position:absolute を設定して、高さを OuterHeight とかで取得して積み上げて配置している様子（詳細は勉強不足...）。そのため、画像などがロードされるまえに高さの計算がされると、画像がロードされたときにコンテンツの高さが変わるのでレイアウトが重なってしまう。

そのあたりの対策が[Help](http://masonry.desandro.com/docs/help.html)に書かれていて、方法としてはロードし終わったあとに masonry を実行するか、imagesLoaded の trigger を使用して、trigger が反応したときに masonry.reload()をするといい。

Demo も充実していて、Demo の画面とそこに書かれている masonry 用のコードをコピペするだけでも使えてしまう。すばらしい。 特に[Tumblelog example](http://masonry.desandro.com/demos/tumblelog.html)はいい感じ。pinterest 風なカラムの幅が一定のデザインも良いですけど、大中小の横幅がバランスよく混じっているのも動きがあって良いですね。
