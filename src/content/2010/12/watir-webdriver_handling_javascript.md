---
title: watir-webdriver でjavascriptのポップアップをなんとかする
date: 2010-12-06T03:00:00.000Z
categories:
  - software testing
tags:
  - javascript
  - watir
  - webdriver
excerpt: "watirとwatir-webdriver違いはComparison with watir 1.x - watir-webdriver - GitHubにリストアップされていますが、ここにリストアップされていないもので大きな点というと、autoitを扱えなくなったという点があります。autoitはwindowsでのみ動作しない機能ですし、マルチプラットフォーム化しているwebdriverでは当たり前と言えば当たり前ですが。"
---

watir と watir-webdriver 違いは[Comparison with watir 1.x - watir-webdriver - GitHub](https://github.com/jarib/watir-webdriver/wiki/Comparison-with-Watir-1.X)にリストアップされていますが、ここにリストアップされていないもので大きな点というと、autoit を扱えなくなったという点があります。autoit は windows でのみ動作しない機能ですし、マルチプラットフォーム化している webdriver では当たり前と言えば当たり前ですが。

ここで困るのは javascript のポップアップなどの処理です。watir 1.x には WinClicker などのツールもありましたが、watir-webdriver ではそうした OS 依存の機能は現在のところありません（私は日本語のメニューの処理などがあったので WinClicker を使用せずに、autoit で処理していました）。

そこで watir-webdriver では[execute_script のメソッドを使用して、javascript を回避する方法](http://watirmelon.com/2010/10/31/dismissing-pesky-javascript-dialogs-with-watir/)が紹介されています。execute_script は（詳しくは理解できていませんが）表示しているページで使用している javascript を上書きして実行することができるメソッドです。

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

watir-webdriver/extensions/alerts は拡張機能（extension）という位置づけであるため、watir-webdriver とは別に require する必要があります。

上記の場合では、リンクをクリックすると Javascript で confirmation のメッセージを表示されるような場合に、メッセージが表示されることなく「ok」の状態で次の状態に進みます。これで Javascript のメッセージは回避することができます。Javscript をオーバーライドして回避するので、（素のままのアプリケーションをテストするわけではないので）完璧なテストとは言えないかもしれませんが、そのへんはわりきって。

あと蛇足ですが、watir-webdriver では、link のメソッドなど elment 関連のメソッドに引数を与えない場合は、はじめの link エレメントを実行します（watir 1.x で言うと link(:index,1) と同じ動作になる）。

autoit を使用して処理していたものとして、BASIC 認証のハンドリングなんかもあるんですが、今のところ watir-webdriver での回避方法はわかっておりません。
