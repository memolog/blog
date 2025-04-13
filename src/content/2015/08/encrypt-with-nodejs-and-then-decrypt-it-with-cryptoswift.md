---
title: Node.js で AES-256-CBC で暗号化したデータを CryptoSwift で復号化する
date: 2015-08-27T14:15:00.000Z
categories:
  - web
tags:
  - ios
  - javascript
  - node
  - security
  - swift
  - xcode
excerpt: "CryptoSwiftを使ってAES-256-CBCで暗号化してNodeで復号化するの記事で、CryptoSwift (iOS) で暗号化したデータをサーバー側（Node.js）で復号化する話をしましたが、今回はその逆向きで、Node.jsでABS-256-CBCで暗号化したデータをCryptoSwiftで復号化するという話。"
---

[CryptoSwift を使って AES-256-CBC で暗号化して Node で復号化する](/2015/08/encrypt-with-cryptswift-and-then-decrypt-it-with-nodejs/)の記事で、CryptoSwift (iOS) で暗号化したデータをサーバー側（Node.js）で復号化する話をしましたが、今回はその逆向きで、Node.js で ABS-256-CBC で暗号化したデータを CryptoSwift で復号化するという話。

Node.js で暗号化
