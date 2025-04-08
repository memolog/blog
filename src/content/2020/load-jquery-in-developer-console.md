---
title: Load jQuery library in the Chrome developer console
featured:
  image: harsh-jain-xoMeq3-GwTY-unsplash
  author: Harsh Jain
  authorLink: https://unsplash.com/@harshjain1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-04 07:19:43
excerpt: "スクリプト内のDOM操作でjQueryを使っているけれど、処理がスクリプト内で完結していて、GlobalにはjQueryをロードさせていないという場合がある。あると思う。  そういった場合、例えばそのスクリプトに新しい実装を入れたいけどjQueryでのDOM操作が自分の期待通りに行えるかをChromeのデベロッパーツールでちょっと確認したいみたいな時に少し困る。大して困らない気もするけど、少し手間ではある。"
---

スクリプト内の DOM 操作で jQuery を使っているけれど、処理がスクリプト内で完結していて、Global には jQuery をロードさせていないという場合がある。あると思う。

そういった場合、例えばそのスクリプトに新しい実装を入れたいけど jQuery での DOM 操作が自分の期待通りに行えるかを Chrome のデベロッパーツールでちょっと確認したいみたいな時に少し困る。大して困らない気もするけど、少し手間ではある。

そんな時に jQuery 用のスニペットを用意しておくと jQuery を手軽にロードすることができるので役に立つ。[スニペットの作成、保存、実行](https://developers.google.com/web/tools/chrome-devtools/sources?hl=ja#snippets)のページに書かれている内容そのままだけど、以下のようなコードをスニペットとして作成して、右下の Run ボタンを押すだけである。

```javascript
let script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
script.crossOrigin = "anonymous";
script.integrity = "sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=";
document.head.appendChild(script);
```

<div class="youtube-wrapper"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0okbda7OiSI?si=cquMNigbiSUbTSwQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>

同じ方法で jQuery に限らず、一時的にページにライブラリをロードさせることができるので、まあまあ応用の利くハックかなと思う。スニペットの存在そのものを忘れる可能性はある。

というメモ。
