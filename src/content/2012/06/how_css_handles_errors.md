---
title: CSSのエラーの扱い方
date: 2012-06-09T12:45:00.000Z
categories:
  - web
tags:
  - css
excerpt: "How CSS Handles Errors - Tab Completionにて、CSSのパースで問題が発生した場合に、ブラウザがどのようにハンドリングするかの紹介がされています、という内容の紹介。仕様の4.2 Rules for handling parsing errorsや、4.1.7 Rule sets, declaration blocks, and selectorsで説明されているものと内容的には同じですけど。"
---

[How CSS Handles Errors - Tab Completion](http://www.xanthir.com/blog/b4JF0)にて、CSS のパースで問題が発生した場合に、ブラウザがどのようにハンドリングするかの紹介がされています、という内容の紹介。仕様の[4.2 Rules for handling parsing errors](http://www.w3.org/TR/CSS21/syndata.html#parsing-errors)や、[4.1.7 Rule sets, declaration blocks, and selectors](http://www.w3.org/TR/CSS2/syndata.html#rule-sets)で説明されているものと内容的には同じですけど。

> At any given time, when parsing a CSS stylesheet, the browser is either trying to build an at-rule, a style rule, or a declaration (/property) inside of one of those.

CSS をパースするときに、ブラウザは at-rule（@media とか）、style rule（.class とか）、declaration（color:#ccc;とか）を構築する。（ので、それぞれの処理でエラーハンドリングがある）

declaration の場合は、エラーの発生した宣言は捨てられて、次の「;」が見つかるまで進む（it throws away the declaration, then seeks forward until it finds a semicolon that's not inside of a {}, \[\], or () block.）。記事の下の方に下記のような例が出ていて、この例の場合、「radial-gradient」は認識できずにエラーとなるけど、そのときは「;」の部分まで無視されることになる。ので、後ろについている transparent も無視される。

```
.foo {
  color: white;
  background: black;
  background: radial-gradient(black, rgba(0,0,0,.5)) transparent;
}

```

仕様の方には、下記のような例が記載されている。

```
p {
  color: green;
  font-family: 'Courier New Times
  color: red;
  color: green;
}

```

font-family の「'」が閉じられていないので、エラーとなるけれど、その場合、次の「;」までが無視されるようになる。なので、color:red の宣言も無視される。

at-rule の場合は、エラーが発生したら at-rule が及ぶ範囲全体が無視されるようになる。たとえば@modia{ ... }みたいな場合は、{}全体が無視されて、@inport( ... );みたいな場合は「;」までが無視される。

style rule の場合は、エラーが発生したら{}ブロック全体が無視されるようになる。[仕様](http://www.w3.org/TR/CSS2/syndata.html#rule-sets)には下記のような記載がある。

> The selector (see also the section on selectors) consists of everything up to (but not including) the first left curly brace ({). A selector always goes together with a declaration block. When a user agent cannot parse the selector (i.e., it is not valid CSS 2.1), it must ignore the selector and the following declaration block (if any) as well.
>
> CSS 2.1 gives a special meaning to the comma (,) in selectors. However, since it is not known if the comma may acquire other meanings in future updates of CSS, the whole statement should be ignored if there is an error anywhere in the selector, even though the rest of the selector may look reasonable in CSS 2.1.

特定のセレクタだけに問題があって、カンマで区切られた残りのセレクタは問題ない場合でも、カンマが将来の CSS では（セレクタを分ける以外の）他の意味を持っている場合があるかもしれないから、記述全体を無視すべしと。

たとえば

```
.foo,
.bar:nth-child(2n+1):after,
.baz {
  clear: left;
}

```

という CSS だと、nth-child が認識できないブラウザだと、.foo や.baz に対する clear:left;も行われなくなる。対応していないブラウザに対処するには、rule をひとまとめにしないで、.foo,.baz と、bar:nth-child(2n+1):after の 2 つに分ける必要がある。

```
.foo,
.baz {
  clear: left;
}

.bar:nth-child(2n+1):after { clear: left; }

```

逆に言うと、vendor prefix がついたセレクタなどは、その vendor でしか対応していないので、セレクタの中にそれを入れておけば、特定のブラウザだけに{}内の宣言を適用させるみたいなハックができる、ということになる。see also [不明な CSS セレクター - Weblog - hail2u.net](http://hail2u.net/blog/webdesign/unknown-css-selector.html)

ひとつのセレクタがエラーである場合は、そのセレクタだけを無視するのが望ましいと思われるけど、上のようなハックなど、現状の挙動に依存しているサイトもあるから変更できないよねみたいなことが、最後の方に書かれていました。
