---
title: Watir 2.0 / Webdriverベースのwatir
date: 2010-02-14T22:00:00.000Z
categories:
- software testing
tags:
- watir
---
*   [\[Wtr-development\] Watir 2.0 / WebDriver](http://rubyforge.org/pipermail/wtr-development/2009-October/001313.html)

<!-- more -->
*   [Introducing WebDriver - Google Open Source Blog](http://google-opensource.blogspot.com/2009/05/introducing-webdriver.html)
*   [#31 Jari Bakken and Simon Stewart on Watir 2.0, Selenium and WebDriver, Celerity and HtmlUnit](http://watirpodcast.com/31-jari-bakken-and-simon-stewart-on-watir-2-0-selenium-and-webdriver-celerity-and-htmlunit/)
*   [【ハウツー】JavaでWebブラウザをドライブ! WebDriverを使ってみよう (1) WebDriverとは | エンタープライズ | マイコミジャーナル](http://journal.mycom.co.jp/articles/2009/05/26/webdriver/index.html)

次世代のWatir、Watir 2.0 をWebdriverベースに実装しようという話。3ヶ月以上前の話ですけど先日気がつきました。こんなことやってるんですね。Webdriverはウェブアプリケーションのテストを自動化するためのフレームワークでIEやFirefox、Chromeなど複数のブラウザをサポートしています。WatirがWebdriverベースになればIE以外のブラウザでも使用することができるようになる（今でもFireWatirとかありますけど）。これはすばらしい。

Seleniumでも複数のブラウザをサポートしていますが、WebDriverとSeleniumとの大きな違いはSeleniumはJavascriptで動作させている一方でWebdriverはブラウザによって異なるアプローチで動作させること。たとえばIEではIE's Automation controlsを利用して、FirefoxではExtensionとして実装されている。これによってセキュリティ上Javascriptでは難しいWindowsのダイアログからのファイルの選択とか、サイトをまたがった操作もできるようになる。

そしてSeleniumもSelenium 2.0という名でWebdriverをベースにした開発をしているみたいですね。どこまで進んでいるのかとか詳しいことは分かってません。とにかく、次世代のWatirとSeleniumはどちらもWebdriverをベースになるということです。これによってWatirの優位性は薄れるなあという感じですね。Watirはもう役目を終えてしまったのかではないかという感があります。

しかし、ひとつWatirの優れたところを上げるとしたらメソッドの持ち方かなと思います。[Seleniumのメソッド](http://selenium.googlecode.com/svn/trunk/docs/api/rb/index.html)と[Watirのメソッド](http://jarib.github.com/watir-webdriver/doc/index.html)を比較すると、SeleniumはJavascriptのメソッドをベースにしていて、WatirではHTMLタグがメソッドの作り方のベースになっている。個人的にはですが、Watirの方がメソッドは圧倒的に分かりやすい。Javascriptのメソッドはそもそもわかりにくいので。

今後もWatirが存続する理由というか必要性というか、残っていてほしい理由はここにありそうです。とはいえ利用者数ではSeleniumが圧倒的な感はあって、どちらを使用するかは悩んじゃいますけどね。うむ。
