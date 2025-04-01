---
title: watir-webdriver で開いたFirefoxのFirebugを起動状態にする
date: 2010-12-13T03:00:00.000Z
categories:
- software testing
tags:
- selenium
- watir
- webdriver
---
watir-webdriverからFirefoxを起動すると、webdriver用に調整された設定(profile)を使用します（厳密にはSelenium::Webdriverが用意した設定）。この調整された設定では、アドオンはwebdriverしか起動状態になりません。そのため、watir-webdriverで開いたFirefoxでFirebugを起動させたい場合は、用意された設定に予め追加しておく必要があります。具体的には下記のような感じ。[Handle Security warining - Watir General | Google グループ](http://groups.google.com/group/watir-general/browse_thread/thread/54058823b655f7e6)の情報を参考にしています。

<!-- more -->

```
require 'rubygems'
require 'watir-webdriver'

profile = Selenium::WebDriver::Firefox::Profile.new
profile.add_extension("./firebug.xpi",:firebug)
selenium = Selenium::WebDriver.for :firefox,:profile=>profile
watir = Watir::Browser.new selenium

```

単純にWatir::Browser.newとすると、Selenium::Webdriverで用意したデフォルトの設定しか利用できないため、Selenium::Webdriver用の独自のプロフィールファイルを作成して、それを読み込ませたSelenium::WebdriverをWatirで操作するオブジェクトとします。

add_extensionで追加するアドオンのファイルはxpiかzip形式である必要があります。Firebugのxpiファイルは[Firebugのリリースの一覧](http://getfirebug.com/releases/firebug/)から適切なバージョンをダウンロードします。add_extensionの詳細については[profile.rb - selenium - Project Hosting on Google Code](http://code.google.com/p/selenium/source/browse/trunk/rb/lib/selenium/webdriver/firefox/profile.rb#131)を参考に。

これでwebdriverで起動したFirefoxにFirebugのアドオンが追加されるようになります。通常のテストではFirebugを起動状態にする必要はありませんが、テストスクリプトを作成する場合には便利。FirebugでHTML構造をみつつ、Waitrで実際に操作しながら作成することができます。
