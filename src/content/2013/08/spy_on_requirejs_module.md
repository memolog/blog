---
title: Jasmineでのテストで、requireJSのmoduleに対してspyOnしたい
date: 2013-08-02T14:30:00.000Z
categories:
  - software testing
tags:
  - jasmine
  - requirejs
excerpt: "jasmineでのテストで、requireJSのmoduleに対してspyOnしたい場合、どうしたら良いのかなという話。moduleを呼び出す側の処理で、moduleに適切な値をちゃんと渡しているかを確認したいときが、ある。普通はないかもしれないけど。とにかく、そういうときにspyOnしてその値を確認したい。"
---

jasmine でのテストで、requireJS の module に対して spyOn したい場合、どうしたら良いのかなという話。module を呼び出す側の処理で、module に適切な値をちゃんと渡しているかを確認したいときが、ある。普通はないかもしれないけど。とにかく、そういうときに spyOn してその値を確認したい。

たとえば下記のようなモジュールの場合。foo.js というファイル名でモジュール名は「foo」となるとして。

```
define(function(){
  return function(arg1,arg2){
    // do sutekina something
  }
});

```

上記のモジュールを Dependency として扱う下記のようなモジュールがあるとする。モジュール名は「bar」となるとして。

```
define([foo],function(Foo){
  return function(){
    var foo = new Foo('hoge','fuga');
  }
});

```

それで、bar のモジュールのテストで、foo にきちんと値がわたっているかを確認したいとする。

```
it('a small world',function(){
  var flag;
  var stubModule = {
    stub: function (arg1, arg2) {
      // write some code to work tests well
      flag = true;
    }
  };

  define('foo', [], function(){
    return stubModule.stub;
  });

  spyOn(stubModule, 'stub').andCallThrough();

  require(['bar'], function (Bar) {
    new Bar();
  });

  waitsFor(function () {
    return flag;
  }, 'timeout error on require foo or bar', 3000);

  runs(function () {
    var args = stubModule.stub.mostRecentCall.args;
    expect(args[0]).toEqual('hoge');
    expect(args[1]).toEqual('fuga');
  });
});

```

spyOn は spyOn(object, methodName)という形で、第一引数で object を渡して、第二引数で object の中のメソッド名を指定するという風に使うので、stubModule はオブジェクトとして用意する。 そして、define で foo モジュールを定義して、stubModule.stub を返すようにする。

それで stubModule の stub を spyOn(stubModule,'stub')で spyOn すると。

すでに module が require されている場合は、require.undef('foo')で[undefining](http://requirejs.org/docs/api.html#undef)して、$('script\[src$="foo.js"\]').remove();とかして、require されていないのと同様の状態に戻さないとだめかもしれない（そしてテスト後に、stub を require.undef して require し直す）。

というメモ... 内容は[Unit testing JavaScript modules using RequireJS and Jasmine | iterativo](http://iterativo.wordpress.com/2012/03/06/unit-testing-javascript-
modules-using-requirejs-and-jasmine/)の記事を参考にしました。TDD で開発しているとこうした Testability 的に good でない状況に陥らないのかどうなのか。もっと良いやり方あるかなあ。
