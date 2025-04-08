---
title: watir-webdriver：バックグラウンドで実行する
date: 2011-01-17T03:00:00.000Z
categories:
  - software testing
tags:
  - selenium
  - watir
  - webdriver
excerpt: "「Watir-WebDriver: A detailed introduction | WatirMelon」の「The remote WebDriver Server」と「Hello Watir-WebDriver in Headless (HTML Unit)」あたりの話。Seleniumのサーバーを使うことで、ブラウザを立ち上げずにバックグラウンドでwebdriverを実行することができます。"
---

「[Watir-WebDriver: A detailed introduction | WatirMelon](http://watirmelon.com/2010/12/14/watir-webdriver-a-detailed-introduction/)」の「The remote WebDriver Server」と「Hello Watir-WebDriver in Headless (HTML Unit)」あたりの話。Selenium のサーバーを使うことで、ブラウザを立ち上げずにバックグラウンドで webdriver を実行することができます。

使用方法は（上のブログとほぼ同じですが...）下記のような感じ。てきとうに改行入れています。selenium-server は[Downloads - selenium - Project Hosting on Google Code](http://code.google.com/p/selenium/downloads/list)のページからダウンロードできます。サーバーは Java で動作します。

```
require 'selenium/server'
Selenium_Server = File.expand_path('selenium-server-standalone-2.0b1.jar')
@server = Selenium::Server.new(Selenium_Server, :background => true)
@server.start
capabilities = Selenium::WebDriver::Remote::Capabilities
                                 .htmlunit(:javascript_enabled => true)
@b = Watir::Browser.new(:remote, :url => "http://127.0.0.1:4444/wd/hub",
                                 :desired_capabilities => capabilities)
## いろいろな動作
@server.stop # 最後にサーバーを止める

```

ブラウザを立ち上げずに実行できるので、Hudson(Jenkins)などを使ってインテグレーションテストをするようなときに便利、という話。通常のブラウザと比較するとまだ動作が不安定のように見えますけど（beta だし）。
