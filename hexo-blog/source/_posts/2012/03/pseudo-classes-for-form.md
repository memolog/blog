---
title: Form関連の疑似クラス
date: 2012-03-04T13:31:00.000Z
categories:
- web
tags:
- css3
- html5
---
[CSS3 Pseudo-Classes and HTML5 Forms | HTML5 Doctor](http://html5doctor.com/css3-pseudo-classes-and-html5-forms/)で紹介されているForm関連の疑似クラスを試してみるというだけの内容。[W3Cの定義はこのあたり](http://www.w3.org/TR/css3-ui/#pseudo-validity)。required/optionalの疑似クラスは最新のブラウザでは対応しているみたい（上のリンクの記事によると）ですけど、それ以外はぼちぼち。現状では視覚的な補助という域を脱しない感はあります。

<!-- more -->

<!\-\- #form input {margin-right: 4px;} #form input:required + label{color:#c90000; } #form input:required + label::after { content: " *"; } #form input:required { border: 1px solid #666; } #form input:optional { border: 1px solid #ccc; } #form #email:invalid + label{ color:#c90000; } #form #email:invalid + label::after { content: ' NG'; } #form #email:valid + label::after { content: ' OK'; } #form #email:valid + label{ color:green; } #form input\[type='number'\]:out-of-range { border-color: #c90000; } #form input\[type='number'\]:in-range { border-color: green; } #form textarea:read-only { user-select: none; -moz-user-select: none;-webkit-user-select: none; border:2px dashed #ccc;} #form textarea:read-write { user-select: text; } --> Required  
Not Required  
Email  
Number  
Read only  
Read and Write

上記のHTMLソースはこんな感じ（あまり良い例ではない）。

```
<form id="form">
<style>
<!--
#form input {margin-right: 4px;}
#form input:required + label{color:#c90000; }
#form input:required + label::after { content: " *"; }
#form input:required { border: 1px solid #666; }
#form input:optional { border: 1px solid #ccc; }
#form #email:invalid + label{ color:#c90000; }
#form #email:invalid + label::after { content: ' NG'; }
#form #email:valid + label::after { content: ' OK'; }
#form #email:valid + label{ color:green; }
#form input[type='number']:out-of-range { border-color: #c90000; }
#form input[type='number']:in-range { border-color: green; }
#form textarea:read-only { user-select: none; -moz-user-select: none;-webkit-user-select: none; border:2px dashed #ccc;}
#form textarea:read-write { user-select: text; }
-->
</style>
<input type="text" required id="foo"><label for="foo">Required</label><br />
<input type="text" id="bar"><label for="bar">Not Required</label><br />
<input type="email" id="email"><label for="email">Email</label><br />
<input type="number" id="number" max="10" min="1" /><label for="number">Number</label><br />
<textarea readonly>Read only</textarea><br />
<textarea>Read and Write</textarea>
</form>

```

type=emailの場合のvalidationについては、[HTML5のE-mailの項目](http://dev.w3.org/html5/spec/Overview.html#e-mail-state-type-email)の下の方に詳しく記載されています。RFC5322の規定よりも実際的な内容になっていて、いわゆるDocomo携帯の「@」の前に「.」が入ったアドレスでもvalidとして判定されます。

> A valid e-mail address is a string that matches the ABNF production 1*( atext / "." ) "@" ldh-str *( "." ldh-str ) where atext is defined in RFC 5322 section 3.2.3, and ldh-str is defined in RFC 1034 section 3.5. \[ABNF\] \[RFC5322\] \[RFC1034\]
> 
> This requirement is a willful violation of RFC 5322, which defines a syntax for e-mail addresses that is simultaneously too strict (before the "@" character), too vague (after the "@" character), and too lax (allowing comments, whitespace characters, and quoted strings in manners unfamiliar to most users) to be of practical use here.
> 
> The following JavaScript- and Perl-compatible regular expression is an implementation of the above definition.
> 
> /^\[a-zA-Z0-9.!#$&#x25;&'*+/=?^_`{|}~-\]+@\[a-zA-Z0-9-\]+(?:\\.\[a-zA-Z0-9-\]+)*$/
