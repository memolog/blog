---
title: basket.js と Content Security Policy
date: 2013-09-08T21:00:00.000Z
categories:
  - web
tags:
  - csp
excerpt: "Github の Content Security Policy - メモログの続きのような感じで。  basket.js - a simple script loader that caches scripts with localStoragというライブラリでは、requireで指定したURLのライブラリをlocalStorageに保存して再利用することができます。対象はスクリプトファイルだけですが、AppCacheと比べて1ファイル単位でキャッシュのexpireを設定できるので柔軟に扱える。"
---

[Github の Content Security Policy - メモログ](/blog//2013/09/github_content_security_policy/)の続きのような感じで。

[basket.js - a simple script loader that caches scripts with localStorag](http://addyosmani.github.io/basket.js/)というライブラリでは、require で指定した URL のライブラリを localStorage に保存して再利用することができます。対象はスクリプトファイルだけですが、AppCache と比べて 1 ファイル単位でキャッシュの expire を設定できるので柔軟に扱える。

ただ、basket.js はキャッシュをロードする場合、localStorage にキャッシュした内容を script 要素の text として使用するので、インラインの script として挿入することになる。そのため、Content Security Policy（CSP）を導入しようとすると、script-src に unsafe-inline を設定する必要が出てしまう。

script-src での unsafe-inline の許可は、[Content Security Policy](https://github.com/blog/1477-content-security-policy)で言うところの、last layer of defense としての CSP の役割を大きく損なってしまう。innerHTML に外部から取得したデータを挿入するとして、そのデータに悪意のある script が含まれていた場合、悪意のあるコードが実行されてしまう。それができないように escape 処理などしてできないようにするわけですが、そういうセキュリティ対策がすり抜けてしまった場合でも CSP が設定されていれば実行されないで終わる。でも、unsafe-inline を有効にしてしまうと、実行を許可することになるので、last layer of defense としての機能が半減してしまう。script-src の unsafe-inline は、インライン script が明確に安全という状況でなければ、設定すべきでない。

なので、CSP を有効に機能させた上で、basket.js を使うというのが、難しい。両立する方法があるかもしれませんけど、今のところ調査不足もあって分からない。

というメモ
