---
title: リンクの隣りにfaviconを表示する
date: 2012-05-28T15:00:00.000Z
categories:
- web
tags:
- css
- jquery
---
[Favicons Next To External Links | CSS-Tricks](http://css-tricks.com/favicons-next-to-external-links/)という、リンクの左側にリンク先のfaviconを表示するというテクニックが紹介されていて、試してみました。簡単にできて、見た目にも華やかになるので面白い（個人的に）。

<!-- more -->

リンク箇所がテキストのときだけ出力したかったので、firstChildのnodeTypeがテキストノードの場合のみ出力するようにしてみました（paddingも若干多めに）。

```javascript
$(".entry-content a[href^='http']").each(function(){
if(this.firstChild.nodeType == 3){
  $(this).css({
  background: "url(http://www.google.com/s2/u/0/favicons?domain=" +
  this.hostname + 
  ") 4px center no-repeat",
  "padding-left":"24px"
  });
}
});
```

残念ながらこのサイトのfaviconはGoogleのfaviconサービスでは取得できなかったので...、リンク先がmemolog.orgの場合は明示的にfaviconを指定。

```javascript
.entry-content [href*='memolog.org']{ 
  background: url('http://memolog.org/images/favicon.ico') no-repeat 4px center !important;
  padding-left: 24px;
}
```

[こんな感じになる](http://memolog.org)

いい感じ

あと、faviconのURLをdata-faviconみたいな属性に追加して、その属性の値をCSSから参照してbackgroundの値として入れられないかなと（CSSはCSSファイルの中で指定したい）、下記のようなことを試してみたけど、そういうことはできない。みたい。

```javascript
[data-favicon]::before{
  content: url(attr(data-favicon));
}
```

残念。URLをdata-属性に入れて、CSSでそれを参照する方法はないのかな。
