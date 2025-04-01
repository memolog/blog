---
title: watir-webdriver でjavascriptのポップアップをなんとかする
date: 2010-12-06T03:00:00.000Z
categories:
- software testing
tags:
- javascript
- watir
- webdriver
---
watirとwatir-webdriver違いは[Comparison with watir 1.x - watir-webdriver - GitHub](https://github.com/jarib/watir-webdriver/wiki/Comparison-with-Watir-1.X)にリストアップされていますが、ここにリストアップされていないもので大きな点というと、autoitを扱えなくなったという点があります。autoitはwindowsでのみ動作しない機能ですし、マルチプラットフォーム化しているwebdriverでは当たり前と言えば当たり前ですが。

<!-- more -->

ここで困るのはjavascriptのポップアップなどの処理です。watir 1.xにはWinClickerなどのツールもありましたが、watir-webdriverではそうしたOS依存の機能は現在のところありません（私は日本語のメニューの処理などがあったのでWinClickerを使用せずに、autoitで処理していました）。

そこでwatir-webdriverでは[execute_scriptのメソッドを使用して、javascriptを回避する方法](http://watirmelon.com/2010/10/31/dismissing-pesky-javascript-dialogs-with-watir/)が紹介されています。execute_scriptは（詳しくは理解できていませんが）表示しているページで使用しているjavascriptを上書きして実行することができるメソッドです。

そして[Testing webpages with JavaScript popups correctly](http://www.itreallymatters.net/post/1482786902/testing-webpages-with-javascript-popups-correctly)では、それを簡単に実行するためのメソッドを紹介しています。使い方はこんな感じ。

```
require 'rubygems'
require 'watir-webdriver'
require 'watir-webdriver/extensions/alerts'

browser = Watir::Webdriver.new
browser.confirm(true) do
  browser.link.click
end

```

watir-webdriver/extensions/alerts は拡張機能（extension）という位置づけであるため、watir-webdriverとは別にrequire する必要があります。

上記の場合では、リンクをクリックするとJavascriptでconfirmationのメッセージを表示されるような場合に、メッセージが表示されることなく「ok」の状態で次の状態に進みます。これでJavascriptのメッセージは回避することができます。Javscriptをオーバーライドして回避するので、（素のままのアプリケーションをテストするわけではないので）完璧なテストとは言えないかもしれませんが、そのへんはわりきって。

あと蛇足ですが、watir-webdriverでは、linkのメソッドなどelment関連のメソッドに引数を与えない場合は、はじめのlinkエレメントを実行します（watir 1.xで言うとlink(:index,1) と同じ動作になる）。

autoitを使用して処理していたものとして、BASIC認証のハンドリングなんかもあるんですが、今のところwatir-webdriverでの回避方法はわかっておりません。
