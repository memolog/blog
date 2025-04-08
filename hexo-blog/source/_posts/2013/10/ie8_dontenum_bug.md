---
title: IE8のDontEnum bug
date: 2013-10-07T13:40:00.000Z
categories:
- web
tags:
- javascript
---
[ECMAScript DontEnum attribute | MDN](https://developer.mozilla.org/en-US/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug)とか、[_.extend should work-around JScript's DontEnum bug ? Issue #60 ? jashkenas/underscore](https://github.com/jashkenas/underscore/issues/60)とか、[internet explorer - IE8 bug in for-in JavaScript statement? - Stack Overflow](http://stackoverflow.com/questions/3705383/ie8-bug-in-for-in-javascript-statement)あたり参照。well known JScript bug らしい。

<!-- more -->

[Moment.js](http://momentjs.com/)の2.2.xでは、IE8でmoment().valueOf()をしてもtime valueが返ってこないというissueがあります。developでは修正されているので、たぶんもうすぐ出るであろう2.3では修正されているはず。

なぜIE8でvalueOfがうまく動かなかったのかは、どうも上記の問題によるものみたい。Objectのプロパティ、toStringとかvalueOfとかが、列挙不可になっているため、for in のループでそれらのプロパティが入ってこない。なので、下記のようにObjectのプロパティを別途extendするようになった。

```javascript
function extend(a, b) {
  for (var i in b) {
    if (b.hasOwnProperty(i)) {
      a[i] = b[i];
    }
  }

  if (b.hasOwnProperty("toString")) {
    a.toString = b.toString;
  }

  if (b.hasOwnProperty("valueOf")) {
    a.valueOf = b.valueOf;
  }

  return a;
}
```

というメモ。
