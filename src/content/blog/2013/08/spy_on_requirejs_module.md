---
title: Jasmineでのテストで、requireJSのmoduleに対してspyOnしたい
date: 2013-08-02T14:30:00.000Z
categories:
- software testing
tags:
- jasmine
- requirejs
---
jasmineでのテストで、requireJSのmoduleに対してspyOnしたい場合、どうしたら良いのかなという話。moduleを呼び出す側の処理で、moduleに適切な値をちゃんと渡しているかを確認したいときが、ある。普通はないかもしれないけど。とにかく、そういうときにspyOnしてその値を確認したい。

<!-- more -->

たとえば下記のようなモジュールの場合。foo.jsというファイル名でモジュール名は「foo」となるとして。

```
define(function(){
  return function(arg1,arg2){
    // do sutekina something
  }
});

```

上記のモジュールをDependencyとして扱う下記のようなモジュールがあるとする。モジュール名は「bar」となるとして。

```
define([foo],function(Foo){
  return function(){
    var foo = new Foo('hoge','fuga');
  }
});

```

それで、barのモジュールのテストで、fooにきちんと値がわたっているかを確認したいとする。

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

spyOnはspyOn(object, methodName)という形で、第一引数でobjectを渡して、第二引数でobjectの中のメソッド名を指定するという風に使うので、stubModuleはオブジェクトとして用意する。 そして、defineでfooモジュールを定義して、stubModule.stubを返すようにする。

それでstubModuleのstubをspyOn(stubModule,'stub')でspyOnすると。

すでにmoduleがrequireされている場合は、require.undef('foo')で[undefining](http://requirejs.org/docs/api.html#undef)して、$('script\[src$="foo.js"\]').remove();とかして、requireされていないのと同様の状態に戻さないとだめかもしれない（そしてテスト後に、stubをrequire.undefしてrequireし直す）。

というメモ... 内容は[Unit testing JavaScript modules using RequireJS and Jasmine | iterativo](http://iterativo.wordpress.com/2012/03/06/unit-testing-javascript-
modules-using-requirejs-and-jasmine/)の記事を参考にしました。TDDで開発しているとこうしたTestability的にgoodでない状況に陥らないのかどうなのか。もっと良いやり方あるかなあ。
