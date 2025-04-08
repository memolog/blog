---
title: n^2 sort algorithms again
featured:
  image: n2-sort-algorithms-again.png
  author: chatGPT
date: 2020-02-11 13:54:52
excerpt: "O(n^2)の計算量で実行するソートアルゴリズムについては、Bubble Sort in JavaScript（バブルソート）、Insertion Sort in JavaScript（挿入ソート）、Selection Sort in JavaScript（選択ソート）にて扱ったのだけど、完全に忘れてしまったので、もう一度確認する。"
---

O(n^2)の計算量で実行するソートアルゴリズムについては、[Bubble Sort in JavaScript（バブルソート）](https://memolog.org/2018/bubble-sort-in-javascript.html)、[Insertion Sort in JavaScript（挿入ソート）](https://memolog.org/2018/insertion-sort-in-javascript.html)、[Selection Sort in JavaScript（選択ソート）](https://memolog.org/2018/selection-sort-in-javascript.html)にて扱ったのだけど、完全に忘れてしまったので、もう一度確認する。

- バブルソート：配列の左側から隣り同士を比較して、大きい方を右にする。右側に完成したソートができる
- 選択ソート：配列の左側から始めて、一番小さい値を選んで一番左に移す。左側に完成したソートができる
- 挿入ソート：配列の左側から始めて、左側に完成したソート結果に対して新しい値を適切な場所に挿入する

JavaScript におけるソートは[Array.prototype.sort について](https://memolog.org/2018/about-array-prototype-sort.html)で扱ったように sort メソッドが O(n log n)の計算量で実行してくれるので、実践で O(n^2)のソートを使うことはないけど。

というメモ。
