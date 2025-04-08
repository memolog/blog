---
title: watir-webdriver：証明書エラーを回避する
date: 2010-12-27T14:00:00.000Z
categories:
  - software testing
tags:
  - selenium
  - watir
  - webdriver
excerpt: "SSL証明書が（本番の環境の証明書を流用していてドメインが合わないとか有効期限切れとかで）エラーとなるような環境でテストする場合、watir-webdriverをそのまま実行しようとしても証明書エラーとなりその先に進むことができません。"
---

SSL 証明書が（本番の環境の証明書を流用していてドメインが合わないとか有効期限切れとかで）エラーとなるような環境でテストする場合、watir-webdriver をそのまま実行しようとしても証明書エラーとなりその先に進むことができません。

その場合は watir を起動する前に証明書エラーを回避するように profile を用意しておく必要があります。詳細は[Issue 116 - selenium - Should be able to access sites secured with an unverified SSL certificate - Project Hosting on Google Code](http://code.google.com/p/selenium/issues/detail?id=116)を参照。具体的には下記のような感じ。

```ruby
profile = Selenium::WebDriver::Firefox::Profile.new
profile.assume_untrusted_certificate_issuer = false
browser = Watir::Browser.new :firefox,profile
```

assume_untrusted_certificate_issuer のメソッドに false を渡すことで、selenium が生成する「webdriver_assume_untrusted_issuer」という webdriver 用の profile の設定を false に変更することができます（デフォルトは true に設定されている）。「webdriver_assume_untrusted_issuer」の profile は証明書の処理をする際に、エラーの判定を行わずに進めることができます。詳しくは[badCertListener.js - selenium - Project Hosting on Google Code](http://code.google.com/p/selenium/source/browse/trunk/firefox/src/extension/components/badCertListener.js)の 55 行目あたりからが該当箇所になります。

追記（2011/1/24）自己証明書（self-signed SSL certificate)を使用しているような場合は、この設定を入れると逆に先に進めなくなる場合があるみたい。
