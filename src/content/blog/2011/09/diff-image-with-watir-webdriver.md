---
title: watir-webdriver で画像データを評価する
date: 2011-09-11T13:36:00.000Z
categories:
- software testing
tags:
- htmlunit
- watir
- webdriver
---
たとえば、画像ファイルが上書きされているかどうかを確認したい場合などで、画像のsrcなどには差分がなく画像データを比較しないとその動作の正否が分からないとか、そういうときはやはり画像データを評価して差を見るしかない。

<!-- more -->

しかし、webdriver上では画像をローカルに保存するようなメソッドはいまのところ実装されていなくて、通常のdriverでは画像のデータにアクセスする方法がない。publicなところにある画像なら、Net::HTTPとかその他何らかの方法で画像をダウンロードしてきてダウンロードした画像を評価すれば良いのだけど、ログインしないとたどり着けないようなところにある画像の場合はやっかいなので、やはりwebdriver上でなんとかしたい。

では、どうするか。2つの方法にたどり着きました。一つはFirefoxのabout:cacheというページでlengthを比較するというもの。Firefoxのcacheは「[about:cache-entry?client=HTTP&sb=1&key=/blog//assets/images/banner.gif](about:cache-entry?client=HTTP&sb=1&key=/blog//assets/images/banner.gif)」というかたちでアクセスできる。この画面にはData sizeなどの情報が含まれていて、このあたりの情報から画像が期待通りの状態になっているのかを判断する。判断することができれば。

もう一つはHtmlUnitDriverを使用する方法。HtmlUnitDriverでは下記のような形で画像のデータにアクセスすることができます（いまのところ）。

```
require 'watir-webdriver'
require 'selenium/server'
require 'base64'

@server = Selenium::Server.new('selenium-server-standalone-2.5.0.jar',
                               :background => true)
@server.start
capabilities = 
Selenium::WebDriver::Remote::Capabilities.htmlunit(
                                          :javascript_enabled => true)

b = Watir::Browser.new(:remote, :url => "http://127.0.0.1:4444/wd/hub", 
                       :desired_capabilities => capabilities)
b.goto '/blog//assets/images/banner.gif'
data = Base64.encode64(b.html)

```

通常のDriverの場合、htmlメソッドを使用すると、指定した要素のhtmlが出力されるのですが、HtmlUnitDriverでは、画像にアクセスしている場合は画像のデータを返してきます。このデータをBase64でエンコードして比較する（とよいと教えてもらった）。

留意点としては、HtmlUnitDriverはキャッシュを強力に持つようだということ。同じファイル名にアクセスするなどすでにキャッシュを持ってしまっている場合は、単純にb.refreshとかしてで更新しようとしてもデータ内容は更新されません。この場合、一度b.closeでクローズしたあとにもう一度startするなどしてキャッシュがない状態にする必要があります。closeするとセッションがなくなるのでログインする必要がある場合は再度ログインする必要があります。

```
b.close
b = Watir::Browser.new(:remote, :url => "http://127.0.0.1:4444/wd/hub",
                       :desired_capabilities => capabilities)

```

HTMLUnitDriverについては[HtmlUnitDriverのwikiページ](http://code.google.com/p/selenium/wiki/HtmlUnitDriver)などを参照ください。[selenium-server-standaloneをダウンロード](http://code.google.com/p/selenium/downloads/list)して、事前にサーバーを起動する必要があります（Selenium::Serve.newで起動する）。
