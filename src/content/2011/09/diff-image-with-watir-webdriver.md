---
title: watir-webdriver で画像データを評価する
date: 2011-09-11T13:36:00.000Z
categories:
  - software testing
tags:
  - htmlunit
  - watir
  - webdriver
excerpt: "たとえば、画像ファイルが上書きされているかどうかを確認したい場合などで、画像のsrcなどには差分がなく画像データを比較しないとその動作の正否が分からないとか、そういうときはやはり画像データを評価して差を見るしかない。"
---

たとえば、画像ファイルが上書きされているかどうかを確認したい場合などで、画像の src などには差分がなく画像データを比較しないとその動作の正否が分からないとか、そういうときはやはり画像データを評価して差を見るしかない。

しかし、webdriver 上では画像をローカルに保存するようなメソッドはいまのところ実装されていなくて、通常の driver では画像のデータにアクセスする方法がない。public なところにある画像なら、Net::HTTP とかその他何らかの方法で画像をダウンロードしてきてダウンロードした画像を評価すれば良いのだけど、ログインしないとたどり着けないようなところにある画像の場合はやっかいなので、やはり webdriver 上でなんとかしたい。

では、どうするか。2 つの方法にたどり着きました。一つは Firefox の about:cache というページで length を比較するというもの。Firefox の cache は「[about:cache-entry?client=HTTP&sb=1&key=/assets/images/banner.gif](about:cache-entry?client=HTTP&sb=1&key=/assets/images/banner.gif)」というかたちでアクセスできる。この画面には Data size などの情報が含まれていて、このあたりの情報から画像が期待通りの状態になっているのかを判断する。判断することができれば。

もう一つは HtmlUnitDriver を使用する方法。HtmlUnitDriver では下記のような形で画像のデータにアクセスすることができます（いまのところ）。

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
b.goto '/assets/images/banner.gif'
data = Base64.encode64(b.html)

```

通常の Driver の場合、html メソッドを使用すると、指定した要素の html が出力されるのですが、HtmlUnitDriver では、画像にアクセスしている場合は画像のデータを返してきます。このデータを Base64 でエンコードして比較する（とよいと教えてもらった）。

留意点としては、HtmlUnitDriver はキャッシュを強力に持つようだということ。同じファイル名にアクセスするなどすでにキャッシュを持ってしまっている場合は、単純に b.refresh とかしてで更新しようとしてもデータ内容は更新されません。この場合、一度 b.close でクローズしたあとにもう一度 start するなどしてキャッシュがない状態にする必要があります。close するとセッションがなくなるのでログインする必要がある場合は再度ログインする必要があります。

```
b.close
b = Watir::Browser.new(:remote, :url => "http://127.0.0.1:4444/wd/hub",
                       :desired_capabilities => capabilities)

```

HTMLUnitDriver については[HtmlUnitDriver の wiki ページ](http://code.google.com/p/selenium/wiki/HtmlUnitDriver)などを参照ください。[selenium-server-standalone をダウンロード](http://code.google.com/p/selenium/downloads/list)して、事前にサーバーを起動する必要があります（Selenium::Serve.new で起動する）。
