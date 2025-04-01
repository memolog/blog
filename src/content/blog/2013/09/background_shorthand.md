---
title: background ショートハンドで省略したプロパティ
date: 2013-08-31T20:00:00.000Z
categories:
- web
tags:
- css
---
backgroundのスタイルをショートハンドで指定した場合、指定していないプロパティはinitialと同じ値が指定される。[CSS Backgrounds and Borders Module Level 3](http://www.w3.org/TR/css3-background/#the-background)を参照。

<!-- more -->

> The 'background' property is a shorthand property for setting most background properties at the same place in the style sheet. The number of comma-separated items defines the number of background layers. Given a valid declaration, for each layer the shorthand first sets the corresponding layer of each of 'background-image', 'background-position', 'background-size', 'background-repeat', 'background-origin', 'background-clip' and 'background-attachment' to that property's initial value, then assigns any explicit values specified for this layer in the declaration. Finally 'background-color' is set to the specified color, if any, else set to its initial value.

なので、background-color: blue; と background: blue; では、同じようで異なる。background-colorで指定した場合は、background-colorのプロパティだけを適用するのに対して、backgroundで指定した場合は、設定したcolorを適用しつつ、**設定していない値はinitialの値を適用する**。

```markup
<style>
.no-repeat {
  background-color: grey;
  background-repeat: no-repeat;
  height: 300px; 
}

.bg-foobar {
  background:  url('foobar.png');
}
</style>

<div class="no-repeat bg-foobar"></div>
```

上のような例の場合（[同じ内容のcodepen](http://codepen.io/memolog/pen/goLuI)）、.no-repeatで宣言しているbackground-colorと、background-repeatの指定より、.bg-foobarで宣言しているbackgroundショートハンドで設定されるinitialの値（transparent, repeat）が適用される。背景画像は繰り返し表示されることになる。

つまり、指定していないプロパティを初期化したいのであれば、backgroundのショートハンドを使う方が良いけれど、背景画像だけを差し替えたいのであればbackground-imageを使わないといけない。ということになる。

というメモ
