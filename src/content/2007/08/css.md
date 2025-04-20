---
title: 拡張CSSで角丸コーナーを作る
date: 2007-08-02T16:26:00.000Z
featured:
  image: border-radius
  author: chatGPT
categories:
  - web
tags:
  - css
excerpt: "各ブラウザが独自で用意している拡張 CSS（CSS extensions）を利用して、角丸コーナーを作ろうという話。"
---

各ブラウザが独自で用意している拡張 CSS（CSS extensions）を利用して、角丸コーナーを作ろうという話。CSS3 に[border-radius](http://www.w3.org/TR/2005/WD-css3-background-20050216/#the-border-radius)というボーダーの角を丸くするためのプロパティが提案されており、ゆくゆくは `border-radius` にスタイルが引き継がれていくのかなと推測しています。

CSS の指定の仕方は簡単で、下記のように webkit や moz のプレフィックスをつけて指定するだけ。webkit は webkit と safari 向け、moz は mozilla 系のブラウザ向けの指定。IE では適用されません。

```css
-moz-border-radius: 5px;
-webkit-border-radius: 5px;
```

実際に右にある「最近のブログ記事」のリストに指定してみました。若干、カクカクした感じになりますけど、個人的には許容範囲。

そのほかにもブラウザが独自に用意している拡張 CSS はたくさんあって、そのへんは下記のリンクなどが参考になります。これでしばらくは楽しめそうです。

- [CSS Reference:Mozilla Extensions - MDC](http://developer.mozilla.org/en/docs/CSS_Reference:Mozilla_Extensions)
