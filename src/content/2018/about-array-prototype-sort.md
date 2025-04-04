---
title: Array.prototype.sort について
featured:
  image: max-panama-387781-unsplash
  author: Max Panamá
  authorLink: https://unsplash.com/photos/Gt1A0jNzzbM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-30 05:49:48
excerpt: "JavaScriptの配列にはsortメソッドがあり配列のソートを実行することができるけど、この配列のソートの中の実装はどうなっているのかという話。v8における配列ソートについての記事が大変参考になりました。"
---

JavaScript の配列には[sort](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)メソッドがあり配列のソートを実行することができるけど、この配列のソートの中の実装はどうなっているのかという話。[v8 における配列ソートについて](http://kakts-tec.hatenablog.com/entry/2016/12/18/153845)の記事が大変参考になりました。

Chrome(V8)の実装は[array.js](https://github.com/v8/v8/blob/master/src/js/array.js#L645)にあり、配列の要素数が 10 以下の場合は[Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort)を使い、それ以上の場合は[Quicksort](https://en.wikipedia.org/wiki/Quicksort)を利用する。Insersion sort の計算量は O(n^2)であるけど、少ない要素数の場合は Quicksort などより高速になるらしい。[直近の commmit](https://github.com/v8/v8/commit/f7bad08397d922d7fe0bc10624f517c6f5412595)を見る限りだと、Chrome 69 か 70 あたりで[Timsort](https://en.wikipedia.org/wiki/Timsort)に置き換えるつもりらしい。Timsort は average が O(n log n)で、最悪でも O(n log n)の計算量で済む。Quicksort を TimSort に置き換えるつもりに至った経緯などは調べてない（ので間違ってるかも）。Quicksort は stable ではないソートであるけど、Timesort は[stable sort](https://ja.wikipedia.org/wiki/%E5%AE%89%E5%AE%9A%E3%82%BD%E3%83%BC%E3%83%88)になるので、その辺りの挙動は変わってくるかもしれない。

Firefox(Gecko)の実装は[Array.js](https://github.com/mozilla/gecko-dev/blob/64077545fac88592352819da9d5097d10d521667/js/src/builtin/Array.js#L186)あたりと思われる。最初に native code での実装（[js/src/builtin/Array.cpp](https://github.com/mozilla/gecko-dev/blob/a80651653faa78fa4dfbd238d099c2aad1cec304/js/src/builtin/Array.cpp)）を試すようになっている。ざっと見た感じでは[Merge sort](https://en.wikipedia.org/wiki/Merge_sort)が使われている。Merge sort は average で O(n log n)の計算量になる。[TypedArray の実装](https://github.com/mozilla/gecko-dev/blob/8d9f459c772562e5d8e2e12f53a005ab38293a70/js/src/builtin/TypedArray.js#L1159)では Quicksort などが使われている。

Safari(Webkit)の実装は[ArrayPrototype.js](https://github.com/WebKit/webkit/blob/master/Source/JavaScriptCore/builtins/ArrayPrototype.js)あたりと思われる。[What is the sorting algorithm behind a Javascript Array.sort method?](https://www.quora.com/What-is-the-sorting-algorithm-behind-a-Javascript-Array-sort-method)あたりの話だと、以前は[Selection sort](https://en.wikipedia.org/wiki/Selection_sort)が使われていたそうだが、現在の実装を見る限りでは Merge sort が使われているようだ。

Microsoft Edege(ChakraCore)の実装は（EntrySort メソッドから入ってなんやかんやあって）[JavascriptArray.cpp](https://github.com/Microsoft/ChakraCore/blob/17dbf40e9470022795d912bc207a10cfc64ff7e2/lib/Runtime/Library/JavascriptArray.cpp#L6498)あたりになると思われる。配列の要素数が 512 個より大きい場合は Quicksort を使用する。512 個以下の場合は見た感じ[Binary Insertion Sort](https://www.geeksforgeeks.org/binary-insertion-sort/)であると思われる。

という感じで、ざっとそれぞれのブラウザの実装を見たのですけど、Quicksort、Merge sort、Timsort で実装されているのがわかった。実装の違いはあるにせよ、ビック・オー的には O(n log n)とみなしても問題ないのだろうと思う。

Chrome の sort が Timsort になると各ブラウザの sort の返りは stable になると思われるが、[ECMA2015 の仕様](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort)では、sort メソッドにおいて stable sort である必要はないとされている。なので、実際には stable な状態で返ってくるとしても、JavaScript の sort は stable sort ではないと認識しておいた方がいい。

> The elements of this array are sorted. The sort is not necessarily stable (that is, elements that compare equal do not necessarily remain in their original order). If comparefn is not undefined, it should be a function that accepts two arguments x and y and returns a negative value if x < y, zero if x = y, or a positive value if x > y.
> https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort
