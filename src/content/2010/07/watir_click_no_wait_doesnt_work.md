---
title: watir&#x3a; click_no_wait が動作しない
date: 2010-07-13T12:45:00.000Z
categories:
- software testing
tags:
- watir
---
普段watirで使用していないPCにwatir (version 1.6.5) をインストールして使用したところ、click\_no\_waitのメソッドがなぜか動作しない。clickとclick!のメソッドは問題なく動作しました。

<!-- more -->

うーん。

[click\_no\_wait patch](http://rubyforge.org/pipermail/wtr-development/2009-January/000400.html)のパッチをあてたら動作するようになりました。page_contaienrでのシステムの呼び出し方がよくない模様。

click\_no\_waitが動かなかった環境はWindows XPの Service Pack 3のIE8という環境。Service Pack 2でIE6、watir 1.5.xの環境では正常に動作しているので、Service Packの違いかブラウザかwaitrのバージョンの違いに関連がありそうですが、詳しくは分かりませんでした。

click\_no\_waitは、ファイル挿入の「ファイルを選択」ボタンを押すときなどに使用します。clickのメソッドはwaitを実行するので、「ファイルを選択」ボタンのようにボタンを押した後にモーダルウィンドウが表示される場合はclick\_no\_waitを使用する必要があります。click!のメソッドはcontainerに対してはwaitしないけど、ole_objectに対してはwaitするから（たぶん）、「ファイルの選択」ボタンのようなケースではうまく動かない、みたい。

*   [Watir::Element \[Watir API Reference\]](http://wtr.rubyforge.org/rdoc/1.6.5/classes/Watir/Element.html#M000553)
