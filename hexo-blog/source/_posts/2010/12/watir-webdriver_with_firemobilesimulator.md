---
title: watir-webdriver でFireMobileSimulatorを使用する
date: 2010-12-14T03:00:00.000Z
categories:
- software testing
tags:
- mobile
- watir
- webdriver
---
[watir-webdriver で開いたFirefoxのFirebugを起動状態にする](/blog//2010/12/watir-webdriver_with_firebug/ )と同じ要領で、FireMobileSimulatorを起動した状態でwatir-webdriverを実行することができます。ただFirebugに比べると若干設定の追加が必要です。具体的には下記のような感じ。

<!-- more -->

```
require 'rubygems'
require 'watir-webdriver'

profile = Selenium::WebDriver::Firefox::Profile.new
profile.add_extension("./firemobilesimulator.xpi",:firemobilesimulator)
profile['msim.current.carrier']='DC'
profile['msim.current.id']='1'
profile['msim.data.lastversion']='1.1.11'

selenium = Selenium::WebDriver.for :firefox,:profile=>profile
browser = Watir::Browser.new selenium

```

最初からadd_extensionまでは前回と同じです。FireMobileSimulatorのapiは[ダウンロード一覧](http://firemobilesimulator.org/?&#x25;A5&#x25;C0&#x25;A5&#x25;A6&#x25;A5&#x25;F3&#x25;A5&#x25;ED&#x25;A1&#x25;BC&#x25;A5&#x25;C9)から適切なバージョンのものをダウンロードします。上の例ではバージョン「1.1.11」を使用しています。

そのあとのprofile\['msim.current.carrier'\]='DC'は、プロフィールの設定にmsim.current.carrierの値を設定しています。この設定はFireMobileSimulatorで現在設定しているキャリアが何かを示しています。profile\['msim.current.id'\]='1'というのは、FireMobileSimulatorのdevicelistの1番目の項目を設定しているという状況になります。profile\['msim.data.lastversion'\]='1.1.11'では、FireMobileSimulatorの現在のバージョンを設定しています。この設定がない（または設定しようとしているバージョンと異なる）場合、FireMobileSimulatorのアドオンはアップデートを行ったと見なし、release noteをタブで表示しようとします。「msim.data.lastversion」などのアドオンに関する設定については「about:config」の状態で一通り参照することができます。

FireMobileSimulatorでは、8つのデフォルトのユーザーエージェントを用意していますが、それ以外のエージェントを使用したい場合は、下記のような感じでアドオンを追加することができます。

```
profile['msim.devicelist.9.carrier']='SB'
profile['msim.devicelist.9.label']='SoftBank SH999'
profile['msim.devicelist.9.useragent']='SoftBank SH999'
profile['msim.devicelist.count']=9

```

他にも端末ごとに設定できる値がありますが、詳しくはabout:configの内容を参考にしてください。
