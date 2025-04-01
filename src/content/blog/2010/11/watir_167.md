---
title: watir 1.6.7 リリース
date: 2010-11-03T07:42:00.000Z
categories:
- software testing
tags:
- watir
---
[watirの1.6.7がリリース](http://watir.com/2010/10/28/watir-1-6-7-released/)されたみたいですね。

今回のリリースはwaitメソッドの追加が主のようです。Watir::Elementに#when\_present, #wait\_until\_present, #wait\_while\_present, #present?という4つのメソッドを追加して、Watir::IE and Watir::Firefoxに#wait\_until, #wait_whileという2つのメソッドが追加されています。

<!-- more -->

[1.6.7のドキュメント](http://rdoc.info/gems/watir/1.6.7/frames)にはメソッドの詳細がまだ載ってないようですが、#present?はelement(:id,'id').present?と指定すると、existでvisibleの場合にtrueを返すみたいなメソッドで、#when\_presentは、element(:id,'id').when\_present{ |element| element.click} みたいに、対象がpresentになった場合にブロッグを実行するみたいなメソッド。

#wait\_untilは、browser.wait\_until(60){|b| b.link(:id, 'flyout').exist?}みたいに、ブロックの条件がtrueになるまでwaitする。引数にタイムアウトの秒数を設定できる（タイムアウトした場合は例外が発生）。#wait_whileはブロックの条件がtrueの間waitする（falseになるまでwaitする）。

そして、#wait\_until\_presentは対象がpresentになるまでwaitして、#wait\_while\_presentは対象がpresentの間はwaitするみたいな感じ。Javascript/AJAX的な処理をした場合で画面全体が遷移しないようなときに使えそうですね。

さっそくインストールしてみましたが、特に問題なく動作しております。
