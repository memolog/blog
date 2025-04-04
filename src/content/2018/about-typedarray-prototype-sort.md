---
title: TypedArray.prototype.sort について
featured:
  image: marcus-depaula-43304-unsplash
  author: Marcus dePaula
  authorLink: https://unsplash.com/photos/tk7OAxsXNL0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-01 05:23:27
excerpt: "前回の「Array.prototype.sort について」に引き続き、今度はTypedArrayのsortについて。実装は別だけど対応は基本的に同じなので簡単に。"
---

前回の「[Array.prototype.sort について](https://memolog.org/2018/about-array-prototype-sort.html)」に引き続き、今度は[TypedArray](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)の[sort](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort)について。実装は別だけど対応は基本的に同じなので簡単に。

Chrome の実装は[typed-array.tq](https://github.com/v8/v8/blob/master/src/builtins/typed-array.tq#L257)あたりで、Quicksort が使われている。compareFunction がない場合は、[TypedArraySortFast](https://github.com/v8/v8/blob/master/src/runtime/runtime-typedarray.cc#L107)が実行され、この実行の内部では C++の std:sort が使われている。

Firefox の実装は[TypedArray.js](https://github.com/mozilla/gecko-dev/blob/master/js/src/builtin/TypedArray.js#L1159)あたりで、Quicksort が使われている。merge sort ではなく quicksort なのはおそらく TypedArray は数値のみなので stable であることを気にかける必要がないからだと思う（たぶん）。compareFunction がない場合は、8 ビット長の場合は CountingSort、16・32 ビット長の場合は RadixSort が使われている。

Safari の実装は[TypedArrayPrototype.js](https://github.com/WebKit/webkit/blob/master/Source/JavaScriptCore/builtins/TypedArrayPrototype.js#L190)あたりで、merge sort が使われている。compareFunction がない場合は`@typedArraySort`が使われるのだけど、実装がどこにあるのか見つけられなかった。

Microsoft Edge の実装は[TypedArray.cpp](https://github.com/Microsoft/ChakraCore/blob/17dbf40e9470022795d912bc207a10cfc64ff7e2/lib/Runtime/Library/TypedArray.cpp#L2444)あたりで、Quicksort が使われている。

TypedArray の sort でも同様に O(n log n)を期待できる。

以上。
