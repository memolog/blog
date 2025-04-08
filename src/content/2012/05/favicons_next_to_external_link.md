---
title: リンクの隣りにfaviconを表示する
date: 2012-05-28T15:00:00.000Z
categories:
  - web
tags:
  - css
  - jquery
excerpt: "Favicons Next To External Links | CSS-Tricksという、リンクの左側にリンク先のfaviconを表示するというテクニックが紹介されていて、試してみました。簡単にできて、見た目にも華やかになるので面白い（個人的に）。"
---

[Favicons Next To External Links | CSS-Tricks](http://css-tricks.com/favicons-next-to-external-links/)という、リンクの左側にリンク先の favicon を表示するというテクニックが紹介されていて、試してみました。簡単にできて、見た目にも華やかになるので面白い（個人的に）。

リンク箇所がテキストのときだけ出力したかったので、firstChild の nodeType がテキストノードの場合のみ出力するようにしてみました（padding も若干多めに）。

```javascript
$(".entry-content a[href^='http']").each(function () {
  if (this.firstChild.nodeType == 3) {
    $(this).css({
      background:
        "url(http://www.google.com/s2/u/0/favicons?domain=" +
        this.hostname +
        ") 4px center no-repeat",
      "padding-left": "24px",
    });
  }
});
```

残念ながらこのサイトの favicon は Google の favicon サービスでは取得できなかったので...、リンク先が memolog.org の場合は明示的に favicon を指定。

```javascript
.entry-content [href*='memolog.org']{
  background: url('http://memolog.org/images/favicon.ico') no-repeat 4px center !important;
  padding-left: 24px;
}
```

[こんな感じになる](http://memolog.org)

いい感じ

あと、favicon の URL を data-favicon みたいな属性に追加して、その属性の値を CSS から参照して background の値として入れられないかなと（CSS は CSS ファイルの中で指定したい）、下記のようなことを試してみたけど、そういうことはできない。みたい。

```javascript
[data-favicon]::before{
  content: url(attr(data-favicon));
}
```

残念。URL を data-属性に入れて、CSS でそれを参照する方法はないのかな。
