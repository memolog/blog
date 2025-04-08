---
title: style要素のscoped属性
date: 2013-01-27T22:05:00.000Z
categories:
  - web
tags:
  - css
  - html
excerpt: "Firefox Development Highlights - H.264 & MP3 support on Windows, scoped stylesheets + more ✩Mozilla Hacks – the Web developer blog（日本語）にて、Firefoxのnightlyでstyle要素のscoped属性に対応したという話が出ていたので、試してみました。style scoped動作確認用のcodepen。"
---

[Firefox Development Highlights - H.264 & MP3 support on Windows, scoped stylesheets + more ✩Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2013/01/firefox-development-highlights-h-264-mp3-support-on-windows-scoped-stylesheets-more/)（[日本語](https://dev.mozilla.jp/2013/01/firefox-development-highlights-h-264-mp3-support-on-windows-scoped-stylesheets-more/)）にて、[Firefox の nightly](http://nightly.mozilla.org/)で style 要素の scoped 属性に対応したという話が出ていたので、試してみました。[style scoped 動作確認用の codepen](http://codepen.io/memolog/pen/uedGg)。

[style scope の仕様](http://www.w3.org/TR/html5/document-metadata.html#attr-style-scoped)によると、sytle scoped 要素の親要素をルートとして、その範囲のみに style を適用させるみたいな感じ。親要素の最初のノードとして配置する必要がある（コメントノードなど inter-element whitespace を除く）。

そして親要素の content model は[transparent](http://www.w3.org/TR/html5/dom.html#transparent)であってはいけないらしい。代表的なのは[a 要素](http://www.w3.org/TR/html5/text-level-semantics.html#the-a-element)（それ以外は ins とか map 要素が transparent らしい）で、

```
<a>
<style scoped>
h1{ color:black }
</style>
<h1>foobar</h1>
</a>

```

ということはできないことになる。a 要素の中に div とか何か transparnet でないものを入れないといけない。

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

あと、@global at-rule が定義されていて、@global で制限された CSS は通常の style 要素と同じように Document 全体に適用されるらしい（まだブラウザ上では試せない）。

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

style scoped は、たとえば、この記事の中でだけ使いたい CSS などを全体の CSS に配慮することなしに使うことができるという意味で便利。ドキュメント全体の CSS と連携するような CSS が、個別の記事あるとメンテナンス大変だと思うけど。DOM と CSS の分離という点からもそもそも style 属性は多用するものではないだろうけど、ウィジェット的な、独立分離が可能なパーツ的なものの場合には使いどころもあると思われる（iframe 使えば良いかもしれないけど）。

あと、style scoped ではなくても、親要素に id 属性つけてそれを CSS で指定すれば同じようなことはできなくもない（style 要素でインラインでする必要もないけど）。

```
<div id="foobar">
<style>
#foobar h1{ color:black }
</style>
<h1>foobar</h1>
</div>

```

CSS のパフォーマンス的なところは不明ですが、scoped 属性あるなしに関わらず、[W3C の Style の仕様では](http://www.w3.org/TR/html5/document-metadata.html#styling)、style 要素で@import などでリソースを参照しない場合は同期実行されるので、レンダリングは一時的にブロックされる、かもしれない。

> When a style sheet is ready to be applied, its style sheet ready flag must be set. If the style sheet referenced no other resources (e.g. it was an internal style sheet given by a style element with no @import rules), then the style rules must be synchronously made available to script; otherwise, the style rules must only be made available to script once the event loop reaches its "update the rendering" step.

多用するものではないと思いますけど、ここだというときに使えると、いいですね！
