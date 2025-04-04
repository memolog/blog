---
title: Github の Content Security Policy
date: 2013-09-07T11:00:00.000Z
categories:
  - web
tags:
  - csp
  - css
  - javascript
excerpt: "github.com のサイトでdelicious bookmarklet を動かしても、モーダルが開いてくれない。これはなんでかなと思っていたら、どうやら Content Security Policy と関連するらしいです。詳しくは Content Security Policyに書かれています。Shortcomingsの部分。W3Cの仕様的には、Content Security Policy (CSP) がbookmarkletの挙動を阻害するものではないはずだけど、実際にはbookmarkletの動作に影響を及ぼしていると。"
---

github.com のサイトで delicious bookmarklet を動かしても、モーダルが開いてくれない。これはなんでかなと思っていたら、どうやら Content Security Policy と関連するらしいです。詳しくは [Content Security Policy](https://github.com/blog/1477-content-security-policy)に書かれています。Shortcomings の部分。[W3C の仕様](http://www.w3.org/TR/CSP/#script-src)的には、Content Security Policy (CSP) が bookmarklet の挙動を阻害するものではないはずだけど、実際には bookmarklet の動作に影響を及ぼしていると。

それで、ついでに Github でどんな CSP の設定がされているのかを見てみました。それがこんな感じ（x-content-security-policy の header）。

- default-src \*;
- script-src 'self' https://github.global.ssl.fastly.net https://jobs.github.com https://ssl.google-analytics.com https://collector.githubapp.com https://analytics.githubapp.com;
- style-src 'self' 'unsafe-inline' https://github.global.ssl.fastly.net;
- object-src 'self' https://github.global.ssl.fastly.net

policy の内容については[CSP policy directives - Security | MDN](https://developer.mozilla.org/ja/docs/Security/CSP/CSP_policy_directives)に詳しく書かれています。W3C にも[Examples](http://www.w3.org/TR/CSP/#examples)が書かれています。

default-src の設定は、src の設定がされていない場合に使われます。アスタリスク(*)は[Matching](http://www.w3.org/TR/CSP/#matching)に仕様が書かれてありますが、*のみで設定されている場合はすべての URL が許可の対象となります。

script-src は、Javascript を対象にしていて、'self'の expression は、Same Origin な URL が許可の対象になります（the set of URIs which are in the same origin as the protected resource）。'unsafe-inline'や'unsafe-eval'が指定されていないので、インラインスクリプトの挿入や eval の実行ができなくなる。

style-src は、スタイルシートを対象にしていて、'unsafe-inline'を指定しているので style 要素や style 属性での CSS の指定が可能になっている。style 属性でのスタイルの操作は jQuery でも普通に行われるので、意識的に使わないようにしていないと、unsafe-inline は必要になってくるかなと思われます。

object-src は object、embeded、applet 要素が対象になる。

というメモ。
