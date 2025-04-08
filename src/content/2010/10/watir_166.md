---
title: watir 1.6.6 リリース
date: 2010-10-15T15:45:00.000Z
categories:
  - software testing
tags:
  - watir
excerpt: "2週間近く前ですが、watirの1.6.6がリリースされましたね。変更点はWatir 1.6.6 final releasedに書かれている通りで、個人的には確実に使用するclick\_no\_waitのメソッドが修正されているのが大きいなあと思います。以前に「watir: click\_no\_wait が動作しない - メモログ」で行った修正で動作することにはするのですが、処理に妙に時間がかかってしまってました。1.6.6ではそういう副作用もなく解消されているようです。"
---

2 週間近く前ですが、watir の 1.6.6 がリリースされましたね。変更点は[Watir 1.6.6 final released](http://watir.com/2010/10/04/watir-1-6-6-final-released/)に書かれている通りで、個人的には確実に使用する click_no_wait のメソッドが修正されているのが大きいなあと思います。以前に「[watir: click_no_wait が動作しない - メモログ](/blog//2010/07/watir_click_no_wait_doesnt_work/)」で行った修正で動作することにはするのですが、処理に妙に時間がかかってしまってました。1.6.6 ではそういう副作用もなく解消されているようです。

その他いくつか魅力的な実装が追加されています。一つは#element と#elements のメソッド。詳しくは[implement IE#element and IE#elements](http://jira.openqa.org/browse/WTR-103)に書いてある通りなのですが、ie.link(:id, "id").click とリンクタグを特定する代わりに、ie.element(:id, 'id').click とタグを特定しなくてもできるようになりました。

あと、ie.link(:id,'id').style みたいな指定で、インラインの CSS 以外の情報も取得できるようになったようです。watir 上で CSS ファイルに書かれているスタイル情報を取得するのは難しそうなので、必要としている人にはありがたい機能と思われます。私はこのメソッドを使用したことありませんが。

そのほか table(:id,'id').row(:index,1).to_a みたいな形で、特定した table の行のテキストを配列で返してくれるようなったみたいです。いつ使用するんだろうと思わなくもありませんが。

まあ、とにかく。1.6.5 から 1.6.6 にアップデートしてみましたが、特に問題なく動作しているみたいです。うむうむ。すばらしい。ちなみに ruby のバージョンは 1.8.6 です。

留意点としては、watir を 1.6.6 にアップデートすると actionsupport も 2.3.9 にアップデートされることでしょうか。actionsupport は actionpack と actionmailer の 2.3.9 が必要のようで、それらをインストールしている場合は一緒にアップデートする必要があります。そして、これらの 2.3.9 では[actionmailer 2.3.9 should now require 'uri'](https://rails.lighthouseapp.com/projects/8994-ruby-on-rails/tickets/5555-actionmailer-239-should-now-require-uri#ticket-5555-11)というエラーが発生するようですが、この URL の diff を適用すれば問題解消します。actionpack も actionmailer も 3.0.0 が最新のようですが、ruby のバージョンが 1.8.7 である必要があるみたいです。
