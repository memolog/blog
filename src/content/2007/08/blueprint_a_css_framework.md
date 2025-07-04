---
title: "Blueprint：CSSのフレームワーク"
date: 2007-08-19T02:49:38.000Z
featured:
  image: art-institute-of-chicago-sAlWjm2huck-unsplash
  author: Art Institute of Chicago
  authorLink: https://unsplash.com/ja/@artchicago?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
categories:
  - web
tags:
  - css
excerpt: "Blueprint とは、いわゆるひとつの CSS のフレームワークです"
---

- [blueprintcss - Google Code](http://code.google.com/p/blueprintcss/)

Blueprint とは、いわゆるひとつの CSS のフレームワークです。ライブラリは button.css、grid.css、reset.css、typography.css の 4 つの CSS で構成されていて、圧縮版の compressed.css、ライブラリをインクルードするための screen.css、印刷用の print.css などが同封されています。それぞれの CSS はその名の通りで、button.css はボタン用の CSS、grid.css はグリッドデザイン用の CSS、reset.css はいわゆるブラウザのデフォルト設定をリセットするための CSS、typography.css はタイポグラフィティ用の CSS です。

わりとシンプルな構成の CSS で、[Typography のサンプル](http://bjorkoy.com/blueprint/typography-test.html)のように奇麗に段組みに仕上げることができる。背景の罫線がきれいにはまっているのに小さく感動を覚えます。Firebug を使ってサンプルサイトを日本語に置き換えてみましたが、日本語でも奇麗に表示できます。

ただ、一つのグリッドのデフォルトの横幅は 70px（うちマージンが 20px）で、全体を 960px と固定的に指定されてます。横幅を変更したいときは CSS を手作業で調整する必要となるため、すこし手間がかかる。 ![cap081901.gif](/assets/i/2007/08/cap081901.gif)
