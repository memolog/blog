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
---
[javascript - Firefox strange right click event bubbling behavior - Stack Overflow](http://stackoverflow.com/questions/16898330/firefox-strange-right-click-event-bubbling-behavior)でレポートされている変な挙動はFirefox 31.0でも残っているようで、右クリックしたときに、documentに対してclickイベントを発火する。他の要素ではlistenできないようなので、どうもbubblingしてきたのではなくて、documentにclickイベントが起きている。みたい。

<!-- more -->

[lightbox](http://lokeshdhakar.com/projects/lightbox2/)では、data-lightboxをつけて、aタグにhrefをつけると、画面遷移させる代わりに、その場で画像を画面いっぱいに表示してくれます。

AngularJSでは、ngRoute（routeProvider）の中で、[$routeElement](https://docs.angularjs.org/api/ng/service/$rootElement)のclickイベントをlistenしていて、event.targetからparentに向かってaタグを探して、hrefの情報をもとに画面遷移を実行する。$routeElementは「The root element of Angular application. This is either the element where ngApp was declared or the element passed into angular.bootstrap. 」なので、ngAppが宣言されているか、angular.bootstrapで渡したelementになる。つまり、angular.bootstrapにdocumentを渡すと、$routeElementは「document」になる。documentでclickイベントをlistenするようになる。

つまり、Firefoxで、lightboxを使った（a hrefでwrapされている）画像を右クリックすると、意図せぬ画面遷移が発生してしまう。AngularのrouteProviderで設定されていないパスなら何もおこらないかも。でもotherwiseが設定されていたら、otherwiseの画面に遷移してしまう。

回避方法としては、aタグにtarget="_blank"（target属性に値が入ってれば何でもいい）を設定しておけばいい。Angluarが画面遷移処理しなくなります。target属性入れられない場合は、、まあまあ困るかも。

というメモ
