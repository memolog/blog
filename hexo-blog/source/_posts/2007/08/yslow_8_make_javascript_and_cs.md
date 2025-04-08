---
title: YSLOW 勉強 &#x3a; 8&#x3a; Make JavaScript and CSS External
date: 2007-08-11T16:08:00.000Z
categories:
- web
tags:
- yslow
---
*   [8: Make JavaScript and CSS External](http://developer.yahoo.com/performance/rules.html#external)

<!-- more -->

[rules for high performance web sites](http://developer.yahoo.com/performance/rules.html)の八つ目。JavascriptとCSSを外部ファイルにしよう。インラインで記述していると（外部ファイルを設置するより）HTTPのリクエストを減らせるけれど、毎回読み込むのでhtmlファイルのサイズは増えてしまう。外部ファイルにしておくと、ブラウザがキャッシュするのでhtmlファイルサイズも減らせるし、次回からのHTTPレスポンスも減る。ただ、Yahoo!のホームのようにセッションごとのページビューの少ない場合は、インラインで記述してしまった方がレスポンスが良好の場合もある。

ポータルサイトのトップみたいに、大量にアクセスがあって、トップページだけ見て別のサイトに移動してしまうユーザーが多い場合、すべてのユーザーにキャッシュを持たせるよりは、インラインにしてHTTPリクエストを減らた方が良い場合もある。というのが、パフォーマンスチューニングの醍醐味なのかなと、個人的な感慨にひたったしだいです。
