---
title: SafariからUIWebViewのHTMLをinspectする
date: 2012-11-18T20:37:00.000Z
categories:
- web
tags:
- ios
- phonegap
---
[iPhone 5 and iOS 6 for HTML5 developers, a big step forward: web inspector, new APIs and more | Breaking the Mobile Web](http://www.mobilexweb.com/blog/iphone-5-ios-6-html5-developers)に、iPhone 5とiOS 6について詳しく載っていますが、その中で「Remote Debugging」というところの項目の話。

<!-- more -->

iOS 6からiPhone上に表示しているUIWebView（web view）をMacのSafariのWebインスペクタで表示することができるようになりました。通常のWebインスペクタ同様、Webインスペクタ上でiPhoneで出力している実際のHTML/CSSが確認することができるとともに、その場で変更を適用してみて表示を確認することができます。これは便利。PhoneGapで作成するアプリケーションはUIWebViewの中にHTMLを展開するので、これらもインスペクトすることができます。

使い方はiPhoneとMac Safariの両方でWebインスペクタの設定を有効にするだけです。

iPhone(iOS)の設定は、設定の画面から、Safariを選んで、メニューの一番下に「詳細」をタップすると「Webインスペクタ」の設定があるので「オン」にする。  
![](http://farm9.staticflickr.com/8209/8192836506_9402c2e4c6_z.jpg)

Mac側の設定は、Safariの環境設定の詳細タブから、「メニューバーに"開発"メニューを表示」を有効にする。  
![](http://farm9.staticflickr.com/8057/8191762313_a7638b7265_z.jpg)

そして、使用するiPhoneをUSBでMacにつなげて、Mac Safariの開発メニューを開くと、端末の名前が表示されているメニューがあるので、そこからUIWebViewを選択するとUIWebViewに読み込んでいるHTMLをWebインスペクタ上に表示することができます（下のスクリーンショットに表示されている「サンドボックス」というのはアプリケーションの名前）。  
![](http://farm9.staticflickr.com/8197/8192838584_241888f494_z.jpg)

ただし、UIWebViewについてはXcodeでビルドして転送したアプリケーションのみが対象となります。AppストアやipaファイルなどでAd hocに配布されたアプリとかだとインスペクトする対象となりません。 詳細は[Safari Web Content Guide: Inspecting Content in a Web View](https://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/DebuggingSafarioniPhoneContent/DebuggingSafarioniPhoneContent.html#//apple_ref/doc/uid/TP40006515-SW9)を参照。

便利！
