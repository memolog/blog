---
title: viewportをCSSで指定する
date: 2012-06-24T22:00:00.000Z
categories:
- web
tags:
- css
---
Internet Explorer 10 Guide for Developersの[Device adaptation](http://msdn.microsoft.com/en-us/library/ie/hh708740&#x25;28v=vs.85&#x25;29.aspx)にて、@viewportについての説明がされています。現時点ではmsのprefixが必要なので、実際に使用する場合は @-ms-viewportということになる（そして@-o-viewportの形で[Operaでも対応している](http://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/)と[Bruce Lawson](http://www.brucelawson.co.uk/about/)からコメントがついている）。

<!-- more -->

@viewportの仕様は[W3C](http://www.w3.org/TR/css-device-adapt/)にある。introductionにはviewportの指定をCSSで標準化することが書いてあり、いずれはmetaタグではなくCSSに記述するものになるかもしれない。

> Additionally, an HTML META tag has been introduced for allowing an author to specify the size of the initial containing block, and the initial zoom factor directly. It was first implemented by Apple for the Safari/iPhone browser, but has since been implemented for the Opera, Android, and Fennec browsers. These implementations are not fully interoperable and this specification is an attempt at standardizing the functionality provided by the viewport META tag in CSS.

CSSとmetaタグの両方が書かれている場合はどのように処理されるのかなというのが、若干気になったのですが、[10.4. Translation into @viewport properties](http://www.w3.org/TR/css-device-adapt/#translation-into-viewport-properties)あたりにその辺のことが書かれている。

> The Viewport META element is placed in the cascade as if it was a STYLE element, in the exact same place in the dom, that only contains a single @viewport rule.

metaタグはstyle要素に@viewportのルールが書かれているかのように扱われると。なので、

```
<meta name="viewport" content="width=device-width; initial-scale=1.0" />
<link rel="stylesheet" href="/styles.css" type="text/css" />

```

という風にheadに記述されていたら、

```
<style>
@viewport {
  width: device-width;
  zoom: 1.0;
}
</style>
<link rel="stylesheet" href="/styles.css" type="text/css" />

```

というように扱われる、と思われる。metaの記述がCSSよりも上にある場合は、CSSに記述された@viewportルールが優先されると思われるけど、metaの方が下に書かれている場合はmetaの指定の方が効いてくるかもしれない（試してないので確証はない...）。
