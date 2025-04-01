---
title: CSSのサポート状態で条件分岐をする @supports
date: 2012-12-28T16:12:00.000Z
categories:
- web
tags:
- css3
---
[Native CSS feature detection via the @supports rule - Dev.Opera](http://dev.opera.com/articles/view/native-css-feature-detection-via-the-supports-rule/)と[Opera Developer News - Why use @supports instead of Modernizr?](http://my.opera.com/ODIN/blog/why-use-supports-instead-of-modernizr)と[Feature queries: the '@supports' rule](http://www.w3.org/TR/css3-conditional/#at-supports)についての話。

<!-- more -->

```
@supports (display:flex) {
  section { display: flex }
  ...
}

```

@supportsは、上記のような感じで「(property:value)」と指定して、そのプロパティと値をブラウザがサポートしている場合のみ、{}内のCSSが適用されるというもの。at-ruleなので、@supportsを使用できないブラウザでは、{}内は無視される（このへんの詳細は[CSSのエラーの扱い方 - メモログ](/blog//2012/06/how_css_handles_errors/)を参照）。サポート状況は[Can I use CSS Feature Queries](http://caniuse.com/css-featurequeries)によると、現時点ではOpera（と[Firefox Aurora](http://www.mozilla.jp/firefox/preview/)）のみなので、実用にはまだ時間がかかりそう。

@supportsの指定では「and」と「or」を使って条件を複数指定することと、「not」を指定して否定の条件を指定することもできます。「else」のようなものはないので、特定の機能をサポートしている場合としていない場合でCSSを宣言したい場合は、@supportsのルールを二つ用意する必要がある。

```
@supports (display:flex and color:red){ ... }
@supports (display:flex or display:none){ ... }
@supports not (display:flex){ ... }

```

CSSの場合は、基本的にサポートしていない値が指定されている場合はうまい感じに無視してくれるので、@supportsはあまり必要としませんが、flexboxのように特定の機能のサポートと関係の強いCSSの指定がたくさんあるような場合は便利。

（参考までに[閲覧中のブラウザが@supportsに対応している場合は、下の画面が黒くなるcodepen](http://codepen.io/memolog/pen/mHjJy)）

[@supports ― CSSのFeature Queries - fragmentary](http://myakura.hatenablog.com/entry/2012/08/08/012516)もあわせて。
