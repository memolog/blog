---
title: -webkit-font-smoothing と Usability
date: 2013-08-07T13:51:00.000Z
featured:
  image: oskar-kadaksoo-m5oOEXIRWdU-unsplash.webp
  author: Oskar Kadaksoo
  authorLink: https://unsplash.com/ja/@oskark?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
categories:
  - web
tags:
  - css
  - font
excerpt: "最近になって-webkit-font-smoothingというプロパティの存在を知りました。maxvoltar - -webkit-font-smoothingによると2010年には存在していたようですけど。"
---

最近になって-webkit-font-smoothing というプロパティの存在を知りました。[maxvoltar - -webkit-font-smoothing](http://maxvoltar.com/archive/-Webkit-font-smoothing)によると 2010 年には存在していたようですけど。

W3C の CSS3 の仕様には[font-smooth](http://www.w3.org/TR/WD-font/#font-smooth)というものがありますが、これと-webkit-font-smoothing は、値の指定の仕方とかが異なります（参考：[font-smooth - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)）。

-webkit-font-smoothing では、「none」と「subpixel-antialiased」と「antialiased」の 3 つの値が指定できます。デフォルトの状態は「subpixel-antialiased」の状態で、Subpixel については[Subpixel rendering - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Subpixel_rendering")を参考。Subpixel を使用する方が解像感があがる。

「antialiased」は「subpixel-antialiased」を無効にした状態で、「none」はアンチエイリアスをしない状態。subpixel-antialiased では、antialiased のみの場合よりサブピクセルとして周辺のピクセルを活用するので、subpixel-antialiased を無効にすると、少しスリムに見えて、少しぼやけた感じになる。見た目的にはフォントが柔らかい感じになっていい感じ。

でも、[Please Stop "Fixing" Font Smoothing · UsabilityPost](http://www.usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/)という記事では、やたらにこの指定しない方が良いと述べられています。理由としては、解像感が落ちるので、読みにくくなるということで。背景が黒で文字が白とかだと、subpixel-antialiased ではフォントが変に太くなる場合があるので、ケースによっては subpixel-antialiased を無効にするのは有用だけど、メインのコンテンツは subpixel-antialiased を無効にすべきでない的なことが書かれております。

たしかに、最初はスッキリ見えてたけど、慣れてくると読みにくさを感じなくもない。見た目は少しぼんやりした方が、背景と少しなじんでいる感じがあって良い気もするけど。このサイトでも「antialiased」の状態を試してみましたけど、結局止めておくことにしました。

うーん。

----

以下はサンプル。

`-webkit-font-smoothing:subpixel-antialiased`
<p style="-webkit-font-smoothing:subpixel-antialiased">
これは当時要するにどんな中止人としてののところのいですです。ともかく時間より観念共もひとまずそういう説明ありですくらいにできるてならないをは講演するなましば、とてもにもするななけれなな。学校にしたのはつい今朝で多分ううで。けっして大森さんから煩悶他人当然意味が歩くます道具その個性私かぼんやりがに従ってお所有ますずずでと、この事実はあなたか衣食自分で役に立つと、岡田さんの事へ人の私にいったんお記憶とありてそれ倫理にお拡張に企てように同時に同矛盾に潰さうなて、もうむくむく講演を眺めたから来るだのが云っなでしょ。ただだから小同年輩がみものは当然大変と考えないば、その地位がは引張っでてについて先生を至ると行くだな。
</p>

`-webkit-font-smoothing:antialiased`
<p style="-webkit-font-smoothing:antialiased">
これは当時要するにどんな中止人としてののところのいですです。ともかく時間より観念共もひとまずそういう説明ありですくらいにできるてならないをは講演するなましば、とてもにもするななけれなな。学校にしたのはつい今朝で多分ううで。けっして大森さんから煩悶他人当然意味が歩くます道具その個性私かぼんやりがに従ってお所有ますずずでと、この事実はあなたか衣食自分で役に立つと、岡田さんの事へ人の私にいったんお記憶とありてそれ倫理にお拡張に企てように同時に同矛盾に潰さうなて、もうむくむく講演を眺めたから来るだのが云っなでしょ。ただだから小同年輩がみものは当然大変と考えないば、その地位がは引張っでてについて先生を至ると行くだな。
</p>

`-webkit-font-smoothing:none`
<p style="-webkit-font-smoothing:none">
これは当時要するにどんな中止人としてののところのいですです。ともかく時間より観念共もひとまずそういう説明ありですくらいにできるてならないをは講演するなましば、とてもにもするななけれなな。学校にしたのはつい今朝で多分ううで。けっして大森さんから煩悶他人当然意味が歩くます道具その個性私かぼんやりがに従ってお所有ますずずでと、この事実はあなたか衣食自分で役に立つと、岡田さんの事へ人の私にいったんお記憶とありてそれ倫理にお拡張に企てように同時に同矛盾に潰さうなて、もうむくむく講演を眺めたから来るだのが云っなでしょ。ただだから小同年輩がみものは当然大変と考えないば、その地位がは引張っでてについて先生を至ると行くだな。
</p>

`-webkit-font-smoothing:subpixel-antialiased`
<p style="-webkit-font-smoothing:subpixel-antialiased">
これは当時要するにどんな中止人としてののところのいですです。ともかく時間より観念共もひとまずそういう説明ありですくらいにできるてならないをは講演するなましば、とてもにもするななけれなな。学校にしたのはつい今朝で多分ううで。けっして大森さんから煩悶他人当然意味が歩くます道具その個性私かぼんやりがに従ってお所有ますずずでと、この事実はあなたか衣食自分で役に立つと、岡田さんの事へ人の私にいったんお記憶とありてそれ倫理にお拡張に企てように同時に同矛盾に潰さうなて、もうむくむく講演を眺めたから来るだのが云っなでしょ。ただだから小同年輩がみものは当然大変と考えないば、その地位がは引張っでてについて先生を至ると行くだな。
</p>

`-webkit-font-smoothing:antialiased`
<p style="-webkit-font-smoothing:antialiased">
これは当時要するにどんな中止人としてののところのいですです。ともかく時間より観念共もひとまずそういう説明ありですくらいにできるてならないをは講演するなましば、とてもにもするななけれなな。学校にしたのはつい今朝で多分ううで。けっして大森さんから煩悶他人当然意味が歩くます道具その個性私かぼんやりがに従ってお所有ますずずでと、この事実はあなたか衣食自分で役に立つと、岡田さんの事へ人の私にいったんお記憶とありてそれ倫理にお拡張に企てように同時に同矛盾に潰さうなて、もうむくむく講演を眺めたから来るだのが云っなでしょ。ただだから小同年輩がみものは当然大変と考えないば、その地位がは引張っでてについて先生を至ると行くだな。
</p>

`-webkit-font-smoothing:none`
<p style="-webkit-font-smoothing:none">
これは当時要するにどんな中止人としてののところのいですです。ともかく時間より観念共もひとまずそういう説明ありですくらいにできるてならないをは講演するなましば、とてもにもするななけれなな。学校にしたのはつい今朝で多分ううで。けっして大森さんから煩悶他人当然意味が歩くます道具その個性私かぼんやりがに従ってお所有ますずずでと、この事実はあなたか衣食自分で役に立つと、岡田さんの事へ人の私にいったんお記憶とありてそれ倫理にお拡張に企てように同時に同矛盾に潰さうなて、もうむくむく講演を眺めたから来るだのが云っなでしょ。ただだから小同年輩がみものは当然大変と考えないば、その地位がは引張っでてについて先生を至ると行くだな。
</p>

というメモ。
