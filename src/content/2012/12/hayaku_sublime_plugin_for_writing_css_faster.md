---
title: Hayaku &#x3a; CSSを早く書くためのSublime text 2 plugin
date: 2012-12-09T12:51:00.000Z
categories:
  - web
tags:
  - css
  - "sublime text 2"
excerpt: "Bruce Lawsonのreading listで小さく紹介されていた「Hayaku」というSublime Text 2のpluginを簡単に紹介。使ってみた感じは、今のところ劇的に役立っている感じはないですけど...邪魔にもならない。人によっては便利かも。"
---

[Bruce Lawson の reading list](http://www.brucelawson.co.uk/2012/reading-list-33/)で小さく紹介されていた「[Hayaku](https://github.com/hayaku/hayaku)」という Sublime Text 2 の plugin を簡単に紹介。使ってみた感じは、今のところ劇的に役立っている感じはないですけど...邪魔にもならない。人によっては便利かも。

機能は[github のページ](https://github.com/hayaku/hayaku#features)に書かれていますが、Smart CSS Abbreviations、Postexpands、Creating new CSS rule blocks などなど。Smart CSS Abbreviations というのは、何文字か入力したあとに TAB キーを押すと、一番それっぽい入力候補を出力してくれるというもの。Postexpands はたとえば「position:」のあとに「a」と入力すると、「absolute」まで補完してくれる。地味に便利かもしれない。Creating new CSS rule blocks は、「command+Enter」でブロック（{}）を生成してくれる。これも地味に便利と言えば便利かもしれない。

インストールの仕方は、Sublime Text 2 を開いて「command + Shift + p」で、Command Palette を開いて（メニューバーの「Tools」から「Command Palette」を選択しても良い）、「Package Control: Install Package」を選んで（入力フォームに「Package」と入れると、入力候補に表れる）、次に「hayaku」と入力すると Hayaku の plugin が候補に出てくるので、選択する（Package Control をインストールしていない場合は[Sublime Package Control](http://wbond.net/sublime_packages/package_control)からインストールする必要がある）。

アンインストールは、Command Palette で「Package Control: Remove Package」を選んで、plugin を選択するだけなので、わりと気楽に試してみても良いかもしれない。
