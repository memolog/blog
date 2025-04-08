---
title: xxhdpiの準備とdpiとdpについて
date: 2013-04-21T15:00:00.000Z
categories:
  - web
tags:
  - android
excerpt: "List of displays by pixel density - Wikipedia, the free encyclopedia を見ていて気がついたのですけど、Galaxy S4はSupporting Multiple Screens | Android Developersで言うところの「xxhdpi」という枠に入るらしい。Android Developersには記載がないのですけど、Nick Butcher - Google+ - Nexus 10 launcher icons The gorgeous screen on the Nexus...に、（Nexus 10はxhdpiの範囲を超えてくるので）xxhdpiかdrawable-480dpiフォルダーを用意する必要がある、というような記述がある（Nexus 10は300ppiと仕様には書かれていますけど、事実関係は未調査）。"
---

[List of displays by pixel density - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/List_of_displays_by_pixel_density) を見ていて気がついたのですけど、Galaxy S4 は[Supporting Multiple Screens | Android Developers](http://developer.android.com/guide/practices/screens_support.html)で言うところの「xxhdpi」という枠に入るらしい。Android Developers には記載がないのですけど、[Nick Butcher - Google+ - Nexus 10 launcher icons The gorgeous screen on the Nexus...](https://plus.google.com/+NickButcher/posts/ePQya3KsTjW)に、（Nexus 10 は xhdpi の範囲を超えてくるので）xxhdpi か drawable-480dpi フォルダーを用意する必要がある、というような記述がある（Nexus 10 は 300ppi と仕様には書かれていますけど、事実関係は未調査）。

Android の画面のサイズで出てくる単位としては、dpi と dp があり、[Supporting Multiple Screens | Android Developers](http://developer.android.com/guide/practices/screens_support.html)に用語の説明が書かれています。

dpi は、dots per inch のことで、1 インチの中に含まれる dot の数を表しますと（[dpi - Wikipedia](http://ja.wikipedia.org/wiki/Dpi)）。ピクセルとドットが 1 対 1 の関係であれば、[ppi - Wikipedia](http://ja.wikipedia.org/wiki/Ppi)の計算式で算出できます。

dp は、density-independent pixel のことだそうで、px = dp \* (dpi / 160)という計算式で算出するそうです。dpi = 240 の場合、px = 1.5dp になるので、dp=1 なら、px は 1.5 になる。つまり、dp は、1dp あたりの pixel 数が、dpi によって増減するので、画面の密度とは独立して扱うことができると。160dpi でも、240dpi でも、1 インチあたりの dp は 160 になる。ピクセルの数に影響されずに画面のサイズを特定することができる。

アイコンとかの画像は通常ピクセルで用意するので、dpi に応じた大きさを用意しないいけない。そこで drawable-ldpi みたいな、dpi のグループごとに画像を用意する。
![](http://developer.android.com/images/screens_support/screens-ranges.png)

たいていの端末は xhdpi で設定されている値（〜320dpi）に収まるわけですが、Galaxy S4 は、約 5 インチのディスプレイで「1080×1920」という解像度を持っていて、その dpi は計算すると（[sqr(1080^2+1920^2)/4.99](https://www.google.co.jp/search?q=sqr%281080^2%2B1920^2%29%2F4.99)）、約 441dpi となり（[iphone 5 は 326 ppi](http://www.apple.com/jp/iphone/specs.html)）、xhdpi を大きく超える dpi となる。

それで xxhdpi というフォルダを作って画像を用意する必要がある、という話になると。Android Developers に xxhdpi の記載が見つからないので、ちゃんと適用されるのか微妙に不安ではありますけど（[DisplayMetrics | Android Developers](http://developer.android.com/reference/android/util/DisplayMetrics.html#DENSITY_XXHIGH)の実装がそれにあたるみたいだそうですけど）、xxhdpi は〜480dpi までという前提で言うと、480/160 ということで、mdpi から 3 倍の大きさの画像を用意する感じになる。

アイコンだと、[Supporting Multiple Screens | Android Developers](http://developer.android.com/guide/practices/screens_support.html#DesigningResources)の話を参考にすると、144x144 で、スプラッシュスクリーンは、normal size なスクリーンの場合は少なくとも 960x1410 (470dp\*3, 320dp\*3)という感じになるんですけど、実際に登場する Galaxy S4 が 1080×1920 なので、1080×1920 で用意しておくのがとりあえず無難かなと思う次第であります。

というメモ
