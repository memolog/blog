---
title: HTML LINTから学んだHTMLとアクセシビリティ
date: 2006-11-28T11:37:23.000Z
featured:
  image: html_linthtml.webp
  author: chatGPT
categories:
  - web
tags:
  - accessibility
  - html
excerpt: "CSSとHTMLを変更したついでに、WEB Developer（FireFoxの拡張機能）のToolsからHTML LINTを実行してみました。結果はみごとにマイナス点。減点の嵐。なかなか手厳しいです。"
---

CSS と HTML を変更したついでに、WEB Developer（FireFox の拡張機能）の Tools から HTML LINT を実行してみました。結果はみごとにマイナス点。減点の嵐。なかなか手厳しいです。

多くの減点箇所のうち、次の 3 点が今回の注目点でした。

#### [css や javascript に関する meta タグがない](http://openlab.ring.gr.jp/k16/htmllint/explain.html#content-xxxx-type)

HTML 内で css や javascript を利用している場合は、meta に content-type を追加しないといけないというのは、初めて知りました。もともとそうでしたっけ？

#### [p タグの中に ul、ol、blockquote が入っている](http://openlab.ring.gr.jp/k16/htmllint/explain.html#excluded-element)

段落や引用文の構造的な大小関係は言われてみると納得。段落とリストの関係は、要素として並列の関係にあると言われると確かにそのような気もしますが、段落の中にリストがあっても良いような気もしないでもないです。

#### [同じ文字列に異なるリンクが貼られている](http://openlab.ring.gr.jp/k16/htmllint/explain.html#same-link-text)

HTML LINT では[アクセス指針技術文書](http://www.w3.org/TR/WCAG10-TECHS/#links)に基づいたチェックもしてくれます。便利ですね。たとえば「permalink」など同じ文字列に異なるリンクが貼られているのは、アクセシビリティの観点からは NG なのだそうです。対応策として Title 属性に注釈を加えるというガイドラインがあったので、Title 属性にエントリーのタイトル（MTEntryTitle）を加えました。

---

そんなこんなで修正に修正を重ね、とりあえずメインページだけは HTML LINT で 100 点となるようにがんばりました。おめでとう。ぱちぱちぱち。個別アーカイブは FORM 関連の構造が NG で 50 点くらいにしかまだ至りませんが、それはまたそのうち。
