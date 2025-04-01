---
title: Hayaku &#x3a; CSSを早く書くためのSublime text 2 plugin
date: 2012-12-09T12:51:00.000Z
categories:
- web
tags:
- css
- "sublime text 2"
---
[Bruce Lawsonのreading list](http://www.brucelawson.co.uk/2012/reading-list-33/)で小さく紹介されていた「[Hayaku](https://github.com/hayaku/hayaku)」というSublime Text 2のpluginを簡単に紹介。使ってみた感じは、今のところ劇的に役立っている感じはないですけど...邪魔にもならない。人によっては便利かも。

<!-- more -->

機能は[githubのページ](https://github.com/hayaku/hayaku#features)に書かれていますが、Smart CSS Abbreviations、Postexpands、Creating new CSS rule blocksなどなど。Smart CSS Abbreviationsというのは、何文字か入力したあとにTABキーを押すと、一番それっぽい入力候補を出力してくれるというもの。Postexpandsはたとえば「position:」のあとに「a」と入力すると、「absolute」まで補完してくれる。地味に便利かもしれない。Creating new CSS rule blocksは、「command+Enter」でブロック（{}）を生成してくれる。これも地味に便利と言えば便利かもしれない。

インストールの仕方は、Sublime Text 2を開いて「command + Shift + p」で、Command Paletteを開いて（メニューバーの「Tools」から「Command Palette」を選択しても良い）、「Package Control: Install Package」を選んで（入力フォームに「Package」と入れると、入力候補に表れる）、次に「hayaku」と入力するとHayakuのpluginが候補に出てくるので、選択する（Package Controlをインストールしていない場合は[Sublime Package Control](http://wbond.net/sublime_packages/package_control)からインストールする必要がある）。

アンインストールは、Command Paletteで「Package Control: Remove Package」を選んで、pluginを選択するだけなので、わりと気楽に試してみても良いかもしれない。
