---
title: watir-webdriver-performance&#x3a; PerformanceTimingの集計
date: 2011-04-19T21:00:00.000Z
categories:
- software testing
tags:
- performance
- watir
- webdriver
---
「[Watir-Webdriver-Performance gem released](http://altentee.com/blogs/2011/watir-webdriver-performance-gem-released/)」にて紹介されているものを紹介。watir-webdriver上で[PerformanceTiming](http://w3c-test.org/webperf/specs/NavigationTiming/#nt-navigation-timing-interface)に関する情報を収集できるようになります。PeformanceTimingとはJavascriptについてweb application内でクライアントサイドの待ち時間の測定を行えるようにするためのインターフェイスだそう（To address the need for complete information on user experience, this document introduces the PerformanceTiming interfaces. This interface allows JavaScript mechanisms to provide complete client-side latency measurements within applications. ）。Javascriptの処理毎の細かな待ち時間情報を得ることができるらしい。詳細は[Navigation Timing](http://w3c-test.org/webperf/specs/NavigationTiming/)を参照。

<!-- more -->

watir-webdriver-performanceの使い方はrequireするだけ。requireするとWatir::Browserのclassをオープンしてpeformanceとかメソッドを追加してくれます。内部的にはexecute_scriptでJavascriptのwindow.peformance、またはそれに準じたブラウザ固有の関数を実行してまとめる、みたいなことをしています。window.peformanceは[W3C Navigation Timing API: Better Page Load Time Measurements in Chrome and IE | Web Performance Optimization](http://blog.yottaa.com/2011/03/w3c-navigation-timing-api-better-page-load-time-measurements-in-chrome-and-ie/)によると、現在はIE9とChromeのみが対応しているみたいで、Firefoxとかで使用しても現在はnilになってしまいます。

```
require 'watir-webdriver'
require 'watir-webdriver-performance'

b = Watir::Browser.new :chrome
b.goto 'http://memolog.org'
puts b.peformance.summary[:response_time]

```

正直、watir上でこの情報を収集できることの利点が良く分かっていませんが、たとえばターゲットのURLに100回アクセスしてパフォーマンスの平均を取るとか、そういうことをしたい場合は有用かもしれません。
