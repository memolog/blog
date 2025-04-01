---
title: 縦方向のfloatを実現するjQuery Masonry
date: 2012-06-18T12:36:00.000Z
categories:
- web
tags:
- jquery
---
いわゆる[Pinterest](http://pinterest.com/)風な縦方向にfloatさせるjQueryのpluginが[.net Magazine](http://www.netmagazine.com/shop/magazines/july-2012-229)で紹介されていたので、試してみました。floatさせたいコンテンツのclass（と全体を囲っているコンテナのclass）と、1カラムあたりの幅を指定するだけで、縦方向にfloatさせることができます。便利。[写真の記事一覧画面](http://memolog.org/photo/)とか、写真があるとやはり映えますなあとか、悦に入っています（写真最近撮ってないな）。

<!-- more -->

オプションもいろいろあって、[jQuery Mansory](http://masonry.desandro.com/docs/options.html)に書かれています。isFitWidthをtrueにすると、表示幅にあわせて横に配置できるコンテンツの数を自動的に調整してくれるのでそれを指定。

どのように縦方向にfloatさせるかというと、コンテンツのdivにposition:absoluteを設定して、高さをOuterHeightとかで取得して積み上げて配置している様子（詳細は勉強不足...）。そのため、画像などがロードされるまえに高さの計算がされると、画像がロードされたときにコンテンツの高さが変わるのでレイアウトが重なってしまう。

そのあたりの対策が[Help](http://masonry.desandro.com/docs/help.html)に書かれていて、方法としてはロードし終わったあとにmasonryを実行するか、imagesLoadedのtriggerを使用して、triggerが反応したときにmasonry.reload()をするといい。

Demoも充実していて、Demoの画面とそこに書かれているmasonry用のコードをコピペするだけでも使えてしまう。すばらしい。 特に[Tumblelog example](http://masonry.desandro.com/demos/tumblelog.html)はいい感じ。pinterest風なカラムの幅が一定のデザインも良いですけど、大中小の横幅がバランスよく混じっているのも動きがあって良いですね。
