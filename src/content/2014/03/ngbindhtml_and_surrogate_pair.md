---
title: ngBindHtmlとサロゲートペア
date: 2014-03-02T20:50:00.000Z
categories:
  - web
tags:
  - angularjs
  - javascript
excerpt: "AngularJSでngBindHtmlを使用すると、ngSanitize(angular-sanitize.js)のencodeEntitiesに行き着く（はず）。そこでは下記のような処理が行われています。"
---

AngularJS で[ngBindHtml](http://docs.angularjs.org/api/ng/directive/ngBindHtml)を使用すると、ngSanitize(angular-sanitize.js)の encodeEntities に行き着く（はず）。そこでは下記のような処理が行われています。

```javascript
function encodeEntities(value) {
  return value.
    replace(/&/g, '&').
    replace(NON_ALPHANUMERIC_REGEXP, function(value){
      return '&#' + value.charCodeAt(0) + ';';
    }).
    replace(//g, '>');
}

```

NON_ALPHANUMERIC_REGEXP は、/(\[^\\#-~| |!\])/g;でマッチした値。文字列はこの処理を通る感じになる。charCodeAt の処理は[charCodeAt - MDN](http://mdn.beonex.com/en/Core_JavaScript_1.5_Reference/Global_Objects/String/charCodeAt.html)を参照。

> Note that charCodeAt will always return a value that is less than 65,536. This is because the higher code points are represented by a pair of (lower valued) "surrogate" pseudo-characters which are used to comprise the real character.

charCodeAt はつねに 65,536 以下の値が返ってくるようになっていて、それ以上のコードポイントの場合は、サロゲートペアの状態になってくる。サロゲートペアについては、[サロゲートペア入門](http://codezine.jp/article/detail/1592)の「サロゲートペアとは？」を参照。

なので、ngBindHtml で絵文字のように 65,356 以上のコードポイントを持ってそうな文字列を通すと、サロゲートペアをひとつずつ実体参照の状態にしてしまい、うまく表示できない。

ngBindHtml でそのような文字列を表示するためには、なんとかしないといけない。それでとりあえず[eller86/surrogate-pair.js](https://github.com/eller86/surrogate-pair.js)を使って surrogate pair を処理するように対応。

```javascript
function handleSurrogatePair(content) {
  if (sp.findSurrogatePair(content)) {
    content = $sce.getTrustedHtml(content);

    var match = content.match(/\&\#5[5-6][0-9]{3};\&\#5[6-7][0-9]{3};/g),
      i = 0,
      len = match.length,
      str;

    for (; i < len; i++) {
      str = match[i].match(/[0-9]+/g);
      if (sp.checkHighSurrogate(str[0])) {
        content = content.replace(
          match[i],
          "&#" + ((str[0] - 0xd800) * 0x400 + (str[1] - 0xdc00) + 0x10000) + ";"
        );
      }
    }
    return content;
  } else {
    return $sce.trustAsHtml($sce.getTrustedHtml(content));
  }
}
```

$sceは[Strict Contextual Escaping services to AngularJS](http://docs.angularjs.org/api/ng/service/$sce#Example)を参照。対処療法に過ぎないので、あんまりいい感じではないけど、一応表示できるようになる。

そもそも、ngSanitize で surrogate pair を適切に処理するように pull request を作るべきなんだろうなあと思いつつ、そこまでいたってない。そして基本的には、ngBindHtml を使わずに ngBind だけでうまく設計する方がいい。ngSanitize の処理量半端ない。

というメモ。走り書き。

[ngSanitize cant escape all unicode characters ? Issue #5088 ? angular/angular.js](https://github.com/angular/angular.js/issues/5088)に関連 issue があった。

[fix(ngSanitize): encode surrogate pair properly by memolog ? Pull Request #6911 ? angular/angular.js](https://github.com/angular/angular.js/pull/6911)で Pull Request を送って、1.3.x ではサロゲートペアに対する処理が追加されました。ので、絵文字表示できない問題は起きない。
