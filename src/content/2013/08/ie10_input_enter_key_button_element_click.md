---
title: IE10 で input フォームでエンターすると button要素 に click イベントが発生する
date: 2013-08-09T14:55:00.000Z
categories:
  - web
tags:
  - ie
featured:
  image: dave-blahlentino-149508-unsplash
  author: Dave Blahlentino
  authorLink: https://unsplash.com/photos/iRm292XKwA4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
excerpt: "javascript - IE10 find first button on page and trigger click event on input submit - Stack Overflow参考。Internet Explorer 10 にて input fieldで Enter keyを押すと、<button>要素にclick eventが発生する。"
---

[javascript - IE10 find first button on page and trigger click event on input submit - Stack Overflow](http://stackoverflow.com/questions/13497606/ie10-find-first-button-on-page-and-trigger-click-event-on-input-submit)参考。Internet Explorer 10 にて input field で Enter key を押すと、<button>要素に click event が発生する。

理由としては、button element は、type 属性が省略されている場合の default が「submit」であるためらしい。[w3c の spec](http://www.w3.org/html/wg/drafts/html/master/forms.html#the-button-element)にも「default is the Submit Button state」と記述されている。IE10 では、button 要素で type 属性が省略されている場合、submit と同じと見なして、input field でエンターしたときに、button に対して click イベントが発生させる、ということみたい。

対策としては、submit ではない button では type="button"というように、属性を明記すること。または input field を form 要素で囲うこと（同じ form に存在する button が、click event を発生させる対象のボタンになる）。

input field が form 要素で囲われていない場合は、document 全体で最初に見つかった button 要素（form 要素で囲われていない）に対して、click イベントが発生する。そのため、わりと予想しないところで click event が発生することになる可能性があり、びっくりすることになる。[現象確認用の codepen](http://codepen.io/memolog/pen/afGmI)

form 要素に囲われていないような button で、submit する意図がないことが明白な場合でも、button 要素には適切な type 属性をつけておく方が良さそう。

というメモ（わりと走り書き）。
