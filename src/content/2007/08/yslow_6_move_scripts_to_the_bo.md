---
title: "YSLOW (6): Move Scripts to the Bottom"
date: 2007-08-09T15:35:00.000Z
featured:
  image: yslow_6_move_scripts_to_the_bo
  author: chatGPT
categories:
  - web
tags:
  - yslow
excerpt: "スクリプトはできるだけ（HTMLの）下に移動させよう。これも5と同じくレンダリングに関わる話で、CSSは読み込みきらないとレンダリングが始まらなかったのですが、スクリプト（javascript）の場合は読み込み始めると、そこから下に記述されている内容のレンダリングがストップしてしまうので、できるだけ下に置く方がいい。"
---

- [6: Move Scripts to the Bottom](http://developer.yahoo.com/performance/rules.html#js_bottom)

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の六つ目。スクリプトはできるだけ（HTML の）下に移動させよう。これも 5 と同じくレンダリングに関わる話で、CSS は読み込みきらないとレンダリングが始まらなかったのですが、スクリプト（javascript）の場合は読み込み始めると、そこから下に記述されている内容のレンダリングがストップしてしまうので、できるだけ下に置く方がいい。

たとえばアクセス解析スクリプトは HTML の下の方に移動しても大丈夫そうですね。ただ、そうすると今度はページを完全に読み終えるまでアクセスを計上してくれなくなりそうですけど。
