---
title: watir-webdriver-performance：PerformanceTimingの集計
date: 2011-04-19T21:00:00.000Z
categories:
  - software testing
tags:
  - performance
  - watir
  - webdriver
excerpt: "「Watir-Webdriver-Performance gem released」にて紹介されているものを紹介。watir-webdriver上でPerformanceTimingに関する情報を収集できるようになります。PeformanceTimingとはJavascriptについてweb application内でクライアントサイドの待ち時間の測定を行えるようにするためのインターフェイスだそう（To address the need for complete information on user experience, this document introduces the PerformanceTiming interfaces. This interface allows JavaScript mechanisms to provide complete client-side latency measurements within applications. ）。Javascriptの処理毎の細かな待ち時間情報を得ることができるらしい。詳細はNavigation Timingを参照。"
---

「[Watir-Webdriver-Performance gem released](http://altentee.com/blogs/2011/watir-webdriver-performance-gem-released/)」にて紹介されているものを紹介。watir-webdriver 上で[PerformanceTiming](http://w3c-test.org/webperf/specs/NavigationTiming/#nt-navigation-timing-interface)に関する情報を収集できるようになります。PeformanceTiming とは Javascript について web application 内でクライアントサイドの待ち時間の測定を行えるようにするためのインターフェイスだそう（To address the need for complete information on user experience, this document introduces the PerformanceTiming interfaces. This interface allows JavaScript mechanisms to provide complete client-side latency measurements within applications. ）。Javascript の処理毎の細かな待ち時間情報を得ることができるらしい。詳細は[Navigation Timing](http://w3c-test.org/webperf/specs/NavigationTiming/)を参照。

watir-webdriver-performance の使い方は require するだけ。require すると Watir::Browser の class をオープンして peformance とかメソッドを追加してくれます。内部的には execute_script で Javascript の window.peformance、またはそれに準じたブラウザ固有の関数を実行してまとめる、みたいなことをしています。window.peformance は[W3C Navigation Timing API: Better Page Load Time Measurements in Chrome and IE | Web Performance Optimization](http://blog.yottaa.com/2011/03/w3c-navigation-timing-api-better-page-load-time-measurements-in-chrome-and-ie/)によると、現在は IE9 と Chrome のみが対応しているみたいで、Firefox とかで使用しても現在は nil になってしまいます。

```
require 'watir-webdriver'
require 'watir-webdriver-performance'

b = Watir::Browser.new :chrome
b.goto 'http://memolog.org'
puts b.peformance.summary[:response_time]

```

正直、watir 上でこの情報を収集できることの利点が良く分かっていませんが、たとえばターゲットの URL に 100 回アクセスしてパフォーマンスの平均を取るとか、そういうことをしたい場合は有用かもしれません。
