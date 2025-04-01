---
title: YSLOW 勉強 &#x3a; 6&#x3a; Move Scripts to the Bottom
date: 2007-08-09T15:35:00.000Z
categories:
- web
tags:
- yslow
---
*   [6: Move Scripts to the Bottom](http://developer.yahoo.com/performance/rules.html#js_bottom)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の六つ目。スクリプトはできるだけ（HTMLの）下に移動させよう。これも5と同じくレンダリングに関わる話で、CSSは読み込みきらないとレンダリングが始まらなかったのですが、スクリプト（javascript）の場合は読み込み始めると、そこから下に記述されている内容のレンダリングがストップしてしまうので、できるだけ下に置く方がいい。

<!-- more -->

たとえばアクセス解析スクリプトはHTMLの下の方に移動しても大丈夫そうですね。ただ、そうすると今度はページを完全に読み終えるまでアクセスを計上してくれなくなりそうですけど。
