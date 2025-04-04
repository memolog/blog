---
title: viewportをCSSで指定する
date: 2012-06-24T22:00:00.000Z
categories:
  - web
tags:
  - css
excerpt: "Internet Explorer 10 Guide for DevelopersのDevice adaptationにて、@viewportについての説明がされています。現時点ではmsのprefixが必要なので、実際に使用する場合は @-ms-viewportということになる（そして@-o-viewportの形でOperaでも対応しているとBruce Lawsonからコメントがついている）。"
---

Internet Explorer 10 Guide for Developers の[Device adaptation](http://msdn.microsoft.com/en-us/library/ie/hh708740%28v=vs.85%29.aspx)にて、@viewport についての説明がされています。現時点では ms の prefix が必要なので、実際に使用する場合は @-ms-viewport ということになる（そして@-o-viewport の形で[Opera でも対応している](http://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/)と[Bruce Lawson](http://www.brucelawson.co.uk/about/)からコメントがついている）。

@viewport の仕様は[W3C](http://www.w3.org/TR/css-device-adapt/)にある。introduction には viewport の指定を CSS で標準化することが書いてあり、いずれは meta タグではなく CSS に記述するものになるかもしれない。

> Additionally, an HTML META tag has been introduced for allowing an author to specify the size of the initial containing block, and the initial zoom factor directly. It was first implemented by Apple for the Safari/iPhone browser, but has since been implemented for the Opera, Android, and Fennec browsers. These implementations are not fully interoperable and this specification is an attempt at standardizing the functionality provided by the viewport META tag in CSS.

CSS と meta タグの両方が書かれている場合はどのように処理されるのかなというのが、若干気になったのですが、[10.4. Translation into @viewport properties](http://www.w3.org/TR/css-device-adapt/#translation-into-viewport-properties)あたりにその辺のことが書かれている。

> The Viewport META element is placed in the cascade as if it was a STYLE element, in the exact same place in the dom, that only contains a single @viewport rule.

meta タグは style 要素に@viewport のルールが書かれているかのように扱われると。なので、

```
<meta name="viewport" content="width=device-width; initial-scale=1.0" />
<link rel="stylesheet" href="/styles.css" type="text/css" />

```

という風に head に記述されていたら、

```
<style>
@viewport {
  width: device-width;
  zoom: 1.0;
}
</style>
<link rel="stylesheet" href="/styles.css" type="text/css" />

```

というように扱われる、と思われる。meta の記述が CSS よりも上にある場合は、CSS に記述された@viewport ルールが優先されると思われるけど、meta の方が下に書かれている場合は meta の指定の方が効いてくるかもしれない（試してないので確証はない...）。
