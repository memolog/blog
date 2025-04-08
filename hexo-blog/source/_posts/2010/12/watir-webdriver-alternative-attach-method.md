---
title: watir-webdriver のattachメソッドの代替メソッド
date: 2010-12-04T03:54:00.000Z
categories:
- software testing
tags:
- watir
- webdriver
---
去年の今頃、[watir 2.0](/blog//2010/02/watir-webdriver/) として始まったwatir-webdriverですが、現在 0.1.7。着々と進んでいます。その当時はseleniumとwatirの関係性がよくわかってませんでしたが、watirはselenium-webdriverのラッパー的な感じみたいです。watir-webdriverの内部では、Selenium::Webdriver.for でseleniumのdriverを呼び出しています。

<!-- more -->

watir-webdriverを使用するのに一つの問題としてattachメソッドがないというものがありましたが、これを回避する方法が[Attach method not working with Watir-WebDriver](http://groups.google.com/group/watir-general/browse_thread/thread/232df221602d4cfb)にて、紹介されています。具体的には下記のような感じ。browserはWatir::Webdriverのインスタンス。

```
browser.window(:title => 'annoying popup').use do
  browser.button(:id => 'close').click
end 

```

watir-webdriverのextension(addon)が動作している状態で開いたウィンドウであれば、watirのコマンドをその指定したウィンドウを対象に行うことができます。これでattachメソッドがなくてもたいてい大丈夫そうですね。
