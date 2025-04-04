---
title: Merge Sort in JavaScript
featured:
  image: tj-holowaychuk-62184-unsplash
  author: Tj Holowaychu
  authorLink: https://unsplash.com/photos/lssS7acGDls?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-19 17:43:28
excerpt: "Insertion Sort in JavaScriptからの引き続き。内容はMerge sortからの抜粋なので、詳細はそちらを参照。"
---

[Insertion Sort in JavaScript](https://memolog.org/2018/insertion-sort-in-javascript.html)からの引き続き。内容は[Merge sort](https://en.wikipedia.org/wiki/Merge_sort)からの抜粋なので、詳細はそちらを参照。

マージソートには n 個の配列を、n 個のサブ配列（配列の中には 1 個の要素が入ってる）に分割していって、それぞれソートした 2 つの配列を結合して、結合した配列でソートを行う。そして結合した 2 つ配列を結合して、ソートする...ということを繰り返していく。

{%  youtube id=XaqR3G_NVoo title="Merge-sort with Transylvanian-saxon (German) folk dance" %}

マージソートはトップダウンで行う実装とボトムアップで行う実装とがある。下の実装例は[Merge sort](https://en.wikipedia.org/wiki/Merge_sort#Top-down_implementation)の Top-down implementation をそのまま JavaScript に置き換えただけである。二つの配列を交互に使いまわしていく。ので、ちょっとわかりにくい。[The Merge sort algorithm - Ben's Blog](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-merge-sort-algorithm/)にあるコードの方が見やすい。けど、マージを実行するたびに新しく配列を作成した上にそれを concat で渡すので、上記 URL の実装だと空間計算量的には良くない。

```javascript
function topDownMerge(
  sourceArray,
  begin,
  middle,
  end,
  resultArray,
  showArray,
  count
) {
  let i = begin;
  let j = middle;

  for (let k = begin; k < end; k++) {
    if (i < middle && (j >= end || sourceArray[i] <= sourceArray[j])) {
      resultArray[k] = sourceArray[i];
      i = i + 1;
    } else {
      resultArray[k] = sourceArray[j];
      j = j + 1;
    }
    count.count++;
  }

  if (showArray) {
    console.log(resultArray);
  }
}

function topDownSplitMerge(
  sourceArray,
  begin,
  end,
  sortingArray,
  showArray,
  count
) {
  const length = end - begin;
  if (length < 2) {
    return;
  }

  const middle = Math.floor((end + begin) / 2);

  topDownSplitMerge(sortingArray, begin, middle, sourceArray, showArray, count);
  topDownSplitMerge(sortingArray, middle, end, sourceArray, showArray, count);

  topDownMerge(sourceArray, begin, middle, end, sortingArray, showArray, count);
}

function topDownMergeSort(array, showArray) {
  const count = {
    count: 0,
  };
  const workingArray = array.slice(); // copy array
  topDownSplitMerge(workingArray, 0, array.length, array, showArray, count);
  if (showArray) {
    console.log(array);
  }
  console.log(`number of iterates: ${count.count}`);
}
```

実行結果は以下のような感じ。スクリプトの全体は[Gist](https://gist.github.com/memolog/9e9475a1b91770dd7b25d44904771fbb/8e9c6274ebc743d9c29ac9868766db0e867c2f67)を参照。

配列が 10 要素の場合。

```javascript
node sortTest.js bubbleSort,selectionSort,insertionSort,topDownMergeSort 10 true
```
