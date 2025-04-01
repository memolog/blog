---
title: watir-webdriver でドラッグアンドドロップをする
date: 2010-12-05T03:00:00.000Z
categories:
- software testing
tags:
- selenium
- watir
- webdriver
---
一つ前の記事で[watirはselenium-webdriverのラッパー的な感じ](/blog//2010/12/watir-webdriver-alternative-attach-method/)であると申しました。なので、watir-webdriverでもselenium-webdriverで実装されているメソッドを直接使用することも可能です。

<!-- more -->

ドラッグアンドドロップのUIはわりとwatirで自動化する場合の泣き所だったのですが（watirでもできなくないはずですが）、selenium-webdriverではDrag and Dropをするためのメソッドが用意されていて、それを利用するとwatir-webdriverでも簡単にDrag and dropをすることができます。詳しくは[TipsAndTricks - selenium](http://code.google.com/p/selenium/wiki/TipsAndTricks)や[Class: Selenium::WebDriver::Element](http://selenium.googlecode.com/svn-history/r9054/trunk/docs/api/rb/Selenium/WebDriver/Element.html#drag_and_drop_by-instance_method)などをご参照。

drag\_and\_drop\_by(right\_by, down\_by) は、メソッドの対象の要素の現在位置から移動する距離を第一引数で右への移動距離、第二引数で下への移動距離を設定します（左または上に移動したい場合は負の値で指定する）。drag\_and\_drop\_on(other)は、第一引数で指定した要素（find_elementのメソッドなどで指定したオブジェクト）に移動させます。

実際にwatir-webdriver上で動かす場合はこんな具合に。

```
require 'rubygems'
require 'watir-webdriver'

browser = Watir::Browser.new :firefox
target_element = browser.driver.find_element(:name,'foo')
target_element.drag_and_drop_by 100,200

```

drag\_and\_drop_onを使用する場合はこんな具合。

```
require 'rubygems'
require 'watir-webdriver'

browser = Watir::Browser.new :firefox
target_element = browser.driver.find_element(:name,'foo')
distination = browser.driver.find_element(:name,'bar')
target_element.drag_and_drop_on distination

```

現在はこのメソッドはFirefoxでのみ動作するみたいですが、これは助かりますね。
