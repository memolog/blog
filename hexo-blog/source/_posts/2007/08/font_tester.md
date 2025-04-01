---
title: Font Tester &#x3a; 使いたいフォントをウェブ上で比較検討
date: 2007-08-13T15:07:33.000Z
categories:
- web
tags:
- css
- tool
---
*   [Font Tester](http://www.fonttester.com/)

Windows IE でmemolog.orgを閲覧したときに、font-size:12pxに指定している箇所よりfont-size:11pxに指定している箇所の方が大きく表示されていたので、不思議に思っていろいろテストしてたときに思い出したページ。

<!-- more -->

Font Testerは選択したフォントが、ブラウザ上でどんな感じで表示されるのかをプレビューしてくれるウェブサービスです。画面が3つにわかれているので、フォントを比較検討したいときは便利。

ただ、残念ながら日本語フォントがプルダウンメニューから選択できない。とりあえずFirebugでプルダウンメニューの値をすり替えて表示させたりした（IEでは確認できませんが）。日本語フォントもプルダウンメニューに追加してってfeedbackだすのが良いかもなあ。

結局、原因はfont-familyが「Trebuchet MS」であったためだったようで、font-familyをsans-serifに変更しました。理由までは深く追求せず。
