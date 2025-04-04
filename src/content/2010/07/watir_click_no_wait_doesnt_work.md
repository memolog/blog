---
title: watir&#x3a; click_no_wait が動作しない
date: 2010-07-13T12:45:00.000Z
categories:
  - software testing
tags:
  - watir
excerpt: "普段watirで使用していないPCにwatir (version 1.6.5) をインストールして使用したところ、click\_no\_waitのメソッドがなぜか動作しない。clickとclick!のメソッドは問題なく動作しました。"
---

普段 watir で使用していない PC に watir (version 1.6.5) をインストールして使用したところ、click_no_wait のメソッドがなぜか動作しない。click と click!のメソッドは問題なく動作しました。

うーん。

[click_no_wait patch](http://rubyforge.org/pipermail/wtr-development/2009-January/000400.html)のパッチをあてたら動作するようになりました。page_contaienr でのシステムの呼び出し方がよくない模様。

click_no_wait が動かなかった環境は Windows XP の Service Pack 3 の IE8 という環境。Service Pack 2 で IE6、watir 1.5.x の環境では正常に動作しているので、Service Pack の違いかブラウザか waitr のバージョンの違いに関連がありそうですが、詳しくは分かりませんでした。

click_no_wait は、ファイル挿入の「ファイルを選択」ボタンを押すときなどに使用します。click のメソッドは wait を実行するので、「ファイルを選択」ボタンのようにボタンを押した後にモーダルウィンドウが表示される場合は click_no_wait を使用する必要があります。click!のメソッドは container に対しては wait しないけど、ole_object に対しては wait するから（たぶん）、「ファイルの選択」ボタンのようなケースではうまく動かない、みたい。

- [Watir::Element \[Watir API Reference\]](http://wtr.rubyforge.org/rdoc/1.6.5/classes/Watir/Element.html#M000553)
