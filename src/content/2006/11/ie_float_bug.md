---
title: IE float bug
date: 2006-11-27T01:47:26.000Z
categories:
- web
tags:
- css
- ie
---
*   [The IE Doubled Float-Margin Bug](http://www.positioniseverything.net/explorer/doubled-margin.html)

<!-- more -->

IEにはいろいろなバグが存在するのは周知の事実ですが、その一つにfloatされた要素のmargin（またはpadding）を二重に計算してしまうというものがあるそうです。今回作成したCSSとHTMLではこのバグに直面したようです。

調べていくと、floatをかけている要素をdisplay:inlineにすれば回避できるようなのですが、どうもうまくいかない（人違いならず、バグ違いだったかも）。時間もないので、美しくないですがmain-navigationの下に<br clear="left;" />を追加しててきとうに回避しました。一番最後のリストタグに、style="clear:left;"と入れても良かったかもしれませんが、検証し直すほどのことでもない気がするので、そのまま。このまま。気の向くままに。
