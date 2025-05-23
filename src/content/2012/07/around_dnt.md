---
title: DNTについて
date: 2012-07-01T05:20:00.000Z
categories:
  - web
tags:
  - tracking
excerpt: "少し前にあった、IE10 で DNT の設定を初期設定でオンの状態にするという話。"
---

![](http://farm8.staticflickr.com/7276/7476633588_616b9eeb33_z.jpg)

> It's important that the signal represents a choice made by the person behind the keyboard and not the software maker, because ultimately it's not the browser being tracked, it's the user.

> ([Do Not Track: It’s the user’s voice that matters | Mozilla Privacy Blog](http://blog.mozilla.org/privacy/2012/05/31/do-not-track-its-the-users-voice-that-matters/))

少し前にあった、IE10 で DNT の設定を初期設定でオンの状態にするという話。Mozilla では[Do Not Track: It’s the user’s voice that matters | Mozilla Privacy Blog](http://blog.mozilla.org/privacy/2012/05/31/do-not-track-its-the-users-voice-that-matters/)([Do Not Track - 重要なのはユーザ本人の意思を伝えること | Mozilla Japan ブログ](http://mozilla.jp/blog/entry/9462/))の記事で IE が DNT を導入することを評価しつつも、初期設定で有効にするのではなく、ユーザーが明示的に設定する方が良いと述べています。

この、IE のように初期設定で DNT を有効にしている状態で、DNT を無効にするにはユーザーが自分で無効に設定する必要がある場合が「オプトアウト」で、Firefox のように DNT を有効にするためにはユーザーが自分で有効に設定する必要がある場合が「オプトイン」（オプトインとオプトアウトの用語がいまだに理解できていない気がするので合ってるか若干不安）ということになりますが、オプトアウトとオプトインとの違いは何か。

オプトアウトの場合は、設定がオフになっているということは、ユーザーが明示的にオフにしたと言える。オプトインの場合は、設定がオンになっているということは、ユーザーが明示的にオンにしたと言える。というのが、オプトインとオプトアウトの違いになる。どちらが良い設定かどうかは、何を設定するかによりますが、大多数のユーザーが自分の行動を追跡されたいとは思っていないと考えれば、オプトアウトの方が自然のように思える。行動追跡してほしい人だけ無効すれば良い（そんな人がいるとは想像しにくいですけど）。

しかし、オプトアウトの場合は、ユーザーが明示的に DNT を有効にしていないので、「ユーザーが本当に追跡されたくないと思っているかが分からない（初期設定のまま使っているだけではないか）」という解釈ができてしまう。そのため、DNT が有効でも初期設定のまま使っているだけかもしれないから、DNT の設定は気にしないで行動追跡してもいい、という解釈ができてしまう。このように DNT が有効でも気にしないみたいな考え方が標準となってくると、DNT の設定が無意味になる。

なので、個人的には、オプトアウトの方が自然な感がありつつも（そもそも広告のために行動追跡なんてしてほしくないわけで）、「ユーザーの意思を明示的に知ることができる」オプトインの方が DNT を無視できない力を持たすことができるという意味で、より良いように思う次第ではあります。

しかしながら、Firefox の設定の場合は、設定の存在を知っている人は使えるけど、知らなければ使えないという感じなんじゃないかという感もあります。UI 上の説明が不十分というか。これでは、プライバシーをより保護されるべき初心者ユーザーは、DNT の存在を知らないまま利用し続ける、ということは十分に考えられる。それはそれで DNT の有効性が半減すると思うので、設定方法や UI などは「必ず一回は設定する」ような仕組みになってないとあれかなあとも思いますけど。

以下はそのほか関連情報

- [A beginner's guide to the new cookie law | Feature | .net magazine](http://www.netmagazine.com/features/beginners-guide-new-cookie-law?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+net%2Ftopstories+%28.net+%29)
- [ICO の Guidance on the rules on use of cookies and similar technologies (PDF)](http://www.ico.gov.uk/for_organisations/privacy_and_electronic_communications/the_guide/~/media/documents/library/Privacy_and_electronic/Practical_application/cookies_guidance_v3.ashx)
- [「オンラインプライバシー勉強会」レポート〜行動追跡の現状とブラウザ業界の動向〜](http://mozilla.jp/events/2012/privacy-workshop-1/)
- [あっという間に頓挫した「IE10」追跡拒否の標準化 « WIRED.jp 世界最強の「テクノ」ジャーナリズム](http://wired.jp/2012/06/11/ie-10%E2%80%B2s-%E2%80%98do-not-track%E2%80%99-default-dies-quick-death/)
- [Do Not Track -- Compromise Proposal (PDF)](http://www.wired.com/images_blogs/threatlevel/2012/06/compromise-proposal-pde-tl-jm.pdf)
- [IE to Start Automatic Upgrades across Windows XP, Windows Vista, and Windows 7](http://windowsteamblog.com/ie/b/ie/archive/2011/12/15/ie-to-start-automatic-upgrades-across-windows-xp-windows-vista-and-windows-7.aspx)
- [Tracking Preference Expression (DNT)](http://www.w3.org/2011/tracking-protection/drafts/tracking-dnt.html#determining)
