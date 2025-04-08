---
title: Insertion Sort in JavaScript
featured:
  image: mingwei-dong-651103-unsplash
  author: mingwei dong
  authorLink: https://unsplash.com/photos/irA2xa68xNA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-07 05:47:14
excerpt: "Selection Sort in JavaScriptの記事から引き続き。内容は挿入ソートからの抜粋なので詳細はそちらを参照。"
---

[Selection Sort in JavaScript](https://memolog.org/2018/selection-sort-in-javascript.html)の記事から引き続き。内容は[挿入ソート](https://en.wikipedia.org/wiki/Insertion_sort)からの抜粋なので詳細はそちらを参照。

[挿入ソート](https://en.wikipedia.org/wiki/Insertion_sort)は配列から左から順に値を取り出して、ソート済みの配列の適切な場所に値を挿入していく、ということを繰り返し行う。配列は左から順にソート済み状態となり、最後までソート済みになったところで終了。[選択ソート](https://en.wikipedia.org/wiki/Selection_sort)と同じ O(n^2)であるけど、選択ソートが取り出す値を見つけるのにソートされていない値をすべて確認しなければならないのに対して、挿入ソートはソート済みの値を比較して挿入位置が見つかったらそこで確認を終えることができる。ので、挿入ソートの方が実際の効率は良いとされている。

<div class="youtube-wrapper"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ROalU379l3U?si=LZ4Vjxb5U44sv1eX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>

実装例は[The Insertion sort algorithm - Ben's Blog](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-insertion-sort-algorithm/)と[V8 の array.js](https://github.com/v8/v8/blob/master/src/js/array.js#L645)を参考にしている。

テストの箇所は省略。[Gist](https://gist.github.com/memolog/9e9475a1b91770dd7b25d44904771fbb/6416fc2f3fcfff0c2e0b61fb01ea67c5f1a8b54c)を参照してください。今回は前回の[Selection Sort in JavaScript](https://memolog.org/2018/selection-sort-in-javascript.html)と同じ配列を使って比較してみた。

```javascript
function insertionSort(array, showArray) {
  let count = 0;
  const arrayLength = array.length;
  for (let i = 1; i < arrayLength; i++) {
    const a = array[i];
    let j = i - 1;
    for (; j >= 0; j--) {
      count++;
      const b = array[j];
      if (a < b) {
        array[j + 1] = b;
      } else {
        break;
      }
    }
    array[j + 1] = a;
    if (showArray) {
      console.log(array);
    }
  }
  console.log(`number of iterates: ${count}`);
}
```

実行例

```javascript
> test([bubbleSort, selectionSort, insertionSort], 10, true);
```
