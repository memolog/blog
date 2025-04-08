---
title: Watir 2.0 / Webdriverベースのwatir
date: 2010-02-14T22:00:00.000Z
categories:
  - software testing
tags:
  - watir
excerpt: "次世代の Watir、Watir 2.0 を Webdriver ベースに実装しようという話"
---

- [\[Wtr-development\] Watir 2.0 / WebDriver](http://rubyforge.org/pipermail/wtr-development/2009-October/001313.html)

- [Introducing WebDriver - Google Open Source Blog](http://google-opensource.blogspot.com/2009/05/introducing-webdriver.html)
- [#31 Jari Bakken and Simon Stewart on Watir 2.0, Selenium and WebDriver, Celerity and HtmlUnit](http://watirpodcast.com/31-jari-bakken-and-simon-stewart-on-watir-2-0-selenium-and-webdriver-celerity-and-htmlunit/)
- [【ハウツー】Java で Web ブラウザをドライブ! WebDriver を使ってみよう (1) WebDriver とは | エンタープライズ | マイコミジャーナル](http://journal.mycom.co.jp/articles/2009/05/26/webdriver/index.html)

次世代の Watir、Watir 2.0 を Webdriver ベースに実装しようという話。3 ヶ月以上前の話ですけど先日気がつきました。こんなことやってるんですね。Webdriver はウェブアプリケーションのテストを自動化するためのフレームワークで IE や Firefox、Chrome など複数のブラウザをサポートしています。Watir が Webdriver ベースになれば IE 以外のブラウザでも使用することができるようになる（今でも FireWatir とかありますけど）。これはすばらしい。

Selenium でも複数のブラウザをサポートしていますが、WebDriver と Selenium との大きな違いは Selenium は Javascript で動作させている一方で Webdriver はブラウザによって異なるアプローチで動作させること。たとえば IE では IE's Automation controls を利用して、Firefox では Extension として実装されている。これによってセキュリティ上 Javascript では難しい Windows のダイアログからのファイルの選択とか、サイトをまたがった操作もできるようになる。

そして Selenium も Selenium 2.0 という名で Webdriver をベースにした開発をしているみたいですね。どこまで進んでいるのかとか詳しいことは分かってません。とにかく、次世代の Watir と Selenium はどちらも Webdriver をベースになるということです。これによって Watir の優位性は薄れるなあという感じですね。Watir はもう役目を終えてしまったのかではないかという感があります。

しかし、ひとつ Watir の優れたところを上げるとしたらメソッドの持ち方かなと思います。[Selenium のメソッド](http://selenium.googlecode.com/svn/trunk/docs/api/rb/index.html)と[Watir のメソッド](http://jarib.github.com/watir-webdriver/doc/index.html)を比較すると、Selenium は Javascript のメソッドをベースにしていて、Watir では HTML タグがメソッドの作り方のベースになっている。個人的にはですが、Watir の方がメソッドは圧倒的に分かりやすい。Javascript のメソッドはそもそもわかりにくいので。

今後も Watir が存続する理由というか必要性というか、残っていてほしい理由はここにありそうです。とはいえ利用者数では Selenium が圧倒的な感はあって、どちらを使用するかは悩んじゃいますけどね。うむ。
