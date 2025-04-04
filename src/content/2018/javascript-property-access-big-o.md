---
title: JavaScriptオブジェクトのプロパティアクセスにおけるビッグ・オー
featured:
  image: emre-karatas-194353-unsplash
  author: Emre Karataş
  authorLink: https://unsplash.com/photos/Ib2e4-Qy9mQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-23 20:51:00
excerpt: "配列に格納しているオブジェクトをそのIDで検索するとしたら処理量は（線形探索だろうから）ビッグ・オー記法としては `O(n)` になるだろう。"
---

配列に格納しているオブジェクトをその ID で検索するとしたら処理量は（線形探索だろうから）ビッグ・オー記法としては `O(n)` になるだろう。

```javascript
const obj = array.find((item) => item.id === id);
```

配列の数が多くなければそこまで気にしなくて良いかもしれないけど

```javascript
entries.forEach((entry) => {
  const image = images.find((image) => image.id === entry.id);
  entry.image = image;
});
```

みたいな感じで、M 個の記事について N 個の画像の中から対象になる画像を選んでプロパティに割り当てるみたいなことをしだすと処理量は `O(M*N)` となり、パフォーマンスの懸念は大きくなる（image の id と entry の id は同じ値のものが入ると想定）。例えば、10 個の記事について 10 個の画像中から対象の画像を探そうとすると、100 回の処理が必要になる。これが 20 個の記事で 20 個の画像になれば 400 回になり、数が増えれば増えるだけ処理量が上がっていく。

この場合、ID をキーにしたマップを作成してそこから探す方がいい。

```javascript
const imagesMap = {};
images.forEach((image) => (imagesMap[image.id] = image));
entries.forEach((entry) => (entry.image = imageMap[entry.id]));
```

処理量的には `O(N+M)` となるので、良いように思う。

上記の処理量はオブジェクトのプロパティへのアクセス（および insert）が `O(1)` の処理量で終わることを前提にしているけれど、
オブジェクトのプロパティにアクセスするときにどのくらいの処理量でデータが取得できるかどうかについては特に仕様がない。

[A Survey of the JavaScript Programming Language](https://crockford.com/javascript/survey.html)によると、オブジェクトはたいていの場合ハッシュテーブルで実装されているようで、`O(1)` でデータの取得と追加ができると考えて良いように思う。とはいえ明確にそうとは言えない。

> Objects are usually implemented as hash-tables, but none of the hash-table nature (such as hash functions or rehashing methods) is visible.
> https://crockford.com/javascript/survey.html

ES2015 では新しく[Map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map)が用意されていて、こちらは[ECMA の仕様](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-map-objects)によると、線形よりも低い（sublinear）処理量になるように規定されている。

> Map object must be implemented using either hash tables or other mechanisms that, on average, provide access times that are sublinear on the number of elements in the collection. The data structures used in this Map objects specification is only intended to describe the required observable semantics of Map objects. It is not intended to be a viable implementation model.
> http://www.ecma-international.org/ecma-262/6.0/index.html#sec-map-objects

ハッシュテーブルで実装されているかどうかはブラウザの実装を確認しないとわからない。[連想配列](https://en.wikipedia.org/wiki/Associative_array)の説明を読むと、[ハッシュテーブル](https://en.wikipedia.org/wiki/Hash_table)か[探索木](https://en.wikipedia.org/wiki/Search_tree)が代表的な実装方法で、探索木では平衡二分探索木が使われるようだ。

> Compared to hash tables, these structures have both advantages and weaknesses. The worst-case performance of self-balancing binary search trees is significantly better than that of a hash table, with a time complexity in big O notation of O(log n). This is in contrast to hash tables, whose worst-case performance involves all elements sharing a single bucket, resulting in O(n) time complexity. In addition, and like all binary search trees, self-balancing binary search trees keep their elements in order. Thus, traversing its elements follows a least-to-greatest pattern, whereas traversing a hash table can result in elements being in seemingly random order. However, hash tables have a much better average-case time complexity than self-balancing binary search trees of O(1), and their worst-case performance is highly unlikely when a good hash function is used.
> https://en.wikipedia.org/wiki/Associative_array#Comparison

平衡二分探索木（Self-balancing binary search trees）での実装とハッシュテーブルを比較すると、最悪なケースの場合のパフォーマンスは平衡二分探索木の方が `O(log n)` で良くなる。一方ハッシュテーブルは最悪のケース（すべての要素が同じ場所に格納されてしまう）では `O(n)` になる（線形探索と同じになる）。とはいえ、平均的なケースではハッシュテーブルは `O(1)` の処理量で済むし、ハッシュ関数がうまく実装されていれば最悪のケースになる可能性は低いと。

Map オブジェクトを利用すると下記のような感じになる。

```javascript
const imageMap = new Map();
images.forEach((image) => imageMap.set(image.id, image));
entries.forEach((entry) => (entry.image = imageMap.get(entry.id)));
```

Chrome では Map オブジェクトの実装にハッシュテーブルを使っているそうだ。それ以外のブラウザでも Map オブジェクトも中の実装はハッシュテーブルであると想定しても大丈夫な気はする。

> ECMAScript 2015 introduced several new data structures such as Map, Set, WeakSet, and WeakMap, all of which use hash tables under the hood.
> https://v8project.blogspot.com/2018/01/hash-code.html

仮に Map オブジェクトが（たぶんハッシュテーブルだけど）平衡二分探索木で実装されていると想定すると、lookup と insertaion がそれぞれ `O(log n)` の処理量になるので、`O(Log M + N Log M)` といった処理量になる。それでもやはり `O(M * N)` より効率的と言える。

オブジェクトを使ったマップでも、Map オブジェクトを使ったマップでも中の実装はハッシュテーブルであると想定しても大丈夫そうな気はするし、体感的な速度には大きな差はないようには思う。とはいえ Map オブジェクトの方は sublinear であると明確に言えるし、使い方としてもより idiomatic であるし、[Optimizing hash tables: hiding the hash code](https://v8project.blogspot.com/2018/01/hash-code.html)のようなパフォーマンス改善の恩恵を受けることができるという点から（オブジェクトを使ったマップではプロパティの lookup に必要な処理は避けられないだろう）、今後は Map オブジェクト使って行く方がいいかなあと思ったところ次第である（既存のプロジェクトでは状況によるけど）。

以下はそのほか参考にしたページ

- [data structures - Is there anything that guarantees constant time for accessing a property of an object in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/34292087/is-there-anything-that-guarantees-constant-time-for-accessing-a-property-of-an-o)
- [Javascript ES6 computational/time complexity of collections - Stack Overflow](https://stackoverflow.com/questions/31091772/javascript-es6-computational-time-complexity-of-collections)
- [Javascript big-O property access performance - Stack Overflow](https://stackoverflow.com/questions/7374171/javascript-big-o-property-access-performance)
- [連想配列 - Wikipedia](https://ja.wikipedia.org/wiki/%E9%80%A3%E6%83%B3%E9%85%8D%E5%88%97)
- [連想配列は Map を使うべきは本当か？ - Qiita](https://qiita.com/raccy/items/816a322fb330193e788b)
- [V8 Today and in the Future (Chrome Dev Summit 2017)](https://youtu.be/7rx9fSUG8H0?t=23m22s)

というメモ。
