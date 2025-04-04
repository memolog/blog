---
title: watir 1.6.5 (higher) で日本語が文字化けする
date: 2010-10-18T03:00:00.000Z
categories:
- software testing
tags:
- watir
---
watirを1.6.5にアップデートしたあたりからwatirで日本語を入力しようとすると文字が化ける。困って調べみたら、どうやらUTF-8で文字を送る必要があることがわかり（スクリプトの文字コードはSJIS）、text\_fieldなどで入力する文字列をrequire "kconv"しつつ.to\_utf8すると問題を回避してました。

<!-- more -->

それ以降文字列を.to\_utf8したり、to\_sjisでSJISに戻したりみたいな妙なことをしていたのですが、最近になってwin32ole.rbの中でWIN32OLE.codepage = WIN32OLE::CP_UTF8 しているのが原因と知りました。[Adding UTF-8 characters to text fields](http://wiki.openqa.org/display/WTR/Adding+UTF-8+characters+to+text+fields)というドキュメントに書いてありました。SJISを使用したい場合は、win32ole.rbをrequireしたあとののどこかで WIN32OLE.codepage = WIN32OLE::CP_ACP と記述しておけばよい。これでマシンのデフォルト(ANSI)になる。一件落着。よかったよかった。

しかし。私はすでに作成済みのスクリプトがSJISだというのと、rubyも1.8.6なので、当面SJISを使っていきますが、特に必要ない人はUTF-8を使用するのがよいですよね。WindowsのコマンドラインがやはりデフォルトがSJISで、UTF-8を使用しているとirb上での日本語入力で困りそうな気がしなくもありませんが、そこはうまくやり過ごして。
