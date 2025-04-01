---
title: Facebookの開発体制&#x3a; developer driven culture
date: 2011-01-29T02:22:00.000Z
categories:
- software testing
tags:
- facebook
---
「[InfoQ: How Facebook Ships Code](http://www.infoq.com/news/2011/01/facebook-coding-practices)（[日本語版記事](http://www.infoq.com/jp/news/2011/01/facebook-coding-practices)が出た）」にて、Facebookではどのように開発し、サービスを公開しているかについて紹介していて、その開発の仕方を developer driven culture と呼んでいます。日本語にすると、開発者駆動文化でしょうか（開発者中心主義の方が近い気が）。記事によると、Facebookでは開発者が自分で実装を考え、フロントエンドからバックエンドまで開発して、バグの発見/修正までするみたい。必要な場合はデザイナーにも助けを借りることができるけど、基本的には自分で全部開発する、らしい。プロダクトマネージャーもいるみたいですけど、エンジニアマネージャーとかと話し合って、実装に対する合意を得ないといけない。興味のそそらない実装は認可されないという意味で、開発者は常に自分の好きなことに集中できるようになっているみたい。

<!-- more -->

QAについては、公式なQAチームは存在しないと言及しています（「[Facebookには専任のQAチームがいない - メモログ](/blog//2010/07/facebook_has_no_dedicated_qa/)」でも以前に紹介しました）。開発者同士でコードレビューしたり、ステージング的な環境に問題があった場合はみんなで報告し合う。

そのへん「[How Facebook Ships Code « FrameThink](http://framethink.wordpress.com/2011/01/17/how-facebook-ships-code/)」の記事の長いリストの中で少し詳しく触れられています。前に紹介していたunit testとかintegration testとかは散発的に(sporadically)使用しているみたいで、日常的にはあまり使用していない雰囲気。あとQAチームがあるとバグはQAで発見するからと自分のコードを精査しないで投げちゃうインセンティブになる的なことが書かれています（主観的な意見だけど、通常の開発体制との引き合いで記載しているとの但し書き付き。私の知っているエンジニアの人にはそんな人いません）。あと、push-blockingのテストはリリース前に必ずやるみたい。

> "most engineers are capable of writing bug-free code. it's just that they don't have an incentive to do so at most companies. when there's a QA department, it's easy to just throw it over to them to find the errors." \[EDIT: please note that this was subjective opinion, I chose to include it in this post because of the stark contrast that this draws with standard development practice at other companies\]
> 
> CORRECTION thx epriest\] "We have automated testing, including "push-blocking" tests which must pass before the release goes out. We absolutely do not believe "most engineers are capable of writing bug-free code", much less that this is a reasonable notion to base a business upon."

個人的なイメージとしては、垂直統合という感じ。普通の開発体制は、仕様の策定はプロダクトマネージャーがして、開発をエンジニア（開発者）が行い、テストをテスター（QA）が行って出荷する（水平統合）。Facebookの場合はそれを開発者が原則的にはすべて行う。水平的な開発体制に比べると、開発者はオールラウンダーではなくてはならないわけで、個人個人のスキル要件は厳しそう。でも自分の好きなことを好きなだけできるとしたら楽しそうですね。

また後者の記事によると2000人の従業員のうち、エンジニアとOPSがそれぞれざっと400-500人くらいらしいです（二つを会わせると従業員の半分がエンジニアとOPSということになる）。そしてサーバーの台数は60,000以上らしい。この規模でfacebookという一つのサービスを集中して作っているからこそ、この垂直統合的な開発体制が機能するのかもしれませんね。この記事には他にもいろんな情報が載っているので興味のある方は読んでみると良いと思います。
