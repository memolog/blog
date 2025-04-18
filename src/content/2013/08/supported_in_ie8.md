---
title: あらためて IE8 について
date: 2013-08-08T14:00:00.000Z
featured:
  image: frode-myklebust-rHs9qFMrcDk-unsplash.webp
  author: Frode Myklebust
  authorLink: https://unsplash.com/ja/@famyklebust?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplashnp
categories:
  - web
tags:
  - css
  - ie
excerpt: "少し前までIE6で動かないから... というような気がするのですが、気がついたら過去のブラウザになっていて、サポート対象でもIE8が最低限のバージョンという感じになってきました。いつのまにか。  しかしながらIE6の時代が長かったのもあり、IE6でもできることをベースに作成するクセがついている。個人的に。"
---

少し前まで IE6 で動かないから... というような気がするのですが、気がついたら過去のブラウザになっていて、サポート対象でも IE8 が最低限のバージョンという感じになってきました。いつのまにか。

しかしながら IE6 の時代が長かったのもあり、IE6 でもできることをベースに作成するクセがついている。個人的に。

それでこのあいだ機会があったので IE8 でできることをあらためて列挙してみた。おもに CSS。

- 標準モード対応
- box-sizing property
- max-width/min-width/max-height/min-height
- :first-child/:last-child
- :before/:after
- display: table
- display: inline-block
- png transparency support
- inherit property
- localStorage support

last-child には対応していない。first-child は使えるけど完璧ではないみたい（[Quirksmode: CSS selectors](http://quirksmode.org/css/selectors/#t51)）。[selectivizr](http://selectivizr.com/)で使えるようにはなる。

あと、max-width/min-width/max-height/min-height は、box-sizing を変更しても content box の状態で計算されるという問題がありました。

box-sizing については、[responsive grid と box-sizing](/2012/05/responsive_grid_box-sizing/)で紹介していましたが（忘れてたけど）、width の対象を border まで含めると、いろいろと楽な面が大きい。vendor-prefix を含めれば、どのブラウザでもほぼ問題なく使用できる。もうボックスモデルの問題は過去のものになったと言える。たぶん。

max-width/min-width も地味に便利。IE8 以前では、コンテンツの幅より大きなサイズの画像の場合だけ、コンテンツの幅にあわせて表示する、ということが簡単にできなかった。display:inline-block や display:table は vertical な配置を整えるときに便利。

とかまあいろいろ省略しますけど、他の最新ブラウザと比べると、IE8 でできることはかなり少ないのですけど、それでも以前よりだいぶましになっている。

そして、以下は一緒に調べた IE のリリースの年月。

- IE6 : 2001/8
- IE7 : 2006/10
- IE8 : 2009/3
- IE9 : 2011/3
- IE10 : 2013/2 (2012/11 Release Preview)

というメモ。
