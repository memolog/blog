---
title: CSSのサポート状態で条件分岐をする @supports
date: 2012-12-28T16:12:00.000Z
categories:
  - web
tags:
  - css3
excerpt: "Native CSS feature detection via the @supports rule - Dev.OperaとOpera Developer News - Why use @supports instead of Modernizr?とFeature queries: the '@supports' ruleについての話。"
---

[Native CSS feature detection via the @supports rule - Dev.Opera](http://dev.opera.com/articles/view/native-css-feature-detection-via-the-supports-rule/)と[Opera Developer News - Why use @supports instead of Modernizr?](http://my.opera.com/ODIN/blog/why-use-supports-instead-of-modernizr)と[Feature queries: the '@supports' rule](http://www.w3.org/TR/css3-conditional/#at-supports)についての話。

```
@supports (display:flex) {
  section { display: flex }
  ...
}

```

@supports は、上記のような感じで「(property:value)」と指定して、そのプロパティと値をブラウザがサポートしている場合のみ、{}内の CSS が適用されるというもの。at-rule なので、@supports を使用できないブラウザでは、{}内は無視される（このへんの詳細は[CSS のエラーの扱い方 - メモログ](/2012/06/how_css_handles_errors/)を参照）。サポート状況は[Can I use CSS Feature Queries](http://caniuse.com/css-featurequeries)によると、現時点では Opera（と[Firefox Aurora](http://www.mozilla.jp/firefox/preview/)）のみなので、実用にはまだ時間がかかりそう。

@supports の指定では「and」と「or」を使って条件を複数指定することと、「not」を指定して否定の条件を指定することもできます。「else」のようなものはないので、特定の機能をサポートしている場合としていない場合で CSS を宣言したい場合は、@supports のルールを二つ用意する必要がある。

```
@supports (display:flex and color:red){ ... }
@supports (display:flex or display:none){ ... }
@supports not (display:flex){ ... }

```

CSS の場合は、基本的にサポートしていない値が指定されている場合はうまい感じに無視してくれるので、@supports はあまり必要としませんが、flexbox のように特定の機能のサポートと関係の強い CSS の指定がたくさんあるような場合は便利。

（参考までに[閲覧中のブラウザが@supports に対応している場合は、下の画面が黒くなる codepen](http://codepen.io/memolog/pen/mHjJy)）

[@supports ― CSS の Feature Queries - fragmentary](http://myakura.hatenablog.com/entry/2012/08/08/012516)もあわせて。
