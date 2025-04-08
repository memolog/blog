---
title: watir 1.6.5 (higher) で日本語が文字化けする
date: 2010-10-18T03:00:00.000Z
categories:
  - software testing
tags:
  - watir
excerpt: "watirを1.6.5にアップデートしたあたりからwatirで日本語を入力しようとすると文字が化ける。困って調べみたら、どうやらUTF-8で文字を送る必要があることがわかり（スクリプトの文字コードはSJIS）、text\_fieldなどで入力する文字列をrequire \"kconv\"しつつ.to\_utf8すると問題を回避してました。"
---

watir を 1.6.5 にアップデートしたあたりから watir で日本語を入力しようとすると文字が化ける。困って調べみたら、どうやら UTF-8 で文字を送る必要があることがわかり（スクリプトの文字コードは SJIS）、text_field などで入力する文字列を require "kconv"しつつ.to_utf8 すると問題を回避してました。

それ以降文字列を.to_utf8 したり、to_sjis で SJIS に戻したりみたいな妙なことをしていたのですが、最近になって win32ole.rb の中で WIN32OLE.codepage = WIN32OLE::CP_UTF8 しているのが原因と知りました。[Adding UTF-8 characters to text fields](http://wiki.openqa.org/display/WTR/Adding+UTF-8+characters+to+text+fields)というドキュメントに書いてありました。SJIS を使用したい場合は、win32ole.rb を require したあとののどこかで WIN32OLE.codepage = WIN32OLE::CP_ACP と記述しておけばよい。これでマシンのデフォルト(ANSI)になる。一件落着。よかったよかった。

しかし。私はすでに作成済みのスクリプトが SJIS だというのと、ruby も 1.8.6 なので、当面 SJIS を使っていきますが、特に必要ない人は UTF-8 を使用するのがよいですよね。Windows のコマンドラインがやはりデフォルトが SJIS で、UTF-8 を使用していると irb 上での日本語入力で困りそうな気がしなくもありませんが、そこはうまくやり過ごして。
