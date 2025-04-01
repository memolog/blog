---
title: Blueprint &#x3a; CSSのフレームワーク
date: 2007-08-19T02:49:38.000Z
categories:
- web
tags:
- css
---
*   [Raging Thunderbolt. Blueprint 0.4 released](http://bjorkoy.com/past/2007/8/11/release_blueprint_04/)

<!-- more -->
*   [blueprintcss - Google Code](http://code.google.com/p/blueprintcss/)

Blueprintとは、いわゆるひとつのCSS のフレームワークです。ライブラリはbutton.css、grid.css、reset.css、typography.cssの4つのCSSで構成されていて、圧縮版のcompressed.css、ライブラリをインクルードするためのscreen.css、印刷用のprint.cssなどが同封されています。それぞれのCSSはその名の通りで、button.cssはボタン用のCSS、grid.cssはグリッドデザイン用のCSS、reset.cssはいわゆるブラウザのデフォルト設定をリセットするためのCSS、typography.cssはタイポグラフィティ用のCSSです。

わりとシンプルな構成のCSSで、[Typographyのサンプル](http://bjorkoy.com/blueprint/typography-test.html)のように奇麗に段組みに仕上げることができる。背景の罫線がきれいにはまっているのに小さく感動を覚えます。Firebugを使ってサンプルサイトを日本語に置き換えてみましたが、日本語でも奇麗に表示できます。

ただ、一つのグリッドのデフォルトの横幅は70px（うちマージンが20px）で、全体を960pxと固定的に指定されてます。横幅を変更したいときはCSSを手作業で調整する必要となるため、すこし手間がかかる。 ![cap081901.gif](/blog//assets/i/2007/08/cap081901.gif)
