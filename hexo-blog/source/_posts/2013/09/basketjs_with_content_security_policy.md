---
title: basket.js と Content Security Policy
date: 2013-09-08T21:00:00.000Z
categories:
- web
tags:
- csp
---
[Github の Content Security Policy - メモログ](/blog//2013/09/github_content_security_policy/)の続きのような感じで。

[basket.js - a simple script loader that caches scripts with localStorag](http://addyosmani.github.io/basket.js/)というライブラリでは、requireで指定したURLのライブラリをlocalStorageに保存して再利用することができます。対象はスクリプトファイルだけですが、AppCacheと比べて1ファイル単位でキャッシュのexpireを設定できるので柔軟に扱える。

<!-- more -->

ただ、basket.jsはキャッシュをロードする場合、localStorageにキャッシュした内容をscript要素のtextとして使用するので、インラインのscriptとして挿入することになる。そのため、Content Security Policy（CSP）を導入しようとすると、script-srcにunsafe-inlineを設定する必要が出てしまう。

script-srcでのunsafe-inlineの許可は、[Content Security Policy](https://github.com/blog/1477-content-security-policy)で言うところの、last layer of defense としてのCSPの役割を大きく損なってしまう。innerHTMLに外部から取得したデータを挿入するとして、そのデータに悪意のあるscriptが含まれていた場合、悪意のあるコードが実行されてしまう。それができないようにescape処理などしてできないようにするわけですが、そういうセキュリティ対策がすり抜けてしまった場合でもCSPが設定されていれば実行されないで終わる。でも、unsafe-inlineを有効にしてしまうと、実行を許可することになるので、last layer of defense としての機能が半減してしまう。script-srcのunsafe-inlineは、インラインscriptが明確に安全という状況でなければ、設定すべきでない。

なので、CSPを有効に機能させた上で、basket.jsを使うというのが、難しい。両立する方法があるかもしれませんけど、今のところ調査不足もあって分からない。

というメモ
