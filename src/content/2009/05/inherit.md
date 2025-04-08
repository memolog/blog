---
title: 親要素の色をリンク色に継承させる
date: 2009-05-06T09:27:10.000Z
categories:
  - web
tags:
  - css
excerpt: "リンクの色の方が優先される理由の記事で、下記のHTMLの場合はリンクの色の方が優先されるという話をした。"
---

[リンクの色の方が優先される理由](/blog//2009/04/post-185/)の記事で、下記の HTML の場合はリンクの色の方が優先されるという話をした。

```html
<h3 class="entry-header"><a href="/post.html">記事のタイトル</a></h3>
```

```css
a {
  color: blue;
}
h3.entry-header {
  color: red;
}
```

では、h3.entry-header で指定した色をリンク色として継承したい場合はどうしたら良いのか。それには color プロパティに inherit を設定する。inherit は親要素の値を継承するので、h3.entry-header で指定した色になる。これは便利。親要素の色をリンク色に継承するための class 属性を用意しておけば、一つずつリンク色を指定する必要がなくなる。

```html
<h3 class="entry-header">
  <a href="/post.html" class="inherit">記事のタイトル</a>
</h3>
```

```css
a {
  color: blue;
}
h3.entry-header {
  color: red;
}
.inherit {
  color: inherit;
}
```

ところが、[IE6、IE7 ではこの値が機能しない（IE8 では機能するらしい）](http://hxxk.jp/2008/10/27/2057)。そのため、しばらくは他の手段で対応するしかないわけですが、 いずれは inherit を設定するだけで思いどおりの表示にできそう。世の中はますます便利に。
