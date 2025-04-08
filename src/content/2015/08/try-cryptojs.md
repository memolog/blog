---
title: CryptoJSを使ったクライアントとサーバー間の暗号化と復号化
date: 2015-08-17T03:30:00.000Z
categories:
  - web
tags:
  - javascript
  - node
  - security
featured:
  image: reuben-mcfeeters-684383-unsplash
  author: Reuben Mcfeeters
  authorLink: https://unsplash.com/photos/3clB7Pdjee0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
excerpt: "CryptoJSを使ったクライアントサイド（Javascript）とサーバーサイド（Node.js）での暗号化と復号化について。CryptoJSはbrix/crypto-jsのやつを使用します。"
---

CryptoJS を使ったクライアントサイド（Javascript）とサーバーサイド（Node.js）での暗号化と復号化について。CryptoJS は[brix/crypto-js](https://github.com/brix/crypto-js)のやつを使用します。

### クライアントサイドの実装

CryptoJS のライブラリ（crypto-js.js）を head で読み込ませているとします。

```javascript
var str = "Lorem ipsum dolor sit amet";
var key = "12345678901234567890123456789012";
var encrypted = CryptoJS.AES.encrypt(str, key);
console.log(encrypted.toString());
```

encrypt メソッドで生成した変数を toString()すると、ciphertext や iv、salt など復号化に必要なものをまとめて一つの Base64 フォーマットの文字列に変換してくれます。これを Node.js 側に送ります。

### サーバーサイドの実装

```javascript
var CryptoJS = require("crypto-js");
var str = "U2FsdGVkX19c2KuWxFQsC9fhaum9z8w6MtoMikCmy0Om+Mi+cAEEFu7JZl8JLOf3";
var key = "12345678901234567890123456789012";
var decrypted = CryptoJS.AES.decrypt(str, key);
console.log(decrypted.toString(CryptoJS.enc.Utf8));
```

という感じで、CryptoJS を使うと簡単に暗号化と復号化ができます。ただ、クライアントサイドのソースは公開されてしまうので、クライントサイドとサーバーサイドでどう key を共有するかというのが考えどころ（ajax で取得するようにするとか？）。また、key は salting した上で使うらしいので（[\[JavaScript\]CryptoJS で AES 暗号の salt とパスフレーズから key を求める - Qiita](http://qiita.com/yaegaki/items/9701317a76a35bea1684)参照）、他の暗号化/復号化ライブラリと連携して使おうとすると、実際使われている key がわからなくて難儀するかもなあと思いました。
