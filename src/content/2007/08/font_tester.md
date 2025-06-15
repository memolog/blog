---
title: "Font Tester：使いたいフォントをウェブ上で比較検討"
date: 2007-08-13T15:07:33.000Z
featured:
  image: elijah-pilchard-5QHUhsXPNeM-unsplash
  author: Elijah Pilchard
  authorLink: https://unsplash.com/ja/@elijahp?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
categories:
  - web
tags:
  - css
  - tool
excerpt: "Font Tester は選択したフォントが、ブラウザ上でどんな感じで表示されるのかをプレビューしてくれるウェブサービス"
---

- Font Tester（でもすでに閉鎖）

Windows IE で memolog.org を閲覧したときに、font-size:12px に指定している箇所より font-size:11px に指定している箇所の方が大きく表示されていたので、不思議に思っていろいろテストしてたときに思い出したページ。

Font Tester は選択したフォントが、ブラウザ上でどんな感じで表示されるのかをプレビューしてくれるウェブサービスです。画面が 3 つにわかれているので、フォントを比較検討したいときは便利。

ただ、残念ながら日本語フォントがプルダウンメニューから選択できない。とりあえず Firebug でプルダウンメニューの値をすり替えて表示させたりした（IE では確認できませんが）。日本語フォントもプルダウンメニューに追加してって feedback だすのが良いかもなあ。

結局、原因は font-family が「Trebuchet MS」であったためだったようで、font-family を sans-serif に変更しました。理由までは深く追求せず。
