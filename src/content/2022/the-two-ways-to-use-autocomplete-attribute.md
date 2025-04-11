---
title: hiddenのフィールドにautocomplete属性を入れる意味
featured:
  image: the-two-ways-to-use-autocomplete-attribute.webp
  author: chatGPT
date: 2022-12-05 09:00:00
excerpt: "4.10.18.7.1 Autofilling form controls: the autocomplete attributeには、autocomplete属性には2つの利用方法があると書かれている。"
---

[4.10.18.7.1 Autofilling form controls: the autocomplete attribute](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute)には、autocomplete 属性には 2 つの利用方法があると書かれている。

通常のフィールドには**autofill expectation mantle**が適用され、autocomplete 属性はユーザーからどんな入力を期待しているかを記述しているものとして扱われる。

hidden のフィールドには**autofill anchor mantle**が適用され、autocomplete 属性は与えられた値の意味を記述しているものとして扱われる。利用できる値は基本的に通常のフィールドの場合と同じだけど、hidden フィールドに対しては自動入力機能の利用可否を設定するため `on` と `off` の値は許可されていない。

autocomplete 属性は一般的には自動入力機能を利用するために設定されるもので、その意味では hidden フィールドに autocomplete 属性を設定する必要はない。とはいえ、hidden フィールドでは与えられた値の意味を記すために使うことができるので（仕様上の）意味はある。ブラウザや補助装置などが実際に hidden フィールドの autocomplete 属性を参照しているかどうかは調べてないので、実際に効力があるかは不明ではあるけど。
