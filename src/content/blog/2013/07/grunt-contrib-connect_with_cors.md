---
title: grunt-contrib-connect タスクで CORS を有効にする
date: 2013-07-31T11:00:00.000Z
categories:
- web
tags:
- grunt
- jasmine
---
[grunt-contrib-jasmine](https://github.com/gruntjs/grunt-contrib-jasmine)のThird party templatesにある[Code coverage output with Istanbul](https://github.com/maenu/grunt-template-jasmine-istanbul)を使ってjasmineテストのcoverageの計測をしようとしているのですが、XMLHttpRequestを実行するところでCross Originの制約にひっかかってエラーになってしまう。localhostで実行されるのが理由かなとは思われるのですが、普通にjasmineテストを実行した場合はひっかからない不思議...（エラーに「file://」が出ているのも不明） jasmineのcoverage用のタスクのオプションでhostをlocalhostに指定していなかったためだった。そのため、localfile system (file://) で起動していた... 設定を追加したらCORSの設定は必要なかった。

<!-- more -->

XMLHttpRequest cannot load http://localhost:9002/foobar.js.
Origin file:// is not allowed by Access-Control-Allow-Origin.

理由はさておき、Access-Control-Allow-Origin（[HTTP access control (CORS)](https://developer.mozilla.org/ja/docs/HTTP_access_control)参考）を設定すれば、エラーを抑制できるはず（[javascript - Origin is not allowed by Access-Control-Allow-Origin - Stack Overflow](http://stackoverflow.com/questions/10143093/origin-is-not-allowed-by-access-control-allow-origin)も参考）。[grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)でサーバーを立ち上げてPhantomJSがそこからJasmine specsを実行するようにしているので、grunt-contrib-connectにCORSの設定をする。

grunt-contrib-connectで立ち上げたサーバーのheaderにAccess-Control-Allow-Originを追加するには... middlewareのオプションを使うと良いらしい。middlewareのオプションは、returnにfunctionの配列を渡すことで、渡したfunctionを順繰り実行してくれるみたい。Access-Control-Allow-Originの追加方法は、[Allowing CORS (Cross-Origin Resource Sharing) requests from grunt server](https://gist.github.com/Vp3n/5340891)を参考にしました。このGistのだけだと、[grunt-contrib-connectのタスクでデフォルトで設定されているmiddleware](https://github.com/gruntjs/grunt-contrib-connect/blob/master/tasks/connect.js)が実行されなくなってしまうので、デフォルトで設定されているfunctionも一緒に追加する。すると、こんな感じの設定になる。

test: {
  options: {
    hostname: 'localhost',
    port: 9002,
    keepalive: true,
    middleware: function (connect, options) {
      return \[
        function (req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', '*');
          next();
        },
        // Serve static files.
        connect.static(options.base),
        // Make empty directories browsable.
        connect.directory(options.base)
      \];
    }
  }
},

これでCross Originのエラーが発生することなく、coverageの計測が完了するようになりました。

というメモ
