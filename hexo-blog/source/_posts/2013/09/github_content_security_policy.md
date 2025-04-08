---
title: Github の Content Security Policy
date: 2013-09-07T11:00:00.000Z
categories:
- web
tags:
- csp
- css
- javascript
---
github.com のサイトでdelicious bookmarklet を動かしても、モーダルが開いてくれない。これはなんでかなと思っていたら、どうやら Content Security Policy と関連するらしいです。詳しくは [Content Security Policy](https://github.com/blog/1477-content-security-policy)に書かれています。Shortcomingsの部分。[W3Cの仕様](http://www.w3.org/TR/CSP/#script-src)的には、Content Security Policy (CSP) がbookmarkletの挙動を阻害するものではないはずだけど、実際にはbookmarkletの動作に影響を及ぼしていると。

<!-- more -->

それで、ついでにGithubでどんなCSPの設定がされているのかを見てみました。それがこんな感じ（x-content-security-policyのheader）。

*   default-src *;
*   script-src 'self' https://github.global.ssl.fastly.net https://jobs.github.com https://ssl.google-analytics.com https://collector.githubapp.com https://analytics.githubapp.com;
*   style-src 'self' 'unsafe-inline' https://github.global.ssl.fastly.net;
*   object-src 'self' https://github.global.ssl.fastly.net

policyの内容については[CSP policy directives - Security | MDN](https://developer.mozilla.org/ja/docs/Security/CSP/CSP_policy_directives)に詳しく書かれています。W3Cにも[Examples](http://www.w3.org/TR/CSP/#examples)が書かれています。

default-srcの設定は、srcの設定がされていない場合に使われます。アスタリスク(*)は[Matching](http://www.w3.org/TR/CSP/#matching)に仕様が書かれてありますが、*のみで設定されている場合はすべてのURLが許可の対象となります。

script-srcは、Javascriptを対象にしていて、'self'のexpressionは、Same Origin なURLが許可の対象になります（the set of URIs which are in the same origin as the protected resource）。'unsafe-inline'や'unsafe-eval'が指定されていないので、インラインスクリプトの挿入やevalの実行ができなくなる。

style-srcは、スタイルシートを対象にしていて、'unsafe-inline'を指定しているのでstyle要素やstyle属性でのCSSの指定が可能になっている。style属性でのスタイルの操作はjQueryでも普通に行われるので、意識的に使わないようにしていないと、unsafe-inlineは必要になってくるかなと思われます。

object-srcはobject、embeded、applet要素が対象になる。

というメモ。
