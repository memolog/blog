---
title: target疑似クラスを使って、表示をオン・オフする
date: 2008-02-03T04:40:00.000Z
categories:
- web
tags:
- css
---
*   [Vitamin Features » Stay on :target](http://www.thinkvitamin.com/features/css/stay-on-target)
*   [:target pseudo selector tutorial - CSS3 . Info](http://www.css3.info/target-pseudo-selector-tutorial/)

<!-- more -->
*   [疑似クラス、疑似要素とは何か \- メモログ](/blog//2007/07/pseudo-classes-pseudo-elements/)

CSS3にあるtarget疑似クラスをつかって表示をオン・オフすることができるんだよ。それはすごい！というような内容の話。target疑似クラスとはアンカーのあるリンクを特定する方法で、たとえば「#test:target」というCSSは、URLが「/blog//index/#test」の場合にのみ作用します。言い換えると、「<a href="index.html#test">test</a>」というリンクをクリックしたあとのページで作用するようなCSSになります。

実際にトラックバック欄で試してみました。下記のCSSを追加しました。

```
#trackbacks:target #trackbacks-open-content {display:block !important;}

```

このサイト（メモログ）では、トラックバック入力欄は通常非表示の状態になっていますが、記事タイトル下側にある「[トラックバック(0)](/blog//2008/02/target_pseudo_selector/#trackbacks)」というリンクをクリックした場合は、トラックバック入力欄が表示されます。!importantがついているのは、[prototype.jsを利用した項目の開閉](/blog//2007/10/prototypejs/)をするのにインラインにdisplay:none;が入っているため。display:noneをスタイルシート上で指定していれば、!imortantは必要ありません。

[CSS3 . Info](http://www.css3.info/target-pseudo-selector-tutorial/)によると、target疑似クラスはすべての「current browser」でサポートしているとのこと。実際にFirefox 2.0とsafari 3（mac）で試してみましたが、きちんと動作していました。

:target を利用して表示したコンテンツをふたたび元の状態（非表示）にしたい場合は、たとえば<a href="index.html#void">void</a>みたいに、ターゲットを外すことで可能です。とはいえトリッキーな感じ。[Vitamin](http://www.thinkvitamin.com/features/css/stay-on-target)で紹介しているように、常に何かを表示させておくような、タブ型のコンテンツを作るときのほうがスマートに利用できます。

応用として考えられるのは、たとえばQ&Aのページとか、操作手順のページとか。ページとしては1ページでほしいけれど、ユーザーに明示的にクリックすることでコンテンツを表示したいとか、1ページ内でコンテンツの流れ・動線を作りたい場合。Javascriptでもできますけど、こちらの方がつくるのは楽だと思います。IE6のシェアが下がらないとなかなか実践での利用というのは難しいかもしれませんが、あと1、2年もすれば、表示開閉のためのスタンダードな方法になるのではないかと推察する次第です。
