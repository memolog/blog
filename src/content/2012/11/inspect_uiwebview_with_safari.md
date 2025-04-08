---
title: SafariからUIWebViewのHTMLをinspectする
date: 2012-11-18T20:37:00.000Z
categories:
  - web
tags:
  - ios
  - phonegap
excerpt: "iPhone 5 and iOS 6 for HTML5 developers, a big step forward: web inspector, new APIs and more | Breaking the Mobile Webに、iPhone 5とiOS 6について詳しく載っていますが、その中で「Remote Debugging」というところの項目の話。"
---

[iPhone 5 and iOS 6 for HTML5 developers, a big step forward: web inspector, new APIs and more | Breaking the Mobile Web](http://www.mobilexweb.com/blog/iphone-5-ios-6-html5-developers)に、iPhone 5 と iOS 6 について詳しく載っていますが、その中で「Remote Debugging」というところの項目の話。

iOS 6 から iPhone 上に表示している UIWebView（web view）を Mac の Safari の Web インスペクタで表示することができるようになりました。通常の Web インスペクタ同様、Web インスペクタ上で iPhone で出力している実際の HTML/CSS が確認することができるとともに、その場で変更を適用してみて表示を確認することができます。これは便利。PhoneGap で作成するアプリケーションは UIWebView の中に HTML を展開するので、これらもインスペクトすることができます。

使い方は iPhone と Mac Safari の両方で Web インスペクタの設定を有効にするだけです。

iPhone(iOS)の設定は、設定の画面から、Safari を選んで、メニューの一番下に「詳細」をタップすると「Web インスペクタ」の設定があるので「オン」にする。
![](http://farm9.staticflickr.com/8209/8192836506_9402c2e4c6_z.jpg)

Mac 側の設定は、Safari の環境設定の詳細タブから、「メニューバーに"開発"メニューを表示」を有効にする。
![](http://farm9.staticflickr.com/8057/8191762313_a7638b7265_z.jpg)

そして、使用する iPhone を USB で Mac につなげて、Mac Safari の開発メニューを開くと、端末の名前が表示されているメニューがあるので、そこから UIWebView を選択すると UIWebView に読み込んでいる HTML を Web インスペクタ上に表示することができます（下のスクリーンショットに表示されている「サンドボックス」というのはアプリケーションの名前）。
![](http://farm9.staticflickr.com/8197/8192838584_241888f494_z.jpg)

ただし、UIWebView については Xcode でビルドして転送したアプリケーションのみが対象となります。App ストアや ipa ファイルなどで Ad hoc に配布されたアプリとかだとインスペクトする対象となりません。 詳細は[Safari Web Content Guide: Inspecting Content in a Web View](https://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/DebuggingSafarioniPhoneContent/DebuggingSafarioniPhoneContent.html#//apple_ref/doc/uid/TP40006515-SW9)を参照。

便利！
