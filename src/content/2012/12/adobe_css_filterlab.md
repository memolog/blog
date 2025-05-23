---
title: Filter Effects / Adobe CSS FilterLab
date: 2012-12-24T22:10:00.000Z
categories:
  - web
tags:
  - css
  - css3
excerpt: "Filter Effects 1.0では、HTML上に配置した画像とかにグレースケールなどのフィルターをかけることができます。Understanding CSS Filter Effects - HTML5 Rocksにて詳しく紹介されていますが、HTMLの要素に適用できるようにSVGから取り入れられた仕様で、多くのFilter Functionは高速に動きます（手元で試している限りではblurも速い）。対応状況は、Can I use CSS Filter Effectsにて。今のところChromeとSafariでのみwebkitのプレフィックス付きで確認できます。"
---

[Filter Effects 1.0](http://www.w3.org/TR/filter-effects/)では、HTML 上に配置した画像とかにグレースケールなどのフィルターをかけることができます。[Understanding CSS Filter Effects - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/filters/understanding-css/)にて詳しく紹介されていますが、HTML の要素に適用できるように SVG から取り入れられた仕様で、多くの Filter Function は高速に動きます（手元で試している限りでは blur も速い）。対応状況は、[Can I use CSS Filter Effects](http://caniuse.com/css-filters)にて。今のところ Chrome と Safari でのみ webkit のプレフィックス付きで確認できます。

Adobe が公開している[CSS FilterLab](http://html.adobe.com/webstandards/csscustomfilters/cssfilterlab/)では、Filter Function を簡単に試すことができて便利。最新の[Google Chrom Canary](https://www.google.com/intl/en/chrome/browser/canary.html)を使用すると、さらに Custom Filter (CSS Shade)も試すことができて、よくわからないけどすごい。最新の Google Chrome Canary は、通常の Google Chrome とは別にインストールができるのでわりと気楽にインストールしても大丈夫（ chrome://flags/ を開いて、「CSS シェーダを有効にする」の項目を有効にする必要があります）。 ![](http://farm9.staticflickr.com/8502/8302332641_c32d560599_z.jpg)

Custom Filter については、[CSS shaders: Cinematic effects for the web | Adobe Developer Connection](http://www.adobe.com/devnet/html5/articles/css-shaders.html)に概要とサンプルがありますが、よくわかっておりません。動きとしては、HTML の構成要素を vertex mesh 状にして、vertex shader（vs）によって vertex を操作することで変形させて、ピクセルにレンダリングするときに fragment shader (fs)で設定している色でレンダリングしていくという感じみたい。[OpenGL ES Shading Language (PDF)](http://www.khronos.org/files/opengles_shading_language.pdf)に詳細の仕様が書かれています。
