---
title: Windows Vista IE 7でwatirを利用する場合の注意点
date: 2009-04-18T12:18:00.000Z
categories:
  - web
tags:
  - watir
excerpt: "WatirをWindows VistaのIE 7で実行する場合は、「保護モード」を何とかする必要がある。これが有効になっていると、Watirで起動したIEに対して処理を指令できなくなる。たとえば、Watir::IE.newしたあとに、gotoメソッド（内部でnavigateメソッドを使用）を実行すると、newしたブラウザではなく、別ブラウザが立ち上がってgotoで指定したURLに移動してしまう。"
---

Watir を Windows Vista の IE 7 で実行する場合は、「保護モード」を何とかする必要がある。これが有効になっていると、Watir で起動した IE に対して処理を指令できなくなる。たとえば、Watir::IE.new したあとに、goto メソッド（内部で navigate メソッドを使用）を実行すると、new したブラウザではなく、別ブラウザが立ち上がって goto で指定した URL に移動してしまう。

「保護モード」は、インターネットオプションのセキュリティタブにある「保護モードを有効にする」のチェックボックスをオフにすることで無効にすることができる。他の方法で保護モードの状態を変更できるかしれないけれど、そこまで調べてない。詳しくは[保護モードの Internet Explorer の理解と機能](http://msdn.microsoft.com/ja-jp/library/bb250462.aspx)あたりをどうぞ。
