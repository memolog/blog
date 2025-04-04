---
title: Font Tester &#x3a; 使いたいフォントをウェブ上で比較検討
date: 2007-08-13T15:07:33.000Z
categories:
  - web
tags:
  - css
  - tool
excerpt: "*   Font Tester  Windows IE でmemolog.orgを閲覧したときに、font-size:12pxに指定している箇所よりfont-size:11pxに指定している箇所の方が大きく表示されていたので、不思議に思っていろいろテストしてたときに思い出したページ。"
---

- [Font Tester](http://www.fonttester.com/)

Windows IE で memolog.org を閲覧したときに、font-size:12px に指定している箇所より font-size:11px に指定している箇所の方が大きく表示されていたので、不思議に思っていろいろテストしてたときに思い出したページ。

Font Tester は選択したフォントが、ブラウザ上でどんな感じで表示されるのかをプレビューしてくれるウェブサービスです。画面が 3 つにわかれているので、フォントを比較検討したいときは便利。

ただ、残念ながら日本語フォントがプルダウンメニューから選択できない。とりあえず Firebug でプルダウンメニューの値をすり替えて表示させたりした（IE では確認できませんが）。日本語フォントもプルダウンメニューに追加してって feedback だすのが良いかもなあ。

結局、原因は font-family が「Trebuchet MS」であったためだったようで、font-family を sans-serif に変更しました。理由までは深く追求せず。
