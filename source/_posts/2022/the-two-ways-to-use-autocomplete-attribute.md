---
title: hiddenのフィールドにautocomplete属性を入れる意味
featured:
  image: craig-manners-vtG_gpJn9OM-unsplash
  author: Craig Manners
  authorLink: https://unsplash.com/@craigmanners_com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2022-12-05 09:00:00
---
[4.10.18.7.1 Autofilling form controls: the autocomplete attribute](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute)には、autocomplete属性には2つの利用方法があると書かれている。<!-- more -->

通常のフィールドには**autofill expectation mantle**が適用され、autocomplete属性はユーザーからどんな入力を期待しているかを記述しているものとして扱われる。

hiddenのフィールドには**autofill anchor mantle**が適用され、autocomplete属性は与えられた値の意味を記述しているものとして扱われる。利用できる値は基本的に通常のフィールドの場合と同じだけど、hiddenフィールドに対しては自動入力機能の利用可否を設定するため `on` と `off` の値は許可されていない。

autocomplete属性は一般的には自動入力機能を利用するために設定されるもので、その意味ではhiddenフィールドにautocomplete属性を設定する必要はない。とはいえ、hiddenフィールドでは与えられた値の意味を記すために使うことができるので（仕様上の）意味はある。ブラウザや補助装置などが実際にhiddenフィールドのautocomplete属性を参照しているかどうかは調べてないので、実際に効力があるかは不明ではあるけど。
