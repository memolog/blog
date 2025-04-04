---
title: watir 1.6.7 リリース
date: 2010-11-03T07:42:00.000Z
categories:
  - software testing
tags:
  - watir
excerpt: "watirの1.6.7がリリースされたみたいですね。  今回のリリースはwaitメソッドの追加が主のようです。Watir::Elementに#when\_present, #wait\_until\_present, #wait\_while\_present, #present?という4つのメソッドを追加して、Watir::IE and Watir::Firefoxに#wait\_until, #wait_whileという2つのメソッドが追加されています。"
---

[watir の 1.6.7 がリリース](http://watir.com/2010/10/28/watir-1-6-7-released/)されたみたいですね。

今回のリリースは wait メソッドの追加が主のようです。Watir::Element に#when_present, #wait_until_present, #wait_while_present, #present?という 4 つのメソッドを追加して、Watir::IE and Watir::Firefox に#wait_until, #wait_while という 2 つのメソッドが追加されています。

[1.6.7 のドキュメント](http://rdoc.info/gems/watir/1.6.7/frames)にはメソッドの詳細がまだ載ってないようですが、#present?は element(:id,'id').present?と指定すると、exist で visible の場合に true を返すみたいなメソッドで、#when_present は、element(:id,'id').when_present{ |element| element.click} みたいに、対象が present になった場合にブロッグを実行するみたいなメソッド。

#wait_until は、browser.wait_until(60){|b| b.link(:id, 'flyout').exist?}みたいに、ブロックの条件が true になるまで wait する。引数にタイムアウトの秒数を設定できる（タイムアウトした場合は例外が発生）。#wait_while はブロックの条件が true の間 wait する（false になるまで wait する）。

そして、#wait_until_present は対象が present になるまで wait して、#wait_while_present は対象が present の間は wait するみたいな感じ。Javascript/AJAX 的な処理をした場合で画面全体が遷移しないようなときに使えそうですね。

さっそくインストールしてみましたが、特に問題なく動作しております。
