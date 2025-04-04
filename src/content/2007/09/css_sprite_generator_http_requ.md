---
title: CSS Sprite Generator &#x3a; 画像を統合してHTTP requestを減らす
date: 2007-09-29T14:24:00.000Z
categories:
- web
tags:
- css
- tool
---
*   [CSS Sprite Generator | Design Shack](http://www.designshack.co.uk/news/css-sprite-generator)
*   [Website Performance | CSS Sprite Generator](http://spritegen.website-performance.org/)

<!-- more -->

「[YSLOW 勉強 : 1: Minimize HTTP Requests](/blog//2007/08/yslow_1_minimize_http_requests/)」の記事でHTTP requestを減らすためのアプローチとして[CSS Sprite](http://alistapart.com/articles/sprites)という手法が紹介されていましたが、今度はそれを生成するためのジェネレーターが紹介されておりました（変な日本語だなあ）。オフセットなどを設定してzip形式で圧縮したファイルをアップロードすると、画像を統合したファイルとそれぞれの画像を呼び出すためのCSSを表示してくれます。
