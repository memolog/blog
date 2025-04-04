---
title: b要素について
date: 2012-05-30T15:00:00.000Z
categories:
  - web
tags:
  - html
excerpt: "HTML5になってb要素の定義が変更されている。4.01のときの仕様はAlignment, font styles, and horizontal rules in HTML documentsに書かれていて、太字でスタイリングされることが書かれている（強調表示みたいな含意がある..ように思ってたけど、覚えてない）。HTML5での定義はHTML5 differences from HTML4や4.6.17 The b element — HTML5で、下記のように書かれている。"
---

HTML5 になって b 要素の定義が変更されている。4.01 のときの仕様は[Alignment, font styles, and horizontal rules in HTML documents](http://www.w3.org/TR/1999/REC-html401-19991224/present/graphics.html#edef-B)に書かれていて、太字でスタイリングされることが書かれている（強調表示みたいな含意がある..ように思ってたけど、覚えてない）。HTML5 での定義は[HTML5 differences from HTML4](http://www.w3.org/TR/html5-diff/#changed-elements)や[4.6.17 The b element — HTML5](http://www.w3.org/TR/html5/the-b-element.html#the-b-element)で、下記のように書かれている。

> The b element now represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.
>
> ...
>
> The b element should be used as a last resort when no other element is more appropriate. In particular, headings should use the h1 to h6 elements, stress emphasis should use the em element, importance should be denoted with the strong element, and text marked or highlighted should use the mark element.

ドキュメントの概要にあるキーワードや、レビューの中の製品名、interactive text-driven ソフトウェアの中の実行可能な単語とか、記事のリードなど、「重要」みたいな意味は込めずに、注意を引きつけたいテキストを囲うために用いる。「重要」という意味を込める場合は[strong](http://www.w3.org/TR/html5/the-strong-element.html#the-strong-element)を使用する。みたいな。

つまり、HTML の仕様上「重要」とか「強調」とかの意味はないけど、注目させたいところに b 要素を使用する。みたいな。うーん。分かるような分からないような。

この b 要素ですが、[Responsive Web Design の本](http://www.abookapart.com/products/responsive-web-design)の中では、CSS のフックとして使っている。

> ```
> <div class="figure"> <p>
> <img src="robot.jpg" alt="" />
> <b class="figcaption">Lo, the robot walks</b> </p>
> </div>
>
> ```
>
> Nothing fancy: an img element, followed by a brief but de- scriptive caption wrapped in a b element. I'm actually appro- priating the HTML5 figure/figcaption tags as class names in this snippet, which makes for a solidly semantic foundation.
>
> (Sharp-eyed readers will note that I'm using a b element for a non-semantic hook. Now, some designers might use a span element instead. Me, I like the terseness of shorter tags like b or i for non-semantic markup.)

普通は non-semantic な hook には span 要素を使うだろうけど、b 要素の方が短いしシンプルで好きだから... みたいな。上の例では、画像のキャプションを b 要素で囲っていて、b 要素でも別に違和感がないような気がしないでもない。

[span の定義](http://www.w3.org/TR/html5/the-span-element.html#the-span-element)は下記のような感じ

> The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children.

フックとして使うという意図が明確でわかりやすい。b 要素は強調や重要性など、特別な意味はないというから、non-semantic と言えるかもしれないけど（言えない？）、フックとしての意図は見えないし、なんとなく微妙。あまり気にしなくても良いような気もするけど、やはり普通は span ですよねえ。

でも b 要素がうまくはまるときは b 要素を使ってみたいな。と、思ったという話。
