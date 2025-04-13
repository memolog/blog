---
title: watir-webdriver でドラッグアンドドロップをする
date: 2010-12-05T03:00:00.000Z
categories:
  - software testing
tags:
  - selenium
  - watir
  - webdriver
excerpt: "一つ前の記事でwatirはselenium-webdriverのラッパー的な感じであると申しました。なので、watir-webdriverでもselenium-webdriverで実装されているメソッドを直接使用することも可能です。"
---

一つ前の記事で[watir は selenium-webdriver のラッパー的な感じ](/2010/12/watir-webdriver-alternative-attach-method/)であると申しました。なので、watir-webdriver でも selenium-webdriver で実装されているメソッドを直接使用することも可能です。

ドラッグアンドドロップの UI はわりと watir で自動化する場合の泣き所だったのですが（watir でもできなくないはずですが）、selenium-webdriver では Drag and Drop をするためのメソッドが用意されていて、それを利用すると watir-webdriver でも簡単に Drag and drop をすることができます。詳しくは[TipsAndTricks - selenium](http://code.google.com/p/selenium/wiki/TipsAndTricks)や[Class: Selenium::WebDriver::Element](http://selenium.googlecode.com/svn-history/r9054/trunk/docs/api/rb/Selenium/WebDriver/Element.html#drag_and_drop_by-instance_method)などをご参照。

drag_and_drop_by(right_by, down_by) は、メソッドの対象の要素の現在位置から移動する距離を第一引数で右への移動距離、第二引数で下への移動距離を設定します（左または上に移動したい場合は負の値で指定する）。drag_and_drop_on(other)は、第一引数で指定した要素（find_element のメソッドなどで指定したオブジェクト）に移動させます。

実際に watir-webdriver 上で動かす場合はこんな具合に。

```
require 'rubygems'
require 'watir-webdriver'

browser = Watir::Browser.new :firefox
target_element = browser.driver.find_element(:name,'foo')
target_element.drag_and_drop_by 100,200

```

drag_and_drop_on を使用する場合はこんな具合。

```
require 'rubygems'
require 'watir-webdriver'

browser = Watir::Browser.new :firefox
target_element = browser.driver.find_element(:name,'foo')
distination = browser.driver.find_element(:name,'bar')
target_element.drag_and_drop_on distination

```

現在はこのメソッドは Firefox でのみ動作するみたいですが、これは助かりますね。
