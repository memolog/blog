---
title: grunt で Content Security Policy をテストする
date: 2013-09-09T21:00:00.000Z
categories:
- web
tags:
- csp
- grunt
---
Content Security Policy (CSP)をgrunt-contrib-connectで設定するのにはどうしたら良いかという話。

やり方としては、[grunt-contrib-connect タスクで CORS を有効にする - メモログ](/blog//2013/07/grunt-contrib-connect_with_cors/)と同様、middlewareのオプションに追加する。

<!-- more -->

```javascript
middleware: function (connect, options) {
  return [
    function (req, res, next) {
      res.setHeader('Content-Security-Policy-Report-Only', 
        "default-src *; script-src 'self'; style-src 'self' 'unsafe-inline'; report-uri 'localhost'");
      next();
    },
    // Serve static files.
    connect.static(options.base),
    // Make empty directories browsable.
    connect.directory(options.base)
  ];
}
```

こんな感じ。上記では、[ポリシーのテスト](https://developer.mozilla.org/ja/docs/Security/CSP/Using_Content_Security_Policy#Testing_your_policy)を目的にしているので、「Content-Security-Policy-Report-Only」を使用しています。また、report-onlyモードではreport-uriの設定が必須なので、それを追加しています。report-uriには[Using CSP violation reports - Security | MDN](https://developer.mozilla.org/ja/docs/Security/CSP/Using_CSP_violation_reports)によると、CSPにひっかかった場合にその内容をreport-uriにPOSTで送ってくれます。

これで、たとえばjasmineのテストをするときにCSPを有効にしてテストすることで違反した場合にレポート送らせることができるなと思ったのですが、まだそこまでは試していません。

というメモ。
