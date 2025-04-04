---
title: 独自要素を作成する
date: 2012-05-29T15:00:00.000Z
categories:
  - web
tags:
  - html
excerpt: "少し前にEric's Archived Thoughts:Invented Elements、Eric's Archived Thoughts:Customizing Your Markup、Eric's Archived Thoughts:Element Customizationで解説されていた話。"
---

少し前に[Eric's Archived Thoughts:Invented Elements](http://meyerweb.com/eric/thoughts/2012/03/23/invented-elements/)、[Eric's Archived Thoughts:Customizing Your Markup](http://meyerweb.com/eric/thoughts/2012/03/28/customizing-your-markup/)、[Eric's Archived Thoughts:Element Customization](http://meyerweb.com/eric/thoughts/2012/04/10/element-customization/)で解説されていた話。

[TypeButter](http://typebutter.com/)というサービスで、カーニング処理をするために「kern」という要素を挿入する。

```
<em style="font-size: 36px; line-height: 36px;">T
<kern style="letter-spacing:-0.02em">h</kern>
e New <kern style="letter-spacing:-0.09em">Y</kern>
<kern style="letter-spacing:-0.01em">o</kern>rk Knicks Are
<kern style="letter-spacing:-0.04em">F</kern>
<kern style="letter-spacing:-0.02em">a</kern>
<kern style="letter-spacing:-0.01em">m</kern>
<kern style="letter-spacing:-0.02em">o</kern>
<kern style="letter-spacing:-0.02em">u</kern>s
</em>
(http://typebutter.com/)

```

kern という要素は HTML5 に存在する要素ではなくて、TypeButter がカーニング処理のために独自に用意している要素。存在しない要素がブラウザ上で正常に処理するかというと、問題なく処理される。では、特定の用途のために独自の要素を用意していいかというと、HTML5 の仕様上は許されない。

下記のように element 要素を使用して要素のカスタマイズすることは可能らしい。

```
<element extends="span" name="x-kern"></element>
<h1>
<span is="x-kern" style="...">A</span>
<span is="x-kern" style="...">u</span>
<span is="x-kern" style="...">t</span>
<span is="x-kern" style="...">u</span>
mn
</h1>
(http://meyerweb.com/eric/thoughts/2012/03/28/customizing-your-markup/)

```

しかし、この仕様に沿ったカスタマイズ方法は不格好だし、独自の要素を使ったときに「既存の CSS とコンフリクトしない（span 要素に CSS が設定されていたらそれに影響される）」という利点がなくなってしまう。だから現状使えるのだから独自要素を用意しても良いのではないかみたいなことを述べています。

懸念事項としては、将来 HTML の仕様に「kern」が追加された場合にコンフリクトが発生してしまうておいうこと。だから「x-kern」のように「x-」のプレフィックスをつける方が安全だけど、要素の名前に「-」を追加できないという[タグ名の仕様](http://www.w3.org/TR/html5/syntax.html#syntax-tag-name)になっている。

という話。

新しい要素を使用しなければならないような状況はあんまりないようには思いますけど、CSS の厳密な管理が要求されるようなパーツであるなら、一考の余地はあるかもしれません。
