---
title: Event target and currentTarget
featured:
  image: erik-mclean-CIO4c2xmtHQ-unsplash
  author: Erik Mclean
  authorLink: https://unsplash.com/s/photos/current-target?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-05 07:32:36
excerpt: "EventオブジェクトにはcurrentTargetとtargetの2つのプロパティがあるけど、いつもどっちがどっちか混同する。"
---

Event オブジェクトには[currentTarget](https://developer.mozilla.org/ja/docs/Web/API/Event/currentTarget)と[target](https://developer.mozilla.org/ja/docs/Web/API/Event/target)の 2 つのプロパティがあるけど、いつもどっちがどっちか混同する。

currentTarget の方は addEventListener でリッスンしている要素が入る。たとえば以下のような HTML と JavaScript があるとして、

```html
<body>
  <a href="./foobar" id="foobar">Link</a>
</body>
```

```javascript
document.body.addEventListener("click", (ev) => {
  console.log(ev.currentTarget, ev.target);
});
```

currentTarget には addEventListener をしている body 要素が入ってくる。target には実際にクリックイベントが発生した a 要素が入ってくる。
