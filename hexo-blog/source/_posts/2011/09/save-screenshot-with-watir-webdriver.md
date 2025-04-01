---
title: watir-webdriver でスクリーンショットを撮る
date: 2011-09-03T12:00:00.000Z
categories:
- software testing
tags:
- webdriver
---
小ネタでも挟もうではありませんか。watir-webdriverを使って簡単にスクリーンショット撮ることができます。Macにはrubyがもともと入っているので、事前準備はwatir-webdriverをインストールするだけです。インストールは、ターミナルを開いて下記のコマンドを実行する。

<!-- more -->

```
sudo gem install watir-webdriver

```

インストール後、ターミナルでirbと入力して、irbを起動。

```
irb

```

そして、irb上でwatir-webdriverを起動して、gotoメソッドでキャプチャを撮りたい画面にアクセスしてsave_screenshotを実行します。

```
require 'watir-webdriver'
b = Watir::Browser.new
b.goto 'http://memolog.org'
b.driver.save_screenshot "#{Dir.pwd}/Desktop/screenshot.png"

```

これでデスクトップ上にscreenshot.pngという新しいファイルが作成されます。撮ったスクリーンショットはこんな感じでページ全体になります。  
  
[![memolog](http://farm7.static.flickr.com/6205/6108266015_80210a0c21.jpg)](http://www.flickr.com/photos/91221720@N00/6108266015/in/photostream)

応用としては、撮りたいサイトをリストにしてキャプチャ撮って、サイトのtitle名で保存するとか。ファイル名を半角英数に限定したいならドットを除いたhost名（URI.parse(b.url).host.gsub('.','')）とか使用しても良いかもしれません。

```
require 'watir-webdriver'

sites = &#x25;w(
http://memolog.org/
http://blog.hayase.tv/
http://www.sixapart.jp/
)

b = Watir::Browser.new
sites.each do |site|
    b.goto site
    b.driver.save_screenshot "#{Dir.pwd}/Desktop/#{b.title}.png"
end

```

さらに応用編としては、[watir-webdriver でFireMobileSimulatorを使用する](/blog//2010/12/watir-webdriver_with_firemobilesimulator/)で紹介したFireMobileSimulatorを使用して、携帯用の画面（エミューレートですけど）の画面キャプチャを撮ることもできます。画面の横幅はb.execute_script "window.resizeTo(340,800)"として、resizeするJavascriptを実行することで変更可能です。

```
require 'watir-webdriver'

profile = Selenium::WebDriver::Firefox::Profile.new
profile.add_extension("./firemobilesimulator.xpi",:firemobilesimulator)
profile['msim.current.carrier']='DC'
profile['msim.current.id']='1'
profile['msim.data.lastversion']='1.1.11'

selenium = Selenium::WebDriver.for :firefox,:profile=>profile
b = Watir::Browser.new selenium
b.execute_script "window.resizeTo(340,800)"
b.goto 'http://blog.hayase.tv/'
b.driver.save_screenshot "#{Dir.pwd}/Desktop/screenshot.png"

```

参考：[#55: Screenshot API - Issues - jarib/watir-webdriver - GitHub](https://github.com/jarib/watir-webdriver/issues/55)
