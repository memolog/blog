---
title: AngularJSとlightBoxと右クリックとFirefox
date: 2014-08-25T08:31:00.000Z
categories:
  - web
tags:
  - angularJS
  - firefox
  - javascript
  - lightbox
excerpt: "javascript - Firefox strange right click event bubbling behavior - Stack Overflowでレポートされている変な挙動はFirefox 31.0でも残っているようで、右クリックしたときに、documentに対してclickイベントを発火する。他の要素ではlistenできないようなので、どうもbubblingしてきたのではなくて、documentにclickイベントが起きている。みたい。"
---

[javascript - Firefox strange right click event bubbling behavior - Stack Overflow](http://stackoverflow.com/questions/16898330/firefox-strange-right-click-event-bubbling-behavior)でレポートされている変な挙動は Firefox 31.0 でも残っているようで、右クリックしたときに、document に対して click イベントを発火する。他の要素では listen できないようなので、どうも bubbling してきたのではなくて、document に click イベントが起きている。みたい。

[lightbox](http://lokeshdhakar.com/projects/lightbox2/)では、data-lightbox をつけて、a タグに href をつけると、画面遷移させる代わりに、その場で画像を画面いっぱいに表示してくれます。

AngularJS では、ngRoute（routeProvider）の中で、[$routeElement](https://docs.angularjs.org/api/ng/service/$rootElement)の click イベントを listen していて、event.target から parent に向かって a タグを探して、href の情報をもとに画面遷移を実行する。$routeElementは「The root element of Angular application. This is either the element where ngApp was declared or the element passed into angular.bootstrap. 」なので、ngAppが宣言されているか、angular.bootstrapで渡したelementになる。つまり、angular.bootstrapにdocumentを渡すと、$routeElement は「document」になる。document で click イベントを listen するようになる。

つまり、Firefox で、lightbox を使った（a href で wrap されている）画像を右クリックすると、意図せぬ画面遷移が発生してしまう。Angular の routeProvider で設定されていないパスなら何もおこらないかも。でも otherwise が設定されていたら、otherwise の画面に遷移してしまう。

回避方法としては、a タグに target="\_blank"（target 属性に値が入ってれば何でもいい）を設定しておけばいい。Angluar が画面遷移処理しなくなります。target 属性入れられない場合は、、まあまあ困るかも。

というメモ
