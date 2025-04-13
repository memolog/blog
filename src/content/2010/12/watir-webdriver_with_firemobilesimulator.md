---
title: watir-webdriver でFireMobileSimulatorを使用する
date: 2010-12-14T03:00:00.000Z
categories:
  - software testing
tags:
  - mobile
  - watir
  - webdriver
excerpt: "watir-webdriver で開いたFirefoxのFirebugを起動状態にすると同じ要領で、FireMobileSimulatorを起動した状態でwatir-webdriverを実行することができます。ただFirebugに比べると若干設定の追加が必要です。具体的には下記のような感じ。"
---

[watir-webdriver で開いた Firefox の Firebug を起動状態にする](/2010/12/watir-webdriver_with_firebug/)と同じ要領で、FireMobileSimulator を起動した状態で watir-webdriver を実行することができます。ただ Firebug に比べると若干設定の追加が必要です。具体的には下記のような感じ。

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

最初から add_extension までは前回と同じです。FireMobileSimulator の api は[ダウンロード一覧](http://firemobilesimulator.org/?%A5%C0%A5%A6%A5%F3%A5%ED%A1%BC%A5%C9)から適切なバージョンのものをダウンロードします。上の例ではバージョン「1.1.11」を使用しています。

そのあとの profile\['msim.current.carrier'\]='DC'は、プロフィールの設定に msim.current.carrier の値を設定しています。この設定は FireMobileSimulator で現在設定しているキャリアが何かを示しています。profile\['msim.current.id'\]='1'というのは、FireMobileSimulator の devicelist の 1 番目の項目を設定しているという状況になります。profile\['msim.data.lastversion'\]='1.1.11'では、FireMobileSimulator の現在のバージョンを設定しています。この設定がない（または設定しようとしているバージョンと異なる）場合、FireMobileSimulator のアドオンはアップデートを行ったと見なし、release note をタブで表示しようとします。「msim.data.lastversion」などのアドオンに関する設定については「about:config」の状態で一通り参照することができます。

FireMobileSimulator では、8 つのデフォルトのユーザーエージェントを用意していますが、それ以外のエージェントを使用したい場合は、下記のような感じでアドオンを追加することができます。

```
profile['msim.devicelist.9.carrier']='SB'
profile['msim.devicelist.9.label']='SoftBank SH999'
profile['msim.devicelist.9.useragent']='SoftBank SH999'
profile['msim.devicelist.count']=9

```

他にも端末ごとに設定できる値がありますが、詳しくは about:config の内容を参考にしてください。
