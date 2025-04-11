---
title: CSS Selector Performance
date: 2012-05-27T15:00:00.000Z
featured:
  image: css_selector_performance.webp
  author: chatGPT
categories:
  - web
tags:
  - css
  - performance
excerpt: "Performance CalendarにWebkitでCSSのマッチングの最適化が進んでいるという話が掲載されていて、下記の4つ最適化方法について紹介しています"
---

[Performance Calendar » CSS Selector Performance has changed! (For the better)](http://calendar.perfplanet.com/2011/css-selector-performance-has-changed-for-the-better/)に Webkit で CSS のマッチングの最適化が進んでいるという話が掲載されていて、下記の 4 つ最適化方法について紹介しています（via [\* { box-sizing: border-box } FTW « Paul Irish](http://paulirish.com/2012/box-sizing-border-box-ftw/)）。という話の紹介。

1.  Style Sharing
2.  Rule Hashes
3.  Ancestor Filters
4.  Fast Path

Style Sharing は、Style tree にある要素が、すでに計算済みのものと同じスタイルであるかどうかを把握できるようにする仕組みで、たとえば 1 つ目の p 要素で計算したスタイルが、2 つ目の p 要素にも適用可能であることを理解できると、2 つ目の p 要素で再計算する必要がなくなるとか。そういう話。

Rule Hashes はスタイルシートの一番右に記述されているセレクタでグルーピングする仕組み。グルーピングされたセレクタ群のうち、当該要素とマッチングしないセレクタは参照する必要がなくなるので効率的。

Ancestor Filters は、いろいろ書いてあるのですが、ざっくり言うと、確度高めの「見切り」をすることで、子孫セレクタなどを効率的にマッチングさせる仕組み。仕組み的に「[false positive](http://eow.alc.co.jp/search?q=false-positive&ref=wl)」は許容するけど、「[false negative](http://eow.alc.co.jp/search?q=false-negative&ref=wl)」は許容しないようになっているらしい。あるセレクタが「マッチングする」と判定した場合には、100&#x25;マッチングすると言えるところまで通常のマッチング処理を進めて、マッチングしないセレクタを誤ってマッチングさせないようにしている。逆に、マッチングするはずのセレクタが無視される可能性はあるので、CSS に無駄がないようにして、false positive が発生する可能性を無用に増やさないようにするのは大事だと。

Fast Path は汎用的なマッチング処理を「a non-recursive, fully inlined loop」なかたちに再実装することによる効率化を指すようです。

> The take-away is that if we can keep stylesheet size sane, and be reasonable with our selectors, we don't need to contort ourselves to match yesterdays browser landscape. Bravo Antti!

結論としては、スタイルシートが妥当なサイズで、セレクタも十分妥当な状態になっていれば、それ以上頑張らなくても良いよ！みたいな。

ついでに、[\* { box-sizing: border-box } FTW « Paul Irish](http://paulirish.com/2012/box-sizing-border-box-ftw/)の最後に書かれている performance の節には下記のように書かれています（全称セレクタはパフォーマンスどうなの的なコメントに対して）。

> You might get up in arms about the universal _ selector. Apparently you've heard its slow. Firstly, it's not. It is as fast as h1 as a selector. It can be slow when you specifically use it like .foo > _, so don't do that. Aside from that, you are not allowed to care about the performance of \* unless you concatenate all your javascript, have it at the bottom, minify your css and js, gzip all your assets, and losslessly compress all your images. If you aren't getting 90+ Page Speed scores, it's way too early to be thinking about selector optimization.

全称セレクタは言われているほど遅くないと（.foo > \*みたいな使い方すると遅いかも）。というより、そこ気にするより先にすることあるよ的な。なるほど！
