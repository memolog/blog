---
title: watir-webdriver でCSVファイルをダウンロードする
date: 2011-09-04T13:00:00.000Z
categories:
- software testing
tags:
- watir
- webdriver
---
FirefoxでCSVファイルにアクセスすると、ダウンロードのダイアログが表示されるのですが、webdriver上でダイアログが出てくるとハンドリングできない（たぶん）ので困る。ので、profileを設定してダイアログを表示しないようにする。そしてダウンロードするフォルダも一緒に設定する、という話。詳しくは[Firefox 4 with watir webdriver: Need help using helperApps.neverAsk to save CSV without prompting - Stack Overflow](http://stackoverflow.com/questions/5473354/firefox-4-with-watir-webdriver-need-help-using-helperapps-neverask-to-save-csv-w)と[Browser Downloads | Watir WebDriver](http://watirwebdriver.com/browser-downloads/)などを参照

<!-- more -->

pdfファイルやicoファイルなどブラウザで処理しないような拡張子のファイルなどは同じような手順でダウンロード可能。jpgなどの画像ファイルは基本的にブラウザ上で表示するのでこの設定を入れるだけではダウンロードの状態にすることはできないみたい。

```
profile = Selenium::WebDriver::Firefox::Profile.new
profile['browser.download.useDownloadDir'] = true
profile['browser.download.folderList'] = 2
profile['browser.download.dir'] = './download'
profile['browser.helperApps.neverAsk.saveToDisk'] = "text/plain, 
    application/vnd.ms-excel, text/csv, 
    text/comma-separated-values, application/octet-stream"
selenium = Selenium::WebDriver.for driver,:profile=>profile
b = Watir::Browser.new selenium
b.goto 'http://example.com/foobar.csv'

```
