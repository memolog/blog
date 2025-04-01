---
title: HTML LINTから学んだHTMLとアクセシビリティ
date: 2006-11-28T11:37:23.000Z
categories:
- web
tags:
- accessibility
- html
---
CSSとHTMLを変更したついでに、WEB Developer（FireFoxの拡張機能）のToolsからHTML LINTを実行してみました。結果はみごとにマイナス点。減点の嵐。なかなか手厳しいです。

<!-- more -->

多くの減点箇所のうち、次の3点が今回の注目点でした。

#### [cssやjavascriptに関するmetaタグがない](http://openlab.ring.gr.jp/k16/htmllint/explain.html#content-xxxx-type)

HTML内でcssやjavascriptを利用している場合は、metaにcontent-typeを追加しないといけないというのは、初めて知りました。もともとそうでしたっけ？

#### [pタグの中にul、ol、blockquoteが入っている](http://openlab.ring.gr.jp/k16/htmllint/explain.html#excluded-element)

段落や引用文の構造的な大小関係は言われてみると納得。段落とリストの関係は、要素として並列の関係にあると言われると確かにそのような気もしますが、段落の中にリストがあっても良いような気もしないでもないです。

#### [同じ文字列に異なるリンクが貼られている](http://openlab.ring.gr.jp/k16/htmllint/explain.html#same-link-text)

HTML LINTでは[アクセス指針技術文書](http://www.w3.org/TR/WCAG10-TECHS/#links)に基づいたチェックもしてくれます。便利ですね。たとえば「permalink」など同じ文字列に異なるリンクが貼られているのは、アクセシビリティの観点からはNGなのだそうです。対応策としてTitle属性に注釈を加えるというガイドラインがあったので、Title属性にエントリーのタイトル（MTEntryTitle）を加えました。

* * *

そんなこんなで修正に修正を重ね、とりあえずメインページだけはHTML LINTで100点となるようにがんばりました。おめでとう。ぱちぱちぱち。個別アーカイブはFORM関連の構造がNGで50点くらいにしかまだ至りませんが、それはまたそのうち。
