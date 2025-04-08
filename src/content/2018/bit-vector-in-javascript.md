---
title: JavaScriptでビットベクタルを使う
featured:
  image: miles-storey-142842-unsplash
  author: Miles Storey
  authorLink: https://unsplash.com/photos/X45VKpWV7hw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-07-28 10:49:22
excerpt: "ビットベクトルは2進数の値（ビット）の配列を使って状態を保持する。ビット配列（bit array）とかbit set, bit stringとも言うらしい。詳しくはBit arrayを参照。"
---

ビットベクトルは 2 進数の値（ビット）の配列を使って状態を保持する。ビット配列（bit array）とか bit set, bit string とも言うらしい。詳しくは[Bit array](https://en.wikipedia.org/wiki/Bit_array)を参照。

JavaScript の数値（[Number](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number)）は 64 ビットの[倍精度浮動小数点型数値](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)で表現される。Swift みたいな[Int](https://developer.apple.com/documentation/swift/int)と[Double](https://developer.apple.com/documentation/swift/double)といった区別はなく、JavaScript の数値はすべて Double として表現される。

> 8.5 The Number type
> The Number type has exactly 18437736874454810627 (that is, 2^64−2^53+3) values, representing the double-precision 64-bit format IEEE 754 values as specified in the IEEE Standard for Binary Floating-Point Arithmetic, except that the 9007199254740990 (that is, 2^53−2) distinct “Not-a-Number” values of the IEEE Standard are represented in ECMAScript as a single special NaN value. (Note that the NaN value is produced by the program expression NaN, assuming that the globally defined variable NaN has not been altered by program execution.) In some implementations, external code might be able to detect a difference between various Non-a-N
> https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%201st%20edition,%20June%201997.pdf

[ビット演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) は数値をビットとして操作するための演算子。ビット演算子では数値を 32 ビットのビットの並びとして扱う。

> ビット演算子は、オペランドとして整数値が必要です。また、この整数値は、64 ビットの浮動小数点表現形式ではなく、32 ビット整数表現形式で表されているものとして処理を行います。これらの演算子は、必要であればオペランドを数値に変換し、オペランドの小数点部分を削除したり、33 ビット目以上のビットを捨てたりすることで、32 ビットの整数表現で表せるようにします。
> [JavaScript 第 6 版](https://www.oreilly.co.jp/books/9784873115733/) 73 ページ

特定のビットを 1（True）にセットする場合は下記のような感じのことをする。

```javascript
let bits = 0;
bits = bits | (1 << 2);
```

`a << b`は a を b ビット分だけ左にシフトして、右側に 0 を埋める。`1 << 2`だと、`00000000000000000000000000000001`というビットの並びを `00000000000000000000000000000100`とする感じ。`a | b`は a か b のどちらかのビットが 1 だったら 1 にするので、`0 | (1 << 2)`の場合、`00000000000000000000000000000000 | 00000000000000000000000000000100`となるので、`00000000000000000000000000000100`というビットの並びが返ってくる。右から 3 つ目のビットだけ True に設定できる。

特定のビットを 0（False）にセットする場合は下記のような感じになる。

```javascript
bits = bits & ~(1 << 2);
```

`~`は各ビットを反転させるので、`~(1 << 2)`の返りは`11111111111111111111111111111011`となる。`a & b`は a と b の両方のビットがどちらも 1 の場合は 1 を返す。例えば`bits`の値が`00010000000000000000000000100101`だとしたら、`bits & ~(1 << 2)`のは `00010000000000000000000000100101 & 11111111111111111111111111111011`となるので、`00010000000000000000000000100001`というビットの並びが返ってくる。右から 3 つ目のビットだけを 0 に変更できる。

特定のビットが 1（True）かどうかを確認するのには、下記のような感じになる。

```javascript
return bits & (1 << 2 !== 0);
```

例えば bits の値が`00010000000000000000000000100101`としたら、`bits & (1 << 2)`は`00010000000000000000000000100101 & 00000000000000000000000000000100` となるので返りは`00000000000000000000000000000100`となる。これは 10 進数でいうと`4`になるので、`4 !== 0`ということで True になる。bits の値が`00010000000000000000000000100001`としたら、返りは`00000000000000000000000000000000`となるので `0 !== 0` ということで False となる。

1 つの数値は 32 個のビットの並びになるので、32 個の True/False の値を保持できる。たとえば特定のアルファベット（大文字小文字区別しない）が使われたかどうかを確認するとしたら、

```javascript
let bits = 0;

const checkThisAlphabetIsAlreadyUsed = (char) => {
  const index = char.toLowerCase().charCodeAt() - 97;
  if ((bits & (1 << index)) !== 0) {
    return false;
  }
  bits = bits | (1 << index);
  return true;
};

const useAlphabetOnlyOnce = (char) => {
  if (!checkThisAlphabetIsAlreadyUsed(char)) {
    throw Error(`'${char}' is already in use`);
  }
  console.log(`Use ${char}`);
};
```

みたいな感じで、各アルファベットが使われたどうかを 1 から 26 個目までのビットに格納する。

```javascript
> useAlphabetOnlyOnce('a');
Use a
> useAlphabetOnlyOnce('a');
Error: 'a' is already in use
    at useAlphabetOnlyOnce (repl:3:11)
> useAlphabetOnlyOnce('b');
Use b
```

32 個以上の値を保持したい場合は、`bits`を配列にして数値を複数扱うようにすれば良い。[bit-vector](https://github.com/ashaffer/bit-vector)ではそのようにして 32 個以上の値を保持できるようにしている。[index.js](https://github.com/ashaffer/bit-vector/blob/master/src/index.js)を見ると、設定する index を 32 で割って、配列の index と、数値の 32 ビットの位置とを分けている。

[js-perf の結果](https://jsperf.com/bit-vector-vs-object/2)を見ると、普通のオブジェクトに値を保持するよりもだいぶ高速に処理できている。

これは蛇足だけど、bit-vector では`FastArray`ということで、

```javascript
const FastArray = typeof Uint32Array === "undefined" ? Array : Uint32Array;
```

と言う感じで、Uint32Array が利用可能な場合は[Uint32Array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)を使用している。Uint32Array のような[TypedArray](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)は、通常の配列（standard array）に比べると高速らしいのだが、実際に測定してみると同じくらいの速度になる([Javascript TypedArray performance](https://stackoverflow.com/a/24855023/634197))。これは JavaScript のエンジンが内部で最適化していて、通常の配列でも利用可能な場合は同じように`true array`を使い、使えない場合は`old-fashioned property map "arrays,"`を使うためらしい。

> That suggests that because you're filling the array in a simple, predictable way, a modern engine continues to use a true array (with the performance benefits thereof) under the covers rather than shifting over. We see basically the same performance for both. The difference in speed could relate to type conversion taking the Uint32 value and assigning it to sum as a number (though I'm surprised if that type conversion isn't deferred...).
> ...(snip)...
> ...so that the engine has to fall back on old-fashioned property map "arrays," and you see that typed arrays markedly outperform the old-fashioned kind
> [Javascript TypedArray performance](https://stackoverflow.com/a/24855023/634197)

いずれにしてもビットベクトルように明らかに 32 ビットまでの数値だけを扱っている配列の場合は、明確に Uint32Array を使った方が良いなと思う。

というメモ。
