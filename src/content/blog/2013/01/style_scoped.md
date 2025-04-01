---
title: style要素のscoped属性
date: 2013-01-27T22:05:00.000Z
categories:
- web
tags:
- css
- html
---
[Firefox Development Highlights - H.264 & MP3 support on Windows, scoped stylesheets + more ✩Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2013/01/firefox-development-highlights-h-264-mp3-support-on-windows-scoped-stylesheets-more/)（[日本語](https://dev.mozilla.jp/2013/01/firefox-development-highlights-h-264-mp3-support-on-windows-scoped-stylesheets-more/)）にて、[Firefoxのnightly](http://nightly.mozilla.org/)でstyle要素のscoped属性に対応したという話が出ていたので、試してみました。[style scoped動作確認用のcodepen](http://codepen.io/memolog/pen/uedGg)。

<!-- more -->

[style scopeの仕様](http://www.w3.org/TR/html5/document-metadata.html#attr-style-scoped)によると、sytle scoped要素の親要素をルートとして、その範囲のみにstyleを適用させるみたいな感じ。親要素の最初のノードとして配置する必要がある（コメントノードなどinter-element whitespaceを除く）。

そして親要素のcontent modelは[transparent](http://www.w3.org/TR/html5/dom.html#transparent)であってはいけないらしい。代表的なのは[a要素](http://www.w3.org/TR/html5/text-level-semantics.html#the-a-element)（それ以外はinsとかmap要素がtransparentらしい）で、

```
<a>
<style scoped>
h1{ color:black }
</style>
<h1>foobar</h1>
</a>

```

ということはできないことになる。a要素の中にdivとか何かtransparnetでないものを入れないといけない。

```
<a>
<div>
<style scoped>
h1{ color:black }
</style>
<h1>foobar</h1>
</div>
</a>

```

あと、@global at-ruleが定義されていて、@globalで制限されたCSSは通常のstyle要素と同じようにDocument全体に適用されるらしい（まだブラウザ上では試せない）。

```
<div>
<style scoped>
@global{ div{ color:blue } }
h1 { width:95&#x25;; }
</style>
<h1>foobar</h1>
</div>
<div>
blue
</div>

```

style scopedは、たとえば、この記事の中でだけ使いたいCSSなどを全体のCSSに配慮することなしに使うことができるという意味で便利。ドキュメント全体のCSSと連携するようなCSSが、個別の記事あるとメンテナンス大変だと思うけど。DOMとCSSの分離という点からもそもそもstyle属性は多用するものではないだろうけど、ウィジェット的な、独立分離が可能なパーツ的なものの場合には使いどころもあると思われる（iframe使えば良いかもしれないけど）。

あと、style scopedではなくても、親要素にid属性つけてそれをCSSで指定すれば同じようなことはできなくもない（style要素でインラインでする必要もないけど）。

```
<div id="foobar">
<style>
#foobar h1{ color:black }
</style>
<h1>foobar</h1>
</div>

```

CSSのパフォーマンス的なところは不明ですが、scoped属性あるなしに関わらず、[W3CのStyleの仕様では](http://www.w3.org/TR/html5/document-metadata.html#styling)、style要素で@importなどでリソースを参照しない場合は同期実行されるので、レンダリングは一時的にブロックされる、かもしれない。

> When a style sheet is ready to be applied, its style sheet ready flag must be set. If the style sheet referenced no other resources (e.g. it was an internal style sheet given by a style element with no @import rules), then the style rules must be synchronously made available to script; otherwise, the style rules must only be made available to script once the event loop reaches its "update the rendering" step.

多用するものではないと思いますけど、ここだというときに使えると、いいですね！
