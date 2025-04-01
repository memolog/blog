---
title: xxhdpiの準備とdpiとdpについて
date: 2013-04-21T15:00:00.000Z
categories:
- web
tags:
- android
---
[List of displays by pixel density - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/List_of_displays_by_pixel_density) を見ていて気がついたのですけど、Galaxy S4は[Supporting Multiple Screens | Android Developers](http://developer.android.com/guide/practices/screens_support.html)で言うところの「xxhdpi」という枠に入るらしい。Android Developersには記載がないのですけど、[Nick Butcher - Google+ - Nexus 10 launcher icons The gorgeous screen on the Nexus...](https://plus.google.com/+NickButcher/posts/ePQya3KsTjW)に、（Nexus 10はxhdpiの範囲を超えてくるので）xxhdpiかdrawable-480dpiフォルダーを用意する必要がある、というような記述がある（Nexus 10は300ppiと仕様には書かれていますけど、事実関係は未調査）。

<!-- more -->

Androidの画面のサイズで出てくる単位としては、dpiとdpがあり、[Supporting Multiple Screens | Android Developers](http://developer.android.com/guide/practices/screens_support.html)に用語の説明が書かれています。

dpiは、dots per inchのことで、1インチの中に含まれるdotの数を表しますと（[dpi - Wikipedia](http://ja.wikipedia.org/wiki/Dpi)）。ピクセルとドットが1対1の関係であれば、[ppi - Wikipedia](http://ja.wikipedia.org/wiki/Ppi)の計算式で算出できます。

dpは、density-independent pixelのことだそうで、px = dp * (dpi / 160)という計算式で算出するそうです。dpi = 240 の場合、px = 1.5dp になるので、dp=1なら、pxは1.5になる。つまり、dpは、1dpあたりのpixel数が、dpiによって増減するので、画面の密度とは独立して扱うことができると。160dpiでも、240dpiでも、1インチあたりのdpは160になる。ピクセルの数に影響されずに画面のサイズを特定することができる。

アイコンとかの画像は通常ピクセルで用意するので、dpiに応じた大きさを用意しないいけない。そこでdrawable-ldpiみたいな、dpiのグループごとに画像を用意する。  
![](http://developer.android.com/images/screens_support/screens-ranges.png)

たいていの端末はxhdpiで設定されている値（〜320dpi）に収まるわけですが、Galaxy S4は、約5インチのディスプレイで「1080×1920」という解像度を持っていて、そのdpiは計算すると（[sqr(1080^2+1920^2)/4.99](https://www.google.co.jp/search?q=sqr&#x25;281080^2&#x25;2B1920^2&#x25;29&#x25;2F4.99)）、約441dpiとなり（[iphone 5 は326 ppi](http://www.apple.com/jp/iphone/specs.html)）、xhdpiを大きく超えるdpiとなる。

それでxxhdpiというフォルダを作って画像を用意する必要がある、という話になると。Android Developersにxxhdpiの記載が見つからないので、ちゃんと適用されるのか微妙に不安ではありますけど（[DisplayMetrics | Android Developers](http://developer.android.com/reference/android/util/DisplayMetrics.html#DENSITY_XXHIGH)の実装がそれにあたるみたいだそうですけど）、xxhdpiは〜480dpiまでという前提で言うと、480/160ということで、mdpiから3倍の大きさの画像を用意する感じになる。

アイコンだと、[Supporting Multiple Screens | Android Developers](http://developer.android.com/guide/practices/screens_support.html#DesigningResources)の話を参考にすると、144x144で、スプラッシュスクリーンは、normal sizeなスクリーンの場合は少なくとも960x1410 (470dp\*3, 320dp\*3)という感じになるんですけど、実際に登場するGalaxy S4が1080×1920なので、1080×1920で用意しておくのがとりあえず無難かなと思う次第であります。

というメモ
