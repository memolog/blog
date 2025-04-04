---
title: watir-webdriver のattachメソッドの代替メソッド
date: 2010-12-04T03:54:00.000Z
categories:
  - software testing
tags:
  - watir
  - webdriver
excerpt: "去年の今頃、watir 2.0 として始まったwatir-webdriverですが、現在 0.1.7。着々と進んでいます。その当時はseleniumとwatirの関係性がよくわかってませんでしたが、watirはselenium-webdriverのラッパー的な感じみたいです。watir-webdriverの内部では、Selenium::Webdriver.for でseleniumのdriverを呼び出しています。"
---

去年の今頃、[watir 2.0](/blog//2010/02/watir-webdriver/) として始まった watir-webdriver ですが、現在 0.1.7。着々と進んでいます。その当時は selenium と watir の関係性がよくわかってませんでしたが、watir は selenium-webdriver のラッパー的な感じみたいです。watir-webdriver の内部では、Selenium::Webdriver.for で selenium の driver を呼び出しています。

watir-webdriver を使用するのに一つの問題として attach メソッドがないというものがありましたが、これを回避する方法が[Attach method not working with Watir-WebDriver](http://groups.google.com/group/watir-general/browse_thread/thread/232df221602d4cfb)にて、紹介されています。具体的には下記のような感じ。browser は Watir::Webdriver のインスタンス。

```
browser.window(:title => 'annoying popup').use do
  browser.button(:id => 'close').click
end

```

watir-webdriver の extension(addon)が動作している状態で開いたウィンドウであれば、watir のコマンドをその指定したウィンドウを対象に行うことができます。これで attach メソッドがなくてもたいてい大丈夫そうですね。
