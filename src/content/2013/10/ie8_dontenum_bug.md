---
title: IE8のDontEnum bug
date: 2013-10-07T13:40:00.000Z
categories:
  - web
tags:
  - javascript
excerpt: "ECMAScript DontEnum attribute | MDNとか、_.extend should work-around JScript's DontEnum bug ? Issue #60 ? jashkenas/underscoreとか、internet explorer - IE8 bug in for-in JavaScript statement? - Stack Overflowあたり参照。well known JScript bug らしい。"
---

[ECMAScript DontEnum attribute | MDN](https://developer.mozilla.org/en-US/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug)とか、[\_.extend should work-around JScript's DontEnum bug ? Issue #60 ? jashkenas/underscore](https://github.com/jashkenas/underscore/issues/60)とか、[internet explorer - IE8 bug in for-in JavaScript statement? - Stack Overflow](http://stackoverflow.com/questions/3705383/ie8-bug-in-for-in-javascript-statement)あたり参照。well known JScript bug らしい。

[Moment.js](http://momentjs.com/)の 2.2.x では、IE8 で moment().valueOf()をしても time value が返ってこないという issue があります。develop では修正されているので、たぶんもうすぐ出るであろう 2.3 では修正されているはず。

なぜ IE8 で valueOf がうまく動かなかったのかは、どうも上記の問題によるものみたい。Object のプロパティ、toString とか valueOf とかが、列挙不可になっているため、for in のループでそれらのプロパティが入ってこない。なので、下記のように Object のプロパティを別途 extend するようになった。

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
