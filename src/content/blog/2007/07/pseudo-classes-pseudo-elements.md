---
title: 疑似クラス、疑似要素とは何か
date: 2007-07-24T17:50:55.000Z
categories:
- web
tags:
- css
---
*   [http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#pseudo-classes](http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#pseudo-classes)

<!-- more -->

疑似クラス、英語でいうと「psedo-class」、複数形は「pseudo-classes」。ちなみに疑似要素は英語で言うと「pseudo-element」で、複数形は「pseudo-elements」。わからないで30分くらい悩んでいたのですが「疑似要素 英語」で検索したらすぐに回答が出てきました。検索という言葉を忘れていたかのような自分にがっくり。

疑似クラスとは、W3CのCSS3のworking draftの記述を参考にすれば「ドキュメントツリーの範囲外の情報、もしくはその他のシンプルなセレクタでは表現できない情報に選択可能にする（The pseudo-class concept is introduced to permit selection based on information that lies outside of the document tree or that cannot be expressed using the other simple selectors.）」というもの。一方、疑似要素とは「ドキュメントツリーについて、抽象的な概念を作り出す（Pseudo-elements create abstractions about the document tree beyond those specified by the document language.）」というもの。

自分の言葉で説明するとしたら、疑似クラスとは「要素の一時的な状態・特徴」をCSSで簡単に指定できるように用意したもので、疑似要素とは「要素の意味的な範囲」をCSSで簡単に指定できるように用意したものという感じ。疑似要素の場合「意味的な範囲」を指定するから文脈によって範囲が変わる。

CSS2.1における疑似クラスは、:first-childとか、link系の:link、:visited、ダイナミック疑似クラスの:hover、:active、:focus、言語疑似クラスの:langがある。

CSS3では新たに、ターゲット疑似クラス、UI疑似クラス（UI element states pseudo-classes）、構造疑似要素、否定疑似要素などが定義されている。ターゲット疑似クラスは、index.html#hogeとかアンカーのついたリンクを特定できる。UI疑似クラスは、チェックボックスのオン・オフの状態とか、UIの状態を指定できる。具体的には、:enabled、:disabled、:checkedなど。構造疑似要素は、:rootとか、構造的な特徴を指定できる。:rootのほかに、:nth-child()、first-child、last-childとか、only-childとか、:emptyとかいろいろある。:nth-child()は、たとえばtr:nth-child(even)という指定では、trの偶数行のみを特定することができる。否定疑似クラスは、指定した属性がない要素を特定する。

一方、疑似要素は、:first-line、:first-letter、:before、:afterなどがある。CSS3からは::first-lineのように、コロンをふたつつけて疑似クラスとわけて表現しているみたい。CSS3から新たに用意されているのは、::selectionという疑似要素で、ユーザーが選択（ハイライト）している箇所を指定できる。
