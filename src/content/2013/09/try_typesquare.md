---
title: TypeSquareを試してみる
date: 2013-09-10T22:55:00.000Z
featured:
  image: trying_typesquare.webp
  author: chatGPT
categories:
  - web
tags:
  - css
  - font
excerpt: "TypeSquareで0円キャンペーンをやっていて、登録だけでフォントを試すことができるので、試してみています。現在、本文には「UD新ゴ」があたっています（すぐ変えるかもしれませんけど）。なかなかいい感じ。他にも良い感じのフォントがたくさんあって悩みます。"
---

[TypeSquare](http://typesquare.com/)で 0 円キャンペーンをやっていて、登録だけでフォントを試すことができるので、試してみています。現在、本文には「UD 新ゴ」があたっています（すぐ変えるかもしれませんけど）。なかなかいい感じ。他にも良い感じのフォントがたくさんあって悩みます。

個人的には[フォント一覧](http://typesquare.com/service/fontlist)の「イメージワードから探す」というのが良くて、明朝とゴシックを組み合わせて使うときに、全体のイメージを合わせる参考になりました。最終的には UD 書体で合わせる感じにしましたけど。

![](http://farm3.staticflickr.com/2873/9717765387_45d26db566_o.png)

内部仕組み的には、ざっと確認した限りでは、指定の script を挿入すると、DOM が ready になったらページ内の font-family の指定を確認して、必要なフォントを読み込むということをしているみたいです。フォントは[True Type](http://caniuse.com/ttf)か[WOFF](http://caniuse.com/woff)で、IE8 用になんか頑張っている。よくある質問の[フォントの表示について](http://typesquare.com/faq/view/hmUZXAnWoD0%3D)と、[フォントについて](http://typesquare.com/faq/view/GDJfSKMIQ0I%3D)も参照。

issue 的には、[インデックスページ](http://memolog.org/)のように、masonry でブロックの大きさを計算して絶対配置していると、フォント読み込み後に少しずれてしまう、というのがありました。いわゆる[FOUFT(Flash of Un-Fonted Text)](https://twitter.com/meyerweb/status/289022477739376641)というあれで、Web Font が読み込まれる前にデフォルトのフォントが読み込まれると、読み込んだ前後でレイアウトの高さが少し変わる（[font-size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust)がいずれ解決するかも）。

> As of early 2013, there is a cousin to this problem, which is the Flash of Un-Fonted Text, or FOUFT. This happens when a browser has loaded the page and the CSS and displays the laid-out page before its done loading custom fonts. This causes text to appear in the default font, or a fallback font, before being replaced by text using the custom-loaded font. [Eric A. Meyer: CSS Fonts](http://shop.oreilly.com/product/0636920030836.do)

[Masonry Appendix](http://masonry.desandro.com/appendix.html#web-fonts)をみた感じでは、TypeKit では Typekit.load で、フォントを読み込みした後に masonry の再レイアウトを実行できるみたい。TypeSquare では、コードをざっと見た感じでは、読み込み後にコールバックする仕組みはなさそう。

とりあえずの回避策として、typesquare_css という ID で head に StyleSheet を append するのはわかるので、document.getElementById('typesquare_css')が truthy になったら、masonry の再レイアウトを実施するようにしてみました。しかし、やはりコールバックの仕組みほしいですね（実はあるのかな）。

料金的には、[料金プラン](http://typesquare.com/service/plan)によると一番安いのが年額 16,800 円。月額にすると 1400 円（入会時にはプラス入会金）。個人で使うには少し高いですね。500,000PV/1year くらいでウルトラライトプランとかでないかしら（個人は入会金無料で...）。でも良いですね。できれば使い続けたい。

というメモ（そろそろスタイルシートを整理しないとなあ）。

WebView ではフォントが反映されないみたい。見た感じでは、XMLHttpRequest での font の読み込みが実行されない雰囲気（typesqure_css も append されてこない）。

userAgent に\['MSIE', 'Firefox', 'Chrome', 'Safari'\]のいずれかが含まれていないと、スクリプト内の\_.b.n に値が入ってこないので、init()するときに if(!x()) return;のところで処理が終わるからみたい。WebView では'Chrome'や'Safari'の文字列がないので。また、IE11 においても、userAgent に MSIE の文字列がないので font が読み込まれない。

2013/9/26 にプランが新しくなって、入会金がなくなって無料プランができました。[以前のプランはこんな感じでした。](http://web.archive.org/web/20130602142606/http://typesquare.com/service/plan)

有料の月額料金は 2100 円と上がったけれど、10000pv/month までは無料で使える。1 日にすると 333pv/day なので充分とは言えないけど、使い切ってもフォントが読み込まれなくなるだけなので、個人サイトとしては良いかなと思う。そして有料でセルフホスティングプランも選べるようになった。
