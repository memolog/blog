---
title: inputでwidthを100%で使うと若干はみ出る
date: 2012-06-08T14:21:00.000Z
categories:
  - web
tags:
  - css
  - html
featured:
  image: henrique-ferreira-306706-unsplash
  author: Henrique Ferreira
  authorLink: https://unsplash.com/photos/ySgSnJdPhZg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
excerpt: "input要素にwidth:100%;を指定すると、微妙に包含ブロックからはみ出す。  なんでだろうなあと思っていたんですけど、input要素にはブラウザのデフォルトでpaddingやborderが入っているので、width:100%;とするとpaddingやborderのサイズ分はみ出してしまうということでした。"
---

input 要素に width:100&#x25;;を指定すると、微妙に包含ブロックからはみ出す。

なんでだろうなあと思っていたんですけど、input 要素にはブラウザのデフォルトで padding や border が入っているので、width:100&#x25;とすると padding や border のサイズ分はみ出してしまうということでした。

分かってしまうと大した話ではない。

なので、input 要素に width:100&#x25;に広げるときは、box-sizing を border-box に設定するか、padding/border を削るとかすると、はみ出さずにはまる。うむ。

```css
input[type="text"] {
  width: 100%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
```

そして蛇足ですけど、[Paul Irish - Google+ - box-sizing: border-box; ...is clearly superior to our...](http://paulirish.com/wp-content/uploads/2011/gplus-boxsizing.html)あたりの話を参考に確認したら、入力系の input 要素のうち type=search だけが border-box を使用しているみたいです（Firefox は現状では content-box）。search の UI 的に border-box の方が便利ということなのだろうか。

とにかく。たとえば search と text, email, url など別の type で同じ width を指定したら、search だけ少し幅が狭いみたいな現象が発生することになる。いっそのこと input 要素は border-box に統一した方が便利な気がしなくもない。

そのへん、[normalize.css](http://necolas.github.com/normalize.css/)では、content-box に統一するように CSS が用意されていました（一緒に search 用の外観も外しているんですけど、それをするなら普通に type=text 使えば良いんじゃないかと思わなくもない）。

```css
/*
 * 1. Addresses appearance set to searchfield in S5, Chrome
 * 2. Addresses box-sizing set to border-box in S5, Chrome (include -moz to future-proof)
 */

input[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box; /* 2 */
  box-sizing: content-box;
}

/*
 * Removes inner padding and search cancel button in S5, Chrome on OS X
 */

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
```
