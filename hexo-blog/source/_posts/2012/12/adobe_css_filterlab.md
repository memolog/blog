---
title: Filter Effects / Adobe CSS FilterLab
date: 2012-12-24T22:10:00.000Z
categories:
- web
tags:
- css
- css3
---
[Filter Effects 1.0](http://www.w3.org/TR/filter-effects/)では、HTML上に配置した画像とかにグレースケールなどのフィルターをかけることができます。[Understanding CSS Filter Effects - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/filters/understanding-css/)にて詳しく紹介されていますが、HTMLの要素に適用できるようにSVGから取り入れられた仕様で、多くのFilter Functionは高速に動きます（手元で試している限りではblurも速い）。対応状況は、[Can I use CSS Filter Effects](http://caniuse.com/css-filters)にて。今のところChromeとSafariでのみwebkitのプレフィックス付きで確認できます。

<!-- more -->

Adobeが公開している[CSS FilterLab](http://html.adobe.com/webstandards/csscustomfilters/cssfilterlab/)では、Filter Functionを簡単に試すことができて便利。最新の[Google Chrom Canary](https://www.google.com/intl/en/chrome/browser/canary.html)を使用すると、さらにCustom Filter (CSS Shade)も試すことができて、よくわからないけどすごい。最新のGoogle Chrome Canaryは、通常のGoogle Chromeとは別にインストールができるのでわりと気楽にインストールしても大丈夫（ chrome://flags/ を開いて、「CSS シェーダを有効にする」の項目を有効にする必要があります）。 ![](http://farm9.staticflickr.com/8502/8302332641_c32d560599_z.jpg)

Custom Filterについては、[CSS shaders: Cinematic effects for the web | Adobe Developer Connection](http://www.adobe.com/devnet/html5/articles/css-shaders.html)に概要とサンプルがありますが、よくわかっておりません。動きとしては、HTMLの構成要素をvertex mesh状にして、vertex shader（vs）によってvertexを操作することで変形させて、ピクセルにレンダリングするときにfragment shader (fs)で設定している色でレンダリングしていくという感じみたい。[OpenGL ES Shading Language (PDF)](http://www.khronos.org/files/opengles_shading_language.pdf)に詳細の仕様が書かれています。
