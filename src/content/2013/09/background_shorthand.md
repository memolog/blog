---
title: background ショートハンドで省略したプロパティ
date: 2013-08-31T20:00:00.000Z
categories:
  - web
tags:
  - css
excerpt: "backgroundのスタイルをショートハンドで指定した場合、指定していないプロパティはinitialと同じ値が指定される。CSS Backgrounds and Borders Module Level 3を参照。"
---

background のスタイルをショートハンドで指定した場合、指定していないプロパティは initial と同じ値が指定される。[CSS Backgrounds and Borders Module Level 3](http://www.w3.org/TR/css3-background/#the-background)を参照。

> The 'background' property is a shorthand property for setting most background properties at the same place in the style sheet. The number of comma-separated items defines the number of background layers. Given a valid declaration, for each layer the shorthand first sets the corresponding layer of each of 'background-image', 'background-position', 'background-size', 'background-repeat', 'background-origin', 'background-clip' and 'background-attachment' to that property's initial value, then assigns any explicit values specified for this layer in the declaration. Finally 'background-color' is set to the specified color, if any, else set to its initial value.

なので、background-color: blue; と background: blue; では、同じようで異なる。background-color で指定した場合は、background-color のプロパティだけを適用するのに対して、background で指定した場合は、設定した color を適用しつつ、**設定していない値は initial の値を適用する**。

```html
<style>
  .no-repeat {
    background-color: grey;
    background-repeat: no-repeat;
    height: 300px;
  }

  .bg-foobar {
    background: url("foobar.png");
  }
</style>

<div class="no-repeat bg-foobar"></div>
```

上のような例の場合（[同じ内容の codepen](http://codepen.io/memolog/pen/goLuI)）、.no-repeat で宣言している background-color と、background-repeat の指定より、.bg-foobar で宣言している background ショートハンドで設定される initial の値（transparent, repeat）が適用される。背景画像は繰り返し表示されることになる。

つまり、指定していないプロパティを初期化したいのであれば、background のショートハンドを使う方が良いけれど、背景画像だけを差し替えたいのであれば background-image を使わないといけない。ということになる。

というメモ
